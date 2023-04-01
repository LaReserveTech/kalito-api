import { Injectable } from '@nestjs/common';
import { State, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { messages } from './message.constants';

@Injectable()
export class MessageService {
  constructor(private prisma: PrismaService) {}

  async sendMessage(user: User, state: State) {
    /**
     * SMS Provider part
     */
    console.log(user.id, messages[state]);

    await this.prisma.message.create({
      data: {
        user: {
          connect: {
            id: user.id,
          },
        },
        state: state,
      },
    });
  }
}
