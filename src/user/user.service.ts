import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { parsePhoneNumber } from 'libphonenumber-js';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  formatPhone(phone: string) {
    try {
      const { number } = parsePhoneNumber(phone);
      return number;
    } catch {}

    try {
      const { number } = parsePhoneNumber(phone, 'FR');
      return number;
    } catch {
      throw new HttpException('Invalid phone number', HttpStatus.BAD_REQUEST);
    }
  }

  async user(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
  }

  async users(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
    distinct?: Prisma.Enumerable<Prisma.UserScalarFieldEnum>;
  }): Promise<User[]> {
    const { skip, take, cursor, where, orderBy, distinct } = params;
    return this.prisma.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      distinct,
    });
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({
      data,
    });
  }

  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    const { where, data } = params;
    return this.prisma.user.update({
      data,
      where,
    });
  }

  async deleteUserByPhone(phone: string): Promise<Prisma.BatchPayload> {
    return this.prisma.user.deleteMany({
      where: {
        phone: {
          equals: phone,
        },
      },
    });
  }
}
