import { render, screen } from '@testing-library/react';
import CustomLayout from './CustomLayout';
import '@testing-library/jest-dom';
import { useRouter } from 'next/router';

jest.mock('next/router');
(useRouter as jest.Mock).mockReturnValue({
  asPath: '',
})

describe('CustomLayout', () => {
  it('Renders children', () => {
    render(<CustomLayout>
      <p>Hello World</p>
    </CustomLayout>);

    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });
});