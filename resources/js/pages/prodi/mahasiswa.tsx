import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Data Mahaiswa',
        href: '/dashboard-prodi',
    },
];

export default function jadwalPerkuliahan() {
    type Mahasiswa = {
        nim: string;
        kelas: string;
        jenis_kelamin: string;
        tempat_lahir: string;
        tanggal_lahir: string;
        no_hp: string;
        user?: {
            name: string;
            email: string;
        } | null;
    };

    const { konfigurasi, fakultasProdi, flash } = usePage<SharedData>().props;
    const { mahasiswas } = usePage<{ mahasiswas: Mahasiswa[] }>().props;

    const years = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i);

    const [selectedAngkatan, setSelectedAngkatan] = useState();

    const handleAngkatanChange = (year) => {
        setSelectedAngkatan(year);
        handleFilter(year);
    };

    const handleFilter = (year) => {
        router.get(route('mahasiswauser.index'), { angkatan: year }, { preserveState: true });
    };

    // ---------------------------------------------------------------
    const { data, setData, get, processing } = useForm({
        abboya: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        get(route('mahasiswauser.index'));
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-4">
                    <div className="relative w-full">
                        <select
                            id="selectProdi"
                            className="peer block w-full appearance-none rounded-lg border border-gray-300 bg-gray-100 p-2.5 px-3 py-2 pt-5 text-sm text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                        >
                            <option>{fakultasProdi?.fakultas?.nama_fakultas}</option>
                        </select>
                        <label
                            htmlFor="selectProdi"
                            className="absolute start-2.5 top-4 z-10 origin-[0] -translate-y-3 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-3 peer-focus:scale-75 peer-focus:text-blue-600 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 dark:text-gray-400 peer-focus:dark:text-blue-500"
                        >
                            Fakultas
                        </label>
                        <svg
                            className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-gray-500"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M5.23 7.21a.75.75 0 011.06-.02L10 10.585l3.72-3.394a.75.75 0 111.06 1.06l-4.25 3.882a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>

                    <div className="relative w-full">
                        <select
                            id="SelectProdi"
                            className="peer block w-full cursor-pointer appearance-none rounded-lg border border-gray-300 bg-gray-100 p-2.5 px-3 py-2 pt-5 text-sm text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                        >
                            <option>{fakultasProdi?.nama_prodi}</option>
                        </select>
                        <label
                            htmlFor="SelectProdi"
                            className="absolute start-2.5 top-4 z-10 origin-[0] -translate-y-3 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-3 peer-focus:scale-75 peer-focus:text-blue-600 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 dark:text-gray-400 peer-focus:dark:text-blue-500"
                        >
                            Program Studi
                        </label>
                        <svg
                            className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-gray-500"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M5.23 7.21a.75.75 0 011.06-.02L10 10.585l3.72-3.394a.75.75 0 111.06 1.06l-4.25 3.882a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>

                    <div className="relative w-full">
                        <select
                            id="SelectAngkatan"
                            value={selectedAngkatan}
                            onChange={(e) => handleAngkatanChange(e.target.value)}
                            className="peer block w-full cursor-pointer appearance-none rounded-lg border border-gray-300 p-2.5 px-3 py-2 pt-5 text-sm text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                        >
                            <option value="" selected disabled>
                                Pilih Angkatan
                            </option>
                            {years.map((year) => (
                                <option key={year} value={year}>
                                    {year}
                                </option>
                            ))}
                        </select>

                        <label
                            htmlFor="SelectAngkatan"
                            className="absolute start-2.5 top-4 z-10 origin-[0] -translate-y-3 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-3 peer-focus:scale-75 peer-focus:text-blue-600 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 dark:text-gray-400 peer-focus:dark:text-blue-500"
                        >
                            Angkatan
                        </label>
                        <svg
                            className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-gray-500"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M5.23 7.21a.75.75 0 011.06-.02L10 10.585l3.72-3.394a.75.75 0 111.06 1.06l-4.25 3.882a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>

                    <div className="relative m-auto w-full">
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="default-search" className="sr-only text-sm font-medium text-gray-900 dark:text-white">
                                Search
                            </label>
                            <div className="relative">
                                <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
                                    <svg
                                        className="h-4 w-4 text-gray-500 dark:text-gray-400"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                        />
                                    </svg>
                                </div>
                                <input
                                    type="search"
                                    id="default-search"
                                    className="block w-full rounded-lg border border-gray-300 p-2.5 ps-9 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                                    placeholder="Name, NIM, NIK"
                                    name="abboya"
                                    value={data.abboya}
                                    onChange={(e) => setData('abboya', e.target.value)}
                                />
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="absolute end-1.5 bottom-1 cursor-pointer rounded-md bg-blue-700 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                >
                                    {processing ? 'Searching...' : 'Search'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    <table className="w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="w-5 border border-gray-300 px-2 py-1.5 text-xs">No</th>
                                <th className="border border-gray-300 px-2 py-1.5 text-xs">NIM</th>
                                <th className="border border-gray-300 px-2 py-1.5 text-xs">Nama</th>
                                <th className="border border-gray-300 px-2 py-1.5 text-xs">Kelas</th>
                                <th className="border border-gray-300 px-2 py-1.5 text-xs">Email</th>
                                <th className="border border-gray-300 px-2 py-1.5 text-xs">JK</th>
                                <th className="border border-gray-300 px-2 py-1.5 text-xs">Tanggal Lahir</th>
                                <th className="border border-gray-300 px-2 py-1.5 text-xs">No Hp</th>
                                <th className="border border-gray-300 px-2 py-1.5 text-xs">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mahasiswas.data.map((mhs, index) => (
                                <tr key={mhs.nim}>
                                    <td className="border border-gray-300 px-2 py-1.5 text-center text-xs">{index + 1}</td>
                                    <td className="border border-gray-300 px-2 py-1.5 text-center text-xs">{mhs.nim}</td>
                                    <td className="border border-gray-300 px-2 py-1.5 text-xs">{mhs.user?.name || '-'}</td>
                                    <td className="border border-gray-300 px-2 py-1.5 text-center text-xs">{mhs.kelas}</td>
                                    <td className="border border-gray-300 px-2 py-1.5 text-xs">{mhs.user?.email || '-'}</td>
                                    <td className="border border-gray-300 px-2 py-1.5 text-center text-xs">{mhs.jenis_kelamin}</td>
                                    <td className="border border-gray-300 px-2 py-1.5 text-xs">{mhs.tanggal_lahir}</td>
                                    <td className="border border-gray-300 px-2 py-1.5 text-xs">{mhs.angkatan}</td>
                                    <td className="border border-gray-300 px-2 text-center text-xs">
                                        <DropdownMenu.Root>
                                            <DropdownMenu.Trigger asChild>
                                                <button className="cursor-pointer rounded-full bg-gray-200 p-1 hover:bg-gray-300">
                                                    <MoreHorizontal className="h-3 w-3" />
                                                </button>
                                            </DropdownMenu.Trigger>

                                            <DropdownMenu.Portal>
                                                <DropdownMenu.Content className="z-50 w-32 rounded-md bg-white p-1 shadow-md">
                                                    <DropdownMenu.Item className="hover:bo cursor-pointer px-3 py-2 text-sm hover:bg-gray-100">
                                                        Detail
                                                    </DropdownMenu.Item>
                                                    <DropdownMenu.Item className="cursor-pointer px-3 py-2 text-sm hover:bg-gray-100">
                                                        Edit
                                                    </DropdownMenu.Item>
                                                    <DropdownMenu.Item className="cursor-pointer px-3 py-2 text-sm text-red-500 hover:bg-red-100">
                                                        Hapus
                                                    </DropdownMenu.Item>
                                                </DropdownMenu.Content>
                                            </DropdownMenu.Portal>
                                        </DropdownMenu.Root>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="mt-4 flex justify-center">
                    {mahasiswas?.links?.map((link, index) => (
                        <button
                            key={index}
                            onClick={() => link.url && (window.location.href = link.url)}
                            disabled={!link.url}
                            className={`mx-1 cursor-pointer rounded-lg px-3 py-1 text-xs ${link.active ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
