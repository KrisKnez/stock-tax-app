import { ApiPropertyOptional } from '@nestjs/swagger';
import { Prisma } from '@stock-tax-app/database';
import { IsIn, IsOptional } from 'class-validator';

export class SortUserDto {
  @ApiPropertyOptional({ enum: Object.keys(Prisma.SortOrder) })
  @IsIn(Object.keys(Prisma.SortOrder))
  @IsOptional()
  idOrderBy?: Prisma.SortOrder;

  @ApiPropertyOptional({
    enum: Object.keys(Prisma.SortOrder),
  })
  @IsIn(Object.keys(Prisma.SortOrder))
  @IsOptional()
  nameOrderBy?: Prisma.SortOrder;

  @ApiPropertyOptional({
    enum: Object.keys(Prisma.SortOrder),
  })
  @IsIn(Object.keys(Prisma.SortOrder))
  @IsOptional()
  emailOrderBy?: Prisma.SortOrder;

  toPrismaOrderBy(): Prisma.UserOrderByWithAggregationInput {
    return {
      id: this.idOrderBy,
      name: this.nameOrderBy,
      email: this.emailOrderBy,
    };
  }
}
