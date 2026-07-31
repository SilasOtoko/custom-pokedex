import React, { useEffect, useState } from 'react';
import { Navigate, useLocation, Link } from 'react-router';
import { ref, onValue } from 'firebase/database';
import { useAuth } from '../context/AuthContext';
import { database } from '../firebase.js';
import ProfileImage from './ProfileImage';
import { getItemSpriteUrl } from '../helpers';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

function SectionCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  useDocumentTitle('Expeditions');

  return (
    <div className="bg-white rounded-2xl shadow p-6 flex flex-col gap-4">
      <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400">
        {title}
      </h2>
      {children}
    </div>
  );
}

function Expeditions() {
  const { currentUser } = useAuth();
  const location = useLocation();
  const [inventory, setInventory] = useState<Record<string, number>>({});

  useEffect(() => {
    if (!currentUser) return;
    const inventoryRef = ref(database, `users/${currentUser.uid}/inventory`);
    const unsubscribe = onValue(inventoryRef, (snapshot) => {
      setInventory(snapshot.val() || {});
    });
    return unsubscribe;
  }, [currentUser]);

  if (!currentUser) return <Navigate to="/login" state={{ from: location }} />;

  const inventoryItems = Object.entries(inventory);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 w-full">
      <h1 className="text-3xl font-bold font-alt tracking-wider text-stone-700 mb-2">
        Expedition Hub
      </h1>
      <p className="text-stone-500 font-serif italic mb-8">
        Prepare yourself before heading out into the wild.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Trainer Info */}
        <SectionCard title="Trainer">
          <div className="flex items-center gap-4">
            <ProfileImage
              user={currentUser}
              className="w-16 h-16 rounded-full border-2 border-red-400 shrink-0"
            />
            <div>
              <p className="text-xl font-bold text-gray-800">
                {currentUser.displayName || currentUser.email}
              </p>
              <p className="text-sm text-gray-400">{currentUser.email}</p>
            </div>
          </div>
        </SectionCard>

        {/* Starter Pokémon */}
        <SectionCard title="Partner Pokémon">
          <div className="flex flex-col items-center justify-center py-6 gap-3 text-center">
            <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center">
              <svg
                viewBox="0 0 100 100"
                className="w-12 h-12 text-gray-300"
                aria-hidden="true"
              >
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="8"
                />
                <path d="M 10,50 A 40,40 0 0,1 90,50 Z" fill="currentColor" />
                <rect
                  x="10"
                  y="44"
                  width="80"
                  height="12"
                  fill="currentColor"
                />
                <path
                  d="M 59.2,44 A 11,11 0 0,1 59.2,56 M 40.8,56 A 11,11 0 0,1 40.8,44"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="7"
                />
              </svg>
            </div>
            <p className="text-sm text-gray-400">No partner chosen yet.</p>
            <button
              disabled
              className="px-4 py-2 bg-amber-400 text-stone-900 text-sm font-semibold rounded-md opacity-50 cursor-not-allowed"
            >
              Choose Starter
            </button>
          </div>
        </SectionCard>

        {/* Bag / Inventory */}
        <SectionCard title="Bag">
          {inventoryItems.length === 0 ? (
            <div className="py-6 text-center">
              <p className="text-sm text-gray-400 mb-2">Your bag is empty.</p>
              <Link
                to="/shop"
                className="text-sm text-stone-600 font-semibold hover:underline"
              >
                Visit the shop →
              </Link>
            </div>
          ) : (
            <ul className="flex flex-col gap-2">
              {inventoryItems.map(([name, quantity]) => (
                <li key={name} className="flex items-center justify-between">
                  <span className="flex gap-2 items-center">
                    <img
                      src={getItemSpriteUrl(name)}
                      alt={name}
                      className="w-10 h-10 object-contain"
                    />
                    <span className="capitalize text-sm text-gray-700">
                      {name.replaceAll('-', ' ')}
                    </span>
                  </span>
                  <span className="text-xs font-mono bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                    ×{quantity}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </SectionCard>

        {/* Destinations */}
        <SectionCard title="Where to?">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl opacity-50">
              <div>
                <p className="text-sm font-semibold text-gray-700">Route 1</p>
                <p className="text-xs text-gray-400">Wild Pokémon await</p>
              </div>
              <span className="text-xs text-gray-400 bg-gray-200 px-2 py-1 rounded-full">
                Coming soon
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl opacity-50">
              <div>
                <p className="text-sm font-semibold text-gray-700">
                  Viridian Forest
                </p>
                <p className="text-xs text-gray-400">Dense woods, rare finds</p>
              </div>
              <span className="text-xs text-gray-400 bg-gray-200 px-2 py-1 rounded-full">
                Coming soon
              </span>
            </div>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}

export default Expeditions;
