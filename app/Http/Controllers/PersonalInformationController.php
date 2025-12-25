<?php

namespace App\Http\Controllers;

use App\Models\personal_information;
use App\Http\Requests\Storepersonal_informationRequest;
use App\Http\Requests\Updatepersonal_informationRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Inertia\Inertia;
class PersonalInformationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $userId = Auth::id();

        $hasPersonalInformation = personal_information::where('user_id', $userId)->exists();
        if ($hasPersonalInformation) {
            return redirect()->route('candidateProfile.educationAndProfession.index');
        }

        return Inertia::render('CandidateProfile/CreatePersonalInfo');
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
    public function store(Storepersonal_informationRequest $request)
    {
        $data = $request->validated();

        $data['user_id'] = Auth::id();

        personal_information::create($data);
        return redirect()->route('candidateProfile.educationAndProfession.index')
            ->with('success', 'Personal information saved successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(personal_information $personal_information)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(personal_information $personal_information)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Updatepersonal_informationRequest $request, personal_information $personal_information)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(personal_information $personal_information)
    {
        //
    }
}
