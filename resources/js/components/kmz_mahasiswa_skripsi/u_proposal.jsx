import { usePage } from '@inertiajs/react';
import { BookCheck, CalendarDays, LinkIcon, RefreshCw, User } from 'lucide-react';
import StatusCard from './card_master';

export default function CardSkripsi() {
    const { resercher } = usePage().props;

    return (
        <StatusCard
            status={resercher.status}
            items={[
                { icon: RefreshCw, label: 'Tanggal Pembaruan Progres', value: '18 April 2025' },
                {
                    icon: BookCheck,
                    label: 'Judul Proposal',
                    value: 'The Use Of Tiktok Videos in improving Student`s Pronunciation at the Ten Grade of MA Muhammadiyah Palampang',
                },
                { icon: LinkIcon, label: 'Tautan File Proposal', value: 'https://drive.com/proposal', isLink: true },
                { icon: CalendarDays, label: 'Tanggal Pelaksanaan Ujian', value: '17 April 2025' },
                { icon: User, label: 'Penguji I', value: 'Prof. Slamet Widodo' },
                { icon: User, label: 'Penguji II', value: 'Dr. Rina Ayu' },
            ]}
        />
    );
}
