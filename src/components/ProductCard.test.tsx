import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import ProductCard from './ProductCard';
import { CartProvider } from '../context/CartContext';
import { ToastProvider } from '../context/ToastContext';

const mockItem = {
  name: 'poke-ball',
  cost: 200,
  names: [{ language: { name: 'en' }, name: 'Poké Ball' }],
  sprites: { default: 'https://example.com/poke-ball.png' },
  machines: [],
};

const mockCategory = { id: 'standard-balls', label: 'Standard Balls' };

describe('ProductCard', () => {
  it('renders the item name', () => {
    render(
      <MemoryRouter>
        <CartProvider>
          <ToastProvider>
            <ProductCard item={mockItem} selectedCategory={mockCategory} />
          </ToastProvider>
        </CartProvider>
      </MemoryRouter>,
    );
    expect(screen.getByText('Poké Ball')).toBeInTheDocument();
  });
});
