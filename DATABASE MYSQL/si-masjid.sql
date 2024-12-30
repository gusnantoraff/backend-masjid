-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 30, 2024 at 06:48 AM
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
  `sisa_kas_total` decimal(15,2) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `deleted_status` tinyint(1) NOT NULL DEFAULT 0,
  `restored_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `arus_kas`
--

INSERT INTO `arus_kas` (`id`, `pemasukan_total`, `pengeluaran_total`, `sisa_kas_total`, `created_at`, `updated_at`, `deleted_at`, `deleted_status`, `restored_at`) VALUES
(1, 9447690.00, 25523123.00, -16075433.00, '2024-12-04 04:00:33', '2024-12-16 03:19:34', NULL, 0, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `berita`
--

CREATE TABLE `berita` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `judul` varchar(255) NOT NULL,
  `konten` text NOT NULL,
  `tanggal_publikasi` datetime NOT NULL,
  `kategori` enum('berita','sport','teknologi','pendidikan','lainnya') NOT NULL,
  `status` enum('draft','published','archived') NOT NULL,
  `foto` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `deleted_status` tinyint(1) NOT NULL DEFAULT 0,
  `restored_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `berita`
--

INSERT INTO `berita` (`id`, `judul`, `konten`, `tanggal_publikasi`, `kategori`, `status`, `foto`, `created_at`, `updated_at`, `deleted_at`, `deleted_status`, `restored_at`) VALUES
(1, 'Berita Pertama', 'Ini adalah konten berita pertama.', '2024-10-15 00:00:00', 'berita', 'published', NULL, '2024-12-04 04:00:33', '2024-12-04 04:00:33', NULL, 0, NULL),
(2, 'Berita Kedua', 'Ini adalah konten berita kedua.', '2024-10-16 00:00:00', 'sport', 'draft', NULL, '2024-12-04 04:00:33', '2024-12-04 04:00:33', NULL, 0, NULL),
(3, 'Berita Ketiga', 'Ini adalah konten berita ketiga.', '2024-10-17 00:00:00', 'teknologi', 'archived', NULL, '2024-12-04 04:00:33', '2024-12-04 04:00:33', NULL, 0, NULL);

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
  `tipe` varchar(255) DEFAULT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'antri',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `deleted_status` tinyint(1) NOT NULL DEFAULT 0,
  `restored_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `coa`
--

INSERT INTO `coa` (`id`, `kode_akun`, `nama_akun`, `tipe`, `status`, `created_at`, `updated_at`, `deleted_at`, `deleted_status`, `restored_at`) VALUES
(1, '1001', 'Kas Masjid', 'Aset', 'antri', '2024-12-04 04:00:33', '2024-12-04 04:00:33', NULL, 0, NULL),
(2, '2001', 'Operasional', 'Kewajiban', 'antri', '2024-12-04 04:00:33', '2024-12-04 04:00:33', NULL, 0, NULL);

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
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `deleted_status` tinyint(1) NOT NULL DEFAULT 0,
  `restored_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `fasilitas`
--

INSERT INTO `fasilitas` (`id`, `info_masjid_id`, `nama_fasilitas`, `deskripsi`, `created_at`, `updated_at`, `deleted_at`, `deleted_status`, `restored_at`) VALUES
(1, 1, 'Parkir Luas', 'Area parkir dapat menampung hingga 100 kendaraan.', '2024-12-04 04:00:33', '2024-12-04 04:00:33', NULL, 0, NULL),
(2, 1, 'Ruang Ibadah Ber-AC', 'Ruang ibadah dilengkapi dengan pendingin ruangan untuk kenyamanan jamaah.', '2024-12-04 04:00:33', '2024-12-04 04:00:33', NULL, 0, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `general_ledger`
--

CREATE TABLE `general_ledger` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `coa_id` bigint(20) UNSIGNED NOT NULL,
  `tanggal` date NOT NULL,
  `debit_total` decimal(15,2) NOT NULL,
  `kredit_total` decimal(15,2) NOT NULL,
  `status` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `deleted_status` tinyint(1) NOT NULL DEFAULT 0,
  `restored_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

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
  `deleted_at` timestamp NULL DEFAULT NULL,
  `deleted_status` tinyint(1) NOT NULL DEFAULT 0,
  `restored_at` timestamp NULL DEFAULT NULL,
  `imageable_id` bigint(20) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `images`
--

INSERT INTO `images` (`id`, `keterangan`, `kategori`, `image`, `created_at`, `updated_at`, `deleted_at`, `deleted_status`, `restored_at`, `imageable_id`) VALUES
(1, 'Foto Masjid Al-Falah', 'masjid', NULL, '2024-12-04 04:00:33', '2024-12-04 04:00:33', NULL, 0, NULL, NULL),
(2, 'Foto Kegiatan Pengajian', 'kegiatan', NULL, '2024-12-04 04:00:33', '2024-12-04 04:00:33', NULL, 0, NULL, NULL);

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
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `deleted_status` tinyint(1) NOT NULL DEFAULT 0,
  `restored_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `info_masjid`
--

INSERT INTO `info_masjid` (`id`, `nama_masjid`, `alamat`, `kontak`, `deskripsi`, `ad_art`, `created_at`, `updated_at`, `deleted_at`, `deleted_status`, `restored_at`) VALUES
(1, 'Masjid Al-Falah', 'Jl. Merdeka No. 1, Jakarta', '081234567890', 'Masjid Al-Falah adalah masjid besar yang terletak di pusat kota.', 'AD/ART lengkap', '2024-12-04 04:00:33', '2024-12-04 04:00:33', NULL, 0, NULL);

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
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `jadwal_sholat`
--

INSERT INTO `jadwal_sholat` (`id`, `tanggal`, `subuh`, `dzuhur`, `ashar`, `maghrib`, `isya`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, '2024-10-10', '04:30:00', '12:00:00', '15:30:00', '18:00:00', '19:30:00', '2024-12-04 04:00:33', '2024-12-04 04:00:33', NULL),
(2, '2024-10-11', '04:31:00', '12:01:00', '15:31:00', '18:01:00', '19:31:00', '2024-12-04 04:00:33', '2024-12-04 04:00:33', NULL);

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
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `deleted_status` tinyint(1) NOT NULL DEFAULT 0,
  `restored_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `jamaah`
--

INSERT INTO `jamaah` (`id`, `nama`, `birth`, `gender`, `email`, `kontak`, `alamat`, `keterangan`, `created_at`, `updated_at`, `deleted_at`, `deleted_status`, `restored_at`) VALUES
(1, 'John Doe', '1980-01-01', 'pria', 'johndoe@example.com', '081234567890', 'Jl. Merdeka No. 1', 'aktif', '2024-12-04 04:00:33', '2024-12-04 04:00:33', NULL, 0, NULL),
(2, 'Jane Doe', '1985-02-02', 'wanita', 'janedoe@example.com', '081234567891', 'Jl. Merdeka No. 2', 'pindah', '2024-12-04 04:00:33', '2024-12-04 04:00:33', NULL, 0, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `kegiatan`
--

CREATE TABLE `kegiatan` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nama_kegiatan` varchar(255) NOT NULL,
  `tanggal` datetime NOT NULL,
  `lokasi` varchar(255) NOT NULL,
  `kategori` enum('khatib','muazin','umum','hari-besar') NOT NULL,
  `keterangan` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `deleted_status` tinyint(1) NOT NULL DEFAULT 0,
  `restored_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `kegiatan`
--

INSERT INTO `kegiatan` (`id`, `nama_kegiatan`, `tanggal`, `lokasi`, `kategori`, `keterangan`, `created_at`, `updated_at`, `deleted_at`, `deleted_status`, `restored_at`) VALUES
(1, 'Pengajian Rutin', '2024-10-20 00:00:00', 'Masjid Nabawi', 'umum', 'Pengajian rutin bulanan setiap hari Minggu ketiga.', '2024-12-04 04:00:33', '2024-12-04 04:00:33', NULL, 0, NULL),
(2, 'Shalat Jumat', '2024-10-25 00:00:00', 'Masjid Nabawi', 'khatib', 'Shalat Jumat dengan khatib Ustadz Ahmad.', '2024-12-04 04:00:33', '2024-12-04 04:00:33', NULL, 0, NULL);

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
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `deleted_status` tinyint(1) NOT NULL DEFAULT 0,
  `restored_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `laporan_keuangan`
--

INSERT INTO `laporan_keuangan` (`id`, `periode`, `total_pemasukan`, `total_pengeluaran`, `created_at`, `updated_at`, `deleted_at`, `deleted_status`, `restored_at`) VALUES
(1, '2024-11-15', 2811856.00, 2323387.00, '2024-12-04 04:00:33', '2024-12-04 04:00:33', NULL, 0, NULL),
(2, '2024-11-12', 2167433.00, 1982532.00, '2024-12-04 04:00:33', '2024-12-04 04:00:33', NULL, 0, NULL),
(3, '2024-11-22', 4589462.00, 1927358.00, '2024-12-04 04:00:33', '2024-12-04 04:00:33', NULL, 0, NULL),
(4, '2024-11-02', 2856648.00, 1733155.00, '2024-12-04 04:00:33', '2024-12-04 04:00:33', NULL, 0, NULL),
(5, '2024-11-12', 2984685.00, 646853.00, '2024-12-04 04:00:33', '2024-12-04 04:00:33', NULL, 0, NULL),
(6, '2024-10-06', 4536774.00, 2633868.00, '2024-12-04 04:00:33', '2024-12-04 04:00:33', NULL, 0, NULL),
(7, '2024-10-05', 4602934.00, 1282028.00, '2024-12-04 04:00:33', '2024-12-04 04:00:33', NULL, 0, NULL),
(8, '2024-10-07', 4742884.00, 1296997.00, '2024-12-04 04:00:33', '2024-12-04 04:00:33', NULL, 0, NULL),
(9, '2024-10-05', 4551942.00, 2424321.00, '2024-12-04 04:00:33', '2024-12-04 04:00:33', NULL, 0, NULL),
(10, '2024-10-29', 2324641.00, 1586715.00, '2024-12-04 04:00:33', '2024-12-04 04:00:33', NULL, 0, NULL),
(11, '2023-11-12', 1209612.00, 1513948.00, '2024-12-04 04:00:33', '2024-12-04 04:00:33', NULL, 0, NULL),
(12, '2023-11-22', 2611245.00, 2660616.00, '2024-12-04 04:00:33', '2024-12-04 04:00:33', NULL, 0, NULL),
(13, '2023-11-15', 4978944.00, 1866098.00, '2024-12-04 04:00:33', '2024-12-04 04:00:33', NULL, 0, NULL),
(14, '2023-11-06', 4463219.00, 2874732.00, '2024-12-04 04:00:33', '2024-12-04 04:00:33', NULL, 0, NULL),
(15, '2023-11-22', 4314636.00, 2763032.00, '2024-12-04 04:00:33', '2024-12-04 04:00:33', NULL, 0, NULL);

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
(1, '2024_09_29_111004_create_coa_table', 1),
(2, '2024_10_07_050425_create_info_masjid_table', 1),
(3, '2024_10_07_173427_create_sessions_table', 1),
(4, '2024_10_07_180754_create_personal_access_tokens_table', 1),
(5, '2024_10_07_191643_create_users_table', 1),
(6, '2024_10_07_192956_create_cache_table', 1),
(7, '2024_10_07_201235_create_password_reset_tokens_table', 1),
(8, '2024_10_07_204404_add_remember_token_to_users_table', 1),
(9, '2024_10_07_213441_add_email_verified_at_to_users_table', 1),
(10, '2024_10_10_045714_create_mubaligh_table', 1),
(11, '2024_10_10_045742_create_bank_table', 1),
(12, '2024_10_10_050425_create_fasilitas_table', 1),
(13, '2024_10_10_050427_create_strukur_organisasi_table', 1),
(14, '2024_10_10_050430_create_arus_kas_table', 1),
(15, '2024_10_10_050432_create_posisi_keuangan_table', 1),
(16, '2024_10_10_050433_create_penerimaan_kas_table', 1),
(17, '2024_10_10_050433_create_pengeluaran_kas_table', 1),
(18, '2024_10_10_050433_create_pesan_website_table', 1),
(19, '2024_10_10_050434_create_laporan_keuangan_table', 1),
(20, '2024_10_10_050435_create_yatim_dhuafa_table', 1),
(21, '2024_10_10_050436_create_images_table', 1),
(22, '2024_10_10_050436_create_jamaah_table', 1),
(23, '2024_10_10_050437_create_template_surat_table', 1),
(24, '2024_10_10_050438_create_berita_table', 1),
(25, '2024_10_10_050439_create_jadwal_sholat_table', 1),
(26, '2024_10_10_050439_create_kegiatan_table', 1),
(27, '2024_10_11_115305_add_imageable_id_to_images_table', 1),
(28, '2024_11_20_111036_create_general_ledger_table', 1),
(29, '2024_11_26_081013_add_deleted_status_and_restored_at_to_multiple_tables', 1);

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
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `deleted_status` tinyint(1) NOT NULL DEFAULT 0,
  `restored_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `mubaligh`
--

INSERT INTO `mubaligh` (`id`, `info_masjid_id`, `nama`, `kontak`, `alamat`, `created_at`, `updated_at`, `deleted_at`, `deleted_status`, `restored_at`) VALUES
(1, 1, 'Ustadz Abdul Somad', '081234567892', 'Jl. Sudirman No. 5, Jakarta', '2024-12-04 04:00:33', '2024-12-04 04:00:33', NULL, 0, NULL),
(2, 1, 'Ustadz Adi Hidayat', '081234567893', 'Jl. Diponegoro No. 7, Bandung', '2024-12-04 04:00:33', '2024-12-04 04:00:33', NULL, 0, NULL);

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
  `status` varchar(255) NOT NULL DEFAULT 'antri',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `deleted_status` tinyint(1) NOT NULL DEFAULT 0,
  `restored_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `penerimaan_kas`
--

INSERT INTO `penerimaan_kas` (`id`, `coa_id`, `arus_kas_id`, `jenis`, `tanggal`, `jumlah`, `deskripsi`, `image`, `status`, `created_at`, `updated_at`, `deleted_at`, `deleted_status`, `restored_at`) VALUES
(1, 1, 1, 'Donasi Tunai', '2024-10-10', 1000000.00, 'Sumbangan dari Hamba Allah', NULL, 'antri', '2024-12-04 04:00:33', '2024-12-04 04:00:33', NULL, 0, NULL),
(2, 1, 1, 'Donasi Uang Digital', '2024-10-11', 5000000.00, 'Sumbangan Jumat', NULL, 'antri', '2024-12-04 04:00:33', '2024-12-04 04:00:33', NULL, 0, NULL),
(3, 1, 1, 'Donasi Tunai', '2024-12-15', 1234567.00, 'anjai', NULL, 'antri', '2024-12-16 03:02:32', '2024-12-16 03:02:32', NULL, 0, NULL),
(4, 1, 1, 'Donasi Tunai', '2024-12-14', 213123.00, 'asdas', NULL, 'antri', '2024-12-16 03:03:28', '2024-12-16 03:03:28', NULL, 0, NULL),
(5, 1, 1, 'Donasi Tunai', '2024-12-15', 2000000.00, 'asdasd', NULL, 'antri', '2024-12-16 03:03:50', '2024-12-16 03:03:50', NULL, 0, NULL);

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
  `status` varchar(255) NOT NULL DEFAULT 'antri',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `deleted_status` tinyint(1) NOT NULL DEFAULT 0,
  `restored_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `pengeluaran_kas`
--

INSERT INTO `pengeluaran_kas` (`id`, `coa_id`, `arus_kas_id`, `jenis`, `tanggal`, `jumlah`, `deskripsi`, `image`, `status`, `created_at`, `updated_at`, `deleted_at`, `deleted_status`, `restored_at`) VALUES
(1, 2, 1, 'Pengeluaran Operasional', '2024-10-12', 2000000.00, 'Biaya Pembelian Speaker', NULL, 'antri', '2024-12-04 04:00:33', '2024-12-04 04:00:33', NULL, 0, NULL),
(2, 2, 1, 'Pengeluaran Sosial', '2024-10-13', 400000.00, 'Untuk Jumat Berkah', NULL, 'antri', '2024-12-04 04:00:33', '2024-12-04 04:00:33', NULL, 0, NULL),
(3, 2, 1, 'Pengeluaran Operasional', '2024-12-16', 23123123.00, 'sdasd', NULL, 'antri', '2024-12-16 03:03:09', '2024-12-16 03:03:09', NULL, 0, NULL);

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
(1, 'App\\Models\\User', 2, 'API Token', '7821abf1ca7fabbe97025b12f237b0797c60bb984e1888ef40cc1264d737a6c0', '[\"*\"]', '2024-12-04 05:09:13', NULL, '2024-12-04 04:01:00', '2024-12-04 05:09:13'),
(2, 'App\\Models\\User', 2, 'API Token', '770adc1371d5016f7c49b62801700ed0c4dc8575a6d8585d9689ac19a20da972', '[\"*\"]', '2024-12-16 01:44:39', NULL, '2024-12-16 01:11:25', '2024-12-16 01:44:39'),
(3, 'App\\Models\\User', 2, 'API Token', 'e72c66df9b973e99c9061b665e08c7a4a7ce9f59f061f41b3d11c0d65b24a308', '[\"*\"]', '2024-12-16 03:19:37', NULL, '2024-12-16 01:54:24', '2024-12-16 03:19:37'),
(4, 'App\\Models\\User', 2, 'API Token', '3b0ab91bb42aebdf5860c190ac8c3b5be126fa4aa423bc458875515ea741c20f', '[\"*\"]', '2024-12-16 03:06:39', NULL, '2024-12-16 02:58:25', '2024-12-16 03:06:39');

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
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `pesan_website`
--

INSERT INTO `pesan_website` (`id`, `nama_pengirim`, `email`, `pesan`, `tanggal`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Ali Ahmad', 'ali@example.com', 'Terima kasih atas informasi mengenai kegiatan masjid.', '2024-10-15', '2024-12-04 04:00:33', '2024-12-04 04:00:33', NULL),
(2, 'Siti Rahma', 'siti@example.com', 'Saya ingin berpartisipasi dalam kegiatan sosial.', '2024-10-16', '2024-12-04 04:00:33', '2024-12-04 04:00:33', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `posisi_keuangan`
--

CREATE TABLE `posisi_keuangan` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `aktiva` decimal(15,2) NOT NULL DEFAULT 0.00,
  `pasiva` decimal(15,2) NOT NULL DEFAULT 0.00,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `deleted_status` tinyint(1) NOT NULL DEFAULT 0,
  `restored_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `posisi_keuangan`
--

INSERT INTO `posisi_keuangan` (`id`, `aktiva`, `pasiva`, `created_at`, `updated_at`, `deleted_at`, `deleted_status`, `restored_at`) VALUES
(1, 800000.00, 800000.00, '2024-12-04 04:00:33', '2024-12-04 04:00:33', NULL, 0, NULL);

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
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `deleted_status` tinyint(1) NOT NULL DEFAULT 0,
  `restored_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `rekening_bank`
--

INSERT INTO `rekening_bank` (`id`, `info_masjid_id`, `nama_bank`, `nomor_rekening`, `atas_nama`, `image_transfer`, `created_at`, `updated_at`, `deleted_at`, `deleted_status`, `restored_at`) VALUES
(1, 1, 'Bank Mandiri', '1234567890', 'Masjid Al-Falah', NULL, '2024-12-04 04:00:33', '2024-12-04 04:00:33', NULL, 0, NULL),
(2, 1, 'Bank BRI', '0987654321', 'Masjid Al-Ikhlas', NULL, '2024-12-04 04:00:33', '2024-12-04 04:00:33', NULL, 0, NULL);

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
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `deleted_status` tinyint(1) NOT NULL DEFAULT 0,
  `restored_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `struktur_organisasi`
--

INSERT INTO `struktur_organisasi` (`id`, `info_masjid_id`, `jabatan`, `nama`, `kontak`, `created_at`, `updated_at`, `deleted_at`, `deleted_status`, `restored_at`) VALUES
(1, 1, 'Ketua', 'H. Ahmad', '081234567890', '2024-12-04 04:00:33', '2024-12-04 04:00:33', NULL, 0, NULL),
(2, 1, 'Sekretaris', 'H. Budi', '081234567891', '2024-12-04 04:00:33', '2024-12-04 04:00:33', NULL, 0, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `template_surat`
--

CREATE TABLE `template_surat` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `judul_surat` varchar(255) DEFAULT NULL,
  `isi_surat` text NOT NULL,
  `tanggal` date NOT NULL,
  `nomor` varchar(255) DEFAULT NULL,
  `hal` varchar(255) DEFAULT NULL,
  `lampiran` varchar(255) DEFAULT NULL,
  `penerima` varchar(255) DEFAULT NULL,
  `lokasi` varchar(255) DEFAULT NULL,
  `nama_ttd` text DEFAULT NULL,
  `stempel` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `deleted_status` tinyint(1) NOT NULL DEFAULT 0,
  `restored_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `template_surat`
--

INSERT INTO `template_surat` (`id`, `judul_surat`, `isi_surat`, `tanggal`, `nomor`, `hal`, `lampiran`, `penerima`, `lokasi`, `nama_ttd`, `stempel`, `created_at`, `updated_at`, `deleted_at`, `deleted_status`, `restored_at`) VALUES
(1, 'Surat Permohonan Izin', 'Yth. Bapak/Ibu di Tempat, dengan ini kami memohon izin untuk...', '2024-10-10', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-12-04 04:00:33', '2024-12-04 04:00:33', NULL, 0, NULL),
(2, 'Surat Undangan Rapat', 'Kepada Yth. Pengurus Masjid, kami mengundang untuk menghadiri rapat...', '2024-10-10', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-12-04 04:00:33', '2024-12-04 04:00:33', NULL, 0, NULL),
(3, NULL, 'Assalamualaikum wr wb,\n\nSehubungan dengan kebutuhan perusahaan yang terus berkembang, kami ingin mengajukan permohonan untuk meningkatkan kualitas fasilitas dan layanan yang kami tawarkan. Dalam rangka tersebut, kami memohon agar pihak yang berwenang dapat memberikan dukungan dan izin untuk melakukan pembaruan dan renovasi pada bagian-bagian yang dianggap perlu. Kami sangat berharap dapat memperoleh izin untuk melaksanakan perbaikan tersebut demi kelancaran operasional perusahaan. Kami akan memastikan bahwa segala proses renovasi dilakukan sesuai dengan peraturan yang berlaku dan tidak mengganggu aktivitas operasional sehari-hari.\n\nAtas perhatian dan kerja samanya, kami ucapkan terima kasih. Wassalamualaikum wr wb.', '2024-12-04', '20/F2/2024', 'Halal bi halal', '-', 'Fivi Aulia', 'Masjid', 'Bp. Sumanto', NULL, '2024-12-04 04:04:02', '2024-12-04 04:04:31', '2024-12-04 04:04:31', 1, NULL),
(4, NULL, 'Assalamualaikum wr wb,\n\nSehubungan dengan kebutuhan perusahaan yang terus berkembang, kami ingin mengajukan permohonan untuk meningkatkan kualitas fasilitas dan layanan yang kami tawarkan. Dalam rangka tersebut, kami memohon agar pihak yang berwenang dapat memberikan dukungan dan izin untuk melakukan pembaruan dan renovasi pada bagian-bagian yang dianggap perlu. Kami sangat berharap dapat memperoleh izin untuk melaksanakan perbaikan tersebut demi kelancaran operasional perusahaan. Kami akan memastikan bahwa segala proses renovasi dilakukan sesuai dengan peraturan yang berlaku dan tidak mengganggu aktivitas operasional sehari-hari.\n\nAtas perhatian dan kerja samanya, kami ucapkan terima kasih. Wassalamualaikum wr wb.', '2024-12-04', '20/F2/2024', 'Halal bi halal', '-', 'Fivi Aulia', 'Masjid', 'Bp. Sumanto', NULL, '2024-12-04 04:04:10', '2024-12-04 04:04:33', '2024-12-04 04:04:33', 1, NULL),
(5, NULL, 'Assalamualaikum wr wb,\n\nSehubungan dengan kebutuhan perusahaan yang terus berkembang, kami ingin mengajukan permohonan untuk meningkatkan kualitas fasilitas dan layanan yang kami tawarkan. Dalam rangka tersebut, kami memohon agar pihak yang berwenang dapat memberikan dukungan dan izin untuk melakukan pembaruan dan renovasi pada bagian-bagian yang dianggap perlu. Kami sangat berharap dapat memperoleh izin untuk melaksanakan perbaikan tersebut demi kelancaran operasional perusahaan. Kami akan memastikan bahwa segala proses renovasi dilakukan sesuai dengan peraturan yang berlaku dan tidak mengganggu aktivitas operasional sehari-hari.\n\nAtas perhatian dan kerja samanya, kami ucapkan terima kasih. Wassalamualaikum wr wb.', '2024-12-04', '20/F2/2024', 'Halal bi halal', '-', 'Fivi Aulia', 'Masjid', 'Bp. Sumanto', NULL, '2024-12-04 04:04:19', '2024-12-04 04:04:38', '2024-12-04 04:04:38', 1, NULL),
(6, NULL, 'Assalamualaikum wr wb,\n\nSehubungan dengan kebutuhan perusahaan yang terus berkembang, kami ingin mengajukan permohonan untuk meningkatkan kualitas fasilitas dan layanan yang kami tawarkan. Dalam rangka tersebut, kami memohon agar pihak yang berwenang dapat memberikan dukungan dan izin untuk melakukan pembaruan dan renovasi pada bagian-bagian yang dianggap perlu. Kami sangat berharap dapat memperoleh izin untuk melaksanakan perbaikan tersebut demi kelancaran operasional perusahaan. Kami akan memastikan bahwa segala proses renovasi dilakukan sesuai dengan peraturan yang berlaku dan tidak mengganggu aktivitas operasional sehari-hari.\n\nAtas perhatian dan kerja samanya, kami ucapkan terima kasih. Wassalamualaikum wr wb.', '2024-12-04', '20/F2/2024', 'Halal bi halal', '-', 'Fivi Aulia', 'Masjid', 'Bp. Sumanto', NULL, '2024-12-04 04:04:19', '2024-12-04 04:04:42', '2024-12-04 04:04:42', 1, NULL),
(7, NULL, 'Assalamualaikum wr wb,\n\nSehubungan dengan kebutuhan perusahaan yang terus berkembang, kami ingin mengajukan permohonan untuk meningkatkan kualitas fasilitas dan layanan yang kami tawarkan. Dalam rangka tersebut, kami memohon agar pihak yang berwenang dapat memberikan dukungan dan izin untuk melakukan pembaruan dan renovasi pada bagian-bagian yang dianggap perlu. Kami sangat berharap dapat memperoleh izin untuk melaksanakan perbaikan tersebut demi kelancaran operasional perusahaan. Kami akan memastikan bahwa segala proses renovasi dilakukan sesuai dengan peraturan yang berlaku dan tidak mengganggu aktivitas operasional sehari-hari.\n\nAtas perhatian dan kerja samanya, kami ucapkan terima kasih. Wassalamualaikum wr wb.', '2024-12-04', '20/F2/2024', 'Halal bi halal', '-', 'Fivi Aulia', 'Masjid', 'Bp. Sumanto', NULL, '2024-12-04 04:04:19', '2024-12-04 04:04:40', '2024-12-04 04:04:40', 1, NULL),
(8, NULL, 'Assalamualaikum wr wb,\n\nSehubungan dengan kebutuhan perusahaan yang terus berkembang, kami ingin mengajukan permohonan untuk meningkatkan kualitas fasilitas dan layanan yang kami tawarkan. Dalam rangka tersebut, kami memohon agar pihak yang berwenang dapat memberikan dukungan dan izin untuk melakukan pembaruan dan renovasi pada bagian-bagian yang dianggap perlu. Kami sangat berharap dapat memperoleh izin untuk melaksanakan perbaikan tersebut demi kelancaran operasional perusahaan. Kami akan memastikan bahwa segala proses renovasi dilakukan sesuai dengan peraturan yang berlaku dan tidak mengganggu aktivitas operasional sehari-hari.\n\nAtas perhatian dan kerja samanya, kami ucapkan terima kasih. Wassalamualaikum wr wb.', '2024-12-04', '2141412', 'asda', 'asd', 'Fivi Aulia', 'Masjid', 'Bp. Gusnanto', NULL, '2024-12-04 04:05:04', '2024-12-04 04:13:17', '2024-12-04 04:13:17', 1, NULL),
(9, 'Surat Undangan Halal bi halal', 'Assalamualaikum wr wb,\n\nSehubungan dengan kebutuhan perusahaan yang terus berkembang, kami ingin mengajukan permohonan untuk meningkatkan kualitas fasilitas dan layanan yang kami tawarkan. Dalam rangka tersebut, kami memohon agar pihak yang berwenang dapat memberikan dukungan dan izin untuk melakukan pembaruan dan renovasi pada bagian-bagian yang dianggap perlu. Kami sangat berharap dapat memperoleh izin untuk melaksanakan perbaikan tersebut demi kelancaran operasional perusahaan. Kami akan memastikan bahwa segala proses renovasi dilakukan sesuai dengan peraturan yang berlaku dan tidak mengganggu aktivitas operasional sehari-hari.\n\nAtas perhatian dan kerja samanya, kami ucapkan terima kasih. Wassalamualaikum wr wb.', '2024-12-04', '213124', 'aasf', 'asdaasf', 'Fivi Aulia', 'Masjid', 'Bp. Gusnanto', NULL, '2024-12-04 04:14:47', '2024-12-04 04:15:26', '2024-12-04 04:15:26', 1, NULL),
(10, 'asda', 'Assalamualaikum wr wb,\n\nSehubungan dengan kebutuhan perusahaan yang terus berkembang, kami ingin mengajukan permohonan untuk meningkatkan kualitas fasilitas dan layanan yang kami tawarkan. Dalam rangka tersebut, kami memohon agar pihak yang berwenang dapat memberikan dukungan dan izin untuk melakukan pembaruan dan renovasi pada bagian-bagian yang dianggap perlu. Kami sangat berharap dapat memperoleh izin untuk melaksanakan perbaikan tersebut demi kelancaran operasional perusahaan. Kami akan memastikan bahwa segala proses renovasi dilakukan sesuai dengan peraturan yang berlaku dan tidak mengganggu aktivitas operasional sehari-hari.\n\nAtas perhatian dan kerja samanya, kami ucapkan terima kasih. Wassalamualaikum wr wb.', '2024-12-04', 'asdasd', 'asd', 'asdasd', 'asd', 'asdas', 'asdasfasf', NULL, '2024-12-04 04:16:24', '2024-12-04 04:21:12', '2024-12-04 04:21:12', 1, NULL),
(11, 'Surat Undangan Halal bi halal', 'Assalamualaikum wr wb,\n\nSehubungan dengan kebutuhan perusahaan yang terus berkembang, kami ingin mengajukan permohonan untuk meningkatkan kualitas fasilitas dan layanan yang kami tawarkan. Dalam rangka tersebut, kami memohon agar pihak yang berwenang dapat memberikan dukungan dan izin untuk melakukan pembaruan dan renovasi pada bagian-bagian yang dianggap perlu. Kami sangat berharap dapat memperoleh izin untuk melaksanakan perbaikan tersebut demi kelancaran operasional perusahaan. Kami akan memastikan bahwa segala proses renovasi dilakukan sesuai dengan peraturan yang berlaku dan tidak mengganggu aktivitas operasional sehari-hari.\n\nAtas perhatian dan kerja samanya, kami ucapkan terima kasih. Wassalamualaikum wr wb.', '2024-12-04', '123123', 'Halal bi halal', '-', 'Fivi Aulia', 'Masjid', 'Bp. Gusnanto', NULL, '2024-12-04 04:24:01', '2024-12-04 04:24:39', '2024-12-04 04:24:39', 1, NULL),
(12, 'Surat Undangan Halal bi Halal', 'Assalamualaikum wr wb,\n\nSehubungan dengan kebutuhan perusahaan yang terus berkembang, kami ingin mengajukan permohonan untuk meningkatkan kualitas fasilitas dan layanan yang kami tawarkan. Dalam rangka tersebut, kami memohon agar pihak yang berwenang dapat memberikan dukungan dan izin untuk melakukan pembaruan dan renovasi pada bagian-bagian yang dianggap perlu. Kami sangat berharap dapat memperoleh izin untuk melaksanakan perbaikan tersebut demi kelancaran operasional perusahaan. Kami akan memastikan bahwa segala proses renovasi dilakukan sesuai dengan peraturan yang berlaku dan tidak mengganggu aktivitas operasional sehari-hari.\n\nAtas perhatian dan kerja samanya, kami ucapkan terima kasih. Wassalamualaikum wr wb.', '2024-12-04', '12/24G/2024', 'Halal bi Halal', '-', 'Fivi Aulia', 'Masjid Tercode', 'Bp. Gusnanto', NULL, '2024-12-04 04:25:18', '2024-12-04 04:58:05', '2024-12-04 04:58:05', 1, NULL),
(13, 'asdasd', 'asdasdasd', '2024-12-04', 'asdasdas', 'dasdasdasda', 'dasdas', 'asd', 'asdasd', 'asdasd', NULL, '2024-12-04 04:30:21', '2024-12-04 04:50:27', '2024-12-04 04:50:27', 1, NULL),
(14, 'asdasdas', 'dasdasdasd', '2024-12-16', 'dasdasd', 'dasdas', 'asdas', 'dasd', 'asdasdas', 'asdasdasd', NULL, '2024-12-04 04:53:32', '2024-12-04 04:57:55', '2024-12-04 04:57:55', 1, NULL),
(15, 'sadad', 'jkbkj', '2024-12-04', 'asdfbj', 'bkjbsjbjk', 'kqbkj', 'b', 'kjb', 'sfassdf', NULL, '2024-12-04 04:54:14', '2024-12-04 04:55:53', '2024-12-04 04:55:53', 1, NULL),
(16, 'asdasdklnaslkdnaslkn', 'nlkn', '2024-12-04', 'knalskfnaslknflaskfnlk', 'nlk', 'nlk', 'nlk', 'nlknlk', 'asfsdf', NULL, '2024-12-04 04:56:04', '2024-12-04 04:57:52', '2024-12-04 04:57:52', 1, NULL),
(17, 'asdasdklnaslkdnaslkn', 'nlkn', '2024-12-04', 'knalskfnaslknflaskfnlk', 'nlk', 'nlk', 'nlk', 'nlknlk', 'asfsdf', NULL, '2024-12-04 04:56:07', '2024-12-04 04:57:48', '2024-12-04 04:57:48', 1, NULL),
(18, 'asdasdklnaslkdnaslkn', 'nlkn', '2024-12-04', 'knalskfnaslknflaskfnlk', 'nlk', 'nlk', 'nlk', 'nlknlk', 'asfsdf', NULL, '2024-12-04 04:56:12', '2024-12-04 04:57:50', '2024-12-04 04:57:50', 1, NULL),
(19, 'sadas', 'asfasf', '2024-12-04', 'asfasf', 'fasf', 'asfas', 'asfasf', 'asfasf', 'asfasf', NULL, '2024-12-04 04:57:15', '2024-12-04 04:57:45', '2024-12-04 04:57:45', 1, NULL),
(20, 'Perjanjian', 'assalamualaikum wr wb', '2024-12-04', '1234567', 'perjanjian', '1', 'gusnanto', 'Rumifest', 'pppp', NULL, '2024-12-04 05:09:13', '2024-12-04 05:09:13', NULL, 0, NULL),
(21, 'Contoh surat', '<p><strong>Assalamualaikum Warahmatullah Wabarakatuh. </strong></p><p><br></p><p style=\"text-align: justify;\">Dengan penuh rasa hormat dan takzim saya ingin menyampaikan sesuatu kepada para pengurus&nbsp;Masjid&nbsp;Raya&nbsp;Baiturrahman, Banda Aceh. Barangkali dengan surat ini ada manfaat bagi kita dan masyarakat Aceh pada umumnya. Surat ini tidak bermaksud menggurui atau mengatur-ngatur dalam hal pengurusan masjid. Tetapi ini semata-mata untuk kebaikan bagi kita semua. Begini teungku, pada Kamis (1 Maret 2018), saya shalat Zuhur di&nbsp;Masjid&nbsp;Raya&nbsp;Baiturrahman, masjid terindah di Asia Tenggara dan kebanggaan rakyat Aceh. Kebetulan kali ini saya duduk persis di depan layar running text masjid. Saya sempat terkejut ketika membaca kata-kata yang keluar dalam running text itu beberapa tulisan yang menurut saya tak sesuai dengan ejaan&nbsp;bahasa&nbsp;Indonesia yang benar, yaitu “Sabda Rosululloh SAW” dan juga kata “Sholat”. <br><br><strong>Wassalamualaikum&nbsp;Warahmatullah Wabarakatuh.</strong><br></p>', '2024-12-16', '123123', 'anjai', '-', 'Kamu', 'tempat', 'raff', NULL, '2024-12-16 01:44:40', '2024-12-16 01:44:40', NULL, 0, NULL),
(22, 'sadasd', '<p><strong>Assalamualaikum&nbsp;</strong></p><p><strong><br></strong></p><p style=\"text-align: justify;\">(bahasa Arab:&nbsp;ٱلسَّلَامُ عَلَيْكُمْ&nbsp;ʾas-salāmu ʿalaykum) merupakan&nbsp;salam&nbsp;dalam&nbsp;Bahasa Arab, dan digunakan oleh kultur&nbsp;Muslim&nbsp;yang berarti secara bahasa \"Peace be upon you\"[1]&nbsp;atau&nbsp;Damai&nbsp;untuk mu. berasal dari&nbsp;salām&nbsp;(سَلَام, atau damai). Frasa lengkapnya adalah&nbsp;ʾas-salāmu ʿalaykum wa-raḥmatu -llāhi wa-barakātuhū&nbsp;(ٱلسَّلَامُ عَلَيْكُمْ وَرَحْمَةُ ٱللَّٰهِ وَبَرَكَاتُهُ). Salam ini termasuk dalam&nbsp;sunnah&nbsp;Nabi Islam&nbsp;Muhammad. Untuk yang mengucapkan salam, hukumnya adalah Sunnah.[2]&nbsp;Sedangkan bagi yang mendengarnya, wajib untuk menjawabnya dengan&nbsp;</p><p><br></p><p><strong>Wa\'alaikumussalam</strong>.</p>', '2024-12-16', '213123', 'asdas', 'saasd', 'dasd', 'asdasd', 'raff', NULL, '2024-12-16 02:22:00', '2024-12-16 02:22:00', NULL, 0, NULL);

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
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `deleted_status` tinyint(1) NOT NULL DEFAULT 0,
  `restored_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `firstname`, `lastname`, `email`, `email_verified_at`, `password`, `remember_token`, `phone`, `birth`, `gender`, `role`, `avatar`, `created_at`, `updated_at`, `deleted_at`, `deleted_status`, `restored_at`) VALUES
(1, 'Gusnanto', 'Rafly', 'admin@gmail.com', NULL, '$2y$12$XsJ/SdtHeU6x3zXzSaeGCOrtI6lOvPsyIeggTHHm79vWDEUry.ePe', NULL, '081234567890', '1990-01-01', 'Male', 'ADMIN', NULL, '2024-12-04 04:00:32', '2024-12-04 04:00:32', NULL, 0, NULL),
(2, 'Gusnanto', 'Rafly', 'gusnantoid@gmail.com', NULL, '$2y$12$BxzsrUa/bltrrMQtcveJt.N5VSHceiLqPIO0VMSgtoLueyaOMtrM.', NULL, '081234567890', '1990-01-01', 'Male', 'ADMIN', NULL, '2024-12-04 04:00:33', '2024-12-04 04:00:33', NULL, 0, NULL),
(3, 'Fivi', 'Gendut', 'aulia.fivi910@gmail.com', NULL, '$2y$12$J8KNMu5NR0yZTsFyojk6KuHXkNoaqgZ0FGblGludTz9wvcJ1bLjrW', NULL, '081234567890', '1990-01-01', 'Female', 'ADMIN', NULL, '2024-12-04 04:00:33', '2024-12-04 04:00:33', NULL, 0, NULL),
(4, 'Haidar', 'Taqi', 'afamerteam@gmail.com', NULL, '$2y$12$EUcHy0h5Q7TtQH.oP0gWm.QprVqK3q.UiH7C51Cb9ujAswN5NsqK.', NULL, '081234567890', '2001-09-11', 'Male', 'ADMIN', NULL, '2024-12-04 04:00:33', '2024-12-04 04:00:33', NULL, 0, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `yatim_dhuafa`
--

CREATE TABLE `yatim_dhuafa` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nama` varchar(255) NOT NULL,
  `gender` enum('pria','wanita') NOT NULL,
  `birth` date DEFAULT NULL,
  `alamat` text DEFAULT NULL,
  `keterangan` enum('yatim','piatu','dhuafa','yatim piatu') NOT NULL,
  `kontak` varchar(255) NOT NULL,
  `status` enum('aktif','pindah','wafat') NOT NULL DEFAULT 'aktif',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `deleted_status` tinyint(1) NOT NULL DEFAULT 0,
  `restored_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `yatim_dhuafa`
--

INSERT INTO `yatim_dhuafa` (`id`, `nama`, `gender`, `birth`, `alamat`, `keterangan`, `kontak`, `status`, `created_at`, `updated_at`, `deleted_at`, `deleted_status`, `restored_at`) VALUES
(1, 'Ahmad Yatim', 'pria', '2010-03-03', 'Jl. Sudirman No. 1', 'yatim', '081234567892', 'aktif', '2024-12-04 04:00:33', '2024-12-04 04:00:33', NULL, 0, NULL),
(2, 'Budi Duafa', 'pria', '2012-04-04', 'Jl. Sudirman No. 2', 'dhuafa', '081234567893', 'pindah', '2024-12-04 04:00:33', '2024-12-04 04:00:33', NULL, 0, NULL);

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
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `images`
--
ALTER TABLE `images`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

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
-- AUTO_INCREMENT for table `kegiatan`
--
ALTER TABLE `kegiatan`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `laporan_keuangan`
--
ALTER TABLE `laporan_keuangan`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `mubaligh`
--
ALTER TABLE `mubaligh`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `penerimaan_kas`
--
ALTER TABLE `penerimaan_kas`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `pengeluaran_kas`
--
ALTER TABLE `pengeluaran_kas`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

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
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

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
