import { router, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function Index() {
    const { histori } = usePage().props; // Ambil tahun ajaran dari backend
    console.log(histori);

    const [selectedTahun, setSelectedTahun] = useState(histori.length > 0 ? histori[0].tahun_ajaran : '');

    const handleChange = (event) => {
        const value = event.target.value;
        setSelectedTahun(value);

        // Kirim permintaan ke backend dengan parameter di URL
        router.get(route('nilaimahasiswa.show'), { tahun_ajaran: value }, { preserveState: true, preserveScroll: true });
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
                {histori.length > 0 ? (
                    histori.map((item, index) => (
                        <option className="text-xs" key={index} value={item.tahun_ajaran}>
                            {item.tahun_ajaran}
                        </option>
                    ))
                ) : (
                    <option className="text-xs">Riwayat belum ada</option>
                )}
            </select>
        </div>
    );
}
