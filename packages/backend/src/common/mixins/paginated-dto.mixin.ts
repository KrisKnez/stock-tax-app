import { ApiProperty } from '@nestjs/swagger';
import { Type } from '@nestjs/common';
import { Expose } from 'class-transformer';

export function PaginatedDtoMixin<T>(classRef: Type<T>) {
  class Paginated {
    @ApiProperty({
      isArray: true,
      type: () => [classRef],
    })
    @Expose()
    data: T[];

    @ApiProperty()
    @Expose()
    totalItems: number;

    @ApiProperty()
    @Expose()
    currentPage: number;

    @ApiProperty()
    @Expose()
    totalPages: number;

    @ApiProperty()
    @Expose()
    itemsPerPage: number;
  }

  return Paginated;
}
