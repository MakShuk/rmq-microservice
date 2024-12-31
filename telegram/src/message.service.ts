import { Inject, Injectable } from '@nestjs/common';
import { Context, Telegraf } from 'telegraf';
import { Message } from 'telegraf/typings/core/types/typegram';

@Injectable()
export class MessageService {
  constructor(
    @Inject('TELEGRAM_BOT_INSTANCE')
    private readonly bot: Telegraf<Context>,
  ) {}

  async sendTelegramMessage(message: string, userId: number): Promise<number> {
    try {
      const massage: Message.TextMessage = await this.bot.telegram.sendMessage(userId, message);
      return massage.message_id;
    } catch (error) {
      throw new Error('Failed to send a message');
    }
  }

  async updateTelegramMessage(message: string, userId: number, messageId: number): Promise<void> {
    try {
      await this.bot.telegram.editMessageText(userId, messageId, undefined, message);
    } catch (error) {
      throw new Error('Failed to update a message');
    }
  }
}
