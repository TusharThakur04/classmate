/*
  Warnings:

  - Added the required column `metadata` to the `FlowRun` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."FlowRun" ADD COLUMN     "metadata" JSONB NOT NULL;
