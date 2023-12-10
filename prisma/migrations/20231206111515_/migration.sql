/*
  Warnings:

  - You are about to drop the `car` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `order` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `subtaskinstance` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `taskinstance` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `car` DROP FOREIGN KEY `Car_customer_id_fkey`;

-- DropForeignKey
ALTER TABLE `order` DROP FOREIGN KEY `Order_customer_id_fkey`;

-- DropForeignKey
ALTER TABLE `subtaskinstance` DROP FOREIGN KEY `SubtaskInstance_subtask_id_fkey`;

-- DropForeignKey
ALTER TABLE `taskinstance` DROP FOREIGN KEY `TaskInstance_employee_id_fkey`;

-- DropForeignKey
ALTER TABLE `taskinstance` DROP FOREIGN KEY `TaskInstance_task_id_fkey`;

-- DropIndex
DROP INDEX `TaskInstanceComment_task_instance_id_fkey` ON `TaskInstanceComment`;

-- DropTable
DROP TABLE `car`;

-- DropTable
DROP TABLE `order`;

-- DropTable
DROP TABLE `subtaskinstance`;

-- DropTable
DROP TABLE `taskinstance`;

-- CreateTable
CREATE TABLE `Car` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `customer_id` VARCHAR(191) NOT NULL,
    `registration_number` VARCHAR(191) NOT NULL,
    `vin_number` VARCHAR(191) NOT NULL,
    `brand` VARCHAR(191) NOT NULL,
    `model` VARCHAR(191) NOT NULL,
    `model_variant` VARCHAR(191) NOT NULL,
    `first_registration` DATETIME(3) NOT NULL,
    `mileage` INTEGER NOT NULL,
    `last_inspection_date` DATETIME(3) NULL,
    `last_inspection_result` VARCHAR(191) NULL,
    `last_inspection_kind` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Order` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `status` ENUM('AWAITING_CUSTOMER', 'PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED') NOT NULL,
    `order_start_date` DATETIME(3) NOT NULL,
    `car_id` INTEGER NOT NULL,
    `customer_id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TaskInstance` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `status` ENUM('AWAITING_CUSTOMER', 'PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED') NOT NULL,
    `task_id` INTEGER NOT NULL,
    `employee_id` VARCHAR(191) NULL,
    `order_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SubtaskInstance` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `status` ENUM('AWAITING_CUSTOMER', 'PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED') NOT NULL,
    `task_instance_id` INTEGER NOT NULL,
    `subtask_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Car` ADD CONSTRAINT `Car_customer_id_fkey` FOREIGN KEY (`customer_id`) REFERENCES `Customer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_car_id_fkey` FOREIGN KEY (`car_id`) REFERENCES `Car`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_customer_id_fkey` FOREIGN KEY (`customer_id`) REFERENCES `Customer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TaskInstance` ADD CONSTRAINT `TaskInstance_task_id_fkey` FOREIGN KEY (`task_id`) REFERENCES `Task`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TaskInstance` ADD CONSTRAINT `TaskInstance_employee_id_fkey` FOREIGN KEY (`employee_id`) REFERENCES `Employee`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TaskInstance` ADD CONSTRAINT `TaskInstance_order_id_fkey` FOREIGN KEY (`order_id`) REFERENCES `Order`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SubtaskInstance` ADD CONSTRAINT `SubtaskInstance_task_instance_id_fkey` FOREIGN KEY (`task_instance_id`) REFERENCES `TaskInstance`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SubtaskInstance` ADD CONSTRAINT `SubtaskInstance_subtask_id_fkey` FOREIGN KEY (`subtask_id`) REFERENCES `Subtask`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TaskInstanceComment` ADD CONSTRAINT `TaskInstanceComment_task_instance_id_fkey` FOREIGN KEY (`task_instance_id`) REFERENCES `TaskInstance`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
