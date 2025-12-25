<?php

namespace App\Http\Controllers;

use App\Models\contact_information;
use App\Http\Requests\Storecontact_informationRequest;
use App\Http\Requests\Updatecontact_informationRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Inertia\Inertia;


class ContactInformationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $userId = Auth::id();
        $hasContactInformation = contact_information::where('user_id', $userId)->exists();
        if ($hasContactInformation) {
            return redirect()->route('candidateProfile.profilePictures.index');
        }
        return Inertia::render('CandidateProfile/CreateContactInformation');
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
    public function store(Storecontact_informationRequest $request)
    {
        $data = $request->validated();

        $data['user_id'] = Auth::id();

        contact_information::create($data);
        return redirect()->route('candidateProfile.profilePictures.index')
            ->with('success', 'Contact information saved successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(contact_information $contact_information)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(contact_information $contact_information)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Updatecontact_informationRequest $request, contact_information $contact_information)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(contact_information $contact_information)
    {
        //
    }
}
