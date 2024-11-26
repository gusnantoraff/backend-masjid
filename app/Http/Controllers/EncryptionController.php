<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class EncryptionController extends Controller
{
    // Fungsi untuk mengenkripsi link API
    public function encryptLink(Request $request)
    {
        $api_link = "http://localhost:8000/api/berita";  // Link yang ingin dienkripsi
        $key = 'your-32-byte-long-encryption-key';  // Kunci enkripsi (pastikan panjangnya 32 karakter)
        
        $encrypted_link = $this->encrypt($api_link, $key);

        return response()->json([
            'encrypted_link' => $encrypted_link
        ]);
    }

    // Fungsi untuk mendekripsi link API
    public function decryptLink(Request $request)
    {
        $encrypted_link = $request->input('encrypted_link');  // Ambil link yang sudah dienkripsi dari request
        $key = 'your-32-byte-long-encryption-key';  // Kunci enkripsi (harus sama dengan kunci saat enkripsi)

        $decrypted_link = $this->decrypt($encrypted_link, $key);

        return response()->json([
            'decrypted_link' => $decrypted_link
        ]);
    }

    // Fungsi untuk enkripsi
    private function encrypt($plaintext, $key)
    {
        $method = 'AES-256-CBC';  // Metode enkripsi
        $iv = openssl_random_pseudo_bytes(openssl_cipher_iv_length($method));  // IV yang acak
        $encrypted = openssl_encrypt($plaintext, $method, $key, 0, $iv);  // Enkripsi
        $encrypted = base64_encode($iv . $encrypted);  // Gabungkan IV dengan hasil enkripsi dan encode base64
        return $encrypted;
    }

    // Fungsi untuk dekripsi
    private function decrypt($encrypted, $key)
    {
        $method = 'AES-256-CBC';  // Metode enkripsi yang digunakan
        $data = base64_decode($encrypted);  // Decode dari base64
        $iv_length = openssl_cipher_iv_length($method);
        $iv = substr($data, 0, $iv_length);  // Ambil IV
        $ciphertext = substr($data, $iv_length);  // Ambil hasil enkripsi

        // Dekripsi teks
        $decrypted = openssl_decrypt($ciphertext, $method, $key, 0, $iv);
        return $decrypted;
    }
}
