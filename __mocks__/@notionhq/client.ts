import { ADDITIONAL_DOCS_DATABASE_ID } from "../../helpers/Constants";

interface MockAuthConstructor {
  auth: string,
}

interface MockDatabaseQueryObject {
  database_id: string,
  filter: any,
}

interface MockBlockChildrenListObject {
  block_id: string,
  page_size: number,
  start_cursor?: string,
}

export const updateBlocks = jest.fn();
export const updatePages = jest.fn();

/**
 * @todo add additional rich text attributes
 */
export const databaseQuery = jest.fn(async (obj: MockDatabaseQueryObject) => {
  if (obj.database_id === ADDITIONAL_DOCS_DATABASE_ID) {
    return {
      results: [
        {
          id: '0',
          properties: {
            'Name': {
              title: [
                {
                  plain_text: 'Item with internal image',
                },
              ],
            },
            // 'Pretty Link': {
            //   rich_text: [
            //     {
            //       plain_text: 'pretty-link',
            //     },
            //   ],
            // },
            'Description': {
              rich_text: [
                {
                  plain_text: 'Description',
                },
              ],
            },
            'Preview Image': {
              files: [
                {
                  type: 'file',
                  file: {
                    url: 'https://image.link',
                    expiry_date: 0,
                  },
                },
              ],
            },
          },
        },
        {
          id: '1',
          properties: {
            'Name': {
              title: [
                {
                  plain_text: 'Item with external image',
                },
              ],
            },
            'Pretty Link': {
              rich_text: [
                {
                  plain_text: 'pretty-link',
                },
              ],
            },
            'Description': {
              rich_text: [
                {
                  plain_text: 'Description',
                },
              ],
            },
            'Preview Image': {
              files: [
                {
                  type: 'external',
                  external: {
                    url: 'https://image.link',
                  },
                },
              ],
            },
          },
        },
      ],
    }
  }
});

export class Client {
  readonly pages = {
    update: updatePages,
  };

  readonly blocks = {
    retrieve: () => {},
    update: updateBlocks,
    delete: () => {},
    children: {
      append: () => {},
      list: (obj: MockBlockChildrenListObject) => {
        if (obj.block_id === '0') {
          // Return sample block with children
          return {
            results: [
              {
                "id": '1',
                "type": "bulleted_list_item",
                //...other keys excluded
                "bulleted_list_item": {
                  "rich_text": [{
                    "type": "text",
                    "text": {
                      "content": "Lacinato kale",
                      "link": null
                    },
                    "plain_text": "Lacinato kale",
                  }],
                  "color": "default",
                },
                "has_children": true,
              },
            ],
            has_more: false,
          };
        }

        else if (obj.block_id === '1' && !obj.start_cursor) {
          return {
            results: [
              {
                "id": "2",
                "type": "bulleted_list_item",
                //...other keys excluded
                "bulleted_list_item": {
                  "rich_text": [{
                    "type": "text",
                    "text": {
                      "content": "Lacinato kale",
                      "link": null
                    },
                    "plain_text": "Lacinato kale",
                  }],
                  "color": "default",
                }
              },
            ],
            has_more: true,
            next_cursor: '3',
          };
        }

        else if (obj.block_id === '1' && obj.start_cursor === '3') {
          return {
            results: [
              {
                "id": "3",
                "type": "bulleted_list_item",
                //...other keys excluded
                "bulleted_list_item": {
                  "rich_text": [{
                    "type": "text",
                    "text": {
                      "content": "Lacinato kale",
                      "link": null
                    },
                    "plain_text": "Lacinato kale",
                  }],
                  "color": "default",
                }
              },
            ],
            has_more: false,
          }
        }
      },
    },
  };

  readonly databases = {
    list: () => {},
    retrieve: () => {},
    query: databaseQuery,
    create: () => {},
    update: () => {},
  };

  constructor({ auth }: MockAuthConstructor) {
    // Do nothing  
  }
}