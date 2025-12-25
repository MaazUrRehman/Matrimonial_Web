const WhyChooseUsSection = () => {
    const features = [
        {
            icon: "🔍",
            title: "Smart Matching",
            description: "Advanced algorithm finds compatible matches based on your preferences"
        },
        {
            icon: "🛡️",
            title: "Verified Profiles",
            description: "All profiles undergo strict verification for your safety"
        },
        {
            icon: "💬",
            title: "Secure Chat",
            description: "Private messaging with complete privacy protection"
        },
        {
            icon: "⭐",
            title: "Premium Service",
            description: "Dedicated relationship managers for personalized assistance"
        }
    ];

    return (
        <div>
            {/* Features */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-4xl font-bold text-center text-maroon-800 mb-4">Why Choose Us</h2>
                    <p className="text-xl text-center text-gray-600 mb-12 max-w-3xl mx-auto">
                        Experience the difference with our premium matrimonial services
                    </p>
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <div 
                                key={index}
                                className="text-center p-6 group hover:bg-maroon-50 rounded-xl transition-all duration-300"
                            >
                                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-3">{feature.title}</h3>
                                <p className="text-gray-600">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>

    )
}
export default WhyChooseUsSection;  