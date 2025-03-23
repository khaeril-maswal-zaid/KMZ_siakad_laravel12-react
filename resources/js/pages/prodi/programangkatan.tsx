import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { MoreHorizontal } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Program Angkatan',
        href: '/program-angkatan',
    },
];

export default function programAngkatan() {
    const { konfigurasi, fakultasProdi, flash, auth } = usePage<SharedData>().props;
    const { prolan, details, totalSks, jumlahMatkul, angkatan } = usePage().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={breadcrumbs[0].title} />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-2">
                    <div className="border-sidebar-border/70 dark:border-sidebar-border rounded-md border">
                        <table className="m-2.5 w-full">
                            <tbody>
                                <tr>
                                    <td className="w-28 ps-0.5 pb-0.5 text-xs">Fakultas</td>
                                    <td className="ps-0.5 pb-0.5 text-xs">:</td>
                                    <td className="ps-0.5 pb-0.5 text-xs">{fakultasProdi.fakultas?.nama_fakultas}</td>
                                </tr>
                                <tr>
                                    <td className="ps-0.5 pb-0.5 text-xs">Program Studi</td>
                                    <td className="ps-0.5 pb-0.5 text-xs">:</td>
                                    <td className="ps-0.5 pb-0.5 text-xs">{fakultasProdi.nama_prodi}</td>
                                </tr>
                                <tr>
                                    <td className="ps-0.5 pb-0.5 text-xs">Admin</td>
                                    <td className="ps-0.5 pb-0.5 text-xs">:</td>
                                    <td className="ps-0.5 pb-0.5 text-xs">{auth.user?.name}</td>
                                </tr>
                            </tbody>
                        </table>

                        <table className="w-full border-collapse border border-gray-300">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="border border-gray-300 px-4 py-1.5 text-xs">No</th>
                                    <th className="border border-gray-300 px-4 py-1.5 text-xs">Angkatan</th>
                                    <th className="border border-gray-300 px-4 py-1.5 text-xs">Jumlah SKS</th>
                                    <th className="border border-gray-300 px-4 py-1.5 text-xs">Jumlah Matkul</th>
                                    <th className="border border-gray-300 px-4 py-1.5 text-xs">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {prolan.map((item, index) => {
                                    return (
                                        <tr key={item.id || index}>
                                            <td className="border border-gray-300 px-2.5 py-1.5 text-center text-xs text-gray-700 dark:text-gray-600">
                                                {index + 1}
                                            </td>
                                            <td className="border border-gray-300 px-2.5 py-1.5 text-center text-xs text-gray-700 dark:text-gray-600">
                                                {item.angkatan}
                                            </td>
                                            <td className="border border-gray-300 px-2.5 py-1.5 text-center text-xs text-gray-700 dark:text-gray-600"></td>
                                            <td className="border border-gray-300 px-2.5 py-1.5 text-center text-xs text-gray-700 dark:text-gray-600"></td>
                                            <td className="border border-gray-300 px-2.5 py-1.5 text-center text-xs text-gray-700 dark:text-gray-600">
                                                <DropdownMenu.Root>
                                                    <DropdownMenu.Trigger asChild>
                                                        <button className="cursor-pointer rounded-full bg-gray-200 p-1 hover:bg-gray-300">
                                                            <MoreHorizontal className="h-3 w-3" />
                                                        </button>
                                                    </DropdownMenu.Trigger>

                                                    <DropdownMenu.Portal>
                                                        <DropdownMenu.Content className="z-50 w-40 rounded-md bg-white p-1 shadow-md">
                                                            <DropdownMenu.Item
                                                                onClick={() => {
                                                                    router.get(route('programangkatan.showindex', item.angkatan));
                                                                }}
                                                                className="hover:bo cursor-pointer px-3 py-2 text-sm hover:bg-gray-100"
                                                            >
                                                                View
                                                            </DropdownMenu.Item>
                                                            <DropdownMenu.Item className="cursor-pointer px-3 py-2 text-sm hover:bg-gray-100">
                                                                Copy for next year
                                                            </DropdownMenu.Item>
                                                        </DropdownMenu.Content>
                                                    </DropdownMenu.Portal>
                                                </DropdownMenu.Root>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div className="border-sidebar-border/70 dark:border-sidebar-border rounded-md border">
                        <table className="m-2.5 w-full">
                            <tbody>
                                <tr>
                                    <td className="w-28 ps-0.5 pb-0.5 text-xs">Angkatan</td>
                                    <td className="w-2.5 ps-0.5 pb-0.5 text-xs">:</td>
                                    <td className="ps-0.5 pb-0.5 text-xs">{angkatan}</td>
                                </tr>
                                <tr>
                                    <td className="ps-0.5 pb-0.5 text-xs">Jumlah SKS</td>
                                    <td className="ps-0.5 pb-0.5 text-xs">:</td>
                                    <td className="ps-0.5 pb-0.5 text-xs">{totalSks}</td>
                                </tr>
                                <tr>
                                    <td className="ps-0.5 pb-0.5 text-xs">Jumlah Matkul</td>
                                    <td className="ps-0.5 pb-0.5 text-xs">:</td>
                                    <td className="ps-0.5 pb-0.5 text-xs">{jumlahMatkul}</td>
                                </tr>
                            </tbody>
                        </table>

                        <table className="w-full border-collapse border border-gray-300">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="border border-gray-300 px-4 py-1.5 text-xs">No</th>
                                    <th className="border border-gray-300 px-4 py-1.5 text-xs">Kode Matkul</th>
                                    <th className="border border-gray-300 px-4 py-1.5 text-xs">Mata Kuliah</th>
                                    <th className="border border-gray-300 px-4 py-1.5 text-xs">SKS</th>
                                    <th className="border border-gray-300 px-4 py-1.5 text-xs">Semester</th>
                                </tr>
                            </thead>
                            <tbody>
                                {details.map((data, index) => {
                                    return (
                                        <tr key={data.id || index}>
                                            <td className="border border-gray-300 px-2.5 py-1.5 text-center text-xs text-gray-700 dark:text-gray-600">
                                                {index + 1}
                                            </td>
                                            <td className="border border-gray-300 px-2.5 py-1.5 text-center text-xs text-gray-700 dark:text-gray-600">
                                                {data.mata_kuliah?.kode_matkul}
                                            </td>
                                            <td className="border border-gray-300 px-2.5 py-1.5 text-xs text-gray-700 dark:text-gray-600">
                                                {data.mata_kuliah?.nama_matkul}
                                            </td>
                                            <td className="border border-gray-300 px-2.5 py-1.5 text-center text-xs text-gray-700 dark:text-gray-600">
                                                {data.mata_kuliah?.sks}
                                            </td>
                                            <td className="border border-gray-300 px-2.5 py-1.5 text-center text-xs text-gray-700 dark:text-gray-600">
                                                {data.semester}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
