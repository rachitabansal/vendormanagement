import { VendorService } from './vendor.service';
import { Vendor } from './vendor.entity';
export declare class VendorController {
    private readonly vendorService;
    constructor(vendorService: VendorService);
    create(vendorData: Partial<Vendor>): Promise<Vendor>;
    findAll(): Promise<Vendor[]>;
    findOne(id: number): Promise<Vendor>;
    update(id: number, updateData: Partial<Vendor>): Promise<import("typeorm").UpdateResult>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
    getVendorPerformance(id: number): Promise<any>;
}
