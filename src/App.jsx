import Cart from "./components/Cart";
import Checkout from "./components/Chekout";
import Header from "./components/Header";
import Meals from "./components/Meals";
import { UserProgressContextProvider } from "./store/UserProgressContext";
import OrderSuccessModal from "./components/OrderSuccessModal";
import OrderErrorModal from "./components/OrderErrorModal";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Admin from "./components/Admin";
import { CartContextProvider } from "./store/cartContext";
import AuthenticationProvider from "./context/AuthenticationProvider";
import RequireAuth from "./context/RequireAuth";
import Orders from "./components/Admin/Orders";
import Pizzas from "./components/Admin/Pizzas";
import AdminLogin from "./components/Admin/AdminLogin";
import AdminLayout from "./components/Admin/AdminLayout";
import FloatingCartButton from "./components/FloatingCartButton";

function App() {
  return (
    <Router>
      <AuthenticationProvider>
        <UserProgressContextProvider>
          <CartContextProvider>
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <Header />
                    <Meals />
                    <Cart />
                    <Checkout />
                    <OrderSuccessModal />
                    <OrderErrorModal />
                  </>
                }
              />
              <Route
                path="/admin"
                element={
                  <RequireAuth>
                    <AdminLayout />
                  </RequireAuth>
                }
              >
                <Route index element={<Navigate to="orders" />} />
                <Route path="/admin/orders" element={<Orders />} />
                <Route path="/admin/products" element={<Pizzas />} />
              </Route>

              <Route path="/admin/login" element={<AdminLogin />} />
            </Routes>
          </CartContextProvider>
        </UserProgressContextProvider>
      </AuthenticationProvider>
    </Router>
  );
}

export default App;
