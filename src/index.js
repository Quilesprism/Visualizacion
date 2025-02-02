import React from 'react';
import ReactDOM from 'react-dom/client'; 
import App from './App';

import { Auth0Provider } from "@auth0/auth0-react";

const domain = "dev-ajp0a2gyeczahjh2.us.auth0.com"; 
const clientId = "WCjafQ8oP9mB45jeQdxH8Y03bkgRySei"; 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={window.location.origin}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
);