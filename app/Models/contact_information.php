<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class contact_information extends Model
{
    /** @use HasFactory<\Database\Factories\ContactInformationFactory> */
    use HasFactory, Notifiable;
    protected $table = 'contact_information';
    protected $fillable = [
        'user_id',
        'contact_person',
        'whatsapp_number',
        'additional_details',
    ];
}
