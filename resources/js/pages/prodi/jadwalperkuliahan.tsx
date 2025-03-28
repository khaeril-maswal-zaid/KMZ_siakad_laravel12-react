import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Jadwal Perkuliahan',
        href: '/dashboard-prodi',
    },
];

export default function jadwalPerkuliahan() {
    const { konfigurasi, fakultasProdi, flash } = usePage<SharedData>().props;
    const { resulstApiJadwal, programAngkatan } = usePage().props;

    const [showAlert, setShowAlert] = useState(true);

    const years = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i);

    const [selectedAngkatan, setSelectedAngkatan] = useState();
    const [selectedKelas, setSelectedKelas] = useState();

    const handleAngkatanChange = (year) => {
        setSelectedAngkatan(year);
        handleFilter(year, selectedKelas);
    };

    const handleKelasChange = (kelas) => {
        setSelectedKelas(kelas);
        if (selectedAngkatan) {
            handleFilter(selectedAngkatan, kelas);
        }
    };

    const handleFilter = (year, kelas) => {
        router.get(route('jadwalperkuliahan.index'), { angkatan: year, kelas: kelas }, { preserveState: true });
    };

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

                <div className="grid auto-rows-min gap-4 md:grid-cols-5">
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
                            id="SelectTahunAjaran"
                            className="peer block w-full cursor-pointer appearance-none rounded-lg border border-gray-300 bg-gray-100 p-2.5 px-3 py-2 pt-5 text-sm text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                        >
                            <option value="">{konfigurasi.tahun_ajar}</option>
                        </select>

                        <label
                            htmlFor="SelectTahunAjaran"
                            className="absolute start-2.5 top-4 z-10 origin-[0] -translate-y-3 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-3 peer-focus:scale-75 peer-focus:text-blue-600 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 dark:text-gray-400 peer-focus:dark:text-blue-500"
                        >
                            Tahun Ajaran
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
                            <option value="">Pilih Angkatan</option>
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

                    <div className="relative w-full">
                        <select
                            value={selectedKelas}
                            onChange={(e) => {
                                handleKelasChange(e.target.value);
                            }}
                            id="SelectKelas"
                            className="peer block w-full cursor-pointer appearance-none rounded-lg border border-gray-300 p-2.5 px-3 py-2 pt-5 text-sm text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                        >
                            <option value="">Pilih Kelas</option>
                            {['A', 'B', 'C', 'D', 'E', 'F', 'G'].map((klas) => (
                                <option key={klas} value={klas}>
                                    {klas}
                                </option>
                            ))}
                        </select>
                        <label
                            htmlFor="SelectKelas"
                            className="absolute start-2.5 top-4 z-10 origin-[0] -translate-y-3 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-3 peer-focus:scale-75 peer-focus:text-blue-600 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 dark:text-gray-400 peer-focus:dark:text-blue-500"
                        >
                            Kelas
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
                </div>

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
                            <tr>
                                <td className="pe-3 pb-1">Angkatan/ Kelas</td>
                                <td className="pe-2 pb-1">:</td>
                                <td className="pb-1">
                                    {selectedAngkatan}/ {selectedKelas}
                                </td>
                            </tr>
                            <tr>
                                <td className="pe-3">Keti/ No. Hp</td>
                                <td className="pe-2">:</td>
                                <td className="">[BELUM]</td>
                            </tr>
                        </tbody>
                    </table>

                    <table className="w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="w-1.5 border border-gray-300 px-4 py-1.5 text-xs">No</th>
                                <th className="w-1/5 border border-gray-300 px-4 py-1.5 text-xs">Mata Kuliah</th>
                                <th className="w-1/12 border border-gray-300 px-4 py-1.5 text-xs">SKS</th>
                                <th className="w-1/12 border border-gray-300 px-4 py-1.5 text-xs">Semester</th>
                                <th className="w-1/5border border-gray-300 px-4 py-1.5 text-xs">Dosen</th>
                                <th className="w-1/10 border border-gray-300 px-4 py-1.5 text-xs">Hari</th>
                                <th className="w-1/10 border border-gray-300 px-4 py-1.5 text-xs">Waktu</th>
                                <th className="w-1/10 border border-gray-300 px-4 py-1.5 text-xs">Ruangan</th>
                            </tr>
                        </thead>
                        <tbody>
                            {programAngkatan.length > 0 ? (
                                programAngkatan.map((data, index) => {
                                    const jadwal = resulstApiJadwal.find((item) => item.program_angkatan_id === data.id) || {};

                                    return (
                                        <tr key={data.id || index}>
                                            <td className="border border-gray-300 px-2.5 py-1.5 text-center text-xs text-gray-700 dark:text-gray-600">
                                                {index + 1}
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
                                            <td className="border border-gray-300 px-2.5 py-1.5 text-center text-xs text-gray-700 dark:text-gray-600">
                                                {(jadwal.dosen?.user?.name || '') +
                                                    (jadwal.dosen?.user?.name && jadwal.dosen?.nidn ? ' _ ' : '') +
                                                    (jadwal.dosen?.nidn || '')}
                                            </td>
                                            <td className="border border-gray-300 px-2.5 py-1.5 text-center text-xs text-gray-700 dark:text-gray-600">
                                                {jadwal.hari}
                                            </td>
                                            <td className="border border-gray-300 px-2.5 py-1.5 text-center text-xs text-gray-700 dark:text-gray-600">
                                                {jadwal.waktu}
                                            </td>
                                            <td className="border border-gray-300 px-2.5 py-1.5 text-center text-xs text-gray-700 dark:text-gray-600">
                                                {jadwal.ruangan}
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan={8} className="border border-gray-300 px-4 py-7 text-center text-sm">
                                        Pilih Angkatan & kelas
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}
