import { useAuth0 } from '@auth0/auth0-react';
import { HashLoader } from "react-spinners";

export function RootLoader({ children }) {
    const { isLoading } = useAuth0();

    if (isLoading) {
        return (
            <div className="fixed inset-0 bg-gradient-to-b from-[#0a192f] to-[#112240] flex items-center justify-center flex-col z-50">
                <HashLoader color="#64ffda" size={50} />
                <p className="text-[#64ffda] mt-4 font-mono">Securing Connection...</p>
            </div>
        );
    }

    return children;
}
