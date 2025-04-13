import { Link, router, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function JadwalBerlansung() {
    const { histori } = usePage().props; // Ambil tahun ajaran dari backend

    const [selectedTahun, setSelectedTahun] = useState();

    const handleChange = (event) => {
        const value = event.target.value;
        setSelectedTahun(value);

        // Kirim permintaan ke backend dengan parameter di URL
        router.get(route('jadwalperkuliahan.berlansung'), { tahun_ajaran: value }, { preserveState: true, preserveScroll: true });
    };

    return (
        <div className="flex flex-1 justify-end gap-1.5">
            <label htmlFor="tahunAjaran" className="py-2 text-sm">
                Tahun Ajaran :
            </label>
            <select
                id="tahunAjaran"
                className="block rounded-lg border border-gray-300 bg-gray-50 p-2 text-xs text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                value={selectedTahun}
                onChange={handleChange}
            >
                <option value="">Pilih</option>
                {histori.length === 0 && (
                    <option className="text-xs" value="">
                        Riwayat belum ada
                    </option>
                )}
                {histori.map((item, index) => (
                    <option className="text-xs" key={index} value={item.tahun_ajaran}>
                        {item.tahun_ajaran}
                    </option>
                ))}
            </select>

            <Link
                href={route('jadwalperkuliahan.index')}
                className="ms-2.5 cursor-pointer rounded-md bg-blue-700 px-3 py-2 text-sm font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
                Kembali
            </Link>
        </div>
    );
}
