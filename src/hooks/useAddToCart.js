import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { getEnglishEntry } from '../helpers';

export function useAddToCart(item, englishName) {
  const { dispatch } = useCart();
  const { addToast } = useToast();

  return function handleAddToCart() {
    const name = getEnglishEntry(item?.names)?.name;

    dispatch({ type: 'ADD_ITEM', payload: item });
    addToast(`${name} added to cart!`);
  };
}
