import { render, screen } from '@testing-library/react';
import NotionRenderer from './NotionRenderer';
import '@testing-library/jest-dom';
import { NotionBlock } from '../types';

// Array of mock Notion blocks returned from the API
// Most of them are copied from the official Notion docs
// https://developers.notion.com/reference/block#paragraph-blocks
const mockBlocks: NotionBlock[] = [
  {
    "type": "paragraph",
    "id": "0",
    //...other keys excluded
    "paragraph": {
      "rich_text": [{
        "type": "text",
        "text": {
          "content": "Lacinato kale",
          
        },
        "plain_text": "Lacinato kale",
      }],
      "color": "default",
    }
  },
  {
    "type": "heading_1",
    "id": "1",
    //...other keys excluded
    "heading_1": {
      "rich_text": [{
        "type": "text",
        "text": {
          "content": "Lacinato kale",
          
        },
        "plain_text": "Lacinato kale",
      }],
      "color": "default"
    }
  },
  {
    "type": "heading_2",
    "id": "2",
    //...other keys excluded
    "heading_2": {
      "rich_text": [{
        "type": "text",
        "text": {
          "content": "Lacinato kale",
          
        },
        "plain_text": "Lacinato kale",
      }],
      "color": "default"
    }
  },
  {
    "type": "heading_3",
    "id": "3",
    //...other keys excluded
    "heading_3": {
      "rich_text": [{
        "type": "text",
        "text": {
          "content": "Lacinato kale",
          
        },
        "plain_text": "Lacinato kale",
      }],
      "color": "default"
    }
  },
  {
    "type": "callout",
    "id": "4",
    // ..other keys excluded
    "callout": {
      "rich_text": [{
        "type": "text",
        "text": {
          "content": "Lacinato kale",
        },
        "plain_text": "Lacinato kale",
      }],
      "icon": {
        "emoji": "⭐"
      },
      "color": "default",
      "children": [
        {
          "type": "paragraph",
          "id": "5",
          //...other keys excluded
          "paragraph": {
            "rich_text": [{
              "type": "text",
              "text": {
                "content": "Lacinato kale",
              },
              "plain_text": "Lacinato kale",
            }],
            "color": "default",
          }
        },
        {
          "type": "paragraph",
          "id": "6",
          //...other keys excluded
          "paragraph": {
            "rich_text": [{
              "type": "text",
              "text": {
                "content": "Lacinato kale",
              },
              "plain_text": "Lacinato kale",
            }],
            "color": "default",
          }
        },
      ],
    },
  },
  {
    "type": "quote",
    "id": "7",
    // ..other keys excluded
    "quote": {
      "rich_text": [{
        "type": "text",
        "text": {
          "content": "Lacinato kale",
        },
        "plain_text": "Lacinato kale",
      }],
      "color": "default",
      "children": [
        {
          "type": "paragraph",
          "id": "8",
          //...other keys excluded
          "paragraph": {
            "rich_text": [{
              "type": "text",
              "text": {
                "content": "Lacinato kale",
              },
              "plain_text": "Lacinato kale",
            }],
            "color": "default",
          }
        },
        {
          "type": "paragraph",
          "id": "9",
          //...other keys excluded
          "paragraph": {
            "rich_text": [{
              "type": "text",
              "text": {
                "content": "Lacinato kale",
              },
              "plain_text": "Lacinato kale",
            }],
            "color": "default",
          }
        },
      ]
    }
  },
  {
    "type": "bulleted_list_item",
    "id": "10",
    //...other keys excluded
    "bulleted_list_item": {
      "rich_text": [{
        "type": "text",
        "text": {
          "content": "Lacinato kale",
        },
        "plain_text": "Lacinato kale",
      }],
      "color": "default",
      "children": [
        {
          "type": "bulleted_list_item",
          "id": "11",
          //...other keys excluded
          "bulleted_list_item": {
            "rich_text": [{
              "type": "text",
              "text": {
                "content": "Lacinato kale",
                
              },
              "plain_text": "Lacinato kale",
            }],
            "color": "default",
          }
        },
        {
          "type": "bulleted_list_item",
          "id": "12",
          //...other keys excluded
          "bulleted_list_item": {
            "rich_text": [{
              "type": "text",
              "text": {
                "content": "Lacinato kale",
                
              },
              "plain_text": "Lacinato kale",
            }],
            "color": "default",
          }
        },
      ],
    },
  },
  {
    "type": "numbered_list_item",
    "id": "13",
    //...other keys excluded
    "numbered_list_item": {
      "rich_text": [{
        "type": "text",
        "text": {
          "content": "Lacinato kale",
        },
        "plain_text": "Lacinato kale",
      }],
      "color": "default",
      "children": [
        {
          "type": "bulleted_list_item",
          "id": "14",
          //...other keys excluded
          "bulleted_list_item": {
            "rich_text": [{
              "type": "text",
              "text": {
                "content": "Lacinato kale",
              },
              "plain_text": "Lacinato kale",
            }],
            "color": "default",
          }
        },
        {
          "type": "bulleted_list_item",
          "id": "15",
          //...other keys excluded
          "bulleted_list_item": {
            "rich_text": [{
              "type": "text",
              "text": {
                "content": "Lacinato kale",
              },
              "plain_text": "Lacinato kale",
            }],
            "color": "default",
          }
        },
      ],
    },
  },
  {
    "type": "toggle",
    "id": "16",
    //...other keys excluded
    "toggle": {
      "rich_text": [{
        "type": "text",
        "text": {
          "content": "Lacinato kale",
        },
        "plain_text": "Lacinato kale",
      }],
      "color": "default",
      "children": [
        {
          "type": "bulleted_list_item",
          "id": "17",
          //...other keys excluded
          "bulleted_list_item": {
            "rich_text": [{
              "type": "text",
              "text": {
                "content": "Lacinato kale",
              },
              "plain_text": "Lacinato kale",
            }],
            "color": "default",
          }
        },
        {
          "type": "bulleted_list_item",
          "id": "18",
          //...other keys excluded
          "bulleted_list_item": {
            "rich_text": [{
              "type": "text",
              "text": {
                "content": "Lacinato kale",
              },
              "plain_text": "Lacinato kale",
            }],
            "color": "default",
          }
        },
      ],
    },
  },
  {
    "type": "image",
    "id": "19",
    //...other keys excluded
    "image": {
      "type": "external",
      "external": {
        "url": "https://bchen-personal-website.s3.us-west-1.amazonaws.com/test-image.jpg"
      },
      "caption": [{
        "type": "text",
        "text": {
          "content": "Lacinato kale",
        },
        "plain_text": "Lacinato kale",
      }],
    },
  },
  {
    "type": "divider",
    "id": "20",
    "divider": {},
  },
  {
    "type": "code",
    "id": "21",
    //...other keys excluded
    "code": {
      "color": "default",
      "rich_text": [{
        "type": "text",
        "text": {
          "content": "const a = 3"
        }
      }],
      "language": "javascript"
    },
  },
  {
    "type": "table_of_contents",
    "id": "22",
    "table_of_contents": {
      
    },
  },
];

const unsupportedBlocks: any[] = [
  {
    type: 'unsupported',
  },
];

const invalidBlocks: any[] = [
  {
    invalidKey: 'invalidValue',
  },
];

/**
 * Render the `NotionRenderer` component and check for the given text.
 * Meant for basic block types such as `p`, `h1`, etc.
 * More complex blocks (especially those that nest children) need a different strategy.
 * @param blockType
 * @param text
 */
const checkForText = (blockType: string, expectedTag: string, text: string) => {
  const block = mockBlocks.find((block) => block.type === blockType);
  if (!block) throw new Error('Unable to find block type.');
    
  render(<NotionRenderer blocks={[block]} />);
  
  // Check for paragraph
  // We're not testing the richTextRenderer function here,
  // so the test just needs to check for a <p> element
  const expected = screen.getByText(text);
  expect(expected).toBeInTheDocument();

  // Normally it's not necessary to worry about this level of implementation detail,
  // but these tests need to check the type of element, since there
  // can be multiple types of text (h1, ul, etc.)
  // There should be no custom implementations of these basic text elements
  expect(expected.tagName).toStrictEqual(expectedTag);
};

const checkForComplementary = (blockType: string, text: string) => {
  const block = mockBlocks.find((block) => block.type === blockType);
  if (!block) throw new Error('Unable to find block type.');
  render(<NotionRenderer blocks={[block]} />);

  // Check for complementary
  const aside = screen.getByRole('complementary');
  expect(aside).toBeInTheDocument();

  // Check for nested children blocks
  // Unlike lists, children blocks in callouts and quotes have the same
  // parent element
  // Check for three paragraph elements with plain text
  const paragraphs = screen.getAllByText(text);
  expect(paragraphs).toHaveLength(3);
};

/**
 * Modify the location of `children` so it works with the renderer.
 * Remove once location of `children` is migrated into the data object.
 * @param block
 */
// const modifyChildrenLocation = (block: any) => {
//   block.children = block[block.type].children;
// };

/**
 * Render the `NotionRenderer` component and check for lists (elements with role `list`).
 * Works across different types of lists (bullet lists, numbered lists, etc.).
 * @param blockType
 * @param expectedListCount Number of lists to expect. This can be more than 1
 * if there are nested children lists in the mocked block.
 */
const checkForList = (blockType: string, expectedListCount: number) => {
  const block = mockBlocks.find((block) => block.type === blockType);
  if (!block) throw new Error('Unable to find block type.');

  render(<NotionRenderer blocks={[block]} />)

  // Get the bullet list
  // Ensures that some sort of list is used, and that role="list" is used
  // if creating a custom implementation of the <ul> element
  const lists = screen.getAllByRole('list');
  expect(lists).toHaveLength(expectedListCount);

  for (let i = 0; i < expectedListCount; i++) {
    // Check whether list is in the document
    expect(lists[i]).toBeInTheDocument();

    // Check the number of children
    // Should be 2 children, either a <li> item and a nested <ul>, or an <li>
    // and nested <div>
    // This is enforced because of the way <ul> nesting works
    expect(lists[i].childElementCount).toBe(2);
  }
};

describe('NotionRenderer', () => {
  const mockText = 'Lacinato kale';
  
  it('Renders nothing if unsupported blocks passed', () => {
    render(<NotionRenderer blocks={unsupportedBlocks} />);
  });

  it('Renders nothing if invalid blocks passed', () => {
    render(<NotionRenderer blocks={invalidBlocks} />);
  });

  it('Renders the paragraph block', () => {
    checkForText('paragraph', 'P', mockText);
  });

  it('Renders the h1 block', () => {
    checkForText('heading_1', 'H1', mockText);
  });

  it('Renders the h2 block', () => {
    checkForText('heading_2', 'H2', mockText);
  });

  it('Renders the h3 block', () => {
    checkForText('heading_3', 'H3', mockText);
  });

  it('Renders bullet lists', () => {
    checkForList('bulleted_list_item', 3);
  });

  it('Renders number lists', () => {
    checkForList('numbered_list_item', 3);
  });

  it('Renders toggle lists', () => {
    checkForList('toggle', 3);
  });

  it('Renders the image block', () => {
    const block = mockBlocks.find((block) => block.type === 'image');
    if (!block) throw new Error('No blocks with this data type provided');
    render(<NotionRenderer blocks={[block]} />);

    // Check for image
    const img = screen.getByRole('img');
    expect(img).toBeInTheDocument();

    // Make sure some sort of alt text is generated
    expect(img.getAttribute('alt')).toBeDefined();
    expect(img.getAttribute('alt')?.length).toBeGreaterThan(0);
  });

  it('Renders the divider block', () => {
    const block = mockBlocks.find((block) => block.type === 'divider');
    if (!block) throw new Error('No blocks with this data type provided');
    render(<NotionRenderer blocks={[block]} />);

    // Check for divider
    const separator = screen.getByRole('separator');
    expect(separator).toBeInTheDocument();
  });

  it('Renders the callout block', () => {
    checkForComplementary('callout', mockText);
  });

  it('Renders the quote block', () => {
    checkForComplementary('quote', mockText);
  });

  it('Renders the code block', () => {
    const block = mockBlocks.find((block) => block.type === 'code');
    if (!block) throw new Error('No blocks with this data type provided');
    render(<NotionRenderer blocks={[block]} />);

    // Check for code block
    const pre = screen.getByRole('code');
    expect(pre).toBeInTheDocument();
  });

  it('Renders the table of contents block', () => {
    const headingBlocks = mockBlocks.filter((block) => block.type.startsWith('heading'));
    const tocBlock = mockBlocks.find((block) => block.type === 'table_of_contents');

    if (!tocBlock || !headingBlocks) throw new Error('No blocks with this data type provided');

    render(<NotionRenderer blocks={[...headingBlocks, tocBlock]} />);
    
    
    // Check for table of contents block
    const toc = screen.getByRole('list');
    expect(toc).toBeInTheDocument();

    const headings = screen.getAllByText(mockText);

    // Twice the # of actual headings with same text
    expect(headings).toHaveLength(6);
  });
});