import { Body, Controller, Post } from '@nestjs/common';
import { RMQService } from 'nestjs-rmq';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SendMessageDto } from 'dto/message-options.dto';
import { GptMessage, TelegramSendNewMessage, TelegramSendUpdateMessage } from 'rabbit-mq-contracts';


@ApiTags('Telegram')
@Controller()
export class AppController {
  constructor(private readonly rmqService: RMQService) {}

  @Post('send-message-telegram')
  @ApiOperation({ summary: 'Отправить сообщение в Telegram' })
  @ApiBody({ type: SendMessageDto })
  async sendNewMessageTelegram(
    @Body() dto: SendMessageDto,
  ): Promise<TelegramSendNewMessage.Response> {
    try {
      return await this.rmqService.send<
        TelegramSendNewMessage.Request,
        TelegramSendNewMessage.Response
      >(TelegramSendNewMessage.topic, dto, {});
    } catch (error) {
      // Handle specific error types if needed
      console.log(error);
      if (error instanceof Error) {
        throw new Error(`Failed to send message: ${error.message}`);
      }
      throw error;
    }
  }

  @Post('send-message-gpt')
  @ApiOperation({ summary: 'Отправить сообщение в GPT' })
  @ApiBody({ type: SendMessageDto })
  async sendMessageGPT(@Body() dto: SendMessageDto): Promise<GptMessage.Response> {
    try {
      return await this.rmqService.send<GptMessage.Request, GptMessage.Response>(
        GptMessage.topic,
        dto,
        {},
      );
    } catch (error) {
      // Handle specific error types if needed
      console.log(error);
      if (error instanceof Error) {
        throw new Error(`Failed to send message: ${error.message}`);
      }
      throw error;
    }
  }

  @Post('full-message-flow')
  @ApiOperation({ summary: 'Полный цикл отправки сообщения' })
  @ApiBody({ type: SendMessageDto })
  async fullMessageFlow(@Body() dto: SendMessageDto): Promise<any> {
    //step1
    const updatedDto = {
      ...dto,
      message: 'Запрос обрабатывается...',
    };

    const { telegram_message_id } = await this.sendNewMessageTelegram(updatedDto);
    //step2
    const { message, userId } = await this.sendMessageGPT(dto);
    //step3
    const { status } = await this.rmqService.send<
      TelegramSendUpdateMessage.Request,
      TelegramSendUpdateMessage.Response
    >(TelegramSendUpdateMessage.topic, { message, telegram_message_id, userId }, {});

    return {
      status: status ? 'Сообщение обработано' : 'Ошибка при отправке сообщения',
    };
  }
}