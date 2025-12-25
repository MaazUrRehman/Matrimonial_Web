<?php

namespace App\Http\Controllers;

use App\Models\profile_created_by;
use App\Models\personal_information;

use App\Http\Requests\Storeprofile_created_byRequest;
use App\Http\Requests\Updateprofile_created_byRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ProfileCreatedByController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $userId = Auth::id();

        $hasCreatedProfile = profile_created_by::where('user_id', $userId)->exists();
        
        if ($hasCreatedProfile) {
            return redirect()->route('candidateProfile.personalInformation.index');
        } 
        return Inertia::render('CandidateProfile/ProfileCreatedBy');
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
    public function store(Storeprofile_created_byRequest $request)
    {
        try{
        $data = $request->validated();

        $random = str_pad(random_int(0, 9999), 4, '0', STR_PAD_LEFT);
        $candidateId = $random . 'CD' . Str::upper(Str::random(1));

        $data['user_id'] = Auth::id();
        $data['candidate_id'] = $candidateId;
        $data['creater_email'] = Auth::user()->email ?? null;
        $data['payment_status'] = $data['payment_status'] ?? 'pending';

        $record = profile_created_by::create($data);
        
        return redirect()->route('candidateProfile.personalInformation.index')
            ->with('success', 'Profile created successfully. Candidate ID: ' . $candidateId);
        } catch (\Exception $e) {
            return redirect()->back()
                ->withErrors(['error' => 'An error occurred while creating the profile: ' . $e->getMessage()])
                ->withInput();

        }
    }

    /**
     * Display the specified resource.
     */
    public function show(profile_created_by $profile_created_by)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(profile_created_by $profile_created_by)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Updateprofile_created_byRequest $request, profile_created_by $profile_created_by)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(profile_created_by $profile_created_by)
    {
        //
    }
}
