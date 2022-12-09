import { render, screen, fireEvent } from '@testing-library/react';
import Tag from './Tag';
import '@testing-library/jest-dom';

describe('Tag', () => {
  it('Correctly renders text', () => {
    render(<Tag
      text="Text"
      state="selected"
    />);

    expect(screen.getByText('Text')).toBeInTheDocument();
  });

  it('Correctly calls onClick callback', () => {
    const fn = jest.fn();
    
    render(<Tag
      text="Text"
      state="selected"
      onClick={fn}
    />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('Renders different styles based on passed state', () => {
    render(
      <div>
        <Tag
          text="Text"
          state="selected"
          onClick={() => {}}
        />
        <Tag
          text="Text"
          state="deselected"
          onClick={() => {}}
        />
        <Tag
          text="Text"
          state="disabled"
          onClick={() => {}}
        />
      </div>
    );

    const allTags = screen.getAllByRole('button');
    expect(allTags[0].className !== allTags[1].className).toBe(true);
    expect(allTags[1].className !== allTags[2].className).toBe(true);
    expect(allTags[0].className !== allTags[2].className).toBe(true);
  });
});