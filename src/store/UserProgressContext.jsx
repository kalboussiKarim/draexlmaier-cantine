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
  const [isOrderSuccess, setIsOrderSuccess] = useState(false);
  const [isOrderError, setIsOrderError] = useState(false);
  function showCart() {
    setUserProgress("cart");
  }
  function hideCart() {
    setUserProgress("");
  }
  function showConfirmation() {
    setUserProgress("confirmation");
  }
  function hideConfirmation() {
    setUserProgress("");
  }
  function showCheckout() {
    setUserProgress("checkout");
  }
  function hideCheckout() {
    setUserProgress("");
  }
  function showOrderSuccess() {
    setIsOrderSuccess(true);
  }

  function showOrderError() {
    setIsOrderError(true);
  }

  function hideOrderModals() {
    setIsOrderSuccess(false);
    setIsOrderError(false);
  }
  const userProgressCtx = {
    progress: userProgress,
    showCart,
    showCheckout,
    hideCart,
    hideCheckout,
    isOrderSuccess,
    isOrderError,
    showOrderSuccess,
    showOrderError,
    hideOrderModals,
  };
  return (
    <UserProgressContext.Provider value={userProgressCtx}>
      {children}
    </UserProgressContext.Provider>
  );
};
