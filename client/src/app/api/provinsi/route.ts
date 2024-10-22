import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request: Request) {
  try {
    const response = await axios.get(
      `https://jadwal-sholat-api-iota.vercel.app/api/provinsi`
    );
    const data = response.data;

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching provinces:", error);
    return NextResponse.json(
      { error: "Error fetching provinces" },
      { status: 500 }
    );
  }
}
