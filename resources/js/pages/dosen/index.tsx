import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { CalendarCheck, NotebookPen, Users2 } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard Dosen',
        href: '/dashboard-dosen',
    },
];

export default function Index() {
    const namaUser = 'Dr. Andi Syarif, M.Pd';
    const role = 'Dosen';
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard Dosen" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="space-y-6 p-6">
                    {/* Greeting Section */}
                    <div className="rounded-2xl bg-white p-6 shadow-md">
                        <h1 className="text-2xl font-bold text-gray-800">Selamat datang, {namaUser}!</h1>
                        <p className="mt-1 text-sm text-gray-600">Sistem Informasi Akademik (SIMAK)</p>
                        <p className="text-sm text-gray-600">Universitas Muhammadiyah Sinjai</p>
                        <span className="mt-2 inline-block rounded-full bg-yellow-100 px-3 py-1 text-sm text-yellow-700">Login sebagai: {role}</span>
                    </div>

                    {/* Kartu Info Singkat */}
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        <div className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-md">
                            <CalendarCheck className="text-indigo-600" />
                            <div>
                                <p className="text-sm text-gray-500">Mengajar Hari Ini</p>
                                <h3 className="text-lg font-semibold text-gray-800">2 Kelas</h3>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-md">
                            <NotebookPen className="text-blue-600" />
                            <div>
                                <p className="text-sm text-gray-500">Mata Kuliah Diampu</p>
                                <h3 className="text-lg font-semibold text-gray-800">4 MK</h3>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-md">
                            <Users2 className="text-green-600" />
                            <div>
                                <p className="text-sm text-gray-500">Mahasiswa Bimbingan</p>
                                <h3 className="text-lg font-semibold text-gray-800">12 Orang</h3>
                            </div>
                        </div>
                    </div>

                    {/* Jadwal Mengajar Hari Ini */}
                    <div className="rounded-2xl bg-white p-6 shadow-md">
                        <h2 className="mb-4 text-xl font-semibold text-gray-800">Jadwal Mengajar Hari Ini</h2>
                        <ul className="space-y-3 text-sm text-gray-700">
                            <li>
                                <strong>08:00 - 10:00</strong> — Pendidikan Bahasa — Ruang A2.01
                            </li>
                            <li>
                                <strong>13:00 - 15:00</strong> — Metodologi Penelitian — Ruang B1.03
                            </li>
                        </ul>
                    </div>
                </div>
                );
            </div>
        </AppLayout>
    );
}
