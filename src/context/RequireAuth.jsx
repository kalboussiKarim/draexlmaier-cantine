import { useContext } from "react";
import { AuthContext } from "./AuthenticationProvider";
import AdminLogin from "../components/Admin/AdminLogin";

export default function RequireAuth({ children }) {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <AdminLogin />;
  }

  return children;
}
