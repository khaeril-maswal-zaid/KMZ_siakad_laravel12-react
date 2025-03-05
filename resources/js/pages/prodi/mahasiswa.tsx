import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { MoreHorizontal } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Data Mahaiswa',
        href: '/dashboard-prodi',
    },
];

export default function jadwalPerkuliahan() {
    type Mahasiswa = {
        nim: string;
        kelas: string;
        jenis_kelamin: string;
        tempat_lahir: string;
        tanggal_lahir: string;
        no_hp: string;
        user?: {
            name: string;
            email: string;
        } | null;
    };

    const { mahasiswas } = usePage<{ mahasiswas: Mahasiswa[] }>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Data Mahaiswa" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    <table className="w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-gray-300 px-4 py-1.5 text-xs">No</th>
                                <th className="border border-gray-300 px-4 py-1.5 text-xs">NIM</th>
                                <th className="border border-gray-300 px-4 py-1.5 text-xs">Nama</th>
                                <th className="border border-gray-300 px-4 py-1.5 text-xs">Kelas</th>
                                <th className="border border-gray-300 px-4 py-1.5 text-xs">Email</th>
                                <th className="border border-gray-300 px-4 py-1.5 text-xs">JK</th>
                                <th className="border border-gray-300 px-4 py-1.5 text-xs">Tanggal Lahir</th>
                                <th className="border border-gray-300 px-4 py-1.5 text-xs">No Hp</th>
                                <th className="border border-gray-300 px-4 py-1.5 text-xs">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mahasiswas.data.map((mhs, index) => (
                                <tr key={mhs.nim}>
                                    <td className="border border-gray-300 px-4 py-1.5 text-center text-xs">{index + 1}</td>
                                    <td className="border border-gray-300 px-4 py-1.5 text-center text-xs">{mhs.nim}</td>
                                    <td className="border border-gray-300 px-4 py-1.5 text-xs">{mhs.user?.name || '-'}</td>
                                    <td className="border border-gray-300 px-4 py-1.5 text-center text-xs">{mhs.kelas}</td>
                                    <td className="border border-gray-300 px-4 py-1.5 text-xs">{mhs.user?.email || '-'}</td>
                                    <td className="border border-gray-300 px-4 py-1.5 text-center text-xs">{mhs.jenis_kelamin}</td>
                                    <td className="border border-gray-300 px-4 py-1.5 text-xs">{mhs.tanggal_lahir}</td>
                                    <td className="border border-gray-300 px-4 py-1.5 text-xs">{mhs.no_hp}</td>
                                    <td className="border border-gray-300 px-4 text-center text-xs">
                                        <DropdownMenu.Root>
                                            <DropdownMenu.Trigger asChild>
                                                <button className="cursor-pointer rounded-full bg-gray-200 p-1 hover:bg-gray-300">
                                                    <MoreHorizontal className="h-3 w-3" />
                                                </button>
                                            </DropdownMenu.Trigger>

                                            <DropdownMenu.Portal>
                                                <DropdownMenu.Content className="z-50 w-32 rounded-md bg-white p-1 shadow-md">
                                                    <DropdownMenu.Item className="hover:bo cursor-pointer px-3 py-2 text-sm hover:bg-gray-100">
                                                        Detail
                                                    </DropdownMenu.Item>
                                                    <DropdownMenu.Item className="cursor-pointer px-3 py-2 text-sm hover:bg-gray-100">
                                                        Edit
                                                    </DropdownMenu.Item>
                                                    <DropdownMenu.Item className="cursor-pointer px-3 py-2 text-sm text-red-500 hover:bg-red-100">
                                                        Hapus
                                                    </DropdownMenu.Item>
                                                </DropdownMenu.Content>
                                            </DropdownMenu.Portal>
                                        </DropdownMenu.Root>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="mt-4 flex justify-center">
                    {mahasiswas?.links?.map((link, index) => (
                        <button
                            key={index}
                            onClick={() => link.url && (window.location.href = link.url)}
                            disabled={!link.url}
                            className={`mx-1 cursor-pointer rounded-lg px-3 py-1 text-xs ${link.active ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
