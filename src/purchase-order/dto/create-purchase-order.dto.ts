import { IsString, IsNumber, IsDate } from 'class-validator';

export class CreatePurchaseOrderDto {
  @IsString()
  status: string;

  @IsDate()
  issueDate: Date;

  @IsDate()
  acknowledgmentDate: Date;

  @IsDate()
  deliveryDate: Date;

  @IsDate()
  expectedDeliveryDate: Date;

  @IsNumber()
  vendorId: number;
}
