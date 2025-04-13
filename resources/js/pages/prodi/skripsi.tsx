import { DialogHeader } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Button } from '@headlessui/react';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { Dialog, DialogContent, DialogDescription, DialogOverlay, DialogPortal, DialogTitle } from '@radix-ui/react-dialog';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { FileCheck2, FileSignature, MoreHorizontal, UserCog, Users, X } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Progres Skripsi Mahasiswa',
        href: '/dashboard-prodi',
    },
];

export default function jadwalPerkuliahan() {
    const { konfigurasi, fakultasProdi, flash, auth } = usePage<SharedData>().props;
    const { resercher, role, dosens } = usePage().props;
    const years = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i);

    const [selectedAngkatan, setSelectedAngkatan] = useState();

    const handleAngkatanChange = (year) => {
        setSelectedAngkatan(year);
        handleFilter(year);
    };

    const handleFilter = (year) => {
        if (auth.user?.role == 'dosen') {
            router.get(route('skripsi.pembimbing'), { angkatan: year }, { preserveState: true });
        } else if (auth.user?.role == 'prodi') {
            router.get(route('skripsi.index'), { angkatan: year }, { preserveState: true });
        }
    };

    // ---------------------------------------------------------------
    const { data, setData, get, processing } = useForm({
        abboya: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (auth.user?.role == 'dosen') {
            get(route('skripsi.pembimbing'));
        } else if (auth.user?.role == 'prodi') {
            get(route('skripsi.index'));
        }
    };

    // ---------------------------------------------------------------
    const [openPembimbing, setOpenPembimbing] = useState(false);
    const [selectedMhs, setSelectedMhs] = useState(null); // untuk mahasiswa yang dipilih
    const [errorsf, setErrors] = useState({});

    // useForm khusus untuk data pembimbing agar tidak bentrok dengan form abboya
    const {
        data: pembData,
        setData: setPembData,
        patch: patchPemb,
        processing: processingPemb,
        reset: resetPemb,
        errors: pembErrors,
    } = useForm({
        pembimbing1: '',
        pembimbing2: '',
        mahasiswa_user_id: '',
        id_skripsi: '',
    });

    const handleSubmitPembimbing = (e: React.FormEvent) => {
        e.preventDefault();

        patchPemb(route('skripsi.update', pembData.id_skripsi), {
            preserveScroll: true,
            onSuccess: () => {
                setOpenPembimbing(false);
                resetPemb();
            },
            onError: () => {
                //
            },
        });
    };

    // ---------------------------------------------------------------
    const [openPenguji, setOpenPenguji] = useState(false);
    const [pengSelectedMhs, pengSetSelectedMhs] = useState(null); // untuk mahasiswa yang dipilih

    // useForm khusus untuk data pembimbing agar tidak bentrok dengan form abboya
    const {
        data: pengData,
        setData: setPengData,
        patch: patchPeng,
        processing: processingPeng,
        reset: resetPeng,
        errors: pengErrors,
    } = useForm({
        penguji1: '',
        penguji2: '',
        tanggalujian: '',
        mahasiswa_user_id: '',
        id_skripsi: '',
    });

    const handleSubmitPenguji = (e: React.FormEvent) => {
        e.preventDefault();

        patchPeng(route('skripsi.propsal', pengData.id_skripsi), {
            preserveScroll: true,
            onSuccess: () => {
                setOpenPenguji(false);
                resetPeng();
            },
            onError: (pengErrors) => {},
        });
    };

    // ---------------------------------------------------------------
    const [openPengujiHasil, setOpenPengujiHasil] = useState(false);
    const [hasSelectedMhs, hasSetSelectedMhs] = useState(null); // untuk mahasiswa yang dipilih

    // useForm khusus untuk data pembimbing agar tidak bentrok dengan form abboya
    const {
        data: hasData,
        setData: setHasData,
        patch: patchHas,
        processing: processingHas,
        reset: resetHas,
        errors: hasErrors,
    } = useForm({
        penguji1: '',
        penguji2: '',
        penguji3: '',
        penguji4: '',
        tanggalujian: '',
        mahasiswa_user_id: '',
        id_skripsi: '',
    });

    const handleSubmitPengujiHasil = (e: React.FormEvent) => {
        e.preventDefault();

        patchHas(route('skripsi.hasil', pengData.id_skripsi), {
            preserveScroll: true,
            onSuccess: () => {
                setOpenPengujiHasil(false);
                resetHas();
            },
            onError: (pengErrors) => {
                console.log(pengErrors);
            },
        });
    };

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

                <div className="grid auto-rows-min gap-4 md:grid-cols-4">
                    <div className="relative w-full">
                        <select
                            id="selectProdi"
                            className="peer block w-full appearance-none rounded-lg border border-gray-300 bg-gray-100 p-2.5 px-3 py-2 pt-5 text-sm text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-900 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
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
                            className="peer block w-full cursor-pointer appearance-none rounded-lg border border-gray-300 bg-gray-100 p-2.5 px-3 py-2 pt-5 text-sm text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-900 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
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
                            <option value="" disabled>
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
                                    autoFocus
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
                                <th className="w-5 border border-gray-300 px-2 py-1.5 text-xs dark:border-gray-400 dark:text-gray-900">No</th>
                                <th className="border border-gray-300 px-2 py-1.5 text-xs dark:border-gray-400 dark:text-gray-900">Nama</th>
                                <th className="border border-gray-300 px-2 py-1.5 text-xs dark:border-gray-400 dark:text-gray-900">NIM</th>
                                <th className="border border-gray-300 px-2 py-1.5 text-xs dark:border-gray-400 dark:text-gray-900">Kelas</th>
                                <th className="border border-gray-300 px-2 py-1.5 text-xs dark:border-gray-400 dark:text-gray-900">Judul</th>
                                <th className="border border-gray-300 px-2 py-1.5 text-xs text-nowrap dark:border-gray-400 dark:text-gray-900">
                                    Pembimbing I
                                </th>
                                <th className="border border-gray-300 px-2 py-1.5 text-xs text-nowrap dark:border-gray-400 dark:text-gray-900">
                                    Pembimbing II
                                </th>
                                <th className="border border-gray-300 px-2 py-1.5 text-xs dark:border-gray-400 dark:text-gray-900">Status Progres</th>
                                {role == 'prodi' && (
                                    <th className="border border-gray-300 px-2 py-1.5 text-xs dark:border-gray-400 dark:text-gray-900">Aksi</th>
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {resercher.data.map((item, index) => (
                                <tr key={index}>
                                    <td className="border border-gray-300 px-2 py-1.5 text-center text-xs">{index + 1}</td>
                                    <td className="border border-gray-300 px-2 py-1.5 text-xs text-nowrap">{item.mahasiswa?.user?.name || '-'}</td>
                                    <td className="border border-gray-300 px-2 py-1.5 text-center text-xs">{item.mahasiswa?.nim}</td>
                                    <td className="border border-gray-300 px-2 py-1.5 text-center text-xs text-nowrap">
                                        {item.mahasiswa?.angkatan + '/' + item.mahasiswa?.kelas}
                                    </td>
                                    <td className="border border-gray-300 px-2 py-1.5 text-xs">{item.judul}</td>
                                    <td className="border border-gray-300 px-2 py-1.5 text-xs text-nowrap">{item.dosen1?.user?.name}</td>
                                    <td className="border border-gray-300 px-2 py-1.5 text-xs text-nowrap">{item.dosen2?.user?.name}</td>
                                    <td className="border border-gray-300 px-2 py-1.5 text-center text-xs text-nowrap">{item.status}</td>
                                    {role == 'prodi' && (
                                        <td className="border border-gray-300 px-2 text-center text-xs">
                                            <DropdownMenu.Root>
                                                <DropdownMenu.Trigger asChild>
                                                    <button className="cursor-pointer rounded-full bg-gray-100 p-1 transition hover:bg-gray-200">
                                                        <MoreHorizontal className="h-4 w-4 text-gray-600" />
                                                    </button>
                                                </DropdownMenu.Trigger>

                                                <DropdownMenu.Portal>
                                                    <DropdownMenu.Content
                                                        className="animate-in fade-in zoom-in-95 z-50 w-48 rounded-xl border border-gray-200 bg-white p-1 shadow-lg"
                                                        sideOffset={8}
                                                    >
                                                        <DropdownMenu.Item
                                                            onSelect={() => {
                                                                setSelectedMhs(item.mahasiswa);
                                                                setOpenPembimbing(true);
                                                                setPembData('mahasiswa_user_id', item.mahasiswa?.id);
                                                                setPembData('id_skripsi', item.id);
                                                            }}
                                                            className="group flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-xs text-gray-900 transition-colors hover:bg-gray-100"
                                                        >
                                                            <UserCog className="h-4 w-4 text-gray-900 group-hover:text-blue-900" />
                                                            Atur Pembimbing
                                                        </DropdownMenu.Item>

                                                        <DropdownMenu.Item
                                                            onSelect={() => {
                                                                pengSetSelectedMhs(item.mahasiswa);
                                                                setOpenPenguji(true);
                                                                setPengData('mahasiswa_user_id', item.mahasiswa?.id);
                                                                setPengData('id_skripsi', item.id);
                                                            }}
                                                            className="group flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-xs text-gray-900 transition-colors hover:bg-gray-100"
                                                        >
                                                            <Users className="h-4 w-4 text-gray-900 group-hover:text-yellow-900" />
                                                            Atur Penguji U-Proposal
                                                        </DropdownMenu.Item>

                                                        <DropdownMenu.Item
                                                            onSelect={() => {
                                                                hasSetSelectedMhs(item.mahasiswa);
                                                                setOpenPengujiHasil(true);
                                                                setHasData('mahasiswa_user_id', item.mahasiswa?.id);
                                                                setHasData('id_skripsi', item.id);
                                                            }}
                                                            className="group flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-xs text-gray-900 transition-colors hover:bg-gray-100"
                                                        >
                                                            <FileCheck2 className="h-4 w-4 text-gray-900 group-hover:text-green-900" />
                                                            Atur Penguji U-Hasil
                                                        </DropdownMenu.Item>

                                                        <DropdownMenu.Item className="group flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-xs text-gray-900 transition-colors hover:bg-gray-100">
                                                            <FileSignature className="h-4 w-4 text-gray-900 group-hover:text-purple-900" />
                                                            Input Nilai
                                                        </DropdownMenu.Item>
                                                    </DropdownMenu.Content>
                                                </DropdownMenu.Portal>
                                            </DropdownMenu.Root>
                                        </td>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="mt-4 flex justify-center">
                    {resercher?.links?.map((link, index) => (
                        <button
                            key={index}
                            onClick={() => link.url && (window.location.href = link.url)}
                            disabled={!link.url}
                            className={`mx-1 cursor-pointer rounded-lg px-3 py-1 text-xs ${link.active ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:text-gray-900'}`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ))}
                </div>

                <Dialog open={openPembimbing} onOpenChange={() => {}}>
                    <DialogPortal>
                        {/* Overlay dengan blur dan click-handler untuk animasi */}
                        <DialogOverlay
                            className="fixed inset-0 z-40 bg-black/40"
                            onClick={() => {
                                const content = document.getElementById('pembimbing-dialog');
                                if (content) {
                                    content.classList.remove('once-pulse');
                                    void content.offsetWidth; // Trigger reflow
                                    content.classList.add('once-pulse');
                                }
                            }}
                        />

                        <DialogContent
                            id="pembimbing-dialog"
                            className="animate-in fade-in zoom-in-90 fixed top-1/2 left-1/2 z-50 w-full max-w-xl -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-gray-200 bg-white px-6 py-5 shadow-xl transition-all focus:outline-none"
                        >
                            {/* Tombol Close */}
                            <button
                                onClick={() => setOpenPembimbing(false)}
                                className="absolute top-4 right-4 rounded-full p-1 text-gray-500 transition hover:bg-gray-100 hover:text-gray-800"
                                aria-label="Close"
                            >
                                <X className="h-4 w-4" />
                            </button>

                            <form onSubmit={handleSubmitPembimbing}>
                                {/* Header */}
                                <div className="border-b bg-white px-6 py-4">
                                    <DialogHeader>
                                        <DialogTitle className="flex items-center gap-2 text-xl font-semibold text-gray-700">
                                            <Users className="mb-1 h-5 w-5" />
                                            Atur Pembimbing
                                        </DialogTitle>
                                        <DialogDescription className="text-muted-foreground mt-1 text-sm">
                                            {selectedMhs ? (
                                                <>
                                                    <span className="block font-medium text-gray-700">{selectedMhs.user?.name}</span>
                                                    <span className="block text-xs text-gray-500">NIM: {selectedMhs.nim}</span>
                                                </>
                                            ) : (
                                                'Pilih mahasiswa dulu ya...'
                                            )}
                                        </DialogDescription>
                                    </DialogHeader>
                                </div>

                                {/* Body */}
                                <div className="border-b bg-gray-50 px-6 py-6">
                                    <div className="grid gap-4 sm:grid-cols-2">
                                        {/* Pembimbing 1 */}
                                        <div>
                                            <label className="mb-1 block text-sm font-medium text-gray-700">Pembimbing 1</label>
                                            <Select value={pembData.pembimbing1} onValueChange={(val) => setPembData('pembimbing1', val)}>
                                                <SelectTrigger className="w-full rounded-lg border border-gray-300 text-sm shadow-sm focus:ring-1 focus:ring-blue-500 dark:text-gray-900">
                                                    <SelectValue placeholder="-- Pilih Dosen --" />
                                                </SelectTrigger>
                                                <SelectContent side="bottom">
                                                    {dosens.map((dosen) => (
                                                        <SelectItem key={dosen.id} value={String(dosen.id)}>
                                                            {dosen.user.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            {pembErrors.pembimbing1 && <div className="mt-2 text-xs text-red-500">{pembErrors.pembimbing1}</div>}
                                        </div>

                                        {/* Pembimbing 2 */}
                                        <div>
                                            <label className="mb-1 block text-sm font-medium text-gray-700">Pembimbing 2</label>
                                            <Select value={pembData.pembimbing2} onValueChange={(val) => setPembData('pembimbing2', val)}>
                                                <SelectTrigger className="w-full rounded-lg border border-gray-300 text-sm shadow-sm focus:ring-1 focus:ring-blue-500 dark:text-gray-900">
                                                    <SelectValue placeholder="-- Pilih Dosen --" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {dosens.map((dosen) => (
                                                        <SelectItem key={dosen.id} value={String(dosen.id)}>
                                                            {dosen.user.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            {pembErrors.pembimbing2 && <div className="mt-2 text-xs text-red-500">{pembErrors.pembimbing2}</div>}
                                        </div>
                                    </div>
                                </div>

                                {/* Footer */}
                                <div className="bg-white px-6 py-4 text-end">
                                    <Button
                                        type="submit"
                                        disabled={processingPemb}
                                        className="rounded-lg bg-blue-600 px-5 py-2 text-sm text-white shadow-sm transition hover:bg-blue-700"
                                    >
                                        {processingPemb ? 'Menyimpan...' : 'Simpan'}
                                    </Button>
                                </div>
                            </form>
                        </DialogContent>
                    </DialogPortal>
                </Dialog>

                <Dialog open={openPenguji} onOpenChange={() => {}}>
                    <DialogPortal>
                        {/* Overlay dengan blur dan click-handler untuk animasi */}
                        <DialogOverlay
                            className="fixed inset-0 z-40 bg-black/40"
                            onClick={() => {
                                const content = document.getElementById('penguji-dialog');
                                if (content) {
                                    content.classList.remove('once-pulse');
                                    void content.offsetWidth; // Trigger reflow
                                    content.classList.add('once-pulse');
                                }
                            }}
                        />

                        <DialogContent
                            id="penguji-dialog"
                            className="animate-in fade-in zoom-in-90 fixed top-1/2 left-1/2 z-50 w-full max-w-xl -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-gray-200 bg-white px-6 py-5 shadow-xl transition-all focus:outline-none"
                        >
                            {/* Tombol Close */}
                            <button
                                onClick={() => setOpenPenguji(false)}
                                className="absolute top-4 right-4 rounded-full p-1 text-gray-500 transition hover:bg-gray-100 hover:text-gray-800"
                                aria-label="Close"
                            >
                                <X className="h-4 w-4" />
                            </button>

                            <form onSubmit={handleSubmitPenguji}>
                                {/* Header */}
                                <div className="border-b bg-white px-6 py-4">
                                    <DialogHeader>
                                        <DialogTitle className="flex items-center gap-2 text-xl font-semibold text-gray-700">
                                            <Users className="mb-1 h-5 w-5" />
                                            Atur Dosen Penguji Ujian Proposal
                                        </DialogTitle>
                                        <DialogDescription className="text-muted-foreground mt-1 text-sm">
                                            {pengSelectedMhs ? (
                                                <>
                                                    <span className="block font-medium text-gray-700">{pengSelectedMhs.user?.name}</span>
                                                    <span className="block text-xs text-gray-500">NIM: {pengSelectedMhs.nim}</span>
                                                </>
                                            ) : (
                                                'Pilih mahasiswa dulu ya...'
                                            )}
                                        </DialogDescription>
                                    </DialogHeader>
                                </div>

                                {/* Body */}
                                <div className="border-b bg-gray-50 px-6 py-6">
                                    <div className="mb-5 grid gap-4 sm:grid-cols-2">
                                        {/* Penguji 1 */}
                                        <div>
                                            <label className="mb-1 block text-sm font-medium text-gray-700">Penguji 1</label>
                                            <Select value={pengData.penguji1} onValueChange={(val) => setPengData('penguji1', val)}>
                                                <SelectTrigger className="w-full rounded-lg border border-gray-300 bg-white text-sm shadow-sm focus:ring-1 focus:ring-blue-500">
                                                    <SelectValue placeholder="-- Pilih Dosen --" />
                                                </SelectTrigger>
                                                <SelectContent side="bottom">
                                                    {dosens.map((dosen) => (
                                                        <SelectItem key={dosen.id} value={String(dosen.id)}>
                                                            {dosen.user.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            {pengErrors.penguji1 && <div className="mt-2 text-xs text-red-500">{pengErrors.penguji1}</div>}
                                        </div>

                                        {/* Penguji 2 */}
                                        <div>
                                            <label className="mb-1 block text-sm font-medium text-gray-700">Penguji 2</label>
                                            <Select value={pengData.penguji2} onValueChange={(val) => setPengData('penguji2', val)}>
                                                <SelectTrigger className="w-full rounded-lg border border-gray-300 bg-white text-sm shadow-sm focus:ring-1 focus:ring-blue-500">
                                                    <SelectValue placeholder="-- Pilih Dosen --" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {dosens.map((dosen) => (
                                                        <SelectItem key={dosen.id} value={String(dosen.id)}>
                                                            {dosen.user.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            {pengErrors.penguji2 && <div className="mt-2 text-xs text-red-500">{pengErrors.penguji2}</div>}
                                        </div>
                                    </div>
                                    <div className="">
                                        <label className="mb-1 block text-sm font-medium text-gray-700">Tanggal Pelaksanaan Ujian</label>
                                        <input
                                            type="date"
                                            className={`w-full rounded-md border border-gray-300 p-2 text-sm shadow-sm focus:ring-1 focus:ring-blue-500`}
                                            value={pengData.tanggalujian}
                                            onChange={(e) => setPengData('tanggalujian', e.target.value)}
                                        />
                                        {pengErrors.tanggalujian && <div className="mt-1 text-xs text-red-500">{pengErrors.tanggalujian}</div>}
                                    </div>
                                </div>

                                {/* Footer */}
                                <div className="bg-white px-6 py-4 text-end">
                                    <Button
                                        type="submit"
                                        disabled={processingPemb}
                                        className="rounded-lg bg-blue-600 px-5 py-2 text-sm text-white shadow-sm transition hover:bg-blue-700"
                                    >
                                        {processingPemb ? 'Menyimpan...' : 'Simpan'}
                                    </Button>
                                </div>
                            </form>
                        </DialogContent>
                    </DialogPortal>
                </Dialog>

                <Dialog open={openPengujiHasil} onOpenChange={() => {}}>
                    <DialogPortal>
                        {/* Overlay dengan blur dan click-handler untuk animasi */}
                        <DialogOverlay
                            className="fixed inset-0 z-40 bg-black/40"
                            onClick={() => {
                                const content = document.getElementById('penguji-hasil-dialog');
                                if (content) {
                                    content.classList.remove('once-pulse');
                                    void content.offsetWidth; // Trigger reflow
                                    content.classList.add('once-pulse');
                                }
                            }}
                        />

                        <DialogContent
                            id="penguji-hasil-dialog"
                            className="animate-in fade-in zoom-in-90 fixed top-1/2 left-1/2 z-50 w-full max-w-xl -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-gray-200 bg-white px-6 py-5 shadow-xl transition-all focus:outline-none"
                        >
                            {/* Tombol Close */}
                            <button
                                onClick={() => setOpenPengujiHasil(false)}
                                className="absolute top-4 right-4 rounded-full p-1 text-gray-500 transition hover:bg-gray-100 hover:text-gray-800"
                                aria-label="Close"
                            >
                                <X className="h-4 w-4" />
                            </button>

                            <form onSubmit={handleSubmitPengujiHasil}>
                                {/* Header */}
                                <div className="border-b bg-white px-6 py-4">
                                    <DialogHeader>
                                        <DialogTitle className="flex items-center gap-2 text-xl font-semibold text-gray-700">
                                            <Users className="mb-1 h-5 w-5" />
                                            Atur Dosen Penguji Ujian Hasil
                                        </DialogTitle>
                                        <DialogDescription className="text-muted-foreground mt-1 text-sm">
                                            {hasSelectedMhs ? (
                                                <>
                                                    <span className="block font-medium text-gray-700">{hasSelectedMhs.user?.name}</span>
                                                    <span className="block text-xs text-gray-500">NIM: {hasSelectedMhs.nim}</span>
                                                </>
                                            ) : (
                                                'Pilih mahasiswa dulu ya...'
                                            )}
                                        </DialogDescription>
                                    </DialogHeader>
                                </div>

                                {/* Body */}
                                <div className="border-b bg-gray-50 px-6 py-6">
                                    <div className="mb-5 grid gap-4 sm:grid-cols-2">
                                        {/* Penguji 1 */}
                                        <div>
                                            <label className="mb-1 block text-sm font-medium text-gray-700">Penguji 1</label>
                                            <Select value={hasData.penguji1} onValueChange={(val) => setHasData('penguji1', val)}>
                                                <SelectTrigger className="w-full rounded-lg border border-gray-300 bg-white text-sm shadow-sm focus:ring-1 focus:ring-blue-500">
                                                    <SelectValue placeholder="-- Pilih Dosen --" />
                                                </SelectTrigger>
                                                <SelectContent side="bottom">
                                                    {dosens.map((dosen) => (
                                                        <SelectItem key={dosen.id} value={String(dosen.id)}>
                                                            {dosen.user.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            {hasErrors.penguji1 && <div className="mt-2 text-xs text-red-500">{hasErrors.penguji1}</div>}
                                        </div>

                                        {/* Penguji 2 */}
                                        <div>
                                            <label className="mb-1 block text-sm font-medium text-gray-700">Penguji 2</label>
                                            <Select value={hasData.penguji2} onValueChange={(val) => setHasData('penguji2', val)}>
                                                <SelectTrigger className="w-full rounded-lg border border-gray-300 bg-white text-sm shadow-sm focus:ring-1 focus:ring-blue-500">
                                                    <SelectValue placeholder="-- Pilih Dosen --" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {dosens.map((dosen) => (
                                                        <SelectItem key={dosen.id} value={String(dosen.id)}>
                                                            {dosen.user.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            {hasErrors.penguji2 && <div className="mt-2 text-xs text-red-500">{hasErrors.penguji2}</div>}
                                        </div>
                                        {/* Penguji 3 */}
                                        <div>
                                            <label className="mb-1 block text-sm font-medium text-gray-700">Penguji 3</label>
                                            <Select value={hasData.penguji3} onValueChange={(val) => setHasData('penguji3', val)}>
                                                <SelectTrigger className="w-full rounded-lg border border-gray-300 bg-white text-sm shadow-sm focus:ring-1 focus:ring-blue-500">
                                                    <SelectValue placeholder="-- Pilih Dosen --" />
                                                </SelectTrigger>
                                                <SelectContent side="bottom">
                                                    {dosens.map((dosen) => (
                                                        <SelectItem key={dosen.id} value={String(dosen.id)}>
                                                            {dosen.user.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            {hasErrors.penguji3 && <div className="mt-2 text-xs text-red-500">{hasErrors.penguji3}</div>}
                                        </div>

                                        {/* Penguji 4 */}
                                        <div>
                                            <label className="mb-1 block text-sm font-medium text-gray-700">Penguji 4</label>
                                            <Select value={hasData.penguji4} onValueChange={(val) => setHasData('penguji4', val)}>
                                                <SelectTrigger className="w-full rounded-lg border border-gray-300 bg-white text-sm shadow-sm focus:ring-1 focus:ring-blue-500">
                                                    <SelectValue placeholder="-- Pilih Dosen --" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {dosens.map((dosen) => (
                                                        <SelectItem key={dosen.id} value={String(dosen.id)}>
                                                            {dosen.user.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            {hasErrors.penguji4 && <div className="mt-2 text-xs text-red-500">{hasErrors.penguji4}</div>}
                                        </div>
                                    </div>
                                    <div className="">
                                        <label className="mb-1 block text-sm font-medium text-gray-700">Tanggal Pelaksanaan Ujian</label>
                                        <input
                                            type="date"
                                            className={`w-full rounded-md border border-gray-300 p-2 text-sm shadow-sm focus:ring-1 focus:ring-blue-500`}
                                            value={hasData.tanggalujian}
                                            onChange={(e) => setHasData('tanggalujian', e.target.value)}
                                        />
                                        {hasErrors.tanggalujian && <div className="mt-1 text-sm text-red-500">{hasErrors.tanggalujian}</div>}
                                    </div>
                                </div>

                                {/* Footer */}
                                <div className="bg-white px-6 py-4 text-end">
                                    <Button
                                        type="submit"
                                        disabled={processingPemb}
                                        className="rounded-lg bg-blue-600 px-5 py-2 text-sm text-white shadow-sm transition hover:bg-blue-700"
                                    >
                                        {processingPemb ? 'Menyimpan...' : 'Simpan'}
                                    </Button>
                                </div>
                            </form>
                        </DialogContent>
                    </DialogPortal>
                </Dialog>
            </div>
        </AppLayout>
    );
}
