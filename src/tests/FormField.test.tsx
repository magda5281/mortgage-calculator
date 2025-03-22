import { render, screen } from '@testing-library/react';
import { Field } from '../components/FormField';
import '@testing-library/jest-dom';

describe('Field', () => {
  it('renders label and input correctly', () => {
    render(
      <Field label="Deposit" id="deposit">
        <input type="number" id="deposit" />
      </Field>,
    );

    expect(screen.getByLabelText('Deposit')).toBeInTheDocument();
    expect(screen.getByRole('spinbutton')).toBeInTheDocument(); // numeric input
  });

  it('renders unit if provided', () => {
    render(
      <Field label="Deposit" unit="£" id="deposit">
        <input type="number" id="deposit" />
      </Field>,
    );

    expect(screen.getByText('£')).toBeInTheDocument();
  });

  it('renders hint if provided', () => {
    render(
      <Field label="Mortgage term" hint="1 to 45 years" id="mortgageTerm">
        <input type="number" id="mortgageTerm" />
      </Field>,
    );

    expect(screen.getByText('(1 to 45 years)')).toBeInTheDocument();
  });

  it('renders error message when provided', () => {
    render(
      <Field
        label="Deposit"
        error="Deposit must be less than property value"
        id="deposit">
        <input type="number" id="deposit" />
      </Field>,
    );

    expect(
      screen.getByText('Deposit must be less than property value'),
    ).toBeInTheDocument();
  });
});
