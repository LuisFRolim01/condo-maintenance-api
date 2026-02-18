import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {

  private transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  async sendMaintenanceAlert(
    to: string,
    areaName: string,
    type: string,
    nextDate: Date,
  ) {
    await this.transporter.sendMail({
      from: `"Condo Maintenance" <${process.env.EMAIL_USER}>`,
      to,
      subject: `Manutenção próxima - ${areaName}`,
      html: `
        <h3>Alerta de Manutenção</h3>
        <p><strong>Área:</strong> ${areaName}</p>
        <p><strong>Tipo:</strong> ${type}</p>
        <p><strong>Data prevista:</strong> ${nextDate.toDateString()}</p>
      `,
    });
  }
}
