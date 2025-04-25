export function Stats() {
    return (
        <section className="py-12 bg-[#112240]/50">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    <div className="text-center">
                        <div className="text-3xl md:text-4xl font-bold text-[#64ffda]">94%</div>
                        <p className="text-sm text-gray-400 mt-2">of breaches start with phishing</p>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl md:text-4xl font-bold text-[#64ffda]">10x</div>
                        <p className="text-sm text-gray-400 mt-2">reduction in successful attacks</p>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl md:text-4xl font-bold text-[#64ffda]">5000+</div>
                        <p className="text-sm text-gray-400 mt-2">organizations protected</p>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl md:text-4xl font-bold text-[#64ffda]">1M+</div>
                        <p className="text-sm text-gray-400 mt-2">phishing attempts blocked</p>
                    </div>
                </div>
            </div>
</section>
    )
}