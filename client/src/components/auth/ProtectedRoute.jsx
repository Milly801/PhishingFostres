import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

    if (isLoading) {
        // Optionally, show a loading spinner or message
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        loginWithRedirect();
        return null; // Or a loading indicator
    }

    return children;
};

export default ProtectedRoute;
