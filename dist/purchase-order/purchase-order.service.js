"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchaseOrderService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const purchase_order_entity_1 = require("./purchase-order.entity");
const vendor_entity_1 = require("../vendor/vendor.entity");
let PurchaseOrderService = class PurchaseOrderService {
    constructor(purchaseOrderRepository, vendorRepository) {
        this.purchaseOrderRepository = purchaseOrderRepository;
        this.vendorRepository = vendorRepository;
    }
    async create(createPurchaseOrderDto) {
        const vendorId = Number(createPurchaseOrderDto.vendorId);
        const vendor = await this.vendorRepository.findOne({ where: { id: vendorId } });
        if (!vendor) {
            throw new common_1.NotFoundException('Vendor not found');
        }
        const purchaseOrder = this.purchaseOrderRepository.create({
            ...createPurchaseOrderDto,
            vendor,
        });
        return this.purchaseOrderRepository.save(purchaseOrder);
    }
    async findAll() {
        return this.purchaseOrderRepository.find({ relations: ['vendor'] });
    }
    async findOne(id) {
        const purchaseOrderId = Number(id);
        const purchaseOrder = await this.purchaseOrderRepository.findOne({
            where: { id: purchaseOrderId },
            relations: ['vendor'],
        });
        if (!purchaseOrder) {
            throw new common_1.NotFoundException('Purchase Order not found');
        }
        return purchaseOrder;
    }
    async update(id, updatePurchaseOrderDto) {
        const purchaseOrder = await this.findOne(id);
        this.purchaseOrderRepository.merge(purchaseOrder, updatePurchaseOrderDto);
        const updatedPO = await this.purchaseOrderRepository.save(purchaseOrder);
        await this.updateVendorMetrics(updatedPO.vendor.id.toString());
        return updatedPO;
    }
    async remove(id) {
        const purchaseOrder = await this.findOne(id);
        await this.purchaseOrderRepository.remove(purchaseOrder);
    }
    async updateVendorMetrics(vendorId) {
        const vendorIdNumber = Number(vendorId);
        const vendor = await this.vendorRepository.findOne({
            where: { id: vendorIdNumber },
            relations: ['purchaseOrders'],
        });
        if (!vendor) {
            throw new common_1.NotFoundException('Vendor not found');
        }
        const completedPOs = vendor.purchaseOrders.filter(po => po.status === 'completed');
        if (completedPOs.length > 0) {
            const onTimeDeliveries = completedPOs.filter(po => po.deliveryDate <= po.expectedDeliveryDate).length;
            vendor.onTimeDeliveryRate = (onTimeDeliveries / completedPOs.length) * 100;
            const totalQualityRating = completedPOs.reduce((sum, po) => sum + (po.qualityRating || 0), 0);
            vendor.qualityRatingAvg = totalQualityRating / completedPOs.length;
            const totalResponseTime = completedPOs.reduce((sum, po) => sum + (po.acknowledgmentDate.getTime() - po.issueDate.getTime()), 0);
            vendor.averageResponseTime = totalResponseTime / completedPOs.length;
            const fulfilledPOs = completedPOs.filter(po => po.status === 'completed').length;
            vendor.fulfillmentRate = (fulfilledPOs / vendor.purchaseOrders.length) * 100;
        }
        await this.vendorRepository.save(vendor);
    }
};
exports.PurchaseOrderService = PurchaseOrderService;
exports.PurchaseOrderService = PurchaseOrderService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(purchase_order_entity_1.PurchaseOrder)),
    __param(1, (0, typeorm_1.InjectRepository)(vendor_entity_1.Vendor)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], PurchaseOrderService);
//# sourceMappingURL=purchase-order.service.js.map