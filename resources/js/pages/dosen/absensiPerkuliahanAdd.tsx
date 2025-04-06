import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Absensi Perkuliahan',
        href: '/absensi-perkuliahan',
    },
];

export default function AbsensiPerkuliahanAdd() {
    const { konfigurasi, fakultasProdi } = usePage<SharedData>().props;
    const { mahasiswas, jadwalMatkul, absensi, paramAbsensiSession } = usePage().props;

    // 1. Buat 'map' untuk mempercepat pencarian absensi yang sudah ada
    const absensiMap = {};
    absensi.forEach((item) => {
        const key = `${item.mahasiswa_user_id}-${item.pertemuan}`;
        absensiMap[key] = item.keterangan;
    });

    // 2. Inisialisasi form
    const { data, setData, post, processing, errors } = useForm({
        jadwal_matkuls_id: paramAbsensiSession['idJadwal'],
        absensi: mahasiswas.map((mhs) => ({
            id: mhs.id,
            pertemuan: Object.fromEntries(
                [...Array(16)].map((_, i) => {
                    const key = `${mhs.id}-${i + 1}`;
                    return [i + 1, absensiMap[key] || '']; // Ambil data lama atau kosong
                }),
            ),
        })),
    });

    // 3. Handle perubahan absensi
    const handleAbsensiChange = (userId, pertemuanKe, value) => {
        setData(
            'absensi',
            data.absensi.map((item) => (item.id === userId ? { ...item, pertemuan: { ...item.pertemuan, [pertemuanKe]: value } } : item)),
        );
    };

    // 4. Handle submit ke server
    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('absensi.store'));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Absensi Perkuliahan" />

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
                <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-md border md:min-h-min">
                        <div className="w-full overflow-x-auto">
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
                                            {paramAbsensiSession.angkatan}/ {paramAbsensiSession.kelas}
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
                                        <td className="pb-1">{jadwalMatkul.tahun_ajaran}</td>
                                    </tr>
                                </tbody>
                            </table>

                            <table className="min-w-[1460px] border-collapse border border-gray-300">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th rowSpan={2} className="w-9 border border-gray-300 py-1.5 text-xs">
                                            No
                                        </th>
                                        <th rowSpan={2} className="w-1/7 border border-gray-300 px-4 py-1.5 text-xs">
                                            Nama
                                        </th>
                                        <th rowSpan={2} className="w-24 border border-gray-300 px-4 py-1.5 text-xs">
                                            NIM
                                        </th>
                                        <th rowSpan={2} className="border border-gray-300 px-4 py-1.5 text-xs">
                                            Status
                                        </th>
                                        <th colSpan={16} className="border border-gray-300 px-4 py-1.5 text-xs">
                                            Pertemuan
                                        </th>
                                    </tr>
                                    <tr className="bg-gray-100">
                                        {[...Array(16)].map((_, index) => (
                                            <th key={index} className="w-16 border border-gray-300 px-4 py-1.5 text-xs">
                                                {index + 1}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {mahasiswas.map((mhs, index) => (
                                        <tr key={mhs.id} className="text-sm">
                                            <td className="border border-gray-300 py-1.5 text-center text-xs">{index + 1}</td>
                                            <td className="border border-gray-300 px-4 py-1.5 text-xs">{mhs.user?.name}</td>
                                            <td className="border border-gray-300 px-4 py-1.5 text-center text-xs">{mhs.nim}</td>
                                            <td className="border border-gray-300 px-4 py-1.5 text-xs">{mhs.status}</td>

                                            {[...Array(16)].map((_, pertemuanIdx) => {
                                                const pertemuanKe = pertemuanIdx + 1;
                                                const selectedValue = data.absensi.find((item) => item.id === mhs.id)?.pertemuan[pertemuanKe] || '';
                                                return (
                                                    <td key={pertemuanKe} className="ps-1 text-xs">
                                                        <select
                                                            className="block w-full cursor-pointer rounded-lg border border-gray-300 p-1 text-xs text-gray-900"
                                                            onChange={(e) => handleAbsensiChange(mhs.id, pertemuanKe, e.target.value)}
                                                            value={selectedValue}
                                                        >
                                                            <option value="">Pilih</option>
                                                            <option value="H">H</option>
                                                            <option value="S">S</option>
                                                            <option value="I">I</option>
                                                            <option value="A">A</option>
                                                        </select>
                                                    </td>
                                                );
                                            })}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <button type="submit" disabled={processing} className="mt-4 cursor-pointer rounded bg-blue-500 px-4 py-2 text-white">
                        Simpan Absensi
                    </button>
                </div>
            </form>
        </AppLayout>
    );
}
