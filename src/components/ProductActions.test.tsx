import { render, screen } from '@testing-library/react';
import { AllProviders } from '../test/setup';
import ProductActions from './ProductActions';

const availableItem = {
  name: 'poke-ball',
  cost: 200,
  names: [{ language: { name: 'en' }, name: 'Poké Ball' }],
  sprites: { default: 'https://example.com/poke-ball.png' },
};

const unavailableItem = {
  name: 'master-ball',
  cost: 0,
  names: [{ language: { name: 'en' }, name: 'Master Ball' }],
  sprites: { default: 'https://example.com/master-ball.png' },
};

const specialOrderItem = {
  name: 'safari-ball',
  cost: 0,
  names: [{ language: { name: 'en' }, name: 'Safari Ball' }],
  sprites: { default: 'https://example.com/safari-ball.png' },
};

describe('ProductActions', () => {
  it('renders an Add to Cart button for available items', () => {
    render(<ProductActions item={availableItem} />, { wrapper: AllProviders });
    expect(screen.getByRole('button', { name: /add to cart/i })).toBeInTheDocument();
  });

  it('renders NotifyMe for unavailable items', () => {
    render(<ProductActions item={unavailableItem} />, { wrapper: AllProviders });
    expect(screen.queryByRole('button', { name: /add to cart/i })).not.toBeInTheDocument();
  });

  it('renders SpecialOrder for special order items', () => {
    render(<ProductActions item={specialOrderItem} />, { wrapper: AllProviders });
    expect(screen.queryByRole('button', { name: /add to cart/i })).not.toBeInTheDocument();
  });
});
