const HowItWorksSection = () => {
    const steps = [
        { number: "01", title: "Create Profile", description: "Sign up and create your detailed profile with preferences", icon: "👤" },
        { number: "02", title: "Find Matches", description: "Browse through verified profiles and get smart recommendations", icon: "💞" },
        { number: "03", title: "Connect", description: "Start conversations with your matches securely", icon: "💬" },
        { number: "04", title: "Meet & Marry", description: "Take your relationship forward with family approval", icon: "💍" }
    ];

    return (
        <div>
            {/* How It Works */}
            <section className="bg-gradient-to-r from-maroon-600 via-maroon-800 to-maroon-600 py-20 relative overflow-hidden">
                {/* Background decorative elements */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full"></div>
                    <div className="absolute top-40 right-20 w-16 h-16 bg-yellow-200 rounded-full"></div>
                    <div className="absolute bottom-40 left-15 w-14 h-14 bg-white rounded-full"></div>
                    <div className="absolute bottom-10 right-10 w-12 h-12 bg-yellow-200 rounded-full"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-5xl font-bold text-white mb-6 font-serif">How It Works</h2>
                        <div className="w-28 h-1 bg-gold-400 mx-auto mb-6"></div>
                        <p className="text-lg text-maroon-100 max-w-2xl mx-auto leading-relaxed">
                            Your beautiful journey to finding the perfect life partner in four simple steps
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {steps.map((step, index) => (
                            <div
                                key={index}
                                className="group relative bg-white p-8 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-4 border-t-4 border-gold-400"
                            >
                                {/* Step number background */}
                                <div className="absolute -top-4 left-6 w-12 h-12 bg-gold-500 rounded-full flex items-center justify-center shadow-lg">
                                    <span className="text-white font-bold text-lg">{step.number}</span>
                                </div>

                                {/* Icon */}
                                <div className="text-4xl mb-4 text-center pt-4">{step.icon}</div>

                                {/* Content */}
                                <h3 className="text-2xl font-bold text-maroon-800 mb-4 text-center font-serif">
                                    {step.title}
                                </h3>
                                <p className="text-gray-600 text-center leading-relaxed">
                                    {step.description}
                                </p>

                                {/* Hover effect line */}
                                <div className="absolute bottom-0 left-0 w-0 h-1 bg-maroon-600 group-hover:w-full transition-all duration-500"></div>
                            </div>
                        ))}
                    </div>

                    {/* Progress line connecting steps */}
                    <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-white bg-opacity-20 -translate-y-8 z-0 mx-8"></div>
                </div>
            </section>
        </div>
    );
}

export default HowItWorksSection;