import { usePage } from '@inertiajs/react';
import { BookCheck, CalendarDays, User } from 'lucide-react';
import StatusCard from './card_master';

export default function CardSkripsi() {
    const { resercher } = usePage().props;

    return (
        <StatusCard
            status={resercher.status}
            items={[
                { icon: CalendarDays, label: 'Tanggal Persetujuan Judul', value: '10 April 2025' },
                {
                    icon: BookCheck,
                    label: 'Judul Proposal',
                    value: 'The Use Of Tiktok Videos in improving Student`s Pronunciation at the Ten Grade of MA Muhammadiyah Palampang',
                },
                { icon: User, label: 'Pembimbing I', value: 'Dr. Andi Susanto' },
                { icon: User, label: 'Pembimbing I', value: 'Dr. Lestari Dewi' },
            ]}
        />
    );
}
