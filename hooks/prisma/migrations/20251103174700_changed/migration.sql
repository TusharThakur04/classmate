/*
  Warnings:

  - Made the column `name` on table `Flow` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."Flow" ALTER COLUMN "name" SET NOT NULL;
