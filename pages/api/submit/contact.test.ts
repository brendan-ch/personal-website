import handler, { verifyCaptcha } from './contact.page';
import nodemailer from 'nodemailer';
import axios from 'axios';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

jest.mock('nodemailer');
jest.mock('axios');

// environment variable mocks
const OLD_ENV = process.env;

// nodemailer mocks
const transporter = {
  verify: jest.fn(() => true),
  sendMail: jest.fn((message: SMTPTransport.SentMessageInfo) => {
    return;
  }),
};

(nodemailer.createTransport as jest.Mock<any, any>).mockReturnValue(transporter);

// axios mocks
(axios.post as jest.Mock<any, any>).mockReturnValue({
  data: {
    success: true,
  },
});

// request mocks
const resReturnObj = {
  json: jest.fn(),
};

const res = {
  status: jest.fn((code: number) => {
    return resReturnObj;
  }),
}

beforeEach(() => {
  // Reset mocks
  res.status.mockClear();
  resReturnObj.json.mockClear();

  transporter.sendMail.mockClear();
  transporter.verify.mockClear();

  (axios.post as jest.Mock<any, any>).mockClear();

  // Set environment variables
  process.env = {
    ...OLD_ENV,
    CONTACT_EMAIL: 'email@example.com',
    NOREPLY_EMAIL: 'noreply@example.com',
    CAPTCHA_SECRET: '23456',
  };
});


describe('POST /api/submit/contact', () => {
  it('Sends a nodemailer message', async () => {
    // @ts-ignore
    await handler({
      body: {
        name: 'Test Name',
        email: 'example@example.com',
        subject: 'Test Subject',
        message: 'Message used for testing.',
      },
    }, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(resReturnObj.json).toHaveBeenCalledTimes(1);

    expect(nodemailer.createTransport).toHaveBeenCalled();
    expect(transporter.sendMail).toHaveBeenCalled();
  });

  it('Sends error code if malformed body provided', async () => {
    // @ts-ignore
    await handler({
      body: {
        name: undefined,
        email: 'example@example.com',
        subject: undefined,
        message: undefined,
      },
    }, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(resReturnObj.json).toHaveBeenCalledTimes(1);
  });

  it('Sends error code if invalid email provided', async () => {
    // @ts-ignore
    await handler({
      body: {
        name: 'Test Name',
        email: 'example@not-an-email-address',
        subject: 'Test Subject',
        message: 'Test Message',
      },
    }, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(resReturnObj.json).toHaveBeenCalledTimes(1);
  });
});

describe('verifyCaptcha', () => {
  it('Makes a POST request', async () => {
    const result = await verifyCaptcha('12345', '23456');
    expect(result).toBe(true);
  });
});