import React from 'react';
import { Link } from 'react-router';
import crateImage from '../images/pokemon-crate.svg';

const NotFound = () => {
  return (
    <div className="max-w-4xl mx-auto px-8 py-20 w-full">
      <h1 className="sr-only">Page Error</h1>
      <img
        src={crateImage}
        alt="Wooden crate with Trainer Supply Co logo on it"
        className="w-48 h-48"
        width="192"
        height="192"
      />
      <p className="text-4xl font-extrabold mt-12">
        Sorry, we couldn't find any in the back.
      </p>
      <p className="mt-4 text-lg">Feel free to explore the rest of our shop.</p>
      <div className="flex justify-start">
        <Link
          to="/shop"
          className="flex items-center gap-2 px-3 py-2 rounded-md text-sm text-white bg-gray-800 hover:bg-gray-600 disabled:opacity-30 disabled:cursor-not-allowed hover:cursor-pointer duration-300 transition-colors mt-4"
        >
          <span>←</span>
          <span>Return to the shop</span>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
