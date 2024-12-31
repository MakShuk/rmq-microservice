export declare namespace TelegramSendNewMessage {
    const topic = "telegram.massage-new.queue";
    class Request {
        message: string;
        userId: number;
        messageId: number;
    }
    class Response {
        telegram_message_id: number;
    }
}
export declare namespace TelegramUserMessage {
    const topic = "telegram.user-message.queue";
    class Request {
        message: string;
        userId: number;
        messageId: number;
    }
    class Response {
        status: 0 | 1;
    }
}
export declare namespace TelegramSendUpdateMessage {
    const topic = "telegram.massage-update.queue";
    class Request {
        message: string;
        userId: number;
        telegram_message_id: number;
    }
    class Response {
        status: 0 | 1;
    }
}
export declare namespace GptMessage {
    const topic = "gpt.massage.queue";
    class Request {
        message: string;
        userId: number;
        messageId: number;
    }
    class Response {
        message: string;
        userId: number;
        messageId: number;
    }
}
export declare namespace MainMessage {
    const topic = "main.massage.queue";
    class Request {
        message: string;
        userId: number;
        messageId: number;
    }
    class Response {
    }
}
export declare namespace SummaryShortCreate {
    const topic = "summary.short.query";
    class Request {
        messageId: number;
        originalText: string;
    }
    class Response {
        summary: string[];
        messageId: number;
    }
}
export declare namespace SummaryUrlShortCreate {
    const topic = "summary.url-short.query";
    class Request {
        messageId: number;
        url: string;
    }
    class Response {
        summary: string[];
        messageId: number;
    }
}
