-- CreateEnum
CREATE TYPE "public"."InterviewType" AS ENUM ('HR', 'TECHNICAL', 'MANAGERIAL', 'CULTURE', 'FINAL');

-- CreateEnum
CREATE TYPE "public"."InterviewStatus" AS ENUM ('SCHEDULED', 'COMPLETED', 'CANCELED');

-- CreateEnum
CREATE TYPE "public"."InterviewRecommendation" AS ENUM ('STRONG_YES', 'YES', 'NO', 'STRONG_NO');

-- CreateTable
CREATE TABLE "public"."Interview" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "applicationId" UUID NOT NULL,
    "type" "public"."InterviewType" NOT NULL,
    "round" INTEGER NOT NULL,
    "status" "public"."InterviewStatus" NOT NULL,
    "scheduledAt" TIMESTAMP(3) NOT NULL,
    "durationMin" INTEGER,
    "meetingLink" TEXT,
    "location" TEXT,
    "createdById" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Interview_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."InterviewInterviewer" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "interviewId" UUID NOT NULL,
    "interviewerId" UUID NOT NULL,

    CONSTRAINT "InterviewInterviewer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."InterviewFeedback" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "interviewId" UUID NOT NULL,
    "interviewerId" UUID NOT NULL,
    "score" DOUBLE PRECISION,
    "recommendation" "public"."InterviewRecommendation" NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "InterviewFeedback_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "InterviewInterviewer_interviewId_interviewerId_key" ON "public"."InterviewInterviewer"("interviewId", "interviewerId");

-- CreateIndex
CREATE UNIQUE INDEX "InterviewFeedback_interviewId_interviewerId_key" ON "public"."InterviewFeedback"("interviewId", "interviewerId");

-- AddForeignKey
ALTER TABLE "public"."Interview" ADD CONSTRAINT "Interview_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "public"."Application"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Interview" ADD CONSTRAINT "Interview_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."InterviewInterviewer" ADD CONSTRAINT "InterviewInterviewer_interviewId_fkey" FOREIGN KEY ("interviewId") REFERENCES "public"."Interview"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."InterviewInterviewer" ADD CONSTRAINT "InterviewInterviewer_interviewerId_fkey" FOREIGN KEY ("interviewerId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."InterviewFeedback" ADD CONSTRAINT "InterviewFeedback_interviewId_fkey" FOREIGN KEY ("interviewId") REFERENCES "public"."Interview"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."InterviewFeedback" ADD CONSTRAINT "InterviewFeedback_interviewerId_fkey" FOREIGN KEY ("interviewerId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
