import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';

import BimbinganProposal from '../../components/kmz_mahasiswa_skripsi/bimbingan_proposal';
import BimbinganSkripsi from '../../components/kmz_mahasiswa_skripsi/bimbingan_skripsi';
import DaftarHasil from '../../components/kmz_mahasiswa_skripsi/daftar_hasil';
import DaftarProposal from '../../components/kmz_mahasiswa_skripsi/daftar_proposal';
import DaftarTutup from '../../components/kmz_mahasiswa_skripsi/daftar_tutup';
import Pengajuan from '../../components/kmz_mahasiswa_skripsi/pengajuan';
import UHasil from '../../components/kmz_mahasiswa_skripsi/u_hasil';
import UProposal from '../../components/kmz_mahasiswa_skripsi/u_proposal';
import UTutup from '../../components/kmz_mahasiswa_skripsi/u_tutup';

import FormBimbinganProposal from '../../components/kmz_mahasiswa_formskripsi/bimbingan_proposal';
import FormBimbinganSkripsi from '../../components/kmz_mahasiswa_formskripsi/bimbingan_skripsi';
import FormDaftarHasil from '../../components/kmz_mahasiswa_formskripsi/daftar_hasil';
import FormDaftarProposal from '../../components/kmz_mahasiswa_formskripsi/daftar_proposal';
import FormDaftarTutup from '../../components/kmz_mahasiswa_formskripsi/daftar_tutup';
import FormPengajuan from '../../components/kmz_mahasiswa_formskripsi/pengajuan';
import FormUHasil from '../../components/kmz_mahasiswa_formskripsi/u_hasil';
import FormUProposal from '../../components/kmz_mahasiswa_formskripsi/u_proposal';
import FormUTutup from '../../components/kmz_mahasiswa_formskripsi/u_tutup';

import STATUS from '@/constants/status';
import { useState } from 'react';

export default function CardSkripsi() {
    const { konfigurasi, fakultasProdi, flash, auth } = usePage<SharedData>().props;
    const { title, resercher } = usePage().props;
    const { errors } = usePage().props; // ← Inertia shared errors
    const [showAlert, setShowAlert] = useState(true);

    const statusComponents = {
        [STATUS.PENENTUAN_PEMBIMBING]: <Pengajuan />,
        [STATUS.BIMBINGAN_PROPOSAL]: <BimbinganProposal />,
        [STATUS.MENDAFTAR_U_PROPOSAL]: <DaftarProposal />,
        [STATUS.TELAH_U_PROPOSAL]: <UProposal />,
        [STATUS.BIMBINGAN_SKRIPSI]: <BimbinganSkripsi />,
        [STATUS.MENDAFTAR_U_HASIL]: <DaftarHasil />,
        [STATUS.TELAH_U_HASIL]: <UHasil />,
        [STATUS.MENDAFTAR_U_TUTUP]: <DaftarTutup />,
        [STATUS.SKRIPSI_FINAL]: <UTutup />,
    };

    const FomrComponents = {
        [STATUS.PENENTUAN_PEMBIMBING]: <FormPengajuan />,
        [STATUS.BIMBINGAN_PROPOSAL]: <FormBimbinganProposal />,
        [STATUS.MENDAFTAR_U_PROPOSAL]: <FormDaftarProposal />,
        [STATUS.TELAH_U_PROPOSAL]: <FormUProposal />,
        [STATUS.BIMBINGAN_SKRIPSI]: <FormBimbinganSkripsi />,
        [STATUS.MENDAFTAR_U_HASIL]: <FormDaftarHasil />,
        [STATUS.TELAH_U_HASIL]: <FormUHasil />,
        [STATUS.MENDAFTAR_U_TUTUP]: <FormDaftarTutup />,
        [STATUS.SKRIPSI_FINAL]: <FormUTutup />,
    };

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: title,
            href: '/' + title.toLowerCase().replace(/ /g, '-'),
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Jadwal Mengajar" />

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

                {Object.keys(errors).length > 0 && (
                    <div className="mb-4 rounded-md border border-red-400 bg-red-100 p-4 text-sm text-red-700">
                        <ul className="list-disc pl-5">
                            {Object.entries(errors).map(([key, message], index) => (
                                <li key={index}>{message}</li>
                            ))}
                        </ul>
                    </div>
                )}

                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-md border md:min-h-min">
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
                </div>

                <div className="grid grid-cols-1 gap-6 p-1 md:grid-cols-2">
                    {resercher ? (
                        <>
                            {statusComponents[resercher.status]}
                            {FomrComponents[resercher.status]}
                        </>
                    ) : (
                        <>
                            <Pengajuan />
                            <FormPengajuan />
                        </>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
