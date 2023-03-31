import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthContextPovider } from './context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextPovider>
      <App />
    </AuthContextPovider>
  </React.StrictMode>
);
