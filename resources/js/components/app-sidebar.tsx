import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem, SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { BookOpen, Calendar, ClipboardList, FileText, GraduationCap, LayoutGrid, SquarePen, Users } from 'lucide-react';
import AppLogo from './app-logo';

// Fungsi untuk mendapatkan menu berdasarkan role
const getMainNavItems = (auth: SharedData['auth']): NavItem[] => {
    const role = (auth?.user?.role as keyof typeof roleMenus) || 'default';

    const commonMenu: NavItem[] = [
        {
            title: 'Dashboard',
            url: route(role ? `${role}.index` : '/'),
            icon: LayoutGrid,
        },
    ];

    const roleMenus: Record<string, NavItem[]> = {
        prodi: [
            { title: 'Data Nilai', url: route('datanilai.index'), icon: GraduationCap },
            { title: 'Absensi Mahasiswa', url: '/', icon: ClipboardList },
            { title: 'Jadwal Perkuliahan', url: route('jadwalperkuliahan.index'), icon: Calendar },
            { title: 'Program Angkatan', url: route('programangkatan.index'), icon: SquarePen },
            { title: 'Data Mahasiswa', url: route('mahasiswauser.index'), icon: Users },
            { title: 'Daftar Mata Kuliah', url: route('matakuliah.index'), icon: BookOpen },
        ],
        dosen: [
            { title: 'Jadwal Mengajar', url: route('jadwalperkuliahan.mengajar'), icon: FileText },
            { title: 'Mahasiswa', url: '/', icon: GraduationCap },
        ],
        mahasiswa: [
            { title: 'Jadwal Kuliah', url: '/', icon: FileText },
            { title: 'Nilai', url: '/', icon: GraduationCap },
        ],
        default: [], // Tambahkan default agar tidak error jika `role` tidak cocok
    };

    return [...commonMenu, ...(roleMenus[role] || [])];
};

const footerNavItems: NavItem[] = [
    // {
    //     title: 'Repository',
    //     url: 'https://github.com/laravel/react-starter-kit',
    //     icon: Folder,
    // },
    // {
    //     title: 'Documentation',
    //     url: 'https://laravel.com/docs/starter-kits',
    //     icon: BookOpen,
    // },
];

export function AppSidebar() {
    const { auth } = usePage<SharedData>().props;
    const routeloged = auth.user?.role ? `${auth.user.role}.index` : '/';

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={route(routeloged)} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={getMainNavItems(auth)} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
