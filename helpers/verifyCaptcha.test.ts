import verifyCaptcha from './verifyCaptcha';
import axios from 'axios';

jest.mock('axios');

// environment variable mocks
const OLD_ENV = process.env;

// axios mocks
(axios.post as jest.Mock<any, any>).mockReturnValue({
  data: {
    success: true,
  },
});

beforeEach(() => {
  // Set environment variables
  process.env = {
    ...OLD_ENV,
    CAPTCHA_SECRET: '23456',
  };
});

describe('verifyCaptcha', () => {
  it('Makes a POST request', async () => {
    const result = await verifyCaptcha('12345', '23456');
    expect(result).toBe(true);
  });
});