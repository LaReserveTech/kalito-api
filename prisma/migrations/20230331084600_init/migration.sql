/*
  Warnings:

  - You are about to drop the column `reportId` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the `Report` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_reportId_fkey";

-- AlterTable
ALTER TABLE "Message" DROP COLUMN "reportId",
DROP COLUMN "state";

-- DropTable
DROP TABLE "Report";

-- DropEnum
DROP TYPE "ReportState";

-- CreateTable
CREATE TABLE "Commune" (
    "id" SERIAL NOT NULL,
    "inseecommune" TEXT NOT NULL,
    "nomcommune" TEXT NOT NULL,
    "quartier" TEXT NOT NULL,
    "reseauId" INTEGER,
    "nomreseau" TEXT NOT NULL,
    "debutalim" TEXT NOT NULL,

    CONSTRAINT "Commune_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reseau" (
    "id" SERIAL NOT NULL,
    "cdreseau" TEXT NOT NULL,

    CONSTRAINT "Reseau_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Prelevement" (
    "id" SERIAL NOT NULL,
    "reseauId" INTEGER,
    "cddept" TEXT NOT NULL,
    "inseecommuneprinc" TEXT NOT NULL,
    "nomcommuneprinc" TEXT NOT NULL,
    "cdreseauamont" TEXT NOT NULL,
    "nomreseauamont" TEXT NOT NULL,
    "pourcentdebit" TEXT NOT NULL,
    "referenceprel" TEXT NOT NULL,
    "dateprel" TIMESTAMP(3) NOT NULL,
    "conclusionprel" TEXT NOT NULL,
    "ugelib" TEXT NOT NULL,
    "distrlib" TEXT NOT NULL,
    "moalib" TEXT NOT NULL,
    "plvconformitebacterio" TEXT NOT NULL,
    "plvconformitechimique" TEXT NOT NULL,
    "plvconformitereferencebact" TEXT NOT NULL,
    "plvconformitereferencechim" TEXT NOT NULL,

    CONSTRAINT "Prelevement_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Commune" ADD CONSTRAINT "Commune_reseauId_fkey" FOREIGN KEY ("reseauId") REFERENCES "Reseau"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Prelevement" ADD CONSTRAINT "Prelevement_reseauId_fkey" FOREIGN KEY ("reseauId") REFERENCES "Reseau"("id") ON DELETE SET NULL ON UPDATE CASCADE;
