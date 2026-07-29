import { render, screen } from '@testing-library/react';
import TypeBadges from './TypeBadges';

describe('TypeBadges', () => {
  it('renders a badge for each type', () => {
    render(<TypeBadges types={['fire', 'flying']} />);
    expect(screen.getByText('fire')).toBeInTheDocument();
    expect(screen.getByText('flying')).toBeInTheDocument();
  });

  it('renders nothing when given an empty array', () => {
    const { container } = render(<TypeBadges types={[]} />);
    expect(container.firstChild?.childNodes).toHaveLength(0);
  });
});
