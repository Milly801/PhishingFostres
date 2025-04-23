// App.jsx
import { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { authService } from './services/authService';
import './App.css';

function App() {
  const { isLoading, isAuthenticated, user, loginWithRedirect, logout, getAccessTokenSilently } = useAuth0();
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleAuthentication = async () => {
      if (isAuthenticated && user) {
        try {
          const token = await getAccessTokenSilently();
          try {
            await authService.login(token);
            // If login succeeds, user exists
            console.log('Login successful');
          } catch (loginError) {
            if (loginError.status === 404) {
              await authService.signup(token);
              console.log('Signup successful');
            } else {
              throw loginError;
            }
          }
        } catch (error) {
          setError(error.detail || 'An error occurred during authentication');
        }
      }
    };

    handleAuthentication();
  }, [isAuthenticated, user, getAccessTokenSilently]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="app">
      <div className="auth-container">
        <h1>PhishingFortress</h1>
        {error && <div className="error">{error}</div>}

        {!isAuthenticated ? (
          <div className="auth-form">
            <button onClick={() => loginWithRedirect()}>Log In / Sign Up</button>
          </div>
        ) : (
          <div className="auth-form">
            <h2>Welcome, {user.email}</h2>
            <button onClick={() => logout({ returnTo: window.location.origin })}>
              Log Out
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;