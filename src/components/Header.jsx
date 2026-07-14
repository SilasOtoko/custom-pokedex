import React, { useState } from 'react';
import { Link } from 'react-router';
import { useCart } from '../context/CartContext';
import { auth, googleAuthProvider } from '../firebase.js';
import { signInWithPopup } from 'firebase/auth';

function Header({ currentUser, onCartOpen }) {
  const { cart } = useCart();
  const itemCount = cart.reduce((sum, entry) => sum + entry.quantity, 0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function closeMenu() {
    setIsMenuOpen(false);
  }

  return (
    <header className="sticky top-0 z-50">
      <div className="flex justify-between bg-white border-b border-gray-400">
        {/* Logo */}
        <div className="flex items-center justify-center transition-colors h-20 border-r border-b border-gray-400 bg-white rounded-br-md p-2.5 -mb-6 md:px-6">
          <Link
            to="/"
            onClick={closeMenu}
            className="font-alt font-bold uppercase text-lg xs:text-xl sm:text-2xl md:whitespace-nowrap"
          >
            Trainer Supply Co.
          </Link>
        </div>

        {/* Right side */}
        <div className="flex gap-2 md:gap-4 w-full items-center justify-end py-3 px-4 md:pr-8">
          {/* Main nav — desktop only */}
          <nav aria-label="Main navigation" className="hidden md:block">
            <ul className="flex gap-2">
              <li className="flex items-center">
                <Link
                  to="/shop"
                  className="transition-colors hover:cursor-pointer hover:bg-gray-300 p-2 rounded-md"
                >
                  Shop
                </Link>
              </li>
              <li className="flex items-center">
                <Link
                  to="/pokedex"
                  className="transition-colors hover:cursor-pointer hover:bg-gray-300 p-2 rounded-md"
                >
                  Pokédex
                </Link>
              </li>
            </ul>
          </nav>

          {/* Account nav — always visible */}
          <nav aria-label="Account navigation">
            <ul className="flex items-center gap-3 md:gap-6">
              <li className="shrink-0">
                {currentUser === undefined ? (
                  <div className="w-9 h-9 rounded-full bg-gray-100 p-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-full h-full"
                      aria-hidden="true"
                    >
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </div>
                ) : currentUser ? (
                  <Link to="/profile" onClick={closeMenu}>
                    <img
                      src={currentUser.photoURL}
                      alt={currentUser.displayName}
                      className="w-10 h-10 rounded-full border-2 border-white hover:border-red-200 transition-colors"
                    />
                  </Link>
                ) : (
                  <button
                    onClick={() => signInWithPopup(auth, googleAuthProvider)}
                    className="transition-colors hover:cursor-pointer hover:bg-gray-300 flex flex-nowrap items-center gap-1 p-2 rounded-md"
                    title="Sign in with Google"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="w-6 h-6 opacity-80"
                      aria-hidden="true"
                    >
                      <path d="M12 12a3.5 3.5 0 100-7 3.5 3.5 0 000 7zm6.762 7a7.073 7.073 0 00-13.524 0h13.524zM4 21a1 1 0 01-1-1h-.008a9.08 9.08 0 01.02-.159 9.08 9.08 0 015.454-7.127 5.5 5.5 0 117.068 0A9.08 9.08 0 0121.008 20H21a1 1 0 01-1 1H4z" />
                    </svg>
                    <span className="hidden sm:inline whitespace-nowrap">
                      Sign in
                    </span>
                  </button>
                )}
              </li>
              <li className="flex items-center">
                <button
                  type="button"
                  className="flex flex-nowrap gap-2 hover:cursor-pointer bg-gray-800 text-white transition-colors hover:bg-gray-600 py-2 px-3 rounded-md relative"
                  onClick={onCartOpen}
                  aria-label={`Cart, ${itemCount} item${itemCount !== 1 ? 's' : ''}`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 640 640"
                    className="w-5 h-5 opacity-80 mt-px"
                    aria-hidden="true"
                  >
                    <path
                      d="M24 48C10.7 48 0 58.7 0 72C0 85.3 10.7 96 24 96L69.3 96C73.2 96 76.5 98.8 77.2 102.6L129.3 388.9C135.5 423.1 165.3 448 200.1 448L456 448C469.3 448 480 437.3 480 424C480 410.7 469.3 400 456 400L200.1 400C188.5 400 178.6 391.7 176.5 380.3L171.4 352L475 352C505.8 352 532.2 330.1 537.9 299.8L568.9 133.9C572.6 114.2 557.5 96 537.4 96L124.7 96L124.3 94C119.5 67.4 96.3 48 69.2 48L24 48zM208 576C234.5 576 256 554.5 256 528C256 501.5 234.5 480 208 480C181.5 480 160 501.5 160 528C160 554.5 181.5 576 208 576zM432 576C458.5 576 480 554.5 480 528C480 501.5 458.5 480 432 480C405.5 480 384 501.5 384 528C384 554.5 405.5 576 432 576z"
                      fill="currentColor"
                    />
                  </svg>
                  <span className="hidden sm:inline">Cart</span>
                  {itemCount > 0 && (
                    <span
                      className="absolute -top-1 -right-2 bg-rose-600 text-white text-xs font-bold rounded-l-[30px] rounded-r-[30px] h-4 flex items-center justify-center px-1"
                      aria-hidden="true"
                    >
                      {itemCount}
                    </span>
                  )}
                </button>
              </li>
            </ul>
          </nav>

          {/* Hamburger button — mobile only */}
          <button
            type="button"
            className="md:hidden p-2 rounded-md hover:bg-gray-100 transition-colors hover:cursor-pointer"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label="Toggle navigation menu"
          >
            {isMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {isMenuOpen && (
        <nav
          id="mobile-menu"
          aria-label="Mobile navigation"
          className="md:hidden bg-white border-b border-gray-400 px-4 py-2"
        >
          <ul className="flex flex-col">
            <li>
              <Link
                to="/shop"
                onClick={closeMenu}
                className="block px-3 py-3 rounded-md hover:bg-gray-100 transition-colors"
              >
                Shop
              </Link>
            </li>
            <li>
              <Link
                to="/pokedex"
                onClick={closeMenu}
                className="block px-3 py-3 rounded-md hover:bg-gray-100 transition-colors"
              >
                Pokédex
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}

export default Header;
