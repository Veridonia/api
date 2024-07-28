import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PostsModule } from './posts/posts.module';
import { FakerModule } from './faker/faker.module';
import * as dotenv from 'dotenv';
import { CategoriesModule } from './categories/categories.module';
import { UsersModule } from './users/users.module';
import { SessionsModule } from './sessions/sessions.module';
import { IPAddressesModule } from './ip-addresses/ip-addresses.module';
import { SelectedCategoriesModule } from './selected-categories/selected-categories.module';

dotenv.config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI),
    PostsModule,
    FakerModule,
    CategoriesModule,
    UsersModule,
    SessionsModule,
    IPAddressesModule,
    SelectedCategoriesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
