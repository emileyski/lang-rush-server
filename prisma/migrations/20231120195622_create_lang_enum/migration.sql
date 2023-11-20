/*
  Warnings:

  - Added the required column `nativeLang` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Lang" AS ENUM ('UK', 'DE', 'FR', 'PL');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "nativeLang" "Lang" NOT NULL;
