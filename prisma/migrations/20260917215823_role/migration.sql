-- CreateEnum
CREATE TYPE "Role" AS ENUM ('maker', 'investor', 'admin', 'user');

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'user';
