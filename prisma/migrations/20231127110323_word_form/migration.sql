/*
  Warnings:

  - You are about to drop the column `type` on the `Word` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[word,folderId,form]` on the table `Word` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `form` to the `Word` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "WordForm" AS ENUM ('NOUN', 'ADJECTIVE', 'VERB', 'ADVERB');

-- DropIndex
DROP INDEX "Word_word_folderId_type_key";

-- AlterTable
ALTER TABLE "Word" DROP COLUMN "type",
ADD COLUMN     "form" "WordForm" NOT NULL;

-- DropEnum
DROP TYPE "WordType";

-- CreateIndex
CREATE UNIQUE INDEX "Word_word_folderId_form_key" ON "Word"("word", "folderId", "form");
