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
        <div className="min-h-screen bg-gradient-to-b from-[#0a192f] to-[#112240] text-gray-100">
            {/* Navigation */}
            <nav
                className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? "bg-[#0a192f]/90 backdrop-blur-sm py-3 shadow-lg" : "py-5"}`}
            >
                <div className="container mx-auto px-4 md:px-6">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center">
                            <Shield className="h-8 w-8 text-[#64ffda]" />
                            <span className="ml-2 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#64ffda] to-[#4cceac]">
                                PhishingFortress
                            </span>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center space-x-8">
                            <a href="#features" className="text-sm hover:text-[#64ffda] transition-colors">
                                Features
                            </a>
                            <a href="#how-it-works" className="text-sm hover:text-[#64ffda] transition-colors">
                                How It Works
                            </a>
                            <a href="#testimonials" className="text-sm hover:text-[#64ffda] transition-colors">
                                Testimonials
                            </a>
                            <button
                                onClick={onGetStarted}
                                className="px-4 py-2 rounded-md bg-[#64ffda] text-[#0a192f] font-medium hover:bg-[#4cceac] transition-colors"
                            >
                                Get Started
                            </button>
                        </div>

                        {/* Mobile Menu Button */}
                        <button className="md:hidden text-gray-100" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
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