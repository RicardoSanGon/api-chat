import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'angelgaelguevaraguerrero29@gmail.com',
        pass: 'qigi mivw lhwr nvtc',
      },
    });
  }

  async sendVerificationEmail(email: string, code: string) {
    const mailOptions = {
      from: 'cr7siuuu@gmail.com',
      to: email,
      subject: 'Código de verificación',
      text: `Tu código de verificación es: ${code}`,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log(`Correo enviado a ${email} con el código de verificación: ${code}`);
    } catch (error) {
      console.error('Error enviando el correo:', error);
    }
  }
}
