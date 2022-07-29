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
});