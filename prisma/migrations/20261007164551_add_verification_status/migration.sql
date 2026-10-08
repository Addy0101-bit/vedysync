-- CreateEnum
CREATE TYPE "VerificationStatus" AS ENUM ('unverified', 'pending', 'verified', 'rejected');

-- AlterEnum
ALTER TYPE "Role" ADD VALUE 'tester';

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "verificationStatus" "VerificationStatus" NOT NULL DEFAULT 'unverified';
