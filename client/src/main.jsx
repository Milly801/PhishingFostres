// main.jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Auth0Provider } from '@auth0/auth0-react'
import App from './App.jsx'
import './styles/globals.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from './components/auth/ProtectedRoute';
import TrainingSection from './components/training_module/TrainingSection';
import EmailSimulation from './components/simulation/EmailSimulation';
import { useNavigate } from "react-router-dom";

const onRedirectCallback = (appState) => {
  // Use the returnTo path if provided, otherwise default to "/"
  window.history.replaceState(
    {},
    document.title,
    appState?.returnTo || window.location.pathname
  );
};

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
      onRedirectCallback={onRedirectCallback}
    >
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/training" element={<ProtectedRoute><TrainingSection /></ProtectedRoute>} />
          <Route path="/simulation" element={<ProtectedRoute><EmailSimulation /></ProtectedRoute>} />
        </Routes>
      </Router>
    </Auth0Provider>
  </StrictMode>,
)