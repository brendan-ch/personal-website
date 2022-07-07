import returnPlainText from './returnPlainText';

/**
 * Given a page object from the Notion API, returns a `DatabaseItem` object.
 */
export default function getDatabaseItemFromResponse(response: any) {
  const description = response.properties['Description'] ? returnPlainText(response.properties['Description'].rich_text) : undefined;

  let imageLink = undefined;
  if (response.properties['Preview Image'] && response.properties['Preview Image'].files && response.properties['Preview Image'].files.length > 0) {
    if (response.properties['Preview Image'].files[0].type === 'file') {
      imageLink = response.properties['Preview Image'].files[0].file.url;
    } else {
      imageLink = response.properties['Preview Image'].files[0].external.url;
    }
  }

  let coverImageLink = undefined;
  if (response.properties['Cover Image'] && response.properties['Cover Image'].files && response.properties['Cover Image'].files.length > 0) {
    if (response.properties['Cover Image'].files[0].type === 'file') {
      coverImageLink = response.properties['Cover Image'].files[0].file.url;
    } else {
      coverImageLink = response.properties['Cover Image'].files[0].external.url;
    }
  }

  return {
    title: response.properties.Name.title[0].plain_text,
    id: response.id,
    tags: response.properties['Tags'] ? response.properties['Tags'].multi_select.map((item: any) => item.name) : undefined,
    imageLink,
    coverImageLink,
    description,
    prettyLink: response.properties['Pretty Link'] ? returnPlainText(response.properties['Pretty Link'].rich_text) : undefined,
  };
}