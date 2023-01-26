import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PageButton from './PageButton';
import '@testing-library/jest-dom';

describe('PageButton', () => {
  it('Renders the correct text', () => {
    render(<PageButton text="Click Me" />);

    expect(screen.getByText("Click Me")).toBeInTheDocument();
  });

  it('Runs callback when pressed', async () => {
    const callback = jest.fn();
    const user = userEvent.setup();

    render(<PageButton
      text="Click Me"
      onClick={callback}
    />);
    await user.click(screen.getByRole('button'));

    expect(callback).toHaveBeenCalledTimes(1);
  });
});