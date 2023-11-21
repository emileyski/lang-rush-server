-- CreateTable
CREATE TABLE "Word" (
    "id" TEXT NOT NULL,
    "word" VARCHAR(24) NOT NULL,
    "translation" VARCHAR(24) NOT NULL,
    "definition" VARCHAR(255) NOT NULL,
    "sentences" VARCHAR(255)[],
    "progress" INTEGER NOT NULL DEFAULT 0,
    "folderId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Word_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Word_folderId_idx" ON "Word"("folderId");

-- CreateIndex
CREATE UNIQUE INDEX "Word_word_folderId_key" ON "Word"("word", "folderId");

-- AddForeignKey
ALTER TABLE "Word" ADD CONSTRAINT "Word_folderId_fkey" FOREIGN KEY ("folderId") REFERENCES "Folder"("id") ON DELETE CASCADE ON UPDATE CASCADE;
