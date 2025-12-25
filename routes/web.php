<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\CandidateProfileController;
use App\Http\Controllers\ContactInformationController;
use App\Http\Controllers\EducationAndProfessionController;
use App\Http\Controllers\FamilyBackgroundController;
use App\Http\Controllers\PartnerPreferencesController;
use App\Http\Controllers\PersonalInformationController;
use App\Http\Controllers\ProfileCreatedByController;
use App\Http\Controllers\ProfilePicturesController;
use App\Http\Controllers\CandidatesController;
use App\Http\Controllers\AdminController;

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Dashboard', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});


Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware('auth')->group(function () {
    Route::get('/candidate-profile', [CandidateProfileController::class, 'index'])
        ->name('candidateProfile.index');
});


Route::middleware('auth')->group(function () {
    // Contact information index for candidate profile
   
});

Route::middleware('auth')->group(function () {
    // Candidate profile - index and store routes for related sections

    // Profile Created By
    Route::get('/candidate-profile/profile-created-by', [ProfileCreatedByController::class, 'index'])
        ->name('candidateProfile.profileCreatedBy.index');
    Route::post('/candidate-profile/profile-created-by/store', [ProfileCreatedByController::class, 'store'])
        ->name('candidateProfile.profileCreatedBy.store');

    // Personal Information
    Route::get('/candidate-profile/personal-information', [PersonalInformationController::class, 'index'])
        ->name('candidateProfile.personalInformation.index');
    Route::post('/candidate-profile/personal-information/store', [PersonalInformationController::class, 'store'])
        ->name('candidateProfile.personalInformation.store');

    // Education and Profession
    Route::get('/candidate-profile/education-and-profession', [EducationAndProfessionController::class, 'index'])
        ->name('candidateProfile.educationAndProfession.index');
    Route::post('/candidate-profile/education-and-profession/store', [EducationAndProfessionController::class, 'store'])
        ->name('candidateProfile.educationAndProfession.store');

    // Family Background
    Route::get('/candidate-profile/family-background', [FamilyBackgroundController::class, 'index'])
        ->name('candidateProfile.familyBackground.index');
    Route::post('/candidate-profile/family-background/store', [FamilyBackgroundController::class, 'store'])
        ->name('candidateProfile.familyBackground.store');
    
        // Partner Preferences
    Route::get('/candidate-profile/partner-preferences', [PartnerPreferencesController::class, 'index'])
        ->name('candidateProfile.partnerPreferences.index');
    Route::post('/candidate-profile/partner-preferences/store', [PartnerPreferencesController::class, 'store'])
        ->name('candidateProfile.partnerPreferences.store');

    // Contact Information
    Route::get('/candidate-profile/contact-info', [ContactInformationController::class, 'index'])
        ->name('candidateProfile.contactInfo.index');
    Route::post('/candidate-profile/contact-info/store', [ContactInformationController::class, 'store'])
        ->name('candidateProfile.contactInfo.store');

    // Profile Pictures
    Route::get('/candidate-profile/profile-pictures', [ProfilePicturesController::class, 'index'])
        ->name('candidateProfile.profilePictures.index');
    Route::post('/candidate-profile/profile-pictures/store', [ProfilePicturesController::class, 'store'])
        ->name('candidateProfile.profilePictures.store');
});


Route::middleware('auth')->group(function () {
    // Candidates List
    Route::get('/candidate-profile/candidates-list', [CandidatesController::class, 'index'])
        ->name('candidateProfile.candidatesList.index');

    Route::get('/candidates-details/{candidate}', [CandidatesController::class, 'show'])
        ->name('candidates.show');
});


Route::middleware('auth')->group(function () {
    //Admin Candidates List
    Route::get('/admin/candidates-list', [AdminController::class, 'index'])
        ->name('admin.candidatesList.index');

    Route::get('/candidates/{candidate}/update-payment', [AdminController::class, 'updatePayment'])
        ->name('admin.update-payment');
});


require __DIR__.'/auth.php';
