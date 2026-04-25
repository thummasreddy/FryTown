import { useEffect, useReducer } from 'react';
import type { ReactNode } from 'react';
import { CartContext } from './cartStore';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  customizations?: {
    size?: string;
    style?: string;
    flavors?: string[];
  };
  type: 'custom' | 'regular';
}

interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: Omit<CartItem, 'quantity'> }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' };

const CART_STORAGE_KEY = 'frytown-cart-v1';

const initialState: CartState = {
  items: [],
  total: 0,
  itemCount: 0,
};

function buildCartState(items: CartItem[]): CartState {
  return {
    items,
    total: items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
  };
}

function readStoredCart(): CartState {
  if (typeof window === 'undefined') {
    return initialState;
  }

  try {
    const rawCart = window.localStorage.getItem(CART_STORAGE_KEY);

    if (!rawCart) {
      return initialState;
    }

    const parsedCart = JSON.parse(rawCart);

    if (!Array.isArray(parsedCart)) {
      return initialState;
    }

    const items = parsedCart
      .filter(
        (item): item is CartItem =>
          typeof item?.id === 'string' &&
          typeof item?.name === 'string' &&
          typeof item?.price === 'number' &&
          Number.isFinite(item.price) &&
          typeof item?.quantity === 'number' &&
          Number.isFinite(item.quantity) &&
          item.quantity > 0 &&
          (item?.type === 'custom' || item?.type === 'regular')
      )
      .map((item) => ({
        ...item,
        quantity: Math.max(1, Math.trunc(item.quantity)),
        image: typeof item.image === 'string' ? item.image : undefined,
        customizations: item.customizations
          ? {
              size:
                typeof item.customizations.size === 'string'
                  ? item.customizations.size
                  : undefined,
              style:
                typeof item.customizations.style === 'string'
                  ? item.customizations.style
                  : undefined,
              flavors: Array.isArray(item.customizations.flavors)
                ? item.customizations.flavors.filter(
                    (flavor): flavor is string => typeof flavor === 'string'
                  )
                : undefined,
            }
          : undefined,
      }));

    return buildCartState(items);
  } catch {
    return initialState;
  }
}

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find((item) => item.id === action.payload.id);

      if (existingItem) {
        const updatedItems = state.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );

        return buildCartState(updatedItems);
      }

      return buildCartState([...state.items, { ...action.payload, quantity: 1 }]);
    }

    case 'REMOVE_ITEM': {
      const newItems = state.items.filter((item) => item.id !== action.payload);
      return buildCartState(newItems);
    }

    case 'UPDATE_QUANTITY': {
      const item = state.items.find((entry) => entry.id === action.payload.id);

      if (!item) {
        return state;
      }

      const newItems = state.items.map((entry) =>
        entry.id === action.payload.id
          ? { ...entry, quantity: action.payload.quantity }
          : entry
      );

      return buildCartState(newItems);
    }

    case 'CLEAR_CART':
      return initialState;

    default:
      return state;
  }
}

export interface CartContextType {
  cart: CartState;
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, dispatch] = useReducer(cartReducer, initialState, readStoredCart);

  useEffect(() => {
    try {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart.items));
    } catch {
      // Ignore storage write failures and keep the in-memory cart available.
    }
  }, [cart.items]);

  const addItem = (item: Omit<CartItem, 'quantity'>) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
  };

  const removeItem = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
    } else {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
    }
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
