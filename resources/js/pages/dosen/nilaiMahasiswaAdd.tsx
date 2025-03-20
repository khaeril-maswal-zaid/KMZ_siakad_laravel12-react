import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import { useEffect, useRef } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Create Nilai Mahasiswa',
        href: '/nilai-mahasiswa',
    },
];

export default function NilaiMahasiswaAdd() {
    // Ambil data dari page props
    const { konfigurasi, fakultasProdi } = usePage<SharedData>().props;
    const { paramNilaiSession, mahasiswas, nilaiSaved, jadwalMatkul } = usePage().props;

    // Autofocus untuk input pertama
    const firstInputRef = useRef(null);
    useEffect(() => {
        if (firstInputRef.current) {
            firstInputRef.current.focus();
        }
    }, []);

    // Inisialisasi form dengan nilai default, jika ada nilai yang sudah tersimpan, gunakan nilai tersebut
    const { data, setData, post, processing, errors } = useForm({
        jadwal_matkuls_id: paramNilaiSession.idJadwal,
        nilai: mahasiswas.map((mhs) => {
            // Cari data nilai yang sudah tersimpan untuk mahasiswa ini
            const saved = nilaiSaved.find((item) => item.mahasiswa_user_id === mhs.id);
            return {
                mahasiswa_user_id: mhs.id,
                nilai: saved ? saved.nilai : '',
            };
        }),
    });

    // Fungsi untuk menangani perubahan select tiap mahasiswa
    const handleChange = (index, value) => {
        const newNilai = [...data.nilai];
        newNilai[index].nilai = value;
        setData('nilai', newNilai);
    };

    // Submit form
    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('nilaimahasiswa.store')); // Pastikan route 'nilaimahasiswa.store' telah di-define di Laravel
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Nilai Mahasiswa" />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                {Object.keys(errors).length > 0 && (
                    <div
                        className="mb-4 flex rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800 dark:bg-gray-800 dark:text-red-400"
                        role="alert"
                    >
                        <svg
                            className="me-3 mt-[2px] inline h-4 w-4 shrink-0"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                        </svg>
                        <span className="sr-only">Danger</span>
                        <div>
                            <span className="font-medium">Nilai Gagal Divalidasi:</span>
                            <ul className="mt-1.5 list-inside list-disc">
                                {Object.values(errors)
                                    .flat()
                                    .map((error, index) => (
                                        <li key={index}>{error}</li>
                                    ))}
                            </ul>
                        </div>
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-md border md:min-h-min">
                        <table className="mx-3 my-5 w-10/12 text-xs">
                            <tbody>
                                <tr>
                                    <td className="w-28 pe-3 pb-1">Fakultas</td>
                                    <td className="w-2 pe-2 pb-1">:</td>
                                    <td className="w-1/6 pb-1">{fakultasProdi?.fakultas?.nama_fakultas}</td>

                                    <td className="w-28 pe-3 pb-1">Mata Kuliah</td>
                                    <td className="w-2 pe-2 pb-1">:</td>
                                    <td className="pb-1">{jadwalMatkul.program_angkatan?.mata_kuliah?.nama_matkul}</td>
                                </tr>
                                <tr>
                                    <td className="pe-3 pb-1">Program Studi</td>
                                    <td className="pe-2 pb-1">:</td>
                                    <td className="pb-1">{fakultasProdi?.nama_prodi}</td>

                                    <td className="pe-3 pb-1">Dosen</td>
                                    <td className="pe-2 pb-1">:</td>
                                    <td className="pb-1">{jadwalMatkul.dosen?.user?.name}</td>
                                </tr>
                                <tr>
                                    <td className="pe-3 pb-1">Angkatan/ Kelas</td>
                                    <td className="pe-2 pb-1">:</td>
                                    <td className="pb-1">
                                        {paramNilaiSession.angkatan}/ {paramNilaiSession.kelas}
                                    </td>

                                    <td className="pe-3 pb-1">NIDN</td>
                                    <td className="pe-2 pb-1">:</td>
                                    <td className="pb-1">{jadwalMatkul.dosen?.nidn}</td>
                                </tr>
                                <tr>
                                    <td className="pe-3 pb-1">Keti/ No. Hp</td>
                                    <td className="pe-2 pb-1">:</td>
                                    <td className="pb-1">[BELUM]</td>

                                    <td className="pe-3 pb-1">Tahun Ajaran</td>
                                    <td className="pe-2 pb-1">:</td>
                                    <td className="pb-1">{konfigurasi.tahun_ajar}</td>
                                </tr>
                            </tbody>
                        </table>

                        <table className="w-full border-collapse border border-gray-300">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th rowSpan={2} className="w-8 border border-gray-300 py-1.5 text-sm">
                                        No
                                    </th>
                                    <th rowSpan={2} className="w-36 border border-gray-300 px-4 py-1.5 text-sm">
                                        Nama
                                    </th>
                                    <th rowSpan={2} className="w-20 border border-gray-300 px-2 py-1.5 text-sm">
                                        NIM
                                    </th>
                                    <th rowSpan={2} className="w-20 border border-gray-300 px-2 py-1.5 text-sm">
                                        Nilai
                                    </th>
                                    <th colSpan={4} className="w-28 border border-gray-300 px-4 py-1.5 text-sm">
                                        Rekapitulasi Absensi
                                    </th>
                                </tr>
                                <tr className="bg-gray-100">
                                    <th className="w-16 border border-gray-300 py-1.5 text-sm">Hadir</th>
                                    <th className="w-16 border border-gray-300 py-1.5 text-sm">Sakit</th>
                                    <th className="w-16 border border-gray-300 py-1.5 text-sm">Izin</th>
                                    <th className="w-16 border border-gray-300 py-1.5 text-sm">Alpa</th>
                                </tr>
                            </thead>
                            <tbody>
                                {mahasiswas.map((mhs, index) => (
                                    <tr key={mhs.id} className="text-sm">
                                        <td className="border border-gray-300 py-1.5 text-center text-sm">{index + 1}</td>
                                        <td className="border border-gray-300 px-2.5 py-1.5 text-sm">{mhs.user?.name}</td>
                                        <td className="border border-gray-300 px-2 py-1.5 text-center text-sm">{mhs.nim}</td>
                                        <td className="text-center text-sm">
                                            <select
                                                ref={index === 0 ? firstInputRef : null}
                                                className="w-full cursor-pointer rounded-lg border border-gray-300 p-1.5 px-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                                                value={data.nilai[index].nilai}
                                                onChange={(e) => handleChange(index, e.target.value)}
                                            >
                                                <option value="">Pilih Nilai</option>
                                                {['A', 'B', 'C', 'D', 'E', 'T'].map((klas) => (
                                                    <option key={klas} value={klas}>
                                                        {klas}
                                                    </option>
                                                ))}
                                            </select>
                                        </td>
                                        {/* Kolom Absensi hanya untuk tampilan */}
                                        <td className="border border-gray-300 px-2 py-1.5 text-center text-sm"></td>
                                        <td className="border border-gray-300 px-2 py-1.5 text-center text-sm"></td>
                                        <td className="border border-gray-300 px-2 py-1.5 text-center text-sm"></td>
                                        <td className="border border-gray-300 px-2 py-1.5 text-center text-sm"></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <button type="submit" disabled={processing} className="mt-4 cursor-pointer rounded bg-blue-500 px-4 py-2 text-white">
                        Simpan Nilai
                    </button>
                </form>
            </div>
        </AppLayout>
    );
}
