/*
  Warnings:

  - You are about to drop the column `name` on the `category` table. All the data in the column will be lost.
  - Added the required column `image` to the `category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dateDeSortie` to the `movie` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "category" DROP COLUMN "name",
ADD COLUMN     "image" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "movie" ADD COLUMN     "dateDeSortie" TIMESTAMP(3) NOT NULL;
