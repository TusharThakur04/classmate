/*
  Warnings:

  - You are about to drop the column `name` on the `Action` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Trigger` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Action" DROP COLUMN "name",
ADD COLUMN     "metadata" JSONB;

-- AlterTable
ALTER TABLE "public"."Trigger" DROP COLUMN "name",
ADD COLUMN     "metadata" JSONB;
