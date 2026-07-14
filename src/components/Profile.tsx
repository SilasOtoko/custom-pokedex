import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { auth } from '../firebase.js';
import { signOut } from 'firebase/auth';
import { getEnglishEntry } from '../helpers';
import Pokemon from './Pokemon';
import ProfileImage from './ProfileImage';

function Profile({
  currentUser,
  allPokemon,
  favorites,
  toggleFavorite,
  orders,
}) {
  const navigate = useNavigate();

  const localOrders = JSON.parse(localStorage.getItem('orders') || '[]');
  const allOrders = [...orders, ...localOrders].sort(
    (a, b) => b.createdAt - a.createdAt,
  );

  if (!currentUser) {
    return (
      <div className="flex justify-center items-center flex-1 py-20">
        <p className="text-gray-500">Please sign in to view your profile.</p>
      </div>
    );
  }

  const handleLogout = () => {
    signOut(auth);
    navigate('/', { replace: true });
  };

  const favoritedPokemon = allPokemon
    ? allPokemon.filter((p) => favorites && favorites[p.name])
    : [];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 w-full">
      {/* User card */}
      <div className="bg-white rounded-2xl shadow p-6 flex items-center gap-4 mb-8">
        <ProfileImage
          user={currentUser}
          className="w-16 h-16 rounded-full border-2 border-red-400 shrink-0"
        />
        <div className="flex-1">
          <h2 className="text-xl font-bold text-gray-800">
            {currentUser.displayName}
          </h2>
          <p className="text-gray-500 text-sm">{currentUser.email}</p>
        </div>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-gray-800 text-white rounded-lg text-sm font-medium hover:bg-gray-600 transition-colors hover:cursor-pointer"
        >
          Sign Out
        </button>
      </div>

      {/* Order History */}
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        Order History
        <span className="ml-2 text-sm font-normal text-gray-400">
          ({allOrders.length})
        </span>
      </h2>

      {allOrders.length === 0 ? (
        <div className="bg-white rounded-2xl shadow p-12 text-center text-gray-400 mb-8">
          <p className="text-lg mb-2">No orders yet.</p>
          <p className="text-sm">
            Head to the{' '}
            <Link to="/shop" className="underline hover:text-gray-600">
              shop
            </Link>{' '}
            to place your first order.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-4 mb-8">
          {allOrders.map((order) => (
            <div key={order.id} className="bg-white rounded-2xl shadow p-6">
              {/* Order header */}
              <div className="flex items-start justify-between mb-4 pb-4 border-b border-gray-100">
                <div>
                  <p className="text-sm font-medium text-gray-700">
                    {new Date(order.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                  <p className="text-xs text-gray-400 font-mono mt-0.5">
                    #{order.id}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {order.form.city}, {order.form.region}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full capitalize">
                    {order.status}
                  </span>
                  <p className="font-bold text-gray-800 mt-2">₽{order.total}</p>
                </div>
              </div>

              {/* Order items */}
              <ul className="flex flex-col gap-2">
                {order.items.map((entry, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <img
                      src={entry.item.sprites.default}
                      alt={getEnglishEntry(entry.item.names)?.name}
                      className="w-8 h-8 object-contain"
                    />
                    <span className="text-sm text-gray-700 flex-1">
                      {getEnglishEntry(entry.item.names)?.name}
                    </span>
                    <span className="text-xs text-gray-400">
                      ×{entry.quantity}
                    </span>
                    <span className="text-sm font-medium text-gray-700">
                      ₽{entry.item.cost * entry.quantity}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {/* Favorites section */}
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        Favorite Pokémon
        <span className="ml-2 text-sm font-normal text-gray-400">
          ({favoritedPokemon.length})
        </span>
      </h2>

      {favoritedPokemon.length === 0 ? (
        <div className="bg-white rounded-2xl shadow p-12 text-center text-gray-400">
          <p className="text-lg mb-2">No favorites yet.</p>
          <p className="text-sm">Tap the ♥ on any Pokémon to save it here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {favoritedPokemon.map((pokemon) => (
            <Pokemon
              key={pokemon.name}
              id={pokemon.id}
              pokemon={pokemon}
              currentUser={currentUser}
              favorites={favorites}
              toggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Profile;
