import { Injectable, Inject } from '@nestjs/common';
import { OPENAI_INSTANCE } from 'configs/openai.config';
import OpenAI from 'openai';
@Injectable()
export class AppService {
  constructor(@Inject(OPENAI_INSTANCE) private readonly openai: OpenAI) {}

  async generateText(prompt: string) {
    try {
      const completion = await this.openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
      });

      return completion.choices[0].message.content;
    } catch (error) {
     throw new Error(
       `Failed to generate text: ${error instanceof Error ? error.message : 'Unknown error'}`,
     );
    }
  }
}
