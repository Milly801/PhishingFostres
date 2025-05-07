import { AlertTriangle, BookOpen, Shield, GraduationCap } from "lucide-react"

export function Features() {
    return (
        <section id="features" className="py-20 relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#64ffda]/5 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#233554]/30 rounded-full blur-3xl"></div>

            <div className="container mx-auto px-4 md:px-6 relative">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Master Phishing Detection Through Learning
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Start with comprehensive training modules before testing your skills in our realistic simulation environment.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {/* Training Module Card - Now First and Highlighted */}
                    <div className="bg-[#112240] p-6 rounded-lg border-2 border-[#64ffda]/30 hover:border-[#64ffda] transition-all duration-300 group transform hover:-translate-y-2 hover:shadow-[0_0_20px_rgba(100,255,218,0.3)] relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#64ffda]/5 rounded-full blur-2xl transform translate-x-16 -translate-y-16"></div>
                        <div className="relative z-10">
                            <div className="w-12 h-12 rounded-lg bg-[#233554] flex items-center justify-center mb-4 group-hover:bg-[#64ffda]/20 transition-colors">
                                <GraduationCap className="h-6 w-6 text-[#64ffda]" />
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-[#64ffda]">Comprehensive Training</h3>
                            <p className="text-gray-400">
                                Start with our structured learning modules designed to build your phishing detection skills from the ground up.
                            </p>
                        </div>
                    </div>

                    <div className="bg-[#112240] p-6 rounded-lg border border-[#233554] hover:border-[#64ffda] transition-all duration-300 group transform hover:-translate-y-2">
                        <div className="w-12 h-12 rounded-lg bg-[#233554] flex items-center justify-center mb-4 group-hover:bg-[#64ffda]/20 transition-colors">
                            <BookOpen className="h-6 w-6 text-[#64ffda]" />
                        </div>
                        <h3 className="text-xl font-bold mb-3">Interactive Learning</h3>
                        <p className="text-gray-400">
                            Engage with practical examples and real-world scenarios to understand the psychology behind phishing attacks.
                        </p>
                    </div>

                    <div className="bg-[#112240] p-6 rounded-lg border border-[#233554] hover:border-[#64ffda] transition-all duration-300 group transform hover:-translate-y-2">
                        <div className="w-12 h-12 rounded-lg bg-[#233554] flex items-center justify-center mb-4 group-hover:bg-[#64ffda]/20 transition-colors">
                            <AlertTriangle className="h-6 w-6 text-[#64ffda]" />
                        </div>
                        <h3 className="text-xl font-bold mb-3">Practice Simulations</h3>
                        <p className="text-gray-400">
                            Apply your knowledge in our safe simulation environment, testing your skills against realistic phishing scenarios.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}