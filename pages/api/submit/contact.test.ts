import handler from './contact.page';
import { ContactFormBody } from '../../../types';
import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

jest.mock('nodemailer');

const transporter = {
  verify: jest.fn(() => true),
  sendMail: jest.fn((message: SMTPTransport.SentMessageInfo) => {
    return;
  }),
};

(nodemailer.createTransport as jest.Mock<any, any>).mockReturnValue(transporter);

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