/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Livre` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `nom` to the `Livre` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `Livre` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Livre" ADD COLUMN     "nom" TEXT NOT NULL,
ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Livre_slug_key" ON "Livre"("slug");
