<?php

namespace App\Http\Controllers;

use App\Http\Requests\ACcSkripsiProposal;
use App\Http\Requests\ACcSkripsiProposalRequests;
use App\Http\Requests\DHasilSkripsiRequests;
use App\Http\Requests\DTutupSkripsiRequest;
use App\Models\Skripsi;
use App\Http\Requests\StoreSkripsiRequest;
use App\Http\Requests\UpdateSkripsiRequest;
use App\Http\Requests\EditSkripsiRequest;
use App\Http\Requests\UHasilSkripsiRequest;
use App\Http\Requests\UProposalSkripsiRequest;
use App\Models\DosenUser;
use App\Models\PengujiSkripsi;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Http\Request;


class SkripsiController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user = Auth::user();

        // Ambil user yang sedang login
        if ($user->role == 'dosen') {
            $prodiIdAdminLogin = $user->dosen->program_studi_id;
        } elseif ($user->role == 'prodi') {
            $prodiIdAdminLogin = $user->adminProdi->program_studi_id;
        };


        // Ambil program_studi_id dari Admin yang sedang Login

        $query = Skripsi::select(['id', 'pembimbing1', 'pembimbing2', 'mahasiswa_user_id', 'judul', 'tanggal_ujian', 'tautan_skripsi', 'mores', 'status'])
            ->where('program_studi_id', $prodiIdAdminLogin)
            ->with([
                'mahasiswa:id,user_id,nim,kelas,angkatan,no_hp',
                'mahasiswa.user:id,name',

                'dosen1:id,user_id',
                'dosen1.user:id,name',

                'dosen2:id,user_id',
                'dosen2.user:id,name',
            ]);

        // Hanya tambahkan filter angkatan jika parameter tersebut ada
        if ($request->has('angkatan')) {
            $query->whereHas('mahasiswa', function ($q) use ($request) {
                $q->where('angkatan', $request->angkatan);
            });
        }

        if ($user->role == 'dosen') {
            $query->where('pembimbing1', $user->dosen->id);
            $query->OrWhere('pembimbing2', $user->dosen->id);
        }

        $data = [
            'role' => $user->role,
            'resercher' => $query->orderBy('id', 'asc')->paginate(15),
            'dosens' => DosenUser::select(['id', 'user_id'])
                ->where('program_studi_id', $prodiIdAdminLogin)
                ->with(['user:id,name'])
                ->get(),
        ];

        return Inertia::render('prodi/skripsi', $data);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {

        $data = [
            'title' => 'Bimbingan Skripsi',
            'resercher' => Skripsi::select(['id', 'program_studi_id', 'pembimbing1', 'pembimbing2', 'mahasiswa_user_id', 'judul', 'tanggal_ujian', 'tautan_skripsi', 'mores', 'status',])
                ->where('mahasiswa_user_id',  Auth::user()->mahasiswa->id)
                ->first()
        ];
        return Inertia::render('mahasiswa/skripsi', $data);
    }

    /**
     * ACC Judul Proposal = Verifikasi Judul  {Set Mahasiswa}
     */
    public function store(StoreSkripsiRequest $request)
    {
        Skripsi::create([
            'program_studi_id' => Auth::user()->mahasiswa->program_studi_id,
            'judul' => $request->judul,
            'mores' => $request->tanggal,
            'tautan_skripsi' => $request->tautan,
            'mahasiswa_user_id' => Auth::user()->mahasiswa->id,
            'status' => 'Penentuan Pembimbing',
            'tanggal_ujian' => null,
            'pembimbing1' => null,
            'pembimbing2' => null,
        ]);

        $request->session()->flash('message', 'Pengajuan judul proposal berhasil !');
        return redirect()->route('skripsi.create');
    }

    /**
     * Display the specified resource.
     */
    public function show(Skripsi $skripsi)
    {
        //
    }

    /**
     * Atur pembimbing = Bimbingan Proposal {Set Prodi}
     */
    public function update(UpdateSkripsiRequest $request, Skripsi $skripsi)
    {
        if ($skripsi->mahasiswa_user_id != $request->mahasiswa_user_id) {
            $request->session()->flash('message', 'Data gagal tersimpan!');
            return redirect()->route('skripsi.index');
        }

        $skripsi->update([
            'pembimbing1' => $request->pembimbing1,
            'pembimbing2' => $request->pembimbing2,
            'status' => 'Bimbingan Proposal'
        ]);

        $request->session()->flash('message', 'Pembimbing mahasiswa berhasil dibuat!');
        return redirect()->route('skripsi.index');
    }

    /**
     * DAFTAR U-PROPOSAL {Set Mahasiswa}
     */
    public function edit(EditSkripsiRequest $request, Skripsi $skripsi)
    {
        if ($skripsi->mahasiswa_user_id != $request->mahasiswa_user_id) {
            $request->session()->flash('message', 'Data gagal tersimpan!');
            return redirect()->route('skripsi.index');
        }

        $skripsi->update([
            'mores' => $request->tautan_pengesahan,
            'tautan_skripsi' => $request->tautan_proposal,
            'status' => 'Mendaftar U-Proposal'
        ]);

        $request->session()->flash('message', 'Pendaftaran Ujian Proposal berhasil!');
        return redirect()->route('skripsi.create');
    }

    /**
     * Atur penguji U-Proposal = Telah U-Proposal {Set Prodi}
     */
    public function UjianProposal(UProposalSkripsiRequest $request, Skripsi $skripsi)
    {
        if ($skripsi->mahasiswa_user_id != $request->mahasiswa_user_id) {
            $request->session()->flash('message', 'Data gagal tersimpan!');
            return redirect()->route('skripsi.index');
        }

        $penguji = new PengujiSkripsi;
        $penguji->insertPengujiProposal($skripsi->id, [$request->penguji1, $request->penguji2], 'Proposal');

        $skripsi->update([
            'tanggal_ujian' => $request->tanggalujian,
            'status' => 'Telah U-Proposal'
        ]);

        $request->session()->flash('message', 'Dosen penguji Ujian Proposal berhasil dibuat!');
        return redirect()->route('skripsi.index');
    }

    public function accproposal(ACcSkripsiProposalRequests $request, Skripsi $skripsi)
    {
        if ($skripsi->mahasiswa_user_id != $request->mahasiswa_user_id) {
            $request->session()->flash('message', 'Data gagal tersimpan!');
            return redirect()->route('skripsi.index');
        }

        $skripsi->update([
            'tanggal_ujian' => $request->tanggal_acc,
            'mores' => $request->tautan_pengesahan,
            'status' => 'Bimbingan Skripsi'
        ]);

        $request->session()->flash('message', 'Pendaftaran Ujian Hasil berhasil!');
        return redirect()->route('skripsi.create');
    }

    /**
     * DAFTAR U-Hasil {Set Mahasiswa}
     */
    public function DaftarHasil(DHasilSkripsiRequests $request, Skripsi $skripsi)
    {
        if ($skripsi->mahasiswa_user_id != $request->mahasiswa_user_id) {
            $request->session()->flash('message', 'Data gagal tersimpan!');
            return redirect()->route('skripsi.index');
        }

        $skripsi->update([
            'mores' => $request->tautan_pengesahan,
            'tautan_skripsi' => $request->tautan_skripsi,
            'status' => 'Mendaftar U-Hasil'
        ]);

        $request->session()->flash('message', 'Pendaftaran Ujian Hasil berhasil!');
        return redirect()->route('skripsi.create');
    }

    /**
     * Atur penguji U-Hasil = Telah U-Hasil {Set Prodi}
     */
    public function UjianHasil(UHasilSkripsiRequest $request, Skripsi $skripsi)
    {
        if ($skripsi->mahasiswa_user_id != $request->mahasiswa_user_id) {
            $request->session()->flash('message', 'Data gagal tersimpan!');
            return redirect()->route('skripsi.index');
        }

        $penguji = new PengujiSkripsi;
        $penguji->insertPengujiProposal($skripsi->id, [$request->penguji1, $request->penguji2, $request->penguji3, $request->penguji4], 'Hasil');

        $skripsi->update([
            'tanggal_ujian' => $request->tanggalujian,
            'status' => 'Telah U-Hasil'
        ]);

        $request->session()->flash('message', 'Dosen penguji Ujian Hasil berhasil dibuat!');
        return redirect()->route('skripsi.index');
    }

    /**
     * DAFTAR U-TUTUP {Set Mahasiswa}
     */
    public function tutup(DTutupSkripsiRequest $request, Skripsi $skripsi)
    {
        if ($skripsi->mahasiswa_user_id != $request->mahasiswa_user_id) {
            $request->session()->flash('message', 'Data gagal tersimpan!');
            return redirect()->route('skripsi.index');
        }

        $skripsi->update([
            'mores' => $request->tautan_pengesahan,
            'tautan_skripsi' => $request->tautan_skripsi,
            'status' => 'Mendaftar U-Tutup'
        ]);

        $request->session()->flash('message', 'Pendaftaran Ujian Tutup berhasil!');
        return redirect()->route('skripsi.create');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Skripsi $skripsi)
    {
        //
    }
}
