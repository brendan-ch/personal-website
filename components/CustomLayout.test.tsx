import { render, screen } from '@testing-library/react';
import CustomLayout from './CustomLayout';
import '@testing-library/jest-dom';

const useRouter = jest.spyOn(require('next/router'), 'useRouter');
useRouter.mockImplementation(() => ({
  pathname: '/',
}));

describe('CustomLayout', () => {
  it('Renders children', () => {
    render(<CustomLayout>
      <p>Hello World</p>
    </CustomLayout>);

    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });
});