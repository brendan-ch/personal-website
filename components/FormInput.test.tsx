import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import FormInput from './FormInput';
import '@testing-library/jest-dom';

describe('FormInput', () => {
  it('Renders a text input with a placeholder', () => {
    render(<FormInput
      placeholder="Test Placeholder"
      name="Test"
    />);

    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
  });
});