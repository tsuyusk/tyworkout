/*
  Warnings:

  - Added the required column `userId` to the `Exercise` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `ExercisePlan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Exercise" ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ExercisePlan" ADD COLUMN     "userId" TEXT NOT NULL;
