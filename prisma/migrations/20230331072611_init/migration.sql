/*
  Warnings:

  - You are about to drop the `Reports` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `reportId` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_userId_fkey";

-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "reportId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Reports";

-- CreateTable
CREATE TABLE "Report" (
    "id" SERIAL NOT NULL,
    "state" "ReportState" NOT NULL DEFAULT 'GOOD',

    CONSTRAINT "Report_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "Report"("id") ON DELETE SET NULL ON UPDATE CASCADE;
