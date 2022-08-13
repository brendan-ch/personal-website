import { PAGINATION_LIMIT } from './Constants';
import getPages from './getPages';

jest.mock('../scripts/output/data.json', () => ({
  work: [
    {
      id: '1',
      title: 'Title #1',
      description: 'Description #1',
      tags: ['Graphic Design'],
      prefix: 'work',
      content: 'Page Content',
      previewImage: null,
      coverImage: null,
    },
    {
      id: '2',
      title: 'Title #2',
      description: 'Description #2',
      tags: ['UI/UX Design'],
      prefix: 'work',
      content: null,
      previewImage: null,
      coverImage: null,
    },
    {
      id: '3',
      title: 'Title #3',
      description: 'Description #3',
      tags: ['App Dev'],
      prefix: 'work',
      content: null,
      previewImage: null,
      coverImage: null,
    },
  ],
  about: [],
  doc: [],
  blog: [],
}));

describe('getPages', () => {
  it('Gets list of pages with prefix passed', async () => {
    const pages = await getPages({
      prefix: 'work',
      pageSize: PAGINATION_LIMIT,
    });

    expect(pages.pageData).toHaveLength(3);
  });

  it('Gets list of pages with startIndex passed', async () => {
    const pages = await getPages({
      prefix: 'work',
      startIndex: 1,
      pageSize: 2,
    });

    expect(pages.pageData).toHaveLength(2);
  });

  it('Filters the correct pages with tags', async () => {
    const pages = await getPages({
      prefix: 'work',
      filter: [
        {
          tags: {
            contains: ['Graphic Design'],
          },
        },
      ],
    });

    expect(pages.pageData).toHaveLength(1);
    // pages.pageData.forEach((value) => {
    //   expect(value.tags?.includes('Featured')).toBeTruthy();
    // });
  });

  it('Filters the correct pages with title', async () => {
    const pages = await getPages({
      prefix: 'work',
      filter: [
        {
          title: {
            contains: 'Title #1',
          },
        },
      ],
    });

    expect(pages.pageData).toHaveLength(1);
  });

  it('Filters the correct pages with description', async () => {
    const pages = await getPages({
      prefix: 'work',
      filter: [
        {
          description: {
            contains: 'Description #1',
          },
        },
      ],
    });

    expect(pages.pageData).toHaveLength(1);
  });

  it('Throws an error if the prefix doesn\'t exist', async () => {
    expect(async () => {
      await getPages({
        prefix: 'dummy',
        filter: [
          {
            description: {
              contains: 'Description #1',
            },
          },
        ],
      });
    }).rejects.toThrow();
  });
});