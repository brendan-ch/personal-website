import handler from './pages.page';
import fs from 'fs/promises';

jest.mock('fs/promises');

const testFrontMatter = `---
title: "Page Title"
description: "Page Description"

tags:
- Featured
- UI/UX Design
---

Page Content
`;

const files = [
  'file1.md',
  'file2.md',
  'file3.md',
  'file4.md',
  'file5.md',
  'file6.md',
  'file7.md',
  'file8.md',
  'file9.md',
  'unrelatedFolder',
];

(fs.readdir as jest.Mock<any, any>).mockReturnValue(files);
(fs.readFile as jest.Mock<any, any>).mockReturnValue(Buffer.from(testFrontMatter));

const resReturnObj = {
  json: jest.fn(),
};

const res = {
  status: jest.fn((code: number) => {
    return resReturnObj;
  }),
}

beforeEach(() => {
  // Reset the mock
  (fs.readFile as jest.Mock<any, any>).mockClear();
  res.status.mockClear();
  resReturnObj.json.mockClear();
});

describe('POST /api/query/pages', () => {
  it('Returns an array of pages', async () => {
    // @ts-ignore
    const result = await handler({
      body: {
        prefix: 'work',
      },
    }, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(resReturnObj.json).toHaveBeenCalledTimes(1);
  });

  it('Throws error if invalid request body', async () => {
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