import { useState, useEffect, useRef } from 'react';

const useCountUp = (end, duration = 3000) => {
    const [count, setCount] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !isVisible) {
                    setIsVisible(true);

                    let start = 0;
                    const increment = end / (duration / 16); // 60fps

                    const timer = setInterval(() => {
                        start += increment;
                        if (start >= end) {
                            setCount(end);
                            clearInterval(timer);
                        } else {
                            setCount(Math.floor(start));
                        }
                    }, 16);
                }
            },
            { threshold: 0.3 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [end, duration, isVisible]);

    return [count, ref];
};

const StatsSection = () => {
    const [matches, matchesRef] = useCountUp(5000);
    const [profiles, profilesRef] = useCountUp(10000);
    const [cities, citiesRef] = useCountUp(50);
    const [satisfaction, satisfactionRef] = useCountUp(98);

    return (
        <div>
            <section className="bg-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-maroon-800 mb-4">
                            Trusted by Thousands,
                            <span className="text-gold-500 block">Proven by Results</span>
                        </h2>
                        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                            Join millions who found their life partners through our platform.
                            Our success speaks through the happy couples we've brought together.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div ref={matchesRef}>
                            <div className="text-4xl font-bold text-maroon-700 mb-2">
                                {matches.toLocaleString()}+
                            </div>
                            <div className="text-gray-600">Successful Matches</div>
                        </div>
                        <div ref={profilesRef}>
                            <div className="text-4xl font-bold text-maroon-700 mb-2">
                                {profiles.toLocaleString()}+
                            </div>
                            <div className="text-gray-600">Verified Profiles</div>
                        </div>
                        <div ref={citiesRef}>
                            <div className="text-4xl font-bold text-maroon-700 mb-2">
                                {cities}+
                            </div>
                            <div className="text-gray-600">Cities Covered</div>
                        </div>
                        <div ref={satisfactionRef}>
                            <div className="text-4xl font-bold text-maroon-700 mb-2">
                                {satisfaction}%
                            </div>
                            <div className="text-gray-600">Satisfaction Rate</div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default StatsSection;