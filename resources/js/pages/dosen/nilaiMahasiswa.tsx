import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Nilai Mahasiswa',
        href: '/nilai-mahasiswa',
    },
];

export default function nilaiMahasiswa() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Nilai Mahasiswa" />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-md border md:min-h-min">
                    <table className="w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="w-12 border border-gray-300 px-4 py-1.5 text-xs">No</th>
                                <th className="border border-gray-300 px-4 py-1.5 text-xs">Mata Kuliah</th>
                                <th className="w-1/12 border border-gray-300 px-4 py-1.5 text-xs">SKS</th>
                                <th className="border border-gray-300 px-4 py-1.5 text-xs">Kelas</th>
                                <th className="border border-gray-300 px-4 py-1.5 text-xs">Hari</th>
                                <th className="border border-gray-300 px-4 py-1.5 text-xs">Waktu</th>
                                <th className="border border-gray-300 px-4 py-1.5 text-xs">Ruangan</th>
                                <th className="w-1/6 border border-gray-300 px-4 py-1.5 text-xs">Aksi</th>
                            </tr>
                        </thead>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}
