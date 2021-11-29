/*
  Warnings:

  - You are about to drop the column `author_id` on the `Post` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email,username]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `Account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Account` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `refresh_token_expires_in` INTEGER NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL,
    MODIFY `refresh_token` VARCHAR(500) NULL,
    MODIFY `access_token` VARCHAR(500) NULL,
    MODIFY `id_token` TEXT NULL;

-- AlterTable
ALTER TABLE `Post` DROP COLUMN `author_id`,
    ADD COLUMN `user_id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Session` MODIFY `userId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `role` VARCHAR(191) NULL DEFAULT 'user',
    ALTER COLUMN `updated_at` DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX `User_email_username_key` ON `User`(`email`, `username`);
