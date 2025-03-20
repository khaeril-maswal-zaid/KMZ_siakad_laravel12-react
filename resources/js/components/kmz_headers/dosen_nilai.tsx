import { Link } from '@inertiajs/react';

export default function Nilai() {
    return (
        <div className="flex flex-1 justify-end gap-4">
            <Link
                href={route('nilaimahasiswa.create')}
                className="cursor-pointer rounded-md bg-blue-700 px-3 py-2 text-sm font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
                Entri Nilai
            </Link>
        </div>
    );
}
