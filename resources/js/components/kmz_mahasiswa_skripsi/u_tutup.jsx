import { usePage } from '@inertiajs/react';
import { BookCheck, CalendarDays, LinkIcon, User } from 'lucide-react';
import StatusCard from './card_master';

export default function CardSkripsi() {
    const { resercher } = usePage().props;

    return (
        <StatusCard
            status={resercher.status}
            items={[
                { icon: BookCheck, label: 'Judul Skripsi', value: 'Optimasi Sistem Informasi Akademik' },
                { icon: LinkIcon, label: 'Tautan File Skripsi Final', value: 'https://drive.com/skripsi-final', isLink: true },
                { icon: User, label: 'Pembimbing I', value: 'Dr. Andi Susanto' },
                { icon: User, label: 'Pembimbing II', value: 'Dr. Lestari Dewi' },
                { icon: CalendarDays, label: 'Tanggal Pelaksanaan  Ujian', value: '27 April 2025' },
                { icon: User, label: 'Penguji I', value: 'Prof. Slamet Widodo' },
                { icon: User, label: 'Penguji II', value: 'Dr. Rina Ayu' },
                { icon: User, label: 'Penguji III', value: 'Dr. Budi Setiawan' },
                { icon: User, label: 'Penguji IV', value: 'Dr. Anita Sari' },
            ]}
        />
    );
}
