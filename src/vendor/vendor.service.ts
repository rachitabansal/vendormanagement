import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vendor } from './vendor.entity';

@Injectable()
export class VendorService {
  constructor(
    @InjectRepository(Vendor)
    private vendorRepository: Repository<Vendor>,
  ) {}

  create(vendorData: Partial<Vendor>) {
    const vendor = this.vendorRepository.create(vendorData);
    return this.vendorRepository.save(vendor);
  }

  findAll() {
    return this.vendorRepository.find();
  }

  findOne(id: number) {
    return this.vendorRepository.findOne({ where: { id } });
  }

  update(id: number, updateData: Partial<Vendor>) {
    return this.vendorRepository.update(id, updateData);
  }

  remove(id: number) {
    return this.vendorRepository.delete(id);
  }
}
