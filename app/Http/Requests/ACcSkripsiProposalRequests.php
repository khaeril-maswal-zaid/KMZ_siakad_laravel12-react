<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ACcSkripsiProposalRequests extends FormRequest
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
            'tautan_pengesahan' => 'required|url',
            'tanggal_acc' => 'required|date',
            'mahasiswa_user_id' => 'required|integer|exists:mahasiswa_users,id',
            'id_skripsi' => 'required|integer|exists:skripsis,id',
        ];
    }
}
