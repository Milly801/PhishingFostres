import '../../styles/globals.css';

export function WhyChooseUs() {
    return (
        <section id="why-choose-us" className="py-20">

            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-16 animate-float">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                        Why Choose PhishingFortress
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Learn to protect yourself through hands-on experience
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Card 1 */}
                    <div className="group bg-[#112240] p-6 rounded-lg border border-[#233554] hover:border-[#64ffda]
                                transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-[0_0_20px_rgba(100,255,218,0.3)]">
                        <div className="mb-4 flex items-center">
                            <div className="w-12 h-12 rounded-lg bg-[#233554] flex items-center justify-center
                                        group-hover:bg-[#64ffda]/20 transition-colors duration-500 animate-glow">
                                <svg className="h-6 w-6 text-[#64ffda] group-hover:animate-spin-slow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h4 className="font-bold text-[#64ffda] ml-4 transform group-hover:translate-x-2 transition-transform duration-300">
                                Interactive Learning
                            </h4>
                        </div>
                        <p className="text-gray-300 transform opacity-90 group-hover:opacity-100 transition-all duration-300">
                            Practice with real-world examples in a safe environment. Learn to identify phishing attempts through hands-on experience.
                        </p>
                    </div>

                    {/* Card 2 - Delayed animation */}
                    <div className="group bg-[#112240] p-6 rounded-lg border border-[#233554] hover:border-[#64ffda]
                                transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-[0_0_20px_rgba(100,255,218,0.3)]"
                        style={{ animationDelay: '0.2s' }}>
                        <div className="mb-4 flex items-center">
                            <div className="w-12 h-12 rounded-lg bg-[#233554] flex items-center justify-center
                                        group-hover:bg-[#64ffda]/20 transition-colors duration-500 animate-glow">
                                <svg className="h-6 w-6 text-[#64ffda] transform group-hover:rotate-180 transition-transform duration-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                </svg>
                            </div>
                            <h4 className="font-bold text-[#64ffda] ml-4 transform group-hover:translate-x-2 transition-transform duration-300">
                                Clear Identification
                            </h4>
                        </div>
                        <p className="text-gray-300 transform opacity-90 group-hover:opacity-100 transition-all duration-300">
                            Get instant explanations about what makes an email suspicious. Build your skills with each example.
                        </p>
                    </div>

                    {/* Card 3 - More delayed animation */}
                    <div className="group bg-[#112240] p-6 rounded-lg border border-[#233554] hover:border-[#64ffda]
                                transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-[0_0_20px_rgba(100,255,218,0.3)]"
                        style={{ animationDelay: '0.4s' }}>
                        <div className="mb-4 flex items-center">
                            <div className="w-12 h-12 rounded-lg bg-[#233554] flex items-center justify-center
                                        group-hover:bg-[#64ffda]/20 transition-colors duration-500 animate-glow">
                                <svg className="h-6 w-6 text-[#64ffda] group-hover:scale-110 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            </div>
                            <h4 className="font-bold text-[#64ffda] ml-4 transform group-hover:translate-x-2 transition-transform duration-300">
                                Safe Environment
                            </h4>
                        </div>
                        <p className="text-gray-300 transform opacity-90 group-hover:opacity-100 transition-all duration-300">
                            Practice in a risk-free space where mistakes become learning opportunities.
                        </p>
                    </div>

                    {/* Card 4 - Most delayed animation */}
                    <div className="group bg-[#112240] p-6 rounded-lg border border-[#233554] hover:border-[#64ffda]
                                transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-[0_0_20px_rgba(100,255,218,0.3)]"
                        style={{ animationDelay: '0.6s' }}>
                        <div className="mb-4 flex items-center">
                            <div className="w-12 h-12 rounded-lg bg-[#233554] flex items-center justify-center
                                        group-hover:bg-[#64ffda]/20 transition-colors duration-500 animate-glow">
                                <svg className="h-6 w-6 text-[#64ffda] group-hover:scale-110 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                </svg>
                            </div>
                            <h4 className="font-bold text-[#64ffda] ml-4 transform group-hover:translate-x-2 transition-transform duration-300">
                                Skill Development
                            </h4>
                        </div>
                        <p className="text-gray-300 transform opacity-90 group-hover:opacity-100 transition-all duration-300">
                            Build lasting cybersecurity awareness through practical training.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}