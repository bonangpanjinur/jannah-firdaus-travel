export interface KotaLayanan {
  slug: string;
  nama: string;
  provinsi: string;
  bandara: string;
  intro: string;
  service_note: string;
  wilayah: string[];
}

export const KOTA_LAYANAN: KotaLayanan[] = [
  {
    slug: "jakarta-pusat",
    nama: "Jakarta Pusat",
    provinsi: "DKI Jakarta",
    bandara: "Bandara Soekarno-Hatta",
    intro:
      "Jamaah dari Jakarta Pusat dapat berkonsultasi di kantor kami maupun secara daring, dengan penjemputan titik kumpul yang mudah dijangkau dari pusat kota.",
    service_note:
      "Kami membantu jamaah dari pusat kota menyiapkan dokumen, memilih tipe kamar, dan mengikuti manasik sebelum keberangkatan.",
    wilayah: [
      "Menteng",
      "Tanah Abang",
      "Senen",
      "Cempaka Putih",
      "Kemayoran",
      "Johar Baru",
      "Gambir",
      "Sawah Besar",
    ],
  },
  {
    slug: "jakarta-timur",
    nama: "Jakarta Timur",
    provinsi: "DKI Jakarta",
    bandara: "Bandara Soekarno-Hatta",
    intro:
      "Kami rutin memberangkatkan rombongan jamaah dari Jakarta Timur, termasuk kelompok pengajian dan keluarga besar.",
    service_note:
      "Layanan konsultasi daring memudahkan keluarga besar dan kelompok pengajian menyamakan jadwal serta kebutuhan kamar.",
    wilayah: [
      "Cakung",
      "Duren Sawit",
      "Jatinegara",
      "Kramat Jati",
      "Pasar Rebo",
      "Ciracas",
      "Cipayung",
      "Makasar",
    ],
  },
  {
    slug: "jakarta-barat",
    nama: "Jakarta Barat",
    provinsi: "DKI Jakarta",
    bandara: "Bandara Soekarno-Hatta",
    intro:
      "Lokasi Jakarta Barat sangat dekat dengan Bandara Soekarno-Hatta sehingga perjalanan menuju titik kumpul lebih singkat.",
    service_note:
      "Tim menginformasikan titik kumpul dan jadwal keberangkatan lebih awal agar jamaah dapat mengatur perjalanan menuju bandara.",
    wilayah: [
      "Kebon Jeruk",
      "Kembangan",
      "Palmerah",
      "Grogol Petamburan",
      "Cengkareng",
      "Kalideres",
      "Tambora",
      "Taman Sari",
    ],
  },
  {
    slug: "jakarta-utara",
    nama: "Jakarta Utara",
    provinsi: "DKI Jakarta",
    bandara: "Bandara Soekarno-Hatta",
    intro:
      "Jamaah Jakarta Utara kami dampingi mulai dari pendaftaran, manasik, hingga keberangkatan bersama rombongan.",
    service_note:
      "Pendampingan dimulai dari konsultasi paket dan kelengkapan dokumen hingga koordinasi rombongan di hari keberangkatan.",
    wilayah: ["Kelapa Gading", "Tanjung Priok", "Koja", "Cilincing", "Pademangan", "Penjaringan"],
  },
  {
    slug: "depok",
    nama: "Depok",
    provinsi: "Jawa Barat",
    bandara: "Bandara Soekarno-Hatta",
    intro:
      "Depok berbatasan langsung dengan Jakarta Selatan, sehingga jamaah dapat datang ke kantor kami tanpa perjalanan jauh.",
    service_note:
      "Jamaah Depok dapat memilih konsultasi langsung atau daring, kemudian mengikuti alur pendaftaran dan manasik yang sama.",
    wilayah: ["Beji", "Margonda", "Cimanggis", "Sawangan", "Cinere", "Tapos", "Sukmajaya", "Limo"],
  },
  {
    slug: "tangerang-selatan",
    nama: "Tangerang Selatan",
    provinsi: "Banten",
    bandara: "Bandara Soekarno-Hatta",
    intro:
      "Jamaah Tangerang Selatan menikmati akses paling dekat ke bandara, dengan pendampingan tim sejak titik kumpul.",
    service_note:
      "Informasi titik kumpul, bagasi, dan jadwal penerbangan disiapkan agar jamaah dapat berangkat dengan lebih tenang.",
    wilayah: ["BSD", "Serpong", "Ciputat", "Pamulang", "Pondok Aren", "Bintaro", "Setu"],
  },
  {
    slug: "bekasi",
    nama: "Bekasi",
    provinsi: "Jawa Barat",
    bandara: "Bandara Soekarno-Hatta",
    intro:
      "Kami melayani jamaah Kota dan Kabupaten Bekasi dengan konsultasi daring serta manasik bersama sebelum keberangkatan.",
    service_note:
      "Keluarga dari Kota maupun Kabupaten Bekasi dapat mengurus konsultasi dan pengiriman dokumen secara bertahap melalui tim kami.",
    wilayah: [
      "Bekasi Timur",
      "Bekasi Barat",
      "Bekasi Selatan",
      "Bekasi Utara",
      "Jatiasih",
      "Pondok Gede",
      "Tambun",
      "Cikarang",
    ],
  },
  {
    slug: "bogor",
    nama: "Bogor",
    provinsi: "Jawa Barat",
    bandara: "Bandara Soekarno-Hatta",
    intro:
      "Jamaah Bogor dan sekitarnya dapat mendaftar sepenuhnya secara daring, dokumen kami bantu proses hingga selesai.",
    service_note:
      "Pendaftaran daring membantu jamaah Bogor menyiapkan dokumen dari rumah sebelum mengikuti manasik dan koordinasi rombongan.",
    wilayah: [
      "Bogor Kota",
      "Cibinong",
      "Sentul",
      "Cileungsi",
      "Parung",
      "Ciomas",
      "Dramaga",
      "Citeureup",
    ],
  },
];

export function kotaBySlug(slug: string): KotaLayanan | undefined {
  return KOTA_LAYANAN.find((kota) => kota.slug === slug);
}
