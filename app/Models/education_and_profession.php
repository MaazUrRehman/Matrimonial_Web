<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;


class education_and_profession extends Model
{
    /** @use HasFactory<\Database\Factories\EducationAndProfessionFactory> */
    use HasFactory, Notifiable;
    protected $table = 'education_and_profession';
    
    protected $fillable = [
        'user_id',
        'education_level',
        'occupation',
    ];
}
