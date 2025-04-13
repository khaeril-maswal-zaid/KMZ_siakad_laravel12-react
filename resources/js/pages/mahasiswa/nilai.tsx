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
    const { nilaiMatkul, jadwalMatkul, tahunAjaran } = usePage().props;

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
                                <th className="w-16 border border-gray-300 py-2.5 text-sm">No</th>
                                <th className="border border-gray-300 px-4 py-2.5 text-sm whitespace-nowrap">Mata Kuliah</th>
                                <th className="border border-gray-300 px-4 py-2.5 text-sm whitespace-nowrap">Kode Matkul</th>
                                <th className="border border-gray-300 px-4 py-2.5 text-sm whitespace-nowrap">SKS</th>
                                <th className="border border-gray-300 px-2 py-2.5 text-sm whitespace-nowrap">Dosen Pengampuh</th>
                                <th className="border border-gray-300 px-2 py-2.5 text-sm whitespace-nowrap">NIDN Dosen</th>
                                <th className="border border-gray-300 px-4 py-2.5 text-sm whitespace-nowrap">Nilai</th>
                            </tr>
                        </thead>
                        <tbody>
                            {jadwalMatkul.map((item, index) => {
                                // Cari nilai mahasiswa berdasarkan ID jadwal_matkul
                                const nilai = nilaiMatkul.find((n) => n.jadwal_matkuls_id === item.id)?.nilai || '-';

                                return (
                                    <tr key={index} className="border-b border-gray-300">
                                        <td className="border border-gray-300 px-2 py-2 text-center text-sm">{index + 1}</td>
                                        <td className="border border-gray-300 px-2 py-2 text-sm">
                                            {item.program_angkatan?.mata_kuliah?.nama_matkul}
                                        </td>
                                        <td className="border border-gray-300 px-2 py-2 text-sm">
                                            {item.program_angkatan?.mata_kuliah?.kode_matkul}
                                        </td>
                                        <td className="border border-gray-300 px-2 py-2 text-center text-sm">
                                            {item.program_angkatan?.mata_kuliah?.sks}
                                        </td>
                                        <td className="border border-gray-300 px-2 py-2 text-sm">{item.dosen?.user?.name}</td>
                                        <td className="border border-gray-300 px-2 py-2 text-center text-sm">{item.dosen?.nidn}</td>
                                        <td className="border border-gray-300 px-2 py-2 text-center text-sm">{nilai}</td>
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
