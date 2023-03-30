-- CreateTable
CREATE TABLE "MessageSent" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "state" "ReportState" NOT NULL DEFAULT 'GOOD',

    CONSTRAINT "MessageSent_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MessageSent" ADD CONSTRAINT "MessageSent_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
