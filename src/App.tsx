import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router';
import { ref, onValue, set, remove } from 'firebase/database';
import './css/index.css';
import Home from './components/Home';
import Header from './components/Header';
import PokemonList from './components/PokemonList';
import PokemonDetails from './components/PokemonDetails';
import Profile from './components/Profile';
import Shop from './components/Shop';
import ItemDetail from './components/ItemDetail';
import CartDrawer from './components/CartDrawer';
import ToastContainer from './components/ToastContainer';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import OrderConfirmation from './components/OrderConfirmation';
import Expeditions from './components/Expeditions';
import Login from './components/Login';
import jsonData from './pokemonlist';
import { CartProvider } from './context/CartContext';
import { ToastProvider } from './context/ToastContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { auth, database } from './firebase.js';
import ErrorBoundary from './components/ErrorBoundary';
import NotFound from './components/NotFound';

function AppContent() {
  const { currentUser } = useAuth();
  const [allPokemonData, setAllPokemonData] = useState([]);
  const [favorites, setFavorites] = useState({});
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isNotifyOpen, setIsNotifyOpen] = useState(false);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const data = jsonData.data.results.slice(0, 151).map((item, index) => ({
      ...item,
      id: index + 1,
    }));
    setAllPokemonData(data);
  }, []);

  useEffect(() => {
    if (!currentUser) {
      setFavorites({});
      return;
    }
    const favRef = ref(database, `users/${currentUser.uid}/favorites`);
    const unsubscribe = onValue(favRef, (snapshot) => {
      setFavorites(snapshot.val() || {});
    });
    return unsubscribe;
  }, [currentUser]);

  useEffect(() => {
    if (!currentUser) {
      setOrders([]);
      return;
    }
    const ordersRef = ref(database, `users/${currentUser.uid}/orders`);
    const unsubscribe = onValue(ordersRef, (snapshot) => {
      const val = snapshot.val();
      if (!val) {
        setOrders([]);
        return;
      }
      const sorted = Object.values(val).sort(
        (a, b) => b.createdAt - a.createdAt,
      );
      setOrders(sorted);
    });
    return unsubscribe;
  }, [currentUser]);

  const toggleFavorite = (pokemonName) => {
    if (!currentUser) return;
    if (favorites[pokemonName]) {
      remove(
        ref(database, `users/${currentUser.uid}/favorites/${pokemonName}`),
      );
    } else {
      set(
        ref(database, `users/${currentUser.uid}/favorites/${pokemonName}`),
        true,
      );
    }
  };

  return (
    <>
      <Header onCartOpen={() => setIsCartOpen(true)} />
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/:itemName" element={<ItemDetail />} />
          <Route
            path="/pokedex"
            element={
              <PokemonList
                allPokemon={allPokemonData}
                favorites={favorites}
                toggleFavorite={toggleFavorite}
              />
            }
          />
          <Route
            path="/pokemon/:id"
            element={
              <PokemonDetails
                allPokemon={allPokemonData}
                favorites={favorites}
                toggleFavorite={toggleFavorite}
              />
            }
          />
          <Route
            path="/profile"
            element={
              <Profile
                allPokemon={allPokemonData}
                favorites={favorites}
                toggleFavorite={toggleFavorite}
                orders={orders}
              />
            }
          />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
          <Route path="/expeditions" element={<Expeditions />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ErrorBoundary>
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <ToastContainer />
    </>
  );
}

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-200">
      <AuthProvider>
        <ToastProvider>
          <CartProvider>
            <AppContent />
          </CartProvider>
        </ToastProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
