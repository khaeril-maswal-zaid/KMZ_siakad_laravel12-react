import STATUS from '@/constants/status';
import { usePage } from '@inertiajs/react';
import { BookCheck, CalendarDays, Clock, LinkIcon } from 'lucide-react';
import StatusCard from './card_master';

export default function CardSkripsi() {
    const { resercher } = usePage().props;
    const status = resercher?.status == STATUS.PENENTUAN_PEMBIMBING ? resercher?.status : STATUS.PENGAJUAN_JUDUL;

    // Fungsi untuk memformat tanggal ke format Indonesia
    const formatTanggalINA = (tanggalStr) => {
        if (!tanggalStr) return '';
        const dateObj = new Date(tanggalStr);
        return new Intl.DateTimeFormat('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        }).format(dateObj);
    };

    return (
        <StatusCard
            status={status}
            items={[
                { icon: CalendarDays, label: 'Tanggal Pengajuan', value: formatTanggalINA(resercher?.created) },
                {
                    icon: BookCheck,
                    label: 'Judul Proposal',
                    value: resercher?.judul,
                },
                { icon: Clock, label: 'Tanggal Persetujuan Judul', value: formatTanggalINA(resercher?.mores) },
                { icon: LinkIcon, label: 'Tautan Dokumen Pengajuan', value: resercher?.tautan_skripsi, isLink: true },
            ]}
        />
    );
}
