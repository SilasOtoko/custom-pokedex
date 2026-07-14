import React from 'react';
import { Link } from 'react-router';
import { SHOP_CATEGORIES } from '../shopCategories';

const CATEGORY_SPRITES = {
  pokeballs: 'https://www.serebii.net/itemdex/sprites/sv/pokeball.png',
  medicine: 'https://www.serebii.net/itemdex/sprites/sv/potion.png',
  'battle-items': 'https://www.serebii.net/itemdex/sprites/sv/choiceband.png',
  berries: 'https://www.serebii.net/itemdex/sprites/sv/oranberry.png',
  tms: 'https://www.serebii.net/itemdex/sprites/tm01.png',
  vitamins: 'https://www.serebii.net/itemdex/sprites/sv/hpup.png',
};

function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section
        className="bg-stone-800 text-white px-6 py-24 flex flex-col items-center text-center gap-6 -mt-4"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v1H0zM0 13h40v1H0zM0 26h40v1H0z' fill='%23ffffff' fill-opacity='0.04'/%3E%3C/svg%3E")`,
        }}
      >
        {/* Circular badge/seal */}
        <div className="relative w-36 h-36">
          <svg
            viewBox="0 0 120 120"
            className="absolute inset-0 w-full h-full text-amber-400/70"
          >
            <circle
              cx="60"
              cy="60"
              r="56"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
            <circle
              cx="60"
              cy="60"
              r="50"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeDasharray="3 3"
            />
            <path id="top-arc" d="M 15,60 a 45,45 0 1,1 90,0" fill="none" />
            <path
              id="bottom-arc"
              d="M 105,60 a 45,45 0 1,1 -90,0"
              fill="none"
            />
            <text
              fontSize="8.5"
              fill="currentColor"
              letterSpacing="2"
              fontFamily="serif"
            >
              <textPath href="#top-arc" startOffset="10%">
                TRAINER SUPPLY CO.
              </textPath>
            </text>
            <text
              fontSize="8"
              fill="currentColor"
              letterSpacing="2.5"
              fontFamily="serif"
            >
              <textPath href="#bottom-arc" startOffset="12%">
                EST. PALLET TOWN
              </textPath>
            </text>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              viewBox="0 0 100 100"
              className="w-12 h-12 text-amber-400/80"
              aria-hidden="true"
            >
              <circle
                cx="50"
                cy="50"
                r="41"
                fill="none"
                stroke="currentColor"
                strokeWidth="5"
              />
              <path d="M 9,50 A 41,41 0 0,1 91,50 Z" fill="currentColor" />
              <rect x="9" y="45" width="82" height="10" fill="currentColor" />
              <circle
                cx="50"
                cy="50"
                r="11"
                fill="none"
                stroke="currentColor"
                strokeWidth="5"
              />
            </svg>
          </div>
        </div>

        <div>
          <h1 className="text-4xl font-bold font-alt mb-3 tracking-wider">
            Trainer Supply Co.
          </h1>
          <p className="text-stone-300 text-lg max-w-md mx-auto font-serif">
            Everything you need for your next adventure — from Pokéballs to
            battle items, delivered across all regions.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 justify-center">
          <Link
            to="/shop"
            className="px-6 py-3 bg-amber-400 text-stone-900 font-semibold rounded-md hover:bg-amber-300 transition-colors duration-200"
          >
            Shop Now
          </Link>
          <Link
            to="/pokedex"
            className="px-6 py-3 border border-stone-400 text-stone-200 font-semibold rounded-md hover:bg-white/10 transition-colors duration-200"
          >
            Browse Pokédex
          </Link>
        </div>
      </section>

      {/* Plank divider */}
      <div className="bg-stone-700 py-3 flex items-center justify-center gap-4 px-8">
        <div className="h-px bg-amber-400/30 flex-1" />
        <svg
          viewBox="0 0 160 16"
          className="w-40 h-4 text-amber-500/60 shrink-0"
          fill="currentColor"
        >
          <rect x="0" y="6" width="160" height="4" rx="2" />
          <rect x="0" y="5" width="160" height="1" opacity="0.4" />
          <rect x="0" y="10" width="160" height="1" opacity="0.4" />
          <circle
            cx="80"
            cy="8"
            r="5"
            fill="#292524"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <circle
            cx="16"
            cy="8"
            r="3"
            fill="#292524"
            stroke="currentColor"
            strokeWidth="1"
          />
          <circle
            cx="144"
            cy="8"
            r="3"
            fill="#292524"
            stroke="currentColor"
            strokeWidth="1"
          />
        </svg>
        <div className="h-px bg-amber-400/30 flex-1" />
      </div>

      {/* Categories */}
      <section className="max-w-4xl mx-auto w-full px-6 py-16">
        <h2 className="text-2xl font-bold font-alt text-stone-700 mb-2 text-center tracking-wider">
          Shop by Category
        </h2>
        <p className="text-center text-stone-400 text-sm mb-8 font-serif italic">
          Stock up before your next adventure
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {SHOP_CATEGORIES.map((category) => (
            <Link
              key={category.id}
              to={`/shop?category=${category.id}`}
              className="bg-white rounded-xl p-6 flex flex-col items-center gap-3 shadow-sm hover:shadow-md transition-all duration-200 group"
            >
              <img
                src={CATEGORY_SPRITES[category.id]}
                alt=""
                aria-hidden="true"
                className="w-12 h-12 object-contain group-hover:scale-110 transition-transform duration-200"
              />
              <span className="text-xs font-semibold text-stone-500 uppercase tracking-widest font-serif">
                {category.label}
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
