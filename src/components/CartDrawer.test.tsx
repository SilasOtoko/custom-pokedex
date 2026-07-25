import { render, screen, fireEvent } from '@testing-library/react';
import { CartContext } from '../context/CartContext';
import CartDrawer from './CartDrawer';
import { AllProviders } from '../test/setup';

vi.mock('../context/CartContext', () => ({
  useCart: () => ({ cart: mockCart }),
}));

const mockCart = [
  {
    item: {
      name: 'poke-ball',
      cost: 200,
      names: [{ language: { name: 'en' }, name: 'Poké Ball' }],
      sprites: { default: 'https://example.com/poke-ball.png' },
    },
    quantity: 2,
  },
];

describe('CartDrawer', () => {
  it('renders items when open', () => {
    render(<CartDrawer isOpen={true} onClose={() => {}} />, {
      wrapper: AllProviders,
    });
    expect(screen.getByText('Poké Ball')).toBeInTheDocument();
  });
});
