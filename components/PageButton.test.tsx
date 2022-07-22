import { render, screen } from '@testing-library/react';
import PageButton from './PageButton';
import '@testing-library/jest-dom';

describe('PageButton', () => {
  it('Renders the correct text', () => {
    render(<PageButton text="Click Me" />);

    expect(screen.getByText("Click Me")).toBeInTheDocument();
  });

  it('Runs callback when pressed', () => {
    const callback = jest.fn();

    render(<PageButton
      text="Click Me"
      onClick={callback}
    />);
    screen.getByRole('button').click();

    expect(callback).toHaveBeenCalledTimes(1);
  });
});