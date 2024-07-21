import { Controller, Get, Param, Delete, Patch } from '@nestjs/common';
import { IPAddressesService } from './ip-addresses.service';
import { IPAddress } from './schemas/ip-address.schema';

@Controller('ip-addresses')
export class IPAddressesController {
  constructor(private readonly ipAddressesService: IPAddressesService) {}

  @Get(':ip')
  async findOrCreate(@Param('ip') ip: string): Promise<IPAddress> {
    return this.ipAddressesService.findOrCreate(ip);
  }

  @Delete(':ip')
  async deleteIP(@Param('ip') ip: string): Promise<void> {
    return this.ipAddressesService.deleteIP(ip);
  }

  @Patch('restore/:ip')
  async restoreIP(@Param('ip') ip: string): Promise<void> {
    return this.ipAddressesService.restoreIP(ip);
  }
}
