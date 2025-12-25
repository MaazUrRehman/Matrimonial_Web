<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\profile_created_by;
use App\Models\personal_information;
use App\Models\education_and_profession;
use App\Models\family_background;
use App\Models\partner_preferences;
use App\Models\contact_information;
use App\Models\profile_pictures;

class AdminController extends Controller
{
    

    public function index()
    {
        $candidates = User::with([
                'personalInfo',
                'educationProfessional',
                'familyBackground',
                'partnerPreferences',
                'contactInfo',
                'profilePictures'
            ])
            ->get();

        return Inertia::render('Admin/AllCandidatesList', [
            'candidates' => $candidates
        ]);
    }


    public function updatePayment(User $candidate, Request $request)
    {
        $request->validate([
            'payment_status' => 'required|in:pending,cleared'
        ]);

        // Update payment status - adjust this based on your database structure
        $candidate->update([
            'payment_status' => $request->payment_status
        ]);

        return back()->with('success', 'Payment status updated successfully');
    }
}
