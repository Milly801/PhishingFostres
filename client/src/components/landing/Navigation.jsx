import { useState, useEffect } from "react";
import { Shield, Menu, X } from "lucide-react";

export function Navigation({ onGetStarted }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10)
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <div>
            <nav
                className={`fixed w-full z-50 transition-all duration-200 ${isScrolled
                    ? "py-3 border-b border-[#1e2d4a] bg-[#040911]/95 backdrop-blur-md shadow-lg shadow-[#0a192f]/50"
                    : "py-5 bg-gradient-to-b from-[#060d1a] to-transparent"
                    }`}
            >
                <div className="absolute inset-0 bg-[#64ffda]/5"></div>
                <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#64ffda]/20 to-transparent"></div>

                {/* Main content */}
                <div className="relative w-full pl-8 md:pl-16 pr-4 md:pr-6">
                    <div className="flex justify-between items-center">
                        {/* Logo section with enhanced hover effect */}
                        <div className="flex items-center flex-shrink-0 group">
                            <Shield className="h-7 w-7 text-[#64ffda] transform transition-transform group-hover:scale-110 duration-300" />
                            <span className="ml-2 text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#64ffda] to-[#4cceac] group-hover:bg-gradient-to-r group-hover:from-[#4cceac] group-hover:to-[#64ffda] transition-all duration-300">
                                PhishingFortress
                            </span>
                        </div>

                        {/* Navigation items with enhanced hover effects */}
                        <div className="hidden md:flex items-center space-x-6 ml-auto mr-4">
                            <a href="#features" className="text-sm relative group">
                                <span className="relative z-10 hover:text-[#64ffda] transition-colors duration-300">Features</span>
                                <span className="absolute inset-x-0 -bottom-1 h-[1px] bg-[#64ffda] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                            </a>
                            <a href="#how-it-works" className="text-sm relative group">
                                <span className="relative z-10 hover:text-[#64ffda] transition-colors duration-300">How It Works</span>
                                <span className="absolute inset-x-0 -bottom-1 h-[1px] bg-[#64ffda] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                            </a>
                            <a href="#testimonials" className="text-sm relative group">
                                <span className="relative z-10 hover:text-[#64ffda] transition-colors duration-300">Testimonials</span>
                                <span className="absolute inset-x-0 -bottom-1 h-[1px] bg-[#64ffda] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                            </a>
                            {/* Enhanced Get Started button */}
                            <button
                                onClick={onGetStarted}
                                className="relative px-4 py-2 rounded-md bg-[#64ffda] text-[#0a192f] font-medium overflow-hidden group"
                            >
                                <span className="relative z-10">Get Started</span>
                                <div className="absolute inset-0 bg-[#4cceac] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                            </button>
                        </div>
                    </div>
                </div>
                
                <div className="md:hidden ml-auto">
                    <button className="text-gray-100" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="md:hidden absolute top-full left-0 right-0 bg-[#112240] border-t border-[#233554] shadow-lg">
                        <div className="flex flex-col space-y-4 px-4 py-6">
                            <a
                                href="#features"
                                className="text-sm hover:text-[#64ffda] transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Features
                            </a>
                            <a
                                href="#how-it-works"
                                className="text-sm hover:text-[#64ffda] transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                How It Works
                            </a>
                            <a
                                href="#testimonials"
                                className="text-sm hover:text-[#64ffda] transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Testimonials
                            </a>
                            <button
                                onClick={onGetStarted}
                                className="px-4 py-2 rounded-md bg-[#64ffda] text-[#0a192f] font-medium hover:bg-[#4cceac] transition-colors"
                            >
                                Get Started
                            </button>
                        </div>
                    </div>
                )}
            </nav>
        </div>
    )
}