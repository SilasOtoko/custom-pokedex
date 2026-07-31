import React from 'react';

function Label({ htmlFor, children, className = '' }) {
  return (
    <label htmlFor={htmlFor} className='block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1'>
      {children}
    </label>
  );
}

export default Label;
