import { Injectable, Inject } from '@nestjs/common';
import { OPENAI_INSTANCE } from 'configs/openai.config';
import OpenAI from 'openai';
@Injectable()
export class AppService {
  constructor(@Inject(OPENAI_INSTANCE) private readonly openai: OpenAI) {}

  async generateText(prompt: string) {
    try {
      const completion = await this.openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          { role: "developer", content: "You are a helpful assistant." },
          {
            role: "user",
            content: prompt,
          },
        ],
      });
      return completion.choices[0].message.content;
    } catch (error) {
      console.log(error);
     throw new Error(
       `Failed to generate text: ${error instanceof Error ? error.message : 'Unknown error'}`,
     );
    }
  }
}
