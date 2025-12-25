<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class partner_preferences extends Model
{
    /** @use HasFactory<\Database\Factories\PartnerPreferencesFactory> */
    use HasFactory, Notifiable;
    protected $table = 'partner_preferences';
    protected $fillable = [
        'user_id',
        'preferred_age_min', 
        'preferred_age_max', 
        'preferred_education',
        'preferred_profession', 
        'preferred_caste',
        'preferred_marital_status', 
        'preferred_city', 
    ];
}
