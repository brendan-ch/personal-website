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

  it('Renders differently if highlighted', () => {
    render(<>
      <PageButton
        text="Click Me"
        highlighted
      />
      <PageButton
        text="Click Me"
      />
    </>);

    const buttons = screen.getAllByRole('button');
    expect(buttons[0].classList).not.toStrictEqual(buttons[1].classList);
  });
  
  it('Disables the button correctly', async () => {
    const user = userEvent.setup();
    const fn = jest.fn();

    render(<>
      <PageButton
        text="Don't click me"
        disabled
        onClick={fn}
      />
      <PageButton
        text="Click Me"
      />
    </>);

    const buttons = screen.getAllByRole('button');
    expect(buttons[0].classList).not.toStrictEqual(buttons[1].classList);

    await user.click(buttons[0]);
    expect(fn).not.toHaveBeenCalled();
  });
  
  it('Returns a link instead of a button, if href passed', async () => {
    const user = userEvent.setup();
    const fn = jest.fn();

    render(<>
      <PageButton
        text="Don't click me"
        onClick={fn}
        href="https://google.com"
      />
      <PageButton
        text="Click Me"
      />
    </>);

    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(1);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', 'https://google.com');
  });
});