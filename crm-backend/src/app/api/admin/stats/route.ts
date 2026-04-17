import { NextResponse } from 'next/server';

export async function GET() {
  // En un caso real, aquí consultarías a tu base de datos (Supabase/Postgres)
  const ADMIN_STATS = {
    totalClients: '1,240',
    activeShops: '85',
    bookingsToday: '450',
    totalRevenue: '$12.5k',
    pendingApprovals: 5
  };

  return NextResponse.json(ADMIN_STATS);
}
