import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/New Construction Service Request/i);
  expect(linkElement).toBeInTheDocument();
  expect(screen.getByRole("heading")).toHaveTextContent(/New Construction Service/i);
  expect(screen.getByRole("img")).toBeInTheDocument();
 // expect(screen.queryByRole("heading")).toHaveTextContent(/payment is done/i);
});
