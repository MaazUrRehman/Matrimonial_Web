<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class Storefamily_backgroundRequest extends FormRequest
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
            'father_name' => 'required|string|max:255',
            'mother_name' => 'required|string|max:255',
            'father_profession' => 'required|string|max:255',
            'mother_profession' => 'required|string|max:255',
            'brothers_count' => 'required|integer|min:0',
            'brothers_married' => 'required|integer|min:0',
            'sisters_count' => 'required|integer|min:0',
            'sisters_married' => 'required|integer|min:0',
            'social_status' => 'required|string|max:255',
            'family_residence' => 'required|string|max:255',
            'financial_status' => 'required|string|max:255',
        ];
    }
}
