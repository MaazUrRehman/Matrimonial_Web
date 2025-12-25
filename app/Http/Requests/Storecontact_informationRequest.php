<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class Storecontact_informationRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'contact_person' => 'required|string|max:255',
            'whatsapp_number' => 'required|string|max:20',
            'additional_details' => 'nullable|string',
        ];
    }
}
