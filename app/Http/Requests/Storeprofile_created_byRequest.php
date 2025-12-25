<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class Storeprofile_created_byRequest extends FormRequest
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
            'created_by' => 'required|string|max:255',
            // candidate_id and creater_email will be set by the controller (generated / taken from logged-in user)
            'candidate_id' => 'nullable|string|max:255|unique:profile_created_by,candidate_id',
            'creater_email' => 'nullable|string|email|max:255',
            'payment_status' => 'nullable|string|max:50',
        ];
    }
}
