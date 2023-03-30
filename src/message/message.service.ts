import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MessageService {
  constructor(private prisma: PrismaService) {}

  async sendMessage(user: User) {
    /**
     * SMS Provider part
     */
    console.log(
      `Sending message to ${user.phone}: D'après nos relevés, il n'est pas recommandé de donner l'eau du robinet aux enfants en bas âge et femmes enceinte.`,
    );

    // await this.prisma.message.create({
    //   data: {
    //     state: report.state,
    //     reportId: report.id,
    //     userId: user.id,
    //   },
    // });
  }
}
