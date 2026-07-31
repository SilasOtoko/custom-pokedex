import React from 'react';

function Input({ className = '', ...rest }) {
  return (
    <input
      {...rest}
      className={`border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 bg-white ${className}`}
    />
  );
}

export default Input;
