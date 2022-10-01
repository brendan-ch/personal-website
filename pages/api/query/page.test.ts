import handler from './page.page';
import fs from 'fs/promises';
import axios from 'axios';

// Add mocks
jest.mock('fs/promises');
jest.mock('axios');

const resReturnObj = {
  json: jest.fn(),
};

// environment variable mocks
const OLD_ENV = process.env;

const res = {
  status: jest.fn((code: number) => {
    return resReturnObj;
  }),
}

// Mock the return value
const testFrontMatter = `---
title: "Page Title"
description: "Page Description"
---

Page Content
`;
(fs.readFile as jest.Mock<any, any>).mockReturnValue(Buffer.from(testFrontMatter));

// axios mocks
(axios.post as jest.Mock<any, any>).mockReturnValue({
  data: {
    success: true,
    score: 0.6,
  },
});

beforeEach(() => {
  

  // Reset the mock
  (fs.readFile as jest.Mock<any, any>).mockClear();
  res.status.mockClear();
  resReturnObj.json.mockClear();

  // Set environment variables
  process.env = {
    ...OLD_ENV,
    CAPTCHA_SECRET: '23456',
  };
});

describe('POST /api/query/page', () => {
  it('Returns the correct page metadata', async () => {
    // @ts-ignore
    const result = await handler({
      body: {
        prefix: 'work',
        id: '1',
      },
    }, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(resReturnObj.json).toHaveBeenCalledTimes(1);
  });

  it('Returns a 400 error if invalid request body', async () => {
    // @ts-ignore
    const result = await handler({
      body: {
        prefix: 1234,
      },
    }, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(resReturnObj.json).toHaveBeenCalledTimes(1);
  });
});

