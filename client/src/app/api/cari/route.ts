import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const provinsi = searchParams.get('provinsi') || 'd.i. yogyakarta';
    const kota = searchParams.get('kota') || 'kab. bantul';
    const bulan = searchParams.get('bulan') || '10';
    const tahun = searchParams.get('tahun') || '2024';

    const response = await axios.get(
      `https://jadwal-sholat-api-iota.vercel.app/api/cari?provinsi=${encodeURIComponent(provinsi)}&kota=${encodeURIComponent(kota)}&bulan=${bulan}&tahun=${tahun}`
    );
    const data = response.data;

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching jadwal sholat:", error);
    return NextResponse.json(
      { error: "Error fetching jadwal sholat" },
      { status: 500 }
    );
  }
}
