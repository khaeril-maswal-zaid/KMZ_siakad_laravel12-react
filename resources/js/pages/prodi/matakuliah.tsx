import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Daftar Mata Kuliah',
        href: '/dashboard-prodi',
    },
];

export default function jadwalPerkuliahan() {
    const { konfigurasi, fakultasProdi, flash, auth } = usePage<SharedData>().props;
    const { mataKuliahs } = usePage().props;
    const [showAlert, setShowAlert] = useState(true);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
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
                        <table className="w-full border-collapse border border-gray-300">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="border border-gray-300 px-2.5 py-1.5 text-xs">No</th>
                                    <th className="w-auto border border-gray-300 px-2.5 py-1.5 text-xs whitespace-nowrap">Kode Matkul</th>
                                    <th className="border border-gray-300 px-4 py-1.5 text-xs">Nama Matkul</th>
                                    <th className="border border-gray-300 px-4 py-1.5 text-xs">Singkatan Matkul</th>
                                    <th className="border border-gray-300 px-4 py-1.5 text-xs">SKS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {mataKuliahs.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td className="border border-gray-300 px-2.5 py-1.5 text-center text-xs text-gray-700 dark:text-gray-600">
                                                {index + 1}
                                            </td>
                                            <td className="w-auto border border-gray-300 px-2.5 py-1.5 text-center text-xs whitespace-nowrap text-gray-700 dark:text-gray-600">
                                                {item.kode_matkul}
                                            </td>
                                            <td className="border border-gray-300 px-2.5 py-1.5 text-xs text-gray-700 dark:text-gray-600">
                                                {item.nama_matkul}
                                            </td>
                                            <td className="border border-gray-300 px-2.5 py-1.5 text-xs text-gray-700 dark:text-gray-600">
                                                {item.singkatan_matkul}
                                            </td>
                                            <td className="border border-gray-300 px-2.5 py-1.5 text-center text-xs text-gray-700 dark:text-gray-600">
                                                {item.sks}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div className="border-sidebar-border/70 dark:border-sidebar-border rounded-md border"></div>
                </div>
            </div>
        </AppLayout>
    );
}
