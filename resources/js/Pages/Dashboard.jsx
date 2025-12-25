import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import HeroBanner from '@/Components/HeroBanner';
import StatsSection from '@/Components/StatsSection';
import HowItWorksSection from '@/Components/HowItWorksSection';
import WhyChooseUsSection from '@/Components/WhyChooseUsSection';
import FAQs from '@/Components/FAQs';
import CTASection from '@/Components/CTAsSection';
import Footer from '@/Components/Footer';

export default function Dashboard() {
    const [isVisible, setIsVisible] = useState(false);

    
    useEffect(() => {
        setIsVisible(true);
        
        const interval = setInterval(() => {
            setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <AuthenticatedLayout
            
        >
            <Head title="Find Your Perfect Match - Matrimonial Services" />
            
            <HeroBanner />

            <StatsSection />

            <HowItWorksSection />

            <WhyChooseUsSection />

            <CTASection />

            <FAQs />

            <Footer />

            <style jsx>{`
                
                
                .animate-fade-in-up {
                    animation: fadeInUp 0.6s ease-out forwards;
                    opacity: 0;
                }
                
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </AuthenticatedLayout>
    );
}