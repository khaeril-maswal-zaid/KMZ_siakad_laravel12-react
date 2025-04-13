import { usePage } from '@inertiajs/react';
import { BookCheck, CalendarDays, LinkIcon, User } from 'lucide-react';
import StatusCard from './card_master';

export default function CardSkripsi() {
    const { resercher } = usePage().props;

    return (
        <StatusCard
            status={resercher.status}
            items={[
                { icon: CalendarDays, label: 'Tanggal ACC Revisi Proposal', value: '20 April 2025' },
                {
                    icon: BookCheck,
                    label: 'Judul Skripsi',
                    value: 'The Use Of Tiktok Videos in improving Student`s Pronunciation at the Ten Grade of MA Muhammadiyah Palampang',
                },
                {
                    icon: LinkIcon,
                    label: 'Tautan Lembar Pengesahan Revisi Proposal',
                    value: 'https://drive.com/pengesahan-revisi',
                    isLink: true,
                },
                { icon: User, label: 'Pembimbing I', value: 'Dr. Andi Susanto' },
                { icon: User, label: 'Pembimbing II', value: 'Dr. Lestari Dewi' },
            ]}
        />
    );
}
