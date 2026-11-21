import { NextResponse } from 'next/server';
import { PrismaClient } from '@/generated/prisma';

const prisma = new PrismaClient();

export async function GET() {
    try {
        const movie = await prisma.movie.findMany({
        });

        if (!movie) {
            return NextResponse.json({ error: 'Film introuvable.' }, { status: 404 });
        }
        return NextResponse.json(movie, { status: 200 });
    } catch (error) {
        console.error('Erreur lors de la récupération des films :', error);
        return NextResponse.json({ error: 'Erreur serveur.' }, { status: 500 });
    }
}