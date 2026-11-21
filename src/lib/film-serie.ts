import { PrismaClient } from '@/generated/prisma';

const prisma = new PrismaClient();

export async function getTopRated() {
    const topRatedMovies = await prisma.movie.findMany({
        orderBy: {
            rating: 'desc',
        },
        take: 10,
    });

    const topRatedSeries = await prisma.series.findMany({
        orderBy: {
            rating: 'desc',
        },
        take: 10,
    });

    return { topRatedMovies, topRatedSeries };
}