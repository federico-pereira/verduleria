// src/context/CartContext.js
import React, { createContext, useContext, useEffect, useMemo, useReducer, useRef } from 'react';
import { useAuth } from './AuthContext';

export const CartContext = createContext(null);
const BASE_KEY = 'cart';

const initialState = { items: [] }; // [{id,name,precio,img,stock,qty}]
const keyForUser = (user) => `${BASE_KEY}:${user?.id ?? 'guest'}`;

function loadCart(key, fallback = initialState) {
  try { const raw = localStorage.getItem(key); return raw ? JSON.parse(raw) : fallback; } catch { return fallback; }
}
function saveCart(key, state) {
  try { localStorage.setItem(key, JSON.stringify(state)); } catch { }
}
function mergeItems(a, b) {
  const map = new Map();
  [...a, ...b].forEach((it) => {
    const prev = map.get(it.id);
    if (!prev) map.set(it.id, { ...it });
    else {
      const stock = it.stock ?? prev.stock ?? Infinity;
      const qty = Math.min((prev.qty ?? 0) + (it.qty ?? 0), stock);
      map.set(it.id, { ...prev, qty });
    }
  });
  return Array.from(map.values());
}

function reducer(state, action) {
  switch (action.type) {
    case 'INIT': return action.payload || initialState;

    case 'ADD': {
      const { product, qty = 1 } = action.payload;
      const existing = state.items.find(i => i.id === product.id);
      const max = product.stock ?? Infinity;
      if (existing) {
        const newQty = Math.min(existing.qty + qty, max);
        return { ...state, items: state.items.map(i => i.id === product.id ? { ...i, qty: newQty } : i) };
      }
      return {
        ...state, items: [...state.items, {
          id: product.id, name: product.name, precio: product.precio,
          img: product.img, stock: product.stock ?? Infinity, qty: Math.min(qty, max),
        }]
      };
    }

    case 'UPDATE_QTY': {
      const { id, qty } = action.payload;
      return {
        ...state,
        items: state.items
          .map(i => i.id === id ? { ...i, qty: Math.max(1, Math.min(qty, i.stock ?? Infinity)) } : i)
          .filter(i => i.qty > 0),
      };
    }

    case 'REMOVE': return { ...state, items: state.items.filter(i => i.id !== action.payload.id) };
    case 'CLEAR': return initialState;
    default: return state;
  }
}

export function CartProvider({ children }) {
  const { user } = useAuth();
  const [state, dispatch] = useReducer(reducer, initialState);
  const prevUserRef = useRef(null);

  useEffect(() => {
    const prevUser = prevUserRef.current;
    const isLogin = !prevUser && user;
    const isLogout = prevUser && !user;

    const guestKey = keyForUser(null);
    const userKey = keyForUser(user);

    if (isLogin) {
      const guest = loadCart(guestKey, initialState);
      const userCart = loadCart(userKey, initialState);
      const merged = { items: mergeItems(guest.items, userCart.items) };
      dispatch({ type: 'INIT', payload: merged });
      saveCart(userKey, merged);
      // opcional: limpiar invitado: saveCart(guestKey, initialState);
    } else if (isLogout) {
      // Flush cart on logout
      dispatch({ type: 'CLEAR' });
      saveCart(guestKey, initialState);
    } else {
      // primera carga o cambio entre usuarios
      const loaded = loadCart(userKey, initialState);
      dispatch({ type: 'INIT', payload: loaded });
    }

    prevUserRef.current = user;
  }, [user]);

  useEffect(() => {
    const key = keyForUser(user);
    saveCart(key, state);
  }, [user, state]);

  // API pública
  const addItem = (product, qty = 1) => dispatch({ type: 'ADD', payload: { product, qty } });
  const updateQty = (id, qty) => dispatch({ type: 'UPDATE_QTY', payload: { id, qty } });
  const removeItem = (id) => dispatch({ type: 'REMOVE', payload: { id } });
  const clearCart = () => dispatch({ type: 'CLEAR' });

  const count = useMemo(() => state.items.reduce((acc, it) => acc + it.qty, 0), [state.items]);
  const subtotal = useMemo(() => state.items.reduce((a, it) => a + it.precio * it.qty, 0), [state.items]);

  const value = { items: state.items, addItem, updateQty, removeItem, clearCart, count, subtotal };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within <CartProvider>');
  return ctx;
}
