/*
  Warnings:

  - Made the column `fullName` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `users` MODIFY `fullName` VARCHAR(191) NOT NULL;
