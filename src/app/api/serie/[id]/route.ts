import { NextResponse } from 'next/server';
import { PrismaClient } from '@/generated/prisma';

const prisma = new PrismaClient();

export async function GET(req: Request, context: { params: { id: string } }) {
    const { id } = await context.params; // Attendez `params` avant de l'utiliser

    try {
        console.log('ID reçu :', id); // Log pour vérifier l'ID reçu
        const serie = await prisma.series.findUnique({
            where: { id: Number(id) },
        });

        if (!serie) {
            console.log('Série introuvable pour l\'ID :', id); // Log si la série n'est pas trouvée
            return NextResponse.json({ error: 'Série introuvable.' }, { status: 404 });
        }

        return NextResponse.json(serie, { status: 200 });
    } catch (error) {
        console.error('Erreur lors de la récupération de la série :', error);
        return NextResponse.json({ error: 'Erreur serveur.' }, { status: 500 });
    }
}