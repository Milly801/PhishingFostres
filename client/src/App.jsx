import { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { authService } from './services/authService';
import { Navigation } from './components/landing/Navigation';
import { Hero } from './components/landing/Hero';
import { Stats } from './components/landing/Stats';
import { Features } from './components/landing/Features';
import { HowItWorks } from './components/landing/HowItWorks';
import { Testimonials } from './components/landing/Testimonials';
import { CTA } from './components/landing/CTA';
import { Footer } from './components/landing/Footer';
import { AuthButtons } from './components/auth/AuthButtons';
import './App.css';
import { useNavigate } from 'react-router-dom';

function App() {
  const { isLoading, isAuthenticated, user, loginWithRedirect, getAccessTokenSilently, logout } = useAuth0();
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthentication = async () => {
      if (isAuthenticated && user) {
        try {
          const token = await getAccessTokenSilently();
          await authService.signup(token);
          console.log('Signup (or get existing user) successful');
        } catch (error) {
          setError(error.detail || error.message || 'An error occurred during authentication');
        }
      }
    };

    handleAuthentication();
  }, [isAuthenticated, user, getAccessTokenSilently]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/simulation/start', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleGetStarted = () => {
    loginWithRedirect();
  };
  const handleWatchDemo = () => {
    console.log('Watch demo clicked');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a192f] to-[#112240] text-gray-100">
      <Navigation onGetStarted={handleGetStarted} />
      <Hero onGetStarted={handleGetStarted} onWatchDemo={handleWatchDemo} />
      <Stats />
      <Features />
      <HowItWorks />
      <Testimonials />
      <CTA
        onGetStarted={handleGetStarted}
        onScheduleDemo={() => {/* Add demo scheduling functionality */ }}
      />
      <Footer />
      {isAuthenticated && (
        <div className="auth-container mt-8 text-center">
          <h2>Welcome{user && user.name ? `, ${user.name}` : ''}!</h2>
          {error && <div className="error">{error}</div>}
          <button
            className="mt-4 px-6 py-3 rounded-md bg-[#64ffda] text-[#0a192f] font-bold text-lg hover:bg-[#4cceac] transition-colors"
            onClick={() => navigate("/simulation/start")}
          >
            Start Simulation
          </button>
          <button
            className="mt-4 ml-4 px-6 py-3 rounded-md bg-red-500 text-white font-bold text-lg hover:bg-red-700 transition-colors"
            onClick={() => logout({ returnTo: window.location.origin })}
          >
            Log Out
          </button>
        </div>
      )}
    </div>
  );
}

export default App;