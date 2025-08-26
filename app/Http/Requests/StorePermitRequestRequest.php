<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePermitRequestRequest extends FormRequest
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
            'employee_id' => 'required|exists:employees,employee_id',
            'start_datetime' => 'required|date|after:now',
            'end_datetime' => 'required|date|after:start_datetime',
            'vehicle_type' => 'required|string|max:255',
            'license_plate' => 'required|string|max:20',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'employee_id.required' => 'Employee ID is required.',
            'employee_id.exists' => 'Employee ID not found in the system.',
            'start_datetime.required' => 'Start date and time is required.',
            'start_datetime.after' => 'Start date and time must be in the future.',
            'end_datetime.required' => 'End date and time is required.',
            'end_datetime.after' => 'End date and time must be after start date and time.',
            'vehicle_type.required' => 'Vehicle type is required.',
            'license_plate.required' => 'License plate number is required.',
        ];
    }
}