<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class family_background extends Model
{
    /** @use HasFactory<\Database\Factories\FamilyBackgroundFactory> */
    use HasFactory, Notifiable;
    protected $table = 'family_background';
    
    protected $fillable = [
        'user_id',
        'father_name',
        'mother_name',
        'father_profession',
        'mother_profession',
        'brothers_count',
        'brothers_married',
        'sisters_count',
        'sisters_married',
        'social_status',
        'family_residence',
        'financial_status',
    ];
}
