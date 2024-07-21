import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { IPAddressSchema } from './schemas/ip-address.schema';
import { IPAddressesService } from './ip-addresses.service';
import { IPAddressesController } from './ip-addresses.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'IPAddress', schema: IPAddressSchema }]),
  ],
  providers: [IPAddressesService],
  controllers: [IPAddressesController],
  exports: [IPAddressesService],
})
export class IPAddressesModule {}
