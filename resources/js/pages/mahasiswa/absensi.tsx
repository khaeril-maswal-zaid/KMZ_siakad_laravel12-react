import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Nilai Mahasiswa',
        href: '/nilai-mahasiswa',
    },
];

export default function nilaiMahasiswa() {
    const { konfigurasi, fakultasProdi, flash, auth } = usePage<SharedData>().props;
    const { absensis, jadwalMatkul, tahunAjaran } = usePage().props;

    const getAbsensiForPertemuan = (absensis, jadwalId, pertemuanKe) => {
        return absensis.find((absen) => absen.jadwal_matkuls_id == jadwalId && absen.pertemuan == pertemuanKe)?.keterangan || '';
    };

    const getRekap = (absensis, jadwalId) => {
        const filtered = absensis.filter((a) => a.jadwal_matkuls_id == jadwalId);
        const count = { H: 0, S: 0, I: 0, A: 0 };
        filtered.forEach((a) => {
            if (count[a.keterangan] !== undefined) count[a.keterangan]++;
        });
        return count;
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Nilai Mahasiswa" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-md border md:min-h-min">
                    <div className="relative">
                        <button className="absolute top-4 right-4 cursor-pointer rounded-md bg-red-700 px-3 py-2 text-sm text-white shadow-md transition-all duration-200 hover:bg-red-800 hover:shadow-lg focus:ring-4 focus:ring-red-300 focus:outline-none active:scale-95 active:bg-red-900">
                            Unduh PDF
                        </button>
                    </div>

                    <table className="mx-3 my-5 text-xs">
                        <tbody>
                            <tr>
                                <td className="w-28 pe-3 pb-1">Fakultas</td>
                                <td className="w-2 pe-2 pb-1">:</td>
                                <td className="w-auto pe-20 pb-1 whitespace-nowrap">{fakultasProdi?.fakultas?.nama_fakultas}</td>

                                <td className="w-28 pe-3 pb-1">Nama Mahasiswa</td>
                                <td className="w-2 pe-2 pb-1">:</td>
                                <td className="pe-9 pb-1">{auth.user?.name}</td>
                            </tr>
                            <tr>
                                <td className="pe-3 pb-1">Program Studi</td>
                                <td className="pe-2 pb-1">:</td>
                                <td className="pb-1">{fakultasProdi?.nama_prodi}</td>

                                <td className="pe-3 pb-1">NIM</td>
                                <td className="pe-2 pb-1">:</td>
                                <td className="pb-1">{auth.user?.mahasiswa?.nim}</td>
                            </tr>
                            <tr>
                                <td className="pe-3 pb-1">Angkatan</td>
                                <td className="pe-2 pb-1">:</td>
                                <td className="pb-1">{auth.user?.mahasiswa?.angkatan}</td>

                                <td className="pe-3 pb-1">Email</td>
                                <td className="pe-2 pb-1">:</td>
                                <td className="pb-1">{auth.user?.email}</td>
                            </tr>
                            <tr>
                                <td className="pe-3 pb-1">Kelas</td>
                                <td className="pe-2 pb-1">:</td>
                                <td className="pb-1">{auth.user?.mahasiswa?.kelas}</td>

                                <td className="pe-3 pb-1">Tahun Ajaran</td>
                                <td className="pe-2 pb-1">:</td>
                                <td className="pb-1">{tahunAjaran}</td>
                            </tr>
                        </tbody>
                    </table>

                    <table className="w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100">
                                <th rowSpan={2} className="w-9 border border-gray-300 py-1.5 text-xs">
                                    No
                                </th>
                                <th rowSpan={2} className="border border-gray-300 px-4 py-1.5 text-xs">
                                    Mata Kuliah
                                </th>
                                <th rowSpan={2} className="border border-gray-300 px-1.5 py-1.5 text-xs">
                                    SKS
                                </th>
                                <th rowSpan={2} className="border border-gray-300 px-2 py-1.5 text-xs">
                                    Dosen Pengampuh
                                </th>
                                <th colSpan={16} className="border border-gray-300 px-4 py-1.5 text-xs">
                                    Pertemuan
                                </th>
                                <th colSpan={4} className="w-28 border border-gray-300 px-4 py-1.5 text-xs">
                                    Rekapitulasi
                                </th>
                            </tr>

                            <tr className="bg-gray-100">
                                {Array.from({ length: 16 }).map((_, index) => (
                                    <th key={index} className="w-10 border border-gray-300 px-1 py-1.5 text-xs">
                                        {index + 1}
                                    </th>
                                ))}

                                <th className="w-10 border border-gray-300 px-2 py-2 text-xs">Hadir</th>
                                <th className="w-10 border border-gray-300 px-2 py-2 text-xs">Sakit</th>
                                <th className="w-10 border border-gray-300 px-2 py-2 text-xs">Izin</th>
                                <th className="w-10 border border-gray-300 px-2 py-2 text-xs">Alpa</th>
                            </tr>
                        </thead>

                        <tbody>
                            {jadwalMatkul.map((item, index) => {
                                const rekap = getRekap(absensis, item.id);

                                return (
                                    <tr key={index} className="border-b border-gray-300">
                                        <td className="border border-gray-300 px-2 py-1 text-center text-xs">{index + 1}</td>
                                        <td className="border border-gray-300 px-2 py-1 text-xs whitespace-nowrap">
                                            {item.program_angkatan?.mata_kuliah?.nama_matkul}
                                        </td>
                                        <td className="border border-gray-300 px-0.5 py-1 text-center text-xs">
                                            {item.program_angkatan?.mata_kuliah?.sks}
                                        </td>
                                        <td className="border border-gray-300 px-2 py-1 text-xs whitespace-nowrap">{item.dosen?.user?.name}</td>

                                        {/* Kolom Pertemuan 1–16 */}
                                        {Array.from({ length: 16 }).map((_, pertemuanIndex) => (
                                            <td key={pertemuanIndex} className="border border-gray-300 px-1 py-1 text-center text-xs">
                                                {getAbsensiForPertemuan(absensis, item.id, pertemuanIndex + 1)}
                                            </td>
                                        ))}

                                        {/* Rekap */}
                                        <td className="border border-gray-300 px-2 py-1 text-center text-xs">{rekap.H}</td>
                                        <td className="border border-gray-300 px-2 py-1 text-center text-xs">{rekap.S}</td>
                                        <td className="border border-gray-300 px-2 py-1 text-center text-xs">{rekap.I}</td>
                                        <td className="border border-gray-300 px-2 py-1 text-center text-xs">{rekap.A}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}
