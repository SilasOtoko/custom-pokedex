import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Navigate } from 'react-router';
import { database } from '../firebase';
import { ref, push, get } from 'firebase/database';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import OrderSummary from '../components/OrderSummary';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import Label from './form/Label';
import Input from './form/Input';

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

function Checkout() {
  useDocumentTitle('Checkout');
  const { currentUser } = useAuth();

  const { cart, dispatch } = useCart();
  const hasSubmitted = useRef(false);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: currentUser?.displayName || currentUser?.email || '',
    email: currentUser?.email || '',
    region: '',
    city: '',
    address: '',
  });

  useEffect(() => {
    if (!currentUser) return;
    get(ref(database, `users/${currentUser.uid}/profile`)).then((snapshot) => {
      if (snapshot.exists()) {
        const profile = snapshot.val();
        setForm((prev) => ({
          ...prev,
          region: profile.region || prev.region,
          city: profile.city || prev.city,
          address: profile.address || prev.address,
        }));
      }
    });
  }, [currentUser]);

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

    hasSubmitted.current = true;

    if (currentUser) {
      push(ref(database, `users/${currentUser.uid}/orders`), order);
    } else {
      const existing = JSON.parse(localStorage.getItem('orders') || '[]');
      localStorage.setItem('orders', JSON.stringify([...existing, order]));
    }

    dispatch({ type: 'CLEAR_CART' });
    navigate('/order-confirmation', { state: { order } });
  }

  if (cart.length === 0 && !hasSubmitted.current) {
    return <Navigate to="/cart" replace />;
  }

  return (
    <div className="max-w-4xl mx-auto px-8 py-20 w-full">
      <h1 className="text-2xl font-bold text-gray-800 mb-8">Checkout</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <h2 className="text-lg font-semibold text-gray-700">
            Trainer Details
          </h2>

          <div className="flex flex-col">
            <Label className="text-sm text-gray-600" htmlFor="name">
              Full Name
            </Label>
            <Input
              id="name"
              name="name"
              type="text"
              required
              value={form.name}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 bg-white"
            />
          </div>

          <div className="flex flex-col">
            <Label className="text-sm text-gray-600" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              value={form.email}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>

          <div className="flex flex-col">
            <Label className="text-sm text-gray-600" htmlFor="region">
              Region
            </Label>
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

          <div className="flex flex-col">
            <Label className="text-sm text-gray-600" htmlFor="city">
              City / Town
            </Label>
            <Input
              id="city"
              name="city"
              type="text"
              required
              value={form.city}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>

          <div className="flex flex-col">
            <Label className="text-sm text-gray-600" htmlFor="address">
              Address
            </Label>
            <Input
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
