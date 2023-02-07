/*
  Warnings:

  - The `done` column on the `Exercise` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `done` column on the `ExercisePlan` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Exercise" DROP COLUMN "done",
ADD COLUMN     "done" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "doneReps" SET DEFAULT 0,
ALTER COLUMN "doneSets" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "ExercisePlan" DROP COLUMN "done",
ADD COLUMN     "done" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "doneReps" SET DEFAULT 0,
ALTER COLUMN "doneSets" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "Workout" ALTER COLUMN "done" SET DEFAULT false;
