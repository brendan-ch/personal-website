import { Client } from '@notionhq/client';
import { ProjectDatabaseItem } from '../../types';
import { PROJECTS_DATABASE_ID } from '../Constants';
import returnPlainText from '../returnPlainText';

const client = new Client({
  auth: process.env.NOTION_TOKEN,
});

/**
 * Get a database item object for a specific page.
 * @param prettyLink
 */
async function getProjectPageProperties(prettyLink: string): Promise<ProjectDatabaseItem | null> {
  const dbResponse = await client.databases.query({
    database_id: PROJECTS_DATABASE_ID,
    filter: {
      and: [
        {
          property: 'Pretty Link',
          rich_text: {
            equals: prettyLink
          },
        },
        {
          property: 'Published',
          checkbox: {
            equals: true,
          },
        },
      ],
    },
  });

  if (dbResponse.results.length === 0) {
    return null;
  }

  const response: any = dbResponse.results[0];

  // Return a database item
  let description = '';
  response.properties.Description.rich_text.map((textItem: any) => {
    description += textItem.text.content;
  });

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
    tags: response.properties['Tags'].multi_select.map((item: any) => item.name),
    imageLink,
    description,
    prettyLink: response.properties['Pretty Link'] ? returnPlainText(response.properties['Pretty Link'].rich_text) : undefined,
  };
}

export default getProjectPageProperties;