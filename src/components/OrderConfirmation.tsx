import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router';
import { useCart } from '../context/CartContext';
import { getEnglishEntry } from '../helpers';
import OrderSummary from './OrderSummary';
import { ref, update, increment } from 'firebase/database';
import { database } from '../firebase.js';
import { useAuth } from '../context/AuthContext';

function OrderConfirmation({ order }) {
  const location = useLocation();
  const items = location.state?.order?.items;
  const { currentUser } = useAuth();

  useEffect(() => {
    if (!currentUser || !items) return;
    if (currentUser && items) {
      items.forEach((entry) =>
        update(ref(database, `users/${currentUser.uid}/inventory`), {
          [entry.item.name]: increment(entry.quantity),
        }),
      );
    }
  }, [currentUser, items]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 w-full">
      <h1 className="text-2xl font-bold text-gray-800 mb-8">
        Order Submitted Successfully!
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <p>Order ID: {location.state?.order.id}</p>
        <p>
          Shipping Address:
          <br />
          <span>{location.state?.order.form.name}</span>
          <br />
          <span>{location.state?.order.form.address}</span>
          <br />
          <span>{location.state?.order.form.city}</span>,
          <span> {location.state?.order.form.region}</span>
        </p>
      </div>
      <OrderSummary cart={items} />
      <div className="flex justify-start">
        <Link
          to="/shop"
          className="flex items-center gap-4 mt-4 px-6 py-3 bg-gray-800 text-white rounded-md hover:bg-gray-600 transition-colors duration-200 hover:cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 640"
            className="fill-current w-6 h-6"
          >
            <path d="M73.4 297.4C60.9 309.9 60.9 330.2 73.4 342.7L233.4 502.7C245.9 515.2 266.2 515.2 278.7 502.7C291.2 490.2 291.2 469.9 278.7 457.4L173.3 352L544 352C561.7 352 576 337.7 576 320C576 302.3 561.7 288 544 288L173.3 288L278.7 182.6C291.2 170.1 291.2 149.8 278.7 137.3C266.2 124.8 245.9 124.8 233.4 137.3L73.4 297.3z" />
          </svg>
          <span>Continue Shopping</span>
        </Link>
      </div>
    </div>
  );
}

export default OrderConfirmation;
