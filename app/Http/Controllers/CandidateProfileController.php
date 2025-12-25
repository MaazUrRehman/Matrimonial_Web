<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\candidateProfile;
use App\Models\profile_created_by;
use App\Models\personal_information;
use App\Models\education_and_profession;
use App\Models\family_background;
use App\Models\partner_preferences;
use App\Models\contact_information;
use App\Models\profile_pictures;
use App\Http\Requests\StorecandidateProfileRequest;
use App\Http\Requests\UpdatecandidateProfileRequest;

class CandidateProfileController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    
    public function index()
    {
        $user = Auth::user();
        
        $profileCreatedBy = profile_created_by::where('user_id', $user->id)->first();
        $personalInfo = personal_information::where('user_id', $user->id)->first();
        $educationProfessional = education_and_profession::where('user_id', $user->id)->first();
        $familyBackground = family_background::where('user_id', $user->id)->first();
        $partnerPreferences = partner_preferences::where('user_id', $user->id)->first();
        $contactInfo = contact_information::where('user_id', $user->id)->first();
        $profilePictures = profile_pictures::where('user_id', $user->id)->first();

        // Check if user has data in all 7 tables
        $hasCompleteProfile = $profileCreatedBy && 
                            $personalInfo && 
                            $educationProfessional && 
                            $familyBackground && 
                            $partnerPreferences && 
                            $contactInfo && 
                            $profilePictures;
        return Inertia::render('CandidateProfile/ProfileDetails', compact(
            'profileCreatedBy',
            'personalInfo',
            'educationProfessional',
            'familyBackground',
            'partnerPreferences',
            'contactInfo',
            'profilePictures',
            'hasCompleteProfile'
        )
        );
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorecandidateProfileRequest $request)
    {
        //
    }


    /**
     * Display the specified resource.
     */
    public function show(candidateProfile $candidateProfile)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(candidateProfile $candidateProfile)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatecandidateProfileRequest $request, candidateProfile $candidateProfile)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(candidateProfile $candidateProfile)
    {
        //
    }
}
