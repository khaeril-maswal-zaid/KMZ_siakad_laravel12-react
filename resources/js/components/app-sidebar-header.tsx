import { Breadcrumbs } from '@/components/breadcrumbs';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { type BreadcrumbItem as BreadcrumbItemType } from '@/types';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { Filter } from 'lucide-react';
import { useState } from 'react';

export function AppSidebarHeader({ breadcrumbs = [] }: { breadcrumbs?: BreadcrumbItemType[] }) {
    const [search, setSearch] = useState('');

    return (
        <header className="border-sidebar-border/50 flex h-16 shrink-0 items-center gap-2 border-b px-6 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 md:px-4">
            <div className="flex items-center gap-2">
                <SidebarTrigger className="-ml-1" />
                <Breadcrumbs breadcrumbs={breadcrumbs} />
            </div>

            {/* Search & Filter */}
            <div className="flex flex-1 justify-end gap-4">
                {/* Search Input */}
                <input
                    type="text"
                    placeholder="Search: Nim, Nik, Nama"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-64 rounded-md border border-gray-300 bg-white p-2 text-sm shadow-sm outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-400"
                />

                {/* Filter Dropdown */}
                <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-100 focus:ring-2 focus:ring-gray-400">
                        <Filter size={16} /> Angkatan
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="z-50 w-40 rounded-md border bg-white shadow-lg">
                        <DropdownMenuItem className="cursor-pointer px-4 py-2 hover:bg-gray-100">2024</DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer px-4 py-2 hover:bg-gray-100">2023</DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer px-4 py-2 hover:bg-gray-100">2022</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
}
