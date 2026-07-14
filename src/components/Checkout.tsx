import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { database } from '../firebase';
import { ref, push } from 'firebase/database';
import { useCart } from '../context/CartContext';
import { getEnglishEntry } from '../helpers';
import OrderSummary from '../components/OrderSummary';

const REGIONS = [
  'Kanto',
  'Johto',
  'Hoenn',
  'Sinnoh',
  'Unova',
  'Kalos',
  'Alola',
  'Galar',
  'Paldea',
];

function Checkout({ currentUser }) {
  const { cart, dispatch } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    email: '',
    region: '',
    city: '',
    address: '',
  });

  const total = cart.reduce(
    (sum, entry) => sum + entry.item.cost * entry.quantity,
    0,
  );

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const order = {
    id: Date.now().toString(),
    items: cart,
    total,
    form,
    createdAt: Date.now(),
    status: 'pending',
  };

  function handleSubmit(e) {
    e.preventDefault();

    if (currentUser) {
      push(ref(database, `users/${currentUser.uid}/orders`), order);
    } else {
      const existing = JSON.parse(localStorage.getItem('orders') || '[]');
      localStorage.setItem('orders', JSON.stringify([...existing, order]));
    }

    dispatch({ type: 'CLEAR_CART' });
    navigate('/order-confirmation', { state: { order } });
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <p className="text-gray-500 text-lg">Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 w-full">
      <h1 className="text-2xl font-bold text-gray-800 mb-8">Checkout</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <h2 className="text-lg font-semibold text-gray-700">
            Trainer Details
          </h2>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-600" htmlFor="name">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={form.name}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-600" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={form.email}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-600" htmlFor="region">
              Region
            </label>
            <select
              id="region"
              name="region"
              required
              value={form.region}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 bg-white"
            >
              <option value="">Select a region</option>
              {REGIONS.map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-600" htmlFor="city">
              City / Town
            </label>
            <input
              id="city"
              name="city"
              type="text"
              required
              value={form.city}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-600" htmlFor="address">
              Address
            </label>
            <input
              id="address"
              name="address"
              type="text"
              required
              value={form.address}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>

          <button
            type="submit"
            className="mt-4 px-6 py-3 bg-gray-800 text-white rounded-md hover:bg-gray-600 transition-colors duration-200 hover:cursor-pointer"
          >
            Place Order
          </button>
        </form>

        {/* Order summary */}
        <OrderSummary cart={cart} />
      </div>
    </div>
  );
}

export default Checkout;
