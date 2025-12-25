import { useState, useEffect } from 'react';

const HeroBanner = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <div>
            {/* Hero Banner */}
            <section className="bg-[url('/assets/images/hero_banner_bg2.jpeg')] h-screen bg-cover bg-center relative text-white overflow-hidden">
                <div className="absolute inset-0 bg-maroon-900 opacity-80"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
                    <div className={`w-full transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                        {/* Heading */}
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
                            Find Your
                            <span className="text-gold-300 block mt-2">Perfect Match</span>
                        </h1>
                        
                        {/* Subtitle */}
                        <p className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 text-gray-200 max-w-2xl leading-relaxed">
                            Trusted by millions to find their life partners. Begin your beautiful journey with us.
                        </p>
                        
                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                            <button className="bg-gold-500 hover:bg-gold-600 text-maroon-900 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg transition-all duration-300 transform hover:scale-105 shadow-lg w-full sm:w-auto">
                                Start Your Journey
                            </button>
                            <button className="border-2 border-white hover:bg-white hover:text-maroon-900 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg transition-all duration-300 w-full sm:w-auto">
                                How It Works
                            </button>
                        </div>
                        
                        {/* Additional Mobile Features */}
                        <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row items-center gap-4 text-sm text-gray-300">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-gold-400 rounded-full"></div>
                                <span>100% Verified Profiles</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-gold-400 rounded-full"></div>
                                <span>Secure & Private</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Scroll Indicator for Mobile */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 sm:hidden">
                    <div className="animate-bounce">
                        <svg className="w-6 h-6 text-gold-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HeroBanner;