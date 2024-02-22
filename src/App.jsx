import Cart from "./components/Cart";
import Header from "./components/Header";
import Meals from "./components/Meals";
import { UserProgressContextProvider } from "./store/UserProgressContext";
import { CartContextProvider } from "./store/cartContext";

function App() {
  return (
    <UserProgressContextProvider>
      <CartContextProvider>
        <Header />
        <Meals />
        <Cart />
      </CartContextProvider>
    </UserProgressContextProvider>
  );
}

export default App;
