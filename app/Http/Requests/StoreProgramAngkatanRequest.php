<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreProgramAngkatanRequest extends FormRequest
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
            [
                'angkatan'                      => 'required|integer|unique:program_angkatans,angkatan',
                'selectedMatkul'                => 'required|array',
                'selectedMatkul.*.id'           => 'required|integer|exists:mata_kuliahs,id',
                'selectedMatkul.*.semester'     => 'required|integer', // misalnya nilai A, B, dst.
            ],
            [
                'selectedMatkul.*.id.required'       => 'Wajib memilih mata kuliah!',
                'angkatan.required'       => 'Wajib memilih mata angkatan!',
                'angkatan.unique'       => 'Program Akademik Angkatan telah tersediah',
            ]
        ];
    }
}
