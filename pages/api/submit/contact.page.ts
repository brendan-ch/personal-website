import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import { Response } from '../../../types';

interface ContactFormBody {
  name: string,
  email: string,
  subject?: string,
  message: string,
}

// Define SMTP object
const SMTP_OBJECT: {
  [key: string]: string | undefined,
} = {
  SMTP_HOST: process.env.SMTP_HOST,
  SMTP_PORT: process.env.SMTP_PORT,
  SMTP_USERNAME: process.env.SMTP_USERNAME,
  SMTP_PASSWORD: process.env.SMTP_PASSWORD,
};
const NOREPLY_EMAIL = process.env.NOREPLY_EMAIL;
const CONTACT_EMAIL = process.env.CONTACT_EMAIL;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    // Check request body - return 400 error if malformed
    const { name, email, message, subject }: ContactFormBody = req.body;
    if (typeof name !== 'string' || typeof email !== 'string' || typeof message !== 'string') {
      const error400: Response = {
        successful: false,
        error: 'Invalid request. Double check the request body and try again.',
      };

      return res.status(400).json(error400);
    }

    // Connect to SMTP
  
    // Check for undefined
    if ((Object.keys(SMTP_OBJECT) as (string | undefined)[]).includes(undefined)) {
      // Server error
      return res.status(500).json({
        successful: false,
        error: 'Internal server error.',
      });
    }
  
    // Retrieve environment variables
    const { SMTP_HOST, SMTP_PORT, SMTP_PASSWORD, SMTP_USERNAME } = SMTP_OBJECT;
  
    // Connect using SMTP
    const transporter = nodemailer.createTransport({
      // @ts-ignore
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: false,
      auth: {
        user: SMTP_USERNAME,
        pass: SMTP_PASSWORD,
      },
      requireTLS: true,
    });
  
    // Check if transporter was created
    await transporter.verify();
    
    // Indicate status to client
    res.status(200).json({
      successful: true,
    });

    // Continue processing message after indicating status to client
    // Filter message

    // Send message

    const mail = {
      from: NOREPLY_EMAIL,
      to: CONTACT_EMAIL,
      subject,
      text: message,
    };
    await transporter.sendMail(mail);

    // Uncomment to send test message
    // const testMessage = {
    //   from: 'noreply@bchen.dev',
    //   to: 'me@bchen.dev',
    //   subject: 'Test Message',
    //   text: 'Hello World!',
    //   html: '<p>Hello World!</p>',
    // };

    // await transporter.sendMail(testMessage);

    // 
    

  } catch(e) {
    res.status(500).json({
      successful: false,
      error: 'Internal server error.',
    });
  }
}