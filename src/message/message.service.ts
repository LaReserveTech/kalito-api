import { Injectable } from '@nestjs/common';

@Injectable()
export class MessageService {
  async sendMessage(phone: string) {
    console.log(
      `Sending message to ${phone}: D'après nos relevés, il n'est pas recommandé de donner l'eau du robinet aux enfants en bas âge et femmes enceinte.`,
    );
  }
}
