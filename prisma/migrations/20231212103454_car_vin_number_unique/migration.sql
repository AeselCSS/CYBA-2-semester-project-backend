/*
  Warnings:

  - A unique constraint covering the columns `[vin_number]` on the table `Car` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Car_vin_number_key` ON `Car`(`vin_number`);
