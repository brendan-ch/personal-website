import { render, screen } from '@testing-library/react';
import FormInput from './FormInput';
import '@testing-library/jest-dom';

describe('FormInput', () => {
  it('Renders a text input with a placeholder', () => {
    render(<FormInput
      placeholder="Test Placeholder"
      name="Test"
      label="Test"
    />);

    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
  });
  
  it('Test the required and multiline props', () => {
    render(<div>
      <FormInput
        placeholder="Input #1"
        name="Input #1"
        label="Input #1"
        required
      />
      <FormInput
        placeholder="Input #2"
        name="Input #2"
        label="Input #2"
        required
        multiline
      />
      <FormInput
        placeholder="Input #3"
        name="Input #3"
        label="Input #3"
      />
      <FormInput
        placeholder="Input #4"
        name="Input #4"
        label="Input #4"
        multiline
      />
    </div>);

    const inputs = screen.getAllByRole('textbox');
    // Expect the first two inputs to be required
    expect(inputs[0].getAttribute('required') === null).toBe(false);
    expect(inputs[1].getAttribute('required') === null).toBe(false);
    expect(inputs[2].getAttribute('required') === null).toBe(true);
    expect(inputs[3].getAttribute('required') === null).toBe(true);

    expect(inputs[0].tagName === inputs[2].tagName).toBe(true);
    expect(inputs[1].tagName === inputs[3].tagName).toBe(true);
    expect(inputs[0].tagName === inputs[1].tagName).toBe(false);
    expect(inputs[2].tagName === inputs[3].tagName).toBe(false);
    expect(inputs[1].tagName === inputs[2].tagName).toBe(false);
    expect(inputs[0].tagName === inputs[3].tagName).toBe(false);
  });
});