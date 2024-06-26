-- AlterTable
ALTER TABLE "Document" ADD COLUMN     "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE INDEX "by_user" ON "Document"("userId");

-- CreateIndex
CREATE INDEX "by_user_parent" ON "Document"("userId", "parentDocument");
