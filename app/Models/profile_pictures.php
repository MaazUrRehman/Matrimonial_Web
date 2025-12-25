<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class profile_pictures extends Model
{
    /** @use HasFactory<\Database\Factories\ProfilePicturesFactory> */
    use HasFactory, Notifiable;
    protected $table = 'profile_pictures';
    protected $fillable = [
        'user_id',
        'picture_half_view',
        'picture_full_view',
        'picture_left_view',
        'picture_right_view',
    ];
}
