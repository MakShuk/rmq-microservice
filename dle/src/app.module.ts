import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { getRMQConfig } from 'configs/rmq.config';
import { RMQModule } from 'nestjs-rmq';
import { getConfigModuleOptions } from 'configs/config/config.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(getConfigModuleOptions()), RMQModule.forRootAsync(getRMQConfig())],
  controllers: [AppController],
  providers: [],
})
export class AppModule { }
