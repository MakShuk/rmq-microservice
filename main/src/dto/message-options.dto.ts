import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';


export class SendMessageDto {
  @ApiProperty({
    description: 'ID сообщения',
    example: 1,
    required: true,
  })
  @IsNotEmpty({ message: 'messageId обязателен' })
  @IsNumber({}, { message: 'messageId должен быть числом' })
  messageId: number;

  @ApiProperty({
    description: 'Текст сообщения',
    example: 'Привет, это тестовое сообщение!',
    minLength: 1,
    required: true,
  })
  @IsNotEmpty({ message: 'message обязателен' })
  @IsString({ message: 'message должен быть строкой' })
  message: string;

  @ApiProperty({
    description: 'ID пользователя',
    example: 123,
    required: true,
  })
  @IsNotEmpty({ message: 'userId обязателен' })
  @IsNumber({}, { message: 'userId должен быть числом' })
  userId: number;
}
