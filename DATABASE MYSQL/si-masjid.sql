-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 08, 2024 at 11:30 AM
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
-- Table structure for table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `cache`
--

INSERT INTO `cache` (`key`, `value`, `expiration`) VALUES
('1b6453892473a467d07372d45eb05abc2031647a', 'i:1;', 1728337070),
('1b6453892473a467d07372d45eb05abc2031647a:timer', 'i:1728337070;', 1728337070);

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
(4, '2024_10_07_173427_create_sessions_table', 1),
(5, '2024_10_07_180754_create_personal_access_tokens_table', 1),
(6, '2024_10_07_191643_create_users_table', 1),
(7, '2024_10_07_192956_create_cache_table', 2),
(9, '2024_10_07_201235_create_password_reset_tokens_table', 3),
(11, '2024_10_07_204404_add_remember_token_to_users_table', 4),
(12, '2024_10_07_213441_add_email_verified_at_to_users_table', 5);

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `password_reset_tokens`
--

INSERT INTO `password_reset_tokens` (`email`, `token`, `created_at`) VALUES
('gusnantorafly@gmail.com', '$2y$12$qx8HxJ3SYXthIZjWwpStkev8MkqCWTNpVceEH7K84yp1CnWOEJ9Ka', '2024-10-07 13:34:12');

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
(1, 'App\\Models\\User', 2, 'API Token', 'e37d27b4cb59c637075fa50da98fc1e24d7287500339b047315f1be5de927e89', '[\"*\"]', NULL, NULL, '2024-10-07 14:11:09', '2024-10-07 14:11:09'),
(2, 'App\\Models\\User', 2, 'API Token', 'feff76bdf844c8f26d6907d7a0392cd5206b145024aaf6398e89c53c083323f3', '[\"*\"]', NULL, NULL, '2024-10-07 14:15:01', '2024-10-07 14:15:01'),
(3, 'App\\Models\\User', 2, 'API Token', '9ba97c2632ec829aa326d5661c6e7aa48b8cbe3abc987edda485d6a8cea92d21', '[\"*\"]', NULL, NULL, '2024-10-07 14:17:59', '2024-10-07 14:17:59'),
(4, 'App\\Models\\User', 2, 'API Token', '0c8d8cee74f7b96daaa2d4745052089a1c045d883612037683bd22bce724c393', '[\"*\"]', NULL, NULL, '2024-10-07 14:20:49', '2024-10-07 14:20:49'),
(5, 'App\\Models\\User', 4, 'API Token', '868e4696bcd1ef6e1237b79b4c7ba05a8ecef34660f9549472492070736cd58e', '[\"*\"]', '2024-10-07 14:27:30', NULL, '2024-10-07 14:24:18', '2024-10-07 14:27:30'),
(6, 'App\\Models\\User', 4, 'API Token', 'e9ed118a911751d1117516d722ae2f147832a2956483b8e0be31bb88d3c5147f', '[\"*\"]', '2024-10-07 14:46:45', NULL, '2024-10-07 14:32:20', '2024-10-07 14:46:45'),
(7, 'App\\Models\\User', 4, 'API Token', 'eb4a61ca6b6d5117f6e21cb63b8a6ca318d8334b909936f5b90f19365f9e8b13', '[\"*\"]', NULL, NULL, '2024-10-07 14:37:05', '2024-10-07 14:37:05'),
(8, 'App\\Models\\User', 5, 'API Token', '2bd425f001de611f83fdbaa01d6237ad81717dd89bd40bb4e399268f6c319c61', '[\"*\"]', '2024-10-07 14:47:37', NULL, '2024-10-07 14:46:59', '2024-10-07 14:47:37'),
(9, 'App\\Models\\User', 4, 'API Token', 'ceba4c4f1a5312813361dc1224f4f38b78f1d89a3a0e1ee523f3773dd9dd7e1d', '[\"*\"]', NULL, NULL, '2024-10-07 16:14:09', '2024-10-07 16:14:09'),
(10, 'App\\Models\\User', 4, 'API Token', 'd86c1b2fa438be1c247dae9fb98f5a81ac23a01c1f2a12502d408b9fb01dd126', '[\"*\"]', NULL, NULL, '2024-10-07 16:15:45', '2024-10-07 16:15:45'),
(11, 'App\\Models\\User', 4, 'API Token', 'ef8509759706199ab77922decb25f8240b47d941e21306e5e8837670b0ce184f', '[\"*\"]', NULL, NULL, '2024-10-07 16:17:33', '2024-10-07 16:17:33'),
(12, 'App\\Models\\User', 4, 'API Token', '16d83bd53364a3e2a1efc690c5506606a198f5dc1a6202b93eb1380e70ac7057', '[\"*\"]', NULL, NULL, '2024-10-07 16:18:10', '2024-10-07 16:18:10');

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

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('JAmV97YbXdvB437eFrtDcs0zObfuuTXOtVEBEYPq', NULL, '127.0.0.1', 'PostmanRuntime/7.39.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiTnpwdlRrYXIwOXNPVjhmc2JSSlZUdDBtcGpuSGM3b3Ewc292RlYwayI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NDE6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9zYW5jdHVtL2NzcmYtY29va2llIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1728329437);

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
  `phone` varchar(255) NOT NULL,
  `birth` date NOT NULL,
  `gender` enum('Male','Female') NOT NULL,
  `role` enum('Super Admin','Admin','Jemaah') NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `firstname`, `lastname`, `email`, `email_verified_at`, `password`, `remember_token`, `phone`, `birth`, `gender`, `role`, `created_at`, `updated_at`) VALUES
(4, 'Gusnanto', 'Rafly', 'gusnantoid@gmail.com', '2024-10-07 14:35:24', '$2y$12$D7Mo7hQ.B49KGHGNPNKYWuJCZ53NjcD8u7StfzOVeOI1b9gUe05Sm', NULL, '8888889888', '2024-10-01', 'Male', 'Super Admin', '2024-10-07 14:24:07', '2024-10-07 14:35:24'),
(5, 'Admin', 'Satu', 'admin@gmail.com', NULL, '$2y$12$D5QaU5Cyj4K2IytHROxaouxxognu73iq4g2/8u8B3ARd8Zs4yy0im', NULL, '8888889888', '2024-10-01', 'Male', 'Admin', '2024-10-07 14:38:59', '2024-10-07 14:38:59'),
(6, 'Jemaah', 'Satu', 'jemaah@gmail.com', NULL, '$2y$12$nwaSzRvKQwurlYzKE5I54Oqbr9gVOB7jI2snK1/wMuZ7n2YGVwX.q', NULL, '8888889888', '2024-10-01', 'Male', 'Jemaah', '2024-10-07 16:24:32', '2024-10-07 16:24:32');

--
-- Indexes for dumped tables
--

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
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD KEY `password_reset_tokens_email_index` (`email`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
