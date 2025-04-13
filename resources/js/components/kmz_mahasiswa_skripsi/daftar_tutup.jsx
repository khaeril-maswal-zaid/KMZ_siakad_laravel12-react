import { usePage } from '@inertiajs/react';
import { BookCheck, CalendarDays, LinkIcon } from 'lucide-react';
import StatusCard from './card_master';

export default function CardSkripsi() {
    const { resercher } = usePage().props;

    return (
        <StatusCard
            status={resercher.status}
            items={[
                { icon: CalendarDays, label: 'Tanggal Pendaftaran', value: '30 April 2025' },
                { icon: BookCheck, label: 'Judul Skripsi', value: 'Optimasi Sistem Informasi Akademik' },
                {
                    icon: LinkIcon,
                    label: 'Tautan Lembar Pengesahan Revisi',
                    value: 'https://drive.com/pengesahan-tutup',
                    isLink: true,
                },
                {
                    icon: LinkIcon,
                    label: 'Tautan File Skripsi Hasil Revisi',
                    value: 'https://drive.com/skripsi-revisi',
                    isLink: true,
                },
            ]}
        />
    );
}
