import fs from 'fs/promises';
import getPages from './getPages';

jest.mock('fs/promises');

// Mock the return value
const testFrontMatter = `---
title: "Page Title"
description: "Page Description"
---

Page Content
`;
(fs.readFile as jest.Mock<any, any>).mockReturnValue(Buffer.from(testFrontMatter));
(fs.readdir as jest.Mock<any, any>).mockReturnValue([
  'file1.md',
  'file2.md',
]);

beforeEach(() => {
  // Reset the mock
  (fs.readFile as jest.Mock<any, any>).mockClear();
});

describe('getPages', () => {
  it('Gets list of pages with prefix passed', async () => {
    const pages = await getPages({
      prefix: 'work',
    });

    expect(pages).toHaveLength(2);
  });

  it('Gets list of pages without prefix passed', async () => {
    const pages = await getPages({
    });

    expect(pages).toHaveLength(6);
  });
});