import { render, screen } from '@testing-library/react';
import About from './about.page';
import '@testing-library/jest-dom';

const mockBlocks = [
  {
    "type": "paragraph",
    //...other keys excluded
    "paragraph": {
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
];

describe('getStaticProps', () => {
  
});

describe('About', () => {

  it('Renders the page', () => {
    const { container } = render(<About blocks={mockBlocks} />);
    expect(container).toBeInTheDocument();
  });
});