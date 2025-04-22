import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import STATUS from '@/constants/status'; // pastikan kamu punya ini
import { useForm, usePage } from '@inertiajs/react';

export default function CardSkripsi() {
    const { resercher } = usePage().props;
    const isBlocked = resercher?.status === STATUS.PENENTUAN_PEMBIMBING;

    const { data, setData, post, processing, errors, reset } = useForm({
        judul: '',
        tanggal: '',
        tautan: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isBlocked) return;

        post(route('skripsi.store'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                // console.log(errors);
            },
        });
    };

    return (
        <Card className="border-gray-200 p-6 shadow-md">
            <h2 className="mb-0 text-xl font-semibold">Pengajuan Judul Skripsi</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="mb-7">
                    <label className="mb-1 block text-sm font-medium">Judul Skripsi</label>
                    <input
                        type="text"
                        className={`w-full rounded-md border p-2 ${isBlocked ? 'cursor-not-allowed bg-gray-100 text-gray-500' : ''}`}
                        placeholder="Masukkan judul skripsi"
                        value={data.judul}
                        onChange={(e) => setData('judul', e.target.value)}
                        disabled={isBlocked}
                    />
                    {errors.judul && <div className="mt-1 text-sm text-red-500">{errors.judul}</div>}
                </div>

                <div className="mb-7">
                    <label className="mb-1 block text-sm font-medium">Tanggal Persetujuan Judul</label>
                    <input
                        type="date"
                        className={`w-full rounded-md border p-2 ${isBlocked ? 'cursor-not-allowed bg-gray-100 text-gray-500' : ''}`}
                        value={data.tanggal}
                        onChange={(e) => setData('tanggal', e.target.value)}
                        disabled={isBlocked}
                    />
                    {errors.tanggal && <div className="mt-1 text-sm text-red-500">{errors.tanggal}</div>}
                </div>

                <div className="mb-7">
                    <label className="mb-1 block text-sm font-medium">Tautan Lembar Pengesahan (Google Drive)</label>
                    <input
                        type="url"
                        className={`w-full rounded-md border p-2 ${isBlocked ? 'cursor-not-allowed bg-gray-100 text-gray-500' : ''}`}
                        placeholder="https://drive.google.com/..."
                        value={data.tautan}
                        onChange={(e) => setData('tautan', e.target.value)}
                        disabled={isBlocked}
                    />
                    {errors.tautan && <div className="mt-1 text-sm text-red-500">{errors.tautan}</div>}
                </div>

                <Button className="w-full" type="submit" disabled={processing || isBlocked}>
                    {processing ? 'Menyimpan...' : 'Simpan'}
                </Button>
            </form>

            {isBlocked && <div className="mt-4 text-center text-sm text-red-600">Anda sudah mengajukan judul. Formulir ini tidak bisa diubah.</div>}
        </Card>
    );
}
