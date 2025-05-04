import { useAuth0 } from '@auth0/auth0-react';
import { LogOut, User, ChevronDown } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export function UserInfoBar() {
    const { user, logout } = useAuth0();
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

    const toggleUserMenu = () => setIsUserMenuOpen((open) => !open);

    return (
        <div className="flex justify-end relative">
            <button
                onClick={toggleUserMenu}
                className="group flex items-center space-x-2 bg-[#233554]/50 hover:bg-[#233554] transition-all duration-300 rounded-full pr-3 pl-1 py-1 border border-[#233554] hover:border-[#64ffda]/50"
            >
                {user?.picture ? (
                    <img
                        src={user.picture}
                        alt={user.email}
                        className="h-8 w-8 rounded-full ring-2 ring-[#64ffda]/30 group-hover:ring-[#64ffda]/70 transition-all duration-300"
                    />
                ) : (
                    <div className="h-8 w-8 rounded-full bg-[#64ffda]/10 flex items-center justify-center">
                        <User className="h-4 w-4 text-[#64ffda]" />
                    </div>
                )}
                <span className="text-sm text-gray-300 group-hover:text-[#64ffda] transition-colors duration-300">
                    {user?.nickname || user?.email?.split('@')[0]}
                </span>
                <ChevronDown
                    className={`h-4 w-4 text-[#64ffda] transition-transform duration-300 ${isUserMenuOpen ? 'rotate-180' : 'rotate-0'
                        }`}
                />
            </button>

            <AnimatePresence>
                {isUserMenuOpen && (
                    <>
                        <div
                            className="fixed inset-0 z-10 bg-black/10 backdrop-blur-sm"
                            onClick={() => setIsUserMenuOpen(false)}
                        />
                        <motion.div
                            initial={{ opacity: 0, y: -20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -20, scale: 0.95 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            className="absolute right-0 top-full mt-2 w-56 rounded-lg bg-[#112240] border border-[#233554] shadow-lg shadow-black/50 z-20 overflow-hidden"
                        >
                            {/* User info section */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.1 }}
                                className="px-4 py-3 border-b border-[#233554] bg-[#0a192f]/50"
                            >
                                <p className="text-sm font-medium text-gray-200 truncate">
                                    {user?.nickname || user?.email?.split('@')[0]}
                                </p>
                                <p className="text-[10px] text-gray-400 truncate">
                                    {user?.email}
                                </p>
                            </motion.div>
                            {/* Logout button */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.15 }}
                                className="p-2"
                            >
                                <button
                                    onClick={() => logout({ returnTo: window.location.origin })}
                                    className="w-full flex items-center space-x-2 px-3 py-2 text-xs text-gray-300 hover:text-[#64ffda] hover:bg-[#233554]/50 rounded-md transition-all duration-300 group"
                                >
                                    <LogOut className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
                                    <span className="transition-transform duration-300 group-hover:translate-x-0.5">Sign out</span>
                                </button>
                            </motion.div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
