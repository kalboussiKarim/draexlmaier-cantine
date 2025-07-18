import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import acc from "../../appWrite/users";

export const AuthContext = createContext();

function AuthenticationProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const checkSession = async () => {
    setLoading(true);
    try {
      const session = await acc.get();
      setUser(session);
      //console.log("Session found!");
    } catch (error) {
      if (error.code !== 401) {
        console.error("Error checking session:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkSession();
  }, []);

  const login = async (email, password) => {
    //setLoading(true);
    try {
      const login = await acc.login(email, password);
      const session = await acc.get(); // lezem nzidouha 5ater el login object mafichi el user name w id s7i7 fih
      setUser(session);

      //console.log("loggin in ....");
      navigate("/admin/orders"); // redirect to orders page after login
    } catch (error) {
      console.error("Login failed", error);
      return error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      const session = await acc.logout();
      setUser(null);
      navigate("/admin");
    } catch (error) {
      console.error("Logout failed", error);
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return ""; //loading indicator not setup yet
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthenticationProvider;
