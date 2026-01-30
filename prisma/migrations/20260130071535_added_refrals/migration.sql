-- CreateTable
CREATE TABLE "public"."Refral" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Refral_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Referral" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "code" TEXT NOT NULL,
    "referrerId" UUID NOT NULL,
    "jobId" UUID NOT NULL,
    "refereeId" UUID,
    "isUsed" BOOLEAN NOT NULL DEFAULT false,
    "usedAt" TIMESTAMP(3),
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Referral_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Referral_code_key" ON "public"."Referral"("code");

-- CreateIndex
CREATE INDEX "Referral_code_idx" ON "public"."Referral"("code");

-- CreateIndex
CREATE INDEX "Referral_referrerId_idx" ON "public"."Referral"("referrerId");

-- CreateIndex
CREATE INDEX "Referral_jobId_idx" ON "public"."Referral"("jobId");

-- CreateIndex
CREATE INDEX "Referral_refereeId_idx" ON "public"."Referral"("refereeId");

-- AddForeignKey
ALTER TABLE "public"."Referral" ADD CONSTRAINT "Referral_referrerId_fkey" FOREIGN KEY ("referrerId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Referral" ADD CONSTRAINT "Referral_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "public"."Job"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Referral" ADD CONSTRAINT "Referral_refereeId_fkey" FOREIGN KEY ("refereeId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
