import { Repository } from 'typeorm';
import { PurchaseOrder } from './purchase-order.entity';
import { CreatePurchaseOrderDto } from './dto/create-purchase-order.dto';
import { UpdatePurchaseOrderDto } from './dto/update-purchase-order.dto';
import { Vendor } from '../vendor/vendor.entity';
export declare class PurchaseOrderService {
    private readonly purchaseOrderRepository;
    private readonly vendorRepository;
    constructor(purchaseOrderRepository: Repository<PurchaseOrder>, vendorRepository: Repository<Vendor>);
    create(createPurchaseOrderDto: CreatePurchaseOrderDto): Promise<PurchaseOrder>;
    findAll(): Promise<PurchaseOrder[]>;
    findOne(id: string): Promise<PurchaseOrder>;
    update(id: string, updatePurchaseOrderDto: UpdatePurchaseOrderDto): Promise<PurchaseOrder>;
    remove(id: string): Promise<void>;
    private updateVendorMetrics;
}
