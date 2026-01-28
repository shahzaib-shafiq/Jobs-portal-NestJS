-- AlterTable
ALTER TABLE "public"."AssessmentSubmission" ADD COLUMN     "feedback" TEXT,
ADD COLUMN     "reviewedAt" TIMESTAMP(3),
ADD COLUMN     "score" DOUBLE PRECISION;
