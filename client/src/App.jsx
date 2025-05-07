import { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { authService } from './services/authService';
import { Navigation } from './components/landing/Navigation';
import { Hero } from './components/landing/Hero';
import { Stats } from './components/landing/Stats';
import { Features } from './components/landing/Features';
import { HowItWorks } from './components/landing/HowItWorks';
import { WhyChooseUs } from './components/landing/WhyChooseUs';
import { CTA } from './components/landing/CTA';
import { Footer } from './components/landing/Footer';
import './App.css';
import { useNavigate } from 'react-router-dom';
import { HashLoader } from "react-spinners";

function App() {
  const { isLoading, isAuthenticated, user, loginWithRedirect, getAccessTokenSilently, logout } = useAuth0();
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthentication = async () => {
      if (isAuthenticated && user) {
        const isSignUp = localStorage.getItem('isSignUp') === 'true';
        const isNewSignup = window.location.search.includes('screen_hint=signup');

        // Only call signup if both conditions are met
        if (isSignUp && isNewSignup) {
          try {
            const token = await getAccessTokenSilently();
            await authService.signup(token);
            console.log('Signup successful');
          } catch (error) {
            setError(error.detail || error.message || 'An error occurred during authentication');
          } finally {
            localStorage.removeItem('isSignUp');
          }
        } else {
          // This is a regular login, no need to call signup
          console.log('Regular login successful');
        }
      }
    };

    handleAuthentication();
  }, [isAuthenticated, user, getAccessTokenSilently]);


  const handleGetStarted = () => {
    if (window.location.pathname === '/signup' || window.location.search.includes('screen_hint=signup')) {
      localStorage.setItem('isSignUp', 'true');
    }
    loginWithRedirect({ screen_hint: 'signup' });
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
      <WhyChooseUs />
      <CTA
        onGetStarted={handleGetStarted}
      />
      <Footer />
    </div>
  );
}

export default App;