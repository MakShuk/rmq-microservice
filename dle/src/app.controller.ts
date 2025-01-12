import { Controller } from '@nestjs/common';
import { RMQRoute, RMQMessage } from 'nestjs-rmq';
import { ConsumeMessage } from 'amqplib';
import * as fs from 'fs';
import * as path from 'path';

@Controller()
export class AppController {
    private readonly logsDir = 'logs';

    constructor() {
        // Создаем директорию для логов, если она не существует
        if (!fs.existsSync(this.logsDir)) {
            fs.mkdirSync(this.logsDir);
        }
    }

    private saveToJsonFile(messageInfo: any): void {
        // Создаем имя файла на основе текущей даты
        const currentDate = new Date();
        const dateStr = currentDate.toISOString().split('T')[0]; // Формат: YYYY-MM-DD
        const fileName = path.join(this.logsDir, `messages_${dateStr}.json`);

        try {
            // Читаем существующие логи или создаем новый массив
            let existingLogs = [];
            if (fs.existsSync(fileName)) {
                const fileContent = fs.readFileSync(fileName, 'utf-8');
                existingLogs = JSON.parse(fileContent);
            }

            // Добавляем новое сообщение к существующим логам
            existingLogs.push(messageInfo);

            // Сохраняем обновленный массив логов
            fs.writeFileSync(fileName, JSON.stringify(existingLogs, null, 2));
            console.log(`📝 Лог добавлен в файл: ${fileName}`);
        } catch (error) {
            console.error('❌ Ошибка при сохранении лога:', error);
        }
    }

    @RMQRoute('expired.queue')
    async getHello(
        payload: any,
        @RMQMessage message: ConsumeMessage,
    ): Promise<string> {
        const time = new Date().toISOString();
        // Получаем информацию о сообщении
        const messageInfo = {
            timestamp: time,
            payload: payload,
            messageProperties: {
                messageId: message.properties.messageId,
                correlationId: message.properties.correlationId,
                timestamp: new Date(message.properties.timestamp).toISOString(),
                headers: message.properties.headers,
                contentType: message.properties.contentType,
                replyTo: message.properties.replyTo,
                expiration: message.properties.expiration,
            },
            exchange: message.fields.exchange,
            routingKey: message.fields.routingKey,
            queueName: 'expired.queue',
            consumerTag: message.fields.consumerTag,
            deliveryTag: message.fields.deliveryTag,
            deathInfo: {
                firstDeath: {
                    exchange: message.properties?.headers?.['x-first-death-exchange'] || 'н/д',
                    queue: message.properties?.headers?.['x-first-death-queue'] || 'н/д',
                    reason: message.properties?.headers?.['x-first-death-reason'] || 'н/д',
                },
                lastDeath: {
                    exchange: message.properties?.headers?.['x-last-death-exchange'] || 'н/д',
                    queue: message.properties?.headers?.['x-last-death-queue'] || 'н/д',
                    reason: message.properties?.headers?.['x-last-death-reason'] || 'н/д',
                }
            }
        };

        // Сохраняем информацию в JSON файл
        this.saveToJsonFile(messageInfo);

        // Красивый вывод в консоль
        console.log('\n🐰 Получено новое RabbitMQ сообщение:');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('📅 Время получения:', messageInfo.timestamp);
        console.log('📦 Полезная нагрузка:', JSON.stringify(messageInfo.payload, null, 2));
        console.log('📝 Свойства сообщения:');
        console.log('   • ID сообщения:', messageInfo.messageProperties.messageId);
        console.log('   • Correlation ID:', messageInfo.messageProperties.correlationId);
        console.log('   • Временная метка:', messageInfo.messageProperties.timestamp);
        console.log('   • Тип контента:', messageInfo.messageProperties.contentType);
        console.log('   • Срок действия:', messageInfo.messageProperties.expiration);
        console.log('🔄 Информация о маршрутизации:');
        console.log('   • Exchange:', messageInfo.exchange);
        console.log('   • Routing Key:', messageInfo.routingKey);
        console.log('   • Очередь:', messageInfo.queueName);
        console.log('   • Consumer Tag:', messageInfo.consumerTag);
        console.log('   • Delivery Tag:', messageInfo.deliveryTag);
        console.log('💀 История сообщения:');
        console.log('   Первая истечение срока:');
        console.log('   • Exchange:', messageInfo.deathInfo.firstDeath.exchange);
        console.log('   • Очередь:', messageInfo.deathInfo.firstDeath.queue);
        console.log('   • Причина:', messageInfo.deathInfo.firstDeath.reason);
        console.log('   Последние истечение срока:');
        console.log('   • Exchange:', messageInfo.deathInfo.lastDeath.exchange);
        console.log('   • Очередь:', messageInfo.deathInfo.lastDeath.queue);
        console.log('   • Причина:', messageInfo.deathInfo.lastDeath.reason);
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

        return `Сообщение обработано в ${time}`;
    }
}