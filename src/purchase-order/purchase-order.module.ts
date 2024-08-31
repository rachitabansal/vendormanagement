import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PurchaseOrderService } from './purchase-order.service';
import { PurchaseOrderController } from './purchase-order.controller';
import { PurchaseOrder } from './purchase-order.entity';
import { Vendor } from '../vendor/vendor.entity';  // Import the Vendor entity
import { VendorModule } from '../vendor/vendor.module';  // Import the Vendor module

@Module({
  imports: [
    TypeOrmModule.forFeature([PurchaseOrder, Vendor]), // Include both PurchaseOrder and Vendor entities
    VendorModule,  // Import the VendorModule
  ],
  controllers: [PurchaseOrderController],
  providers: [PurchaseOrderService],
})
export class PurchaseOrderModule {}
