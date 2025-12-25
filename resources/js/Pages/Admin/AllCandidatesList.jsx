import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useState } from 'react';
import { router } from '@inertiajs/react';

export default function CandidateManagement({ auth, candidates = [] }) {
    const [allCandidates, setAllCandidates] = useState(candidates || []);

    // Toggle payment status
    const togglePaymentStatus = async (candidateId, currentStatus) => {
        try {
            const newStatus = currentStatus === 'cleared' ? 'pending' : 'cleared';

            await router.patch(
                route('candidates.update-payment', {
                    candidate: candidateId,
                }),
                {
                    payment_status: newStatus,
                },
                {
                    preserveScroll: true,
                    onSuccess: () => {
                        setAllCandidates(prev =>
                            prev.map(c =>
                                c.user_id === candidateId
                                    ? { ...c, payment_status: newStatus }
                                    : c
                            )
                        );
                    },
                }
            );
        } catch (error) {
            console.error('Error updating payment status:', error);
        }
    };

    const handleViewProfile = candidate => {
        router.get(route('candidates.show', { candidate: candidate.user_id }));
    };

    const getPaymentStatusColor = status =>
        status === 'cleared'
            ? 'bg-green-100 text-green-800 border-green-200'
            : 'bg-red-100 text-red-800 border-red-200';

    return (
        <AuthenticatedLayout>
            <div className="min-h-screen bg-gradient-to-br from-[#fff8f5] to-[#fbe9e7] py-8">
                <div className="max-w-7xl mx-auto px-4">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-[#7b1c1c] to-[#c62828] rounded-full mb-4 shadow-lg">
                            <span className="text-2xl font-bold text-[#ffb300]">💼</span>
                        </div>
                        <h1 className="text-4xl font-bold text-[#7b1c1c] mb-3">
                            Candidate Management
                        </h1>
                        <p className="text-lg text-[#6b4b4b] max-w-2xl mx-auto">
                            View and manage all registered candidates
                        </p>
                    </div>

                    {/* Results Count */}
                    <div className="flex justify-between items-center mb-6">
                        <p className="text-[#6b4b4b]">
                            Showing <span className="font-bold text-[#7b1c1c]">{allCandidates.length}</span> candidates
                        </p>
                    </div>

                    {/* Candidates List */}
                    <div className="bg-white rounded-3xl shadow-xl border border-[#f3d9d9] overflow-hidden">
                        {/* Table Header */}
                        <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-gradient-to-r from-[#7b1c1c] to-[#c62828] text-white font-bold">
                            <div className="col-span-3">Candidate Info</div>
                            <div className="col-span-2">Education & Profession</div>
                            <div className="col-span-2">Personal Details</div>
                            <div className="col-span-2">Location</div>
                            <div className="col-span-2 text-center">Payment Status</div>
                            <div className="col-span-1 text-center">Actions</div>
                        </div>

                        {/* Candidate Rows */}
                        <div className="divide-y divide-[#f3d9d9]">
                            {allCandidates.map((candidate, index) => {
                                const paymentStatus = candidate.payment_status || 'pending';

                                return (
                                    <div
                                        key={candidate.user_id || index}
                                        className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-[#fff8f5] transition-colors duration-200"
                                    >
                                        {/* Candidate Info */}
                                        <div className="col-span-3 flex items-center space-x-4">
                                            <div className="w-12 h-12 bg-gradient-to-br from-[#7b1c1c] to-[#c62828] rounded-full flex items-center justify-center overflow-hidden">
                                                {candidate.profile_pictures?.picture_half_view ? (
                                                    <img
                                                        src={`assets/images/half_view/${candidate.profile_pictures.picture_half_view}`}
                                                        alt={candidate.personal_info?.full_name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <span className="text-white text-lg">👤</span>
                                                )}
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-[#7b1c1c] text-lg">
                                                    {candidate.personal_info?.full_name || 'Anonymous'}
                                                </h3>
                                                <p className="text-[#6b4b4b] text-sm">
                                                    Age: {candidate.personal_info?.age || '--'} years
                                                </p>
                                            </div>
                                        </div>

                                        {/* Education */}
                                        <div className="col-span-2">
                                            <p className="font-semibold text-[#7b1c1c]">
                                                {candidate.education_profession?.education_level || 'Not specified'}
                                            </p>
                                            <p className="text-[#6b4b4b] text-sm">
                                                {candidate.education_profession?.occupation || 'Not specified'}
                                            </p>
                                        </div>

                                        {/* Personal Details */}
                                        <div className="col-span-2">
                                            <div className="flex flex-wrap gap-2">
                                                <span className="bg-[#fff8f5] text-[#6b4b4b] px-2 py-1 rounded-lg text-xs border border-[#f3d9d9]">
                                                    {candidate.personal_info?.religion || '--'}
                                                </span>
                                                <span className="bg-[#fff8f5] text-[#6b4b4b] px-2 py-1 rounded-lg text-xs border border-[#f3d9d9]">
                                                    {candidate.personal_info?.marital_status || '--'}
                                                </span>
                                                <span className="bg-[#fff8f5] text-[#6b4b4b] px-2 py-1 rounded-lg text-xs border border-[#f3d9d9]">
                                                    {candidate.personal_info?.height_feet && candidate.personal_info?.height_inches
                                                        ? `${candidate.personal_info.height_feet}'${candidate.personal_info.height_inches}"`
                                                        : '--'}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Location */}
                                        <div className="col-span-2">
                                            <p className="text-[#6b4b4b] flex items-center">
                                                <span className="mr-2">📍</span>
                                                {candidate.personal_info?.city || 'Location not specified'}
                                            </p>
                                        </div>

                                        {/* Payment Status */}
                                        <div className="col-span-2 flex items-center justify-center">
                                            <div className="flex flex-col items-center space-y-2">
                                                <span
                                                    className={`px-3 py-1 rounded-full text-xs font-bold border ${getPaymentStatusColor(
                                                        paymentStatus
                                                    )}`}
                                                >
                                                    {paymentStatus === 'cleared' ? '💰 Cleared' : '⏳ Pending'}
                                                </span>
                                                <button
                                                    onClick={() =>
                                                        togglePaymentStatus(candidate.user_id, paymentStatus)
                                                    }
                                                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all duration-300 ${
                                                        paymentStatus === 'cleared'
                                                            ? 'bg-green-600 hover:bg-green-700 text-white'
                                                            : 'bg-amber-600 hover:bg-amber-700 text-white'
                                                    }`}
                                                >
                                                    {paymentStatus === 'cleared'
                                                        ? 'Mark Pending'
                                                        : 'Mark Cleared'}
                                                </button>
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="col-span-1 flex items-center justify-center">
                                            <button
                                                onClick={() => handleViewProfile(candidate)}
                                                className="bg-gradient-to-r from-[#7b1c1c] to-[#c62828] text-white py-2 px-4 rounded-xl text-sm font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
                                            >
                                                View
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
