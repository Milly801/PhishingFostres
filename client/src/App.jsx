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
  const { isLoading, isAuthenticated, user, loginWithRedirect, logout, getAccessTokenSilently } = useAuth0();
  const [error, setError] = useState(null);
  const [redirecting, setRedirecting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthCallback = window.location.search.includes('code=') && window.location.search.includes('state=');

    const handleAuthentication = async () => {
      if (isAuthenticated && user && isAuthCallback) {
        try {
          const token = await getAccessTokenSilently();
          try {
            await authService.login(token);
            console.log('Login successful');
          } catch (loginError) {
            if (loginError.status === 404) {
              await authService.signup(token);
              console.log('Signup successful');
            } else {
              throw loginError;
            }
          }
          setRedirecting(true);
          navigate('/simulation/start', { replace: true });
        } catch (error) {
          setError(error.detail || 'An error occurred during authentication');
        }
      }
    };

    handleAuthentication();
  }, [isAuthenticated, user, getAccessTokenSilently, navigate]);

  if (isLoading || redirecting) {
    return <div>Loading...</div>;
  }

  const handleGetStarted = () => {
    loginWithRedirect();
  };
  const handleWatchDemo = () => {
    // Add demo functionality here
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
        onGetStarted={() => loginWithRedirect()}
        onScheduleDemo={() => {/* Add demo scheduling functionality */ }}
      />
      <Footer />
      {isAuthenticated && (
        <div className="auth-container mt-8 text-center">
          <h2>Welcome{user && user.name ? `, ${user.name}` : ''}!</h2>
          {error && <div className="error">{error}</div>}
        </div>
      )}
    </div>
  );
}

export default App;