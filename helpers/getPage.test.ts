import fs from 'fs/promises';
import getPage from './getPage';

jest.mock('fs/promises');

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
});

describe('getPage', () => {
  it('Gets page data', async () => {
    const result = await getPage({
      prefix: 'work',
      id: 'pretty-link',
    });

    // Check frontmatter data
    expect(result.title).toStrictEqual('Page Title');
    expect(result.description).toStrictEqual('Page Description');

    // Check content data
    expect(result.content).toBeNull();
  });

  it('Gets page data with content', async () => {
    const result = await getPage({
      prefix: 'work',
      id: 'pretty-link',
      withContent: true,
    });

    expect(result.content).toContain('Page Content');
  });
});