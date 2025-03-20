import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders calculator text', () => {
  render(<App />);
  const title = screen.getByText(/Calculator/i);
  expect(title).toBeInTheDocument();
});
