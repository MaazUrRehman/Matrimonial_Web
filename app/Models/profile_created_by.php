<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class profile_created_by extends Model
{
    /** @use HasFactory<\Database\Factories\ProfileCreatedByFactory> */
    use HasFactory, Notifiable;

    /**
     * Explicit table name to avoid Eloquent pluralization issues.
     */
    protected $table = 'profile_created_by';

    protected $fillable = [
        'user_id',
        'created_by',
        'candidate_id',
        'creater_email',
        'payment_status',
    ];
}
