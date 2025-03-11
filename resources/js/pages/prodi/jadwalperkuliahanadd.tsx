import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';

// Interface untuk type data tiap baris jadwal
interface ScheduleRow {
    id: number | '';
    dosen: number | '';
    program_angkatan_id: number | '';
    hari: string;
    waktu: string;
    ruangan: string;
    kelas: string;
    tahun_ajaran?: string;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Tambah Jadwal Perkuliahan',
        href: '/dashboard-prodi',
    },
];

export default function jadwalPerkuliahan() {
    const { fakultasProdi, tahunAjaran, dosens, resultApiMatkuls, resultApijadwalMatkul } = usePage().props;
    const { errors } = usePage().props;

    // Autofocus pada input pertama
    const firstInputRef = useRef(null);
    useEffect(() => {
        if (firstInputRef.current) {
            firstInputRef.current.focus();
        }
    }, [resultApiMatkuls]);

    // State untuk menyimpan data tiap baris di tabel
    const [rows, setRows] = useState<ScheduleRow[]>([]);

    useEffect(() => {
        setRows(
            resultApiMatkuls.map((data) => {
                // Cari data jadwal yang sudah tersimpan untuk tiap baris
                const jadwal = resultApijadwalMatkul.find((item) => item.program_angkatan_id === data.id) || {};
                return {
                    id: jadwal.id || '',
                    dosen: jadwal.dosen_user_id || '',
                    program_angkatan_id: data.id || '',
                    hari: jadwal.hari || '',
                    waktu: jadwal.waktu || '',
                    ruangan: jadwal.ruangan || '',
                    kelas: jadwal.kelas || '', // atau bisa diisi dengan selectedKelas jika perlu
                };
            }),
        );
    }, [resultApiMatkuls, resultApijadwalMatkul]);

    // Handler untuk update data tiap baris
    const handleRowChange = (index: number, field: keyof ScheduleRow, value: any) => {
        setRows((prevRows) => {
            const newRows = [...prevRows];
            newRows[index] = { ...newRows[index], [field]: value };
            return newRows;
        });
    };

    // State untuk menyimpan error validasi
    const [errorsf, setErrors] = useState({});

    // Handler untuk submit data
    const handleSubmit = () => {
        // Cek apakah kelas sudah dipilih
        if (!selectedKelas) {
            setErrors((prev) => ({ ...prev, kelas: 'Kelas harus dipilih.' }));
            return; // hentikan submit
        } else {
            setErrors((prev) => ({ ...prev, kelas: '' }));
        }

        // Cek apakah semester sudah dipilih
        if (!selectedSemester) {
            setErrors((prev) => ({ ...prev, semester: 'Semester harus dipilih.' }));
            return; // hentikan submit
        } else {
            setErrors((prev) => ({ ...prev, semester: '' }));
        }

        // Gabungkan data untuk tiap row
        const schedules = rows.map((row) => ({
            ...row,
            dosen: row.dosen !== '' ? Number(row.dosen) : '',
            tahun_ajaran: tahunAjaran?.tahun_ajar,
            kelas: selectedKelas,
        }));

        // Cek apakah data jadwal sudah ada
        if (resultApijadwalMatkul.length === 0) {
            // Kirim data ke backend:
            router.post(route('jadwalperkuliahan.store'), { schedules });
            return;
        } else {
            router.post(route('jadwalperkuliahan.update'), { schedules });
        }
    };

    //-------------------------------------------
    const [selectedKelas, setSelectedKelas] = useState();
    const [selectedSemester, setSelectedSemester] = useState();

    const handleKelasChange = (kelas) => {
        setSelectedKelas(kelas);
        if (selectedSemester) {
            handleFilter(selectedSemester, kelas, tahunAjaran?.tahun_ajar);
        }
    };

    const handleSemesterChange = (semester, tahunAjaran) => {
        setSelectedSemester(semester);
        handleFilter(semester, selectedKelas, tahunAjaran?.tahun_ajar);

        // if (selectedKelas) {
        //     handleFilter(semester, selectedKelas, tahunAjaran?.tahun_ajar);
        // }
    };

    const handleFilter = (semester, kelas, tahunAjaran) => {
        router.get(route('jadwalperkuliahan.create'), { semester: semester, kelas: kelas, tahunAjaran: tahunAjaran }, { preserveState: true });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                {Object.keys(errors).length > 0 && (
                    <div className="alert alert-danger">
                        <ul>
                            {Object.values(errors)
                                .flat()
                                .map((error, index) => (
                                    <li key={index}>{error}</li>
                                ))}
                        </ul>
                    </div>
                )}

                <div className="grid auto-rows-min gap-2.5 md:grid-cols-5">
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
                            className="peer block w-full appearance-none rounded-lg border border-gray-300 bg-gray-100 p-2.5 px-3 py-2 pt-5 text-sm text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
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
                        <select className="peer block w-full appearance-none rounded-lg border border-gray-300 bg-gray-100 p-2.5 px-3 py-2 pt-5 text-sm text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500">
                            <option value="">{tahunAjaran?.tahun_ajar}</option>
                        </select>
                        <label
                            htmlFor="SelectAngkatan"
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
                            onChange={(e) => handleSemesterChange(e.target.value, tahunAjaran?.tahun_ajar)}
                            className="peer block w-full cursor-pointer appearance-none rounded-lg border border-gray-300 p-2.5 px-3 py-2 pt-5 text-sm text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                        >
                            <option value="">Pilih Semester</option>
                            {[...Array(8)].map((_, i) => (
                                <option key={i} value={i + 1}>
                                    {i + 1}
                                </option>
                            ))}
                        </select>
                        <label
                            htmlFor="SelectAngkatan"
                            className="absolute start-2.5 top-4 z-10 origin-[0] -translate-y-3 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-3 peer-focus:scale-75 peer-focus:text-blue-600 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 dark:text-gray-400 peer-focus:dark:text-blue-500"
                        >
                            Semester
                        </label>
                        {errorsf.semester && <span className="mt-1 block text-xs text-red-500">{errorsf.semester}</span>}
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
                                // Reset error jika user sudah memilih
                                if (e.target.value) {
                                    setErrors((prev) => ({ ...prev, kelas: '' }));
                                }
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
                        {errorsf.kelas && <span className="mt-1 block text-xs text-red-500">{errorsf.kelas}</span>}
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
                    <table className="w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-gray-300 px-4 py-1.5 text-xs">No</th>
                                <th className="border border-gray-300 px-4 py-1.5 text-xs">Mata Kuliah</th>
                                <th className="border border-gray-300 px-4 py-1.5 text-xs">Dosen</th>
                                <th className="border border-gray-300 px-4 py-1.5 text-xs">Hari</th>
                                <th className="border border-gray-300 px-4 py-1.5 text-xs">Waktu</th>
                                <th className="border border-gray-300 px-4 py-1.5 text-xs">Ruangan</th>
                            </tr>
                        </thead>
                        <tbody>
                            {resultApiMatkuls.map((data, index) => {
                                // Cari jadwal yang sudah tersimpan berdasarkan program_angkatan_id
                                const jadwal = resultApijadwalMatkul.find((item) => item.program_angkatan_id === data.id) || {};

                                return (
                                    <tr key={data.id || index}>
                                        <td className="border border-gray-300 px-4 text-center text-xs">{index + 1}</td>

                                        <td className="w-1/4 border border-gray-300 px-4 text-xs">
                                            {data.mata_kuliah?.nama_matkul}
                                            <input type="hidden" name={`rows[${index}].program_angkatan_id`} value={data.id || ''} />
                                            <input type="hidden" name={`rows[${index}].id`} value={jadwal.id || ''} />
                                        </td>

                                        <td className="w-1/4 pe-1 text-xs">
                                            <select
                                                id={`dosen-${index}`}
                                                name={`rows[${index}].dosen`}
                                                onChange={(e) => handleRowChange(index, 'dosen', e.target.value)}
                                                value={rows[index]?.dosen || jadwal.dosen_user_id || ''}
                                                className="block w-full cursor-pointer rounded-lg border border-gray-300 p-2 text-sm text-gray-900"
                                            >
                                                <option value="">Pilih Dosen</option>
                                                {dosens.map((dosen, indexx) => (
                                                    <option key={indexx} value={dosen.id}>
                                                        {dosen.user?.name} - {dosen.nidn}
                                                    </option>
                                                ))}
                                            </select>
                                        </td>

                                        <td className="w-1/5 pe-1 text-xs">
                                            <select
                                                id={`hari-${index}`}
                                                name={`rows[${index}].hari`}
                                                onChange={(e) => handleRowChange(index, 'hari', e.target.value)}
                                                value={rows[index]?.hari || jadwal.hari || ''}
                                                className="block w-full cursor-pointer rounded-lg border border-gray-300 p-2 text-sm text-gray-900"
                                            >
                                                <option value="">Pilih Hari</option>
                                                <option value="Senin">Senin</option>
                                                <option value="Selasa">Selasa</option>
                                                <option value="Rabu">Rabu</option>
                                                <option value="Kamis">Kamis</option>
                                                <option value="Jumat">Jumat</option>
                                                <option value="Sabtu">Sabtu</option>
                                            </select>
                                        </td>

                                        <td className="pe-1 text-xs">
                                            <input
                                                type="text"
                                                name={`rows[${index}].waktu`}
                                                onChange={(e) => handleRowChange(index, 'waktu', e.target.value)}
                                                value={rows[index]?.waktu || jadwal.waktu || ''}
                                                className="block w-full rounded-lg border border-gray-300 p-2 text-xs text-gray-900"
                                                ref={index === 0 ? firstInputRef : null}
                                            />
                                        </td>

                                        <td className="text-xs">
                                            <input
                                                type="text"
                                                name={`rows[${index}].ruangan`}
                                                onChange={(e) => handleRowChange(index, 'ruangan', e.target.value)}
                                                value={rows[index]?.ruangan || jadwal.ruangan || ''}
                                                className="block w-full rounded-lg border border-gray-300 p-2 text-xs text-gray-900"
                                            />
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                <button
                    onClick={handleSubmit}
                    className="cursor-pointer rounded-md bg-green-700 px-3 py-2 text-sm font-medium text-white hover:bg-green-800 focus:ring-4 focus:ring-green-300 focus:outline-none dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                >
                    Simpan Jadwal
                </button>
            </div>
        </AppLayout>
    );
}
