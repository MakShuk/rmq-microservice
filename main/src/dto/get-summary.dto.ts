import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsUrl } from 'class-validator';

export class GetSummaryDto {
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
    example:
      'Солнечный день радовал тёплыми лучами, когда Алекс шагал по шумным улицам города. Вокруг звучал смех детей, звон колокольчиков велосипедов и ароматы свежевыпеченного хлеба из близлежащей пекарни. Алекс почувствовал, что этот день – словно подарок. Всё вокруг казалось ярче и добрее, и жизнь наполнялась радостью и простотой.',
    minLength: 300,
    required: true,
  })
  @IsNotEmpty({ message: 'message обязателен' })
  @IsString({ message: 'message должен быть строкой' })
  originalText: string;
}

export class GetUrlSummaryDto {
  @ApiProperty({
    description: 'ID сообщения',
    example: 1,
    required: true,
  })
  @IsNotEmpty({ message: 'messageId обязателен' })
  @IsNumber({}, { message: 'messageId должен быть числом' })
  messageId: number;

  @ApiProperty({
    description: 'URL страницы',
    example: 'https://rozetked.me/posts/36614-anya-teylor-dzhoy-ohranyaet-mir-ot-tainstvennogo-zla',
    minLength: 300,
    required: true,
  })
  @IsNotEmpty({ message: 'url обязателен' })
  @IsUrl()
  url: string;
}
