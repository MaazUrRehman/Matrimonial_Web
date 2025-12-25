<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function profileCreatedBy()
    {
        return $this->hasOne(profile_created_by::class, 'user_id');
    }

    public function personalInfo()
    {
        return $this->hasOne(personal_information::class, 'user_id');
    }

    public function educationProfessional()
    {
        return $this->hasOne(education_and_profession::class, 'user_id');
    }

    public function familyBackground()
    {
        return $this->hasOne(family_background::class, 'user_id');
    }

    public function partnerPreferences()
    {
        return $this->hasOne(partner_preferences::class, 'user_id');
    }

    public function contactInfo()
    {
        return $this->hasOne(contact_information::class, 'user_id');
    }

    public function profilePictures()
    {
        return $this->hasOne(profile_pictures::class, 'user_id');
    }

}
