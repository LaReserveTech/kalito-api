import {
  Body,
  Controller,
  Delete,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly prismaService: PrismaService,
  ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const phone = this.userService.formatPhone(createUserDto.phone);

    const commune = await this.prismaService.commune.findFirst({
      where: {
        nomcommune: {
          contains: createUserDto?.commune?.toLowerCase(),
          mode: 'insensitive',
        },
      },
    });

    console.log(commune);

    if (!commune) {
      throw new HttpException('Commune invalide', HttpStatus.BAD_REQUEST);
    }

    return this.userService.createUser({
      ...createUserDto,
      phone,
      commune: {
        connect: {
          id: commune.id,
        },
      },
    });
  }

  @Delete(':phone')
  remove(@Param('phone') rawPhone: string) {
    const phone = this.userService.formatPhone(rawPhone);

    return this.userService.deleteUserByPhone(phone);
  }
}
