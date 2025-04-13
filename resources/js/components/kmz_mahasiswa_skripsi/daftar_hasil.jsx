import { usePage } from '@inertiajs/react';
import { BookCheck, CalendarDays, LinkIcon } from 'lucide-react';
import StatusCard from './card_master';

export default function CardSkripsi() {
    const { resercher } = usePage().props;

    return (
        <StatusCard
            status={resercher.status}
            items={[
                { icon: CalendarDays, label: 'Tanggal Pendaftaran', value: '25 April 2025' },
                {
                    icon: BookCheck,
                    label: 'Judul Skripsi',
                    value: 'The Use Of Tiktok Videos in improving Student`s Pronunciation at the Ten Grade of MA Muhammadiyah Palampang',
                },
                {
                    icon: LinkIcon,
                    label: 'Tautan Lembar Pengesahan Bimbingan',
                    value: 'https://drive.com/pengesahan-hasil',
                    isLink: true,
                },
                { icon: LinkIcon, label: 'Tautan File Skripsi', value: 'https://drive.com/skripsi', isLink: true },
            ]}
        />
    );
}
