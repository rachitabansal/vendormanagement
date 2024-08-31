import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { VendorService } from './vendor.service';
import { Vendor } from './vendor.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('vendors')
export class VendorController {
  constructor(private readonly vendorService: VendorService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() vendorData: Partial<Vendor>) {
    return this.vendorService.create(vendorData);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.vendorService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: number) {  // ID is now a number
    return this.vendorService.findOne(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: number, @Body() updateData: Partial<Vendor>) {  // ID is now a number
    return this.vendorService.update(id, updateData);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: number) {  // ID is now a number
    return this.vendorService.remove(id);
  }

  @Get(':id/performance')
  @UseGuards(JwtAuthGuard)
  async getVendorPerformance(@Param('id') id: number): Promise<any> {  // ID is now a number
    const vendor = await this.vendorService.findOne(id);
    return {
      onTimeDeliveryRate: vendor.onTimeDeliveryRate,
      qualityRatingAvg: vendor.qualityRatingAvg,
      averageResponseTime: vendor.averageResponseTime,
      fulfillmentRate: vendor.fulfillmentRate,
    };
  }
}
