-- CreateEnum
CREATE TYPE "ReportState" AS ENUM ('GOOD', 'BAD');

-- CreateTable
CREATE TABLE "Reports" (
    "id" SERIAL NOT NULL,
    "state" "ReportState" NOT NULL DEFAULT 'GOOD',

    CONSTRAINT "Reports_pkey" PRIMARY KEY ("id")
);
