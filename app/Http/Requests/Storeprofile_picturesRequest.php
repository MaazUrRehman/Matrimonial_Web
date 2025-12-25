<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class Storeprofile_picturesRequest extends FormRequest
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
            'picture_half_view' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'picture_full_view' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'picture_left_view' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'picture_right_view' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ];
    }
}
