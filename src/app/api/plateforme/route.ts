import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const data = await prisma.platform.findMany()
        return NextResponse.json(data, { status: 200 });
    } catch {
        return NextResponse.json({ error: 'Failed to fetch platform' }, { status: 500 });
    }
}