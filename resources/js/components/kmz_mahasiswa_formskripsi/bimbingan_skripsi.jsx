import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import STATUS from '@/constants/status';
import { useForm, usePage } from '@inertiajs/react';

export default function FormUjianHasil() {
    const { resercher } = usePage().props;
    const isBlocked = resercher.status === STATUS.MENDAFTAR_U_HASIL;

    const { data, setData, patch, processing, errors, reset } = useForm({
        tautan_pengesahan: '',
        tautan_skripsi: '',
        id_skripsi: resercher.id,
        mahasiswa_user_id: resercher.mahasiswa_user_id,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isBlocked) return;

        patch(route('skripsi.daftarhasil', resercher.id), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                // console.log(errors);
            },
        });
    };

    return (
        <Card className="p-6">
            <h2 className="mb-0 text-xl font-semibold">Formulir Pendaftaran Ujian Hasil</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="mb-6">
                    <label className="mb-1 block text-sm font-medium text-gray-700">Judul Skripsi</label>
                    <input
                        type="text"
                        disabled
                        value={resercher.judul}
                        className="w-full cursor-not-allowed rounded-md border bg-gray-100 p-2 text-gray-500"
                        placeholder="Masukkan judul skripsi"
                    />
                </div>

                <div className="mb-6">
                    <label className="mb-1 block text-sm font-medium text-gray-700">Tautan Lembar Pengesahan Bimbingan (Google Drive)</label>
                    <input
                        type="url"
                        disabled={isBlocked}
                        value={data.tautan_pengesahan}
                        onChange={(e) => setData('tautan_pengesahan', e.target.value)}
                        className={`w-full rounded-md border p-2 ${isBlocked ? 'cursor-not-allowed bg-gray-100 text-gray-500' : ''}`}
                        placeholder="https://drive.google.com/..."
                    />
                    {errors.tautan_pengesahan && <div className="mt-1 text-sm text-red-500">{errors.tautan_pengesahan}</div>}
                </div>

                <div className="mb-6">
                    <label className="mb-1 block text-sm font-medium text-gray-700">Tautan File Skripsi (Google Drive)</label>
                    <input
                        type="url"
                        disabled={isBlocked}
                        value={data.tautan_skripsi}
                        onChange={(e) => setData('tautan_skripsi', e.target.value)}
                        className={`w-full rounded-md border p-2 ${isBlocked ? 'cursor-not-allowed bg-gray-100 text-gray-500' : ''}`}
                        placeholder="https://drive.google.com/..."
                    />
                    {errors.tautan_skripsi && <div className="mt-1 text-sm text-red-500">{errors.tautan_skripsi}</div>}
                </div>

                <Button className="w-full" disabled={processing || isBlocked}>
                    {processing ? 'Menyimpan...' : 'Simpan'}
                </Button>
            </form>

            {isBlocked && (
                <div className="text-center text-sm text-red-600">Formulir tidak aktif karena Anda sedang dalam proses pendaftaran ujian hasil.</div>
            )}
        </Card>
    );
}
