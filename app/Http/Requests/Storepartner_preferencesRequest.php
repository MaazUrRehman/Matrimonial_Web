<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class Storepartner_preferencesRequest extends FormRequest
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
            'preferred_age_min' => 'required|integer|min:0',
            'preferred_age_max' => 'required|integer|min:0',
            'preferred_education' => 'required|string|max:255',
            'preferred_profession' => 'required|string|max:255',
            'preferred_caste' => 'required|string|max:255',
            'preferred_marital_status' => 'required|string|max:255',
            'preferred_city' => 'required|string|max:255',
        ];
    }
}
