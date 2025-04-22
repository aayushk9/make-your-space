/*
  Warnings:

  - You are about to drop the `Calendar` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Couple` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Events` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Suprise` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `billTracker` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `bills` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `countdownTimer` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Calendar" DROP CONSTRAINT "Calendar_coupleId_fkey";

-- DropForeignKey
ALTER TABLE "Events" DROP CONSTRAINT "Events_calendarId_fkey";

-- DropForeignKey
ALTER TABLE "Suprise" DROP CONSTRAINT "Suprise_coupleId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_coupleId_fkey";

-- DropForeignKey
ALTER TABLE "billTracker" DROP CONSTRAINT "billTracker_coupleId_fkey";

-- DropForeignKey
ALTER TABLE "bills" DROP CONSTRAINT "bills_billId_fkey";

-- DropForeignKey
ALTER TABLE "countdownTimer" DROP CONSTRAINT "countdownTimer_coupleId_fkey";

-- DropTable
DROP TABLE "Calendar";

-- DropTable
DROP TABLE "Couple";

-- DropTable
DROP TABLE "Events";

-- DropTable
DROP TABLE "Suprise";

-- DropTable
DROP TABLE "User";

-- DropTable
DROP TABLE "billTracker";

-- DropTable
DROP TABLE "bills";

-- DropTable
DROP TABLE "countdownTimer";

-- CreateTable
CREATE TABLE "waitList" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "waitList_pkey" PRIMARY KEY ("id")
);
