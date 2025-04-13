import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { BookOpenCheck, GraduationCap, UserCheck } from 'lucide-react';

export default function Index() {
    const { namaProdi } = usePage().props; // Menerima data dari Laravel

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: `Dashboard Admin ${namaProdi}`,
            href: '/dashboard-prodi',
        },
    ];

    const namaUser = 'Mrs. Eula Marquardt';
    const role = 'Admin Prodi Teknik Informatika';

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard Prodi" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="space-y-6 p-6">
                    {/* Header Greeting */}
                    <div className="rounded-2xl bg-white p-6 shadow-md">
                        <h1 className="text-2xl font-bold text-gray-800">Selamat datang, {namaUser}!</h1>
                        <p className="mt-1 text-sm text-gray-600">Sistem Informasi Akademik (SIMAK)</p>
                        <p className="text-sm text-gray-600">Universitas Muhammadiyah Sinjai</p>
                        <span className="mt-2 inline-block rounded-full bg-purple-100 px-3 py-1 text-sm text-purple-700">Login sebagai: {role}</span>
                    </div>

                    {/* Top Info Cards */}
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        <div className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-md">
                            <GraduationCap className="text-blue-600" />
                            <div>
                                <p className="text-sm text-gray-500">Mahasiswa Aktif</p>
                                <h3 className="text-lg font-semibold text-gray-800">328 Mahasiswa</h3>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-md">
                            <UserCheck className="text-green-600" />
                            <div>
                                <p className="text-sm text-gray-500">Jumlah Dosen</p>
                                <h3 className="text-lg font-semibold text-gray-800">15 Dosen</h3>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-md">
                            <BookOpenCheck className="text-orange-600" />
                            <div>
                                <p className="text-sm text-gray-500">Total Mata Kuliah</p>
                                <h3 className="text-lg font-semibold text-gray-800">42 MK</h3>
                            </div>
                        </div>
                    </div>

                    {/* Daftar Mata Kuliah */}
                    <div className="rounded-2xl bg-white p-6 shadow-md">
                        <h2 className="mb-4 text-xl font-semibold text-gray-800">Daftar Mata Kuliah per Semester</h2>
                        <div className="grid grid-cols-1 gap-4 text-sm text-gray-700 md:grid-cols-2">
                            <ul>
                                <li>
                                    <strong>Semester 1:</strong> Pengantar TI, Matematika Dasar, Pancasila
                                </li>
                                <li>
                                    <strong>Semester 2:</strong> Struktur Data, Bahasa Inggris TI, Agama
                                </li>
                            </ul>
                            <ul>
                                <li>
                                    <strong>Semester 3:</strong> Basis Data, Pemrograman Web, Logika Informatika
                                </li>
                                <li>
                                    <strong>Semester 4:</strong> RPL, Jaringan Komputer, Sistem Operasi
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
