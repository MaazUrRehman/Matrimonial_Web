import { useState, useEffect } from 'react';

const Testimonials = () => {
    const [currentTestimonial, setCurrentTestimonial] = useState(0);
    
    const testimonials = [
    {
        name: "Ayesha & Ahmed",
        story: "As Pakistani Muslims, we appreciated the halal approach to matchmaking. The family involvement features made our journey blessed and traditional.",
        religion: "Muslim",
        location: "Karachi"
    },
    {
        name: "Fatima & Omar",
        story: "The platform respected our Islamic values while helping us find compatible partners from Pakistan. We're grateful for this service that understands our culture.",
        religion: "Muslim",
        location: "Lahore"
    },
    {
        name: "Zainab & Yusuf",
        story: "Alhamdulillah! We found each other through this platform from different cities in Pakistan. The verification process ensured we connected with genuine families.",
        religion: "Muslim",
        location: "Islamabad"
    },
    {
        name: "Sara & Bilal",
        story: "The Pakistan-specific filters helped us find someone who shares our faith, values, and cultural background. Perfect for modern Pakistani Muslims.",
        religion: "Muslim",
        location: "Rawalpindi"
    },
    {
        name: "Maryam & Hassan",
        story: "We wanted a platform that understands Pakistani Muslim marriage traditions. This exceeded our expectations in every way - from nikkah to rukhsati.",
        religion: "Muslim",
        location: "Faisalabad"
    },
    {
        name: "Rukhsar & Tariq",
        story: "The privacy and security features made our families comfortable throughout the process. Highly recommended for Pakistani singles seeking serious relationships.",
        religion: "Muslim",
        location: "Peshawar"
    },
    {
        name: "Nadia & Sameer",
        story: "From initial contact to nikkah, everything was smooth and respectful of our Pakistani Islamic principles. JazakAllah for bringing us together!",
        religion: "Muslim",
        location: "Multan"
    },
    {
        name: "Amina & Usman",
        story: "As overseas Pakistanis, we found it difficult to find matches back home. This platform bridged the distance and helped us connect with compatible partners in Pakistan.",
        religion: "Muslim",
        location: "Karachi"
    },
    {
        name: "Hina & Ali",
        story: "The platform's understanding of Pakistani family values and traditions made our search meaningful. We found our perfect match within our community.",
        religion: "Muslim",
        location: "Lahore"
    },
    {
        name: "Sadia & Kamran",
        story: "Being from conservative Pakistani families, we needed a platform that respects our boundaries while helping us find life partners. This service was perfect!",
        religion: "Muslim",
        location: "Islamabad"
    },
    {
        name: "Bushra & Farhan",
        story: "The detailed family background checks and verification process gave us confidence as Pakistani parents. Our children found their perfect matches safely.",
        religion: "Muslim",
        location: "Karachi"
    },
    {
        name: "Rabia & Asim",
        story: "MashaAllah! This platform helped us find each other despite being in different provinces of Pakistan. The cultural understanding made all the difference.",
        religion: "Muslim",
        location: "Quetta"
    }
];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const nextTestimonial = () => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    };

    const prevTestimonial = () => {
        setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    return (
        <div>
            <section className="py-20 bg-gradient-to-br from-maroon-800 via-maroon-900 to-maroon-800 text-white relative overflow-hidden">
                {/* Background decorative elements */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full"></div>
                    <div className="absolute bottom-10 right-10 w-40 h-40 bg-yellow-200 rounded-full"></div>
                    <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-white rounded-full"></div>
                </div>

                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-5xl font-bold mb-6 font-serif">Success Stories</h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-yellow-300 mx-auto mb-6 rounded-full"></div>
                        <p className="text-xl text-maroon-100 max-w-2xl mx-auto">
                            Hear from couples who found their perfect match across different communities
                        </p>
                    </div>

                    <div className="relative max-w-4xl mx-auto">
                        {/* Navigation Buttons */}
                        <button
                            onClick={prevTestimonial}
                            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full w-12 h-12 flex items-center justify-center transition-all duration-300 hover:scale-110 z-20 border border-white/30"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>

                        <button
                            onClick={nextTestimonial}
                            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full w-12 h-12 flex items-center justify-center transition-all duration-300 hover:scale-110 z-20 border border-white/30"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>

                        {/* Testimonial Card */}
                        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl">
                            <div className="transition-all duration-500 ease-in-out">
                                {/* Avatar and Info */}
                                <div className="flex items-center justify-center mb-8">
                                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-2xl font-bold text-white shadow-lg">
                                        {testimonials[currentTestimonial].name.split('&')[0].charAt(0)}
                                    </div>
                                </div>

                                {/* Quote */}
                                <blockquote className="text-xl md:text-2xl italic text-center mb-8 leading-relaxed">
                                    "{testimonials[currentTestimonial].story}"
                                </blockquote>

                                {/* Name and Details */}
                                <div className="text-center">
                                    <div className="font-bold text-2xl text-yellow-300 mb-2">
                                        {testimonials[currentTestimonial].name}
                                    </div>
                                    <div className="flex justify-center items-center space-x-4 text-maroon-100">
                                        <span className="flex items-center">
                                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                            </svg>
                                            {testimonials[currentTestimonial].religion}
                                        </span>
                                        <span>•</span>
                                        <span className="flex items-center">
                                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            {testimonials[currentTestimonial].location}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Dots Indicator */}
                            <div className="flex justify-center space-x-3 mt-8">
                                {testimonials.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentTestimonial(index)}
                                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                            index === currentTestimonial 
                                                ? 'bg-yellow-400 w-8' 
                                                : 'bg-white/50 hover:bg-white/70'
                                        }`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Religion Filter Tabs */}
                    <div className="flex justify-center space-x-4 mt-12">
                        <button
                            onClick={() => setCurrentTestimonial(0)}
                            className="px-6 py-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 transition-all duration-300"
                        >
                            All Stories
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Testimonials;