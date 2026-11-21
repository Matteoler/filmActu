/*
  Warnings:

  - You are about to drop the `category_by_movie` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `category_by_series` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "category_by_movie" DROP CONSTRAINT "category_by_movie_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "category_by_movie" DROP CONSTRAINT "category_by_movie_movieId_fkey";

-- DropForeignKey
ALTER TABLE "category_by_series" DROP CONSTRAINT "category_by_series_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "category_by_series" DROP CONSTRAINT "category_by_series_seriesId_fkey";

-- DropTable
DROP TABLE "category_by_movie";

-- DropTable
DROP TABLE "category_by_series";

-- CreateTable
CREATE TABLE "category_by_content" (
    "id" SERIAL NOT NULL,
    "movieId" INTEGER,
    "seriesId" INTEGER,
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "category_by_content_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "category_by_content" ADD CONSTRAINT "category_by_content_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "category_by_content" ADD CONSTRAINT "category_by_content_seriesId_fkey" FOREIGN KEY ("seriesId") REFERENCES "series"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "category_by_content" ADD CONSTRAINT "category_by_content_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE CASCADE;
