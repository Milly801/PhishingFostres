export function Stats() {
    return (
        <section className="py-12 bg-[#112240]/50">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    <div className="text-center group transform hover:-translate-y-2 transition-all duration-300">
                        <div className="text-3xl md:text-4xl font-bold text-[#64ffda] group-hover:scale-110 transition-transform duration-300">
                            83%
                        </div>
                        <p className="text-sm text-gray-400 mt-2 group-hover:text-gray-300 transition-colors duration-300">
                            of organizations experienced phishing attacks in 2023
                        </p>
                    </div>

                    <div className="text-center group transform hover:-translate-y-2 transition-all duration-300">
                        <div className="text-3xl md:text-4xl font-bold text-[#64ffda] group-hover:scale-110 transition-transform duration-300">
                            $43K
                        </div>
                        <p className="text-sm text-gray-400 mt-2 group-hover:text-gray-300 transition-colors duration-300">
                            average loss per successful phishing attack
                        </p>
                    </div>

                    <div className="text-center group transform hover:-translate-y-2 transition-all duration-300">
                        <div className="text-3xl md:text-4xl font-bold text-[#64ffda] group-hover:scale-110 transition-transform duration-300">
                            60%
                        </div>
                        <p className="text-sm text-gray-400 mt-2 group-hover:text-gray-300 transition-colors duration-300">
                            of breaches involve compromised credentials
                        </p>
                    </div>

                    <div className="text-center group transform hover:-translate-y-2 transition-all duration-300">
                        <div className="text-3xl md:text-4xl font-bold text-[#64ffda] group-hover:scale-110 transition-transform duration-300">
                            96%
                        </div>
                        <p className="text-sm text-gray-400 mt-2 group-hover:text-gray-300 transition-colors duration-300">
                            of phishing attacks start with email
                        </p>
                    </div>
                </div>

                <div className="text-center mt-8 text-xs text-gray-500">
                    Source: FBI Internet Crime Report 2023, Verizon Data Breach Report
                </div>
            </div>
        </section>
    )
}