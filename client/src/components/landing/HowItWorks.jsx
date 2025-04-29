export function HowItWorks() {
    return (
        <section id="how-it-works" className="py-20 bg-[#0a192f]">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">How PhishFortress Works</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Our three-step approach ensures comprehensive protection against phishing threats.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    <div className="relative">
                        <div className="bg-[#112240] p-6 rounded-lg border border-[#233554] h-full">
                            <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-[#64ffda] text-[#0a192f] flex items-center justify-center font-bold text-lg">
                                1
                            </div>
                            <h3 className="text-xl font-bold mb-3 mt-4">Simulate</h3>
                            <p className="text-gray-400">
                                We create realistic phishing scenarios tailored to your organization's specific threats and
                                vulnerabilities.
                            </p>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="bg-[#112240] p-6 rounded-lg border border-[#233554] h-full">
                            <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-[#64ffda] text-[#0a192f] flex items-center justify-center font-bold text-lg">
                                2
                            </div>
                            <h3 className="text-xl font-bold mb-3 mt-4">Train</h3>
                            <p className="text-gray-400">
                                Users who fall for simulations receive immediate, targeted training to improve their awareness and
                                response.
                            </p>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="bg-[#112240] p-6 rounded-lg border border-[#233554] h-full">
                            <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-[#64ffda] text-[#0a192f] flex items-center justify-center font-bold text-lg">
                                3
                            </div>
                            <h3 className="text-xl font-bold mb-3 mt-4">Learn & Improve</h3>
                            <p className="text-gray-400">
                                Get instant feedback on your decisions and learn how to better identify phishing attempts through practical examples and explanations.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}