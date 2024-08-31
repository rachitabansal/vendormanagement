import { PurchaseOrder } from '../purchase-order/purchase-order.entity';
export declare class Vendor {
    id: number;
    name: string;
    contactDetails: string;
    address: string;
    vendorCode: string;
    purchaseOrders: PurchaseOrder[];
    onTimeDeliveryRate: number;
    qualityRatingAvg: number;
    averageResponseTime: number;
    fulfillmentRate: number;
}
