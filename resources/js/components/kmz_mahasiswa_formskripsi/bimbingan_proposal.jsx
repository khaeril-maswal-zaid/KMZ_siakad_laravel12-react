import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import STATUS from '@/constants/status';
import { useForm, usePage } from '@inertiajs/react';

export default function CardSkripsi() {
    const { resercher } = usePage().props;

    const isBlocked = resercher.status == STATUS.MENDAFTAR_U_PROPOSAL;

    const { data, setData, patch, processing, errors, reset } = useForm({
        id_skripsi: resercher.id,
        mahasiswa_user_id: resercher.mahasiswa_user_id,
        tautan_pengesahan: '',
        tautan_proposal: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isBlocked) return;

        patch(route('skripsi.edit', resercher.id), {
            preserveScroll: true, //posisi halaman tidak akan kembali ke atas
            onSuccess: () => reset(),
            onError: (errors) => {
                // console.log(errors);
            },
        });
    };

    return (
        <Card className="border-gray-200 p-6 shadow-md">
            <h2 className="mb-0 text-xl font-semibold">Form. Pendaftaran Ujian Proposal</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="mb-6">
                    <label className="mb-1 block text-sm font-medium text-gray-700">Judul Proposal</label>
                    <input
                        type="text"
                        value={resercher.judul}
                        disabled
                        className="w-full cursor-not-allowed rounded-md border bg-gray-100 p-2 text-gray-500"
                        placeholder="Masukkan judul proposal"
                    />
                </div>

                <div className="mb-6">
                    <label className="mb-1 block text-sm font-medium text-gray-700">Tautan Lembar Pengesahan Bimbingan (Google Drive)</label>
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
                    <label className="mb-1 block text-sm font-medium text-gray-700">Tautan File Proposal (Google Drive)</label>
                    <input
                        type="url"
                        value={data.tautan_proposal}
                        onChange={(e) => setData('tautan_proposal', e.target.value)}
                        disabled={isBlocked}
                        className={`w-full rounded-md border p-2 ${isBlocked ? 'cursor-not-allowed bg-gray-100 text-gray-500' : ''}`}
                        placeholder="https://drive.google.com/..."
                    />
                    {errors.tautan_proposal && <div className="mt-1 text-sm text-red-500">{errors.tautan_proposal}</div>}
                </div>

                <Button className="w-full" disabled={processing || isBlocked}>
                    Simpan
                </Button>
            </form>

            {isBlocked && (
                <div className="mt-4 text-center text-sm text-red-600">
                    Formulir tidak aktif karena Anda sedang dalam proses pendaftaran ujian proposal.
                </div>
            )}
        </Card>
    );
}
