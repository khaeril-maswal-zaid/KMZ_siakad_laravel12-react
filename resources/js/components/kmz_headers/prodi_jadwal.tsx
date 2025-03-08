import { Link } from '@inertiajs/react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { Filter } from 'lucide-react';
import { useState } from 'react';

export default function Jadwal() {
    const [search, setSearch] = useState('');

    return (
        <div className="flex flex-1 justify-end gap-4">
            <DropdownMenu>
                <DropdownMenuTrigger className="flex cursor-pointer items-center gap-2 rounded-md bg-gray-800 px-3 py-2 text-sm font-medium text-white hover:bg-gray-900 focus:ring-4 focus:ring-gray-300 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700">
                    <Filter size={16} /> Angkatan
                </DropdownMenuTrigger>
                <DropdownMenuContent className="z-50 w-40 rounded-md border bg-white shadow-lg">
                    <DropdownMenuItem className="cursor-pointer px-4 py-2 hover:bg-gray-100">2024</DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer px-4 py-2 hover:bg-gray-100">2023</DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer px-4 py-2 hover:bg-gray-100">2022</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <Link
                href={route('jadwalperkuliahan.create')}
                className="cursor-pointer rounded-md bg-green-700 px-3 py-2 text-sm font-medium text-white hover:bg-green-800 focus:ring-4 focus:ring-green-300 focus:outline-none dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
                Tambah jadwal
            </Link>
        </div>
    );
}
