import { createContext, ReactNode, useContext, useState } from 'react';
import { ShoppingCart } from '../components/ShoppingCart';
import {useLocalStorage} from '../hooks/useLocalStorage'

type ShoppingCartProviderProps = {
  children: ReactNode;
};
type CartItem = {
  id: number;
  quantity: number;
};

type ShoppingCartContext = {
  openCart: () => void;
  closeCart: () => void;
  getItemQuantity: (id: number) => number;
  increaseItemQuantity: (id: number) => void;
  decreaseItemQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
  cartQuantity: number;
  cartItems: CartItem[];
};

const ShoppingCartContext = createContext({} as ShoppingCartContext);

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>("shopping-cart",[]);

  function getItemQuantity(id: number) {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  }
  function increaseItemQuantity(id: number) {
    setCartItems((cartItems) => {
      if (cartItems.find((item) => item.id === id) == null) {
        return [
          ...cartItems,
          {
            id: id,
            quantity: 1,
          },
        ];
      } else {
        return cartItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        });
      }
    });
  }
  function decreaseItemQuantity(id: number) {
    setCartItems((cartItems) => {
      if (cartItems.find((item) => item.id === id)?.quantity === 1) {
        return cartItems.filter((item) => item.id !== id);
      } else {
        return cartItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          }
          return item;
        });
      }
    });
  }

  function removeFromCart(id: number) {
    setCartItems((cartItems) => {
      return cartItems.filter((item) => item.id !== id);
    });
  }
  function openCart() {
    setIsOpen(true);
  }
  function closeCart() {
    setIsOpen(false);
  }

  const cartQuantity = cartItems.reduce(
    (quantity, item) => quantity + item.quantity,
    0
  );

  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        increaseItemQuantity,
        decreaseItemQuantity,
        removeFromCart,
        openCart,
        closeCart,
        cartItems,
        cartQuantity,
      }}
    >
      {children}
      <ShoppingCart isOpen={isOpen} />
    </ShoppingCartContext.Provider>
  );
}
