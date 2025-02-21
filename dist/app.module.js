"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const auth_module_1 = require("./auth/auth.module");
const vendor_module_1 = require("./vendor/vendor.module");
const purchase_order_module_1 = require("./purchase-order/purchase-order.module");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const vendor_entity_1 = require("./vendor/vendor.entity");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '.env',
            }),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mysql',
                host: process.env.DB_HOST || 'localhost',
                port: parseInt(process.env.DB_PORT, 10) || 3306,
                username: process.env.DB_USERNAME || 'Rachita\rachi',
                password: process.env.DB_PASSWORD || '',
                database: process.env.DB_NAME || 'vendor_management',
                entities: [vendor_entity_1.Vendor],
                synchronize: process.env.TYPEORM_SYNC === 'true',
            }),
            auth_module_1.AuthModule,
            vendor_module_1.VendorModule,
            purchase_order_module_1.PurchaseOrderModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map