import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const smtpObject: {
    [key: string]: string | undefined,
  } = {
    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_PORT: process.env.SMTP_PORT,
    SMTP_USERNAME: process.env.SMTP_USERNAME,
    SMTP_PASSWORD: process.env.SMTP_PASSWORD,
  };

  // Check for undefined
  if ((Object.keys(smtpObject) as (string | undefined)[]).includes(undefined)) {
    // Server error
    return res.status(500).json({
      successful: false,
      error: 'Internal server error.',
    });
  }

  // Retrieve environment variables
  const { SMTP_HOST, SMTP_PORT, SMTP_PASSWORD, SMTP_USERNAME } = smtpObject;

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
  const result = await transporter.verify();
  res.status(200).json({
    successful: true,
    data: {
      result,
    },
  })
}