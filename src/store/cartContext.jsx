import { useContext, createContext, useState, useReducer } from "react";
export const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (item) => {},
});

const cartReducer = (state, action) => {
  if (action.type == "ADD_ITEM") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.$id === action.item.$id
    );
    const updatedItems = [...state.items];
    if (existingCartItemIndex !== -1) {
      const updatedItem = {
        ...state.items[existingCartItemIndex],
        quantity: state.items[existingCartItemIndex].quantity + 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems.push({ ...action.item, quantity: 1 });
    }
    return { ...state, items: updatedItems };
  }
  if (action.type == "REMOVE_ITEM") {
    //console.log(state.items);
    //console.log(action.id);
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.$id === action.id
    );
    const existingCartItem = state.items[existingCartItemIndex];
    const updatedItems = [...state.items];
    //console.log(existingCartItem);
    if (existingCartItem.quantity === 1) {
      updatedItems.splice(existingCartItemIndex, 1); // ✅ FIX: actually removes the item
    } else {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity - 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    }
    return { ...state, items: updatedItems };
  }
  if (action.type === "CLEAR_CART") {
    return { items: [] }; // <-- this clears the cart
  }
  return state;
};
export const CartContextProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [cart, dispatchCartAction] = useReducer(cartReducer, { items: [] });

  function addItem(item) {
    dispatchCartAction({ type: "ADD_ITEM", item });
  }
  function removeItem(id) {
    dispatchCartAction({ type: "REMOVE_ITEM", id });
  }
  function clearCart() {
    dispatchCartAction({ type: "CLEAR_CART" });
  }
  const cartContext = {
    items: cart.items,
    addItem,
    removeItem,
    clearCart, // ← add this
  };
  //   console.log(cartContext);
  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
};
