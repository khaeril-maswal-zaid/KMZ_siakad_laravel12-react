import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { BookOpen, CalendarDays, CheckCircle } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard-mahasiswa',
    },
];

export default function Dashboard() {
    const namaUser = 'Budi';
    const role = 'Mahasiswa';

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="space-y-6 p-6">
                    {/* Greeting Section */}
                    <div className="rounded-2xl bg-white p-6 shadow-md">
                        <h1 className="text-2xl font-bold text-gray-800">Selamat datang, {namaUser}!</h1>
                        <p className="mt-1 text-sm text-gray-600">Sistem Informasi Akademik (SIMAK)</p>
                        <p className="text-sm text-gray-600">Universitas Muhammadiyah Sinjai</p>
                        <span className="mt-2 inline-block rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700">Login sebagai: {role}</span>
                    </div>

                    {/* Kartu Info Singkat */}
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        <div className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-md">
                            <CalendarDays className="text-indigo-600" />
                            <div>
                                <p className="text-sm text-gray-500">Jadwal Hari Ini</p>
                                <h3 className="text-lg font-semibold text-gray-800">2 Kelas</h3>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-md">
                            <BookOpen className="text-green-600" />
                            <div>
                                <p className="text-sm text-gray-500">Total SKS</p>
                                <h3 className="text-lg font-semibold text-gray-800">20 SKS</h3>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-md">
                            <CheckCircle className="text-emerald-600" />
                            <div>
                                <p className="text-sm text-gray-500">Kehadiran Bulan Ini</p>
                                <h3 className="text-lg font-semibold text-gray-800">96%</h3>
                            </div>
                        </div>
                    </div>

                    {/* Jadwal Kuliah Hari Ini */}
                    <div className="rounded-2xl bg-white p-6 shadow-md">
                        <h2 className="mb-4 text-xl font-semibold text-gray-800">Jadwal Kuliah Hari Ini</h2>
                        <ul className="space-y-3 text-sm text-gray-700">
                            <li>
                                <strong>08:00 - 10:00</strong> — Bahasa Indonesia — Ruang 3.01
                            </li>
                            <li>
                                <strong>13:00 - 15:00</strong> — Matematika Dasar — Ruang 2.04
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
