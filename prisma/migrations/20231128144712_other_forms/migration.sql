/*
  Warnings:

  - You are about to drop the column `otherForms` on the `Word` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Word" DROP COLUMN "otherForms",
ADD COLUMN     "otherAdjs" VARCHAR(24)[] DEFAULT ARRAY[]::VARCHAR(24)[],
ADD COLUMN     "otherAdvs" VARCHAR(24)[] DEFAULT ARRAY[]::VARCHAR(24)[],
ADD COLUMN     "otherNouns" VARCHAR(24)[] DEFAULT ARRAY[]::VARCHAR(24)[],
ADD COLUMN     "otherVerbs" VARCHAR(24)[] DEFAULT ARRAY[]::VARCHAR(24)[];
