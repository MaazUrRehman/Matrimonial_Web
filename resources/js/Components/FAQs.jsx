import { useState } from 'react';

const FAQs = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const faqs = [
        {
            question: "How does the matching algorithm work?",
            answer: "Our advanced algorithm considers over 50 factors including personality traits, lifestyle preferences, family values, educational background, and personal interests to find the most compatible matches for you."
        },
        {
            question: "Is my personal information safe and secure?",
            answer: "Yes, we employ bank-level encryption and strict privacy controls. Your personal data is never shared with third parties without your explicit consent, and we follow strict data protection protocols."
        },
        {
            question: "Can I involve my family in the matchmaking process?",
            answer: "Absolutely! We have special features that allow family members to participate in the process while respecting your privacy and personal choices. You can control what information your family can see."
        },
        {
            question: "How long does it typically take to find a match?",
            answer: "The time varies for each individual, but many of our members find compatible matches within 2-4 weeks. We recommend being active on the platform and regularly updating your preferences for better results."
        },
        {
            question: "What makes your service different from other matrimonial platforms?",
            answer: "We focus on meaningful connections through verified profiles, intelligent matching, and personalized support. Our platform combines modern technology with traditional values to ensure authentic relationships."
        },
        {
            question: "Do you offer customer support?",
            answer: "Yes, we have a dedicated customer support team available 7 days a week. You can reach us via phone, email, or live chat for any assistance you may need."
        }
    ];

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-5xl font-bold text-maroon-800 mb-6 font-serif">Frequently Asked Questions</h2>
                    <div className="w-20 h-1 bg-gradient-to-r from-maroon-600 to-maroon-400 mx-auto mb-6 rounded-full"></div>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Get answers to common questions about our matrimonial service
                    </p>
                </div>
                
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div 
                            key={index}
                            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden"
                        >
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="w-full px-6 py-6 text-left flex justify-between items-center focus:outline-none"
                            >
                                <h3 className="text-xl font-semibold text-gray-800 pr-4">
                                    {faq.question}
                                </h3>
                                <svg 
                                    className={`w-6 h-6 text-maroon-600 transition-transform duration-300 ${
                                        openIndex === index ? 'transform rotate-180' : ''
                                    }`}
                                    fill="none" 
                                    stroke="currentColor" 
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            
                            <div 
                                className={`px-6 pb-6 transition-all duration-300 ${
                                    openIndex === index ? 'block' : 'hidden'
                                }`}
                            >
                                <div className="border-t border-gray-100 pt-4">
                                    <p className="text-gray-600 leading-relaxed">
                                        {faq.answer}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default FAQs;