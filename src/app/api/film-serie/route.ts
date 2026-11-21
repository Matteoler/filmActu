import { NextResponse } from 'next/server';
import { getTopRated } from '@/lib/film-serie';

export async function GET() {
    try {
        const data = await getTopRated();
        return NextResponse.json(data, { status: 200 });
    } catch {
        return NextResponse.json({ error: 'Failed to fetch top rated movies and series' }, { status: 500 });
    }
}