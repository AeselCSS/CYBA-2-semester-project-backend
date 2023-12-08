-- AlterTable
ALTER TABLE `car` MODIFY `last_inspection_date` DATETIME(3) NULL,
    MODIFY `last_inspection_result` VARCHAR(191) NULL,
    MODIFY `last_inspection_kind` VARCHAR(191) NULL;
