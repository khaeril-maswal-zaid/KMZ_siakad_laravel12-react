import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Absensi Perkuliahan',
        href: '/absensi-perkuliahan',
    },
];

export default function AbsensiPerkuliahan() {
    const { konfigurasi, fakultasProdi, flash } = usePage<SharedData>().props;
    const { dataAbsensi, jadwalMatkul, paramAbsensiSession } = usePage().props;

    const [showAlert, setShowAlert] = useState(true);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Absensi Perkuliahan" />

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
                                <td className="w-auto pe-7 pb-1 whitespace-nowrap">{fakultasProdi?.fakultas?.nama_fakultas}</td>

                                <td className="w-28 pe-3 pb-1">Mata Kuliah</td>
                                <td className="w-2 pe-2 pb-1">:</td>
                                <td className="pe-9 pb-1">{jadwalMatkul.program_angkatan?.mata_kuliah?.nama_matkul}</td>
                            </tr>
                            <tr>
                                <td className="pe-3 pb-1">Program Studi</td>
                                <td className="pe-2 pb-1">:</td>
                                <td className="pb-1">{fakultasProdi?.nama_prodi}</td>

                                <td className="pe-3 pb-1">Dosen</td>
                                <td className="pe-2 pb-1">:</td>
                                <td className="pb-1">{jadwalMatkul.dosen?.user?.name}</td>
                            </tr>
                            <tr>
                                <td className="pe-3 pb-1">Angkatan/ Kelas</td>
                                <td className="pe-2 pb-1">:</td>
                                <td className="pb-1">
                                    {paramAbsensiSession.angkatan}/ {paramAbsensiSession.kelas}
                                </td>

                                <td className="pe-3 pb-1">NIDN</td>
                                <td className="pe-2 pb-1">:</td>
                                <td className="pb-1">{jadwalMatkul.dosen?.nidn}</td>
                            </tr>
                            <tr>
                                <td className="pe-3 pb-1">Keti/ No. Hp</td>
                                <td className="pe-2 pb-1">:</td>
                                <td className="pb-1">[BELUM]</td>

                                <td className="pe-3 pb-1">Tahun Ajaran</td>
                                <td className="pe-2 pb-1">:</td>
                                <td className="pb-1">{jadwalMatkul.tahun_ajaran}</td>
                            </tr>
                        </tbody>
                    </table>

                    <table className="min-w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100">
                                <th rowSpan={2} className="w-8 border border-gray-300 py-1.5 text-xs">
                                    No
                                </th>
                                <th rowSpan={2} className="w-1/7 border border-gray-300 px-4 py-1.5 text-xs">
                                    Nama
                                </th>
                                <th rowSpan={2} className="w-20 border border-gray-300 px-2 py-1.5 text-xs">
                                    NIM
                                </th>
                                <th colSpan={16} className="border border-gray-300 px-4 py-1.5 text-xs">
                                    Pertemuan
                                </th>
                                <th colSpan={4} className="w-28 border border-gray-300 px-4 py-1.5 text-xs">
                                    Rekapitulasi
                                </th>
                            </tr>
                            <tr className="bg-gray-100">
                                {[...Array(16)].map((_, index) => (
                                    <th key={index} className="w-10 border border-gray-300 py-1.5 text-xs">
                                        {index + 1}
                                    </th>
                                ))}
                                <th className="w-10 border border-gray-300 py-2 text-xs">Hadir</th>
                                <th className="w-10 border border-gray-300 py-2 text-xs">Sakit</th>
                                <th className="w-10 border border-gray-300 py-2 text-xs">Izin</th>
                                <th className="w-10 border border-gray-300 py-2 text-xs">Alpa</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dataAbsensi.map((mhs, index) => (
                                <tr key={mhs.id} className="text-sm">
                                    <td className="border border-gray-300 py-1.5 text-center text-xs">{index + 1}</td>
                                    <td className="border border-gray-300 px-2.5 py-1.5 text-xs">{mhs.user?.name}</td>
                                    <td className="border border-gray-300 px-2 py-1.5 text-center text-xs">{mhs.nim}</td>
                                    {/* Tampilkan data per pertemuan */}
                                    {[...Array(16)].map((_, i) => (
                                        <td key={i + 1} className="border border-gray-300 py-1.5 text-center text-xs">
                                            {mhs.absensi[i + 1]}
                                        </td>
                                    ))}
                                    {/* Tampilkan rekap */}
                                    <td className="border border-gray-300 px-2 py-1.5 text-center text-xs">{mhs.rekap_absensi.H}</td>
                                    <td className="border border-gray-300 px-2 py-1.5 text-center text-xs">{mhs.rekap_absensi.S}</td>
                                    <td className="border border-gray-300 px-2 py-1.5 text-center text-xs">{mhs.rekap_absensi.I}</td>
                                    <td className="border border-gray-300 px-2 py-1.5 text-center text-xs">{mhs.rekap_absensi.A}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}
