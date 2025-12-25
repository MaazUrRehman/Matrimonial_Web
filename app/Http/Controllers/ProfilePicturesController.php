<?php

namespace App\Http\Controllers;

use App\Models\profile_pictures;
use App\Http\Requests\Storeprofile_picturesRequest;
use App\Http\Requests\Updateprofile_picturesRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Inertia\Inertia;


class ProfilePicturesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $userId = Auth::id();
        $hasProfilePictures = profile_pictures::where('user_id', $userId)->exists();
        if ($hasProfilePictures) {
            return redirect()->route('candidateProfile.index');
        }
        return Inertia::render('CandidateProfile/CreateProfilePictures');
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
    public function store(Storeprofile_picturesRequest $request)
    {
        $validated = $request->validated();
        \Log::info('Validated data:', $validated); // Add this line

        if ($request->hasFile('picture_half_view')) {
            $filename = 'half_view_' . time() . '.' . $request->picture_half_view->extension();
            $request->picture_half_view->move(public_path('assets/images/half_view'), $filename);
            $validated['picture_half_view'] = $filename;
        }
        if ($request->hasFile('picture_full_view')) {
            $filename = 'full_view_' . time() . '.' . $request->picture_full_view->extension();
            $request->picture_full_view->move(public_path('assets/images/full_view'), $filename);
            $validated['picture_full_view'] = $filename;
        }
        if ($request->hasFile('picture_left_view')) {
            $filename = 'left_view_' . time() . '.' . $request->picture_left_view->extension();
            $request->picture_left_view->move(public_path('assets/images/left_view'), $filename);
            $validated['picture_left_view'] = $filename;
        }
        if ($request->hasFile('picture_right_view')) {
            $filename = 'right_view_' . time() . '.' . $request->picture_right_view->extension();
            $request->picture_right_view->move(public_path('assets/images/right_view'), $filename);
            $validated['picture_right_view'] = $filename;
        }

        profile_pictures::create([
            'user_id' => Auth::user()->id, // ✅ Correct foreign key
            'picture_half_view' => $validated['picture_half_view'] ?? null,
            'picture_full_view' => $validated['picture_full_view'] ?? null,
            'picture_left_view' => $validated['picture_left_view'] ?? null,
            'picture_right_view' => $validated['picture_right_view'] ?? null,
        ]);

        return redirect()->route('candidateProfile.index')
            ->with('success', 'Profile pictures created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(profile_pictures $profile_pictures)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(profile_pictures $profile_pictures)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Updateprofile_picturesRequest $request, profile_pictures $profile_pictures)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(profile_pictures $profile_pictures)
    {
        //
    }
}
