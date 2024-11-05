import { NextResponse } from 'next/server';
import axios from 'axios';

const getTodayDate = (): { bulan: string; tahun: string } => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  return { bulan: month, tahun: year.toString() };
};

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const provinsi = searchParams.get('provinsi') || 'd.i. yogyakarta';
    const kota = searchParams.get('kota') || 'kab. bantul';
    const { bulan, tahun } = {
      bulan: searchParams.get('bulan') || getTodayDate().bulan,
      tahun: searchParams.get('tahun') || getTodayDate().tahun,
    };

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
