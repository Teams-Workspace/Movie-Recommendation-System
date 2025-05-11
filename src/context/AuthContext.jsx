import { createContext, useState, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Initialize users with a predefined user if none exist
  const [users, setUsers] = useLocalStorage('users', [
    { username: 'username', password: 'password' }, // Predefined user
  ]);
  const [user, setUser] = useLocalStorage('user', null);

  const login = (username, password) => {
    const foundUser = users.find(
      (u) => u.username === username && u.password === password
    );
    if (foundUser) {
      setUser({ username });
      return true;
    }
    return false;
  };

  const signup = (username, password) => {
    if (users.some((u) => u.username === username)) return false;
    setUsers([...users, { username, password }]);
    setUser({ username });
    return true;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};