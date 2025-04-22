import BimbinganCard from '@/components/kmz_prodi_cardskripsi/infojumlah';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { BookOpen, ClipboardList, FileBadge, FileCheck, FileText, GraduationCap, UserPlus } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Progres Skripsi Mahasiswa',
        href: '/dashboard-prodi',
    },
];

export default function jadwalPerkuliahan() {
    const { konfigurasi, fakultasProdi, flash, auth } = usePage<SharedData>().props;
    const { count, role, dosens } = usePage().props;

    const kategoriBimbingan = [
        { label: 'Menunggu Pembimbing', count: count['Penentuan Pembimbing'], icon: UserPlus, status: 'Penentuan Pembimbing' },
        { label: 'Bimbingan Proposal', count: count['Bimbingan Proposal'], icon: BookOpen, status: 'Bimbingan Proposal' },
        {
            label: 'Pendaftar Ujian Proposal',
            count: count['Mendaftar U-Proposal'],
            icon: FileText,
            status: 'Mendaftar U-Proposal',
        },
        { label: 'Telah Ujian Proposal', count: count['Telah U-Proposal'], icon: FileCheck, status: 'Telah U-Proposal' },
        { label: 'Bimbingan Skripsi', count: count['Bimbingan Skripsi'], icon: ClipboardList, status: 'Bimbingan Skripsi' },
        { label: 'Pendaftar Ujian Hasil', count: count['Mendaftar U-Hasil'], icon: FileText, status: 'Mendaftar U-Hasil' },
        { label: 'Telah Ujian Hasil', count: count['Telah U-Hasil'], icon: FileCheck, status: 'Telah U-Hasil' },
        { label: 'Pendaftar Ujian Tutup', count: count['Mendaftar U-Tutup'], icon: FileBadge, status: 'Mendaftar U-Tutup' },
        {
            label: 'Skripsi Final / Lulus',
            count: count['Skripsi Final'],
            icon: GraduationCap,
            status: 'Skripsi Final',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {kategoriBimbingan.map((item, index) => (
                        <BimbinganCard
                            key={index}
                            label={item.label}
                            count={item.count}
                            icon={item.icon}
                            onClick={route('skripsi.index', item.status)}
                        />
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
