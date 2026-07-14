import React, { createContext, useReducer, useContext, useEffect } from 'react';

const CartContext = createContext();

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.find(
        (entry) => entry.item.name === action.payload.name,
      );
      if (existing) {
        return state.map((entry) =>
          entry.item.name === action.payload.name
            ? { ...entry, quantity: entry.quantity + 1 }
            : entry,
        );
      } else {
        return [...state, { item: action.payload, quantity: 1 }];
      }
    }

    case 'DECREMENT_ITEM': {
      const existing = state.find(
        (entry) => entry.item.name === action.payload.name,
      );
      if (existing.quantity === 1) {
        return state.filter((entry) => entry.item.name !== action.payload.name);
      } else {
        return state.map((entry) =>
          entry.item.name === action.payload.name
            ? { ...entry, quantity: entry.quantity - 1 }
            : entry,
        );
      }
    }

    case 'REMOVE_ITEM':
      return state.filter((entry) => entry.item.name !== action.payload);
    case 'CLEAR_CART':
      return [];
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, [], () => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
