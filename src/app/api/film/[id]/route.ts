import { NextResponse } from 'next/server';
import { PrismaClient } from '@/generated/prisma';

const prisma = new PrismaClient();

export async function GET(req: Request, context: { params: { id: string } }) {
    const { id } = await context.params;

    try {
        console.log('ID reçu :', id); // Log pour vérifier l'ID reçu
        const movie = await prisma.movie.findUnique({
            where: { id: Number(id) },
        });

        if (!movie) {
            console.log('Film introuvable pour l\'ID :', id); // Log si le film n'est pas trouvé
            return NextResponse.json({ error: 'Film introuvable.' }, { status: 404 });
        }

        return NextResponse.json(movie, { status: 200 });
    } catch (error) {
        console.error('Erreur lors de la récupération du film :', error);
        return NextResponse.json({ error: 'Erreur serveur.' }, { status: 500 });
    }
}