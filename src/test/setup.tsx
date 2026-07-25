import '@testing-library/jest-dom';
import React from 'react';
import { MemoryRouter } from 'react-router';
import { CartProvider } from '../context/CartContext';

global.IntersectionObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};

function AllProviders({ children }) {
  return (
    <MemoryRouter>
      <CartProvider>{children}</CartProvider>
    </MemoryRouter>
  );
}

export { AllProviders };

HTMLDialogElement.prototype.showModal = vi.fn();
HTMLDialogElement.prototype.close = vi.fn();
