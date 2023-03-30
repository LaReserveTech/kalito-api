import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    const phone = this.userService.formatPhone(createUserDto.phone);
    return this.userService.createUser({ ...createUserDto, phone });
  }

  @Delete(':phone')
  remove(@Param('phone') rawPhone: string) {
    const phone = this.userService.formatPhone(rawPhone);

    return this.userService.deleteUserByPhone(phone);
  }
}
