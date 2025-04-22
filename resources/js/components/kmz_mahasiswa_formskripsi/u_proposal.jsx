import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useForm, usePage } from '@inertiajs/react';

export default function CardSkripsi() {
    const { resercher } = usePage().props;

    const { data, setData, patch, processing, errors, reset } = useForm({
        tanggal_acc: '',
        tautan_pengesahan: '',
        id_skripsi: resercher.id,
        mahasiswa_user_id: resercher.mahasiswa_user_id,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        patch(route('skripsi.accproposal', resercher.id), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
            },
            onError: (errors) => {
                console.log('Validation Errors: ', errors); // <- Harusnya muncul di sini
            },
        });
    };

    return (
        <Card className="border-gray-200 p-6 shadow-md">
            <h2 className="mb-0 text-xl font-semibold">Form. ACC Revisi Proposal</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="mb-6">
                    <label className="mb-1 block text-sm font-medium">Judul Skripsi</label>
                    <input type="text" className="w-full rounded-md border bg-gray-100 p-2 text-gray-500" disabled value={resercher.judul} />
                </div>

                <div className="mb-6">
                    <label className="mb-1 block text-sm font-medium">Tanggal ACC Revisi Proposal</label>
                    <input
                        type="date"
                        className="w-full rounded-md border p-2"
                        value={data.tanggal_acc}
                        onChange={(e) => setData('tanggal_acc', e.target.value)}
                        placeholder="https://drive.google.com/..."
                    />
                    {errors.tanggal_acc && <div className="mt-1 text-sm text-red-500">{errors.tautan_pengesahan}</div>}
                </div>

                <div className="mb-6">
                    <label className="mb-1 block text-sm font-medium">Tautan Lembar Pengesahan Revisi Proposal (Google Drive)</label>
                    <input
                        type="url"
                        className="w-full rounded-md border p-2"
                        value={data.tautan_pengesahan}
                        onChange={(e) => setData('tautan_pengesahan', e.target.value)}
                        placeholder="https://drive.google.com/..."
                    />
                    {errors.tautan_pengesahan && <div className="mt-1 text-sm text-red-500">{errors.tautan_pengesahan}</div>}
                </div>

                <Button className="w-full">{processing ? 'Menyimpan' : 'Simpan'}</Button>
            </form>
        </Card>
    );
}
