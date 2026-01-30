/*
  Warnings:

  - A unique constraint covering the columns `[applicationId,round]` on the table `Interview` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE INDEX "Interview_applicationId_idx" ON "public"."Interview"("applicationId");

-- CreateIndex
CREATE INDEX "Interview_scheduledAt_idx" ON "public"."Interview"("scheduledAt");

-- CreateIndex
CREATE UNIQUE INDEX "Interview_applicationId_round_key" ON "public"."Interview"("applicationId", "round");
