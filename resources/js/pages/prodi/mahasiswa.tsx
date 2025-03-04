import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Data Mahaiswa',
        href: '/dashboard-prodi',
    },
];

export default function jadwalPerkuliahan() {
    const { mahasiswas } = usePage().props; // Menerima data dari Laravel
    console.log(mahasiswas);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Data Mahaiswa" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    <table className="w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-gray-300 px-4 py-2 text-sm">No</th>
                                <th className="border border-gray-300 px-4 py-2 text-sm">NIM</th>
                                <th className="border border-gray-300 px-4 py-2 text-sm">Nama</th>
                                <th className="border border-gray-300 px-4 py-2 text-sm">Kelas</th>
                                <th className="border border-gray-300 px-4 py-2 text-sm">Email</th>
                                <th className="border border-gray-300 px-4 py-2 text-sm">Jenis Kelamin</th>
                                <th className="border border-gray-300 px-4 py-2 text-sm">Tempat & Tanggal Lahir</th>
                                <th className="border border-gray-300 px-4 py-2 text-sm">No Hp</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border border-gray-300 px-4 py-2 text-sm">1</td>
                                <td className="border border-gray-300 px-4 py-2 text-sm">John Doe</td>
                                <td className="border border-gray-300 px-4 py-2 text-sm">john@example.com</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}
