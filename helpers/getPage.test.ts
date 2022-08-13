import getPage from './getPage';

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

beforeEach(() => {
  jest.clearAllMocks();
});

describe('getPage', () => {
  it('Gets page data', async () => {
    const result = await getPage({
      prefix: 'work',
      id: '1',
    });

    // Check frontmatter data
    expect(result.title).toStrictEqual('Title #1');
    expect(result.description).toStrictEqual('Description #1');

    // Check content data
    expect(result.content).toBeNull();
  });
});