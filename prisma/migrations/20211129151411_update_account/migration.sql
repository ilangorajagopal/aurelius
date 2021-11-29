/*
  Warnings:

  - You are about to drop the column `user_id` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `User` table. All the data in the column will be lost.
  - Added the required column `author_id` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Made the column `userId` on table `Session` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX `User_email_username_key` ON `User`;

-- AlterTable
ALTER TABLE `Post` DROP COLUMN `user_id`,
    ADD COLUMN `author_id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Session` MODIFY `userId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `role`,
    MODIFY `updated_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3);
