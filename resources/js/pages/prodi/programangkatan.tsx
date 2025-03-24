import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Program Akademik Angkatan',
        href: '/program-angkatan',
    },
];

export default function programAngkatan() {
    const { konfigurasi, fakultasProdi, flash, auth } = usePage<SharedData>().props;
    const { prolan, details, totalSks, jumlahMatkul, angkatan } = usePage().props;

    const [showAlert, setShowAlert] = useState(true);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={breadcrumbs[0].title} />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                {flash.message && showAlert && (
                    <div
                        className="mb-4 flex items-center rounded-lg border border-green-200 bg-green-50 p-4 text-green-800 dark:bg-gray-800 dark:text-green-400"
                        role="alert"
                    >
                        <svg
                            className="h-4 w-4 shrink-0"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 1 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                        </svg>
                        <span className="sr-only">Info</span>
                        <div className="ms-3 text-sm font-medium">{flash.message}</div>
                        <button
                            type="button"
                            className="-mx-1.5 -my-1.5 ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-green-50 p-1.5 text-green-500 hover:bg-green-200 focus:ring-2 focus:ring-green-400 dark:bg-gray-800 dark:text-green-400 dark:hover:bg-gray-700"
                            aria-label="Close"
                            onClick={() => setShowAlert(false)}
                        >
                            <span className="sr-only">Close</span>
                            <svg className="h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                />
                            </svg>
                        </button>
                    </div>
                )}

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
