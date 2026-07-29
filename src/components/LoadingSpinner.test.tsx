import { render, screen } from '@testing-library/react';
import LoadingSpinner from './LoadingSpinner';

describe('LoadingSpinner', () => {
  it('renders with a status role', () => {
    render(<LoadingSpinner />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('has an accessible label', () => {
    render(<LoadingSpinner />);
    expect(screen.getByLabelText('Loading items')).toBeInTheDocument();
  });
});
