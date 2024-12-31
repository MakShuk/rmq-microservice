import { Body, Controller } from '@nestjs/common';
import { SummaryUrlShortCreate, TelegramSendNewMessage, TelegramSendUpdateMessage, TelegramUserMessage } from 'rabbit-mq-contracts';
import { RMQRoute, RMQService, RMQValidate } from 'nestjs-rmq';
import { SummaryService } from './summary.service';
import { LoggerService } from 'enhanced-log-tools';



@Controller()
export class TelegramSummaryController {


  constructor(
    private readonly summaryService: SummaryService,
    private readonly RMQService: RMQService,
    private readonly logger: LoggerService
  ) { }

  @RMQValidate()
  @RMQRoute(TelegramUserMessage.topic)
  async getSummary(
    @Body() dto: TelegramUserMessage.Request
  ): Promise<TelegramUserMessage.Response> {
    try {
      await this.createSummary(dto);
      return { status: 1 };
    } catch (error) {
      this.logger.error('Error processing message:', (error as Error)?.stack || error); return { status: 0 };
    }
  }

  private async createSummary(dto: TelegramUserMessage.Request): Promise<void> {
    // Отправляем начальное сообщение и создаем саммари параллельно
    const [{ telegram_message_id }, summary] = await Promise.all([
      this.sendInitialMessage(dto),
      this.generateSummary(dto)
    ]);

    await this.updateMessageWithSummary(dto.userId, telegram_message_id, summary);
  }

  private async sendInitialMessage(dto: TelegramUserMessage.Request) {
    return this.RMQService.send<TelegramSendNewMessage.Request, TelegramSendNewMessage.Response>(
      TelegramSendNewMessage.topic,
      {
        messageId: dto.messageId,
        message: 'Запрос обрабатывается...',
        userId: dto.userId
      }
    );
  }

  private async generateSummary(dto: TelegramUserMessage.Request) {
    const isUrl = this.isValidUrl(dto.message);

    if (isUrl) {
      const request: SummaryUrlShortCreate.Request = {
        messageId: dto.messageId,
        url: dto.message
      };
      return this.summaryService.createSummaryUrl(request);
    }

    return this.summaryService.createSummary({
      messageId: dto.messageId,
      originalText: dto.message
    });
  }

  private async updateMessageWithSummary(
    userId: number,
    telegramMessageId: number,
    summary: { summary: string[] }
  ) {
    await this.RMQService.send<TelegramSendUpdateMessage.Request, TelegramSendUpdateMessage.Response>(
      TelegramSendUpdateMessage.topic,
      {
        message: summary.summary.join('\n'),
        telegram_message_id: telegramMessageId,
        userId
      }
    );
  }

  private isValidUrl(str: string): boolean {
    if (!str?.startsWith('http')) return false;

    try {
      const url = new URL(str);
      return url.protocol === 'http:' || url.protocol === 'https:';
    } catch {
      return false;
    }
  }
}