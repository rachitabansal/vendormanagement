import { PurchaseOrderService } from './purchase-order.service';
import { CreatePurchaseOrderDto } from './dto/create-purchase-order.dto';
import { UpdatePurchaseOrderDto } from './dto/update-purchase-order.dto';
export declare class PurchaseOrderController {
    private readonly purchaseOrderService;
    constructor(purchaseOrderService: PurchaseOrderService);
    create(createPurchaseOrderDto: CreatePurchaseOrderDto): Promise<import("./purchase-order.entity").PurchaseOrder>;
    findAll(): Promise<import("./purchase-order.entity").PurchaseOrder[]>;
    findOne(id: string): Promise<import("./purchase-order.entity").PurchaseOrder>;
    update(id: string, updatePurchaseOrderDto: UpdatePurchaseOrderDto): Promise<import("./purchase-order.entity").PurchaseOrder>;
    remove(id: string): Promise<void>;
}
