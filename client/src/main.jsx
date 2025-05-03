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
import SimulationStart from './components/simulation/SimulationStart';
import { Auth0ProviderWithHistory } from './components/auth/Auth0ProviderWithHistory';
import { RootLoader } from './rootLoader';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Auth0ProviderWithHistory>
        <RootLoader>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/training" element={<ProtectedRoute><TrainingSection /></ProtectedRoute>} />
            <Route path="/simulation/start" element={<ProtectedRoute><SimulationStart /></ProtectedRoute>} />
            <Route path="/simulation" element={<ProtectedRoute><EmailSimulation /></ProtectedRoute>} />
          </Routes>
        </RootLoader>
      </Auth0ProviderWithHistory>
    </Router>
  </StrictMode>,
)