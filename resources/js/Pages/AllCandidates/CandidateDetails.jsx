import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import { router } from '@inertiajs/react';

export default function CandidateDetails({ 
    auth,
    candidate,
    userPreferences 
}) {
    const {
        profile_created_by,
        personal_info,
        education_professional,
        family_background,
        partner_preferences,
        contact_info,
        profile_pictures,
        user
    } = candidate;

    const hasCompleteProfile = personal_info && education_professional;

    // Calculate match score (similar to your DiscoverCandidates logic)
    const calculateMatchScore = () => {
        if (!userPreferences) return 0;
        
        let score = 0;

        if (userPreferences?.preferred_age_min && userPreferences?.preferred_age_max) {
            const candidateAge = personal_info?.age;
            if (candidateAge >= userPreferences.preferred_age_min && candidateAge <= userPreferences.preferred_age_max) {
                score += 30;
            }
        }

        if (userPreferences?.preferred_education && education_professional?.education_level) {
            const pref = userPreferences.preferred_education.toLowerCase();
            const cand = education_professional.education_level?.toLowerCase() || '';
            if (cand.includes(pref) || pref.includes(cand)) {
                score += 25;
            }
        }

        if (userPreferences?.preferred_caste && personal_info?.caste) {
            if (personal_info.caste.toLowerCase() === userPreferences.preferred_caste.toLowerCase()) {
                score += 20;
            }
        }

        if (userPreferences?.preferred_city && personal_info?.city) {
            if (personal_info.city.toLowerCase() === userPreferences.preferred_city.toLowerCase()) {
                score += 15;
            }
        }

        if (userPreferences?.preferred_marital_status && personal_info?.marital_status) {
            if (personal_info.marital_status.toLowerCase() === userPreferences.preferred_marital_status.toLowerCase()) {
                score += 10;
            }
        }

        return score;
    };

    const matchScore = calculateMatchScore();
    
    const getMatchColor = (score) => {
        if (score >= 80) return 'text-green-600';
        if (score >= 60) return 'text-amber-600';
        if (score >= 40) return 'text-orange-600';
        return 'text-red-500';
    };

    const handleBack = () => {
        router.get(route('candidateProfile.candidatesList.index'));
    };

    const handleConnect = () => {
        // Implement connection logic here
        alert('Connection request sent!');
    };

    return (
        <AuthenticatedLayout>
            <div className="min-h-screen bg-gradient-to-br from-[#fff8f5] to-[#fbe9e7] py-8">
                <div className="max-w-6xl mx-auto px-4">
                    {/* Back Button */}
                    <div className="mb-6">
                        <button 
                            onClick={handleBack}
                            className="flex items-center text-[#7b1c1c] hover:text-[#5e1515] transition-colors duration-200"
                        >
                            <span className="mr-2">←</span>
                            Back to Discover
                        </button>
                    </div>

                    {/* Header Section */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-[#7b1c1c] to-[#c62828] rounded-full mb-4 shadow-lg">
                            <span className="text-2xl font-bold text-[#ffb300]">💍</span>
                        </div>
                        <h1 className="text-4xl font-bold text-[#7b1c1c] mb-3">
                            Candidate Profile
                        </h1>
                        <p className="text-lg text-[#6b4b4b] max-w-2xl mx-auto">
                            Discover all details about this potential match
                        </p>
                    </div>

                    {/* Match Score Banner */}
                    {userPreferences && (
                        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-[#f3d9d9]">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-xl font-bold text-[#7b1c1c]">Compatibility Score</h3>
                                    <p className="text-[#6b4b4b]">Based on your preferences</p>
                                </div>
                                <div className="text-right">
                                    <span className={`text-3xl font-bold ${getMatchColor(matchScore)}`}>
                                        {matchScore}%
                                    </span>
                                    <p className="text-sm text-[#6b4b4b]">Match</p>
                                </div>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
                                <div 
                                    className="h-2 rounded-full bg-gradient-to-r from-[#7b1c1c] to-[#c62828]"
                                    style={{ width: `${matchScore}%` }}
                                ></div>
                            </div>
                        </div>
                    )}

                    {/* Main Profile Card */}
                    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-8">
                        {/* Profile Header with Gradient */}
                        <div className="bg-gradient-to-r from-[#7b1c1c] via-[#8e2424] to-[#c62828] p-8 text-white">
                            <div className="flex flex-col md:flex-row items-center justify-between">
                                <div className="flex items-center space-x-6 mb-4 md:mb-0">
                                    <div className="w-24 h-24 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border-2 border-white/30">
                                        {profile_pictures?.picture_half_view ? (
                                            <img 
                                                src={`/assets/images/half_view/${profile_pictures.picture_half_view}`} 
                                                alt="Profile" 
                                                className="w-20 h-20 object-cover rounded-xl"
                                            />
                                        ) : (
                                            <span className="text-3xl">👤</span>
                                        )}
                                    </div>
                                    <div>
                                        <h2 className="text-3xl font-bold mb-2">
                                            {personal_info?.full_name || 'Anonymous'}
                                        </h2>
                                        <p className="text-[#ffcc80] text-lg">
                                            {education_professional?.occupation || 'Profession'} • {personal_info?.city || 'City'}, {personal_info?.country || 'Country'}
                                        </p>
                                    </div>
                                </div>
                                <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-6 py-3 text-center">
                                    <p className="text-sm text-[#ffcc80]">Profile Status</p>
                                    <p className="text-xl font-bold">
                                        {hasCompleteProfile ? (
                                            <span className="text-green-300">✓ Complete</span>
                                        ) : (
                                            <span className="text-yellow-300">⏳ Incomplete</span>
                                        )}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Profile Content */}
                        <div className="p-8">
                            {/* Quick Stats */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                                <div className="text-center p-4 bg-[#fff8f5] rounded-2xl border border-[#f3d9d9]">
                                    <div className="text-2xl font-bold text-[#7b1c1c] mb-1">{personal_info?.age || '--'}</div>
                                    <div className="text-sm text-[#6b4b4b]">Age</div>
                                </div>
                                <div className="text-center p-4 bg-[#fff8f5] rounded-2xl border border-[#f3d9d9]">
                                    <div className="text-2xl font-bold text-[#7b1c1c] mb-1">
                                        {personal_info?.height_feet && personal_info?.height_inches 
                                            ? `${personal_info.height_feet}'${personal_info.height_inches}"` 
                                            : '--'
                                        }
                                    </div>
                                    <div className="text-sm text-[#6b4b4b]">Height</div>
                                </div>
                                <div className="text-center p-4 bg-[#fff8f5] rounded-2xl border border-[#f3d9d9]">
                                    <div className="text-2xl font-bold text-[#7b1c1c] mb-1">{personal_info?.religion || '--'}</div>
                                    <div className="text-sm text-[#6b4b4b]">Religion</div>
                                </div>
                                <div className="text-center p-4 bg-[#fff8f5] rounded-2xl border border-[#f3d9d9]">
                                    <div className="text-2xl font-bold text-[#7b1c1c] mb-1">{personal_info?.marital_status || '--'}</div>
                                    <div className="text-sm text-[#6b4b4b]">Status</div>
                                </div>
                            </div>

                            {/* Two Column Layout */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                {/* Left Column */}
                                <div className="space-y-8">
                                    {/* Personal Information */}
                                    <div className="bg-gradient-to-br from-white to-[#fff8f5] rounded-2xl p-6 shadow-lg border border-[#f3d9d9]">
                                        <h3 className="text-xl font-bold text-[#7b1c1c] mb-4 flex items-center">
                                            <span className="w-8 h-8 bg-[#f3d9d9] rounded-lg flex items-center justify-center mr-3 text-[#7b1c1c]">👤</span>
                                            Personal Details
                                        </h3>
                                        <div className="space-y-3">
                                            {[
                                                { label: 'Full Name', value: personal_info?.full_name },
                                                { label: 'Date of Birth', value: personal_info?.date_of_birth },
                                                { label: 'Gender', value: personal_info?.gender },
                                                { label: 'Sect', value: personal_info?.sect },
                                                { label: 'Caste', value: personal_info?.caste },
                                                { label: 'Location', value: `${personal_info?.city || ''}, ${personal_info?.country || ''}`.trim() },
                                            ].map((item, index) => (
                                                item.value && (
                                                    <div key={index} className="flex justify-between py-2 border-b border-[#f3d9d9]">
                                                        <span className="text-[#6b4b4b] font-medium">{item.label}</span>
                                                        <span className="text-[#7b1c1c] font-semibold">{item.value}</span>
                                                    </div>
                                                )
                                            ))}
                                        </div>
                                    </div>

                                    {/* Education & Profession */}
                                    <div className="bg-gradient-to-br from-white to-[#fff8f5] rounded-2xl p-6 shadow-lg border border-[#f3d9d9]">
                                        <h3 className="text-xl font-bold text-[#7b1c1c] mb-4 flex items-center">
                                            <span className="w-8 h-8 bg-[#f3d9d9] rounded-lg flex items-center justify-center mr-3 text-[#7b1c1c]">🎓</span>
                                            Education & Career
                                        </h3>
                                        <div className="space-y-4">
                                            <div>
                                                <p className="text-sm text-[#6b4b4b]">Education Level</p>
                                                <p className="text-lg font-semibold text-[#7b1c1c]">{education_professional?.education_level || 'Not specified'}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-[#6b4b4b]">Profession</p>
                                                <p className="text-lg font-semibold text-[#7b1c1c]">{education_professional?.occupation || 'Not specified'}</p>
                                            </div>
                                            {education_professional?.job_title && (
                                                <div>
                                                    <p className="text-sm text-[#6b4b4b]">Job Title</p>
                                                    <p className="text-lg font-semibold text-[#7b1c1c]">{education_profession.job_title}</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Family Background */}
                                    {family_background && (
                                        <div className="bg-gradient-to-br from-white to-[#fff8f5] rounded-2xl p-6 shadow-lg border border-[#f3d9d9]">
                                            <h3 className="text-xl font-bold text-[#7b1c1c] mb-4 flex items-center">
                                                <span className="w-8 h-8 bg-[#f3d9d9] rounded-lg flex items-center justify-center mr-3 text-[#7b1c1c]">🏠</span>
                                                Family Background
                                            </h3>
                                            <div className="grid grid-cols-2 gap-4">
                                                {[
                                                    { label: "Father's Name", value: family_background?.father_name },
                                                    { label: "Mother's Name", value: family_background?.mother_name },
                                                    { label: "Father's Profession", value: family_background?.father_profession },
                                                    { label: "Mother's Profession", value: family_background?.mother_profession },
                                                    { label: "Brothers", value: family_background?.brothers_count !== null && family_background?.brothers_count !== undefined ? `${family_background.brothers_count} (${family_background.brothers_married || 0} married)` : null },
                                                    { label: "Sisters", value: family_background?.sisters_count !== null && family_background?.sisters_count !== undefined ? `${family_background.sisters_count} (${family_background.sisters_married || 0} married)` : null },
                                                    { label: "Social Status", value: family_background?.social_status },
                                                    { label: "Financial Status", value: family_background?.financial_status },
                                                ].map((item, index) => (
                                                    item.value && (
                                                        <div key={index} className="text-center p-3 bg-white rounded-xl shadow-sm border border-[#f3d9d9]">
                                                            <p className="text-sm text-[#6b4b4b] mb-1">{item.label}</p>
                                                            <p className="text-[#7b1c1c] font-semibold text-sm">{item.value}</p>
                                                        </div>
                                                    )
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Right Column */}
                                <div className="space-y-8">
                                    {/* Partner Preferences */}
                                    {partner_preferences && (
                                        <div className="bg-gradient-to-br from-white to-[#fff8f5] rounded-2xl p-6 shadow-lg border border-[#f3d9d9]">
                                            <h3 className="text-xl font-bold text-[#7b1c1c] mb-4 flex items-center">
                                                <span className="w-8 h-8 bg-[#f3d9d9] rounded-lg flex items-center justify-center mr-3 text-[#7b1c1c]">💑</span>
                                                Partner Preferences
                                            </h3>
                                            <div className="grid grid-cols-2 gap-4">
                                                {[
                                                    { label: 'Age Range', value: partner_preferences?.preferred_age_min && partner_preferences?.preferred_age_max ? `${partner_preferences.preferred_age_min} - ${partner_preferences.preferred_age_max} yrs` : null },
                                                    { label: 'Education', value: partner_preferences?.preferred_education },
                                                    { label: 'Profession', value: partner_preferences?.preferred_profession },
                                                    { label: 'Caste', value: partner_preferences?.preferred_caste },
                                                    { label: 'Marital Status', value: partner_preferences?.preferred_marital_status },
                                                    { label: 'City', value: partner_preferences?.preferred_city },
                                                ].map((item, index) => (
                                                    item.value && (
                                                        <div key={index} className="text-center p-3 bg-white rounded-xl shadow-sm border border-[#f3d9d9]">
                                                            <p className="text-sm text-[#6b4b4b] mb-1">{item.label}</p>
                                                            <p className="text-[#7b1c1c] font-semibold text-sm">{item.value}</p>
                                                        </div>
                                                    )
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Contact Information */}
                                    {contact_info && (
                                        <div className="bg-gradient-to-br from-white to-[#fff8f5] rounded-2xl p-6 shadow-lg border border-[#f3d9d9]">
                                            <h3 className="text-xl font-bold text-[#7b1c1c] mb-4 flex items-center">
                                                <span className="w-8 h-8 bg-[#f3d9d9] rounded-lg flex items-center justify-center mr-3 text-[#7b1c1c]">📞</span>
                                                Contact Information
                                            </h3>
                                            <div className="space-y-4">
                                                {[
                                                    { label: 'Contact Person', value: contact_info?.contact_person },
                                                    { label: 'WhatsApp', value: contact_info?.whatsapp_number },
                                                ].map((item, index) => (
                                                    item.value && (
                                                        <div key={index} className="flex justify-between items-center py-2">
                                                            <span className="text-[#6b4b4b]">{item.label}</span>
                                                            <span className="text-[#7b1c1c] font-semibold">{item.value}</span>
                                                        </div>
                                                    )
                                                ))}
                                                {contact_info?.additional_details && (
                                                    <div className="mt-4 p-4 bg-white rounded-xl border border-[#f3d9d9]">
                                                        <p className="text-sm text-[#6b4b4b] mb-2">Additional Details</p>
                                                        <p className="text-[#7b1c1c]">{contact_info.additional_details}</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {/* Profile Pictures Gallery */}
                                    <div className="bg-gradient-to-br from-white to-[#fff8f5] rounded-2xl p-6 shadow-lg border border-[#f3d9d9]">
                                        <h3 className="text-xl font-bold text-[#7b1c1c] mb-4 flex items-center">
                                            <span className="w-8 h-8 bg-[#f3d9d9] rounded-lg flex items-center justify-center mr-3 text-[#7b1c1c]">🖼️</span>
                                            Profile Gallery
                                        </h3>
                                        <div className="grid grid-cols-2 gap-4">
                                            {[
                                                { type: 'half_view', label: 'Half View', src: profile_pictures?.picture_half_view },
                                                { type: 'full_view', label: 'Full View', src: profile_pictures?.picture_full_view },
                                                { type: 'left_view', label: 'Left View', src: profile_pictures?.picture_left_view },
                                                { type: 'right_view', label: 'Right View', src: profile_pictures?.picture_right_view },
                                            ].map((image, index) => (
                                                image.src ? (
                                                    <div key={index} className="text-center">
                                                        <div className="bg-white rounded-xl p-2 shadow-sm mb-2 border border-[#f3d9d9] overflow-hidden h-36">
                                                            <img 
                                                                src={`/assets/images/${image.type.replace('_view', '_view')}/${image.src}`}
                                                                alt={image.label}
                                                                className="w-full h-full object-cover rounded-lg"
                                                            />
                                                        </div>
                                                        <p className="text-xs text-[#6b4b4b]">{image.label}</p>
                                                    </div>
                                                ) : (
                                                    <div key={index} className="text-center">
                                                        <div className="bg-[#fff8f5] rounded-xl p-2 shadow-sm mb-2 h-36 flex items-center justify-center border border-[#f3d9d9] overflow-hidden">
                                                            <span className="text-[#c62828] text-2xl">📷</span>
                                                        </div>
                                                        <p className="text-xs text-[#6b4b4b]">{image.label}</p>
                                                    </div>
                                                )
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Profile Created By */}
                            <div className="mt-8 text-center">
                                <div className="inline-flex items-center space-x-2 bg-[#fff8f5] rounded-2xl px-6 py-3 border border-[#f3d9d9]">
                                    <span className="text-[#7b1c1c]">📋 Profile Created By:</span>
                                    <span className="font-semibold text-[#7b1c1c]">{profile_created_by?.created_by || 'Self'}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-center space-x-4 mt-8">
                        <button 
                            onClick={handleBack}
                            className="bg-white text-[#7b1c1c] border-2 border-[#7b1c1c] hover:bg-[#7b1c1c] hover:text-white py-3 px-8 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
                        >
                            Back to Discover
                        </button>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}