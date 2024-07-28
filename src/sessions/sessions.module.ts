import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SessionsService } from './sessions.service';
import { SessionsController } from './sessions.controller';
import { SessionSchema } from './schemas/session.schema';
import { IPAddressesModule } from 'src/ip-addresses/ip-addresses.module';
import { SelectedCategoriesModule } from 'src/selected-categories/selected-categories.module';
import { CategoriesModule } from 'src/categories/categories.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Session', schema: SessionSchema }]),
    IPAddressesModule,
    CategoriesModule,
    SelectedCategoriesModule,
  ],
  providers: [SessionsService],
  controllers: [SessionsController],
  exports: [SessionsService],
})
export class SessionsModule {}
