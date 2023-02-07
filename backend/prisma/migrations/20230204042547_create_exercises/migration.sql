-- CreateTable
CREATE TABLE "ExercisePlan" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "done" INTEGER NOT NULL,
    "goalReps" INTEGER NOT NULL,
    "doneReps" INTEGER NOT NULL,
    "goalSets" INTEGER NOT NULL,
    "doneSets" INTEGER NOT NULL,
    "workoutPlanId" TEXT NOT NULL,

    CONSTRAINT "ExercisePlan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Exercise" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "done" INTEGER NOT NULL,
    "goalReps" INTEGER NOT NULL,
    "doneReps" INTEGER NOT NULL,
    "goalSets" INTEGER NOT NULL,
    "doneSets" INTEGER NOT NULL,
    "workoutId" TEXT NOT NULL,

    CONSTRAINT "Exercise_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ExercisePlan" ADD CONSTRAINT "ExercisePlan_workoutPlanId_fkey" FOREIGN KEY ("workoutPlanId") REFERENCES "WorkoutPlan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exercise" ADD CONSTRAINT "Exercise_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "Workout"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
