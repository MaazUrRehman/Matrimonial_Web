<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class Storepersonal_informationRequest extends FormRequest
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
            'full_name' => 'required|string|max:255',
            'age' => 'required|integer|min:0',
            'date_of_birth' => 'required|date',
            'gender' => 'required|string|max:255',
            'height_feet' => 'required|integer|min:0',
            'height_inches' => 'required|integer|min:0',
            'religion' => 'required|string|max:255',
            'sect' => 'nullable|string|max:255',
            'caste' => 'required|string|max:255',
            'marital_status' => 'required|string|max:255',
            'city' => 'required|string|max:255',
            'country' => 'required|string|max:255',
        ];
    }
}
