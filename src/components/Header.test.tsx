import { render, screen, fireEvent } from '@testing-library/react';
import { AllProviders } from '../test/setup';
import Header from './Header';

vi.mock('../context/CartContext', () => ({
  useCart: () => ({ cart: [], dispatch: vi.fn() }),
}));

vi.mock('../firebase.js', () => ({
  auth: {},
  googleAuthProvider: {},
  database: {},
}));

describe('Header', () => {
  it('renders the cart button', () => {
    render(<Header currentUser={null} onCartOpen={() => {}} />, {
      wrapper: AllProviders,
    });
    expect(screen.getByRole('button', { name: /cart/i })).toBeInTheDocument();
  });

  it('renders the sign in link when no user is logged in', () => {
    render(<Header currentUser={null} onCartOpen={() => {}} />, {
      wrapper: AllProviders,
    });
    expect(screen.getByRole('link', { name: /sign in/i })).toBeInTheDocument();
  });

  it('renders the user avatar when a user is logged in', () => {
    const user = {
      photoURL: 'https://example.com/photo.jpg',
      displayName: 'Ash',
    };
    render(<Header currentUser={user} onCartOpen={() => {}} />, {
      wrapper: AllProviders,
    });
    expect(screen.getByAltText('Ash')).toBeInTheDocument();
  });

  it('opens the mobile menu when the hamburger button is clicked', () => {
    render(<Header currentUser={null} onCartOpen={() => {}} />, {
      wrapper: AllProviders,
    });
    const hamburger = screen.getByRole('button', { name: /toggle navigation/i });
    fireEvent.click(hamburger);
    expect(screen.getByRole('navigation', { name: /mobile navigation/i })).toBeInTheDocument();
  });

  it('calls onCartOpen when the cart button is clicked', () => {
    const onCartOpen = vi.fn();
    render(<Header currentUser={null} onCartOpen={onCartOpen} />, {
      wrapper: AllProviders,
    });
    fireEvent.click(screen.getByRole('button', { name: /cart/i }));
    expect(onCartOpen).toHaveBeenCalled();
  });
});
