import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Data Nilai Mahasiswa',
        href: '/data-nilai',
    },
];

export default function berlansung() {
    const { konfigurasi, fakultasProdi, flash, auth } = usePage<SharedData>().props;
    const { berlansung, key } = usePage().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={breadcrumbs[0].title} />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-md border md:min-h-min">
                    <table className="mx-3 my-5 w-full text-xs">
                        <tbody>
                            <tr>
                                <td className="w-28 pe-3 pb-1">Fakultas</td>
                                <td className="w-2 pe-2 pb-1">:</td>
                                <td className="pb-1">{fakultasProdi?.fakultas?.nama_fakultas}</td>
                            </tr>
                            <tr>
                                <td className="w-28 pe-3 pb-1">Prodi</td>
                                <td className="w-2 pe-2 pb-1">:</td>
                                <td className="pb-1">{fakultasProdi?.nama_prodi}</td>
                            </tr>
                            <tr>
                                <td className="pe-3 pb-1">Tahun Ajaran</td>
                                <td className="pe-2 pb-1">:</td>
                                <td className="pb-1">{konfigurasi.tahun_ajar}</td>
                            </tr>
                        </tbody>
                    </table>

                    <table className="w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-gray-300 px-2.5 py-1.5 text-xs">No</th>
                                <th className="border border-gray-300 px-2.5 py-1.5 text-xs">Dosen Pengampu</th>
                                <th className="border border-gray-300 px-2.5 py-1.5 text-xs">NIDN</th>
                                <th className="border border-gray-300 px-2.5 py-1.5 text-xs">Mata Kuliah</th>
                                <th className="border border-gray-300 px-2.5 py-1.5 text-xs">SKS</th>
                                <th className="border border-gray-300 px-2.5 py-1.5 text-xs">Angkatan</th>
                                <th className="border border-gray-300 px-2 py-1.5 text-xs">Kelas</th>
                                <th className="border border-gray-300 px-2 py-1.5 text-xs">Semester</th>
                                <th className="border border-gray-300 px-2.5 py-1.5 text-xs">Hari</th>
                                <th className="border border-gray-300 px-2.5 py-1.5 text-xs">Waktu</th>
                                <th className="border border-gray-300 px-2.5 py-1.5 text-xs">Ruangan</th>
                            </tr>
                        </thead>
                        <tbody>
                            {berlansung.map((data, index) => {
                                return (
                                    <tr key={data.id || index}>
                                        <td className="border border-gray-300 px-2.5 py-1.5 text-center text-xs text-gray-700 dark:text-gray-600">
                                            {index + 1}
                                        </td>
                                        <td className="border border-gray-300 px-2.5 py-1.5 text-xs text-gray-700 dark:text-gray-600">
                                            {data.dosen?.user?.name}
                                        </td>
                                        <td className="border border-gray-300 px-2.5 py-1.5 text-center text-xs text-gray-700 dark:text-gray-600">
                                            {data.dosen?.nidn}
                                        </td>
                                        <td className="border border-gray-300 px-2.5 py-1.5 text-xs text-gray-700 dark:text-gray-600">
                                            {data.program_angkatan?.mata_kuliah?.nama_matkul}
                                        </td>
                                        <td className="border border-gray-300 px-2.5 py-1.5 text-center text-xs text-gray-700 dark:text-gray-600">
                                            {data.program_angkatan?.mata_kuliah?.sks}
                                        </td>
                                        <td className="border border-gray-300 px-2.5 py-1.5 text-center text-xs text-gray-700 dark:text-gray-600">
                                            {data.program_angkatan?.angkatan}
                                        </td>
                                        <td className="border border-gray-300 px-2.5 py-1.5 text-center text-xs text-gray-700 dark:text-gray-600">
                                            {data.kelas}
                                        </td>
                                        <td className="border border-gray-300 px-2.5 py-1.5 text-center text-xs text-gray-700 dark:text-gray-600">
                                            {data.program_angkatan?.semester}
                                        </td>
                                        <td className="border border-gray-300 px-2.5 py-1.5 text-center text-xs text-gray-700 dark:text-gray-600">
                                            {data.hari}
                                        </td>
                                        <td className="border border-gray-300 px-2.5 py-1.5 text-center text-xs text-gray-700 dark:text-gray-600">
                                            {data.waktu}
                                        </td>
                                        <td className="border border-gray-300 px-2.5 py-1.5 text-center text-xs text-gray-700 dark:text-gray-600">
                                            {data.ruangan}
                                        </td>
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
