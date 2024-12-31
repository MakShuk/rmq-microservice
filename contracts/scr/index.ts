import { IsNotEmpty, IsNumber, IsPositive, IsString, IsUrl, MinLength } from "class-validator";

export namespace TelegramSendNewMessage {
  export const topic = "telegram.massage-new.queue";

  export class Request {
    @IsString()
    //@ts-ignore
    message: string;

    @IsNumber()
    //@ts-ignore  
    userId: number;

    @IsNumber()
    @IsPositive()
    //@ts-ignore
    messageId: number;
  }

  export class Response {
    @IsString()
    //@ts-ignore
    telegram_message_id: number;
  }
}

export namespace TelegramUserMessage {
  export const topic = "telegram.user-message.queue";

  export class Request {
    @IsString()
    //@ts-ignore
    message: string;

    @IsNumber()
    //@ts-ignore  
    userId: number;

    @IsNumber()
    @IsPositive()
    //@ts-ignore
    messageId: number;
  }

  export class Response {
    @IsString()
    //@ts-ignore
    status: 0 | 1;
  }
}



export namespace TelegramSendUpdateMessage {
  export const topic = "telegram.massage-update.queue";

  export class Request {
    @IsString()
    //@ts-ignore
    message: string;

    @IsNumber()
    //@ts-ignore
    userId: number;

    @IsNumber()
    @IsPositive()
    //@ts-ignore
    telegram_message_id: number;
  }

  export class Response {
    @IsString()
    //@ts-ignore
    status: 0 | 1;
  }
}


export namespace GptMessage {
  export const topic = "gpt.massage.queue";

  export class Request {
    @IsString()
    // @ts-ignore
    message: string;

    @IsNumber()
    // @ts-ignore
    userId: number;

    @IsNumber()
    @IsPositive()
    // @ts-ignore
    messageId: number;
  }

  export class Response {
    @IsString()
    // @ts-ignore
    message: string;

    @IsNumber()
    // @ts-ignore
    userId: number;

    @IsNumber()
    @IsPositive()
    // @ts-ignore
    messageId: number;
  }
}

export namespace MainMessage {
  export const topic = "main.massage.queue";

  export class Request {
    @IsString()
    // @ts-ignore
    message: string;

    @IsNumber()
    // @ts-ignore
    userId: number;

    @IsNumber()
    @IsPositive()
    // @ts-ignore
    messageId: number;
  }

  export class Response { }
}

export namespace SummaryShortCreate {
  export const topic = 'summary.short.query';

  export class Request {
    @IsNumber()
    @IsNotEmpty()
    // @ts-ignore
    messageId: number;

    @IsString()
    @IsNotEmpty()
    @MinLength(300, {
      message: 'Text to summarize must be at least 300 characters long',
    })
    // @ts-ignore
    originalText: string;
  }

  export class Response {
    @IsNotEmpty()
    @IsString({ each: true })
    // @ts-ignore
    summary: string[];

    @IsNumber()
    // @ts-ignore
    messageId: number;
  }
}

export namespace SummaryUrlShortCreate {
  export const topic = 'summary.url-short.query';

  export class Request {
    @IsNumber()
    @IsNotEmpty()
    // @ts-ignore
    messageId: number;

    @IsUrl()
    @IsNotEmpty()

    // @ts-ignore
    url: string;
  }

  export class Response {
    @IsNotEmpty()
    @IsString({ each: true })
    // @ts-ignore
    summary: string[];

    @IsNumber()
    // @ts-ignore
    messageId: number;
  }
}

