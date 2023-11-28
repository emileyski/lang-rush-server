/*
  Warnings:

  - Made the column `otherForms` on table `Word` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Word" ALTER COLUMN "otherForms" SET NOT NULL,
ALTER COLUMN "otherForms" SET DEFAULT '{}';
