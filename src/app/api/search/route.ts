import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query");

    if (!query) {
        return NextResponse.json({ error: "Invalid query" }, { status: 400 });
    }

    try {
        const results = await prisma.$queryRaw`
            SELECT id, title, 'film' AS type, "posterUrl" FROM "movie" WHERE title ILIKE ${`%${query}%`}
            UNION
            SELECT id, title, 'serie' AS type, "posterUrl" FROM "series" WHERE title ILIKE ${`%${query}%`}
                LIMIT 10
        `;

        return NextResponse.json(results);
    } catch (error) {
        console.error("Erreur lors de la recherche :", error);
        return NextResponse.json({ error: "Erreur interne du serveur" }, { status: 500 });
    }
}