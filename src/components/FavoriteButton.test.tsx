import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import FavoriteButton from './FavoriteButton';
import { AllProviders } from '../test/setup';

const mockPokemon = { name: 'pikachu' };

describe('FavoriteButton', () => {
  it('renders with add to favorites title when not favorited', () => {
    render(
      <FavoriteButton
        pokemon={mockPokemon}
        favorites={{}}
        toggleFavorite={() => {}}
      />,
    );
    expect(screen.getByTitle('Add to favorites')).toBeInTheDocument();
  });

  it('renders with remove from favorites title when favorited', () => {
    render(
      <FavoriteButton
        pokemon={mockPokemon}
        favorites={{ pikachu: true }}
        toggleFavorite={() => {}}
      />,
    );
    expect(screen.getByTitle('Remove from favorites')).toBeInTheDocument();
  });

  it('calls toggleFavorite with the pokemon name when clicked', () => {
    const toggleFavorite = vi.fn();
    render(
      <FavoriteButton
        pokemon={mockPokemon}
        favorites={{}}
        toggleFavorite={toggleFavorite}
      />,
    );
    fireEvent.click(screen.getByRole('button'));
    expect(toggleFavorite).toHaveBeenCalledWith('pikachu');
  });
});
