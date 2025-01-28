import { PaginatedDtoMixin } from 'src/common/mixins/paginated-dto.mixin';
import { UserDto } from './user.dto';
import { plainToInstance } from 'class-transformer';
import { Brand } from 'utility-types';

export class PaginatedUserDto
  extends PaginatedDtoMixin(UserDto)
  implements Brand<object, 'PaginatedUserDto'>
{
  __brand: 'PaginatedUserDto';

  static fromEntityArray(
    users: UserDto[],
    totalItems: number,
    currentPage: number,
    itemsPerPage: number,
  ): PaginatedUserDto {
    return plainToInstance(PaginatedUserDto, {
      data: users,
      totalItems,
      currentPage,
      totalPages: Math.ceil(totalItems / itemsPerPage),
      itemsPerPage,
    });
  }
}
