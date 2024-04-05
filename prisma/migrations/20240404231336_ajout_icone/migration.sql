/*
  Warnings:

  - Added the required column `icone` to the `Variable` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Variable" ADD COLUMN     "icone" TEXT NOT NULL;
