export interface KotaLayanan {
  slug: string;
  nama: string;
  provinsi: string;
  bandara: string;
  intro: string;
  service_note: string;
  wilayah: string[];
}

// Hanya kota prioritas yang saat ini layak dimasukkan ke indeks dan sitemap.
// Kota lain tetap dapat diakses, tetapi diberi meta robots noindex.
export const INDEXABLE_KOTA = new Set<string>([
  "jakarta",
  "bogor",
  "bandung",
  "tangerang",
  "bekasi",
  "semarang",
  "kota-surabaya",
  "kota-yogyakarta",
  "depok",
  "tangerang-selatan",
]);

export const KOTA_LAYANAN: KotaLayanan[] = [
  {
    slug: "jakarta",
    nama: "Jakarta",
    provinsi: "DKI Jakarta",
    bandara: "Bandara Soekarno-Hatta",
    intro:
      "Jamaah di wilayah Jakarta dapat berkonsultasi mengenai paket, dokumen, dan jadwal keberangkatan dengan tim Jannah Firdaus Tour Travel.",
    service_note:
      "Konfirmasikan jadwal manasik, titik kumpul, dan ketersediaan paket kepada tim sebelum melakukan pendaftaran.",
    wilayah: [
      "Jakarta Pusat",
      "Jakarta Utara",
      "Jakarta Barat",
      "Jakarta Selatan",
      "Jakarta Timur",
    ],
  },
  {
    slug: "jakarta-selatan",
    nama: "Jakarta Selatan",
    provinsi: "DKI Jakarta",
    bandara: "Bandara Soekarno-Hatta",
    intro:
      "Jamaah di Jakarta Selatan dapat berkonsultasi mengenai pilihan paket, dokumen, dan jadwal keberangkatan melalui tim Jannah Firdaus Tour Travel.",
    service_note:
      "Untuk keberangkatan dari Jakarta Selatan, konfirmasikan titik kumpul, jadwal manasik, dan ketersediaan paket langsung kepada tim sebelum mendaftar.",
    wilayah: [
      "Kebayoran Baru",
      "Kebayoran Lama",
      "Pesanggrahan",
      "Cilandak",
      "Pasar Minggu",
      "Jagakarsa",
      "Mampang Prapatan",
      "Pancoran",
      "Tebet",
      "Setiabudi",
    ],
  },
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

  {
    slug: "banggai",
    nama: "Banggai",
    provinsi: "Sulawesi Tengah",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Banggai dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Banggai, Sulawesi Tengah, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "banggai-kepulauan",
    nama: "Banggai Kepulauan",
    provinsi: "Sulawesi Tengah",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Banggai Kepulauan dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Banggai Kepulauan, Sulawesi Tengah, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "banggai-laut",
    nama: "Banggai Laut",
    provinsi: "Sulawesi Tengah",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Banggai Laut dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Banggai Laut, Sulawesi Tengah, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "bantaeng",
    nama: "Bantaeng",
    provinsi: "Sulawesi Selatan",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Bantaeng dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Bantaeng, Sulawesi Selatan, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "barru",
    nama: "Barru",
    provinsi: "Sulawesi Selatan",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Barru dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Barru, Sulawesi Selatan, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "boalemo",
    nama: "Boalemo",
    provinsi: "Gorontalo",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Boalemo dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Boalemo, Gorontalo, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "bolaang-mongondow",
    nama: "Bolaang Mongondow",
    provinsi: "Sulawesi Utara",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Bolaang Mongondow dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Bolaang Mongondow, Sulawesi Utara, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "bolaang-mongondow-selatan",
    nama: "Bolaang Mongondow Selatan",
    provinsi: "Sulawesi Utara",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Bolaang Mongondow Selatan dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Bolaang Mongondow Selatan, Sulawesi Utara, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "bolaang-mongondow-timur",
    nama: "Bolaang Mongondow Timur",
    provinsi: "Sulawesi Utara",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Bolaang Mongondow Timur dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Bolaang Mongondow Timur, Sulawesi Utara, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "bolaang-mongondow-utara",
    nama: "Bolaang Mongondow Utara",
    provinsi: "Sulawesi Utara",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Bolaang Mongondow Utara dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Bolaang Mongondow Utara, Sulawesi Utara, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "bombana",
    nama: "Bombana",
    provinsi: "Sulawesi Tenggara",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Bombana dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Bombana, Sulawesi Tenggara, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "bone",
    nama: "Bone",
    provinsi: "Sulawesi Selatan",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Bone dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Bone, Sulawesi Selatan, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "bone-bolango",
    nama: "Bone Bolango",
    provinsi: "Gorontalo",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Bone Bolango dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Bone Bolango, Gorontalo, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "bulukumba",
    nama: "Bulukumba",
    provinsi: "Sulawesi Selatan",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Bulukumba dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Bulukumba, Sulawesi Selatan, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "buol",
    nama: "Buol",
    provinsi: "Sulawesi Tengah",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Buol dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Buol, Sulawesi Tengah, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "buru",
    nama: "Buru",
    provinsi: "Maluku",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Buru dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Buru, Maluku, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "buru-selatan",
    nama: "Buru Selatan",
    provinsi: "Maluku",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Buru Selatan dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Buru Selatan, Maluku, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "buton",
    nama: "Buton",
    provinsi: "Sulawesi Tenggara",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Buton dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Buton, Sulawesi Tenggara, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "buton-selatan",
    nama: "Buton Selatan",
    provinsi: "Sulawesi Tenggara",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Buton Selatan dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Buton Selatan, Sulawesi Tenggara, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "buton-tengah",
    nama: "Buton Tengah",
    provinsi: "Sulawesi Tenggara",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Buton Tengah dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Buton Tengah, Sulawesi Tenggara, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "buton-utara",
    nama: "Buton Utara",
    provinsi: "Sulawesi Tenggara",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Buton Utara dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Buton Utara, Sulawesi Tenggara, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "donggala",
    nama: "Donggala",
    provinsi: "Sulawesi Tengah",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Donggala dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Donggala, Sulawesi Tengah, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "enrekang",
    nama: "Enrekang",
    provinsi: "Sulawesi Selatan",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Enrekang dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Enrekang, Sulawesi Selatan, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "gorontalo",
    nama: "Gorontalo",
    provinsi: "Gorontalo",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Gorontalo dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Gorontalo, Gorontalo, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "gorontalo-utara",
    nama: "Gorontalo Utara",
    provinsi: "Gorontalo",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Gorontalo Utara dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Gorontalo Utara, Gorontalo, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "gowa",
    nama: "Gowa",
    provinsi: "Sulawesi Selatan",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Gowa dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Gowa, Sulawesi Selatan, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "halmahera-barat",
    nama: "Halmahera Barat",
    provinsi: "Maluku Utara",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Halmahera Barat dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Halmahera Barat, Maluku Utara, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "halmahera-selatan",
    nama: "Halmahera Selatan",
    provinsi: "Maluku Utara",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Halmahera Selatan dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Halmahera Selatan, Maluku Utara, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "halmahera-tengah",
    nama: "Halmahera Tengah",
    provinsi: "Maluku Utara",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Halmahera Tengah dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Halmahera Tengah, Maluku Utara, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "halmahera-timur",
    nama: "Halmahera Timur",
    provinsi: "Maluku Utara",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Halmahera Timur dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Halmahera Timur, Maluku Utara, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "halmahera-utara",
    nama: "Halmahera Utara",
    provinsi: "Maluku Utara",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Halmahera Utara dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Halmahera Utara, Maluku Utara, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "jeneponto",
    nama: "Jeneponto",
    provinsi: "Sulawesi Selatan",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Jeneponto dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Jeneponto, Sulawesi Selatan, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "kepulauan-aru",
    nama: "Kepulauan Aru",
    provinsi: "Maluku",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Kepulauan Aru dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Kepulauan Aru, Maluku, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "kepulauan-sangihe",
    nama: "Kepulauan Sangihe",
    provinsi: "Sulawesi Utara",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Kepulauan Sangihe dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Kepulauan Sangihe, Sulawesi Utara, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "kepulauan-selayar",
    nama: "Kepulauan Selayar",
    provinsi: "Sulawesi Selatan",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Kepulauan Selayar dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Kepulauan Selayar, Sulawesi Selatan, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "kep-siau-tagulandang-biaro",
    nama: "Kep. Siau Tagulandang Biaro",
    provinsi: "Sulawesi Utara",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Kep. Siau Tagulandang Biaro dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Kep. Siau Tagulandang Biaro, Sulawesi Utara, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "kepulauan-sula",
    nama: "Kepulauan Sula",
    provinsi: "Maluku Utara",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Kepulauan Sula dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Kepulauan Sula, Maluku Utara, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "kepulauan-talaud",
    nama: "Kepulauan Talaud",
    provinsi: "Sulawesi Utara",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Kepulauan Talaud dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Kepulauan Talaud, Sulawesi Utara, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "kepulauan-tanimbar",
    nama: "Kepulauan Tanimbar",
    provinsi: "Maluku",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Kepulauan Tanimbar dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Kepulauan Tanimbar, Maluku, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "kolaka",
    nama: "Kolaka",
    provinsi: "Sulawesi Tenggara",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Kolaka dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Kolaka, Sulawesi Tenggara, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "kolaka-timur",
    nama: "Kolaka Timur",
    provinsi: "Sulawesi Tenggara",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Kolaka Timur dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Kolaka Timur, Sulawesi Tenggara, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "kolaka-utara",
    nama: "Kolaka Utara",
    provinsi: "Sulawesi Tenggara",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Kolaka Utara dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Kolaka Utara, Sulawesi Tenggara, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "konawe",
    nama: "Konawe",
    provinsi: "Sulawesi Tenggara",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Konawe dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Konawe, Sulawesi Tenggara, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "konawe-kepulauan",
    nama: "Konawe Kepulauan",
    provinsi: "Sulawesi Tenggara",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Konawe Kepulauan dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Konawe Kepulauan, Sulawesi Tenggara, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "konawe-selatan",
    nama: "Konawe Selatan",
    provinsi: "Sulawesi Tenggara",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Konawe Selatan dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Konawe Selatan, Sulawesi Tenggara, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "konawe-utara",
    nama: "Konawe Utara",
    provinsi: "Sulawesi Tenggara",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Konawe Utara dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Konawe Utara, Sulawesi Tenggara, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "kota-ambon",
    nama: "Kota Ambon",
    provinsi: "Maluku",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Kota Ambon dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Kota Ambon, Maluku, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "kota-bau-bau",
    nama: "Kota Bau Bau",
    provinsi: "Sulawesi Tenggara",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Kota Bau Bau dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Kota Bau Bau, Sulawesi Tenggara, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "kota-bitung",
    nama: "Kota Bitung",
    provinsi: "Sulawesi Utara",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Kota Bitung dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Kota Bitung, Sulawesi Utara, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "kota-gorontalo",
    nama: "Kota Gorontalo",
    provinsi: "Gorontalo",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Kota Gorontalo dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Kota Gorontalo, Gorontalo, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "kota-kendari",
    nama: "Kota Kendari",
    provinsi: "Sulawesi Tenggara",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Kota Kendari dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Kota Kendari, Sulawesi Tenggara, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "kota-kotamobagu",
    nama: "Kota Kotamobagu",
    provinsi: "Sulawesi Utara",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Kota Kotamobagu dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Kota Kotamobagu, Sulawesi Utara, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "kota-makassar",
    nama: "Kota Makassar",
    provinsi: "Sulawesi Selatan",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Kota Makassar dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Kota Makassar, Sulawesi Selatan, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "kota-manado",
    nama: "Kota Manado",
    provinsi: "Sulawesi Utara",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Kota Manado dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Kota Manado, Sulawesi Utara, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "kota-palopo",
    nama: "Kota Palopo",
    provinsi: "Sulawesi Selatan",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Kota Palopo dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Kota Palopo, Sulawesi Selatan, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "kota-palu",
    nama: "Kota Palu",
    provinsi: "Sulawesi Tengah",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Kota Palu dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Kota Palu, Sulawesi Tengah, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "kota-parepare",
    nama: "Kota Parepare",
    provinsi: "Sulawesi Selatan",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Kota Parepare dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Kota Parepare, Sulawesi Selatan, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "kota-ternate",
    nama: "Kota Ternate",
    provinsi: "Maluku Utara",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Kota Ternate dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Kota Ternate, Maluku Utara, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "kota-tidore-kepulauan",
    nama: "Kota Tidore Kepulauan",
    provinsi: "Maluku Utara",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Kota Tidore Kepulauan dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Kota Tidore Kepulauan, Maluku Utara, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "kota-tomohon",
    nama: "Kota Tomohon",
    provinsi: "Sulawesi Utara",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Kota Tomohon dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Kota Tomohon, Sulawesi Utara, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "kota-tual",
    nama: "Kota Tual",
    provinsi: "Maluku",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Kota Tual dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Kota Tual, Maluku, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "luwu",
    nama: "Luwu",
    provinsi: "Sulawesi Selatan",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Luwu dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Luwu, Sulawesi Selatan, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "luwu-timur",
    nama: "Luwu Timur",
    provinsi: "Sulawesi Selatan",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Luwu Timur dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Luwu Timur, Sulawesi Selatan, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "majene",
    nama: "Majene",
    provinsi: "Sulawesi Barat",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Majene dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Majene, Sulawesi Barat, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "maluku-barat-daya",
    nama: "Maluku Barat Daya",
    provinsi: "Maluku",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Maluku Barat Daya dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Maluku Barat Daya, Maluku, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "maluku-tengah",
    nama: "Maluku Tengah",
    provinsi: "Maluku",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Maluku Tengah dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Maluku Tengah, Maluku, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "minahasa-selatan-bolaang-mongondwo-timur",
    nama: "Minahasa Selatan/Bolaang Mongondwo Timur",
    provinsi: "Sulawesi Utara",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Minahasa Selatan/Bolaang Mongondwo Timur dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Minahasa Selatan/Bolaang Mongondwo Timur, Sulawesi Utara, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "minahasa-tenggara",
    nama: "Minahasa Tenggara",
    provinsi: "Sulawesi Utara",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Minahasa Tenggara dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Minahasa Tenggara, Sulawesi Utara, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "minahasa-utara",
    nama: "Minahasa Utara",
    provinsi: "Sulawesi Utara",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Minahasa Utara dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Minahasa Utara, Sulawesi Utara, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "morowali",
    nama: "Morowali",
    provinsi: "Sulawesi Tengah",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Morowali dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Morowali, Sulawesi Tengah, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "mamasa",
    nama: "Mamasa",
    provinsi: "Sulawesi Barat",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Mamasa dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Mamasa, Sulawesi Barat, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "mamuju",
    nama: "Mamuju",
    provinsi: "Sulawesi Barat",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Mamuju dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Mamuju, Sulawesi Barat, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "mamuju-tengah",
    nama: "Mamuju Tengah",
    provinsi: "Sulawesi Barat",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Mamuju Tengah dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Mamuju Tengah, Sulawesi Barat, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "maros",
    nama: "Maros",
    provinsi: "Sulawesi Selatan",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Maros dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Maros, Sulawesi Selatan, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "minahasa",
    nama: "Minahasa",
    provinsi: "Sulawesi Utara",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Minahasa dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Minahasa, Sulawesi Utara, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "minahasa-selatan",
    nama: "Minahasa Selatan",
    provinsi: "Sulawesi Utara",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Minahasa Selatan dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Minahasa Selatan, Sulawesi Utara, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "morowali-utara",
    nama: "Morowali Utara",
    provinsi: "Sulawesi Tengah",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Morowali Utara dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Morowali Utara, Sulawesi Tengah, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "muna",
    nama: "Muna",
    provinsi: "Sulawesi Tenggara",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Muna dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Muna, Sulawesi Tenggara, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "muna-barat",
    nama: "Muna Barat",
    provinsi: "Sulawesi Tenggara",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Muna Barat dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Muna Barat, Sulawesi Tenggara, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "pohuwato",
    nama: "Pohuwato",
    provinsi: "Gorontalo",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Pohuwato dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Pohuwato, Gorontalo, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "pangkajene-dan-kepulauan",
    nama: "Pangkajene Dan Kepulauan",
    provinsi: "Sulawesi Selatan",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Pangkajene Dan Kepulauan dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Pangkajene Dan Kepulauan, Sulawesi Selatan, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "parigi-moutong",
    nama: "Parigi Moutong",
    provinsi: "Sulawesi Tengah",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Parigi Moutong dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Parigi Moutong, Sulawesi Tengah, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "pasangkayu",
    nama: "Pasangkayu",
    provinsi: "Sulawesi Barat",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Pasangkayu dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Pasangkayu, Sulawesi Barat, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "pinrang",
    nama: "Pinrang",
    provinsi: "Sulawesi Selatan",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Pinrang dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Pinrang, Sulawesi Selatan, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "polewali-mandar",
    nama: "Polewali Mandar",
    provinsi: "Sulawesi Barat",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Polewali Mandar dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Polewali Mandar, Sulawesi Barat, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "pulau-morotai",
    nama: "Pulau Morotai",
    provinsi: "Maluku Utara",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Pulau Morotai dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Pulau Morotai, Maluku Utara, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "pulau-taliabu",
    nama: "Pulau Taliabu",
    provinsi: "Maluku Utara",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Pulau Taliabu dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Pulau Taliabu, Maluku Utara, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "seram-bagian-barat",
    nama: "Seram Bagian Barat",
    provinsi: "Maluku",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Seram Bagian Barat dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Seram Bagian Barat, Maluku, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "seram-bagian-timur",
    nama: "Seram Bagian Timur",
    provinsi: "Maluku",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Seram Bagian Timur dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Seram Bagian Timur, Maluku, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "sidenreng-rappang",
    nama: "Sidenreng Rappang",
    provinsi: "Sulawesi Selatan",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Sidenreng Rappang dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Sidenreng Rappang, Sulawesi Selatan, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "sigi",
    nama: "Sigi",
    provinsi: "Sulawesi Tengah",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Sigi dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Sigi, Sulawesi Tengah, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "sinjai",
    nama: "Sinjai",
    provinsi: "Sulawesi Selatan",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Sinjai dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Sinjai, Sulawesi Selatan, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "soppeng",
    nama: "Soppeng",
    provinsi: "Sulawesi Selatan",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Soppeng dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Soppeng, Sulawesi Selatan, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "takalar",
    nama: "Takalar",
    provinsi: "Sulawesi Selatan",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Takalar dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Takalar, Sulawesi Selatan, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "tana-toraja",
    nama: "Tana Toraja",
    provinsi: "Sulawesi Selatan",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Tana Toraja dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Tana Toraja, Sulawesi Selatan, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "tojo-una-una",
    nama: "Tojo Una Una",
    provinsi: "Sulawesi Tengah",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Tojo Una Una dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Tojo Una Una, Sulawesi Tengah, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "toli-toli",
    nama: "Toli Toli",
    provinsi: "Sulawesi Tengah",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Toli Toli dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Toli Toli, Sulawesi Tengah, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "toraja-utara",
    nama: "Toraja Utara",
    provinsi: "Sulawesi Selatan",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Toraja Utara dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Toraja Utara, Sulawesi Selatan, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "wakatobi",
    nama: "Wakatobi",
    provinsi: "Sulawesi Tenggara",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Wakatobi dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Wakatobi, Sulawesi Tenggara, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "wajo",
    nama: "Wajo",
    provinsi: "Sulawesi Selatan",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Wajo dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Wajo, Sulawesi Selatan, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "luwu-utara",
    nama: "Luwu Utara",
    provinsi: "Sulawesi Selatan",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Luwu Utara dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Luwu Utara, Sulawesi Selatan, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "aceh-barat",
    nama: "Aceh Barat",
    provinsi: "Aceh",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Aceh Barat dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Aceh Barat, Aceh, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "aceh-barat-daya",
    nama: "Aceh Barat Daya",
    provinsi: "Aceh",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Aceh Barat Daya dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Aceh Barat Daya, Aceh, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "aceh-besar",
    nama: "Aceh Besar",
    provinsi: "Aceh",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Aceh Besar dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Aceh Besar, Aceh, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "aceh-jaya",
    nama: "Aceh Jaya",
    provinsi: "Aceh",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Aceh Jaya dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Aceh Jaya, Aceh, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "aceh-selatan",
    nama: "Aceh Selatan",
    provinsi: "Aceh",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Aceh Selatan dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Aceh Selatan, Aceh, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "aceh-singkil",
    nama: "Aceh Singkil",
    provinsi: "Aceh",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Aceh Singkil dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Aceh Singkil, Aceh, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "aceh-tamiang",
    nama: "Aceh Tamiang",
    provinsi: "Aceh",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Aceh Tamiang dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Aceh Tamiang, Aceh, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "aceh-tengah",
    nama: "Aceh Tengah",
    provinsi: "Aceh",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Aceh Tengah dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Aceh Tengah, Aceh, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "aceh-tenggara",
    nama: "Aceh Tenggara",
    provinsi: "Aceh",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Aceh Tenggara dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Aceh Tenggara, Aceh, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "aceh-timur",
    nama: "Aceh Timur",
    provinsi: "Aceh",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Aceh Timur dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Aceh Timur, Aceh, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "aceh-utara",
    nama: "Aceh Utara",
    provinsi: "Aceh",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Aceh Utara dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Aceh Utara, Aceh, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "agam",
    nama: "Agam",
    provinsi: "Sumatera Barat",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Agam dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Agam, Sumatera Barat, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "asahan",
    nama: "Asahan",
    provinsi: "Sumatera Utara",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Asahan dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Asahan, Sumatera Utara, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "bangka",
    nama: "Bangka",
    provinsi: "Kepulauan Bangka Belitung",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Bangka dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Bangka, Kepulauan Bangka Belitung, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "bangka-barat",
    nama: "Bangka Barat",
    provinsi: "Kepulauan Bangka Belitung",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Bangka Barat dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Bangka Barat, Kepulauan Bangka Belitung, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "bangka-selatan",
    nama: "Bangka Selatan",
    provinsi: "Kepulauan Bangka Belitung",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Bangka Selatan dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Bangka Selatan, Kepulauan Bangka Belitung, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "bangka-tengah",
    nama: "Bangka Tengah",
    provinsi: "Kepulauan Bangka Belitung",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Bangka Tengah dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Bangka Tengah, Kepulauan Bangka Belitung, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "banyuasin",
    nama: "Banyuasin",
    provinsi: "Sumatera Selatan",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Banyuasin dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Banyuasin, Sumatera Selatan, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "batanghari",
    nama: "Batanghari",
    provinsi: "Jambi",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Batanghari dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Batanghari, Jambi, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "batu-bara",
    nama: "Batu Bara",
    provinsi: "Sumatera Utara",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Batu Bara dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Batu Bara, Sumatera Utara, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "belitung",
    nama: "Belitung",
    provinsi: "Kepulauan Bangka Belitung",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Belitung dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Belitung, Kepulauan Bangka Belitung, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "belitung-timur",
    nama: "Belitung Timur",
    provinsi: "Kepulauan Bangka Belitung",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Belitung Timur dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Belitung Timur, Kepulauan Bangka Belitung, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "bener-meriah",
    nama: "Bener Meriah",
    provinsi: "Aceh",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Bener Meriah dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Bener Meriah, Aceh, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "bengkalis",
    nama: "Bengkalis",
    provinsi: "Riau",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Bengkalis dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Bengkalis, Riau, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "bengkulu-selatan",
    nama: "Bengkulu Selatan",
    provinsi: "Bengkulu",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Bengkulu Selatan dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Bengkulu Selatan, Bengkulu, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "bengkulu-tengah",
    nama: "Bengkulu Tengah",
    provinsi: "Bengkulu",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Bengkulu Tengah dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Bengkulu Tengah, Bengkulu, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "bengkulu-utara",
    nama: "Bengkulu Utara",
    provinsi: "Bengkulu",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Bengkulu Utara dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Bengkulu Utara, Bengkulu, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "bintan",
    nama: "Bintan",
    provinsi: "Kepulauan Riau",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Bintan dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Bintan, Kepulauan Riau, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "bireuen",
    nama: "Bireuen",
    provinsi: "Aceh",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Bireuen dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Bireuen, Aceh, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "bungo",
    nama: "Bungo",
    provinsi: "Jambi",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Bungo dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Bungo, Jambi, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "dairi",
    nama: "Dairi",
    provinsi: "Sumatera Utara",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Dairi dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Dairi, Sumatera Utara, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "deli-serdang",
    nama: "Deli Serdang",
    provinsi: "Sumatera Utara",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Deli Serdang dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Deli Serdang, Sumatera Utara, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "dharmasraya",
    nama: "Dharmasraya",
    provinsi: "Sumatera Barat",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Dharmasraya dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Dharmasraya, Sumatera Barat, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "empat-lawang",
    nama: "Empat Lawang",
    provinsi: "Sumatera Selatan",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Empat Lawang dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Empat Lawang, Sumatera Selatan, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "gayo-lues",
    nama: "Gayo Lues",
    provinsi: "Aceh",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Gayo Lues dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Gayo Lues, Aceh, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "humbang-hasundutan",
    nama: "Humbang Hasundutan",
    provinsi: "Sumatera Utara",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Humbang Hasundutan dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Humbang Hasundutan, Sumatera Utara, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "indragiri-hilir",
    nama: "Indragiri Hilir",
    provinsi: "Riau",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Indragiri Hilir dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Indragiri Hilir, Riau, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "indragiri-hulu",
    nama: "Indragiri Hulu",
    provinsi: "Riau",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Indragiri Hulu dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Indragiri Hulu, Riau, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "kampar",
    nama: "Kampar",
    provinsi: "Riau",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Kampar dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Kampar, Riau, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "karimun",
    nama: "Karimun",
    provinsi: "Kepulauan Riau",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Karimun dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Karimun, Kepulauan Riau, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "karo",
    nama: "Karo",
    provinsi: "Sumatera Utara",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Karo dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Karo, Sumatera Utara, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "kaur",
    nama: "Kaur",
    provinsi: "Bengkulu",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Kaur dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Kaur, Bengkulu, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "kepahiang",
    nama: "Kepahiang",
    provinsi: "Bengkulu",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Kepahiang dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Kepahiang, Bengkulu, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "kepulauan-anambas",
    nama: "Kepulauan Anambas",
    provinsi: "Kepulauan Riau",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Kepulauan Anambas dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Kepulauan Anambas, Kepulauan Riau, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "garut",
    nama: "Garut",
    provinsi: "Jawa Barat",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Garut dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Garut, Jawa Barat, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "kepulauan-mentawai",
    nama: "Kepulauan Mentawai",
    provinsi: "Sumatera Barat",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Kepulauan Mentawai dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Kepulauan Mentawai, Sumatera Barat, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "kepulauan-meranti",
    nama: "Kepulauan Meranti",
    provinsi: "Riau",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Kepulauan Meranti dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Kepulauan Meranti, Riau, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "kerinci",
    nama: "Kerinci",
    provinsi: "Jambi",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Kerinci dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Kerinci, Jambi, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "kota-banda-aceh",
    nama: "Kota Banda Aceh",
    provinsi: "Aceh",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Kota Banda Aceh dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Kota Banda Aceh, Aceh, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "kota-bandar-lampung",
    nama: "Kota Bandar Lampung",
    provinsi: "Lampung",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Kota Bandar Lampung dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Kota Bandar Lampung, Lampung, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "kota-batam",
    nama: "Kota Batam",
    provinsi: "Kepulauan Riau",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Kota Batam dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Kota Batam, Kepulauan Riau, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "kota-bengkulu",
    nama: "Kota Bengkulu",
    provinsi: "Bengkulu",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Kota Bengkulu dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Kota Bengkulu, Bengkulu, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "kota-binjai",
    nama: "Kota Binjai",
    provinsi: "Sumatera Utara",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Kota Binjai dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Kota Binjai, Sumatera Utara, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "kota-bukittinggi",
    nama: "Kota Bukittinggi",
    provinsi: "Sumatera Barat",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Kota Bukittinggi dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Kota Bukittinggi, Sumatera Barat, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "gianyar",
    nama: "Gianyar",
    provinsi: "Bali",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Gianyar dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Gianyar, Bali, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "kota-dumai",
    nama: "Kota Dumai",
    provinsi: "Riau",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Kota Dumai dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Kota Dumai, Riau, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "kota-gunungsitoli",
    nama: "Kota Gunungsitoli",
    provinsi: "Sumatera Utara",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Kota Gunungsitoli dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Kota Gunungsitoli, Sumatera Utara, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "kota-jambi",
    nama: "Kota Jambi",
    provinsi: "Jambi",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Kota Jambi dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Kota Jambi, Jambi, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "kota-langsa",
    nama: "Kota Langsa",
    provinsi: "Aceh",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Kota Langsa dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Kota Langsa, Aceh, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "kota-lhokseumawe",
    nama: "Kota Lhokseumawe",
    provinsi: "Aceh",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Kota Lhokseumawe dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Kota Lhokseumawe, Aceh, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "kota-lubuk-linggau",
    nama: "Kota Lubuk Linggau",
    provinsi: "Sumatera Selatan",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Kota Lubuk Linggau dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Kota Lubuk Linggau, Sumatera Selatan, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "kota-medan",
    nama: "Kota Medan",
    provinsi: "Sumatera Utara",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Kota Medan dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Kota Medan, Sumatera Utara, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "kota-metro",
    nama: "Kota Metro",
    provinsi: "Lampung",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Kota Metro dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Kota Metro, Lampung, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "kota-padang",
    nama: "Kota Padang",
    provinsi: "Sumatera Barat",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Kota Padang dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Kota Padang, Sumatera Barat, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "kota-padang-panjang",
    nama: "Kota Padang Panjang",
    provinsi: "Sumatera Barat",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Kota Padang Panjang dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Kota Padang Panjang, Sumatera Barat, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "kota-padang-sidempuan",
    nama: "Kota Padang Sidempuan",
    provinsi: "Sumatera Utara",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Kota Padang Sidempuan dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Kota Padang Sidempuan, Sumatera Utara, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "kota-pagar-alam",
    nama: "Kota Pagar Alam",
    provinsi: "Sumatera Selatan",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Kota Pagar Alam dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Kota Pagar Alam, Sumatera Selatan, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "kota-palembang",
    nama: "Kota Palembang",
    provinsi: "Sumatera Selatan",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Kota Palembang dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Kota Palembang, Sumatera Selatan, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "kota-prabumulih",
    nama: "Kota Prabumulih",
    provinsi: "Sumatera Selatan",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Kota Prabumulih dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Kota Prabumulih, Sumatera Selatan, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "kota-sabang",
    nama: "Kota Sabang",
    provinsi: "Aceh",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Kota Sabang dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Kota Sabang, Aceh, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "kota-solok",
    nama: "Kota Solok",
    provinsi: "Sumatera Barat",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Kota Solok dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Kota Solok, Sumatera Barat, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "mandailing-natal",
    nama: "Mandailing Natal",
    provinsi: "Sumatera Utara",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Mandailing Natal dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Mandailing Natal, Sumatera Utara, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "kota-pangkal-pinang",
    nama: "Kota Pangkal Pinang",
    provinsi: "Kepulauan Bangka Belitung",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Kota Pangkal Pinang dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Kota Pangkal Pinang, Kepulauan Bangka Belitung, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "kota-pariaman",
    nama: "Kota Pariaman",
    provinsi: "Sumatera Barat",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Kota Pariaman dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Kota Pariaman, Sumatera Barat, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "kota-payakumbuh",
    nama: "Kota Payakumbuh",
    provinsi: "Sumatera Barat",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Kota Payakumbuh dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Kota Payakumbuh, Sumatera Barat, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "kota-pekanbaru",
    nama: "Kota Pekanbaru",
    provinsi: "Riau",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Kota Pekanbaru dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Kota Pekanbaru, Riau, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "kota-pematangsiantar",
    nama: "Kota Pematangsiantar",
    provinsi: "Sumatera Utara",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Kota Pematangsiantar dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Kota Pematangsiantar, Sumatera Utara, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "kota-sawahlunto",
    nama: "Kota Sawahlunto",
    provinsi: "Sumatera Barat",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Kota Sawahlunto dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Kota Sawahlunto, Sumatera Barat, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "kota-sibolga",
    nama: "Kota Sibolga",
    provinsi: "Sumatera Utara",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Kota Sibolga dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Kota Sibolga, Sumatera Utara, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "kuantan-singingi",
    nama: "Kuantan Singingi",
    provinsi: "Riau",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Kuantan Singingi dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Kuantan Singingi, Riau, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "labuhanbatu",
    nama: "Labuhanbatu",
    provinsi: "Sumatera Utara",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Labuhanbatu dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Labuhanbatu, Sumatera Utara, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "labuhanbatu-selatan",
    nama: "Labuhanbatu Selatan",
    provinsi: "Sumatera Utara",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Labuhanbatu Selatan dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Labuhanbatu Selatan, Sumatera Utara, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "labuhanbatu-utara",
    nama: "Labuhanbatu Utara",
    provinsi: "Sumatera Utara",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Labuhanbatu Utara dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Labuhanbatu Utara, Sumatera Utara, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "lahat",
    nama: "Lahat",
    provinsi: "Sumatera Selatan",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Lahat dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Lahat, Sumatera Selatan, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "lampung-barat",
    nama: "Lampung Barat",
    provinsi: "Lampung",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Lampung Barat dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Lampung Barat, Lampung, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "lampung-tengah",
    nama: "Lampung Tengah",
    provinsi: "Lampung",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Lampung Tengah dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Lampung Tengah, Lampung, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "lampung-timur",
    nama: "Lampung Timur",
    provinsi: "Lampung",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Lampung Timur dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Lampung Timur, Lampung, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "lampung-utara",
    nama: "Lampung Utara",
    provinsi: "Lampung",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Lampung Utara dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Lampung Utara, Lampung, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "langkat",
    nama: "Langkat",
    provinsi: "Sumatera Utara",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Langkat dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Langkat, Sumatera Utara, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "kota-subulussalam",
    nama: "Kota Subulussalam",
    provinsi: "Aceh",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Kota Subulussalam dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Kota Subulussalam, Aceh, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "kota-sungai-penuh",
    nama: "Kota Sungai Penuh",
    provinsi: "Jambi",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Kota Sungai Penuh dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Kota Sungai Penuh, Jambi, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "lebong",
    nama: "Lebong",
    provinsi: "Bengkulu",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Lebong dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Lebong, Bengkulu, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "lima-puluh-kota",
    nama: "Lima Puluh Kota",
    provinsi: "Sumatera Barat",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Lima Puluh Kota dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Lima Puluh Kota, Sumatera Barat, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "lingga",
    nama: "Lingga",
    provinsi: "Kepulauan Riau",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Lingga dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Lingga, Kepulauan Riau, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "merangin",
    nama: "Merangin",
    provinsi: "Jambi",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Merangin dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Merangin, Jambi, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "kota-tanjung-balai",
    nama: "Kota Tanjung Balai",
    provinsi: "Sumatera Utara",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Kota Tanjung Balai dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Kota Tanjung Balai, Sumatera Utara, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "kota-tanjung-pinang",
    nama: "Kota Tanjung Pinang",
    provinsi: "Kepulauan Riau",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Kota Tanjung Pinang dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Kota Tanjung Pinang, Kepulauan Riau, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "kota-tebing-tinggi",
    nama: "Kota Tebing Tinggi",
    provinsi: "Sumatera Utara",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Kota Tebing Tinggi dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Kota Tebing Tinggi, Sumatera Utara, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "mesuji",
    nama: "Mesuji",
    provinsi: "Lampung",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Mesuji dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Mesuji, Lampung, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "muara-enim",
    nama: "Muara Enim",
    provinsi: "Sumatera Selatan",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Muara Enim dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Muara Enim, Sumatera Selatan, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "muaro-jambi",
    nama: "Muaro Jambi",
    provinsi: "Jambi",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Muaro Jambi dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Muaro Jambi, Jambi, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "muko-muko",
    nama: "Muko Muko",
    provinsi: "Bengkulu",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Muko Muko dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Muko Muko, Bengkulu, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "musi-banyuasin",
    nama: "Musi Banyuasin",
    provinsi: "Sumatera Selatan",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Musi Banyuasin dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Musi Banyuasin, Sumatera Selatan, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "musi-rawas",
    nama: "Musi Rawas",
    provinsi: "Sumatera Selatan",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Musi Rawas dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Musi Rawas, Sumatera Selatan, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "musi-rawas-utara",
    nama: "Musi Rawas Utara",
    provinsi: "Sumatera Selatan",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Musi Rawas Utara dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Musi Rawas Utara, Sumatera Selatan, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "nagan-raya",
    nama: "Nagan Raya",
    provinsi: "Aceh",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Nagan Raya dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Nagan Raya, Aceh, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "natuna",
    nama: "Natuna",
    provinsi: "Kepulauan Riau",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Natuna dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Natuna, Kepulauan Riau, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "nias",
    nama: "Nias",
    provinsi: "Sumatera Utara",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Nias dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Nias, Sumatera Utara, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "nias-barat",
    nama: "Nias Barat",
    provinsi: "Sumatera Utara",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Nias Barat dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Nias Barat, Sumatera Utara, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "nias-selatan",
    nama: "Nias Selatan",
    provinsi: "Sumatera Utara",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Nias Selatan dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Nias Selatan, Sumatera Utara, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "nias-utara",
    nama: "Nias Utara",
    provinsi: "Sumatera Utara",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Nias Utara dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Nias Utara, Sumatera Utara, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "ogan-ilir",
    nama: "Ogan Ilir",
    provinsi: "Sumatera Selatan",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Ogan Ilir dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Ogan Ilir, Sumatera Selatan, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "ogan-komering-ilir",
    nama: "Ogan Komering Ilir",
    provinsi: "Sumatera Selatan",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Ogan Komering Ilir dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Ogan Komering Ilir, Sumatera Selatan, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "ogan-komering-ulu",
    nama: "Ogan Komering Ulu",
    provinsi: "Sumatera Selatan",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Ogan Komering Ulu dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Ogan Komering Ulu, Sumatera Selatan, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "ogan-komering-ulu-selatan",
    nama: "Ogan Komering Ulu Selatan",
    provinsi: "Sumatera Selatan",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Ogan Komering Ulu Selatan dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Ogan Komering Ulu Selatan, Sumatera Selatan, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "ogan-komering-ulu-timur",
    nama: "Ogan Komering Ulu Timur",
    provinsi: "Sumatera Selatan",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Ogan Komering Ulu Timur dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Ogan Komering Ulu Timur, Sumatera Selatan, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "padang-lawas",
    nama: "Padang Lawas",
    provinsi: "Sumatera Utara",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Padang Lawas dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Padang Lawas, Sumatera Utara, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "padang-lawas-utara",
    nama: "Padang Lawas Utara",
    provinsi: "Sumatera Utara",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Padang Lawas Utara dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Padang Lawas Utara, Sumatera Utara, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "penukal-abab-lematang-ilir",
    nama: "Penukal Abab Lematang Ilir",
    provinsi: "Sumatera Selatan",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Penukal Abab Lematang Ilir dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Penukal Abab Lematang Ilir, Sumatera Selatan, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "pesawaran",
    nama: "Pesawaran",
    provinsi: "Lampung",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Pesawaran dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Pesawaran, Lampung, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "pesisir-barat",
    nama: "Pesisir Barat",
    provinsi: "Lampung",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Pesisir Barat dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Pesisir Barat, Lampung, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "pesisir-selatan",
    nama: "Pesisir Selatan",
    provinsi: "Sumatera Barat",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Pesisir Selatan dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Pesisir Selatan, Sumatera Barat, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "pidie",
    nama: "Pidie",
    provinsi: "Aceh",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Pidie dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Pidie, Aceh, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "pidie-jaya",
    nama: "Pidie Jaya",
    provinsi: "Aceh",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Pidie Jaya dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Pidie Jaya, Aceh, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "pringsewu",
    nama: "Pringsewu",
    provinsi: "Lampung",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Pringsewu dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Pringsewu, Lampung, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "rejang-lebong",
    nama: "Rejang Lebong",
    provinsi: "Bengkulu",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Rejang Lebong dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Rejang Lebong, Bengkulu, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "rokan-hilir",
    nama: "Rokan Hilir",
    provinsi: "Riau",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Rokan Hilir dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Rokan Hilir, Riau, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "rokan-hulu",
    nama: "Rokan Hulu",
    provinsi: "Riau",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Rokan Hulu dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Rokan Hulu, Riau, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "samosir",
    nama: "Samosir",
    provinsi: "Sumatera Utara",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Samosir dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Samosir, Sumatera Utara, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "gresik",
    nama: "Gresik",
    provinsi: "Jawa Timur",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Gresik dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Gresik, Jawa Timur, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "grobogan",
    nama: "Grobogan",
    provinsi: "Jawa Tengah",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Grobogan dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Grobogan, Jawa Tengah, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "gunungkidul",
    nama: "Gunungkidul",
    provinsi: "Daerah Istimewa Yogyakarta",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Gunungkidul dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Gunungkidul, Daerah Istimewa Yogyakarta, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "indramayu",
    nama: "Indramayu",
    provinsi: "Jawa Barat",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Indramayu dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Indramayu, Jawa Barat, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "pandeglang",
    nama: "Pandeglang",
    provinsi: "Banten",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Pandeglang dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Pandeglang, Banten, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "pangandaran",
    nama: "Pangandaran",
    provinsi: "Jawa Barat",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Pangandaran dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Pangandaran, Jawa Barat, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "pakpak-bharat",
    nama: "Pakpak Bharat",
    provinsi: "Sumatera Utara",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Pakpak Bharat dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Pakpak Bharat, Sumatera Utara, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "pasaman",
    nama: "Pasaman",
    provinsi: "Sumatera Barat",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Pasaman dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Pasaman, Sumatera Barat, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "pelalawan",
    nama: "Pelalawan",
    provinsi: "Riau",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Pelalawan dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Pelalawan, Riau, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "brebes",
    nama: "Brebes",
    provinsi: "Jawa Tengah",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Brebes dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Brebes, Jawa Tengah, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "sarolangun",
    nama: "Sarolangun",
    provinsi: "Jambi",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Sarolangun dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Sarolangun, Jambi, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "seluma",
    nama: "Seluma",
    provinsi: "Bengkulu",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Seluma dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Seluma, Bengkulu, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "serdang-bedagai",
    nama: "Serdang Bedagai",
    provinsi: "Sumatera Utara",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Serdang Bedagai dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Serdang Bedagai, Sumatera Utara, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "siak",
    nama: "Siak",
    provinsi: "Riau",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Siak dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Siak, Riau, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "sijunjung",
    nama: "Sijunjung",
    provinsi: "Sumatera Barat",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Sijunjung dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Sijunjung, Sumatera Barat, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "simalungun",
    nama: "Simalungun",
    provinsi: "Sumatera Utara",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Simalungun dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Simalungun, Sumatera Utara, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "simeulue",
    nama: "Simeulue",
    provinsi: "Aceh",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Simeulue dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Simeulue, Aceh, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "solok",
    nama: "Solok",
    provinsi: "Sumatera Barat",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Solok dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Solok, Sumatera Barat, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "solok-selatan",
    nama: "Solok Selatan",
    provinsi: "Sumatera Barat",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Solok Selatan dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Solok Selatan, Sumatera Barat, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "buleleng",
    nama: "Buleleng",
    provinsi: "Bali",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Buleleng dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Buleleng, Bali, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "ciamis",
    nama: "Ciamis",
    provinsi: "Jawa Barat",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Ciamis dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Ciamis, Jawa Barat, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "cianjur",
    nama: "Cianjur",
    provinsi: "Jawa Barat",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Cianjur dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Cianjur, Jawa Barat, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "cilacap",
    nama: "Cilacap",
    provinsi: "Jawa Tengah",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Cilacap dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Cilacap, Jawa Tengah, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "cirebon",
    nama: "Cirebon",
    provinsi: "Jawa Barat",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Cirebon dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Cirebon, Jawa Barat, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "demak",
    nama: "Demak",
    provinsi: "Jawa Tengah",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Demak dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Demak, Jawa Tengah, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "dompu",
    nama: "Dompu",
    provinsi: "Nusa Tenggara Barat",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Dompu dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Dompu, Nusa Tenggara Barat, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "flores-timur",
    nama: "Flores Timur",
    provinsi: "Nusa Tenggara Timur",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Flores Timur dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Flores Timur, Nusa Tenggara Timur, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "tanah-datar",
    nama: "Tanah Datar",
    provinsi: "Sumatera Barat",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Tanah Datar dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Tanah Datar, Sumatera Barat, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "tanggamus",
    nama: "Tanggamus",
    provinsi: "Lampung",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Tanggamus dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Tanggamus, Lampung, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "tanjung-jabung-barat",
    nama: "Tanjung Jabung Barat",
    provinsi: "Jambi",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Tanjung Jabung Barat dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Tanjung Jabung Barat, Jambi, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "tanjung-jabung-timur",
    nama: "Tanjung Jabung Timur",
    provinsi: "Jambi",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Tanjung Jabung Timur dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Tanjung Jabung Timur, Jambi, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "tapanuli-selatan",
    nama: "Tapanuli Selatan",
    provinsi: "Sumatera Utara",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Tapanuli Selatan dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Tapanuli Selatan, Sumatera Utara, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "tapanuli-tengah",
    nama: "Tapanuli Tengah",
    provinsi: "Sumatera Utara",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Tapanuli Tengah dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Tapanuli Tengah, Sumatera Utara, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "tapanuli-utara",
    nama: "Tapanuli Utara",
    provinsi: "Sumatera Utara",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Tapanuli Utara dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Tapanuli Utara, Sumatera Utara, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "tebo",
    nama: "Tebo",
    provinsi: "Jambi",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Tebo dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Tebo, Jambi, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "toba",
    nama: "Toba",
    provinsi: "Sumatera Utara",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Toba dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Toba, Sumatera Utara, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "tulang-bawang",
    nama: "Tulang Bawang",
    provinsi: "Lampung",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Tulang Bawang dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Tulang Bawang, Lampung, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "tulang-bawang-barat",
    nama: "Tulang Bawang Barat",
    provinsi: "Lampung",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Tulang Bawang Barat dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Tulang Bawang Barat, Lampung, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "way-kanan",
    nama: "Way Kanan",
    provinsi: "Lampung",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Way Kanan dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Way Kanan, Lampung, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "padang-pariaman",
    nama: "Padang Pariaman",
    provinsi: "Sumatera Barat",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Padang Pariaman dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Padang Pariaman, Sumatera Barat, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "adm-kep-seribu",
    nama: "Adm. Kep. Seribu",
    provinsi: "DKI Jakarta",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Adm. Kep. Seribu dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Adm. Kep. Seribu, DKI Jakarta, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "alor",
    nama: "Alor",
    provinsi: "Nusa Tenggara Timur",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Alor dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Alor, Nusa Tenggara Timur, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "badung",
    nama: "Badung",
    provinsi: "Bali",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Badung dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Badung, Bali, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "bandung",
    nama: "Bandung",
    provinsi: "Jawa Barat",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Bandung dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Bandung, Jawa Barat, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "bandung-barat",
    nama: "Bandung Barat",
    provinsi: "Jawa Barat",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Bandung Barat dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Bandung Barat, Jawa Barat, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "bangkalan",
    nama: "Bangkalan",
    provinsi: "Jawa Timur",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Bangkalan dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Bangkalan, Jawa Timur, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "bangli",
    nama: "Bangli",
    provinsi: "Bali",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Bangli dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Bangli, Bali, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "banjarnegara",
    nama: "Banjarnegara",
    provinsi: "Jawa Tengah",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Banjarnegara dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Banjarnegara, Jawa Tengah, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "bantul",
    nama: "Bantul",
    provinsi: "Daerah Istimewa Yogyakarta",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Bantul dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Bantul, Daerah Istimewa Yogyakarta, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "banyumas",
    nama: "Banyumas",
    provinsi: "Jawa Tengah",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Banyumas dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Banyumas, Jawa Tengah, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "banyuwangi",
    nama: "Banyuwangi",
    provinsi: "Jawa Timur",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Banyuwangi dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Banyuwangi, Jawa Timur, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "batang",
    nama: "Batang",
    provinsi: "Jawa Tengah",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Batang dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Batang, Jawa Tengah, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "belu",
    nama: "Belu",
    provinsi: "Nusa Tenggara Timur",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Belu dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Belu, Nusa Tenggara Timur, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "bima",
    nama: "Bima",
    provinsi: "Nusa Tenggara Barat",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Bima dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Bima, Nusa Tenggara Barat, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "blitar",
    nama: "Blitar",
    provinsi: "Jawa Timur",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Blitar dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Blitar, Jawa Timur, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "blora",
    nama: "Blora",
    provinsi: "Jawa Tengah",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Blora dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Blora, Jawa Tengah, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "bojonegoro",
    nama: "Bojonegoro",
    provinsi: "Jawa Timur",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Bojonegoro dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Bojonegoro, Jawa Timur, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "bondowoso",
    nama: "Bondowoso",
    provinsi: "Jawa Timur",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Bondowoso dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Bondowoso, Jawa Timur, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "boyolali",
    nama: "Boyolali",
    provinsi: "Jawa Tengah",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Boyolali dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Boyolali, Jawa Tengah, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "jember",
    nama: "Jember",
    provinsi: "Jawa Timur",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Jember dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Jember, Jawa Timur, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "jembrana",
    nama: "Jembrana",
    provinsi: "Bali",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Jembrana dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Jembrana, Bali, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "jepara",
    nama: "Jepara",
    provinsi: "Jawa Tengah",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Jepara dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Jepara, Jawa Tengah, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "jombang",
    nama: "Jombang",
    provinsi: "Jawa Timur",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Jombang dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Jombang, Jawa Timur, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "karanganyar",
    nama: "Karanganyar",
    provinsi: "Jawa Tengah",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Karanganyar dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Karanganyar, Jawa Tengah, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "karangasem",
    nama: "Karangasem",
    provinsi: "Bali",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Karangasem dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Karangasem, Bali, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "karawang",
    nama: "Karawang",
    provinsi: "Jawa Barat",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Karawang dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Karawang, Jawa Barat, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "kebumen",
    nama: "Kebumen",
    provinsi: "Jawa Tengah",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Kebumen dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Kebumen, Jawa Tengah, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "kediri",
    nama: "Kediri",
    provinsi: "Jawa Timur",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Kediri dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Kediri, Jawa Timur, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "kendal",
    nama: "Kendal",
    provinsi: "Jawa Tengah",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Kendal dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Kendal, Jawa Tengah, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "klaten",
    nama: "Klaten",
    provinsi: "Jawa Tengah",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Klaten dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Klaten, Jawa Tengah, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "klungkung",
    nama: "Klungkung",
    provinsi: "Bali",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Klungkung dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Klungkung, Bali, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "kota-adm-jakarta-barat",
    nama: "Kota Adm. Jakarta Barat",
    provinsi: "DKI Jakarta",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Kota Adm. Jakarta Barat dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Kota Adm. Jakarta Barat, DKI Jakarta, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "kota-adm-jakarta-pusat",
    nama: "Kota Adm. Jakarta Pusat",
    provinsi: "DKI Jakarta",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Kota Adm. Jakarta Pusat dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Kota Adm. Jakarta Pusat, DKI Jakarta, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "kota-adm-jakarta-selatan",
    nama: "Kota Adm. Jakarta Selatan",
    provinsi: "DKI Jakarta",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Kota Adm. Jakarta Selatan dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Kota Adm. Jakarta Selatan, DKI Jakarta, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "kota-adm-jakarta-timur",
    nama: "Kota Adm. Jakarta Timur",
    provinsi: "DKI Jakarta",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Kota Adm. Jakarta Timur dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Kota Adm. Jakarta Timur, DKI Jakarta, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "kota-adm-jakarta-utara",
    nama: "Kota Adm. Jakarta Utara",
    provinsi: "DKI Jakarta",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Kota Adm. Jakarta Utara dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Kota Adm. Jakarta Utara, DKI Jakarta, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "kota-bandung",
    nama: "Kota Bandung",
    provinsi: "Jawa Barat",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Kota Bandung dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Kota Bandung, Jawa Barat, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "kota-cimahi",
    nama: "Kota Cimahi",
    provinsi: "Jawa Barat",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Kota Cimahi dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Kota Cimahi, Jawa Barat, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "kota-cirebon",
    nama: "Kota Cirebon",
    provinsi: "Jawa Barat",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Kota Cirebon dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Kota Cirebon, Jawa Barat, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "kota-banjar",
    nama: "Kota Banjar",
    provinsi: "Jawa Barat",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Kota Banjar dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Kota Banjar, Jawa Barat, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "kota-batu",
    nama: "Kota Batu",
    provinsi: "Jawa Timur",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Kota Batu dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Kota Batu, Jawa Timur, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "kota-bekasi",
    nama: "Kota Bekasi",
    provinsi: "Jawa Barat",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Kota Bekasi dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Kota Bekasi, Jawa Barat, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "kota-bima",
    nama: "Kota Bima",
    provinsi: "Nusa Tenggara Barat",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Kota Bima dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Kota Bima, Nusa Tenggara Barat, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "kota-denpasar",
    nama: "Kota Denpasar",
    provinsi: "Bali",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Kota Denpasar dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Kota Denpasar, Bali, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "kota-depok",
    nama: "Kota Depok",
    provinsi: "Jawa Barat",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Kota Depok dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Kota Depok, Jawa Barat, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "kota-kediri",
    nama: "Kota Kediri",
    provinsi: "Jawa Timur",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Kota Kediri dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Kota Kediri, Jawa Timur, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "kota-kupang",
    nama: "Kota Kupang",
    provinsi: "Nusa Tenggara Timur",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Kota Kupang dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Kota Kupang, Nusa Tenggara Timur, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "kota-madiun",
    nama: "Kota Madiun",
    provinsi: "Jawa Timur",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Kota Madiun dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Kota Madiun, Jawa Timur, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "kota-magelang",
    nama: "Kota Magelang",
    provinsi: "Jawa Tengah",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Kota Magelang dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Kota Magelang, Jawa Tengah, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "kota-malang",
    nama: "Kota Malang",
    provinsi: "Jawa Timur",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Kota Malang dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Kota Malang, Jawa Timur, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "kota-blitar",
    nama: "Kota Blitar",
    provinsi: "Jawa Timur",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Kota Blitar dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Kota Blitar, Jawa Timur, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "kota-bogor",
    nama: "Kota Bogor",
    provinsi: "Jawa Barat",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Kota Bogor dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Kota Bogor, Jawa Barat, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "kota-cilegon",
    nama: "Kota Cilegon",
    provinsi: "Banten",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Kota Cilegon dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Kota Cilegon, Banten, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "kota-mataram",
    nama: "Kota Mataram",
    provinsi: "Nusa Tenggara Barat",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Kota Mataram dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Kota Mataram, Nusa Tenggara Barat, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "kulon-progo",
    nama: "Kulon Progo",
    provinsi: "Daerah Istimewa Yogyakarta",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Kulon Progo dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Kulon Progo, Daerah Istimewa Yogyakarta, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "kuningan",
    nama: "Kuningan",
    provinsi: "Jawa Barat",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Kuningan dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Kuningan, Jawa Barat, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "kupang",
    nama: "Kupang",
    provinsi: "Nusa Tenggara Timur",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Kupang dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Kupang, Nusa Tenggara Timur, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "lamongan",
    nama: "Lamongan",
    provinsi: "Jawa Timur",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Lamongan dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Lamongan, Jawa Timur, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "kota-mojokerto",
    nama: "Kota Mojokerto",
    provinsi: "Jawa Timur",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Kota Mojokerto dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Kota Mojokerto, Jawa Timur, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "kota-pasuruan",
    nama: "Kota Pasuruan",
    provinsi: "Jawa Timur",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Kota Pasuruan dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Kota Pasuruan, Jawa Timur, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "kota-pekalongan",
    nama: "Kota Pekalongan",
    provinsi: "Jawa Tengah",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Kota Pekalongan dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Kota Pekalongan, Jawa Tengah, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "kota-probolinggo",
    nama: "Kota Probolinggo",
    provinsi: "Jawa Timur",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Kota Probolinggo dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Kota Probolinggo, Jawa Timur, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "kota-salatiga",
    nama: "Kota Salatiga",
    provinsi: "Jawa Tengah",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Kota Salatiga dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Kota Salatiga, Jawa Tengah, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "kota-semarang",
    nama: "Kota Semarang",
    provinsi: "Jawa Tengah",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Kota Semarang dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Kota Semarang, Jawa Tengah, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "kota-serang",
    nama: "Kota Serang",
    provinsi: "Banten",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Kota Serang dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Kota Serang, Banten, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "kota-sukabumi",
    nama: "Kota Sukabumi",
    provinsi: "Jawa Barat",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Kota Sukabumi dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Kota Sukabumi, Jawa Barat, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "kota-surabaya",
    nama: "Surabaya",
    provinsi: "Jawa Timur",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Kota Surabaya dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Kota Surabaya, Jawa Timur, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "kota-surakarta",
    nama: "Kota Surakarta",
    provinsi: "Jawa Tengah",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Kota Surakarta dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Kota Surakarta, Jawa Tengah, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "kota-tangerang",
    nama: "Kota Tangerang",
    provinsi: "Banten",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Kota Tangerang dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Kota Tangerang, Banten, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "kota-tangerang-selatan",
    nama: "Kota Tangerang Selatan",
    provinsi: "Banten",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Kota Tangerang Selatan dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Kota Tangerang Selatan, Banten, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "kota-tasikmalaya",
    nama: "Kota Tasikmalaya",
    provinsi: "Jawa Barat",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Kota Tasikmalaya dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Kota Tasikmalaya, Jawa Barat, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "lebak",
    nama: "Lebak",
    provinsi: "Banten",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Lebak dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Lebak, Banten, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "lembata",
    nama: "Lembata",
    provinsi: "Nusa Tenggara Timur",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Lembata dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Lembata, Nusa Tenggara Timur, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "kota-tegal",
    nama: "Kota Tegal",
    provinsi: "Jawa Tengah",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Kota Tegal dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Kota Tegal, Jawa Tengah, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "lombok-barat",
    nama: "Lombok Barat",
    provinsi: "Nusa Tenggara Barat",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Lombok Barat dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Lombok Barat, Nusa Tenggara Barat, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "lombok-tengah",
    nama: "Lombok Tengah",
    provinsi: "Nusa Tenggara Barat",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Lombok Tengah dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Lombok Tengah, Nusa Tenggara Barat, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "lombok-timur",
    nama: "Lombok Timur",
    provinsi: "Nusa Tenggara Barat",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Lombok Timur dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Lombok Timur, Nusa Tenggara Barat, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "lombok-utara",
    nama: "Lombok Utara",
    provinsi: "Nusa Tenggara Barat",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Lombok Utara dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Lombok Utara, Nusa Tenggara Barat, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "lumajang",
    nama: "Lumajang",
    provinsi: "Jawa Timur",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Lumajang dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Lumajang, Jawa Timur, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "madiun",
    nama: "Madiun",
    provinsi: "Jawa Timur",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Madiun dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Madiun, Jawa Timur, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "magelang",
    nama: "Magelang",
    provinsi: "Jawa Tengah",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Magelang dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Magelang, Jawa Tengah, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "magetan",
    nama: "Magetan",
    provinsi: "Jawa Timur",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Magetan dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Magetan, Jawa Timur, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "majalengka",
    nama: "Majalengka",
    provinsi: "Jawa Barat",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Majalengka dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Majalengka, Jawa Barat, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "malaka",
    nama: "Malaka",
    provinsi: "Nusa Tenggara Timur",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Malaka dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Malaka, Nusa Tenggara Timur, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "malang",
    nama: "Malang",
    provinsi: "Jawa Timur",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Malang dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Malang, Jawa Timur, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "manggarai",
    nama: "Manggarai",
    provinsi: "Nusa Tenggara Timur",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Manggarai dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Manggarai, Nusa Tenggara Timur, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "manggarai-barat",
    nama: "Manggarai Barat",
    provinsi: "Nusa Tenggara Timur",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Manggarai Barat dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Manggarai Barat, Nusa Tenggara Timur, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "manggarai-timur",
    nama: "Manggarai Timur",
    provinsi: "Nusa Tenggara Timur",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Manggarai Timur dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Manggarai Timur, Nusa Tenggara Timur, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "mojokerto",
    nama: "Mojokerto",
    provinsi: "Jawa Timur",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Mojokerto dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Mojokerto, Jawa Timur, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "nagekeo",
    nama: "Nagekeo",
    provinsi: "Nusa Tenggara Timur",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Nagekeo dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Nagekeo, Nusa Tenggara Timur, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "ngada",
    nama: "Ngada",
    provinsi: "Nusa Tenggara Timur",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Ngada dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Ngada, Nusa Tenggara Timur, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "nganjuk",
    nama: "Nganjuk",
    provinsi: "Jawa Timur",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Nganjuk dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Nganjuk, Jawa Timur, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "ngawi",
    nama: "Ngawi",
    provinsi: "Jawa Timur",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Ngawi dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Ngawi, Jawa Timur, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "pacitan",
    nama: "Pacitan",
    provinsi: "Jawa Timur",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Pacitan dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Pacitan, Jawa Timur, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "pamekasan",
    nama: "Pamekasan",
    provinsi: "Jawa Timur",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Pamekasan dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Pamekasan, Jawa Timur, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "kota-yogyakarta",
    nama: "Yogyakarta",
    provinsi: "Daerah Istimewa Yogyakarta",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Kota Yogyakarta dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Kota Yogyakarta, Daerah Istimewa Yogyakarta, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "kudus",
    nama: "Kudus",
    provinsi: "Jawa Tengah",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Kudus dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Kudus, Jawa Tengah, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "pasuruan",
    nama: "Pasuruan",
    provinsi: "Jawa Timur",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Pasuruan dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Pasuruan, Jawa Timur, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "pati",
    nama: "Pati",
    provinsi: "Jawa Tengah",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Pati dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Pati, Jawa Tengah, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "pekalongan",
    nama: "Pekalongan",
    provinsi: "Jawa Tengah",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Pekalongan dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Pekalongan, Jawa Tengah, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "pemalang",
    nama: "Pemalang",
    provinsi: "Jawa Tengah",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Pemalang dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Pemalang, Jawa Tengah, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "ponorogo",
    nama: "Ponorogo",
    provinsi: "Jawa Timur",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Ponorogo dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Ponorogo, Jawa Timur, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "probolinggo",
    nama: "Probolinggo",
    provinsi: "Jawa Timur",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Probolinggo dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Probolinggo, Jawa Timur, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "purbalingga",
    nama: "Purbalingga",
    provinsi: "Jawa Tengah",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Purbalingga dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Purbalingga, Jawa Tengah, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "purwakarta",
    nama: "Purwakarta",
    provinsi: "Jawa Barat",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Purwakarta dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Purwakarta, Jawa Barat, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "purworejo",
    nama: "Purworejo",
    provinsi: "Jawa Tengah",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Purworejo dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Purworejo, Jawa Tengah, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "rembang",
    nama: "Rembang",
    provinsi: "Jawa Tengah",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Rembang dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Rembang, Jawa Tengah, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "rote-ndao",
    nama: "Rote Ndao",
    provinsi: "Nusa Tenggara Timur",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Rote Ndao dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Rote Ndao, Nusa Tenggara Timur, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "sabu-raijua",
    nama: "Sabu Raijua",
    provinsi: "Nusa Tenggara Timur",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Sabu Raijua dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Sabu Raijua, Nusa Tenggara Timur, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "sampang",
    nama: "Sampang",
    provinsi: "Jawa Timur",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Sampang dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Sampang, Jawa Timur, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "semarang",
    nama: "Semarang",
    provinsi: "Jawa Tengah",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Semarang dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Semarang, Jawa Tengah, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "serang",
    nama: "Serang",
    provinsi: "Banten",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Serang dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Serang, Banten, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "sidoarjo",
    nama: "Sidoarjo",
    provinsi: "Jawa Timur",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Sidoarjo dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Sidoarjo, Jawa Timur, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "sikka",
    nama: "Sikka",
    provinsi: "Nusa Tenggara Timur",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Sikka dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Sikka, Nusa Tenggara Timur, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "situbondo",
    nama: "Situbondo",
    provinsi: "Jawa Timur",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Situbondo dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Situbondo, Jawa Timur, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "sleman",
    nama: "Sleman",
    provinsi: "Daerah Istimewa Yogyakarta",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Sleman dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Sleman, Daerah Istimewa Yogyakarta, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "sragen",
    nama: "Sragen",
    provinsi: "Jawa Tengah",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Sragen dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Sragen, Jawa Tengah, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "subang",
    nama: "Subang",
    provinsi: "Jawa Barat",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Subang dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Subang, Jawa Barat, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "sukabumi",
    nama: "Sukabumi",
    provinsi: "Jawa Barat",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Sukabumi dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Sukabumi, Jawa Barat, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "sukoharjo",
    nama: "Sukoharjo",
    provinsi: "Jawa Tengah",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Sukoharjo dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Sukoharjo, Jawa Tengah, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "sumba-barat",
    nama: "Sumba Barat",
    provinsi: "Nusa Tenggara Timur",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Sumba Barat dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Sumba Barat, Nusa Tenggara Timur, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "sumba-tengah",
    nama: "Sumba Tengah",
    provinsi: "Nusa Tenggara Timur",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Sumba Tengah dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Sumba Tengah, Nusa Tenggara Timur, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "sumba-timur",
    nama: "Sumba Timur",
    provinsi: "Nusa Tenggara Timur",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Sumba Timur dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Sumba Timur, Nusa Tenggara Timur, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "sumbawa",
    nama: "Sumbawa",
    provinsi: "Nusa Tenggara Barat",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Sumbawa dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Sumbawa, Nusa Tenggara Barat, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "sumbawa-barat",
    nama: "Sumbawa Barat",
    provinsi: "Nusa Tenggara Barat",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Sumbawa Barat dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Sumbawa Barat, Nusa Tenggara Barat, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "sumedang",
    nama: "Sumedang",
    provinsi: "Jawa Barat",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Sumedang dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Sumedang, Jawa Barat, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "sumenep",
    nama: "Sumenep",
    provinsi: "Jawa Timur",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Sumenep dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Sumenep, Jawa Timur, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "tabanan",
    nama: "Tabanan",
    provinsi: "Bali",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Tabanan dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Tabanan, Bali, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "tangerang",
    nama: "Tangerang",
    provinsi: "Banten",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Tangerang dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Tangerang, Banten, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "tasikmalaya",
    nama: "Tasikmalaya",
    provinsi: "Jawa Barat",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Tasikmalaya dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Tasikmalaya, Jawa Barat, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "tegal",
    nama: "Tegal",
    provinsi: "Jawa Tengah",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Tegal dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Tegal, Jawa Tengah, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "temanggung",
    nama: "Temanggung",
    provinsi: "Jawa Tengah",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Temanggung dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Temanggung, Jawa Tengah, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "timor-tengah-selatan",
    nama: "Timor Tengah Selatan",
    provinsi: "Nusa Tenggara Timur",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Timor Tengah Selatan dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Timor Tengah Selatan, Nusa Tenggara Timur, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "timor-tengah-utara",
    nama: "Timor Tengah Utara",
    provinsi: "Nusa Tenggara Timur",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Timor Tengah Utara dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Timor Tengah Utara, Nusa Tenggara Timur, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "trenggalek",
    nama: "Trenggalek",
    provinsi: "Jawa Timur",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Trenggalek dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Trenggalek, Jawa Timur, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "tuban",
    nama: "Tuban",
    provinsi: "Jawa Timur",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Tuban dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Tuban, Jawa Timur, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "tulungagung",
    nama: "Tulungagung",
    provinsi: "Jawa Timur",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Tulungagung dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Tulungagung, Jawa Timur, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "wonogiri",
    nama: "Wonogiri",
    provinsi: "Jawa Tengah",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Wonogiri dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Wonogiri, Jawa Tengah, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "wonosobo",
    nama: "Wonosobo",
    provinsi: "Jawa Tengah",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Wonosobo dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Wonosobo, Jawa Tengah, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "berau",
    nama: "Berau",
    provinsi: "Kalimantan Timur",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Berau dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Berau, Kalimantan Timur, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "bulungan",
    nama: "Bulungan",
    provinsi: "Kalimantan Utara",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Bulungan dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Bulungan, Kalimantan Utara, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "kota-banjarbaru",
    nama: "Kota Banjarbaru",
    provinsi: "Kalimantan Selatan",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Kota Banjarbaru dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Kota Banjarbaru, Kalimantan Selatan, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "kota-banjarmasin",
    nama: "Kota Banjarmasin",
    provinsi: "Kalimantan Selatan",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Kota Banjarmasin dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Kota Banjarmasin, Kalimantan Selatan, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "kota-bontang",
    nama: "Kota Bontang",
    provinsi: "Kalimantan Timur",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Kota Bontang dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Kota Bontang, Kalimantan Timur, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "balangan",
    nama: "Balangan",
    provinsi: "Kalimantan Selatan",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Balangan dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Balangan, Kalimantan Selatan, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "barito-kuala",
    nama: "Barito Kuala",
    provinsi: "Kalimantan Selatan",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Barito Kuala dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Barito Kuala, Kalimantan Selatan, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "barito-selatan",
    nama: "Barito Selatan",
    provinsi: "Kalimantan Tengah",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Barito Selatan dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Barito Selatan, Kalimantan Tengah, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "barito-timur",
    nama: "Barito Timur",
    provinsi: "Kalimantan Tengah",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Barito Timur dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Barito Timur, Kalimantan Tengah, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "barito-utara",
    nama: "Barito Utara",
    provinsi: "Kalimantan Tengah",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Barito Utara dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Barito Utara, Kalimantan Tengah, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "bengkayang",
    nama: "Bengkayang",
    provinsi: "Kalimantan Barat",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Bengkayang dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Bengkayang, Kalimantan Barat, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "gunung-mas",
    nama: "Gunung Mas",
    provinsi: "Kalimantan Tengah",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Gunung Mas dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Gunung Mas, Kalimantan Tengah, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "hulu-sungai-selatan",
    nama: "Hulu Sungai Selatan",
    provinsi: "Kalimantan Selatan",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Hulu Sungai Selatan dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Hulu Sungai Selatan, Kalimantan Selatan, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "hulu-sungai-tengah",
    nama: "Hulu Sungai Tengah",
    provinsi: "Kalimantan Selatan",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Hulu Sungai Tengah dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Hulu Sungai Tengah, Kalimantan Selatan, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "hulu-sungai-utara",
    nama: "Hulu Sungai Utara",
    provinsi: "Kalimantan Selatan",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Hulu Sungai Utara dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Hulu Sungai Utara, Kalimantan Selatan, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "kayong-utara",
    nama: "Kayong Utara",
    provinsi: "Kalimantan Barat",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Kayong Utara dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Kayong Utara, Kalimantan Barat, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "ketapang",
    nama: "Ketapang",
    provinsi: "Kalimantan Barat",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Ketapang dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Ketapang, Kalimantan Barat, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "kapuas",
    nama: "Kapuas",
    provinsi: "Kalimantan Tengah",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Kapuas dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Kapuas, Kalimantan Tengah, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "kapuas-hulu",
    nama: "Kapuas Hulu",
    provinsi: "Kalimantan Barat",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Kapuas Hulu dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Kapuas Hulu, Kalimantan Barat, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "katingan",
    nama: "Katingan",
    provinsi: "Kalimantan Tengah",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Katingan dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Katingan, Kalimantan Tengah, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "kota-palangkaraya",
    nama: "Kota Palangkaraya",
    provinsi: "Kalimantan Tengah",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Kota Palangkaraya dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Kota Palangkaraya, Kalimantan Tengah, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "kota-pontianak",
    nama: "Kota Pontianak",
    provinsi: "Kalimantan Barat",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Kota Pontianak dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Kota Pontianak, Kalimantan Barat, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "kota-samarinda",
    nama: "Kota Samarinda",
    provinsi: "Kalimantan Timur",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Kota Samarinda dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Kota Samarinda, Kalimantan Timur, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "kota-singkawang",
    nama: "Kota Singkawang",
    provinsi: "Kalimantan Barat",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Kota Singkawang dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Kota Singkawang, Kalimantan Barat, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "kota-tarakan",
    nama: "Kota Tarakan",
    provinsi: "Kalimantan Utara",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Kota Tarakan dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Kota Tarakan, Kalimantan Utara, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "kotabaru",
    nama: "Kotabaru",
    provinsi: "Kalimantan Selatan",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Kotabaru dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Kotabaru, Kalimantan Selatan, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "kotawaringin-barat",
    nama: "Kotawaringin Barat",
    provinsi: "Kalimantan Tengah",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Kotawaringin Barat dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Kotawaringin Barat, Kalimantan Tengah, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "kotawaringin-timur",
    nama: "Kotawaringin Timur",
    provinsi: "Kalimantan Tengah",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Kotawaringin Timur dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Kotawaringin Timur, Kalimantan Tengah, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "kubu-raya",
    nama: "Kubu Raya",
    provinsi: "Kalimantan Barat",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Kubu Raya dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Kubu Raya, Kalimantan Barat, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "kutai-barat",
    nama: "Kutai Barat",
    provinsi: "Kalimantan Timur",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Kutai Barat dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Kutai Barat, Kalimantan Timur, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "kutai-kartanegara",
    nama: "Kutai Kartanegara",
    provinsi: "Kalimantan Timur",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Kutai Kartanegara dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Kutai Kartanegara, Kalimantan Timur, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "kutai-timur",
    nama: "Kutai Timur",
    provinsi: "Kalimantan Timur",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Kutai Timur dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Kutai Timur, Kalimantan Timur, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "lamandau",
    nama: "Lamandau",
    provinsi: "Kalimantan Tengah",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Lamandau dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Lamandau, Kalimantan Tengah, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "landak",
    nama: "Landak",
    provinsi: "Kalimantan Barat",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Landak dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Landak, Kalimantan Barat, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "mahakam-ulu",
    nama: "Mahakam Ulu",
    provinsi: "Kalimantan Timur",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Mahakam Ulu dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Mahakam Ulu, Kalimantan Timur, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "malinau",
    nama: "Malinau",
    provinsi: "Kalimantan Utara",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Malinau dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Malinau, Kalimantan Utara, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "melawi",
    nama: "Melawi",
    provinsi: "Kalimantan Barat",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Melawi dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Melawi, Kalimantan Barat, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "mempawah",
    nama: "Mempawah",
    provinsi: "Kalimantan Barat",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Mempawah dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Mempawah, Kalimantan Barat, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "murung-raya",
    nama: "Murung Raya",
    provinsi: "Kalimantan Tengah",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Murung Raya dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Murung Raya, Kalimantan Tengah, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "nunukan",
    nama: "Nunukan",
    provinsi: "Kalimantan Utara",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Nunukan dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Nunukan, Kalimantan Utara, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "paser",
    nama: "Paser",
    provinsi: "Kalimantan Timur",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Paser dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Paser, Kalimantan Timur, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "pulang-pisau",
    nama: "Pulang Pisau",
    provinsi: "Kalimantan Tengah",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Pulang Pisau dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Pulang Pisau, Kalimantan Tengah, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "sambas",
    nama: "Sambas",
    provinsi: "Kalimantan Barat",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Sambas dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Sambas, Kalimantan Barat, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "sanggau",
    nama: "Sanggau",
    provinsi: "Kalimantan Barat",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Sanggau dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Sanggau, Kalimantan Barat, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "sekadau",
    nama: "Sekadau",
    provinsi: "Kalimantan Barat",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Sekadau dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Sekadau, Kalimantan Barat, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "seruyan",
    nama: "Seruyan",
    provinsi: "Kalimantan Tengah",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Seruyan dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Seruyan, Kalimantan Tengah, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "sintang",
    nama: "Sintang",
    provinsi: "Kalimantan Barat",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Sintang dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Sintang, Kalimantan Barat, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "sukamara",
    nama: "Sukamara",
    provinsi: "Kalimantan Tengah",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Sukamara dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Sukamara, Kalimantan Tengah, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "tabalong",
    nama: "Tabalong",
    provinsi: "Kalimantan Selatan",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Tabalong dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Tabalong, Kalimantan Selatan, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "tana-tidung",
    nama: "Tana Tidung",
    provinsi: "Kalimantan Utara",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Tana Tidung dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Tana Tidung, Kalimantan Utara, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "tanah-bumbu",
    nama: "Tanah Bumbu",
    provinsi: "Kalimantan Selatan",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Tanah Bumbu dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Tanah Bumbu, Kalimantan Selatan, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "tanah-laut",
    nama: "Tanah Laut",
    provinsi: "Kalimantan Selatan",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Tanah Laut dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Tanah Laut, Kalimantan Selatan, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "tapin",
    nama: "Tapin",
    provinsi: "Kalimantan Selatan",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Tapin dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Tapin, Kalimantan Selatan, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "sumba-barat-daya",
    nama: "Sumba Barat Daya",
    provinsi: "Nusa Tenggara Timur",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Sumba Barat Daya dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Sumba Barat Daya, Nusa Tenggara Timur, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "ende",
    nama: "Ende",
    provinsi: "Nusa Tenggara Timur",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Ende dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Ende, Nusa Tenggara Timur, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "penajam-paser-utara",
    nama: "Penajam Paser Utara",
    provinsi: "Kalimantan Timur",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Penajam Paser Utara dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Penajam Paser Utara, Kalimantan Timur, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "kota-balikpapan",
    nama: "Kota Balikpapan",
    provinsi: "Kalimantan Timur",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Kota Balikpapan dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Kota Balikpapan, Kalimantan Timur, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "banjar",
    nama: "Banjar",
    provinsi: "Kalimantan Selatan",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Banjar dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Banjar, Kalimantan Selatan, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "asmat",
    nama: "Asmat",
    provinsi: "Papua Selatan",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Asmat dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Asmat, Papua Selatan, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "biak-numfor",
    nama: "Biak Numfor",
    provinsi: "Papua",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Biak Numfor dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Biak Numfor, Papua, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "boven-digoel",
    nama: "Boven Digoel",
    provinsi: "Papua Selatan",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Boven Digoel dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Boven Digoel, Papua Selatan, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "deiyai",
    nama: "Deiyai",
    provinsi: "Papua Tengah",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Deiyai dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Deiyai, Papua Tengah, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "dogiyai",
    nama: "Dogiyai",
    provinsi: "Papua Tengah",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Dogiyai dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Dogiyai, Papua Tengah, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "fak-fak",
    nama: "Fak Fak",
    provinsi: "Papua Barat",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Fak Fak dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Fak Fak, Papua Barat, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "intan-jaya",
    nama: "Intan Jaya",
    provinsi: "Papua Tengah",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Intan Jaya dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Intan Jaya, Papua Tengah, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "jayapura",
    nama: "Jayapura",
    provinsi: "Papua",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Jayapura dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Jayapura, Papua, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "jayawijaya",
    nama: "Jayawijaya",
    provinsi: "Papua Pegunungan",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Jayawijaya dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Jayawijaya, Papua Pegunungan, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "kaimana",
    nama: "Kaimana",
    provinsi: "Papua Barat",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Kaimana dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Kaimana, Papua Barat, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "keerom",
    nama: "Keerom",
    provinsi: "Papua",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Keerom dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Keerom, Papua, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "kepulauan-yapen",
    nama: "Kepulauan Yapen",
    provinsi: "Papua",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Kepulauan Yapen dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Kepulauan Yapen, Papua, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "kota-jayapura",
    nama: "Kota Jayapura",
    provinsi: "Papua",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Kota Jayapura dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Kota Jayapura, Papua, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "kota-sorong",
    nama: "Kota Sorong",
    provinsi: "Papua Barat Daya",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Kota Sorong dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Kota Sorong, Papua Barat Daya, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "lanny-jaya",
    nama: "Lanny Jaya",
    provinsi: "Papua Pegunungan",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Lanny Jaya dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Lanny Jaya, Papua Pegunungan, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "mamberamo-raya",
    nama: "Mamberamo Raya",
    provinsi: "Papua",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Mamberamo Raya dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Mamberamo Raya, Papua, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "mamberamo-tengah",
    nama: "Mamberamo Tengah",
    provinsi: "Papua Pegunungan",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Mamberamo Tengah dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Mamberamo Tengah, Papua Pegunungan, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "manokwari",
    nama: "Manokwari",
    provinsi: "Papua Barat",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Manokwari dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Manokwari, Papua Barat, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "mappi",
    nama: "Mappi",
    provinsi: "Papua Selatan",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Mappi dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Mappi, Papua Selatan, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "maybrat",
    nama: "Maybrat",
    provinsi: "Papua Barat Daya",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Maybrat dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Maybrat, Papua Barat Daya, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "merauke",
    nama: "Merauke",
    provinsi: "Papua Selatan",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Merauke dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Merauke, Papua Selatan, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "mimika",
    nama: "Mimika",
    provinsi: "Papua Tengah",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Mimika dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Mimika, Papua Tengah, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "nabire",
    nama: "Nabire",
    provinsi: "Papua Tengah",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Nabire dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Nabire, Papua Tengah, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "nduga",
    nama: "Nduga",
    provinsi: "Papua Pegunungan",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Nduga dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Nduga, Papua Pegunungan, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "paniai",
    nama: "Paniai",
    provinsi: "Papua Tengah",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Paniai dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Paniai, Papua Tengah, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "pegunungan-arfak",
    nama: "Pegunungan Arfak",
    provinsi: "Papua Barat",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Pegunungan Arfak dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Pegunungan Arfak, Papua Barat, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "pegunungan-bintang",
    nama: "Pegunungan Bintang",
    provinsi: "Papua Pegunungan",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Pegunungan Bintang dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Pegunungan Bintang, Papua Pegunungan, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "puncak",
    nama: "Puncak",
    provinsi: "Papua Tengah",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Puncak dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Puncak, Papua Tengah, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "puncak-jaya",
    nama: "Puncak Jaya",
    provinsi: "Papua Tengah",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Puncak Jaya dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Puncak Jaya, Papua Tengah, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "raja-ampat",
    nama: "Raja Ampat",
    provinsi: "Papua Barat Daya",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Raja Ampat dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Raja Ampat, Papua Barat Daya, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "sarmi",
    nama: "Sarmi",
    provinsi: "Papua",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Sarmi dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Sarmi, Papua, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "sorong",
    nama: "Sorong",
    provinsi: "Papua Barat Daya",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Sorong dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Sorong, Papua Barat Daya, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "sorong-selatan",
    nama: "Sorong Selatan",
    provinsi: "Papua Barat Daya",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Sorong Selatan dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Sorong Selatan, Papua Barat Daya, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "supiori",
    nama: "Supiori",
    provinsi: "Papua",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Supiori dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Supiori, Papua, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "tambrauw",
    nama: "Tambrauw",
    provinsi: "Papua Barat Daya",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Tambrauw dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Tambrauw, Papua Barat Daya, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "teluk-bintuni",
    nama: "Teluk Bintuni",
    provinsi: "Papua Barat",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Teluk Bintuni dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Teluk Bintuni, Papua Barat, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "teluk-wondama",
    nama: "Teluk Wondama",
    provinsi: "Papua Barat",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Teluk Wondama dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Teluk Wondama, Papua Barat, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "tolikara",
    nama: "Tolikara",
    provinsi: "Papua Pegunungan",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Tolikara dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Tolikara, Papua Pegunungan, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "waropen",
    nama: "Waropen",
    provinsi: "Papua",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Waropen dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Waropen, Papua, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "yahukimo",
    nama: "Yahukimo",
    provinsi: "Papua Pegunungan",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Yahukimo dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Yahukimo, Papua Pegunungan, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "yalimo",
    nama: "Yalimo",
    provinsi: "Papua Pegunungan",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Yalimo dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Yalimo, Papua Pegunungan, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "pasaman-barat",
    nama: "Pasaman Barat",
    provinsi: "Sumatera Barat",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Pasaman Barat dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Pasaman Barat, Sumatera Barat, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "lampung-selatan",
    nama: "Lampung Selatan",
    provinsi: "Lampung",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Lampung Selatan dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Lampung Selatan, Lampung, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "poso",
    nama: "Poso",
    provinsi: "Sulawesi Tengah",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Poso dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Poso, Sulawesi Tengah, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "maluku-tenggara",
    nama: "Maluku Tenggara",
    provinsi: "Maluku",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Maluku Tenggara dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Maluku Tenggara, Maluku, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
  {
    slug: "manokwari-selatan",
    nama: "Manokwari Selatan",
    provinsi: "Papua Barat",
    bandara: "Bandara terdekat sesuai jadwal keberangkatan",
    intro:
      "Manokwari Selatan dan sekitarnya dapat berkonsultasi dengan Jannah Firdaus Tour Travel secara daring untuk persiapan perjalanan umroh.",
    service_note:
      "Jamaah dari Manokwari Selatan, Papua Barat, mendapatkan pendampingan untuk memilih paket, menyiapkan dokumen, mengikuti manasik, dan mengatur koordinasi keberangkatan sesuai jadwal rombongan.",
    wilayah: [],
  },
];

export function kotaBySlug(slug: string): KotaLayanan | undefined {
  return KOTA_LAYANAN.find((kota) => kota.slug === slug);
}
