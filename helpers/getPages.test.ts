import fs from 'fs/promises';
import { PAGINATION_LIMIT } from './Constants';
import getPages from './getPages';

jest.mock('fs/promises');

// Mock the return value
const testFrontMatter = `---
title: "Page Title"
description: "Page Description"
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

(fs.readFile as jest.Mock<any, any>).mockReturnValue(Buffer.from(testFrontMatter));
(fs.readdir as jest.Mock<any, any>).mockReturnValue(files);

beforeEach(() => {
  // Reset the mock
  (fs.readFile as jest.Mock<any, any>).mockClear();
});

describe('getPages', () => {
  it('Gets list of pages with prefix passed', async () => {
    const pages = await getPages({
      prefix: 'work',
    });

    expect(pages.pageData).toHaveLength(Math.min(PAGINATION_LIMIT, files.length - 1));
  });

  it('Gets list of pages with startIndex passed', async () => {
    const pages = await getPages({
      prefix: 'work',
      startIndex: 1,
      pageSize: 2,
    });

    expect(pages.pageData).toHaveLength(2);
  });
});