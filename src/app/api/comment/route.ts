import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
    const { content, rating, movieId, seriesId, userId } = await req.json();

    if (!content || !rating || (!movieId && !seriesId) || !userId) {
        return NextResponse.json({ error: 'Tous les champs sont requis.' }, { status: 400 });
    }

    try {
        const existingComment = await prisma.comment.findFirst({
            where: {
                userId,
                movieId: movieId ? Number(movieId) : undefined,
                seriesId: seriesId ? Number(seriesId) : undefined,
            },
        });

        if (existingComment) {
            return NextResponse.json({ error: 'Vous avez déjà ajouté un commentaire pour ce film ou cette série.' }, { status: 409 });
        }

        const comment = await prisma.comment.create({
            data: {
                content,
                rating,
                movieId: movieId ? Number(movieId) : null,
                seriesId: seriesId ? Number(seriesId) : null,
                userId,
            },
        });

        if (movieId) {
            const avgRating = await prisma.comment.aggregate({
                where: { movieId: Number(movieId) },
                _avg: { rating: true },
            });

            await prisma.movie.update({
                where: { id: Number(movieId) },
                data: { rating: avgRating._avg.rating || 0 },
            });
        }

        if (seriesId) {
            const avgRating = await prisma.comment.aggregate({
                where: { seriesId: Number(seriesId) },
                _avg: { rating: true },
            });

            await prisma.series.update({
                where: { id: Number(seriesId) },
                data: { rating: avgRating._avg.rating || 0 },
            });
        }

        return NextResponse.json(comment, { status: 201 });
    } catch (error) {
        console.error('Erreur lors de l\'ajout du commentaire :', error);
        return NextResponse.json({ error: 'Erreur serveur.' }, { status: 500 });
    }
}

export async function GET(req: Request) {
    const url = new URL(req.url);
    const movieId = url.searchParams.get('movieId');
    const seriesId = url.searchParams.get('seriesId');

    if (!movieId && !seriesId) {
        return NextResponse.json({ error: 'Vous devez spécifier movieId ou seriesId' }, { status: 400 });
    }

    try {
        const comments = await prisma.comment.findMany({
            where: {
                ...(movieId ? { movieId: Number(movieId) } : {}),
                ...(seriesId ? { seriesId: Number(seriesId) } : {})
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        image: true
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        // Formater les commentaires pour correspondre à l'interface Comment
        const formattedComments = comments.map(comment => ({
            id: comment.id,
            content: comment.content,
            rating: comment.rating,
            createdAt: comment.createdAt.toISOString(),
            userId: comment.userId,
            userName: comment.user.name || 'Utilisateur',
            userImage: comment.user.image
        }));

        return NextResponse.json(formattedComments);
    } catch (error) {
        console.error('Erreur lors de la récupération des commentaires :', error);
        return NextResponse.json({ error: 'Erreur serveur.' }, { status: 500 });
    }
}