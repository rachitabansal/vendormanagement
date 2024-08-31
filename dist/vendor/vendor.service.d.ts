import { Repository } from 'typeorm';
import { Vendor } from './vendor.entity';
export declare class VendorService {
    private vendorRepository;
    constructor(vendorRepository: Repository<Vendor>);
    create(vendorData: Partial<Vendor>): Promise<Vendor>;
    findAll(): Promise<Vendor[]>;
    findOne(id: number): Promise<Vendor>;
    update(id: number, updateData: Partial<Vendor>): Promise<import("typeorm").UpdateResult>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
