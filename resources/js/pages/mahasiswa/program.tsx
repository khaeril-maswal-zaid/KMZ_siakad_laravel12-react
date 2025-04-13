import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Program Akademik Angkatan',
        href: '/program-akademik-angkatan',
    },
];

export default function nilaiMahasiswa() {
    const { konfigurasi, fakultasProdi, flash, auth } = usePage<SharedData>().props;
    const { program } = usePage().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Program Akademik Angkatan" />
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
                            </tr>
                        </tbody>
                    </table>

                    <table className="w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-gray-300 px-1 py-2.5 text-sm">No</th>
                                <th className="border border-gray-300 px-4 py-2.5 text-sm">Mata Kuliah</th>
                                <th className="border border-gray-300 px-4 py-2.5 text-sm">Kode Kuliah</th>
                                <th className="border border-gray-300 px-4 py-2.5 text-sm">SKS</th>
                                <th className="border border-gray-300 px-2 py-2.5 text-sm">Semester</th>
                                <th className="border border-gray-300 px-2 py-2.5 text-sm">Keterangan</th>
                            </tr>
                        </thead>
                        <tbody>
                            {program.map((item, index) => {
                                return (
                                    <tr key={index} className="boder-b border-gray-300">
                                        <td className="border border-gray-300 py-1.5 text-center text-sm">{index + 1}</td>
                                        <td className="border border-gray-300 px-4 py-1.5 text-sm">{item.mata_kuliah?.nama_matkul}</td>
                                        <td className="border border-gray-300 px-4 py-1.5 text-sm">{item.mata_kuliah?.kode_matkul}</td>
                                        <td className="border border-gray-300 px-2 py-1.5 text-center text-sm">{item.mata_kuliah?.sks}</td>
                                        <td className="border border-gray-300 px-2 py-1.5 text-center text-sm">{item.semester}</td>
                                        <td className="border border-gray-300 px-2 py-1.5 text-sm"></td>
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
