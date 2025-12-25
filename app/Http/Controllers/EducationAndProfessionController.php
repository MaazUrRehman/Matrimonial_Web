<?php

namespace App\Http\Controllers;

use App\Models\education_and_profession;
use App\Http\Requests\Storeeducation_and_professionRequest;
use App\Http\Requests\Updateeducation_and_professionRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Inertia\Inertia;

class EducationAndProfessionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $userId = Auth::id();

        $hasEducationAndProfession = education_and_profession::where('user_id', $userId)->exists();
        if ($hasEducationAndProfession) {
            return redirect()->route('candidateProfile.familyBackground.index');
        }
        return Inertia::render('CandidateProfile/CreateEducationAndProfession');
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
    public function store(Storeeducation_and_professionRequest $request)
    {
        $data = $request->validated();

        $data['user_id'] = Auth::id();

        education_and_profession::create($data);
        return redirect()->route('candidateProfile.familyBackground.index')
            ->with('success', 'Education and Occupation saved successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(education_and_profession $education_and_profession)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(education_and_profession $education_and_profession)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Updateeducation_and_professionRequest $request, education_and_profession $education_and_profession)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(education_and_profession $education_and_profession)
    {
        //
    }
}
