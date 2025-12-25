<?php

namespace App\Http\Controllers;

use App\Models\family_background;
use App\Http\Requests\Storefamily_backgroundRequest;
use App\Http\Requests\Updatefamily_backgroundRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Inertia\Inertia;

class FamilyBackgroundController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $userId = Auth::id();

        $hasFamilyBackground = family_background::where('user_id', $userId)->exists();
        if ($hasFamilyBackground) {
            return redirect()->route('candidateProfile.partnerPreferences.index');
        }
        return Inertia::render('CandidateProfile/CreateFamilyBackground');
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
    public function store(Storefamily_backgroundRequest $request)
    {
        $data = $request->validated();

        $data['user_id'] = Auth::id();

        family_background::create($data);
        return redirect()->route('candidateProfile.partnerPreferences.index')
            ->with('success', 'Family background saved successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(family_background $family_background)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(family_background $family_background)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Updatefamily_backgroundRequest $request, family_background $family_background)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(family_background $family_background)
    {
        //
    }
}
