<?php

namespace App\Http\Controllers;

use App\Models\partner_preferences;
use App\Http\Requests\Storepartner_preferencesRequest;
use App\Http\Requests\Updatepartner_preferencesRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Inertia\Inertia;

class PartnerPreferencesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $userId = Auth::id();
        $hasPartnerPreferences = partner_preferences::where('user_id', $userId)->exists();
        if ($hasPartnerPreferences) {
            return redirect()->route('candidateProfile.contactInfo.index');
        }
        return Inertia::render('CandidateProfile/CreatePartnerPreferences');
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
    public function store(Storepartner_preferencesRequest $request)
    {
        $data = $request->validated();

        $data['user_id'] = Auth::id();

        partner_preferences::create($data);
        return redirect()->route('candidateProfile.contactInfo.index')
            ->with('success', 'Partner preferences saved successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(partner_preferences $partner_preferences)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(partner_preferences $partner_preferences)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Updatepartner_preferencesRequest $request, partner_preferences $partner_preferences)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(partner_preferences $partner_preferences)
    {
        //
    }
}
