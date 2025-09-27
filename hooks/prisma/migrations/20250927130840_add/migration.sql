/*
  Warnings:

  - Added the required column `order` to the `Action` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Action" ADD COLUMN     "order" INTEGER NOT NULL;
