import client from '../notionClient';
import { DocumentDatabaseItem } from '../../types';
import { ADDITIONAL_DOCS_DATABASE_ID, PLACEHOLDER_SIZE } from '../Constants';
import returnPlainText from '../returnPlainText';
import { getPlaiceholder } from 'plaiceholder';

/**
 * Get a database item object for a specific page.
 * @param prettyLink
 */
async function getDocumentPageProperties(prettyLink: string): Promise<DocumentDatabaseItem | null> {
  const dbResponse = await client.databases.query({
    database_id: ADDITIONAL_DOCS_DATABASE_ID,
    filter: {
      and: [
        {
          property: 'Pretty Link',
          rich_text: {
            equals: prettyLink,
          },
        },
        {
          property: 'Published',
          checkbox: {
            equals: true,
          },
        },
      ]
    },
  });
  if (dbResponse.results.length === 0) {
    return null;
  }

  const response: any = dbResponse.results[0];
  const description = returnPlainText(response.properties['Description'].rich_text);

  let imageLink = null;
  if (response.properties['Preview Image'].files && response.properties['Preview Image'].files.length > 0) {
    if (response.properties['Preview Image'].files[0].type === 'file') {
      imageLink = response.properties['Preview Image'].files[0].file.url;
    } else {
      imageLink = response.properties['Preview Image'].files[0].external.url;
    }
  }

  return {
    title: response.properties.Name.title[0].plain_text,
    id: response.id,
    description,
    imageLink,
    previewImagePlaceholder: imageLink ? (await getPlaiceholder(imageLink, { size: PLACEHOLDER_SIZE })).base64 : undefined,
    prettyLink,
  };
}

export default getDocumentPageProperties;