import { render, screen } from '@testing-library/react';
import richTextRenderer from '../helpers/richTextRenderer';
import NotionRenderer from './NotionRenderer';
import '@testing-library/jest-dom';

// Array of mock Notion blocks returned from the API
// Most of them are copied from the official Notion docs
// https://developers.notion.com/reference/block#paragraph-blocks
const mockBlocks: any[] = [
  {
    "type": "paragraph",
    //...other keys excluded
    "paragraph": {
      "rich_text": [{
        "type": "text",
        "text": {
          "content": "Lacinato kale",
          "link": null
        }
      }],
      "color": "default",
      "children":[{
        "type": "paragraph"
        // ..other keys excluded
      }]
    }
  },
  {
    "type": "heading_1",
    //...other keys excluded
    "heading_1": {
      "rich_text": [{
        "type": "text",
        "text": {
          "content": "Lacinato kale",
          "link": null
        }
      }],
      "color": "default"
    }
  },
  {
    "type": "heading_2",
    //...other keys excluded
    "heading_2": {
      "rich_text": [{
        "type": "text",
        "text": {
          "content": "Lacinato kale",
          "link": null
        }
      }],
      "color": "default"
    }
  },
  {
    "type": "heading_3",
    //...other keys excluded
    "heading_3": {
      "rich_text": [{
        "type": "text",
        "text": {
          "content": "Lacinato kale",
          "link": null
        }
      }],
      "color": "default"
    }
  },
  {
    "type": "callout",
    // ..other keys excluded
    "callout": {
      "rich_text": [{
        "type": "text",
        "text": {
          "content": "Lacinato kale",
        },
      }],
      "icon": {
        "emoji": "⭐"
      },
      "color": "default"
    }
  },
  {
    "type": "quote",
    // ..other keys excluded
    "quote": {
      "rich_text": [{
        "type": "text",
        "text": {
          "content": "Lacinato kale",
        },
      }],
      "color": "default"
    }
  },
  {
    "type": "bulleted_list_item",
    //...other keys excluded
    "bulleted_list_item": {
      "rich_text": [{
        "type": "text",
        "text": {
          "content": "Lacinato kale",
          "link": null
        }
      }],
      "color": "default",
      "children":[{
        "type": "paragraph"
        // ..other keys excluded
      }]
    }
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
    
  render(<NotionRenderer blocks={[block]} />);
  
  // Check for paragraph
  // We're not testing the richTextRenderer function here,
  // so the test just needs to check for a <p> element
  const expected = screen.getByText(text);
  expect(expected).toBeInTheDocument();

  // Normally it's not necessary to worry about this level of implementation detail,
  // but these tests need to check the type of element, since there
  // can be multiple types of text (h1, ul, etc.)
  expect(expected.tagName).toStrictEqual(expectedTag);
}

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
});