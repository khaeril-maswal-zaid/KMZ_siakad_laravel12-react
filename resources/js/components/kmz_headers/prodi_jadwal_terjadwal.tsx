import { router, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function Absensi() {
    const { histori, key } = usePage().props; // Ambil tahun ajaran dari backend

    const [selectedTahun, setSelectedTahun] = useState();

    const handleChange = (event) => {
        const value = event.target.value;
        setSelectedTahun(value);

        // Kirim permintaan ke backend dengan parameter di URL
        if (key == 'nilai') {
            router.get(route('jadwalperkuliahan.absensi'), { tahun_ajaran: value }, { preserveState: true, preserveScroll: true });
        } else if (key == 'absensi') {
            router.get(route('jadwalperkuliahan.absensi'), { tahun_ajaran: value }, { preserveState: true, preserveScroll: true });
        }
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
        </div>
    );
}
