import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PurchaseOrder } from './purchase-order.entity';
import { CreatePurchaseOrderDto } from './dto/create-purchase-order.dto';
import { UpdatePurchaseOrderDto } from './dto/update-purchase-order.dto';
import { Vendor } from '../vendor/vendor.entity';

@Injectable()
export class PurchaseOrderService {
  constructor(
    @InjectRepository(PurchaseOrder)
    private readonly purchaseOrderRepository: Repository<PurchaseOrder>,
    @InjectRepository(Vendor)
    private readonly vendorRepository: Repository<Vendor>,
  ) {}

  // Create Purchase Order
  async create(createPurchaseOrderDto: CreatePurchaseOrderDto): Promise<PurchaseOrder> {
    const vendorId = Number(createPurchaseOrderDto.vendorId); // Convert to number
    const vendor = await this.vendorRepository.findOne({ where: { id: vendorId } });
    if (!vendor) {
      throw new NotFoundException('Vendor not found');
    }

    const purchaseOrder = this.purchaseOrderRepository.create({
      ...createPurchaseOrderDto,
      vendor,
    });

    return this.purchaseOrderRepository.save(purchaseOrder);
  }

  // Get all Purchase Orders
  async findAll(): Promise<PurchaseOrder[]> {
    return this.purchaseOrderRepository.find({ relations: ['vendor'] });
  }

  // Get one Purchase Order by ID
  async findOne(id: string): Promise<PurchaseOrder> {
    const purchaseOrderId = Number(id); // Convert to number
    const purchaseOrder = await this.purchaseOrderRepository.findOne({
      where: { id: purchaseOrderId },
      relations: ['vendor'],
    });

    if (!purchaseOrder) {
      throw new NotFoundException('Purchase Order not found');
    }
    return purchaseOrder;
  }

  // Update Purchase Order and Vendor Metrics
  async update(id: string, updatePurchaseOrderDto: UpdatePurchaseOrderDto): Promise<PurchaseOrder> {
    const purchaseOrder = await this.findOne(id);

    // Update the purchase order details
    this.purchaseOrderRepository.merge(purchaseOrder, updatePurchaseOrderDto);

    // Save updated purchase order
    const updatedPO = await this.purchaseOrderRepository.save(purchaseOrder);

    // Update vendor performance metrics
    await this.updateVendorMetrics(updatedPO.vendor.id.toString());

    return updatedPO;
  }

  // Remove Purchase Order
  async remove(id: string): Promise<void> {
    const purchaseOrder = await this.findOne(id);
    await this.purchaseOrderRepository.remove(purchaseOrder);
  }

  // Private method to calculate and update vendor performance metrics
  private async updateVendorMetrics(vendorId: string): Promise<void> {
    const vendorIdNumber = Number(vendorId); // Convert to number
    const vendor = await this.vendorRepository.findOne({
      where: { id: vendorIdNumber },
      relations: ['purchaseOrders'],
    });

    if (!vendor) {
      throw new NotFoundException('Vendor not found');
    }

    const completedPOs = vendor.purchaseOrders.filter(po => po.status === 'completed');

    if (completedPOs.length > 0) {
      // Calculate on-time delivery rate
      const onTimeDeliveries = completedPOs.filter(po => po.deliveryDate <= po.expectedDeliveryDate).length;
      vendor.onTimeDeliveryRate = (onTimeDeliveries / completedPOs.length) * 100;

      // Calculate average quality rating
      const totalQualityRating = completedPOs.reduce((sum, po) => sum + (po.qualityRating || 0), 0);
      vendor.qualityRatingAvg = totalQualityRating / completedPOs.length;

      // Calculate average response time
      const totalResponseTime = completedPOs.reduce((sum, po) => sum + (po.acknowledgmentDate.getTime() - po.issueDate.getTime()), 0);
      vendor.averageResponseTime = totalResponseTime / completedPOs.length;

      // Calculate fulfillment rate
      const fulfilledPOs = completedPOs.filter(po => po.status === 'completed').length;
      vendor.fulfillmentRate = (fulfilledPOs / vendor.purchaseOrders.length) * 100;
    }

    await this.vendorRepository.save(vendor);
  }
}
