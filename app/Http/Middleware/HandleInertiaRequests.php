<?php

namespace App\Http\Middleware;

use App\Models\Konfigurasi;
use App\Models\ProgramStudi;
use Illuminate\Foundation\Inspiring;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        [$message, $author] = str(Inspiring::quotes()->random())->explode('-');

        $idProdi = $request->user()->adminProdi->program_studi_id
            ?? $request->user()->dosen->program_studi_id
            ?? $request->user()->mahasiswa->program_studi_id
            ?? false;

        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'quote' => ['message' => trim($message), 'author' => trim($author)],
            'auth' => [
                'user' => $request->user(),
            ],

            'fakultasProdi' => ProgramStudi::select(['fakultas_id', 'nama_prodi'])
                ->with('fakultas:id,nama_fakultas')
                ->where('id', $idProdi)
                ->first(),

            'konfigurasi' => Konfigurasi::select(['tahun_ajar', 'semester'])->first(),

            'flash' => [
                'message' => fn() => $request->session()->get('message')
            ],
        ];
    }
}
