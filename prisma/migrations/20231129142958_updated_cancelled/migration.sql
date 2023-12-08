/*
  Warnings:

  - The values [CANCELED] on the enum `SubtaskInstance_status` will be removed. If these variants are still used in the database, this will fail.
  - The values [CANCELED] on the enum `SubtaskInstance_status` will be removed. If these variants are still used in the database, this will fail.
  - The values [CANCELED] on the enum `SubtaskInstance_status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `order` MODIFY `status` ENUM('AWAITING_CUSTOMER', 'PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED') NOT NULL;

-- AlterTable
ALTER TABLE `subtaskinstance` MODIFY `status` ENUM('AWAITING_CUSTOMER', 'PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED') NOT NULL;

-- AlterTable
ALTER TABLE `taskinstance` MODIFY `status` ENUM('AWAITING_CUSTOMER', 'PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED') NOT NULL;
