-- AlterTable
ALTER TABLE "Word" ALTER COLUMN "otherAdjs" SET DEFAULT ARRAY[]::VARCHAR(24)[],
ALTER COLUMN "otherAdvs" SET DEFAULT ARRAY[]::VARCHAR(24)[],
ALTER COLUMN "otherNouns" SET DEFAULT ARRAY[]::VARCHAR(24)[],
ALTER COLUMN "otherVerbs" SET DEFAULT ARRAY[]::VARCHAR(24)[];
