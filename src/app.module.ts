import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { TestsModule } from './tests/tests.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [ConfigModule.forRoot(),MongooseModule.forRoot(process.env.DB_URL), TestsModule, AuthModule, UsersModule],
})
export class AppModule {}
