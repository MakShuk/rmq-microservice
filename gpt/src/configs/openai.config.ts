import { Module, Global, DynamicModule, Provider } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
import { HttpsProxyAgent } from 'https-proxy-agent';
import type { Agent } from 'http';

// Расширяем интерфейс конфигурации
interface OpenAIConfig {
  apiKey: string;
  proxy?: string;
  timeout?: number;
  httpAgent?: Agent;
}

// Константы для токенов инъекций и конфигурации
export const OPENAI_INSTANCE = 'OPENAI_INSTANCE';
export const DEFAULT_TIMEOUT = 35000;

@Global()
@Module({})
export class OpenAIModule {
  private static validateConfig(config: OpenAIConfig): void {
    if (!config.apiKey) {
      throw new Error('OpenAI API key is required but not provided');
    }

    if (config.proxy && !config.proxy.startsWith('http')) {
      throw new Error('Proxy URL must start with http:// or https://');
    }
  }

  private static createOpenAIProvider(): Provider {
    return {
      provide: OPENAI_INSTANCE,
      useFactory: async (configService: ConfigService): Promise<OpenAI> => {
        try {
          const config: OpenAIConfig = {
            apiKey: configService.get<string>('OPEN_AI_KEY') || '',
            proxy: configService.get<string>('PROXY'),
            timeout: configService.get<number>('OPENAI_TIMEOUT') || DEFAULT_TIMEOUT,
          };

          OpenAIModule.validateConfig(config);

          const openAIConfig: OpenAIConfig = {
            apiKey: config.apiKey,
            timeout: config.timeout,
          };

          if (config.proxy) {
            openAIConfig.httpAgent = new HttpsProxyAgent(config.proxy);
          }

          return new OpenAI(openAIConfig);
        } catch (error) {
          if (error instanceof Error) {
            throw new Error(`Failed to initialize OpenAI client: ${error.message}`);
          } else {
            throw new Error('Failed to initialize OpenAI client: Unknown error');
          }
        }
      },
      inject: [ConfigService],
    };
  }

  static forRootAsync(): DynamicModule {
    return {
      module: OpenAIModule,
      imports: [ConfigModule],
      providers: [OpenAIModule.createOpenAIProvider()],
      exports: [OPENAI_INSTANCE],
    };
  }
}
