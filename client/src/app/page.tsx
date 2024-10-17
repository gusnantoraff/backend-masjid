"use client";

import Image from "next/image";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="text-center">
      <h2 className="text-4xl font-bold mb-4">Selamat Datang di Website Kami</h2>
      <p className="text-lg mb-6">Jelajahi fitur menarik yang kami tawarkan.</p>
      <Image
        src="/images/masjid.jpg"
        alt="Masjid"
        width={600}
        height={400}
        className="mx-auto rounded-lg"
      />
      <div className="mt-6">
        <Link 
        className="bg-blue-500 hover:bg-blue-700 text-white text-xl font-semibold py-4 px-8 rounded-lg transition duration-300 ease-in-out"
        href="/login">
          Login
        </Link>
      </div>
    </div>
  );
}
