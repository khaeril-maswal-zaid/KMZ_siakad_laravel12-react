import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Buat Program Akademik Angkatan',
        href: '/program-angkatan',
    },
];

const semesters = [1, 2, 3, 4, 5, 6, 7, 8];

export default function programAngkatanCreate() {
    const { konfigurasi, fakultasProdi, flash, auth } = usePage<SharedData>().props;
    const { mataKuliahs, errors } = usePage().props;

    const years = Array.from({ length: 2 }, (_, i) => new Date().getFullYear() + i);

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedMatkul, setSelectedMatkul] = useState([]);
    const [angkatan, setAngkatan] = useState('');
    const [errorAngkatan, setErrorAngkatan] = useState(false); // untuk validasi angkatan
    const [errorProdi, setErrorProdi] = useState(false); // untuk validasi pemilihan mata kuliah (prodi)

    // Variabel untuk menyaring mata kuliah berdasarkan searchTerm
    const filteredMataKuliahs = mataKuliahs.filter(
        (matkul) =>
            matkul.nama_matkul.toLowerCase().includes(searchTerm.toLowerCase()) ||
            matkul.kode_matkul.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    // Tambah atau hapus mata kuliah ke daftar yang dipilih
    const handleSelectMatkul = (matkul) => {
        const isSelected = selectedMatkul.find((item) => item.id === matkul.id);
        if (isSelected) {
            setSelectedMatkul(selectedMatkul.filter((item) => item.id !== matkul.id));
        } else {
            setSelectedMatkul([...selectedMatkul, { ...matkul, semester: 1 }]);
        }
    };

    // Ubah semester pada mata kuliah yang dipilih
    const handleChangeSemester = (id, newSemester) => {
        setSelectedMatkul(selectedMatkul.map((item) => (item.id === id ? { ...item, semester: newSemester } : item)));
    };

    // Fungsi submit
    const handleSubmit = () => {
        let valid = true;
        if (!angkatan) {
            setErrorAngkatan(true);
            valid = false;
        } else {
            setErrorAngkatan(false);
        }
        if (selectedMatkul.length === 0) {
            setErrorProdi(true);
            valid = false;
        } else {
            setErrorProdi(false);
        }

        if (!valid) return;

        router.post(route('programangkatan.store', { angkatan, selectedMatkul }));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={breadcrumbs[0].title} />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                {Object.keys(errors).length > 0 && (
                    <div
                        className="mb-4 flex rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800 dark:bg-gray-800 dark:text-red-400"
                        role="alert"
                    >
                        <svg
                            className="me-3 mt-[2px] inline h-4 w-4 shrink-0"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                        </svg>
                        <span className="sr-only">Danger</span>
                        <div>
                            <span className="font-medium">Nilai Gagal Divalidasi:</span>
                            <ul className="mt-1.5 list-inside list-disc">
                                {Object.values(errors)
                                    .flat()
                                    .map((error, index) => (
                                        <li key={index}>{error}</li>
                                    ))}
                            </ul>
                        </div>
                    </div>
                )}

                <div className="container mx-auto p-4">
                    <div className="flex flex-col gap-4 md:flex-row">
                        {/* Panel Kiri: Daftar Mata Kuliah */}
                        <div className={`md:w-1/2 ${errorProdi ? 'rounded border border-red-500' : ''}`}>
                            {errorProdi && <div className="mb-2 rounded bg-red-100 p-2 text-xs text-red-500">Anda harus memilih mata kuliah!</div>}
                            <div className="mb-4">
                                <input
                                    type="text"
                                    placeholder="Cari mata kuliah..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full rounded border px-3 py-1.5"
                                    autoFocus
                                />
                            </div>
                            <div className="rounded bg-white p-4 shadow">
                                <h2 className="mb-2 text-xl font-semibold">Daftar Mata Kuliah {fakultasProdi.nama_prodi}</h2>
                                <ul>
                                    {filteredMataKuliahs.map((matkul) => (
                                        <li key={matkul.id} className="flex items-center justify-between border-b pt-1.5 pb-0.5">
                                            <div>
                                                <p className="text-sm font-medium">{matkul.nama_matkul}</p>
                                                <p className="text-xs text-gray-500">
                                                    {matkul.kode_matkul} - {matkul.sks} SKS
                                                </p>
                                            </div>
                                            <button
                                                onClick={() => handleSelectMatkul(matkul)}
                                                className={`rounded px-3 py-1 ${
                                                    selectedMatkul.find((item) => item.id === matkul.id)
                                                        ? 'bg-red-500 text-xs text-white'
                                                        : 'bg-green-600 text-xs text-white'
                                                }`}
                                            >
                                                {selectedMatkul.find((item) => item.id === matkul.id) ? 'Batal Pilih' : 'Pilih'}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Panel Kanan: Program Angkatan */}
                        <div className="md:w-1/2">
                            <div className="rounded bg-white p-4 shadow">
                                <div className="mb-3 flex items-center justify-between">
                                    <h2 className="text-xl font-semibold">Program Akademik Angkatan</h2>
                                    <div className="flex flex-col text-xs">
                                        <select
                                            value={angkatan}
                                            onChange={(e) => setAngkatan(e.target.value)}
                                            className={`rounded border px-2 py-1 ${errorAngkatan ? 'border-red-500' : 'border-gray-300'}`}
                                        >
                                            <option value="">Pilih Angkatan</option>
                                            {years.map((year) => (
                                                <option key={year} value={year}>
                                                    {year}
                                                </option>
                                            ))}
                                        </select>
                                        {errorAngkatan && <span className="mt-1 text-xs text-red-500">Wajib pilih angkatan dulu!</span>}
                                    </div>
                                </div>

                                {selectedMatkul.length === 0 ? (
                                    <p className="text-gray-500">Belum ada mata kuliah yang dipilih.</p>
                                ) : (
                                    <table className="min-w-full">
                                        <thead>
                                            <tr>
                                                <th className="border p-2 text-sm">Mata Kuliah</th>
                                                <th className="border p-2 text-sm">Kode</th>
                                                <th className="border p-2 text-sm">SKS</th>
                                                <th className="border p-2 text-sm">Semester</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {selectedMatkul.map((item) => (
                                                <tr key={item.id}>
                                                    <td className="border px-3 text-xs">{item.nama_matkul}</td>
                                                    <td className="border px-3 text-center text-xs">{item.kode_matkul}</td>
                                                    <td className="border px-3 text-center text-xs">{item.sks}</td>
                                                    <td className="text-center text-xs">
                                                        <select
                                                            value={item.semester}
                                                            onChange={(e) => handleChangeSemester(item.id, Number(e.target.value))}
                                                            className="h-full w-full rounded border px-2 py-1"
                                                        >
                                                            {semesters.map((s) => (
                                                                <option key={s} value={s}>
                                                                    Semester {s}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                )}
                                <div className="mt-4">
                                    <button onClick={handleSubmit} className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
                                        Submit Program
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
