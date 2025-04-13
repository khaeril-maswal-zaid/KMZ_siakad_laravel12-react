import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Terjadwal',
        href: '/data-nilai',
    },
];

export default function terjadwal() {
    const { konfigurasi, fakultasProdi, flash, auth } = usePage<SharedData>().props;
    const { berlansung, key, tahunAjaran } = usePage().props;

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
                                <td className="pb-1">{tahunAjaran}</td>
                            </tr>
                        </tbody>
                    </table>

                    <table className="w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-gray-300 px-2.5 py-3 text-xs dark:border-gray-600 dark:text-black">No</th>
                                <th className="w-auto border border-gray-300 px-2 py-3 text-xs whitespace-nowrap dark:border-gray-600 dark:text-black">
                                    Dosen Pengampu
                                </th>
                                <th className="border border-gray-300 px-2 py-3 text-xs dark:border-gray-600 dark:text-black">NIDN</th>
                                <th className="w-auto border border-gray-300 px-2 py-3 text-xs whitespace-nowrap dark:border-gray-600 dark:text-black">
                                    Mata Kuliah
                                </th>
                                <th className="w-1/12 border border-gray-300 px-2 py-3 text-xs dark:border-gray-600 dark:text-black">SKS</th>
                                <th className="border border-gray-300 px-2 py-3 text-xs dark:border-gray-600 dark:text-black">Angkatan</th>
                                <th className="border border-gray-300 px-2 py-3 text-xs dark:border-gray-600 dark:text-black">Kelas</th>
                                <th className="w-1/12 border border-gray-300 px-2 py-3 text-xs dark:border-gray-600 dark:text-black">Semester</th>
                                <th className="border border-gray-300 px-2 py-3 text-xs dark:border-gray-600 dark:text-black">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {berlansung.map((data, index) => {
                                return (
                                    <tr key={data.id || index}>
                                        <td className="border border-gray-300 px-2.5 py-1.5 text-center text-xs text-gray-700 dark:text-gray-200">
                                            {index + 1}
                                        </td>
                                        <td className="border border-gray-300 px-2.5 py-1.5 text-xs text-gray-700 dark:text-gray-200">
                                            {data.dosen?.user?.name}
                                        </td>
                                        <td className="border border-gray-300 px-2.5 py-1.5 text-center text-xs text-gray-700 dark:text-gray-200">
                                            {data.dosen?.nidn}
                                        </td>
                                        <td className="border border-gray-300 px-2.5 py-1.5 text-xs text-gray-700 dark:text-gray-200">
                                            {data.program_angkatan?.mata_kuliah?.nama_matkul}
                                        </td>
                                        <td className="border border-gray-300 px-2.5 py-1.5 text-center text-xs text-gray-700 dark:text-gray-200">
                                            {data.program_angkatan?.mata_kuliah?.sks}
                                        </td>
                                        <td className="border border-gray-300 px-2.5 py-1.5 text-center text-xs text-gray-700 dark:text-gray-200">
                                            {data.program_angkatan?.angkatan}
                                        </td>
                                        <td className="border border-gray-300 px-2.5 py-1.5 text-center text-xs text-gray-700 dark:text-gray-200">
                                            {data.kelas}
                                        </td>
                                        <td className="border border-gray-300 px-2.5 py-1.5 text-center text-xs text-gray-700 dark:text-gray-200">
                                            {data.program_angkatan?.semester}
                                        </td>
                                        <td className="border border-gray-300 px-2.5 py-1.5 text-center text-xs text-gray-700 dark:text-gray-200">
                                            {key == 'nilai' && (
                                                <button
                                                    onClick={() => {
                                                        router.get(route('nilaimahasiswa.paramSession'), {
                                                            angkatan: data.program_angkatan?.angkatan,
                                                            kelas: data.kelas,
                                                            idJadwal: data.id,
                                                        });
                                                    }}
                                                    className="cursor-pointer rounded-md bg-green-600 px-2.5 py-1 text-xs text-white shadow-md transition-all duration-200 hover:bg-green-800 hover:shadow-lg focus:ring-3 focus:ring-green-300 focus:outline-none active:scale-95 active:bg-green-900"
                                                >
                                                    Show Nilai
                                                </button>
                                            )}

                                            {key != 'nilai' && (
                                                <button
                                                    onClick={() => {
                                                        router.get(route('absensi.paramSession'), {
                                                            angkatan: data.program_angkatan?.angkatan,
                                                            kelas: data.kelas,
                                                            idJadwal: data.id,
                                                        });
                                                    }}
                                                    className="cursor-pointer rounded-md bg-green-600 px-2.5 py-1 text-xs text-white shadow-md transition-all duration-200 hover:bg-green-800 hover:shadow-lg focus:ring-3 focus:ring-green-300 focus:outline-none active:scale-95 active:bg-green-900"
                                                >
                                                    Show Absensi
                                                </button>
                                            )}
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
