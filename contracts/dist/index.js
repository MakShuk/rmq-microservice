"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SummaryUrlShortCreate = exports.SummaryShortCreate = exports.MainMessage = exports.GptMessage = exports.TelegramSendUpdateMessage = exports.TelegramUserMessage = exports.TelegramSendNewMessage = void 0;
const class_validator_1 = require("class-validator");
var TelegramSendNewMessage;
(function (TelegramSendNewMessage) {
    TelegramSendNewMessage.topic = "telegram.massage-new.queue";
    class Request {
    }
    __decorate([
        (0, class_validator_1.IsString)()
        //@ts-ignore
        ,
        __metadata("design:type", String)
    ], Request.prototype, "message", void 0);
    __decorate([
        (0, class_validator_1.IsNumber)()
        //@ts-ignore  
        ,
        __metadata("design:type", Number)
    ], Request.prototype, "userId", void 0);
    __decorate([
        (0, class_validator_1.IsNumber)(),
        (0, class_validator_1.IsPositive)()
        //@ts-ignore
        ,
        __metadata("design:type", Number)
    ], Request.prototype, "messageId", void 0);
    TelegramSendNewMessage.Request = Request;
    class Response {
    }
    __decorate([
        (0, class_validator_1.IsString)()
        //@ts-ignore
        ,
        __metadata("design:type", Number)
    ], Response.prototype, "telegram_message_id", void 0);
    TelegramSendNewMessage.Response = Response;
})(TelegramSendNewMessage || (exports.TelegramSendNewMessage = TelegramSendNewMessage = {}));
var TelegramUserMessage;
(function (TelegramUserMessage) {
    TelegramUserMessage.topic = "telegram.user-message.queue";
    class Request {
    }
    __decorate([
        (0, class_validator_1.IsString)()
        //@ts-ignore
        ,
        __metadata("design:type", String)
    ], Request.prototype, "message", void 0);
    __decorate([
        (0, class_validator_1.IsNumber)()
        //@ts-ignore  
        ,
        __metadata("design:type", Number)
    ], Request.prototype, "userId", void 0);
    __decorate([
        (0, class_validator_1.IsNumber)(),
        (0, class_validator_1.IsPositive)()
        //@ts-ignore
        ,
        __metadata("design:type", Number)
    ], Request.prototype, "messageId", void 0);
    TelegramUserMessage.Request = Request;
    class Response {
    }
    __decorate([
        (0, class_validator_1.IsString)()
        //@ts-ignore
        ,
        __metadata("design:type", Number)
    ], Response.prototype, "status", void 0);
    TelegramUserMessage.Response = Response;
})(TelegramUserMessage || (exports.TelegramUserMessage = TelegramUserMessage = {}));
var TelegramSendUpdateMessage;
(function (TelegramSendUpdateMessage) {
    TelegramSendUpdateMessage.topic = "telegram.massage-update.queue";
    class Request {
    }
    __decorate([
        (0, class_validator_1.IsString)()
        //@ts-ignore
        ,
        __metadata("design:type", String)
    ], Request.prototype, "message", void 0);
    __decorate([
        (0, class_validator_1.IsNumber)()
        //@ts-ignore
        ,
        __metadata("design:type", Number)
    ], Request.prototype, "userId", void 0);
    __decorate([
        (0, class_validator_1.IsNumber)(),
        (0, class_validator_1.IsPositive)()
        //@ts-ignore
        ,
        __metadata("design:type", Number)
    ], Request.prototype, "telegram_message_id", void 0);
    TelegramSendUpdateMessage.Request = Request;
    class Response {
    }
    __decorate([
        (0, class_validator_1.IsString)()
        //@ts-ignore
        ,
        __metadata("design:type", Number)
    ], Response.prototype, "status", void 0);
    TelegramSendUpdateMessage.Response = Response;
})(TelegramSendUpdateMessage || (exports.TelegramSendUpdateMessage = TelegramSendUpdateMessage = {}));
var GptMessage;
(function (GptMessage) {
    GptMessage.topic = "gpt.massage.queue";
    class Request {
    }
    __decorate([
        (0, class_validator_1.IsString)()
        // @ts-ignore
        ,
        __metadata("design:type", String)
    ], Request.prototype, "message", void 0);
    __decorate([
        (0, class_validator_1.IsNumber)()
        // @ts-ignore
        ,
        __metadata("design:type", Number)
    ], Request.prototype, "userId", void 0);
    __decorate([
        (0, class_validator_1.IsNumber)(),
        (0, class_validator_1.IsPositive)()
        // @ts-ignore
        ,
        __metadata("design:type", Number)
    ], Request.prototype, "messageId", void 0);
    GptMessage.Request = Request;
    class Response {
    }
    __decorate([
        (0, class_validator_1.IsString)()
        // @ts-ignore
        ,
        __metadata("design:type", String)
    ], Response.prototype, "message", void 0);
    __decorate([
        (0, class_validator_1.IsNumber)()
        // @ts-ignore
        ,
        __metadata("design:type", Number)
    ], Response.prototype, "userId", void 0);
    __decorate([
        (0, class_validator_1.IsNumber)(),
        (0, class_validator_1.IsPositive)()
        // @ts-ignore
        ,
        __metadata("design:type", Number)
    ], Response.prototype, "messageId", void 0);
    GptMessage.Response = Response;
})(GptMessage || (exports.GptMessage = GptMessage = {}));
var MainMessage;
(function (MainMessage) {
    MainMessage.topic = "main.massage.queue";
    class Request {
    }
    __decorate([
        (0, class_validator_1.IsString)()
        // @ts-ignore
        ,
        __metadata("design:type", String)
    ], Request.prototype, "message", void 0);
    __decorate([
        (0, class_validator_1.IsNumber)()
        // @ts-ignore
        ,
        __metadata("design:type", Number)
    ], Request.prototype, "userId", void 0);
    __decorate([
        (0, class_validator_1.IsNumber)(),
        (0, class_validator_1.IsPositive)()
        // @ts-ignore
        ,
        __metadata("design:type", Number)
    ], Request.prototype, "messageId", void 0);
    MainMessage.Request = Request;
    class Response {
    }
    MainMessage.Response = Response;
})(MainMessage || (exports.MainMessage = MainMessage = {}));
var SummaryShortCreate;
(function (SummaryShortCreate) {
    SummaryShortCreate.topic = 'summary.short.query';
    class Request {
    }
    __decorate([
        (0, class_validator_1.IsNumber)(),
        (0, class_validator_1.IsNotEmpty)()
        // @ts-ignore
        ,
        __metadata("design:type", Number)
    ], Request.prototype, "messageId", void 0);
    __decorate([
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.MinLength)(300, {
            message: 'Text to summarize must be at least 300 characters long',
        })
        // @ts-ignore
        ,
        __metadata("design:type", String)
    ], Request.prototype, "originalText", void 0);
    SummaryShortCreate.Request = Request;
    class Response {
    }
    __decorate([
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsString)({ each: true })
        // @ts-ignore
        ,
        __metadata("design:type", Array)
    ], Response.prototype, "summary", void 0);
    __decorate([
        (0, class_validator_1.IsNumber)()
        // @ts-ignore
        ,
        __metadata("design:type", Number)
    ], Response.prototype, "messageId", void 0);
    SummaryShortCreate.Response = Response;
})(SummaryShortCreate || (exports.SummaryShortCreate = SummaryShortCreate = {}));
var SummaryUrlShortCreate;
(function (SummaryUrlShortCreate) {
    SummaryUrlShortCreate.topic = 'summary.url-short.query';
    class Request {
    }
    __decorate([
        (0, class_validator_1.IsNumber)(),
        (0, class_validator_1.IsNotEmpty)()
        // @ts-ignore
        ,
        __metadata("design:type", Number)
    ], Request.prototype, "messageId", void 0);
    __decorate([
        (0, class_validator_1.IsUrl)(),
        (0, class_validator_1.IsNotEmpty)()
        // @ts-ignore
        ,
        __metadata("design:type", String)
    ], Request.prototype, "url", void 0);
    SummaryUrlShortCreate.Request = Request;
    class Response {
    }
    __decorate([
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsString)({ each: true })
        // @ts-ignore
        ,
        __metadata("design:type", Array)
    ], Response.prototype, "summary", void 0);
    __decorate([
        (0, class_validator_1.IsNumber)()
        // @ts-ignore
        ,
        __metadata("design:type", Number)
    ], Response.prototype, "messageId", void 0);
    SummaryUrlShortCreate.Response = Response;
})(SummaryUrlShortCreate || (exports.SummaryUrlShortCreate = SummaryUrlShortCreate = {}));
