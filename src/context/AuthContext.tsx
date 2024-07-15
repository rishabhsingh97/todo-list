import { createContext, useState, useContext, ReactNode, FC, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import authApi from '../api/authApi';
import { jwtDecode } from 'jwt-decode';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (payload: any) => Promise<boolean | undefined>;
  register: (payload: any) => Promise<boolean | undefined>;
  logout: () => boolean | undefined;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const checkAuthentication = async () => {
      const access_token = localStorage.getItem('access_token');
      const refresh_token = localStorage.getItem('refresh_token');

      const whitelistedPath = ['/login', '/register'];

      if (whitelistedPath.some(path => location.pathname.includes(path))) {
        return;
      }

      if (access_token && refresh_token) {
        try {
          const decodedToken: any = jwtDecode(access_token);
          // Check if token is expired
          if (decodedToken.exp < Date.now() / 1000) {
            try {
              const refreshed = await authApi.refreshToken({ refresh: refresh_token });
              console.log("refesh ", refreshed);
              if (refreshed?.access && refreshed?.refresh) {
                localStorage.setItem('access_token', refreshed.access);
                localStorage.setItem('refresh_token', refreshed.refresh);
                setIsAuthenticated(true);
              }
              else {
                setIsAuthenticated(false);
              }
            }
            catch (refreshError) {
              console.error('Error refreshing token', refreshError);
              setIsAuthenticated(false);
            }
          }
          else {
            setIsAuthenticated(true);
          }
        } catch (error) {
          console.error('Error decoding token', error);
          setIsAuthenticated(false);
        }
      }
    };

    checkAuthentication();
  }, [location.pathname]);

  const login = async (payload: any) => {
    const response = await authApi.login(payload);
    if (response) {
      const { access, refresh } = response;
      localStorage.setItem('access_token', access);
      localStorage.setItem('refresh_token', refresh);
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const register = async (payload: any) => {
    const response = await authApi.register(payload);
    if (response) {
      const { username } = response;
      if (username) {
        return true;
      }
    }
    return false;
  };

  const logout = () => {
    try {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      setIsAuthenticated(false);
      return true;
    }
    catch (error: any) {
      console.log("Error occured while log out ", error);
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
