import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
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
      host: 'rm-wz901t3k846t995ofyo.mysql.rds.aliyuncs.com',
      port: 3306,
      username: 'test123',
      password: 'Test123456789',
      database: 'test123',
      synchronize: true, // prod 需要注意
      autoLoadEntities: true,
    }),
    UserModule,
    CollectionModule,
    FrameModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
