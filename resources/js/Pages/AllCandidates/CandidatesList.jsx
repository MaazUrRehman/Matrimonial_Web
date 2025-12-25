import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';

export default function DiscoverCandidates({
    auth,
    candidates = [],
    userPreferences
}) {
    const [filteredCandidates, setFilteredCandidates] = useState(candidates || []);
    const [filters, setFilters] = useState({
        ageRange: '',
        religion: '',
        education: '',
        city: '',
        sortBy: 'matchScore'
    });
    const [loading, setLoading] = useState(false);

    // Keep local calculator as fallback if backend doesn't provide match_score
    const calculateMatchScore = (candidate) => {
        let score = 0;

        if (userPreferences?.preferred_age_min && userPreferences?.preferred_age_max) {
            const candidateAge = candidate.personal_info?.age;
            if (candidateAge >= userPreferences.preferred_age_min && candidateAge <= userPreferences.preferred_age_max) {
                score += 30;
            }
        }

        if (userPreferences?.preferred_education && candidate.education_profession?.education_level) {
            const pref = userPreferences.preferred_education.toLowerCase();
            const cand = candidate.education_profession.education_level?.toLowerCase() || '';
            if (cand.includes(pref) || pref.includes(cand)) {
                score += 25;
            }
        }

        if (userPreferences?.preferred_caste && candidate.personal_info?.caste) {
            if (candidate.personal_info.caste.toLowerCase() === userPreferences.preferred_caste.toLowerCase()) {
                score += 20;
            }
        }

        if (userPreferences?.preferred_city && candidate.personal_info?.city) {
            if (candidate.personal_info.city.toLowerCase() === userPreferences.preferred_city.toLowerCase()) {
                score += 15;
            }
        }

        if (userPreferences?.preferred_marital_status && candidate.personal_info?.marital_status) {
            if (candidate.personal_info.marital_status.toLowerCase() === userPreferences.preferred_marital_status.toLowerCase()) {
                score += 10;
            }
        }

        return score;
    };

    // Helper to read match score — prefer server-side match_score, otherwise fallback
    const getMatchScore = (candidate) => {
        // If backend provided a numeric match_score, use it
        if (typeof candidate.match_score === 'number') return candidate.match_score;
        // fallback to client calculation
        return calculateMatchScore(candidate);
    };

    useEffect(() => {
        setLoading(true);

        let results = [...(candidates || [])]; // ALWAYS deep copy

        // Normalize helper (avoids undefined issues)
        const norm = (v) => (v ? v.toString().toLowerCase().trim() : '');

        // APPLY FILTERS
        if (filters.ageRange) {
            const [min, max] = filters.ageRange.split('-').map(Number);
            results = results.filter(c => {
                const age = Number(c.personal_info?.age);
                return age >= min && age <= max;
            });
        }

        if (filters.religion) {
            const selected = norm(filters.religion);
            results = results.filter(c =>
                norm(c.personal_info?.religion) === selected
            );
        }

        if (filters.education) {
            const selected = norm(filters.education);
            results = results.filter(c =>
                norm(c.education_profession?.education_level).includes(selected)
            );
        }

        if (filters.city) {
            const selected = norm(filters.city);
            results = results.filter(c =>
                norm(c.personal_info?.city) === selected
            );
        }

        // SAFELY GET MATCH SCORE
        const safeMatchScore = (c) => {
            const score = getMatchScore(c);
            return Number.isFinite(score) ? score : 0;
        };

        // SORTING
        if (filters.sortBy === 'matchScore') {
            results.sort((a, b) => safeMatchScore(b) - safeMatchScore(a));
        }

        if (filters.sortBy === 'age') {
            results.sort(
                (a, b) =>
                    Number(a.personal_info?.age || 0) -
                    Number(b.personal_info?.age || 0)
            );
        }

        if (filters.sortBy === 'recent') {
            results.sort((a, b) => {
                const aDate = new Date(
                    a.personal_info?.created_at ||
                    a.user?.created_at ||
                    0
                ).getTime();

                const bDate = new Date(
                    b.personal_info?.created_at ||
                    b.user?.created_at ||
                    0
                ).getTime();

                return bDate - aDate;
            });
        }

        setFilteredCandidates(results);
        setLoading(false);

    }, [filters, candidates, userPreferences]);


    // FIXED: Improved match score calculation for display
    const getDisplayMatchScore = (candidate) => {
        return calculateMatchScore(candidate);
    };

    const getMatchColor = (score) => {
        if (score >= 80) return 'text-green-600';
        if (score >= 60) return 'text-amber-600';
        if (score >= 40) return 'text-orange-600';
        return 'text-red-500';
    };

    // FIXED: Reset filters function
    const resetFilters = () => {
        setFilters({
            ageRange: '',
            religion: '',
            education: '',
            city: '',
            sortBy: 'matchScore'
        });
    };

    const handleViewProfile = (candidate) => {
        router.get(route('candidates.show', { candidate: candidate.user_id }));
    };

    return (
        <AuthenticatedLayout>
            <div className="min-h-screen bg-gradient-to-br from-[#fff8f5] to-[#fbe9e7] py-8">
                <div className="max-w-7xl mx-auto px-4">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-[#7b1c1c] to-[#c62828] rounded-full mb-4 shadow-lg">
                            <span className="text-2xl font-bold text-[#ffb300]">💕</span>
                        </div>
                        <h1 className="text-4xl font-bold text-[#7b1c1c] mb-3">
                            Discover Your Perfect Match
                        </h1>
                        <p className="text-lg text-[#6b4b4b] max-w-2xl mx-auto">
                            Find compatible partners based on your preferences and build meaningful connections
                        </p>
                    </div>

                    {/* Filters */}
                    <div className="bg-white rounded-3xl shadow-2xl p-6 mb-8 border border-[#f3d9d9]">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold text-[#7b1c1c] flex items-center">
                                <span className="w-8 h-8 bg-[#f3d9d9] rounded-lg flex items-center justify-center mr-3 text-[#7b1c1c]">🔍</span>
                                Refine Your Search
                            </h3>
                            <button
                                onClick={resetFilters}
                                className="text-sm text-[#7b1c1c] hover:text-[#5e1515] underline"
                            >
                                Reset All
                            </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                            <select
                                value={filters.ageRange}
                                onChange={(e) => setFilters({ ...filters, ageRange: e.target.value })}
                                className="bg-[#fff8f5] border border-[#f3d9d9] rounded-xl px-4 py-3 text-[#6b4b4b] focus:outline-none focus:ring-2 focus:ring-[#7b1c1c]"
                            >
                                <option value="">All Ages</option>
                                <option value="18-25">18-25 Years</option>
                                <option value="26-30">26-30 Years</option>
                                <option value="31-35">31-35 Years</option>
                                <option value="36-40">36-40 Years</option>
                                <option value="41-50">41-50 Years</option>
                            </select>

                            <input
                                type="text"
                                placeholder="Religion"
                                value={filters.religion}
                                onChange={(e) => setFilters({ ...filters, religion: e.target.value })}
                                className="bg-[#fff8f5] border border-[#f3d9d9] rounded-xl px-4 py-3 text-[#6b4b4b] focus:outline-none focus:ring-2 focus:ring-[#7b1c1c]"
                            />

                            <input
                                type="text"
                                placeholder="Education"
                                value={filters.education}
                                onChange={(e) => setFilters({ ...filters, education: e.target.value })}
                                className="bg-[#fff8f5] border border-[#f3d9d9] rounded-xl px-4 py-3 text-[#6b4b4b] focus:outline-none focus:ring-2 focus:ring-[#7b1c1c]"
                            />

                            <input
                                type="text"
                                placeholder="City"
                                value={filters.city}
                                onChange={(e) => setFilters({ ...filters, city: e.target.value })}
                                className="bg-[#fff8f5] border border-[#f3d9d9] rounded-xl px-4 py-3 text-[#6b4b4b] focus:outline-none focus:ring-2 focus:ring-[#7b1c1c]"
                            />

                            <select
                                value={filters.sortBy}
                                onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
                                className="bg-[#fff8f5] border border-[#f3d9d9] rounded-xl px-4 py-3 text-[#6b4b4b] focus:outline-none focus:ring-2 focus:ring-[#7b1c1c]"
                            >
                                <option value="matchScore">Best Match</option>
                                <option value="age">Age: Low to High</option>
                                <option value="recent">Recently Added</option>
                            </select>
                        </div>
                    </div>

                    {/* Results Count */}
                    <div className="flex justify-between items-center mb-6">
                        <p className="text-[#6b4b4b]">
                            Found <span className="font-bold text-[#7b1c1c]">{filteredCandidates.length}</span> compatible matches
                        </p>
                        {userPreferences && (
                            <div className="text-sm text-[#6b4b4b] bg-[#fff8f5] px-4 py-2 rounded-xl border border-[#f3d9d9]">
                                🎯 Matching based on your preferences
                            </div>
                        )}
                    </div>

                    {/* Candidates Grid */}
                    {loading ? (
                        <div className="text-center py-12">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#7b1c1c] to-[#c62828] rounded-full mb-4">
                                <span className="text-white text-2xl">⏳</span>
                            </div>
                            <p className="text-[#6b4b4b]">Finding your perfect matches...</p>
                        </div>
                    ) : filteredCandidates.length === 0 ? (
                        <div className="text-center py-12 bg-white rounded-3xl shadow-xl border border-[#f3d9d9]">
                            <div className="inline-flex items-center justify-center w-20 h-20 bg-[#fff8f5] rounded-full mb-4 border border-[#f3d9d9]">
                                <span className="text-[#c62828] text-3xl">💔</span>
                            </div>
                            <h3 className="text-2xl font-bold text-[#7b1c1c] mb-3">No Matches Found</h3>
                            <p className="text-[#6b4b4b] mb-6">Try adjusting your filters to find more matches</p>
                            <button
                                onClick={resetFilters}
                                className="bg-gradient-to-r from-[#7b1c1c] to-[#c62828] hover:from-[#5e1515] hover:to-[#a51f1f] text-white py-3 px-8 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
                            >
                                Reset Filters
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {filteredCandidates.map((candidate, index) => {
                                const matchScore = getDisplayMatchScore(candidate);
                                return (
                                    <div key={candidate.user_id || index} className="bg-white rounded-3xl shadow-xl overflow-hidden border border-[#f3d9d9] hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                                        {/* Candidate Image */}
                                        <div className="relative h-48 bg-gradient-to-br from-[#7b1c1c] to-[#c62828] overflow-hidden">
                                            {candidate.profile_pictures?.picture_half_view ? (
                                                <img
                                                    src={`assets/images/half_view/${candidate.profile_pictures.picture_half_view}`}
                                                    alt={candidate.personal_info?.full_name}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center">
                                                    <span className="text-white text-4xl">👤</span>
                                                </div>
                                            )}

                                            {/* Match Score Badge */}
                                            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 shadow-lg">
                                                <span className={`text-sm font-bold ${getMatchColor(matchScore)}`}>
                                                    {matchScore}% Match
                                                </span>
                                            </div>

                                            {/* Age Badge */}
                                            <div className="absolute top-4 left-4 bg-[#ffb300] text-white rounded-full px-3 py-1 shadow-lg">
                                                <span className="text-sm font-bold">{candidate.personal_info?.age || '--'}</span>
                                            </div>
                                        </div>

                                        {/* Info */}
                                        <div className="p-5">
                                            <div className="flex justify-between items-start mb-3">
                                                <h3 className="text-xl font-bold text-[#7b1c1c] truncate">
                                                    {candidate.personal_info?.full_name || 'Anonymous'}
                                                </h3>
                                                <span className="text-[#ffb300] text-lg">💖</span>
                                            </div>

                                            <div className="space-y-2 mb-4">
                                                <div className="flex items-center text-[#6b4b4b]">
                                                    <span className="w-5 text-center mr-2">🎓</span>
                                                    <span className="text-sm truncate">{candidate.education_profession?.education_level || 'Not specified'}</span>
                                                </div>
                                                <div className="flex items-center text-[#6b4b4b]">
                                                    <span className="w-5 text-center mr-2">💼</span>
                                                    <span className="text-sm truncate">{candidate.education_profession?.occupation || 'Not specified'}</span>
                                                </div>
                                                <div className="flex items-center text-[#6b4b4b]">
                                                    <span className="w-5 text-center mr-2">📍</span>
                                                    <span className="text-sm truncate">{candidate.personal_info?.city || 'Location not specified'}</span>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-3 gap-2 mb-4">
                                                <div className="text-center p-2 bg-[#fff8f5] rounded-lg border border-[#f3d9d9]">
                                                    <div className="text-xs font-bold text-[#7b1c1c]">{candidate.personal_info?.height_feet && candidate.personal_info?.height_inches ? `${candidate.personal_info.height_feet}'${candidate.personal_info.height_inches}"` : '--'}</div>
                                                    <div className="text-[10px] text-[#6b4b4b]">Height</div>
                                                </div>
                                                <div className="text-center p-2 bg-[#fff8f5] rounded-lg border border-[#f3d9d9]">
                                                    <div className="text-xs font-bold text-[#7b1c1c] truncate">{candidate.personal_info?.religion || '--'}</div>
                                                    <div className="text-[10px] text-[#6b4b4b]">Religion</div>
                                                </div>
                                                <div className="text-center p-2 bg-[#fff8f5] rounded-lg border border-[#f3d9d9]">
                                                    <div className="text-xs font-bold text-[#7b1c1c] truncate">{candidate.personal_info?.marital_status || '--'}</div>
                                                    <div className="text-[10px] text-[#6b4b4b]">Status</div>
                                                </div>
                                            </div>

                                            <div className="flex space-x-2">
                                                <button
                                                onClick={() => handleViewProfile(candidate)} 
                                                className="flex-1 bg-gradient-to-r from-[#7b1c1c] to-[#c62828] text-white py-2 px-3 rounded-xl text-sm font-semibold transition-all duration-300 hover:scale-105 shadow-lg">
                                                    View Profile
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    {/* Load More */}
                    {filteredCandidates.length > 0 && (
                        <div className="text-center mt-8">
                            <button className="bg-white text-[#7b1c1c] border-2 border-[#7b1c1c] hover:bg-[#7b1c1c] hover:text-white py-3 px-8 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
                                Load More Matches
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}