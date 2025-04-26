import { useAuth0 } from '@auth0/auth0-react';

export function AuthButtons() {
    const { isAuthenticated, user, loginWithRedirect, logout } = useAuth0();

    return (
        <div className="auth-form">
            {!isAuthenticated ? (
                <button
                    onClick={() => loginWithRedirect()}
                    className="px-6 py-3 rounded-md bg-[#64ffda] text-[#0a192f] font-medium hover:bg-[#4cceac] transition-colors"
                >
                    Log In / Sign Up
                </button>
            ) : (
                <div className="flex flex-col gap-4">
                    <h2 className="text-xl text-gray-100">Welcome, {user.email}</h2>
                    <button
                        onClick={() => logout({ returnTo: window.location.origin })}
                        className="px-6 py-3 rounded-md border border-[#64ffda] text-[#64ffda] font-medium hover:bg-[#233554] transition-colors"
                    >
                        Log Out
                    </button>
                </div>
            )}
        </div>
    );
}
