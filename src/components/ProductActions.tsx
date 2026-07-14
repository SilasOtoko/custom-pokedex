import NotifyMe from './NotifyMe';
import QuantityControls from './QuantityControls';
import { UNAVAILABLE_ITEMS } from '../shopCategories';
import { useCart } from '../context/CartContext';
import { useAddToCart } from '../hooks/useAddToCart';

function ProductActions({ item, className }) {
  const { cart } = useCart();
  const handleAddToCart = useAddToCart(item);
  const isUnavailable = UNAVAILABLE_ITEMS.includes(item?.name);
  const entry = cart.find((e) => e.item.name === item?.name);
  const inCart = entry !== undefined;

  return (
    <div className={className}>
      {isUnavailable ? (
        <NotifyMe itemName={item.name} />
      ) : inCart ? (
        <div className="bg-gray-50 rounded-md p-2">
          <QuantityControls item={item}>
            <span>{`${entry.quantity} in cart`}</span>
          </QuantityControls>
        </div>
      ) : (
        <button
          type="button"
          className="w-full px-8 py-3 bg-gray-800 text-white rounded-md transition-colors hover:cursor-pointer hover:bg-gray-600 duration-200"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      )}
    </div>
  );
}

export default ProductActions;
