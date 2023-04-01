/*
  Warnings:

  - You are about to drop the column `isSent` on the `Prelevement` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "State" AS ENUM ('good', 'bad');

-- AlterTable
ALTER TABLE "Prelevement" DROP COLUMN "isSent";

-- CreateTable
CREATE TABLE "Report" (
    "id" SERIAL NOT NULL,
    "prelevementId" INTEGER NOT NULL,
    "communeId" INTEGER NOT NULL,
    "state" "State" NOT NULL DEFAULT 'good',
    "isSent" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Report_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_prelevementId_fkey" FOREIGN KEY ("prelevementId") REFERENCES "Prelevement"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_communeId_fkey" FOREIGN KEY ("communeId") REFERENCES "Commune"("id") ON DELETE CASCADE ON UPDATE CASCADE;
