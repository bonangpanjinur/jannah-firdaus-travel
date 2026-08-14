import { createFileRoute, Link } from "@tanstack/react-router";
import { loadSiteInfo, siteInfoFrom, pageMeta, breadcrumbLd, faqLd, SITE_CITY } from "@/lib/seo";
import { PageBreadcrumb } from "@/components/site/page-breadcrumb";

const FAQ = [
  {
    q: "Apa itu umroh plus?",
    a: "Umroh plus adalah paket umroh yang digabungkan dengan kunjungan ke destinasi lain, misalnya Turki, Dubai, Mesir, atau Aqsa, sehingga jamaah menjalankan ibadah sekaligus melakukan perjalanan wisata religi.",
  },
  {
    q: "Berapa lama durasi umroh plus?",
    a: "Durasinya lebih panjang dari umroh reguler karena ada tambahan hari di negara tujuan kedua. Rincian hari selalu tercantum pada masing-masing paket.",
  },
  {
    q: "Apakah butuh visa tambahan?",
    a: "Ya. Selain visa umroh, dibutuhkan visa negara tujuan tambahan. Pengurusannya kami bantu bersama proses dokumen umroh.",
  },
  {
    q: "Apakah rangkaian ibadah tetap lengkap?",
    a: "Rangkaian ibadah umroh dijalankan penuh dengan pendampingan pembimbing sebelum agenda kunjungan tambahan dimulai.",
  },
];

export const Route = createFileRoute("/umroh-plus")({
  loader: ({ context }) => loadSiteInfo(context.queryClient),
  head: ({ loaderData }) => {
    const info = siteInfoFrom(loaderData);
    const base = pageMeta({
      title: `Umroh Plus: Ibadah dan Wisata Religi — ${info.siteName}`,
      description: `Paket umroh plus dari ${info.siteName} ${SITE_CITY}: ibadah umroh lengkap dipadukan kunjungan ke destinasi tambahan, dengan pengurusan visa dan pendampingan penuh.`,
      path: "/umroh-plus",
      siteName: info.siteName,
    });
    return {
      ...base,
      scripts: [
        { type: "application/ld+json", children: JSON.stringify(faqLd(FAQ)) },
        {
          type: "application/ld+json",
          children: JSON.stringify(
            breadcrumbLd([
              { name: "Beranda", path: "/" },
              { name: "Umroh Plus", path: "/umroh-plus" },
            ]),
          ),
        },
      ],
    };
  },
  component: UmrohPlus,
});

const DESTINASI = [
  { nama: "Umroh plus Turki", isi: "Menambah agenda ke Istanbul dan jejak sejarah Utsmaniyah setelah rangkaian ibadah." },
  { nama: "Umroh plus Dubai", isi: "Transit lebih panjang di Uni Emirat Arab dengan agenda kota modern." },
  { nama: "Umroh plus Mesir", isi: "Ziarah dan kunjungan sejarah Islam di Kairo serta sekitarnya." },
  { nama: "Umroh plus Aqsa", isi: "Kunjungan ke Masjid Al-Aqsa mengikuti ketersediaan izin dan kondisi terkini." },
];

function UmrohPlus() {
  return (
    <main className="container-page py-10 sm:py-14">
      <PageBreadcrumb items={[{ label: "Beranda", to: "/" }, { label: "Umroh Plus" }]} />
      <header className="mt-6 max-w-2xl">
        <p className="eyebrow">Program Pilihan</p>
        <h1 className="mt-2 font-display text-3xl sm:text-4xl">Paket Umroh Plus</h1>
        <p className="mt-4 text-sm/7 text-muted-foreground">
          Umroh plus memadukan pelaksanaan ibadah umroh dengan kunjungan ke destinasi tambahan. Ketersediaan tujuan
          mengikuti jadwal keberangkatan yang sedang kami buka.
        </p>
      </header>

      <section className="mt-10 grid gap-4 sm:grid-cols-2">
        {DESTINASI.map((d) => (
          <div key={d.nama} className="bento-card p-6">
            <h2 className="font-display text-xl">{d.nama}</h2>
            <p className="mt-2 text-sm/6 text-muted-foreground">{d.isi}</p>
          </div>
        ))}
      </section>

      <section className="mt-14 grid gap-4 md:grid-cols-2">
        <div className="bento-card p-6">
          <h2 className="font-display text-xl">Yang membedakan dari umroh reguler</h2>
          <ul className="mt-4 space-y-2 text-sm/6 text-muted-foreground">
            <li>Durasi perjalanan lebih panjang.</li>
            <li>Ada visa dan penerbangan tambahan ke negara tujuan kedua.</li>
            <li>Agenda ziarah atau wisata religi setelah rangkaian ibadah selesai.</li>
            <li>Biaya paket menyesuaikan destinasi dan lama tambahan hari.</li>
          </ul>
        </div>
        <div className="bento-card p-6">
          <h2 className="font-display text-xl">Cocok untuk siapa</h2>
          <p className="mt-3 text-sm/6 text-muted-foreground">
            Jamaah yang memiliki waktu perjalanan lebih longgar dan ingin memaksimalkan satu kali keberangkatan, termasuk
            rombongan keluarga, komunitas pengajian, maupun karyawan perusahaan.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="font-display text-2xl">Pertanyaan seputar umroh plus</h2>
        <div className="mt-4 space-y-4">
          {FAQ.map((f) => (
            <div key={f.q} className="bento-card p-6">
              <h3 className="font-medium">{f.q}</h3>
              <p className="mt-2 text-sm/6 text-muted-foreground">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bento-card surface-emerald mt-14 p-8 md:p-12">
        <h2 className="font-display text-2xl md:text-3xl">Tanyakan ketersediaan umroh plus</h2>
        <p className="mt-3 text-sm/7 opacity-90">
          Sampaikan destinasi dan perkiraan tanggal Anda, kami informasikan jadwal yang tersedia.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link to="/paket" className="btn-gold">
            Lihat paket tersedia
          </Link>
          <Link to="/kontak" className="btn-ghost">
            Hubungi kami
          </Link>
        </div>
      </section>
    </main>
  );
}
