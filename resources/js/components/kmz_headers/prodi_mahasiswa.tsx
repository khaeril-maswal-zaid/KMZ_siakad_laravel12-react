import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { Filter } from 'lucide-react';
import { useState } from 'react';

export default function IndexHeader() {
    const [search, setSearch] = useState('');

    return (
        <div className="flex flex-1 justify-end gap-4">
            <form className="">
                <label htmlFor="default-search" className="sr-only text-sm font-medium text-gray-900 dark:text-white">
                    Search
                </label>
                <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
                        <svg
                            className="h-4 w-4 text-gray-500 dark:text-gray-400"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 20"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                            />
                        </svg>
                    </div>
                    <input
                        type="search"
                        id="default-search"
                        className="block w-full rounded-lg border border-gray-300 p-2.5 ps-9 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                        placeholder="Name, NIM, NIK"
                        required
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="absolute end-1.5 bottom-1 cursor-pointer rounded-md bg-blue-700 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Search
                    </button>
                </div>
            </form>

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
        </div>
    );
}
