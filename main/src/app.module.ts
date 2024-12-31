import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { LoggerService } from 'enhanced-log-tools';
import { ConfigModule } from '@nestjs/config';
import { getConfigModuleOptions } from './configs/config/config.module';
import { RMQModule } from 'nestjs-rmq';
import { getRMQConfig } from './configs/rmq.config';
import { SummaryModule } from 'summary/summary.module';


const AppLogger = {
  provide: LoggerService,
  useValue: new LoggerService('App'),
};

@Module({
  imports: [ConfigModule.forRoot(getConfigModuleOptions()), RMQModule.forRootAsync(getRMQConfig()), SummaryModule],
  controllers: [AppController],
  providers: [AppLogger],
})
export class AppModule {}
