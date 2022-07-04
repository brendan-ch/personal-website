import { render, screen } from '@testing-library/react';
import richTextRenderer from './richTextRenderer';
import '@testing-library/jest-dom';

const richText = [
  [
    {
      "type": "text",
      "text": {
        "content": "Lacinato kale",
      },
      "plain_text": "Lacinato kale",
    },
  ],
  [
    {
      "type": "text",
      "text": {
        "content": "Lacinato ",
      },
      "plain_text": "Lacinato ",
    },
    {
      "type": "text",
      "text": {
        "content": "kale",
        "link": {
          "type": "url",
          "url": "https://example.com",
        },
      },
      "plain_text": "kale",
    },
  ],
  [
    {
      "type": "text",
      "text": {
        "content": "Lacinato ",
      },
      "plain_text": "Lacinato ",
    },
    {
      "type": "text",
      "text": {
        "content": "kale",
      },
      "plain_text": "kale",
      "annotations": {
        "bold": true,
      },
    },
  ],
  [
    {
      "type": "text",
      "text": {
        "content": "Lacinato ",
      },
      "plain_text": "Lacinato ",
    },
    {
      "type": "text",
      "text": {
        "content": "kale",
      },
      "plain_text": "kale",
      "annotations": {
        "italic": true,
      },
    },
  ],
  [
    {
      "type": "text",
      "text": {
        "content": "Lacinato ",
      },
      "plain_text": "Lacinato ",
    },
    {
      "type": "text",
      "text": {
        "content": "kale",
      },
      "plain_text": "kale",
      "annotations": {
        "underline": true,
      },
    },
  ],
  [
    {
      "type": "text",
      "text": {
        "content": "Lacinato ",
      },
      "plain_text": "Lacinato ",
    },
    {
      "type": "text",
      "text": {
        "content": "kale",
      },
      "plain_text": "kale",
      "annotations": {
        "strikethrough": true,
      },
    },
  ],
  [
    {
      "type": "text",
      "text": {
        "content": "Lacinato ",
      },
      "plain_text": "Lacinato ",
    },
    {
      "type": "date",
      "date": {
        "start": "2022-07-04T18:05:45+0000",
      },
      "plain_text": "2022-07-04",
    },
  ],
];

const renderItems = (index: number) => {
  const result = (
    <p>
      {richText[index].map(richTextRenderer)}
    </p>
  );
  render(result);
};

describe('richTextRenderer', () => {
  const mockText = 'Lacinato kale';

  it('Renders plain text correctly', () => {
    renderItems(0);

    // Get the plain text
    expect(screen.getByText(mockText)).toBeInTheDocument();
  });

  it('Renders links correctly', () => {
    renderItems(1);
  
    // Check for the link
    const a = screen.getByRole('link');
    expect(a).toBeInTheDocument();
    expect(a).toHaveAttribute('href', 'https://example.com');
  });

  it('Renders bold text correctly', () => {
    renderItems(2);

    const b = screen.getByText('kale');
    expect(b).toBeInTheDocument();
    expect(b.tagName).toStrictEqual('B');
  });

  it('Renders italic text correctly', () => {
    renderItems(3);

    const b = screen.getByText('kale');
    expect(b).toBeInTheDocument();
    expect(b.tagName).toStrictEqual('I');
  });
  it('Renders underline text correctly', () => {
    renderItems(4);

    const b = screen.getByText('kale');
    expect(b).toBeInTheDocument();
    expect(b.tagName).toStrictEqual('U');
  });

  it('Renders strikethrough text correctly', () => {
    renderItems(5);

    const b = screen.getByText('kale');
    expect(b).toBeInTheDocument();
    expect(b.tagName).toStrictEqual('S');
  });

  it('Renders mentions correctly', () => {
    renderItems(6);

    const b = screen.getByText('Lacinato 2022-07-04');
    expect(b).toBeInTheDocument();
  });
});