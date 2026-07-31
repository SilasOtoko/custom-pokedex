import React from 'react';
import { Link } from 'react-router';
import { SHOP_CATEGORIES } from '../shopCategories';
import pokeballSvg from '../images/pokeball.svg';
import Card from './Card';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import bannerImage from '../images/banner-painted.jpg';

const CATEGORY_SPRITES = {
  pokeballs: 'https://www.serebii.net/itemdex/sprites/sv/pokeball.png',
  medicine: 'https://www.serebii.net/itemdex/sprites/sv/potion.png',
  'battle-items': 'https://www.serebii.net/itemdex/sprites/sv/choiceband.png',
  berries: 'https://www.serebii.net/itemdex/sprites/sv/oranberry.png',
  tms: '../tm-sprites/normal.png',
  vitamins: 'https://www.serebii.net/itemdex/sprites/sv/hpup.png',
};

function Home() {
  useDocumentTitle('Home');

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section
        className="bg-stone-800 text-white px-6 py-24 flex flex-col items-center text-center gap-6 -mt-4 bg-no-repeat bg-cover bg-center"
        style={{
          backgroundImage: `url(${bannerImage})`,
        }}
      >
        <div className="pt-14 xl:pt-28">
          <h1 className="sr-only">Trainer Supply Co.</h1>
          <p className="text-4xl md:text-5xl xl:text-7xl max-w-2xl xl:max-w-4xl font-bold text-slate-800">
            Gear up for your next Pokémon adventure
          </p>
          {/* <p className="text-stone-300 text-lg max-w-md mx-auto font-serif">
            Everything you need for your next adventure — from Pokéballs to
            battle items, delivered across all regions.
          </p> */}
        </div>

        <div className="flex flex-wrap gap-3 justify-center">
          <Link
            to="/shop"
            className="px-6 py-3 bg-pokeball-red text-white rounded-md hover:bg-red-800 transition duration-300 outline-2 outline-transparent hover:outline-gray-400"
          >
            Shop Now
          </Link>
          <Link
            to="/pokedex"
            className="px-6 py-3 text-slate-800 rounded-md bg-white hover:bg-gray-100 outline-2 outline-transparent hover:outline-gray-400 transition duration-300 shadow hover:shadow-md"
          >
            Browse Pokédex
          </Link>
        </div>
      </section>

      {/* Plank divider */}
      {/* <div className="bg-stone-700 py-3 flex items-center justify-center gap-4 px-8">
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
            </div> */}

      {/* Categories */}
      <section className="max-w-4xl mx-auto w-full px-6 py-16">
        <h2 className="text-2xl font-bold font-alt text-stone-700 mb-8 text-center">
          Shop by Category
        </h2>
        {/* <p className="text-center text-stone-600 mb-8 font-sans">
          Stock up before your next adventure
        </p> */}

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {SHOP_CATEGORIES.map((category) => (
            <Card
              className="relative p-6 flex items-center justify-center"
              key={category.id}
            >
              <span>
                <img
                  src={CATEGORY_SPRITES[category.id]}
                  alt=""
                  aria-hidden="true"
                  className="w-30 h-30 object-contain group-hover:scale-110 transition-transform duration-200 mx-auto"
                />
                <span className="text-md text-center font-bold text-stone-800 font-alt block mt-3">
                  {category.label}
                </span>
                <Link
                  to={`/shop?category=${category.id}`}
                  className="absolute inset-0"
                  aria-label={category.label}
                />
              </span>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
