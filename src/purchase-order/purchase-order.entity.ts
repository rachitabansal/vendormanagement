import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Vendor } from '../vendor/vendor.entity';

@Entity()
export class PurchaseOrder {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  poNumber: string;

  @ManyToOne(() => Vendor, vendor => vendor.purchaseOrders)
  vendor: Vendor;

  @Column()
  orderDate: Date;

  @Column({ nullable: true })
  deliveryDate: Date;

  @Column('json')
  items: any;

  @Column()
  quantity: number;

  @Column()
  status: string;
  @Column({ type: 'timestamp' })
  expectedDeliveryDate: Date;

  @Column({ nullable: true })
  qualityRating: number;

  @Column()
  issueDate: Date;

  @Column({ nullable: true })
  acknowledgmentDate: Date;
}
