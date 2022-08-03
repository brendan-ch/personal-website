import handler from './page.page';
import fs from 'fs/promises';

// Add mocks
jest.mock('fs/promises');

const resReturnObj = {
  json: jest.fn(),
};

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

beforeEach(() => {
  // Reset the mock
  (fs.readFile as jest.Mock<any, any>).mockClear();
  res.status.mockClear();
  resReturnObj.json.mockClear();
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

