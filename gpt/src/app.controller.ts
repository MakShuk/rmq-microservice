import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { GptMessage } from 'rabbit-mq-contracts';
import { RMQValidate } from 'nestjs-rmq';
import { RMQRoute } from 'nestjs-rmq';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @RMQValidate()
  @RMQRoute(GptMessage.topic)
  async sendMessage(massageDto: GptMessage.Request): Promise<GptMessage.Response> {
    console.log(massageDto);
    const gptMessage = (await this.appService.generateText(massageDto.message)) || ``;
    return {
      message: gptMessage,
      userId: massageDto.userId,
      messageId: massageDto.messageId,
    };
  }
}