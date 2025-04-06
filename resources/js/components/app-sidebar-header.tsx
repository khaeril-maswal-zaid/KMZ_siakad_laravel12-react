import { Breadcrumbs } from '@/components/breadcrumbs';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { usePage } from '@inertiajs/react';

// Import semua header
import Absensi from '@/components/kmz_headers/dosen_absensi';
import Nilai from '@/components/kmz_headers/dosen_nilai';
import JadwalDosen from '@/components/kmz_headers/dosen_riwayat_mengajar';
import Jadwal from '@/components/kmz_headers/prodi_jadwal';
import JadwalAdd from '@/components/kmz_headers/prodi_jadwal_add';
import JadwalBerlansung from '@/components/kmz_headers/prodi_jadwal_berlansung';
import Terjadwal from '@/components/kmz_headers/prodi_jadwal_terjadwal';
import Mahasiswa from '@/components/kmz_headers/prodi_mahasiswa';
import ProgramAngkatan from '@/components/kmz_headers/prodi_program_angkatan';

// Mapping halaman ke komponen header
const headerComponents = {
    'prodi/mahasiswa': Mahasiswa,
    'prodi/jadwalperkuliahan': Jadwal,
    'prodi/jadwalperkuliahanadd': JadwalAdd,
    'prodi/jadwalperkuliahanberlansung': JadwalBerlansung,
    'prodi/jadwalperkuliahanterjadwal': Terjadwal,
    'dosen/absensiPerkuliahan': Absensi,
    'dosen/nilaiMahasiswa': Nilai,
    'prodi/programangkatan': ProgramAngkatan,
    'dosen/jadwalMengajar': JadwalDosen,
};

export function AppSidebarHeader({ breadcrumbs = [] }) {
    const { component } = usePage();
    const { auth } = usePage<SharedData>().props;

    const HeaderComponent = headerComponents[component]; // Ambil komponen sesuai halaman

    return (
        <header className="border-sidebar-border/50 flex h-16 shrink-0 items-center gap-2 border-b px-6 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 md:px-4">
            <div className="flex items-center gap-2">
                <SidebarTrigger className="-ml-1" />
                <Breadcrumbs breadcrumbs={breadcrumbs} />
            </div>

            {/* Render komponen header sesuai halaman */}
            {HeaderComponent && component.split('/')[0] === auth.user?.role ? <HeaderComponent /> : null}
        </header>
    );
}
