import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
// import { User } from './user.entity';
import { CollectionModule } from './collection/collection.module';
import { FrameModule } from './frame/frame.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import path from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: path.resolve(process.cwd(), '.env.development'),
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MQSQLHost,
      port: 3306,
      username: process.env.MYSQLUsername,
      password: process.env.MYSQLPassword,
      database: process.env.MYSQLDatabase,
      synchronize: true, // prod 需要注意
      autoLoadEntities: true,
    }),
    UserModule,
    CollectionModule,
    FrameModule,
    AuthModule,
  ],
})
export class AppModule {}
