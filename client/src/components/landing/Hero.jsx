import { Lock, ChevronRight } from "lucide-react"

export function Hero({ onGetStarted, onWatchDemo }) {
    return (
        <section className="pt-32 pb-20 md:pt-40 md:pb-28">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col md:flex-row items-center">
                    <div className="md:w-1/2 mb-10 md:mb-0">
                        <div className="inline-block px-3 py-1 mb-4 rounded-full bg-[#233554] text-[#64ffda] text-xs font-semibold">
                            CYBER SECURITY TRAINING
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                            Defend Against <span className="text-[#64ffda]">Phishing</span> Attacks
                        </h1>
                        <p className="text-lg text-gray-400 mb-8 max-w-lg">
                            PhishingFortress helps you identify and prevent phishing scams through realistic simulations and expert
                            training.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                onClick={onGetStarted}
                                className="px-6 py-3 rounded-md bg-[#64ffda] text-[#0a192f] font-medium hover:bg-[#4cceac] transition-colors"
                            >
                                Start Free Trial
                            </button>
                            <button
                                onClick={onGetStarted}
                                className="px-6 py-3 rounded-md bg-[#64ffda] text-[#0a192f] font-medium hover:bg-[#4cceac] transition-colors"
                            >
                                Watch Demo <ChevronRight className="ml-2 h-4 w-4" />
                            </button>
                        </div>
                        <div className="mt-8 flex items-center text-sm text-gray-400">
                            <Lock className="h-4 w-4 mr-2 text-[#64ffda]" />
                            <span>No credit card required. Cancel anytime.</span>
                        </div>
                    </div>
                    <div className="md:w-1/2 relative">
                        <div className="relative z-10 rounded-lg overflow-hidden shadow-2xl border border-[#233554]">
                            <img
                                src="https://placehold.co/800x600/0a192f/64ffda"
                                alt="Phishing protection dashboard"
                                className="w-full h-auto"
                            />
                            <div className="absolute inset-0 bg-gradient-to-tr from-[#0a192f]/80 to-transparent pointer-events-none"></div>
                            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#0a192f] to-transparent">
                                <div className="flex items-center">
                                    <div className="h-3 w-3 rounded-full bg-[#64ffda] mr-2 animate-pulse"></div>
                                    <span className="text-sm font-medium">Active Protection</span>
                                </div>
                            </div>
                        </div>
                        <div className="absolute -bottom-10 -right-10 h-64 w-64 rounded-full bg-[#64ffda]/10 blur-3xl -z-10"></div>
                        <div className="absolute -top-10 -left-10 h-64 w-64 rounded-full bg-[#233554]/30 blur-3xl -z-10"></div>
                    </div>
                </div>
            </div>
        </section>
    )
}