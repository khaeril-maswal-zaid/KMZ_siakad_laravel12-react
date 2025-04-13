import STATUS from '@/constants/status';
import { usePage } from '@inertiajs/react';
import { BookCheck, CalendarDays, Clock, LinkIcon } from 'lucide-react';
import StatusCard from './card_master';

export default function CardSkripsi() {
    const { resercher } = usePage().props;
    const status = resercher?.status == STATUS.PENENTUAN_PEMBIMBING ? resercher?.status : STATUS.PENGAJUAN_JUDUL;
    return (
        <StatusCard
            status={status}
            items={[
                { icon: CalendarDays, label: 'Tanggal Pengajuan', value: '10 April 2025' },
                {
                    icon: BookCheck,
                    label: 'Judul Proposal',
                    value: 'The Use Of Tiktok Videos in improving Student`s Pronunciation at the Ten Grade of MA Muhammadiyah Palampang',
                },
                { icon: Clock, label: 'Tanggal Persetujuan Judul', value: '9 April 2025' },
                { icon: LinkIcon, label: 'Tautan Dokumen Pengajuan', value: 'https://drive.google.com/example', isLink: true },
            ]}
        />
    );
}
