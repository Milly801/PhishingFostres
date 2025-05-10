export function HowItWorks() {
    return (
        <section id="how-it-works" className="py-20 bg-[#0a192f]">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">How PhishFortress Works</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Master the art of identifying and preventing phishing attacks through our interactive training platform.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    <div className="relative">
                        <div className="bg-[#112240] p-6 rounded-lg border border-[#233554] h-full">
                            <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-[#64ffda] text-[#0a192f] flex items-center justify-center font-bold text-lg">
                                1
                            </div>
                            <h3 className="text-xl font-bold mb-3 mt-4">Learn</h3>
                            <p className="text-gray-400">
                                Access comprehensive training modules that teach you how to identify common phishing tactics and protect your digital security.
                            </p>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="bg-[#112240] p-6 rounded-lg border border-[#233554] h-full">
                            <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-[#64ffda] text-[#0a192f] flex items-center justify-center font-bold text-lg">
                                2
                            </div>
                            <h3 className="text-xl font-bold mb-3 mt-4">Practice</h3>
                            <p className="text-gray-400">
                                Test your knowledge through realistic phishing simulations that mimic real-world scenarios you might encounter.
                            </p>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="bg-[#112240] p-6 rounded-lg border border-[#233554] h-full">
                            <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-[#64ffda] text-[#0a192f] flex items-center justify-center font-bold text-lg">
                                3
                            </div>
                            <h3 className="text-xl font-bold mb-3 mt-4">Track Progress</h3>
                            <p className="text-gray-400">
                                Monitor your improvement over time and identify areas where you need additional training to enhance your security awareness.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}