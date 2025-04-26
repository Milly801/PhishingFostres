import { AlertTriangle, BookOpen, Shield } from "lucide-react"

export function Features() {
    return (
        <section id="features" className="py-20">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Comprehensive Protection Features</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Our platform offers everything you need to identify, prevent, and respond to phishing threats.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    <div className="bg-[#112240] p-6 rounded-lg border border-[#233554] hover:border-[#64ffda] transition-colors group">
                        <div className="w-12 h-12 rounded-lg bg-[#233554] flex items-center justify-center mb-4 group-hover:bg-[#64ffda]/20 transition-colors">
                            <AlertTriangle className="h-6 w-6 text-[#64ffda]" />
                        </div>
                        <h3 className="text-xl font-bold mb-3">Realistic Phishing Simulations</h3>
                        <p className="text-gray-400">
                            Experience true-to-life phishing scenarios based on the latest attack techniques used by cybercriminals.
                        </p>
                    </div>

                    <div className="bg-[#112240] p-6 rounded-lg border border-[#233554] hover:border-[#64ffda] transition-colors group">
                        <div className="w-12 h-12 rounded-lg bg-[#233554] flex items-center justify-center mb-4 group-hover:bg-[#64ffda]/20 transition-colors">
                            <BookOpen className="h-6 w-6 text-[#64ffda]" />
                        </div>
                        <h3 className="text-xl font-bold mb-3">Interactive Training Modules</h3>
                        <p className="text-gray-400">
                            Learn to identify and respond to phishing attempts through engaging, interactive training content.
                        </p>
                    </div>

                    <div className="bg-[#112240] p-6 rounded-lg border border-[#233554] hover:border-[#64ffda] transition-colors group">
                        <div className="w-12 h-12 rounded-lg bg-[#233554] flex items-center justify-center mb-4 group-hover:bg-[#64ffda]/20 transition-colors">
                            <Shield className="h-6 w-6 text-[#64ffda]" />
                        </div>
                        <h3 className="text-xl font-bold mb-3">Real-time Threat Detection</h3>
                        <p className="text-gray-400">
                            Our AI-powered system continuously monitors for suspicious emails and provides instant alerts.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}