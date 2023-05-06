import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@/components/App'
import { BrowserRouter as Router } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import "@/styles/index.css"


ReactDOM.createRoot(document.getElementById('root')).render(

  // <React.StrictMode>
  <Auth0Provider
    domain="dev-5nxmvrndnoavntp3.us.auth0.com"
    clientId="qYOcSG98SRhJ08SdDUISFFmUgDmnQaAa"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <Router>
      <App />
    </Router>
  </Auth0Provider>
  // </React.StrictMode>

)
