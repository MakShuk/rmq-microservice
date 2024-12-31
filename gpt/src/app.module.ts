import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { getConfigModuleOptions } from './configs/config/config.module';
import { RMQModule } from 'nestjs-rmq';
import { getRMQConfig } from './configs/rmq.config';
<<<<<<< HEAD
import { OpenAIModule } from 'configs/openai.config';

@Module({
  imports: [
    ConfigModule.forRoot(getConfigModuleOptions()),
    RMQModule.forRootAsync(getRMQConfig()),
    OpenAIModule.forRootAsync(),
  ],
  controllers: [AppController],
  providers: [AppService],
=======
import { RmqModule } from 'rmq/rmq.module';

@Module({
  imports: [ConfigModule.forRoot(getConfigModuleOptions()), RMQModule.forRootAsync(getRMQConfig()), RmqModule],
  controllers: [],
  providers: [],
>>>>>>> 5102cf59a4c4ef73267116a14c8fbb8cd6a20010
})
export class AppModule {}
