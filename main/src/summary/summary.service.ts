import { Injectable } from '@nestjs/common';
import { LoggerService } from 'enhanced-log-tools';
import { RMQService } from 'nestjs-rmq';
import { SummaryShortCreate, SummaryUrlShortCreate } from 'rabbit-mq-contracts';

@Injectable()
export class SummaryService {
  constructor(private readonly rmqService: RMQService, private readonly logger: LoggerService) { }

  async createSummary(dto: SummaryShortCreate.Request): Promise<SummaryShortCreate.Response> {
    this.logger.setPrefix('summary');
    this.logger.info('Получение короткого описания');
    const request: SummaryShortCreate.Request = {
      messageId: dto.messageId,
      originalText: dto.originalText,
    };

    return await this.rmqService.send<SummaryShortCreate.Request, SummaryShortCreate.Response>(
      SummaryShortCreate.topic,
      request,
      {
        timeout: 30000, // 30 секунд таймаут
        //persistent: true, // Гарантированная доставка
      },
    );
  }

  async createSummaryUrl(dto: SummaryUrlShortCreate.Request): Promise<SummaryUrlShortCreate.Response> {
    this.logger.setPrefix('summary');
    this.logger.info('Получение короткого описания по URL');
    const request: SummaryUrlShortCreate.Request = {
      messageId: dto.messageId,
      url: dto.url,
    };

    return await this.rmqService.send<SummaryUrlShortCreate.Request, SummaryUrlShortCreate.Response>(
      SummaryUrlShortCreate.topic,
      request,
      {
        timeout: 30000, // 30 секунд таймаут
        //persistent: true, // Гарантированная доставка
      },
    );
  }
}
