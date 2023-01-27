import { render } from '@testing-library/react';
import Home from './index.page';
import '@testing-library/jest-dom';

describe('Home', () => {
  it('Renders the page', () => {
    const { container } = render(<Home />);
    expect(container).toBeInTheDocument();
  });
});
