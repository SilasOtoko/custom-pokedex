import { render, screen } from '@testing-library/react';
import { AllProviders } from '../test/setup';
import OrderSummary from './OrderSummary';

const mockCart = [
  {
    item: {
      name: 'poke-ball',
      cost: 200,
      names: [{ language: { name: 'en' }, name: 'Poké Ball' }],
      sprites: { default: 'https://example.com/poke-ball.png' },
    },
    quantity: 3,
  },
  {
    item: {
      name: 'great-ball',
      cost: 600,
      names: [{ language: { name: 'en' }, name: 'Great Ball' }],
      sprites: { default: 'https://example.com/great-ball.png' },
    },
    quantity: 1,
  },
];

describe('OrderSummary', () => {
  it('renders each item name', () => {
    render(<OrderSummary cart={mockCart} />, { wrapper: AllProviders });
    expect(screen.getByText('Poké Ball')).toBeInTheDocument();
    expect(screen.getByText('Great Ball')).toBeInTheDocument();
  });

  it('renders the quantity for each item', () => {
    render(<OrderSummary cart={mockCart} />, { wrapper: AllProviders });
    expect(screen.getByText('Qty: 3')).toBeInTheDocument();
    expect(screen.getByText('Qty: 1')).toBeInTheDocument();
  });

  it('calculates the correct total', () => {
    render(<OrderSummary cart={mockCart} />, { wrapper: AllProviders });
    // 200 * 3 + 600 * 1 = 1200
    expect(screen.getByText('₽1200')).toBeInTheDocument();
  });

  it('renders quantity controls when showControls is true', () => {
    render(<OrderSummary cart={mockCart} showControls={true} />, {
      wrapper: AllProviders,
    });
    expect(screen.getByRole('group', { name: /quantity controls/i })).toBeInTheDocument();
  });

  it('does not render quantity controls by default', () => {
    render(<OrderSummary cart={mockCart} />, { wrapper: AllProviders });
    expect(screen.queryByRole('group', { name: /quantity controls/i })).not.toBeInTheDocument();
  });
});
