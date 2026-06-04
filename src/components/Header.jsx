import React from 'react';
import { Link } from 'react-router';
import { auth, googleAuthProvider } from '../firebase.js';
import { signInWithPopup } from 'firebase/auth';
import pokedexLogo from '../images/pokedex-logo.svg';

function Header({ currentUser }) {
  return (
    <header className='flex items-center justify-between px-4 py-3 sticky top-0 z-50 border-b border-gray-400 bg-white'>
      <Link to='/allpokemon' className='bg-white flex items-center justify-center transition-colors absolute w-17.5 h-17.5 top-0 left-0 border-r border-b border-gray-400 rounded-br-md p-2.5'>
        <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' className='w-full h-full max-w-8.5'>
          <path d='M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z' />
          <polyline points='9 22 9 12 15 12 15 22' />
        </svg>
      </Link>

      <Link to='/' className='text-center mx-auto'>
        <img src={pokedexLogo} alt='Pokédex Logo' className='h-8' />
      </Link>

      <div className='bg-white flex items-center justify-center transition-colors absolute w-17.5 h-17.5 top-0 right-0 border-l border-b border-gray-400 rounded-bl-md p-2.5'>
        {currentUser === undefined ? (
          <div className='w-11.25 rounded-full bg-gray-100 p-2.5'>
            <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' className='w-full h-full'>
              <path d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2' />
              <circle cx='12' cy='7' r='4' />
            </svg>
          </div>
        ) : currentUser ? (
          <Link to='/profile'>
            <img src={currentUser.photoURL} alt={currentUser.displayName} className='w-8 h-8 rounded-full border-2 border-white hover:border-red-200 transition-colors' />
          </Link>
        ) : (
          <button onClick={() => signInWithPopup(auth, googleAuthProvider)} className='transition-colors w-11.25 rounded-full bg-gray-100 p-2.5 hover:cursor-pointer hover:bg-gray-300' title='Sign in with Google'>
            <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' className='w-full h-full'>
              <path d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2' />
              <circle cx='12' cy='7' r='4' />
            </svg>
          </button>
        )}
      </div>
    </header>
  );
}

export default Header;
