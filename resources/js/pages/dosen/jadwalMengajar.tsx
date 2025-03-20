import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Jadwal Mengajar',
        href: '/jadwal-mengajar',
    },
];

export default function jadwalMengajar() {
    const { jadwalMengajar } = usePage().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Jadwal Mengajar" />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-md border md:min-h-min">
                    <table className="w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="w-12 border border-gray-300 px-4 py-1.5 text-sm">No</th>
                                <th className="border border-gray-300 px-4 py-1.5 text-sm">Mata Kuliah</th>
                                <th className="w-1/12 border border-gray-300 px-4 py-1.5 text-sm">SKS</th>
                                <th className="border border-gray-300 px-4 py-1.5 text-sm">Kelas</th>
                                <th className="border border-gray-300 px-4 py-1.5 text-sm">Hari</th>
                                <th className="border border-gray-300 px-4 py-1.5 text-sm">Waktu</th>
                                <th className="border border-gray-300 px-4 py-1.5 text-sm">Ruangan</th>
                                <th className="w-1/6 border border-gray-300 px-4 py-1.5 text-sm">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {jadwalMengajar.map((data, index) => {
                                return (
                                    <tr key={data.id || index}>
                                        <td className="border border-gray-300 px-2.5 py-1.5 text-center text-sm">{index + 1}</td>
                                        <td className="border border-gray-300 px-2.5 py-1.5 text-sm">
                                            {data.program_angkatan?.mata_kuliah?.nama_matkul}
                                        </td>
                                        <td className="w-1/10 border border-gray-300 px-2.5 py-1.5 text-center text-sm">
                                            {data.program_angkatan?.mata_kuliah?.sks}
                                        </td>
                                        <td className="w-1/10 border border-gray-300 px-2.5 py-1.5 text-center text-sm">
                                            {data.program_angkatan?.angkatan.toString().slice(-2) + ' ' + data.kelas}
                                        </td>
                                        <td className="w-1/10 border border-gray-300 px-2.5 py-1.5 text-center text-sm">{data.hari}</td>
                                        <td className="w-1/8 border border-gray-300 px-2.5 py-1.5 text-center text-sm">{data.waktu}</td>
                                        <td className="w-1/8 border border-gray-300 px-2.5 py-1.5 text-center text-sm">{data.ruangan}</td>
                                        <td className="w-1/7 border border-gray-300 px-2.5 py-1 text-center text-sm">
                                            <button
                                                onClick={() => {
                                                    router.get(route('absensi.paramSession'), {
                                                        angkatan: data.program_angkatan?.angkatan,
                                                        kelas: data.kelas,
                                                        idJadwal: data.id,
                                                    });
                                                }}
                                                className="me-1 inline-block cursor-pointer rounded-md bg-green-700 px-2.5 py-1.5 text-center text-xs font-medium text-white hover:bg-green-800 focus:ring-4 focus:ring-green-300 focus:outline-none dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                                            >
                                                Absensi
                                            </button>

                                            <button
                                                onClick={() => {
                                                    router.get(route('nilaimahasiswa.paramSession'), {
                                                        angkatan: data.program_angkatan?.angkatan,
                                                        kelas: data.kelas,
                                                        idJadwal: data.id,
                                                    });
                                                }}
                                                className="inline-block cursor-pointer rounded-md bg-blue-700 px-2.5 py-1.5 text-center text-xs font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                            >
                                                Nilai
                                            </button>
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
