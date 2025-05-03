import { useAuth0 } from '@auth0/auth0-react';
import { LogOut, User } from "lucide-react";

export function UserInfoBar() {
    const { user, logout } = useAuth0();

    return (
        <div className="flex items-center space-x-4 bg-[#112240] rounded-lg px-4 py-2 border border-[#233554] shadow-sm">
            {user?.picture ? (
                <img src={user.picture} alt={user.email} className="h-8 w-8 rounded-full ring-2 ring-[#64ffda]/30" />
            ) : (
                <div className="h-8 w-8 rounded-full bg-[#64ffda]/10 flex items-center justify-center">
                    <User className="h-4 w-4 text-[#64ffda]" />
                </div>
            )}
            <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-200">{user?.nickname || user?.email?.split('@')[0]}</span>
                <span className="text-xs text-gray-400">{user?.email}</span>
            </div>
            <button
                onClick={() => logout({ returnTo: window.location.origin })}
                className="ml-4 flex items-center space-x-1 px-3 py-1 rounded-md bg-red-500 text-white text-xs hover:bg-red-700 transition"
            >
                <LogOut className="h-4 w-4" />
                <span>Sign out</span>
            </button>
        </div>
    );
}
