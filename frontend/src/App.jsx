import React, { useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from 'react-router-dom';
import './App.css';

import LoginPage from './pages/loginPage/LoginPage';
import HomePage from './pages/homePage/HomePage';
import SignupPage from './pages/signupPage/SignupPage';
import NotFoundPage from './pages/notFoundPage/NotFoundPage';
import { AuthContext } from './contexts/index.js';

import { useAuth } from './hooks/index.js';
import { ToastContainer as Toaster } from 'react-toastify';
import routes from './routes.js';

import Header from './components/Header/Header';

const AuthProvider = ({ children }) => {
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const [user, setUser] = useState(
    currentUser ? { username: currentUser.username } : null
  );
  const logIn = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser({ username: userData.username });
  };

  const logOut = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  const getAuthHeader = () => {
    const userData = JSON.parse(localStorage.getItem('user'));

    return userData?.token ? { Authorization: `Bearer ${userData.token}` } : {};
  };

  return (
    <AuthContext.Provider
      value={{
        logIn,
        logOut,
        getAuthHeader,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const PrivateOutlet = () => {
  const auth = useAuth();
  return auth.user ? <Outlet /> : <Navigate to={routes.loginPagePath()} />;
};

function App() {
  return (
    <>
      <Header />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path={routes.chatPagePath()} element={<PrivateOutlet />}>
              <Route path={routes.chatPagePath()} element={<HomePage />} />
            </Route>
            <Route path={routes.loginPagePath()} element={<LoginPage />} />
            <Route path={routes.signupPagePath()} element={<SignupPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          <Toaster />
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
