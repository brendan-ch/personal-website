import { render } from '@testing-library/react';
import PageButton from './PageButton';

describe('PageButton', () => {
  it('Renders the correct text', () => {
    render(<PageButton text="Click Me" />);
  });

  it('Runs callback when pressed', () => {

  });


});