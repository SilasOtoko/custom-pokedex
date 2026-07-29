import { render, screen } from '@testing-library/react';
import TypeBadge from './TypeBadge';

describe('TypeBadge', () => {
  it('renders the type name', () => {
    render(<TypeBadge type="fire" />);
    expect(screen.getByText('fire')).toBeInTheDocument();
  });

  it('renders the type badge image with alt text', () => {
    render(<TypeBadge type="water" />);
    expect(screen.getByAltText('water type badge')).toBeInTheDocument();
  });

  it('renders children', () => {
    render(<TypeBadge type="grass">Extra</TypeBadge>);
    expect(screen.getByText('Extra')).toBeInTheDocument();
  });
});
