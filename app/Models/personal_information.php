<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class personal_information extends Model
{
    /** @use HasFactory<\Database\Factories\PersonalInformationFactory> */
    use HasFactory, Notifiable;

    protected $table = 'personal_information';

    protected $fillable = [
        'user_id',
        'full_name', 
        'age',
        'date_of_birth', 
        'gender',
        'height_feet',
        'height_inches', 
        'religion',
        'sect',
        'caste',
        'marital_status',
        'city',
        'country',
    ];

    // ✅ Relationship: One user has one education/profession record
    public function educationProfessional()
    {
        return $this->hasOne(education_and_profession::class, 'user_id', 'user_id');
    }

    // ✅ Relationship: One user has one family background
    public function familyBackground()
    {
        return $this->hasOne(family_background::class, 'user_id', 'user_id');
    }

    // ✅ Relationship: One user has one partner preference
    public function partnerPreferences()
    {
        return $this->hasOne(partner_preferences::class, 'user_id', 'user_id');
    }

    // ✅ Relationship: One user has one contact info
    public function contactInfo()
    {
        return $this->hasOne(contact_information::class, 'user_id', 'user_id');
    }

    // ✅ Relationship: One user has many profile pictures
    public function profilePictures()
    {
        return $this->hasMany(profile_pictures::class, 'user_id', 'user_id');
    }
}
