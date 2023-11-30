/*
  Warnings:

  - Added the required column `audioUrl` to the `Word` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Word" ADD COLUMN     "audioUrl" VARCHAR(255) NOT NULL,
ALTER COLUMN "otherAdjs" SET DEFAULT ARRAY[]::VARCHAR(24)[],
ALTER COLUMN "otherAdvs" SET DEFAULT ARRAY[]::VARCHAR(24)[],
ALTER COLUMN "otherNouns" SET DEFAULT ARRAY[]::VARCHAR(24)[],
ALTER COLUMN "otherVerbs" SET DEFAULT ARRAY[]::VARCHAR(24)[];
