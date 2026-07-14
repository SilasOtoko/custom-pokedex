import React, { createContext, useReducer, useContext } from 'react';

const ToastContext = createContext();

function toastReducer(state, action) {
  switch (action.type) {
    case 'ADD_TOAST': {
      return [...state, action.payload];
    }

    case 'REMOVE_TOAST':
      return state.filter((entry) => entry.id !== action.payload);
    default:
      return state;
  }
}

export function ToastProvider({ children }) {
  const [toasts, dispatch] = useReducer(toastReducer, []);

  function addToast(message) {
    const id = crypto.randomUUID(); // Using instead of Date.now() to avoid duplicate key issue
    dispatch({ type: 'ADD_TOAST', payload: { id, message } });
    setTimeout(() => {
      dispatch({ type: 'REMOVE_TOAST', payload: id });
    }, 3000);
  }

  return (
    <ToastContext.Provider value={{ toasts, addToast }}>
      {children}
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}
