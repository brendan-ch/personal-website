import { PageData } from '../types';
import getTags from './getTags';

const mockData: PageData[] = [
  {
    title: 'Title',
    description: 'Desc',
    tags: ['Tag #1', 'Tag #2'],
    content: null,
    id: '1',
    previewImage: null,
    coverImage: null,
    
    links: null,
    type: 'vertical',
    date: null,
    prefix: 'work',
    allImages: [],
  },
  {
    title: 'Title',
    description: 'Desc',
    tags: ['Tag #1', 'Tag #2'],
    content: null,
    id: '2',
    previewImage: null,
    coverImage: null,
    
    links: null,
    type: 'vertical',
    date: null,
    prefix: 'work',
    allImages: [],
  },
  {
    title: 'Title',
    description: 'Desc',
    tags: ['Tag #3', 'Tag #2'],
    content: null,
    id: '3',
    previewImage: null,
    coverImage: null,
    
    links: null,
    type: 'vertical',
    date: null,
    prefix: 'work',
    allImages: [],
  },
];

describe('getTags', () => {
  it('Returns the correct value without duplicates', () => {
    const tagData = getTags(mockData);

    expect(tagData.length).toBe(3);
  });
});