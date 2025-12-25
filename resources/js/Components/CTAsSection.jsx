const CTASection = () => {
    return (
        <div>
            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-br from-maroon-700 via-maroon-900 to-maroon-700 text-white relative overflow-hidden">
                {/* Background decorative elements */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-200 rounded-full blur-3xl"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-maroon-300 rounded-full blur-2xl"></div>
                </div>

                {/* Animated floating elements */}
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-20 left-10 w-6 h-6 bg-yellow-400 rounded-full animate-bounce"></div>
                    <div className="absolute top-40 right-20 w-4 h-4 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
                    <div className="absolute bottom-32 left-20 w-5 h-5 bg-yellow-300 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
                    <div className="absolute bottom-20 right-32 w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '1.5s' }}></div>
                </div>

                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    {/* Main heading */}
                    <h2 className="text-5xl md:text-6xl font-bold mb-6 font-serif bg-gradient-to-r from-white to-yellow-100 bg-clip-text text-transparent">
                        Begin Your New Journey Today
                    </h2>

                    {/* Subtitle */}
                    <p className="text-xl md:text-2xl mb-8 text-maroon-100 max-w-3xl mx-auto leading-relaxed">
                        Join <span className="text-yellow-300 font-semibold">10,000+</span> successful couples who found their soulmates through our trusted platform
                    </p>

                    
                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 mb-12">
                        <button className="group bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-maroon-900 px-12 py-5 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-3xl relative overflow-hidden">
                            <span className="relative z-10">Create Your Profile Free</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-white to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                        </button>

                        <button className="group border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-maroon-900 px-10 py-5 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                            <span className="flex items-center justify-center">
                                Browse Profiles
                                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </span>
                        </button>
                    </div>

                    {/* Trust indicators */}
                    <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8 text-maroon-200">
                        <div className="flex items-center">
                            <svg className="w-5 h-5 text-yellow-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            Verified Profiles Only
                        </div>
                        <div className="flex items-center">
                            <svg className="w-5 h-5 text-yellow-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            Secure & Private
                        </div>
                        <div className="flex items-center">
                            <svg className="w-5 h-5 text-yellow-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            Family Support
                        </div>
                    </div>

                </div>
            </section>
        </div>
    );
};

export default CTASection;