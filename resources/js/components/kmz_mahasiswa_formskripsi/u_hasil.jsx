import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import STATUS from '@/constants/status';
import { useForm, usePage } from '@inertiajs/react';

export default function CardSkripsi() {
    const { resercher } = usePage().props;

    const isBlocked = resercher.status === STATUS.MENDAFTAR_U_TUTUP;

    const { data, setData, patch, processing, errors, reset } = useForm({
        tautan_pengesahan: '',
        tautan_skripsi: '',
        mahasiswa_user_id: resercher.mahasiswa_user_id,
        id_skripsi: resercher.id,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isBlocked) return;

        patch(route('skripsi.tutup', resercher.id), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
            },
            onError: (errors) => {
                console.log('Validation Errors: ', errors);
            },
        });
    };

    return (
        <Card className="p-6">
            <h2 className="mb-0 text-xl font-semibold">Formulir Pendaftaran Ujian Tutup</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="mb-6">
                    <label className="mb-1 block text-sm font-medium">Judul Skripsi</label>
                    <input
                        type="text"
                        value={resercher.judul}
                        disabled
                        className={`w-full cursor-not-allowed rounded-md border bg-gray-100 p-2 text-gray-500`}
                        placeholder="Masukkan judul proposal"
                    />
                </div>

                <div className="mb-6">
                    <label className="mb-1 block text-sm font-medium">Tautan Lembar Pengesahan Revisi Skripsi (Google Drive)</label>
                    <input
                        type="url"
                        value={data.tautan_pengesahan}
                        onChange={(e) => setData('tautan_pengesahan', e.target.value)}
                        disabled={isBlocked}
                        className={`w-full rounded-md border p-2 ${isBlocked ? 'cursor-not-allowed bg-gray-100 text-gray-500' : ''}`}
                        placeholder="https://drive.google.com/..."
                    />
                    {errors.tautan_pengesahan && <div className="mt-1 text-sm text-red-500">{errors.tautan_pengesahan}</div>}
                </div>

                <div className="mb-6">
                    <label className="mb-1 block text-sm font-medium">Tautan File Skripsi Final(Google Drive)</label>
                    <input
                        type="url"
                        value={data.tautan_skripsi}
                        onChange={(e) => setData('tautan_skripsi', e.target.value)}
                        disabled={isBlocked}
                        className={`w-full rounded-md border p-2 ${isBlocked ? 'cursor-not-allowed bg-gray-100 text-gray-500' : ''}`}
                        placeholder="https://drive.google.com/..."
                    />
                    {errors.tautan_skripsi && <div className="mt-1 text-sm text-red-500">{errors.tautan_skripsi}</div>}
                </div>

                <Button className="w-full" disabled={processing || isBlocked}>
                    {processing ? 'Menyimpan' : 'Simpan'}
                </Button>
            </form>

            {isBlocked && (
                <div className="text-center text-sm text-red-600">Formulir tidak aktif karena Anda sedang dalam proses pendaftaran ujian tutup.</div>
            )}
        </Card>
    );
}
