-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 15, 2024 at 09:42 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

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
  `penerimaan_kas_id` bigint(20) UNSIGNED DEFAULT NULL,
  `pengeluaran_kas_id` bigint(20) UNSIGNED DEFAULT NULL,
  `tanggal` date NOT NULL,
  `pemasukan` decimal(15,2) DEFAULT NULL,
  `pengeluaran` decimal(15,2) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `arus_kas`
--

INSERT INTO `arus_kas` (`id`, `penerimaan_kas_id`, `pengeluaran_kas_id`, `tanggal`, `pemasukan`, `pengeluaran`, `created_at`, `updated_at`) VALUES
(1, 1, NULL, '2024-10-10', '1000000.00', NULL, '2024-10-15 00:35:26', '2024-10-15 00:35:26'),
(2, NULL, 1, '2024-10-12', NULL, '200000.00', '2024-10-15 00:35:26', '2024-10-15 00:35:26');

-- --------------------------------------------------------

--
-- Table structure for table `berita`
--

CREATE TABLE `berita` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `judul` varchar(255) NOT NULL,
  `konten` text NOT NULL,
  `tanggal_publikasi` date NOT NULL,
  `kategori` varchar(255) NOT NULL,
  `status` enum('draft','published','archived') NOT NULL,
  `foto` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `berita`
--

INSERT INTO `berita` (`id`, `judul`, `konten`, `tanggal_publikasi`, `kategori`, `status`, `foto`, `created_at`, `updated_at`) VALUES
(1, 'Berita Pertama', 'Ini adalah konten berita pertama.', '2024-10-15', 'Umum', 'published', 'foto_berita_1.jpg', '2024-10-15 00:35:26', '2024-10-15 00:35:26'),
(2, 'Berita Kedua', 'Ini adalah konten berita kedua.', '2024-10-16', 'Olahraga', 'draft', 'foto_berita_2.jpg', '2024-10-15 00:35:26', '2024-10-15 00:35:26'),
(3, 'Berita Ketiga', 'Ini adalah konten berita ketiga.', '2024-10-17', 'Teknologi', 'archived', 'foto_berita_3.jpg', '2024-10-15 00:35:26', '2024-10-15 00:35:26');

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
(1, '1001', 'Kas', '2024-10-15 00:35:26', '2024-10-15 00:35:26'),
(2, '2001', 'Piutang', '2024-10-15 00:35:26', '2024-10-15 00:35:26');

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
(1, 1, 'Parkir Luas', 'Area parkir dapat menampung hingga 100 kendaraan.', '2024-10-15 00:35:26', '2024-10-15 00:35:26'),
(2, 2, 'Ruang Ibadah Ber-AC', 'Ruang ibadah dilengkapi dengan pendingin ruangan untuk kenyamanan jamaah.', '2024-10-15 00:35:26', '2024-10-15 00:35:26');

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
(1, 1, '2024-10-10', '1000000.00', '0.00', '2024-10-15 00:35:26', '2024-10-15 00:35:26'),
(2, 1, '2024-10-12', '0.00', '200000.00', '2024-10-15 00:35:26', '2024-10-15 00:35:26');

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
(1, 'Foto Masjid Al-Falah', 'masjid', NULL, '2024-10-15 00:35:26', '2024-10-15 00:35:26', NULL),
(2, 'Foto Kegiatan Pengajian', 'kegiatan', NULL, '2024-10-15 00:35:26', '2024-10-15 00:35:26', NULL);

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
(1, 'Masjid Al-Falah', 'Jl. Merdeka No. 1, Jakarta', '081234567890', 'Masjid Al-Falah adalah masjid besar yang terletak di pusat kota.', 'AD/ART lengkap', '2024-10-15 00:35:26', '2024-10-15 00:35:26'),
(2, 'Masjid Al-Ikhlas', 'Jl. Sukabumi No. 2, Bandung', '082345678901', 'Masjid Al-Ikhlas adalah masjid kecil namun nyaman.', 'AD/ART detail', '2024-10-15 00:35:26', '2024-10-15 00:35:26');

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
(1, '2024-10-10', '04:30:00', '12:00:00', '15:30:00', '18:00:00', '19:30:00', '2024-10-15 00:35:26', '2024-10-15 00:35:26'),
(2, '2024-10-11', '04:31:00', '12:01:00', '15:31:00', '18:01:00', '19:31:00', '2024-10-15 00:35:26', '2024-10-15 00:35:26');

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
(1, 'John Doe', '1980-01-01', 'pria', 'johndoe@example.com', '081234567890', 'Jl. Merdeka No. 1', 'aktif', '2024-10-15 00:35:26', '2024-10-15 00:35:26'),
(2, 'Jane Doe', '1985-02-02', 'wanita', 'janedoe@example.com', '081234567891', 'Jl. Merdeka No. 2', 'pindah', '2024-10-15 00:35:26', '2024-10-15 00:35:26');

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
(1, 1, '2024-10-10', '1000000.00', '0.00', 'Sumbangan dari Hamba Allah', '2024-10-15 00:35:26', '2024-10-15 00:35:26'),
(2, 1, '2024-10-12', '0.00', '200000.00', 'Pembayaran Biaya Operasional', '2024-10-15 00:35:26', '2024-10-15 00:35:26');

-- --------------------------------------------------------

--
-- Table structure for table `kegiatan`
--

CREATE TABLE `kegiatan` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nama_kegiatan` varchar(255) NOT NULL,
  `tanggal` date NOT NULL,
  `kategori` enum('khatib','muazin','umum') NOT NULL,
  `keterangan` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `kegiatan`
--

INSERT INTO `kegiatan` (`id`, `nama_kegiatan`, `tanggal`, `kategori`, `keterangan`, `created_at`, `updated_at`) VALUES
(1, 'Pengajian Rutin', '2024-10-20', 'umum', 'Pengajian rutin bulanan setiap hari Minggu ketiga.', '2024-10-15 00:35:26', '2024-10-15 00:35:26'),
(2, 'Shalat Jumat', '2024-10-25', 'khatib', 'Shalat Jumat dengan khatib Ustadz Ahmad.', '2024-10-15 00:35:26', '2024-10-15 00:35:26');

-- --------------------------------------------------------

--
-- Table structure for table `laporan_keuangan`
--

CREATE TABLE `laporan_keuangan` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `periode` varchar(255) NOT NULL,
  `total_pemasukan` decimal(15,2) NOT NULL,
  `total_pengeluaran` decimal(15,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `laporan_keuangan`
--

INSERT INTO `laporan_keuangan` (`id`, `periode`, `total_pemasukan`, `total_pengeluaran`, `created_at`, `updated_at`) VALUES
(1, 'Oktober 2024', '1500000.00', '500000.00', '2024-10-15 00:35:26', '2024-10-15 00:35:26'),
(2, 'September 2024', '1200000.00', '300000.00', '2024-10-15 00:35:26', '2024-10-15 00:35:26');

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
(58, '2024_10_07_050425_create_info_masjid_table', 1),
(59, '2024_10_07_173427_create_sessions_table', 1),
(60, '2024_10_07_180754_create_personal_access_tokens_table', 1),
(61, '2024_10_07_191643_create_users_table', 1),
(62, '2024_10_07_192956_create_cache_table', 1),
(63, '2024_10_07_201235_create_password_reset_tokens_table', 1),
(64, '2024_10_07_204404_add_remember_token_to_users_table', 1),
(65, '2024_10_07_213441_add_email_verified_at_to_users_table', 1),
(66, '2024_10_10_045714_create_mubaligh_table', 1),
(67, '2024_10_10_045742_create_bank_table', 1),
(68, '2024_10_10_050425_create_fasilitas_table', 1),
(69, '2024_10_10_050427_create_strukur_organisasi_table', 1),
(70, '2024_10_10_050428_create_coa_table', 1),
(71, '2024_10_10_050429_create_penerimaan_kas_table', 1),
(72, '2024_10_10_050429_create_pengeluaran_kas_table', 1),
(73, '2024_10_10_050430_create_arus_kas_table', 1),
(74, '2024_10_10_050431_create_general_ledger_table', 1),
(75, '2024_10_10_050431_create_jurnal_umum_table', 1),
(76, '2024_10_10_050432_create_posisi_keuangan_table', 1),
(77, '2024_10_10_050433_create_pesan_website_table', 1),
(78, '2024_10_10_050434_create_laporan_keuangan_table', 1),
(79, '2024_10_10_050435_create_yatim_dhuafa_table', 1),
(80, '2024_10_10_050436_create_images_table', 1),
(81, '2024_10_10_050436_create_jamaah_table', 1),
(82, '2024_10_10_050437_create_template_surat_table', 1),
(83, '2024_10_10_050438_create_berita_table', 1),
(84, '2024_10_10_050439_create_jadwal_sholat_table', 1),
(85, '2024_10_10_050439_create_kegiatan_table', 1),
(86, '2024_10_11_115305_add_imageable_id_to_images_table', 1);

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
(1, 1, 'Ustadz Abdul Somad', '081234567892', 'Jl. Sudirman No. 5, Jakarta', '2024-10-15 00:35:26', '2024-10-15 00:35:26'),
(2, 2, 'Ustadz Adi Hidayat', '081234567893', 'Jl. Diponegoro No. 7, Bandung', '2024-10-15 00:35:26', '2024-10-15 00:35:26');

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
  `tanggal` date NOT NULL,
  `jumlah` decimal(15,2) NOT NULL,
  `keterangan` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `penerimaan_kas`
--

INSERT INTO `penerimaan_kas` (`id`, `coa_id`, `tanggal`, `jumlah`, `keterangan`, `created_at`, `updated_at`) VALUES
(1, 1, '2024-10-10', '1000000.00', 'Sumbangan dari Hamba Allah', '2024-10-15 00:35:26', '2024-10-15 00:35:26'),
(2, 1, '2024-10-11', '500000.00', 'Sumbangan Jumat', '2024-10-15 00:35:26', '2024-10-15 00:35:26');

-- --------------------------------------------------------

--
-- Table structure for table `pengeluaran_kas`
--

CREATE TABLE `pengeluaran_kas` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `coa_id` bigint(20) UNSIGNED NOT NULL,
  `tanggal` date NOT NULL,
  `jumlah` decimal(15,2) NOT NULL,
  `keterangan` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `pengeluaran_kas`
--

INSERT INTO `pengeluaran_kas` (`id`, `coa_id`, `tanggal`, `jumlah`, `keterangan`, `created_at`, `updated_at`) VALUES
(1, 1, '2024-10-12', '200000.00', 'Biaya Operasional', '2024-10-15 00:35:26', '2024-10-15 00:35:26'),
(2, 1, '2024-10-13', '300000.00', 'Pembelian Al-Qur\'an', '2024-10-15 00:35:26', '2024-10-15 00:35:26');

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
(1, 'Ali Ahmad', 'ali@example.com', 'Terima kasih atas informasi mengenai kegiatan masjid.', '2024-10-15', '2024-10-15 00:35:26', '2024-10-15 00:35:26'),
(2, 'Siti Rahma', 'siti@example.com', 'Saya ingin berpartisipasi dalam kegiatan sosial.', '2024-10-16', '2024-10-15 00:35:26', '2024-10-15 00:35:26');

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
(1, '800000.00', '800000.00', '2024-10-15 00:35:26', '2024-10-15 00:35:26');

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
(1, 1, 'Bank Mandiri', '1234567890', 'Masjid Al-Falah', NULL, '2024-10-15 00:35:26', '2024-10-15 00:35:26'),
(2, 2, 'Bank BRI', '0987654321', 'Masjid Al-Ikhlas', NULL, '2024-10-15 00:35:26', '2024-10-15 00:35:26');

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
(1, 1, 'Ketua', 'H. Ahmad', '081234567890', '2024-10-15 00:35:26', '2024-10-15 00:35:26'),
(2, 2, 'Sekretaris', 'H. Budi', '081234567891', '2024-10-15 00:35:26', '2024-10-15 00:35:26');

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
(1, 'Surat Permohonan Izin', 'Yth. Bapak/Ibu di Tempat, dengan ini kami memohon izin untuk...', NULL, NULL, '2024-10-15 00:35:26', '2024-10-15 00:35:26'),
(2, 'Surat Undangan Rapat', 'Kepada Yth. Pengurus Masjid, kami mengundang untuk menghadiri rapat...', NULL, NULL, '2024-10-15 00:35:26', '2024-10-15 00:35:26');

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
  `image` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `firstname`, `lastname`, `email`, `email_verified_at`, `password`, `remember_token`, `phone`, `birth`, `gender`, `role`, `image`, `created_at`, `updated_at`) VALUES
(1, 'Gusnanto', 'Rafly', 'admin@gmail.com', NULL, '$2y$12$B8JrCQOFoAWp.e.tmkZf.OWoZplxe3BDdyRj11/IShYOUPugtRVJC', NULL, '081234567890', '1990-01-01', 'Male', 'ADMIN', 'default.jpg', '2024-10-15 00:35:26', '2024-10-15 00:35:26');

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
(1, 'Ahmad Yatim', '2010-03-03', 'Jl. Sudirman No. 1', 'yatim', '081234567892', 'aktif', '2024-10-15 00:35:26', '2024-10-15 00:35:26'),
(2, 'Budi Duafa', '2012-04-04', 'Jl. Sudirman No. 2', 'dhuafa', '081234567893', 'pindah', '2024-10-15 00:35:26', '2024-10-15 00:35:26');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `arus_kas`
--
ALTER TABLE `arus_kas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `arus_kas_penerimaan_kas_id_foreign` (`penerimaan_kas_id`),
  ADD KEY `arus_kas_pengeluaran_kas_id_foreign` (`pengeluaran_kas_id`);

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
  ADD KEY `penerimaan_kas_coa_id_foreign` (`coa_id`);

--
-- Indexes for table `pengeluaran_kas`
--
ALTER TABLE `pengeluaran_kas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `pengeluaran_kas_coa_id_foreign` (`coa_id`);

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
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `berita`
--
ALTER TABLE `berita`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

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
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `info_masjid`
--
ALTER TABLE `info_masjid`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

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
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `laporan_keuangan`
--
ALTER TABLE `laporan_keuangan`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=87;

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
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

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
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `yatim_dhuafa`
--
ALTER TABLE `yatim_dhuafa`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `arus_kas`
--
ALTER TABLE `arus_kas`
  ADD CONSTRAINT `arus_kas_penerimaan_kas_id_foreign` FOREIGN KEY (`penerimaan_kas_id`) REFERENCES `penerimaan_kas` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `arus_kas_pengeluaran_kas_id_foreign` FOREIGN KEY (`pengeluaran_kas_id`) REFERENCES `pengeluaran_kas` (`id`) ON DELETE SET NULL;

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
  ADD CONSTRAINT `penerimaan_kas_coa_id_foreign` FOREIGN KEY (`coa_id`) REFERENCES `coa` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `pengeluaran_kas`
--
ALTER TABLE `pengeluaran_kas`
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
