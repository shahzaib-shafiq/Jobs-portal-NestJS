/*
  Warnings:

  - You are about to drop the column `adress` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "adress",
ADD COLUMN     "address" VARCHAR(255),
ADD COLUMN     "emailVerifiedAt" TIMESTAMP(3),
ADD COLUMN     "lastLoginAt" TIMESTAMP(3),
ADD COLUMN     "passwordResetAt" TIMESTAMP(3),
ADD COLUMN     "passwordResetToken" TEXT,
ALTER COLUMN "email" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "phone" SET DATA TYPE VARCHAR(20);

-- CreateIndex
CREATE INDEX "User_email_idx" ON "public"."User"("email");

-- CreateIndex
CREATE INDEX "User_role_idx" ON "public"."User"("role");

-- CreateIndex
CREATE INDEX "User_isDeleted_idx" ON "public"."User"("isDeleted");
