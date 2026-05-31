import { createContext, useContext, useReducer } from 'react';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      const exists = state.find(i => i._id === action.item._id);
      if (exists) {
        return state.map(i =>
          i._id === action.item._id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...state, { ...action.item, quantity: 1 }];

    case 'REMOVE':
      return state.filter(i => i._id !== action.id);

    case 'UPDATE_QTY':
      return state.map(i =>
        i._id === action.id ? { ...i, quantity: action.qty } : i
      );

    case 'CLEAR':
      return [];

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, []);

  const addToCart    = (item) => dispatch({ type: 'ADD', item });
  const removeItem   = (id)   => dispatch({ type: 'REMOVE', id });
  const updateQty    = (id, qty) => dispatch({ type: 'UPDATE_QTY', id, qty });
  const clearCart    = ()    => dispatch({ type: 'CLEAR' });

  const total = cart.reduce((acc, i) => acc + i.price * i.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeItem, updateQty, clearCart, total }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);