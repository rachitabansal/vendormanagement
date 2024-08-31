import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { VendorModule } from './vendor/vendor.module';
import { PurchaseOrderModule } from './purchase-order/purchase-order.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Vendor } from './vendor/vendor.entity';

@Module({
  imports: [
    // ConfigModule is configured to load environment variables from .env file
    ConfigModule.forRoot({
      isGlobal: true, // Makes ConfigModule available globally
      envFilePath: '.env', // Specifies the path to the .env file
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT, 10) || 3306,
      username: process.env.DB_USERNAME || 'Rachita\rachi',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'vendor_management',
      entities: [Vendor],
      synchronize: process.env.TYPEORM_SYNC === 'true', // Set to false in production
    }),
    AuthModule,
    VendorModule,
    PurchaseOrderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
