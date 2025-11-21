// services/AuthService.js

export const isAuthenticated = () => {
    // Check if the user is authenticated by checking the presence of a token
    return localStorage.getItem('token') !== null;
  };
  
  export const login = (token) => {
    localStorage.setItem('token', token); // Store the token in local storage
  };
  
  export const logout = () => {
    localStorage.removeItem('token'); // Remove token from local storage
  };
  