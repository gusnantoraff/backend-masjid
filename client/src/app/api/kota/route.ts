import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const provinsi = searchParams.get('provinsi') || 'd.i. yogyakarta';

    const response = await axios.get(
      `https://jadwal-sholat-api-iota.vercel.app/api/kota?provinsi=${encodeURIComponent(provinsi)}`
    );
    const data = response.data;

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching cities:", error);
    return NextResponse.json(
      { error: "Error fetching cities" },
      { status: 500 }
    );
  }
}
