import path from 'node:path';
import dotenv from 'dotenv';
import type { PrismaConfig } from 'prisma';

// Charger le fichier .env
dotenv.config();

export default {
    earlyAccess: true,
    schema: path.join('prisma', 'schema'),
} satisfies PrismaConfig;