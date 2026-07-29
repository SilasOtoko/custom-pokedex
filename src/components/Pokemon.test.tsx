import { render, screen } from '@testing-library/react';
import { AllProviders } from '../test/setup';
import Pokemon from './Pokemon';

const mockPokemon = { name: 'pikachu' };

describe('Pokemon', () => {
  it('renders the pokemon name', () => {
    render(
      <Pokemon
        pokemon={mockPokemon}
        id={25}
        currentUser={null}
        favorites={{}}
        toggleFavorite={() => {}}
      />,
      { wrapper: AllProviders },
    );
    expect(screen.getByText('pikachu')).toBeInTheDocument();
  });

  it('renders the padded ID', () => {
    render(
      <Pokemon
        pokemon={mockPokemon}
        id={25}
        currentUser={null}
        favorites={{}}
        toggleFavorite={() => {}}
      />,
      { wrapper: AllProviders },
    );
    expect(screen.getByText('#025')).toBeInTheDocument();
  });

  it('renders the FavoriteButton when a user is logged in', () => {
    const user = { uid: '123', email: 'ash@pokemon.com' };
    render(
      <Pokemon
        pokemon={mockPokemon}
        id={25}
        currentUser={user}
        favorites={{}}
        toggleFavorite={() => {}}
      />,
      { wrapper: AllProviders },
    );
    expect(screen.getByRole('button', { name: /favorites/i })).toBeInTheDocument();
  });

  it('does not render the FavoriteButton when no user is logged in', () => {
    render(
      <Pokemon
        pokemon={mockPokemon}
        id={25}
        currentUser={null}
        favorites={{}}
        toggleFavorite={() => {}}
      />,
      { wrapper: AllProviders },
    );
    expect(screen.queryByRole('button', { name: /favorites/i })).not.toBeInTheDocument();
  });
});
