import { updatePages } from '../__mocks__/@notionhq/client';
import writePreviewImages from './writePreviewImages';

beforeEach(() => {
  updatePages.mockReset();
});

describe('writePreviewImages', () => {
  it('Calls the `client.pages.update` method', () => {
    writePreviewImages([
      {
        imageLink: 'https://image.link',
        pageId: '0',
      },
    ]);

    expect(updatePages).toHaveBeenCalled();
  });
});