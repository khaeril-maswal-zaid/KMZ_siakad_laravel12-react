import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Absensi Perkuliahan',
        href: '/absensi-perkuliahan',
    },
];

export default function AbsensiPerkuliahan() {
    const { mahasiswas } = usePage().props;

    // Inisialisasi form dengan useForm
    const { data, setData, post, processing } = useForm({
        jadwal_matkuls_id: 1, // Sesuaikan dengan jadwal yang sedang aktif
        absensi: mahasiswas.map((mhs) => ({
            id: mhs.id,
            pertemuan: {}, // Akan diisi status absensi per pertemuan
        })),
    });

    // Update state form ketika absensi berubah
    const handleAbsensiChange = (userId, pertemuanKe, value) => {
        const updatedAbsensi = data.absensi.map((item) => {
            if (item.id === userId) {
                return {
                    ...item,
                    pertemuan: { ...item.pertemuan, [pertemuanKe]: value },
                };
            }
            return item;
        });
        setData('absensi', updatedAbsensi);
    };

    // Handle submit form menggunakan Inertia post
    const handleSubmit = (e) => {
        console.log(data);

        e.preventDefault();
        post(route('absensi.store'), {
            onSuccess: () => {
                alert('Absensi berhasil disimpan!');
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Absensi Perkuliahan" />

            <form onSubmit={handleSubmit}>
                <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-md border md:min-h-min">
                        {/* Pembungkus dengan overflow-x-auto */}
                        <div className="w-full overflow-x-auto">
                            <table className="min-w-[1460px] border-collapse border border-gray-300">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th rowSpan={2} className="w-9 border border-gray-300 py-1.5 text-xs">
                                            No
                                        </th>
                                        <th rowSpan={2} className="w-1/8 border border-gray-300 px-4 py-1.5 text-xs">
                                            Nama
                                        </th>
                                        <th rowSpan={2} className="w-1/12 border border-gray-300 px-4 py-1.5 text-xs">
                                            NIM
                                        </th>
                                        <th rowSpan={2} className="border border-gray-300 px-4 py-1.5 text-xs">
                                            Status
                                        </th>
                                        <th colSpan={16} className="border border-gray-300 px-4 py-1.5 text-xs">
                                            Pertemuan
                                        </th>
                                    </tr>
                                    <tr className="bg-gray-100">
                                        {[...Array(16)].map((_, index) => (
                                            <th key={index} className="w-16 border border-gray-300 px-4 py-1.5 text-xs">
                                                {index + 1}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {mahasiswas.map((mhs, index) => (
                                        <tr key={mhs.id} className="text-sm">
                                            <td className="border border-gray-300 py-1.5 text-center text-xs">{index + 1}</td>
                                            <td className="border border-gray-300 px-4 py-1.5 text-xs">{mhs.user?.name}</td>
                                            <td className="border border-gray-300 px-4 py-1.5 text-center text-xs">{mhs.nim}</td>
                                            <td className="border border-gray-300 px-4 py-1.5 text-xs">{mhs.status}</td>
                                            {[...Array(16)].map((_, pertemuanIdx) => (
                                                <td key={pertemuanIdx} className="ps-1 text-xs">
                                                    <select
                                                        className="block w-full cursor-pointer rounded-lg border border-gray-300 p-1 text-xs text-gray-900"
                                                        onChange={(e) => handleAbsensiChange(mhs.id, pertemuanIdx + 1, e.target.value)}
                                                        value={data.absensi.find((item) => item.id === mhs.id)?.pertemuan[pertemuanIdx + 1] || ''}
                                                    >
                                                        <option value="">Pilih</option>
                                                        <option value="H">Hadir</option>
                                                        <option value="S">Sakit</option>
                                                        <option value="I">Izin</option>
                                                        <option value="A">Alpa</option>
                                                    </select>
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <button type="submit" disabled={processing} className="mt-4 rounded bg-blue-500 px-4 py-2 text-white">
                        Simpan Absensi
                    </button>
                </div>
            </form>
        </AppLayout>
    );
}
