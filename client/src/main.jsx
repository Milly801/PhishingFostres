// main.jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Auth0Provider } from '@auth0/auth0-react'
import App from './App.jsx'
import './styles/globals.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SimulationStart from "./components/simulation/SimulationStart";
import EmailSimulation from "./components/simulation/EmailSimulation";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH0_DOMAIN}
      clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: import.meta.env.VITE_API_AUDIENCE,
        scope: "openid profile email"
      }}
    >
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/simulation/start" element={<SimulationStart />} />
          <Route path="/simulation" element={<EmailSimulation />} />
        </Routes>
      </Router>
    </Auth0Provider>
  </StrictMode>,
)