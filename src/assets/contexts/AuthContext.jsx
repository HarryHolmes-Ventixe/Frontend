import { jwtDecode } from "jwt-decode";
import { createContext, useContext, useEffect, useState } from "react";

// Github Copilot suggested this code to make it so that all components that are meant to change upon sign in or sign out function as expected.

const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [userInfo, setUserInfo] = useState({ name: '', email: '' });

  const checkAuth = () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded.exp && Date.now() < decoded.exp * 1000) {
          setIsSignedIn(true);
          setUserInfo({ 
            firstName: decoded.firstName || '',
            lastName: decoded.lastName || '',
            name: `${decoded.firstName || ''} ${decoded.lastName || ''}`, 
            email:  decoded.email || ''.trim() 
          });
        } else {
          setIsSignedIn(false);
          setUserInfo({ name: '', email: '' });
        }
      } catch (e) {
        setIsSignedIn(false);
        setUserInfo({ name: '', email: '' });
      }
    } else {
      setIsSignedIn(false);
      setUserInfo({ name: '', email: '' });
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ isSignedIn, setIsSignedIn, userInfo, setUserInfo, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);