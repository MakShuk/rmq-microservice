import { Injectable, OnModuleInit } from '@nestjs/common';
import { Context } from 'telegraf';
import { TelegrafService } from 'telegraf/telegraf.service';
import { RMQService } from 'nestjs-rmq';
import { TelegramUserMessage } from 'rabbit-mq-contracts';


interface MessageContent {
  userId: number;
  message: string;
  messageId: number;
}

@Injectable()
export class TelegramService implements OnModuleInit {
  private readonly QUEUE_TIMEOUT_MS = 35000;
  private readonly ERROR_MESSAGE = 'Ошибка отправки сообщения в очередь ';

  constructor(
    private readonly telegrafService: TelegrafService,
    private readonly rmqService: RMQService,
  ) { }

  onModuleInit(): void {
    this.initializeMessageHandler();
  }

  private initializeMessageHandler(): void {
    this.telegrafService.textMessage(this.handleIncomingMessage.bind(this));
  }

  private async handleIncomingMessage(ctx: Context): Promise<void> {
    if (!this.isValidTextMessage(ctx)) {
      return;
    }

    const messageContent = this.extractMessageContent(ctx);
    await this.processAndSendMessage(messageContent, ctx);
  }

  private isValidTextMessage(ctx: Context): boolean {
    return !!(ctx.from && ctx.message && 'text' in ctx.message);
  }

  private extractMessageContent(ctx: Context): MessageContent {
    if (!ctx.from) {
      throw new Error('No sender information available');
    }
    
    if (!ctx.message) {
      throw new Error('No message information available');
    }

    if ('text' in ctx.message) {
      return {
        userId: ctx.from.id,
        message: (ctx.message as { text: string }).text,
        messageId: ctx.message.message_id,
      };
    }

    throw new Error('Message does not contain text');
  }

  private async processAndSendMessage(content: MessageContent, ctx: Context): Promise<void> {
    try {
      const response = await this.sendMessageToQueue(content);
      this.handleQueueResponse(response.status);
    } catch (error) {
      await this.handleError(error, ctx);
    }
  }

  private async sendMessageToQueue(content: MessageContent) {
    return this.rmqService.send<TelegramUserMessage.Request, TelegramUserMessage.Response>(
      TelegramUserMessage.topic,
      content,
      { timeout: this.QUEUE_TIMEOUT_MS }
    );
  }

  private handleQueueResponse(status: number): void {
    if (status === 0) {
      throw new Error('Failed to send a message');
    }
  }

  private async handleError(error: unknown, ctx: Context): Promise<void> {
    console.error('Error sending message to RMQ:', error);
    try {
      await ctx.reply(this.ERROR_MESSAGE, {
        reply_to_message_id: ctx.message?.message_id
      } as any);
    } catch (replyError) {
      console.error('Failed to send error message:', replyError);
    }
  }
}  