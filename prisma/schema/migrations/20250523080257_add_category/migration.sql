/*
  Warnings:

  - You are about to drop the column `dateDeSortie` on the `movie` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "movie" DROP COLUMN "dateDeSortie";

-- CreateTable
CREATE TABLE "category_by_movie" (
    "id" SERIAL NOT NULL,
    "movieId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "category_by_movie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "category_by_series" (
    "id" SERIAL NOT NULL,
    "seriesId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "category_by_series_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "category_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "category_by_movie" ADD CONSTRAINT "category_by_movie_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "category_by_movie" ADD CONSTRAINT "category_by_movie_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "category_by_series" ADD CONSTRAINT "category_by_series_seriesId_fkey" FOREIGN KEY ("seriesId") REFERENCES "series"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "category_by_series" ADD CONSTRAINT "category_by_series_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE CASCADE;
