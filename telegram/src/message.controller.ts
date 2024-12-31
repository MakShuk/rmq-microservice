import { Body, Controller } from '@nestjs/common';
import { MessageService } from './message.service';
import { RMQRoute, RMQValidate } from 'nestjs-rmq';
import { TelegramSendNewMessage, TelegramSendUpdateMessage } from 'rabbit-mq-contracts';

@Controller()
export class MessageController {
  constructor(private readonly messageService: MessageService) { }

  @RMQValidate()
  @RMQRoute(TelegramSendNewMessage.topic)
  async sendNewMessage(
    @Body() massageDto: TelegramSendNewMessage.Request,
  ): Promise<TelegramSendNewMessage.Response> {
    const messageID = await this.messageService.sendTelegramMessage(
      massageDto.message,
      massageDto.userId,
    );

    return {
      telegram_message_id: messageID,
    };
  }
  @RMQValidate()
  @RMQRoute(TelegramSendUpdateMessage.topic)
  async updateMessage(
    @Body() massageDto: TelegramSendUpdateMessage.Request,
  ): Promise<TelegramSendUpdateMessage.Response> {
    await this.messageService.updateTelegramMessage(
      massageDto.message,
      massageDto.userId,
      massageDto.telegram_message_id,
    );
    return {
      status: 1,
    };
  }
}
