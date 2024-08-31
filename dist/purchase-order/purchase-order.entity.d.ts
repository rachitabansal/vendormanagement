import { Vendor } from '../vendor/vendor.entity';
export declare class PurchaseOrder {
    id: number;
    poNumber: string;
    vendor: Vendor;
    orderDate: Date;
    deliveryDate: Date;
    items: any;
    quantity: number;
    status: string;
    expectedDeliveryDate: Date;
    qualityRating: number;
    issueDate: Date;
    acknowledgmentDate: Date;
}
