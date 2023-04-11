/*
  Warnings:

  - Added the required column `imdbId` to the `Movie` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Movie" ADD COLUMN     "downloadedSubs" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "imdbId" TEXT NOT NULL,
ADD COLUMN     "torrentId" INTEGER;
