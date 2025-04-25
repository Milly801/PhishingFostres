export function CTA({ onGetStarted, onScheduleDemo }) {
    return (
        <section className="py-20 bg-[#112240]">
            <div className="container mx-auto px-4 md:px-6">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Strengthen Your Defenses?</h2>
                    <p className="text-gray-400 mb-8">
                        Join thousands of organizations that trust PhishingFortress to protect against the most common attack
                        vector.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={onGetStarted}
                            className="px-8 py-3 rounded-md bg-[#64ffda] text-[#0a192f] font-medium hover:bg-[#4cceac] transition-colors"
                        >
                            Start Free Trial
                        </button>
                        <button
                            onClick={onScheduleDemo}
                            className="px-8 py-3 rounded-md border border-[#64ffda] text-[#64ffda] font-medium hover:bg-[#233554] transition-colors"
                        >
                            Schedule Demo
                        </button>
                    </div>
                    <p className="mt-6 text-sm text-gray-400">No credit card required. 14-day free trial.</p>
                </div>
            </div>
        </section>
    );
}