import { Shield, ChevronRight } from "lucide-react";
import { useAuth0 } from '@auth0/auth0-react';

export function CTA({ onGetStarted }) {
    const { loginWithRedirect } = useAuth0();
    return (
        <section className="py-20 bg-[#112240] relative overflow-hidden">
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#64ffda]/5 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#233554]/30 rounded-full blur-3xl"></div>

            <div className="container mx-auto px-4 md:px-6 relative">
                <div className="max-w-2xl mx-auto text-center transform hover:scale-105 transition-transform duration-500">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6 relative inline-block">
                        Ready to Test Your Skills?
                        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#64ffda] to-transparent opacity-50"></div>
                    </h2>

                    <p className="text-gray-400 mb-8">
                        Practice identifying phishing attempts in a safe environment.
                    </p>

                    <button
                        onClick={() => loginWithRedirect({ appState: { returnTo: "/training" } })}
                        className="group relative px-8 py-3 rounded-lg bg-[#64ffda] text-[#0a192f] font-medium overflow-hidden transform hover:-translate-y-1 transition-all duration-300 hover:shadow-[0_0_20px_rgba(100,255,218,0.3)]"
                    >
                        <span className="relative z-10 flex items-center justify-center">
                            Start Training
                            <ChevronRight className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-[#64ffda] to-[#4cceac] transform translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500"></div>
                    </button>
                </div>
            </div>
        </section>
    );
}