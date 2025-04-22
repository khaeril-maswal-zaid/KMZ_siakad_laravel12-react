import { Card } from '@/components/ui/card'; // pastikan path-nya sesuai dengan struktur project-mu
import { Link } from '@inertiajs/react';

export default function BimbinganCard({ label, count, icon, onClick }) {
    const Icon = icon;

    return (
        <Card className="flex h-48 flex-col justify-between gap-3 rounded-2xl p-6 shadow-sm hover:shadow-md">
            <div className="flex items-start gap-3 text-indigo-600">
                <Icon className="mt-2.5 h-6 w-6" />
                <div className="text-sm leading-snug text-gray-500 dark:text-gray-400">
                    Jumlah Kategori
                    <div className="text-base font-semibold text-slate-800 dark:text-gray-100">{label}</div>
                </div>
            </div>

            <div className="ps-2">
                <span className="text-6xl leading-tight font-extrabold text-slate-900 dark:text-gray-100">{count}</span>
                <span className="ps-3 text-2xl text-gray-600 dark:text-gray-400">Mahasiswa</span>
                <Link href={onClick} className="-mt-1 block cursor-pointer ps-2 text-sm text-indigo-500 hover:text-indigo-600 hover:underline">
                    Lihat detail →
                </Link>
            </div>
        </Card>
    );
}
