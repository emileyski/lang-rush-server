-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'CUSTOMER');

-- CreateEnum
CREATE TYPE "Lang" AS ENUM ('UK', 'DE', 'FR', 'PL');

-- CreateEnum
CREATE TYPE "WordForm" AS ENUM ('NOUN', 'ADJECTIVE', 'VERB', 'ADVERB');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "token" VARCHAR(255),
    "role" "Role" NOT NULL DEFAULT 'CUSTOMER',
    "nativeLang" "Lang" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Folder" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(32) NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Folder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Word" (
    "id" TEXT NOT NULL,
    "word" VARCHAR(24) NOT NULL,
    "translation" VARCHAR(24) NOT NULL,
    "definition" VARCHAR(255) NOT NULL,
    "sentences" VARCHAR(255)[],
    "progress" INTEGER NOT NULL DEFAULT 0,
    "form" "WordForm" NOT NULL,
    "otherNouns" VARCHAR(24)[] DEFAULT ARRAY[]::VARCHAR(24)[],
    "otherAdjs" VARCHAR(24)[] DEFAULT ARRAY[]::VARCHAR(24)[],
    "otherVerbs" VARCHAR(24)[] DEFAULT ARRAY[]::VARCHAR(24)[],
    "otherAdvs" VARCHAR(24)[] DEFAULT ARRAY[]::VARCHAR(24)[],
    "audioUrl" VARCHAR(255) NOT NULL,
    "folderId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Word_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "Folder_userId_idx" ON "Folder"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Folder_name_userId_key" ON "Folder"("name", "userId");

-- CreateIndex
CREATE INDEX "Word_folderId_idx" ON "Word"("folderId");

-- CreateIndex
CREATE UNIQUE INDEX "Word_word_folderId_form_key" ON "Word"("word", "folderId", "form");

-- AddForeignKey
ALTER TABLE "Folder" ADD CONSTRAINT "Folder_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Word" ADD CONSTRAINT "Word_folderId_fkey" FOREIGN KEY ("folderId") REFERENCES "Folder"("id") ON DELETE CASCADE ON UPDATE CASCADE;
