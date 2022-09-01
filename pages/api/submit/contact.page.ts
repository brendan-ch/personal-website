import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import { Response, ContactFormBody } from '../../../types';

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

const MESSAGE_LENGTH_MINIMUM = 16;

const ERROR_400: Response = {
  successful: false,
  error: 'Invalid request. Double check the request body and try again.',
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    // Check request body - return 400 error if malformed
    const { name, email, message, subject }: ContactFormBody = req.body;
    if (typeof name !== 'string' || typeof email !== 'string' || typeof message !== 'string') {
      return res.status(400).json(ERROR_400);
    }

    // Connect to SMTP
    // Check for undefined keys inside SMTP configuration
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

    // Filter message
    // Check length
    if (message.length < MESSAGE_LENGTH_MINIMUM) {
      return res.status(400).json({
        ...ERROR_400,
        error: `Message must be longer than ${MESSAGE_LENGTH_MINIMUM} characters.`
      });
    }

    // Check words


    // Verify email address exists
    // Validate using regex
    if (!/.+@[A-Za-z0-9_]+\.[A-Za-z]+/.test(email)) {
      return res.status(400).json(ERROR_400);
    }
    
    // Send message
    const mail = {
      from: NOREPLY_EMAIL,
      to: CONTACT_EMAIL,
      subject,
      text: message,
      replyTo: email,
    };
    await transporter.sendMail(mail);

    // Indicate status to client
    return res.status(200).json({
      successful: true,
    });
  } catch(e) {
    res.status(500).json({
      successful: false,
      error: 'Internal server error.',
    });
  }
}