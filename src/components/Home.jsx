import React from 'react';
import { Link } from 'react-router';
import pokedexLogo from '../images/pokedex-logo-stacked.svg';

function Home() {
  return (
    <div className='flex flex-col grow'>
      <div className='flex justify-center items-center grow'>
        <img src={pokedexLogo} alt='Pokédex Logo' className='w-48' />
      </div>
      <div className='p-2.5 bg-white mt-auto w-full text-center'>
        <Link to='/allpokemon' className='px-8 py-3 bg-gray-800 text-white rounded-md transition-colors inline-block mx-auto'>
          Begin
        </Link>
      </div>
    </div>
  );
}

export default Home;
