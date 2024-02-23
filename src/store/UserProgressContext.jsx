import { createContext, useContext, useState } from "react";
export const UserProgressContext = createContext({
  progress: "",
  showCart: () => {},
  showCheckout: () => {},
  hideCart: () => {},
  hideCheckout: () => {},
});
export const UserProgressContextProvider = ({ children }) => {
  const [userProgress, setUserProgress] = useState("");
  function showCart() {
    setUserProgress("cart");
  }
  function hideCart() {
    setUserProgress("");
  }

  function showCheckout() {
    setUserProgress("checkout");
  }
  function hideCheckout() {
    setUserProgress("");
  }
  const userProgressCtx = {
    progress: userProgress,
    showCart,
    showCheckout,
    hideCart,
    hideCheckout,
  };
  return (
    <UserProgressContext.Provider value={userProgressCtx}>
      {children}
    </UserProgressContext.Provider>
  );
};
