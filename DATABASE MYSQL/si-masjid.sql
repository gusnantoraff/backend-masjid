-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 18, 2024 at 11:32 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `si-masjid`
--

-- --------------------------------------------------------

--
-- Table structure for table `arus_kas`
--

CREATE TABLE `arus_kas` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `pemasukan_total` decimal(15,2) DEFAULT NULL,
  `pengeluaran_total` decimal(15,2) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `arus_kas`
--

INSERT INTO `arus_kas` (`id`, `pemasukan_total`, `pengeluaran_total`, `created_at`, `updated_at`) VALUES
(1, NULL, NULL, '2024-11-16 13:48:15', '2024-11-16 13:48:15');

-- --------------------------------------------------------

--
-- Table structure for table `berita`
--

CREATE TABLE `berita` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `judul` varchar(255) NOT NULL,
  `konten` text NOT NULL,
  `tanggal_publikasi` date NOT NULL,
  `kategori` enum('berita','sport','teknologi','pendidikan','lainnya') NOT NULL,
  `status` enum('draft','published','archived') NOT NULL,
  `foto` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `berita`
--

INSERT INTO `berita` (`id`, `judul`, `konten`, `tanggal_publikasi`, `kategori`, `status`, `foto`, `created_at`, `updated_at`) VALUES
(1, 'Berita Pertama', 'Ini adalah konten berita pertama.', '2024-10-15', 'berita', 'published', NULL, '2024-11-16 13:48:15', '2024-11-16 13:48:15'),
(2, 'Berita Kedua', 'Ini adalah konten berita kedua.', '2024-10-16', 'sport', 'draft', NULL, '2024-11-16 13:48:15', '2024-11-16 13:48:15'),
(3, 'Berita Ketiga', 'Ini adalah konten berita ketiga.', '2024-10-17', 'teknologi', 'archived', NULL, '2024-11-16 13:48:15', '2024-11-16 13:48:15'),
(4, 'Doa Masuk dan Keluar Masjid', '<p><span style=\"font-family: Arial, Helvetica, sans-serif;\"><span style=\"font-size: 24px;\">Masjid </span>merupakan rumah Allah SWT yang memiliki kedudukan sebagai tempat istimewa dalam Islam. Setiap langkah menuju dan meninggalkan masjid memiliki nilai ibadah yang agung, sehingga terdapat adab khusus yang dianjurkan ketika hendak memasukinya. </span></p><p><span style=\"font-family: Arial, Helvetica, sans-serif;\"><br></span></p><p><span style=\"font-family: Arial, Helvetica, sans-serif;\">Salah satu adab utama yang dianjurkan saat masuk dan keluar masjid adalah berdoa. Doa masuk dan keluar masjid merupakan bentuk penghormatan kepada kesucian masjid sekaligus permohonan keberkahan kepada Allah SWT. Berikut bacaan yang bisa diamalkan.<br><br>Doa Masuk Masjid<br>Mengutip kitab Al-Azhar Imam Nawawi terjemahan Bahrun Abu Bakar, seseorang yang hendak memasuki masjid, hendaknya membaca doa berikut.<br><br>أعُوْذُ بِاللهِ العَظِيْمِ وَبِوَجْهِهِ الْكَرِيْمِ وَسُلْطَانِهِ الْقَدِيْمِ مِنَ الشَّيْطَانِ الرَّجِيْمِ. بِسْمِ اللهِ وَالْحَمْدُ لِلهِ. أَللَّهُمَّ صَلِّ وَسَلِّمْ عَلَى سَيِّدِنَا مُحَمَّدٍ وَعَلَى آلِ سَيِّدِنَا مُحَمَّدٍ. اَللَّهُمَّ اغْفِرْ لِي ذُنُوْبِي وَافْتَحْ لِي أَبْوَابَ فَضْلِكَ<br><br>A\'ûdzu billâhil \'azhîm wa biwajhihil karîm wa sulthânihil qadîm minas syaithânir rajîm. Bismillâhi wal hamdulillâh. Allâhumma shalli wa sallim \'alâ sayyidinâ muhammadin wa \'alâ âli sayyidinâ muhammadin. Allâhummaghfirlî dzunûbî waftahlî abwâba rahmatik.<br><br>Artinya: \"Aku berlindung kepada Allah Yang Maha Besar, kepada Dzat-Nya Yang Maha Mulia, dan kepada kerajaan-Nya Yang Sedia dari setan yang terlontar. Dengan nama Allah dan segala puji bagi Allah. Hai Tuhanku, berilah shalawat dan sejahtera atas Sayyidina Muhammad dan atas keluarga Sayyidina Muhammad. Hai Tuhanku, ampuni untukku segala dosaku. Bukakanlah bagiku segala pintu kemurahan-Mu.\"<br><br>Setelah itu, hendaknya mengucapkan Bismillah sambil mendahulukan kaki kanan ketika memasuki masjid, dan mendahulukan kaki kiri ketika keluar dari masjid.<br><br>Doa Keluar Masjid<br>Imam Nawawi juga menyebutkan bahwa, ketika keluar masjid, cukup mengganti doa masuk masjid pada ayat terakhir, yaitu abwaba rahmatika (semua pintu rahmat-Mu) dengan abwaba fadhlika (semua pintu kemurahan-Mu). Sehingga, bacaan doa keluar masjid seperti berikut ini.<br><br>أعُوْذُ بِاللهِ العَظِيْمِ وَبِوَجْهِهِ الْكَرِيْمِ وَسُلْطَانِهِ الْقَدِيْمِ مِنَ الشَّيْطَانِ الرَّجِيْمِ. بِسْمِ اللهِ وَالْحَمْدُ لِلهِ. أَللَّهُمَّ صَلِّ وَسَلِّمْ عَلَى سَيِّدِنَا مُحَمَّدٍ وَعَلَى آلِ سَيِّدِنَا مُحَمَّدٍ. اَللَّهُمَّ اغْفِرْ لِي ذُنُوْبِي وَافْتَحْ لِي أَبْوَابَ فَضْلِكَ<br><br>A\'ûdzu billâhil \'azhîm wa biwajhihil karîm wa sulthânihil qadîm minas syaithânir rajîm. Bismillâhi wal hamdulillâh. Allâhumma shalli wa sallim \'alâ sayyidinâ muhammadin wa \'alâ âli sayyidinâ muhammadin. Allâhummaghfirlî dzunûbî waftahlî abwâba fadhlik.<br><br>Artinya: \"Aku berlindung kepada Allah Yang Maha Besar, kepada Dzat-Nya Yang Maha Mulia, dan kepada kerajaan-Nya Yang Sedia dari setan yang terlontar. Dengan nama Allah dan segala puji bagi Allah. Hai Tuhanku, berilah shalawat dan sejahtera atas Sayyidina Muhammad dan atas keluarga Sayyidina Muhammad. Hai Tuhanku, ampuni untukku segala dosaku. Bukakanlah bagiku segala pintu kemurahan-Mu.\"<br><br>Keutamaan Masuk dan Duduk dalam Masjid<br>Dalam kitab Fiqh as-Sunnah karya Sayyid Sabiq yang diterjemahkan Khairul Amru Harahap dkk, terdapat hadits yang diriwayatkan Imam Ahmad, Bukhari, dari Abu Hurairah RA, bahwa Rasulullah SAW bersabda,<br><br>فمن غدا إلى المسجد أو راح أعد الله له في الجنة نزلا كلما غدا أو راح<br><br>Artinya: \"Barang siapa datang ke masjid dan pulang (dari masjid), maka Allah menyiapkan jamuan surga baginya, (yaitu) setiap kali dia pergi dan pulang.\"<br><br>Dalam riwayat lain, Rasulullah SAW bersabda,<br><br>إذا رأيتم الرجل يعتاد المسجد فاشهدوا له بالإيمان قال الله تعالى إنما يعمر مساجد الله من آمن بالله واليوم الآخر<br><br>Artinya: \"Apabila kalian melihat seseorang terbiasa ke masjid, maka bersaksilah bahwa dia benar-benar beriman.\" Allah SWT berfirman dalam surah At-Taubah ayat 18,<br><br>اِنَّمَا يَعْمُرُ مَسٰجِدَ اللّٰهِ مَنْ اٰمَنَ بِاللّٰهِ وَالْيَوْمِ الْاٰخِرِ<br><br>Artinya: \"Yang memakmurkan masjid-masjid Allah hanyalah orang-orang yang beriman kepada Allah dan hari akhir.\"<br><br>Imam Muslim juga telah meriwayatkan dari Abu Hurairah, bahwasanya Rasulullah SAW bersabda:<br><br>من تطهر في بيته، ثم مشى إلى بيت من بيوت الله ليقضي فريضة من فرائض الله، كانت خطواته إحداهما تحط خطيئة، والأخرى ترفع درجة<br><br>Artinya: \"Barang siapa yang bersuci di rumahnya, kemudian berjalan menuju salah satu rumah Allah (masjid) untuk menunaikan suatu kewajiban kepada Allah, maka langkah kakinya yang satu menghapuskan kesalahannya (dosanya) dan langkah kakinya yang lain mengangkat derajatnya.\"<br><br>Doa masuk dan keluar masjid juga memiliki keutamaan. Merujuk kembali pada kitab Al-Azhar, Imam Nawawi mengutip sebuah hadits dari Abdullah ibnu Amr ibnul Ash RA, ia menceritakan:<br><br>Bahwa Nabi SAW apabila memasuki masjid mengucapkan doa, \"Aku berlindung kepada Allah Yang Maha Agung, kepada Dzat-Nya Yang Maha Mulia, dan kepada kekuasaan-Nya Yang Maha Dahulu dari setan yang terkutuk.\" Apabila seseorang mengucapkan doa tersebut, maka setan berkata, \"Ia terpelihara dari godaanku sepanjang hari.\"<br><br>Dalam riwayat lain, dari Abu Umamah RA, bahwa Nabi SAW pernah bersabda,<br><br>\"Sesungguhnya seseorang di antara kalian apabila hendak keluar dari masjid, maka semua bala tentara iblis saling memanggil dan saling mendatangkan teman-temannya serta berkumpul seperti lebah yang mengerumuni ratunya. Untuk itu, bila salah seorang dari kalian berdiri di depan pintu (keluar), hendaklah ia mengucapkan, \'Ya Allah, sesungguhnya aku berlindung kepada-Mu dari iblis dan bala tentaranya.\' Sesungguhnya jika ia mengucapkannya, iblis tidak dapat menimpakan bahaya terhadapnya.\"<br><br><br>Sumber:&nbsp;\"Doa Masuk dan Keluar Masjid: Arab, Latin dan Artinya\" selengkapnya&nbsp;https://www.detik.com/hikmah/doa-dan-hadits/d-7640045/doa-masuk-dan-keluar-masjid-arab-latin-dan-artinya.<br></span></p>', '2024-11-16', 'berita', 'published', 'images/lwUf1mDKyVJEtgN4Zq0CVupaoEYigYcy8kiYu65b.jpg', '2024-11-16 14:39:38', '2024-11-16 14:39:38');

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `coa`
--

CREATE TABLE `coa` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `kode_akun` varchar(255) NOT NULL,
  `nama_akun` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `coa`
--

INSERT INTO `coa` (`id`, `kode_akun`, `nama_akun`, `created_at`, `updated_at`) VALUES
(1, '1001', 'Kas', '2024-11-16 13:48:15', '2024-11-16 13:48:15'),
(2, '2001', 'Piutang', '2024-11-16 13:48:15', '2024-11-16 13:48:15');

-- --------------------------------------------------------

--
-- Table structure for table `fasilitas`
--

CREATE TABLE `fasilitas` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `info_masjid_id` bigint(20) UNSIGNED NOT NULL,
  `nama_fasilitas` varchar(255) NOT NULL,
  `deskripsi` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `fasilitas`
--

INSERT INTO `fasilitas` (`id`, `info_masjid_id`, `nama_fasilitas`, `deskripsi`, `created_at`, `updated_at`) VALUES
(1, 1, 'Parkir Luas', 'Area parkir dapat menampung hingga 100 kendaraan.', '2024-11-16 13:48:15', '2024-11-16 13:48:15');

-- --------------------------------------------------------

--
-- Table structure for table `general_ledger`
--

CREATE TABLE `general_ledger` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `coa_id` bigint(20) UNSIGNED NOT NULL,
  `tanggal` date NOT NULL,
  `debit` decimal(15,2) NOT NULL,
  `kredit` decimal(15,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `general_ledger`
--

INSERT INTO `general_ledger` (`id`, `coa_id`, `tanggal`, `debit`, `kredit`, `created_at`, `updated_at`) VALUES
(1, 1, '2024-10-10', 1000000.00, 0.00, '2024-11-16 13:48:15', '2024-11-16 13:48:15'),
(2, 1, '2024-10-12', 0.00, 200000.00, '2024-11-16 13:48:15', '2024-11-16 13:48:15');

-- --------------------------------------------------------

--
-- Table structure for table `images`
--

CREATE TABLE `images` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `keterangan` text DEFAULT NULL,
  `kategori` varchar(255) NOT NULL,
  `image` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `imageable_id` bigint(20) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `images`
--

INSERT INTO `images` (`id`, `keterangan`, `kategori`, `image`, `created_at`, `updated_at`, `imageable_id`) VALUES
(1, 'Foto Masjid Al-Falah', 'masjid', NULL, '2024-11-16 13:48:15', '2024-11-16 13:48:15', NULL),
(2, 'Foto Kegiatan Pengajian', 'kegiatan', NULL, '2024-11-16 13:48:15', '2024-11-16 13:48:15', NULL),
(3, 'foto masjid 1', 'galeri', 'images/qD1GeguogZqDhLOqPdeKbjNE71VHvghyUapfbaj6.jpg', '2024-11-16 13:49:43', '2024-11-16 13:49:43', NULL),
(4, 'foto masjid 2', 'galeri', 'images/Op4wu8jaBnwrQwsIfFErxguFPybJvKC6VnRuQiUr.jpg', '2024-11-16 13:49:56', '2024-11-16 13:49:56', NULL),
(5, 'foto masjid 3', 'galeri', 'images/pFAEDIqOd3pT71PPYG0CtIZ5BpCul5SPWNJM1Szv.jpg', '2024-11-16 13:50:00', '2024-11-16 13:50:00', NULL),
(6, 'foto masjid 4', 'galeri', 'images/lWTgrtcPo8TVILYCBLHCxcAug2bkPh6zM5BrwfwH.jpg', '2024-11-16 13:50:08', '2024-11-16 13:50:08', NULL),
(7, 'foto masjid 5', 'galeri', 'images/lEU7Dn42BW9j4abuBG37pWQgixz6z2RuGhH5yy4s.jpg', '2024-11-16 13:50:12', '2024-11-16 13:50:12', NULL),
(8, 'foto masjid 6', 'galeri', 'images/4uo3oRhCuwKcdcZOzRb4iA5fjBt5DRwRhXmSMLvv.jpg', '2024-11-16 13:50:22', '2024-11-16 13:50:22', NULL),
(9, 'foto gendut', 'galeri', 'images/1KafDe3Vvi7g4Jx2htO6ikIizMFoH7lNLsRVz7cq.jpg', '2024-11-16 13:50:37', '2024-11-16 13:50:37', NULL),
(10, 'Foto: Halal bi Halal', 'kegiatan', 'images/qJ0Uw9xhp2mYeA746ETEcBiSQwpUbT5Sblu0mvtD.jpg', '2024-11-16 14:32:03', '2024-11-16 14:32:03', 3),
(12, 'Foto: Pengajian Akbar', 'kegiatan', 'images/Kfqi7ti4cOnYLlM8sawM65disV2aQxAqsac1owB3.jpg', '2024-11-16 14:33:01', '2024-11-16 14:33:01', 5),
(14, 'Foto: Buka Puasa Bersama', 'kegiatan', 'images/SVzjoj8vc34icZnhnCmPagt0DD9N4itdUX3gGZKt.jpg', '2024-11-16 14:33:40', '2024-11-16 14:33:40', 7);

-- --------------------------------------------------------

--
-- Table structure for table `info_masjid`
--

CREATE TABLE `info_masjid` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nama_masjid` varchar(255) NOT NULL,
  `alamat` text NOT NULL,
  `kontak` varchar(255) DEFAULT NULL,
  `deskripsi` text DEFAULT NULL,
  `ad_art` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `info_masjid`
--

INSERT INTO `info_masjid` (`id`, `nama_masjid`, `alamat`, `kontak`, `deskripsi`, `ad_art`, `created_at`, `updated_at`) VALUES
(1, 'Masjid Tercode', 'Banguntapan, Bantul', '081234567890', 'Masjid Tercode terletak di Banguntapan, Bantul dan telah menjadi pusat ibadah serta kegiatan sosial bagi umat Muslim setempat. Didirikan pada tahun 2024, masjid ini menawarkan suasana yang nyaman untuk beribadah. Masjid ini juga menyediakan fasilitas untuk mendukung kegiatan keagamaan, seperti ruang belajar, tempat parkir, dan area untuk acara komunitas. Selain itu, masjid ini aktif dalam berbagai kegiatan sosial seperti penggalangan dana dan bantuan kemanusiaan untuk yang membutuhkan. Dengan peran pentingnya dalam kehidupan spiritual dan sosial masyarakat, Masjid Tercode menjadi tempat yang mendekatkan umat kepada Allah dan mempererat hubungan antar sesama.', 'AD/ART lengkap', '2024-11-16 13:48:15', '2024-11-16 18:09:57');

-- --------------------------------------------------------

--
-- Table structure for table `jadwal_sholat`
--

CREATE TABLE `jadwal_sholat` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tanggal` date NOT NULL,
  `subuh` time NOT NULL,
  `dzuhur` time NOT NULL,
  `ashar` time NOT NULL,
  `maghrib` time NOT NULL,
  `isya` time NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `jadwal_sholat`
--

INSERT INTO `jadwal_sholat` (`id`, `tanggal`, `subuh`, `dzuhur`, `ashar`, `maghrib`, `isya`, `created_at`, `updated_at`) VALUES
(1, '2024-10-10', '04:30:00', '12:00:00', '15:30:00', '18:00:00', '19:30:00', '2024-11-16 13:48:15', '2024-11-16 13:48:15'),
(2, '2024-10-11', '04:31:00', '12:01:00', '15:31:00', '18:01:00', '19:31:00', '2024-11-16 13:48:15', '2024-11-16 13:48:15');

-- --------------------------------------------------------

--
-- Table structure for table `jamaah`
--

CREATE TABLE `jamaah` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nama` varchar(255) NOT NULL,
  `birth` date NOT NULL,
  `gender` enum('pria','wanita') NOT NULL,
  `email` varchar(255) NOT NULL,
  `kontak` varchar(255) DEFAULT NULL,
  `alamat` text DEFAULT NULL,
  `keterangan` enum('aktif','pindah','wafat') NOT NULL DEFAULT 'aktif',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `jamaah`
--

INSERT INTO `jamaah` (`id`, `nama`, `birth`, `gender`, `email`, `kontak`, `alamat`, `keterangan`, `created_at`, `updated_at`) VALUES
(1, 'John Doe', '1980-01-01', 'pria', 'johndoe@example.com', '081234567890', 'Jl. Merdeka No. 1', 'aktif', '2024-11-16 13:48:15', '2024-11-16 13:48:15'),
(2, 'Jane Doe', '1985-02-02', 'wanita', 'janedoe@example.com', '081234567891', 'Jl. Merdeka No. 2', 'pindah', '2024-11-16 13:48:15', '2024-11-16 13:48:15');

-- --------------------------------------------------------

--
-- Table structure for table `jurnal_umum`
--

CREATE TABLE `jurnal_umum` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `coa_id` bigint(20) UNSIGNED NOT NULL,
  `tanggal` date NOT NULL,
  `debit` decimal(15,2) NOT NULL,
  `kredit` decimal(15,2) NOT NULL,
  `keterangan` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `jurnal_umum`
--

INSERT INTO `jurnal_umum` (`id`, `coa_id`, `tanggal`, `debit`, `kredit`, `keterangan`, `created_at`, `updated_at`) VALUES
(1, 1, '2024-10-10', 1000000.00, 0.00, 'Sumbangan dari Hamba Allah', '2024-11-16 13:48:15', '2024-11-16 13:48:15'),
(2, 1, '2024-10-12', 0.00, 200000.00, 'Pembayaran Biaya Operasional', '2024-11-16 13:48:15', '2024-11-16 13:48:15');

-- --------------------------------------------------------

--
-- Table structure for table `kegiatan`
--

CREATE TABLE `kegiatan` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nama_kegiatan` varchar(255) NOT NULL,
  `tanggal` date NOT NULL,
  `lokasi` varchar(255) NOT NULL,
  `kategori` enum('khatib','muazin','umum') NOT NULL,
  `keterangan` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `kegiatan`
--

INSERT INTO `kegiatan` (`id`, `nama_kegiatan`, `tanggal`, `lokasi`, `kategori`, `keterangan`, `created_at`, `updated_at`) VALUES
(3, 'Halal bi Halal', '2024-11-20', 'Masjid Tercode', 'umum', 'halal bi halal di masjid tercode', '2024-11-16 14:32:03', '2024-11-16 14:32:03'),
(5, 'Pengajian Akbar', '2024-11-20', 'Masjid Tercode', 'umum', 'pengajian akbar di masjid tercode', '2024-11-16 14:33:01', '2024-11-16 14:33:01'),
(7, 'Buka Puasa Bersama', '2024-11-20', 'Masjid Tercode', 'umum', 'buka bersama di masjid tercode', '2024-11-16 14:33:40', '2024-11-16 14:33:40');

-- --------------------------------------------------------

--
-- Table structure for table `laporan_keuangan`
--

CREATE TABLE `laporan_keuangan` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `periode` date NOT NULL,
  `total_pemasukan` decimal(15,2) NOT NULL,
  `total_pengeluaran` decimal(15,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `laporan_keuangan`
--

INSERT INTO `laporan_keuangan` (`id`, `periode`, `total_pemasukan`, `total_pengeluaran`, `created_at`, `updated_at`) VALUES
(1, '2024-11-26', 4852552.00, 2667285.00, '2024-11-16 17:43:42', '2024-11-16 17:43:42'),
(2, '2024-11-18', 1167206.00, 709041.00, '2024-11-16 17:43:42', '2024-11-16 17:43:42'),
(3, '2024-11-13', 4383182.00, 2802185.00, '2024-11-16 17:43:42', '2024-11-16 17:43:42'),
(4, '2024-11-02', 3934120.00, 2946735.00, '2024-11-16 17:43:42', '2024-11-16 17:43:42'),
(5, '2024-11-01', 4304113.00, 1883978.00, '2024-11-16 17:43:42', '2024-11-16 17:43:42'),
(6, '2024-10-13', 2887816.00, 1119992.00, '2024-11-16 17:43:42', '2024-11-16 17:43:42'),
(7, '2024-10-18', 3710006.00, 2784164.00, '2024-11-16 17:43:42', '2024-11-16 17:43:42'),
(8, '2024-10-04', 2837127.00, 1148189.00, '2024-11-16 17:43:42', '2024-11-16 17:43:42'),
(9, '2024-10-15', 2428028.00, 2283753.00, '2024-11-16 17:43:42', '2024-11-16 17:43:42'),
(10, '2024-10-27', 1239252.00, 1262503.00, '2024-11-16 17:43:42', '2024-11-16 17:43:42'),
(11, '2023-11-05', 2845026.00, 1156231.00, '2024-11-16 17:43:42', '2024-11-16 17:43:42'),
(12, '2023-11-12', 4284181.00, 1263379.00, '2024-11-16 17:43:42', '2024-11-16 17:43:42'),
(13, '2023-11-03', 3739458.00, 2238836.00, '2024-11-16 17:43:42', '2024-11-16 17:43:42'),
(14, '2023-11-13', 2057615.00, 1412917.00, '2024-11-16 17:43:42', '2024-11-16 17:43:42'),
(15, '2023-11-17', 3157247.00, 2416227.00, '2024-11-16 17:43:42', '2024-11-16 17:43:42'),
(16, '2024-11-13', 1323000.00, 2002871.00, '2024-11-16 17:44:31', '2024-11-16 17:44:31'),
(17, '2024-11-16', 3341594.00, 2077003.00, '2024-11-16 17:44:31', '2024-11-16 17:44:31'),
(18, '2024-11-05', 3190466.00, 2297289.00, '2024-11-16 17:44:31', '2024-11-16 17:44:31'),
(19, '2024-11-13', 3302371.00, 2893470.00, '2024-11-16 17:44:31', '2024-11-16 17:44:31'),
(20, '2024-11-03', 1448473.00, 1991615.00, '2024-11-16 17:44:31', '2024-11-16 17:44:31'),
(21, '2024-10-04', 1703704.00, 1504754.00, '2024-11-16 17:44:31', '2024-11-16 17:44:31'),
(22, '2024-10-24', 3396746.00, 1960287.00, '2024-11-16 17:44:31', '2024-11-16 17:44:31'),
(23, '2024-10-01', 4174622.00, 2867047.00, '2024-11-16 17:44:31', '2024-11-16 17:44:31'),
(24, '2024-10-24', 4827442.00, 2227963.00, '2024-11-16 17:44:31', '2024-11-16 17:44:31'),
(25, '2024-10-21', 4861125.00, 1135461.00, '2024-11-16 17:44:31', '2024-11-16 17:44:31'),
(26, '2023-11-24', 1141793.00, 635406.00, '2024-11-16 17:44:31', '2024-11-16 17:44:31'),
(27, '2023-11-14', 3533193.00, 2831847.00, '2024-11-16 17:44:31', '2024-11-16 17:44:31'),
(28, '2023-11-21', 1119544.00, 2247260.00, '2024-11-16 17:44:31', '2024-11-16 17:44:31'),
(29, '2023-11-09', 1253048.00, 1539937.00, '2024-11-16 17:44:31', '2024-11-16 17:44:31'),
(30, '2023-11-12', 1697884.00, 2319776.00, '2024-11-16 17:44:31', '2024-11-16 17:44:31'),
(31, '2024-11-12', 1700000.00, 600000.00, '2024-11-16 17:45:50', '2024-11-16 17:45:50'),
(32, '2024-11-14', 1500000.00, 600000.00, '2024-11-16 17:45:55', '2024-11-16 17:45:55'),
(33, '2024-11-15', 1500000.00, 800000.00, '2024-11-16 17:46:00', '2024-11-16 17:46:00'),
(34, '2024-11-17', 1300000.00, 800000.00, '2024-11-16 17:46:05', '2024-11-16 17:46:05'),
(35, '2024-11-11', 1400000.00, 800000.00, '2024-11-16 17:46:38', '2024-11-16 17:46:38');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(2, '2024_10_07_050425_create_info_masjid_table', 2),
(3, '2024_10_07_173427_create_sessions_table', 2),
(4, '2024_10_07_180754_create_personal_access_tokens_table', 2),
(5, '2024_10_07_191643_create_users_table', 2),
(6, '2024_10_07_192956_create_cache_table', 2),
(7, '2024_10_07_201235_create_password_reset_tokens_table', 2),
(8, '2024_10_07_204404_add_remember_token_to_users_table', 2),
(9, '2024_10_07_213441_add_email_verified_at_to_users_table', 2),
(10, '2024_10_10_045714_create_mubaligh_table', 2),
(11, '2024_10_10_045742_create_bank_table', 2),
(12, '2024_10_10_050425_create_fasilitas_table', 2),
(13, '2024_10_10_050427_create_strukur_organisasi_table', 2),
(14, '2024_10_10_050428_create_coa_table', 2),
(15, '2024_10_10_050430_create_arus_kas_table', 2),
(16, '2024_10_10_050431_create_general_ledger_table', 2),
(17, '2024_10_10_050431_create_jurnal_umum_table', 2),
(18, '2024_10_10_050431_create_penerimaan_kas_table', 2),
(19, '2024_10_10_050431_create_pengeluaran_kas_table', 2),
(20, '2024_10_10_050432_create_posisi_keuangan_table', 2),
(21, '2024_10_10_050433_create_pesan_website_table', 2),
(22, '2024_10_10_050435_create_yatim_dhuafa_table', 2),
(23, '2024_10_10_050436_create_images_table', 2),
(24, '2024_10_10_050436_create_jamaah_table', 2),
(25, '2024_10_10_050437_create_template_surat_table', 2),
(26, '2024_10_10_050438_create_berita_table', 2),
(27, '2024_10_10_050439_create_jadwal_sholat_table', 2),
(28, '2024_10_10_050439_create_kegiatan_table', 2),
(29, '2024_10_11_115305_add_imageable_id_to_images_table', 2),
(31, '2024_10_10_050434_create_laporan_keuangan_table', 3);

-- --------------------------------------------------------

--
-- Table structure for table `mubaligh`
--

CREATE TABLE `mubaligh` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `info_masjid_id` bigint(20) UNSIGNED NOT NULL,
  `nama` varchar(255) NOT NULL,
  `kontak` varchar(255) DEFAULT NULL,
  `alamat` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `mubaligh`
--

INSERT INTO `mubaligh` (`id`, `info_masjid_id`, `nama`, `kontak`, `alamat`, `created_at`, `updated_at`) VALUES
(1, 1, 'Ustadz Abdul Somad', '081234567892', 'Jl. Sudirman No. 5, Jakarta', '2024-11-16 13:48:15', '2024-11-16 13:48:15'),
(2, 1, 'Ustadz Adi Hidayat', '081234567893', 'Jl. Diponegoro No. 7, Bandung', '2024-11-16 13:48:15', '2024-11-16 13:48:15');

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `penerimaan_kas`
--

CREATE TABLE `penerimaan_kas` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `coa_id` bigint(20) UNSIGNED NOT NULL,
  `arus_kas_id` bigint(20) UNSIGNED NOT NULL,
  `jenis` text DEFAULT NULL,
  `tanggal` date NOT NULL,
  `jumlah` decimal(15,2) NOT NULL,
  `deskripsi` text DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `penerimaan_kas`
--

INSERT INTO `penerimaan_kas` (`id`, `coa_id`, `arus_kas_id`, `jenis`, `tanggal`, `jumlah`, `deskripsi`, `image`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 'Sumbangan Umum', '2024-10-10', 1000000.00, 'Sumbangan dari Hamba Allah', NULL, '2024-11-16 13:48:15', '2024-11-16 13:48:15'),
(2, 1, 1, 'Sumbangan Khusus', '2024-10-11', 500000.00, 'Sumbangan Jumat', NULL, '2024-11-16 13:48:15', '2024-11-16 13:48:15');

-- --------------------------------------------------------

--
-- Table structure for table `pengeluaran_kas`
--

CREATE TABLE `pengeluaran_kas` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `coa_id` bigint(20) UNSIGNED NOT NULL,
  `arus_kas_id` bigint(20) UNSIGNED NOT NULL,
  `jenis` text DEFAULT NULL,
  `tanggal` date NOT NULL,
  `jumlah` decimal(15,2) NOT NULL,
  `deskripsi` text DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `pengeluaran_kas`
--

INSERT INTO `pengeluaran_kas` (`id`, `coa_id`, `arus_kas_id`, `jenis`, `tanggal`, `jumlah`, `deskripsi`, `image`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 'Operasional', '2024-10-12', 200000.00, 'Biaya Operasional', NULL, '2024-11-16 13:48:15', '2024-11-16 13:48:15'),
(2, 1, 1, 'Donasi', '2024-10-13', 300000.00, 'Pembelian Al-Qur\'an', NULL, '2024-11-16 13:48:15', '2024-11-16 13:48:15');

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(1, 'App\\Models\\User', 2, 'API Token', 'eb78a130784f6564bf526ca517c6291859ec4feb9d5638b3f162238688d9aa33', '[\"*\"]', NULL, NULL, '2024-11-16 13:52:29', '2024-11-16 13:52:29'),
(2, 'App\\Models\\User', 2, 'API Token', 'd8febfdc9c01ae3d3912849ae3334a622e47275695e686174778ec50fc11ed6f', '[\"*\"]', NULL, NULL, '2024-11-18 00:33:52', '2024-11-18 00:33:52'),
(3, 'App\\Models\\User', 2, 'API Token', '2ecd2ba06c66e1f5d02c45e70d923ff18b05cbe66b5da791034f65b448ed4178', '[\"*\"]', NULL, NULL, '2024-11-18 00:41:40', '2024-11-18 00:41:40');

-- --------------------------------------------------------

--
-- Table structure for table `pesan_website`
--

CREATE TABLE `pesan_website` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nama_pengirim` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `pesan` text NOT NULL,
  `tanggal` date NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `pesan_website`
--

INSERT INTO `pesan_website` (`id`, `nama_pengirim`, `email`, `pesan`, `tanggal`, `created_at`, `updated_at`) VALUES
(1, 'Ali Ahmad', 'ali@example.com', 'Terima kasih atas informasi mengenai kegiatan masjid raya jogja indonesia. ', '2024-10-15', '2024-11-16 13:48:15', '2024-11-16 13:48:15'),
(2, 'Siti Rahma', 'siti@example.com', 'Saya ingin berpartisipasi dalam kegiatan sosial.', '2024-10-16', '2024-11-16 13:48:15', '2024-11-16 13:48:15');

-- --------------------------------------------------------

--
-- Table structure for table `posisi_keuangan`
--

CREATE TABLE `posisi_keuangan` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `aktiva` decimal(15,2) NOT NULL DEFAULT 0.00,
  `pasiva` decimal(15,2) NOT NULL DEFAULT 0.00,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `posisi_keuangan`
--

INSERT INTO `posisi_keuangan` (`id`, `aktiva`, `pasiva`, `created_at`, `updated_at`) VALUES
(1, 800000.00, 800000.00, '2024-11-16 13:48:15', '2024-11-16 13:48:15');

-- --------------------------------------------------------

--
-- Table structure for table `rekening_bank`
--

CREATE TABLE `rekening_bank` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `info_masjid_id` bigint(20) UNSIGNED NOT NULL,
  `nama_bank` varchar(255) NOT NULL,
  `nomor_rekening` varchar(255) NOT NULL,
  `atas_nama` varchar(255) NOT NULL,
  `image_transfer` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `rekening_bank`
--

INSERT INTO `rekening_bank` (`id`, `info_masjid_id`, `nama_bank`, `nomor_rekening`, `atas_nama`, `image_transfer`, `created_at`, `updated_at`) VALUES
(1, 1, 'Bank Mandiri', '1234567890', 'Masjid Al-Falah', NULL, '2024-11-16 13:48:15', '2024-11-16 13:48:15'),
(2, 1, 'Bank BRI', '0987654321', 'Masjid Al-Ikhlas', NULL, '2024-11-16 13:48:15', '2024-11-16 13:48:15');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `struktur_organisasi`
--

CREATE TABLE `struktur_organisasi` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `info_masjid_id` bigint(20) UNSIGNED NOT NULL,
  `jabatan` varchar(255) NOT NULL,
  `nama` varchar(255) NOT NULL,
  `kontak` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `struktur_organisasi`
--

INSERT INTO `struktur_organisasi` (`id`, `info_masjid_id`, `jabatan`, `nama`, `kontak`, `created_at`, `updated_at`) VALUES
(1, 1, 'Ketua', 'H. Ahmad', '081234567890', '2024-11-16 13:48:15', '2024-11-16 13:48:15'),
(2, 1, 'Sekretaris', 'H. Budi', '081234567891', '2024-11-16 13:48:15', '2024-11-16 13:48:15');

-- --------------------------------------------------------

--
-- Table structure for table `template_surat`
--

CREATE TABLE `template_surat` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `judul_surat` varchar(255) NOT NULL,
  `isi_surat` text NOT NULL,
  `tanda_tangan` text DEFAULT NULL,
  `stempel` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `template_surat`
--

INSERT INTO `template_surat` (`id`, `judul_surat`, `isi_surat`, `tanda_tangan`, `stempel`, `created_at`, `updated_at`) VALUES
(1, 'Surat Permohonan Izin', 'Yth. Bapak/Ibu di Tempat, dengan ini kami memohon izin untuk...', NULL, NULL, '2024-11-16 13:48:15', '2024-11-16 13:48:15'),
(2, 'Surat Undangan Rapat', 'Kepada Yth. Pengurus Masjid, kami mengundang untuk menghadiri rapat...', NULL, NULL, '2024-11-16 13:48:15', '2024-11-16 13:48:15');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `firstname` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `birth` date DEFAULT NULL,
  `gender` enum('Male','Female') DEFAULT NULL,
  `role` enum('ADMIN','PENGURUS_MASJID') NOT NULL DEFAULT 'PENGURUS_MASJID',
  `avatar` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `firstname`, `lastname`, `email`, `email_verified_at`, `password`, `remember_token`, `phone`, `birth`, `gender`, `role`, `avatar`, `created_at`, `updated_at`) VALUES
(1, 'Gusnanto', 'Rafly', 'admin@gmail.com', NULL, '$2y$12$04fkZO1UgR4Ho21CCSoWyeQZ43INJovzWZ3U5vR7CHrrt2bJylhJe', NULL, '081234567890', '1990-01-01', 'Male', 'ADMIN', NULL, '2024-11-16 13:48:14', '2024-11-16 13:48:14'),
(2, 'Gusnanto', 'Rafly', 'gusnantoid@gmail.com', NULL, '$2y$12$ZdJozWBBvDsXSyxberjuN.c0/dAYWPgmYPND0iXRXniRKFww7jqwe', NULL, '081234567890', '1990-01-01', 'Male', 'ADMIN', 'avatars/n2ERHOYFb5VeW7CwGacQu8xT7QRJBdDB9D827XXB.jpg', '2024-11-16 13:48:14', '2024-11-16 13:52:53'),
(3, 'Fivi', 'Gendut', 'aulia.fivi910@gmail.com', NULL, '$2y$12$jwEVfbg2nnW6AZ3v7.xPiuaOX9qzVd6mRQtgF/zg4FNjajA0Eqf86', NULL, '081234567890', '1990-01-01', 'Female', 'ADMIN', NULL, '2024-11-16 13:48:14', '2024-11-16 13:48:14'),
(4, 'Haidar', 'Taqi', 'afamerteam@gmail.com', NULL, '$2y$12$EiJuKwkY2F3pdFDvNb2IkOFcAOLnK5FW7nloUXjyb6mB3UpxCV0sa', NULL, '081234567890', '2001-09-11', 'Male', 'ADMIN', NULL, '2024-11-16 13:48:14', '2024-11-16 13:48:14');

-- --------------------------------------------------------

--
-- Table structure for table `yatim_dhuafa`
--

CREATE TABLE `yatim_dhuafa` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nama` varchar(255) NOT NULL,
  `birth` date DEFAULT NULL,
  `alamat` text DEFAULT NULL,
  `keterangan` enum('yatim','piatu','dhuafa','yatim piatu') NOT NULL,
  `kontak` varchar(255) NOT NULL,
  `status` enum('aktif','pindah','wafat') NOT NULL DEFAULT 'aktif',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `yatim_dhuafa`
--

INSERT INTO `yatim_dhuafa` (`id`, `nama`, `birth`, `alamat`, `keterangan`, `kontak`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Ahmad Yatim', '2010-03-03', 'Jl. Sudirman No. 1', 'yatim', '081234567892', 'aktif', '2024-11-16 13:48:15', '2024-11-16 13:48:15'),
(2, 'Budi Duafa', '2012-04-04', 'Jl. Sudirman No. 2', 'dhuafa', '081234567893', 'pindah', '2024-11-16 13:48:15', '2024-11-16 13:48:15');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `arus_kas`
--
ALTER TABLE `arus_kas`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `berita`
--
ALTER TABLE `berita`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `coa`
--
ALTER TABLE `coa`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `fasilitas`
--
ALTER TABLE `fasilitas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fasilitas_info_masjid_id_foreign` (`info_masjid_id`);

--
-- Indexes for table `general_ledger`
--
ALTER TABLE `general_ledger`
  ADD PRIMARY KEY (`id`),
  ADD KEY `general_ledger_coa_id_foreign` (`coa_id`);

--
-- Indexes for table `images`
--
ALTER TABLE `images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `images_imageable_id_kategori_index` (`imageable_id`,`kategori`);

--
-- Indexes for table `info_masjid`
--
ALTER TABLE `info_masjid`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `jadwal_sholat`
--
ALTER TABLE `jadwal_sholat`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `jamaah`
--
ALTER TABLE `jamaah`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `jamaah_email_unique` (`email`);

--
-- Indexes for table `jurnal_umum`
--
ALTER TABLE `jurnal_umum`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jurnal_umum_coa_id_foreign` (`coa_id`);

--
-- Indexes for table `kegiatan`
--
ALTER TABLE `kegiatan`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `laporan_keuangan`
--
ALTER TABLE `laporan_keuangan`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `mubaligh`
--
ALTER TABLE `mubaligh`
  ADD PRIMARY KEY (`id`),
  ADD KEY `mubaligh_info_masjid_id_foreign` (`info_masjid_id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD KEY `password_reset_tokens_email_index` (`email`);

--
-- Indexes for table `penerimaan_kas`
--
ALTER TABLE `penerimaan_kas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `penerimaan_kas_coa_id_foreign` (`coa_id`),
  ADD KEY `penerimaan_kas_arus_kas_id_foreign` (`arus_kas_id`);

--
-- Indexes for table `pengeluaran_kas`
--
ALTER TABLE `pengeluaran_kas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `pengeluaran_kas_coa_id_foreign` (`coa_id`),
  ADD KEY `pengeluaran_kas_arus_kas_id_foreign` (`arus_kas_id`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `pesan_website`
--
ALTER TABLE `pesan_website`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `posisi_keuangan`
--
ALTER TABLE `posisi_keuangan`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `rekening_bank`
--
ALTER TABLE `rekening_bank`
  ADD PRIMARY KEY (`id`),
  ADD KEY `rekening_bank_info_masjid_id_foreign` (`info_masjid_id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `struktur_organisasi`
--
ALTER TABLE `struktur_organisasi`
  ADD PRIMARY KEY (`id`),
  ADD KEY `struktur_organisasi_info_masjid_id_foreign` (`info_masjid_id`);

--
-- Indexes for table `template_surat`
--
ALTER TABLE `template_surat`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- Indexes for table `yatim_dhuafa`
--
ALTER TABLE `yatim_dhuafa`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `arus_kas`
--
ALTER TABLE `arus_kas`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `berita`
--
ALTER TABLE `berita`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `coa`
--
ALTER TABLE `coa`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `fasilitas`
--
ALTER TABLE `fasilitas`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `general_ledger`
--
ALTER TABLE `general_ledger`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `images`
--
ALTER TABLE `images`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `info_masjid`
--
ALTER TABLE `info_masjid`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `jadwal_sholat`
--
ALTER TABLE `jadwal_sholat`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `jamaah`
--
ALTER TABLE `jamaah`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `jurnal_umum`
--
ALTER TABLE `jurnal_umum`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `kegiatan`
--
ALTER TABLE `kegiatan`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `laporan_keuangan`
--
ALTER TABLE `laporan_keuangan`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `mubaligh`
--
ALTER TABLE `mubaligh`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `penerimaan_kas`
--
ALTER TABLE `penerimaan_kas`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `pengeluaran_kas`
--
ALTER TABLE `pengeluaran_kas`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `pesan_website`
--
ALTER TABLE `pesan_website`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `posisi_keuangan`
--
ALTER TABLE `posisi_keuangan`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `rekening_bank`
--
ALTER TABLE `rekening_bank`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `struktur_organisasi`
--
ALTER TABLE `struktur_organisasi`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `template_surat`
--
ALTER TABLE `template_surat`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `yatim_dhuafa`
--
ALTER TABLE `yatim_dhuafa`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `fasilitas`
--
ALTER TABLE `fasilitas`
  ADD CONSTRAINT `fasilitas_info_masjid_id_foreign` FOREIGN KEY (`info_masjid_id`) REFERENCES `info_masjid` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `general_ledger`
--
ALTER TABLE `general_ledger`
  ADD CONSTRAINT `general_ledger_coa_id_foreign` FOREIGN KEY (`coa_id`) REFERENCES `coa` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `jurnal_umum`
--
ALTER TABLE `jurnal_umum`
  ADD CONSTRAINT `jurnal_umum_coa_id_foreign` FOREIGN KEY (`coa_id`) REFERENCES `coa` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `mubaligh`
--
ALTER TABLE `mubaligh`
  ADD CONSTRAINT `mubaligh_info_masjid_id_foreign` FOREIGN KEY (`info_masjid_id`) REFERENCES `info_masjid` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `penerimaan_kas`
--
ALTER TABLE `penerimaan_kas`
  ADD CONSTRAINT `penerimaan_kas_arus_kas_id_foreign` FOREIGN KEY (`arus_kas_id`) REFERENCES `arus_kas` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `penerimaan_kas_coa_id_foreign` FOREIGN KEY (`coa_id`) REFERENCES `coa` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `pengeluaran_kas`
--
ALTER TABLE `pengeluaran_kas`
  ADD CONSTRAINT `pengeluaran_kas_arus_kas_id_foreign` FOREIGN KEY (`arus_kas_id`) REFERENCES `arus_kas` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `pengeluaran_kas_coa_id_foreign` FOREIGN KEY (`coa_id`) REFERENCES `coa` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `rekening_bank`
--
ALTER TABLE `rekening_bank`
  ADD CONSTRAINT `rekening_bank_info_masjid_id_foreign` FOREIGN KEY (`info_masjid_id`) REFERENCES `info_masjid` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `struktur_organisasi`
--
ALTER TABLE `struktur_organisasi`
  ADD CONSTRAINT `struktur_organisasi_info_masjid_id_foreign` FOREIGN KEY (`info_masjid_id`) REFERENCES `info_masjid` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
