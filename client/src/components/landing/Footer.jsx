import { Shield, Github, Mail } from "lucide-react"

export function Footer() {
    return (
        <footer className="py-12 bg-[#0a192f] border-t border-[#233554] relative overflow-hidden">
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#64ffda]/5 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#233554]/30 rounded-full blur-3xl"></div>

            <div className="container mx-auto px-4 md:px-6 relative">
                <div className="flex flex-col md:flex-row justify-between items-start gap-12">
                    <div className="space-y-8">
                        {/* Logo */}
                        <div className="inline-flex items-center group hover:-translate-y-1 transition-transform duration-300">
                            <div className="relative">
                                <Shield className="h-8 w-8 text-[#64ffda] transform group-hover:rotate-12 transition-transform duration-300" />
                                <div className="absolute inset-0 bg-[#64ffda]/20 rounded-full scale-0 group-hover:scale-150 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                            </div>
                            <span className="ml-2 text-xl font-bold bg-gradient-to-r from-[#64ffda] to-[#4cceac] bg-clip-text text-transparent">
                                PhishFortress
                            </span>
                        </div>

                        {/* Description */}
                        <p className="text-gray-400 max-w-md leading-relaxed">
                            Empowering users to identify and protect themselves from phishing attempts through interactive and practical training.
                        </p>


                        <div className="flex items-center space-x-4">
                            <a
                                href="https://github.com/Milly801/PhishingFostres"
                                className="group flex items-center space-x-2 text-gray-400 hover:text-[#64ffda] transition-all duration-300"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <div className="relative p-2">
                                    <Github className="h-5 w-5" />
                                    <span className="absolute inset-0 rounded-lg border-2 border-[#64ffda]/0 group-hover:border-[#64ffda]/50 transition-all duration-300"></span>
                                </div>
                                <span className="text-sm group-hover:translate-x-1 transition-transform duration-300">GitHub</span>
                            </a>
                            <span className="text-gray-600">•</span>
                            <a
                                href="mailto:gcwalisilematse186@gmail.com"
                                className="group flex items-center space-x-2 text-gray-400 hover:text-[#64ffda] transition-all duration-300"
                            >
                                <div className="relative p-2">
                                    <Mail className="h-5 w-5" />
                                    <span className="absolute inset-0 rounded-lg border-2 border-[#64ffda]/0 group-hover:border-[#64ffda]/50 transition-all duration-300"></span>
                                </div>
                                <span className="text-sm group-hover:translate-x-1 transition-transform duration-300">Contact</span>
                            </a>
                        </div>
                    </div>

                    {/* Right Section - Quick Links */}
                    <div className="flex flex-col space-y-2">
                        {["Features", "How It Works", "Why Choose Us"].map((label) => (
                            <a
                                key={label}
                                href={`#${label.toLowerCase().replace(/\s+/g, '-')}`}
                                className="group text-gray-400 hover:text-[#64ffda] transition-colors duration-300 w-fit"
                            >
                                <span className="relative">
                                    {label}
                                    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#64ffda] transition-all duration-300 group-hover:w-full"></span>
                                </span>
                            </a>
                        ))}
                    </div>
                </div>

                {/* Bottom Copyright - Full Width */}
                <div className="mt-12 pt-8 border-t border-[#233554]">
                    <p className="text-sm text-center text-gray-400 group cursor-default">
                        <span className="relative inline-block px-4 py-2">
                            © {new Date().getFullYear()} PhishFortress. Built for educational purposes.
                            <span className="absolute inset-0 rounded-lg border border-[#64ffda]/0 group-hover:border-[#64ffda]/20 transition-all duration-300"></span>
                        </span>
                    </p>
                </div>
            </div>
        </footer>
    );
}
