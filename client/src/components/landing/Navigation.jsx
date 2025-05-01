import { useState, useEffect } from "react";
import { Shield, Menu, X, BookOpen, Lightbulb, Award } from "lucide-react";

export function Navigation({ onGetStarted }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)
    const [activeSection, setActiveSection] = useState("")

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10)

            // Update active section based on scroll position
            const sections = ["features", "how-it-works", "why-choose-us"]
            const current = sections.find(section => {
                const element = document.getElementById(section)
                if (element) {
                    const rect = element.getBoundingClientRect()
                    return rect.top <= 100 && rect.bottom >= 100
                }
                return false
            })
            setActiveSection(current || "")
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <div>
            <nav
                className={`fixed w-full z-50 transition-all duration-500 ${isScrolled
                    ? "py-3 border-b border-[#1e2d4a] bg-[#040911]/95 backdrop-blur-md shadow-lg shadow-[#0a192f]/50"
                    : "py-5 bg-gradient-to-b from-[#060d1a] to-transparent"
                    }`}
            >
                {/* Animated gradient border */}
                <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#64ffda]/20 to-transparent"></div>

                {/* Glassmorphism background */}
                <div className="absolute inset-0 bg-[#64ffda]/5 backdrop-blur-sm"></div>

                {/* Main content */}
                <div className="relative w-full px-8 md:px-16 max-w-7xl mx-auto">
                    <div className="flex justify-between items-center">
                        {/* Animated Logo */}
                        <div className="flex items-center flex-shrink-0 group cursor-pointer">
                            <div className="relative">
                                <Shield className="h-7 w-7 text-[#64ffda] transform transition-all duration-300 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-[#64ffda]/20 rounded-full scale-0 group-hover:scale-150 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                            </div>
                            <span className="ml-2 text-lg font-bold relative overflow-hidden">
                                <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-[#64ffda] to-[#4cceac]">
                                    PhishFortress
                                </span>
                                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#64ffda] to-[#4cceac] transform translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300"></span>
                            </span>
                        </div>

                        {/* Navigation Items */}
                        <div className="hidden md:flex items-center space-x-8 ml-auto mr-4">
                            {[
                                { href: "#features", label: "Features", icon: Lightbulb },
                                { href: "#how-it-works", label: "How It Works", icon: BookOpen },
                                { href: "#why-choose-us", label: "Why Choose Us", icon: Award },
                            ].map(({ href, label, icon: Icon }) => (
                                <a
                                    key={href}
                                    href={href}
                                    className={`text-sm relative group flex items-center space-x-2 py-2 px-3 rounded-lg transition-all duration-300 ${activeSection === href.slice(1)
                                        ? "text-[#64ffda] bg-[#64ffda]/10"
                                        : "hover:text-[#64ffda] hover:bg-[#64ffda]/5"
                                        }`}
                                >
                                    <Icon className="h-4 w-4 transform group-hover:rotate-12 transition-transform duration-300" />
                                    <span>{label}</span>
                                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#64ffda] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                                </a>
                            ))}

                            {/* Enhanced Get Started Button */}
                            <button
                                onClick={onGetStarted}
                                className="relative px-6 py-2 rounded-lg bg-[#64ffda] text-[#0a192f] font-medium overflow-hidden group hover:shadow-[0_0_20px_rgba(100,255,218,0.3)] transition-all duration-300"
                            >
                                <span className="relative z-10 flex items-center">
                                    Start Training
                                    <Shield className="ml-2 h-4 w-4 transform group-hover:rotate-12 transition-transform duration-300" />
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-[#64ffda] to-[#4cceac] transform translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500"></div>
                            </button>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            className="md:hidden relative group p-2"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            <div className="relative">
                                {isMenuOpen ? (
                                    <X className="h-6 w-6 text-[#64ffda] transform rotate-0 hover:rotate-180 transition-all duration-300" />
                                ) : (
                                    <Menu className="h-6 w-6 text-[#64ffda] transform rotate-0 hover:rotate-180 transition-all duration-300" />
                                )}
                                <div className="absolute inset-0 bg-[#64ffda]/20 rounded-full scale-0 group-hover:scale-150 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                            </div>
                        </button>
                    </div>
                </div>

                {/* Enhanced Mobile Navigation */}
                <div
                    className={`md:hidden absolute top-full left-0 right-0 bg-[#112240]/95 backdrop-blur-md border-t border-[#233554] shadow-lg transform transition-all duration-300 ${isMenuOpen ? "translate-y-0 opacity-100" : "translate-y-[-10px] opacity-0 pointer-events-none"
                        }`}
                >
                    <div className="flex flex-col space-y-4 px-6 py-6">
                        {[
                            { href: "#features", label: "Features", icon: Lightbulb },
                            { href: "#how-it-works", label: "How It Works", icon: BookOpen },
                            { href: "#why-choose-us", label: "Why Choose Us", icon: Award },
                        ].map(({ href, label, icon: Icon }) => (
                            <a
                                key={href}
                                href={href}
                                className="flex items-center space-x-3 text-sm hover:text-[#64ffda] transition-all duration-300 group"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <Icon className="h-4 w-4 transform group-hover:rotate-12 transition-transform duration-300" />
                                <span>{label}</span>
                            </a>
                        ))}
                        <button
                            onClick={() => {
                                onGetStarted();
                                setIsMenuOpen(false);
                            }}
                            className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-[#64ffda] text-[#0a192f] font-medium hover:bg-[#4cceac] transition-all duration-300"
                        >
                            <span>Start Training</span>
                            <Shield className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </nav>
        </div>
    )
}