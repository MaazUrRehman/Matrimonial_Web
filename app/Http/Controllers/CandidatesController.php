<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\profile_created_by;
use App\Models\personal_information;
use App\Models\education_and_profession;
use App\Models\family_background;
use App\Models\partner_preferences;
use App\Models\contact_information;
use App\Models\profile_pictures;

class CandidatesController extends Controller
{
    public function index()
    {
        $currentUser = Auth::user();

        // Fetch current user's gender
        $currentUserGender = personal_information::where('user_id', $currentUser->id)
            ->value('gender');

        $oppositeGender = $this->getOppositeGender($currentUserGender);

        // Get user's partner preferences
        $userPreferences = partner_preferences::where('user_id', $currentUser->id)->first();

        // Fetch candidates (opposite gender)
        $candidates = personal_information::where('gender', $oppositeGender)
            ->with(['educationProfessional', 'familyBackground', 'partnerPreferences', 'contactInfo', 'profilePictures'])
            ->get()
            ->map(function ($candidate) use ($userPreferences) {
                // Calculate match score
                $score = $this->calculateMatchScore($candidate, $userPreferences);

                return [
                    'user_id' => $candidate->user_id,
                    'match_score' => $score,
                    'personal_info' => [
                        'full_name' => $candidate->full_name,
                        'age' => $candidate->age,
                        'date_of_birth' => $candidate->date_of_birth,
                        'gender' => $candidate->gender,
                        'height_feet' => $candidate->height_feet,
                        'height_inches' => $candidate->height_inches,
                        'religion' => $candidate->religion,
                        'sect' => $candidate->sect,
                        'caste' => $candidate->caste,
                        'marital_status' => $candidate->marital_status,
                        'city' => $candidate->city,
                        'country' => $candidate->country,
                    ],
                    'education_profession' => $candidate->educationProfessional ? [
                        'education_level' => $candidate->educationProfessional->education_level,
                        'occupation' => $candidate->educationProfessional->occupation,
                    ] : null,
                    'family_background' => $candidate->familyBackground,
                    'partner_preferences' => $candidate->partnerPreferences,
                    'contact_info' => $candidate->contactInfo,
                    'profile_pictures' => $candidate->profilePictures,
                ];
            })
            ->sortByDesc('match_score')
            ->values();

        return Inertia::render('AllCandidates/CandidatesList', [
            'candidates' => $candidates,
            'userPreferences' => $userPreferences,
            'auth' => [
                'user' => $currentUser
            ],
        ]);
    }

    private function getOppositeGender($gender)
    {
        return match(strtolower($gender)) {
            'male' => 'female',
            'female' => 'male',
            default => 'other',
        };
    }

    private function calculateMatchScore($candidate, $preferences)
    {
        if (!$preferences) return 0;

        $score = 0;

        // Age Match (30)
        if ($preferences->preferred_age_min && $preferences->preferred_age_max) {
            if ($candidate->age >= $preferences->preferred_age_min && $candidate->age <= $preferences->preferred_age_max) {
                $score += 30;
            }
        }

        // Education Match (25)
        if ($preferences->preferred_education && $candidate->educationProfession?->education_level) {
            if (strtolower($preferences->preferred_education) === strtolower($candidate->educationProfession->education_level)) {
                $score += 25;
            }
        }

        // Caste Match (20)
        if ($preferences->preferred_caste && $candidate->caste) {
            if (strtolower($preferences->preferred_caste) === strtolower($candidate->caste)) {
                $score += 20;
            }
        }

        // City Match (15)
        if ($preferences->preferred_city && $candidate->city) {
            if (strtolower($preferences->preferred_city) === strtolower($candidate->city)) {
                $score += 15;
            }
        }

        // Marital Status Match (10)
        if ($preferences->preferred_marital_status && $candidate->marital_status) {
            if (strtolower($preferences->preferred_marital_status) === strtolower($candidate->marital_status)) {
                $score += 10;
            }
        }

        return $score;
    }

    public function show(User $candidate)
    {
        // Load all relationships
        $candidate->load([
            'profileCreatedBy',
            'personalInfo',
            'educationProfessional',
            'familyBackground',
            'partnerPreferences',
            'contactInfo',
            'profilePictures'
        ]);

        // Get user preferences for match calculation
        $userPreferences = auth()->user()->partnerPreferences;

        return inertia('AllCandidates/CandidateDetails', [
            'candidate' => $candidate,
            'userPreferences' => $userPreferences,
        ]);
    }

}
