import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SoftDeleteModel } from 'mongoose-delete';
import { IPAddress } from './schemas/ip-address.schema';

@Injectable()
export class IPAddressesService {
  constructor(
    @InjectModel('IPAddress')
    private readonly ipAddressModel: SoftDeleteModel<IPAddress>,
  ) {}

  async findOrCreate(ip: string): Promise<IPAddress> {
    let ipAddress = await this.ipAddressModel.findOne({ ip });
    if (!ipAddress) {
      ipAddress = new this.ipAddressModel({ ip });
      await ipAddress.save();
    }
    return ipAddress;
  }

  async deleteIP(ip: string): Promise<void> {
    await this.ipAddressModel.delete({ ip });
  }

  async restoreIP(ip: string): Promise<void> {
    await this.ipAddressModel.restore({ ip });
  }
}
