import { Module } from '@nestjs/common';
import { SummaryController } from './summary.controller';
import { TelegramSummaryController } from './telegtam-summary.controller';
import { RMQModule } from 'nestjs-rmq';
import { getRMQConfig } from '../configs/rmq.config';
import { LoggerService } from 'enhanced-log-tools';
import { SummaryService } from './summary.service';

const SummaryLogger = {
  provide: LoggerService,
  useValue: new LoggerService('summary'),
};

@Module({
  imports: [RMQModule.forRootAsync(getRMQConfig())],
  controllers: [SummaryController, TelegramSummaryController],
  providers: [SummaryLogger, SummaryService],
  exports: [SummaryService],
})
export class SummaryModule {}
