import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, Min } from 'class-validator';
import { Brand } from 'utility-types';

export class OffsetPaginationDto
  implements Brand<object, 'OffsetPaginationDto'>
{
  __brand: 'OffsetPaginationDto';

  @ApiPropertyOptional()
  @Min(1)
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  limit: number = 10;

  @ApiPropertyOptional()
  @Min(0)
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  offset: number = 0;
}
