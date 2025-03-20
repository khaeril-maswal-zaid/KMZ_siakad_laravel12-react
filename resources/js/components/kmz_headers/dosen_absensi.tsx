import { Link } from '@inertiajs/react';

export default function Absensi() {
    return (
        <div className="flex flex-1 justify-end gap-4">
            <Link
                href={route('absensi.create')}
                className="cursor-pointer rounded-md bg-green-700 px-3 py-2 text-sm font-medium text-white hover:bg-green-800 focus:ring-4 focus:ring-green-300 focus:outline-none dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
                Entri Absensi
            </Link>
        </div>
    );
}
