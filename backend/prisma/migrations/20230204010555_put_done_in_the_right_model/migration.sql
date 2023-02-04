/*
  Warnings:

  - You are about to drop the column `title` on the `Workout` table. All the data in the column will be lost.
  - Added the required column `title` to the `WorkoutPlan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Workout" DROP COLUMN "title";

-- AlterTable
ALTER TABLE "WorkoutPlan" ADD COLUMN     "title" TEXT NOT NULL;
