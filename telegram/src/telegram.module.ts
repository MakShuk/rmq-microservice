import { Module } from '@nestjs/common';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { ConfigModule } from '@nestjs/config';
import { getConfigModuleOptions } from './configs/config/config.module';
import { RMQModule } from 'nestjs-rmq';
import { getRMQConfig } from './configs/rmq.config';
import { TelegramInitialModule } from 'configs/telegram.config';
import { TelegrafModule } from './telegraf/telegraf.module';
import { TelegramService } from 'telegram.service';

@Module({
  imports: [
    ConfigModule.forRoot(getConfigModuleOptions()),
    RMQModule.forRootAsync(getRMQConfig()),
    TelegramInitialModule.forRootAsync(),
    TelegrafModule,
  ],
  controllers: [MessageController],
  providers: [MessageService, TelegramService],
})
export class TelegramModule { }
