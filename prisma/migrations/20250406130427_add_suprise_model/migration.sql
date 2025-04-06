-- CreateTable
CREATE TABLE "Suprise" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "coupleId" TEXT NOT NULL,

    CONSTRAINT "Suprise_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Suprise" ADD CONSTRAINT "Suprise_coupleId_fkey" FOREIGN KEY ("coupleId") REFERENCES "Couple"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
