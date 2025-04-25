export function Testimonials() {
    return (
        <section id="testimonials" className="py-20">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Trusted by Security Professionals</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        See what cybersecurity experts and organizations say about PhishingFortress.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-[#112240] p-6 rounded-lg border border-[#233554]">
                        <div className="flex items-center mb-4">
                            <div className="w-12 h-12 rounded-full bg-[#233554] mr-4"></div>
                            <div>
                                <h4 className="font-bold">Sarah Johnson</h4>
                                <p className="text-sm text-gray-400">CISO at TechCorp</p>
                            </div>
                        </div>
                        <p className="text-gray-300">
                            "PhishingFortress has transformed our security awareness program. Our team is now much more vigilant
                            about identifying phishing attempts, and we've seen a 90% reduction in successful attacks."
                        </p>
                    </div>

                    <div className="bg-[#112240] p-6 rounded-lg border border-[#233554]">
                        <div className="flex items-center mb-4">
                            <div className="w-12 h-12 rounded-full bg-[#233554] mr-4"></div>
                            <div>
                                <h4 className="font-bold">Michael Chen</h4>
                                <p className="text-sm text-gray-400">IT Director at FinSecure</p>
                            </div>
                        </div>
                        <p className="text-gray-300">
                            "The realistic simulations and immediate training have made a huge difference. Our employees now report
                            suspicious emails instead of clicking on them, creating a human firewall against phishing."
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}