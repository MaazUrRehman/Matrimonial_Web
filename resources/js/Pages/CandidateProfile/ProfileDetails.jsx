import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import NavLink from '@/Components/NavLink';

export default function Details({ 
    profileCreatedBy,
    personalInfo,
    educationProfessional,
    familyBackground,
    partnerPreferences,
    contactInfo,
    profilePictures,
    hasCompleteProfile 
}) {

    return (
        <AuthenticatedLayout>
            <div className="min-h-screen bg-gradient-to-br from-[#fff8f5] to-[#fbe9e7] py-8">
                <div className="max-w-6xl mx-auto px-4">
                    {/* Header Section */}
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-[#7b1c1c] to-[#c62828] rounded-full mb-4 shadow-lg">
                            <span className="text-2xl font-bold text-[#ffb300]">💍</span>
                        </div>
                        <h1 className="text-4xl font-bold text-[#7b1c1c] mb-3">
                            {hasCompleteProfile ? 'My Matrimonial Profile' : 'Complete Your Profile'}
                        </h1>
                        <p className="text-lg text-[#6b4b4b] max-w-2xl mx-auto">
                            {hasCompleteProfile 
                                ? 'Your journey to finding the perfect life partner starts here' 
                                : 'Begin your journey to find the perfect match by creating your profile'
                            }
                        </p>
                    </div>

                    {/* Action Button */}
                    {!hasCompleteProfile && (
                        <div className="flex justify-center mb-12">
                            <div className="bg-white rounded-2xl shadow-lg p-1 inline-flex">
                                <NavLink href={route('candidateProfile.profileCreatedBy.index')}>
                                    <PrimaryButton className="bg-gradient-to-r from-[#7b1c1c] to-[#c62828] hover:from-[#5e1515] hover:to-[#a51f1f] text-white py-4 px-12 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl">
                                        ✨ Create Your Profile
                                    </PrimaryButton>
                                </NavLink>
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
                                        {profilePictures?.picture_half_view ? (
                                            <img 
                                                src={'assets/images/half_view/'+profilePictures?.picture_half_view} 
                                                alt="Profile" 
                                                className="w-20 h-20 object-cover rounded-xl"
                                            />
                                        ) : (
                                            <span className="text-3xl">👤</span>
                                        )}
                                    </div>
                                    <div>
                                        <h2 className="text-3xl font-bold mb-2">
                                            {personalInfo?.full_name || 'Your Name'}
                                        </h2>
                                        <p className="text-[#ffcc80] text-lg">
                                            {educationProfessional?.occupation || 'Profession'} • {personalInfo?.city || 'City'}, {personalInfo?.country || 'Country'}
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
                                    <div className="text-2xl font-bold text-[#7b1c1c] mb-1">{personalInfo?.age || '--'}</div>
                                    <div className="text-sm text-[#6b4b4b]">Age</div>
                                </div>
                                <div className="text-center p-4 bg-[#fff8f5] rounded-2xl border border-[#f3d9d9]">
                                    <div className="text-2xl font-bold text-[#7b1c1c] mb-1">{personalInfo?.height_feet && personalInfo?.height_inches ? `${personalInfo.height_feet}'${personalInfo.height_inches}"` : '--'}</div>
                                    <div className="text-sm text-[#6b4b4b]">Height</div>
                                </div>
                                <div className="text-center p-4 bg-[#fff8f5] rounded-2xl border border-[#f3d9d9]">
                                    <div className="text-2xl font-bold text-[#7b1c1c] mb-1">{personalInfo?.religion || '--'}</div>
                                    <div className="text-sm text-[#6b4b4b]">Religion</div>
                                </div>
                                <div className="text-center p-4 bg-[#fff8f5] rounded-2xl border border-[#f3d9d9]">
                                    <div className="text-2xl font-bold text-[#7b1c1c] mb-1">{personalInfo?.marital_status || '--'}</div>
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
                                                { label: 'Full Name', value: personalInfo?.full_name },
                                                { label: 'Date of Birth', value: personalInfo?.date_of_birth },
                                                { label: 'Gender', value: personalInfo?.gender },
                                                { label: 'Sect', value: personalInfo?.sect },
                                                { label: 'Caste', value: personalInfo?.caste },
                                                { label: 'Location', value: `${personalInfo?.city || ''}, ${personalInfo?.country || ''}`.trim() },
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
                                                <p className="text-lg font-semibold text-[#7b1c1c]">{educationProfessional?.education_level || 'Not specified'}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-[#6b4b4b]">Profession</p>
                                                <p className="text-lg font-semibold text-[#7b1c1c]">{educationProfessional?.occupation || 'Not specified'}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Family Background */}
                                    <div className="bg-gradient-to-br from-white to-[#fff8f5] rounded-2xl p-6 shadow-lg border border-[#f3d9d9]">
                                        <h3 className="text-xl font-bold text-[#7b1c1c] mb-4 flex items-center">
                                            <span className="w-8 h-8 bg-[#f3d9d9] rounded-lg flex items-center justify-center mr-3 text-[#7b1c1c]">🏠</span>
                                            Family Background
                                        </h3>
                                        <div className="grid grid-cols-2 gap-4">
                                            {[
                                                { label: "Father's Name", value: familyBackground?.father_name },
                                                { label: "Mother's Name", value: familyBackground?.mother_name },
                                                { label: "Father's Profession", value: familyBackground?.father_profession },
                                                { label: "Mother's Profession", value: familyBackground?.mother_profession },
                                                { label: "Brothers", value: familyBackground?.brothers_count !== null && familyBackground?.brothers_count !== undefined ? `${familyBackground.brothers_count} (${familyBackground.brothers_married || 0} married)` : null },
                                                { label: "Sisters", value: familyBackground?.sisters_count !== null && familyBackground?.sisters_count !== undefined ? `${familyBackground.sisters_count} (${familyBackground.sisters_married || 0} married)` : null },
                                                { label: "Social Status", value: familyBackground?.social_status },
                                                { label: "Financial Status", value: familyBackground?.financial_status },
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
                                </div>

                                {/* Right Column */}
                                <div className="space-y-8">
                                    {/* Partner Preferences */}
                                    <div className="bg-gradient-to-br from-white to-[#fff8f5] rounded-2xl p-6 shadow-lg border border-[#f3d9d9]">
                                        <h3 className="text-xl font-bold text-[#7b1c1c] mb-4 flex items-center">
                                            <span className="w-8 h-8 bg-[#f3d9d9] rounded-lg flex items-center justify-center mr-3 text-[#7b1c1c]">💑</span>
                                            Partner Preferences
                                        </h3>
                                        <div className="grid grid-cols-2 gap-4">
                                            {[
                                                { label: 'Age Range', value: partnerPreferences?.preferred_age_min && partnerPreferences?.preferred_age_max ? `${partnerPreferences.preferred_age_min} - ${partnerPreferences.preferred_age_max} yrs` : null },
                                                { label: 'Education', value: partnerPreferences?.preferred_education },
                                                { label: 'Profession', value: partnerPreferences?.preferred_profession },
                                                { label: 'Caste', value: partnerPreferences?.preferred_caste },
                                                { label: 'Marital Status', value: partnerPreferences?.preferred_marital_status },
                                                { label: 'City', value: partnerPreferences?.preferred_city },
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

                                    {/* Contact Information */}
                                    <div className="bg-gradient-to-br from-white to-[#fff8f5] rounded-2xl p-6 shadow-lg border border-[#f3d9d9]">
                                        <h3 className="text-xl font-bold text-[#7b1c1c] mb-4 flex items-center">
                                            <span className="w-8 h-8 bg-[#f3d9d9] rounded-lg flex items-center justify-center mr-3 text-[#7b1c1c]">📞</span>
                                            Contact Information
                                        </h3>
                                        <div className="space-y-4">
                                            {[
                                                { label: 'Contact Person', value: contactInfo?.contact_person },
                                                { label: 'WhatsApp', value: contactInfo?.whatsapp_number },
                                            ].map((item, index) => (
                                                item.value && (
                                                    <div key={index} className="flex justify-between items-center py-2">
                                                        <span className="text-[#6b4b4b]">{item.label}</span>
                                                        <span className="text-[#7b1c1c] font-semibold">{item.value}</span>
                                                    </div>
                                                )
                                            ))}
                                            {contactInfo?.additional_details && (
                                                <div className="mt-4 p-4 bg-white rounded-xl border border-[#f3d9d9]">
                                                    <p className="text-sm text-[#6b4b4b] mb-2">Additional Details</p>
                                                    <p className="text-[#7b1c1c]">{contactInfo.additional_details}</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Profile Pictures Gallery */}
                                    <div className="bg-gradient-to-br from-white to-[#fff8f5] rounded-2xl p-6 shadow-lg border border-[#f3d9d9]">
                                        <h3 className="text-xl font-bold text-[#7b1c1c] mb-4 flex items-center">
                                            <span className="w-8 h-8 bg-[#f3d9d9] rounded-lg flex items-center justify-center mr-3 text-[#7b1c1c]">🖼️</span>
                                            Profile Gallery
                                        </h3>
                                        <div className="grid grid-cols-2 gap-4">
                                            {[
                                                { type: 'half_view', label: 'Half View', src: 'assets/images/half_view/'+profilePictures?.picture_half_view },
                                                { type: 'full_view', label: 'Full View', src: 'assets/images/full_view/'+profilePictures?.picture_full_view },
                                                { type: 'left_view', label: 'Left View', src: 'assets/images/left_view/'+profilePictures?.picture_left_view },
                                                { type: 'right_view', label: 'Right View', src: 'assets/images/right_view/'+profilePictures?.picture_right_view },
                                            ].map((image, index) => (
                                                image.src ? (
                                                    <div key={index} className="text-center">
                                                        <div className="bg-white rounded-xl p-2 shadow-sm mb-2 border border-[#f3d9d9] overflow-hidden h-36">
                                                            <img 
                                                                src={image.src}
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
                                    <span className="font-semibold text-[#7b1c1c]">{profileCreatedBy?.created_by || 'Self'}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Call to Action for Incomplete Profiles */}
                    {!hasCompleteProfile && (
                        <div className="text-center mt-8">
                            <div className="bg-white rounded-2xl p-8 shadow-lg border border-[#f3d9d9]">
                                <h3 className="text-2xl font-bold text-[#7b1c1c] mb-4">Ready to Find Your Perfect Match?</h3>
                                <p className="text-[#6b4b4b] mb-6">Complete your profile to increase your chances of finding the right partner</p>
                                <NavLink href={route('candidateProfile.profileCreatedBy.index')}>
                                    <PrimaryButton className="bg-gradient-to-r from-[#7b1c1c] to-[#c62828] hover:from-[#5e1515] hover:to-[#a51f1f] text-white py-4 px-8 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
                                        Start Your Journey →
                                    </PrimaryButton>
                                </NavLink>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}