import { Lock, ChevronRight, BookOpen, Shield } from "lucide-react"
import protection from "../../assets/protection.jpg"
import '../../styles/globals.css';
import { useAuth0 } from '@auth0/auth0-react';

export function Hero({ onGetStarted, onLearnMore }) {
    const { loginWithRedirect } = useAuth0();

    return (
        <section className="pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col md:flex-row items-center">
                    <div className="md:w-1/2 mb-10 md:mb-0 text-left animate-fade-in-up">
                        <div className="inline-block px-3 py-1 mb-4 rounded-full bg-[#233554] text-[#64ffda] text-xs font-semibold
                                    transform hover:scale-105 transition-transform duration-300 cursor-default">
                            PHISHING AWARENESS TRAINING
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-left">
                            Learn to Spot{' '}
                            <span className="text-[#64ffda] relative inline-block group">
                                Phishing
                                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#64ffda] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                            </span>
                            {' '}Threats
                        </h1>
                        <p className="text-lg text-gray-400 mb-8 max-w-lg text-left transform hover:translate-x-2 transition-transform duration-300">
                            Begin your journey to mastering phishing awareness. Our interactive modules will teach you how to recognize, avoid, and respond to phishing threats in real-world scenarios. Build your skills step by step—then, when you're ready, put your knowledge to the test in our simulation challenge!
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-start">
                            <button
                                onClick={() => loginWithRedirect({ appState: { returnTo: "/training" } })}
                                className="px-8 py-3 rounded-md bg-[#64ffda] text-[#0a192f] font-medium hover:bg-[#4cceac] transition-colors"
                            >
                                Start Training
                            </button>

                            <button
                                onClick={() => {
                                    const section = document.getElementById('how-it-works');
                                    if (section) section.scrollIntoView({ behavior: 'smooth' });
                                }}
                                className="group px-6 py-3 rounded-md border-2 border-[#64ffda] text-[#64ffda] font-medium
                                         hover:bg-[#64ffda]/10 transition-all duration-300 transform hover:-translate-y-1
                                         flex items-center justify-center"
                            >
                                <BookOpen className="w-4 h-4 mr-2" />
                                Learn More
                                <ChevronRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                            </button>
                        </div>

                        <div className="mt-8 flex items-center text-sm text-gray-400 group hover:text-gray-300 transition-colors duration-300">
                            <div className="relative">
                                <Lock className="h-4 w-4 mr-2 text-[#64ffda] transform group-hover:rotate-12 transition-transform duration-300" />
                                <div className="absolute inset-0 bg-[#64ffda]/20 rounded-full scale-0 group-hover:scale-150 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                            </div>
                            <span>Safe practice environment. Just sign up.</span>
                        </div>
                    </div>

                    <div className="md:w-1/2 relative animate-fade-in-left">
                        <div className="relative z-10 rounded-lg overflow-hidden shadow-2xl border border-[#233554] max-w-lg mx-auto
                                    transform hover:scale-105 hover:rotate-1 transition-all duration-500
                                    hover:shadow-[0_0_30px_rgba(100,255,218,0.2)]">
                            <img
                                src={protection}
                                alt="Phishing protection dashboard"
                                className="w-full h-auto transform transition-transform duration-700 hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-tr from-[#0a192f]/80 to-transparent pointer-events-none"></div>

                            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#0a192f] to-transparent
                                        transform translate-y-full hover:translate-y-0 transition-transform duration-300">
                                <div className="flex items-center">
                                    <div className="h-3 w-3 rounded-full bg-[#64ffda] mr-2 animate-pulse"></div>
                                    <span className="text-sm font-medium">Interactive Training Environment</span>
                                </div>
                            </div>
                        </div>

                        <div className="absolute -bottom-10 -right-10 h-64 w-64 rounded-full bg-[#64ffda]/10 blur-3xl -z-10 animate-pulse"></div>
                        <div className="absolute -top-10 -left-10 h-64 w-64 rounded-full bg-[#233554]/30 blur-3xl -z-10 animate-pulse"></div>
                    </div>
                </div>
            </div>
        </section>
    )
}