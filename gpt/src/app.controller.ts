import { Body, Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { RMQRoute, RMQValidate } from 'nestjs-rmq';
import { GptMessage } from '@contracts/message';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @RMQValidate()
  @RMQRoute(GptMessage.topic)
  async sendMessage(@Body() massageDto: GptMessage.Request): Promise<GptMessage.Response> {
    const gptMessage = (await this.appService.generateText(massageDto.message)) || ``;
    
    return {
      message: gptMessage,
      userId: massageDto.userId,
      messageId: massageDto.messageId,
    };
  }
}