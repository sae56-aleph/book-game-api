/*
  Warnings:

  - Added the required column `nom` to the `Variable` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Variable" ADD COLUMN     "nom" TEXT NOT NULL;
