-- DropForeignKey
ALTER TABLE `attendees` DROP FOREIGN KEY `attendees_event_id_fkey`;

-- CreateTable
CREATE TABLE `check_ins` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `attendee_id` INTEGER NOT NULL,

    UNIQUE INDEX `check_ins_attendee_id_key`(`attendee_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `attendees` ADD CONSTRAINT `attendees_event_id_fkey` FOREIGN KEY (`event_id`) REFERENCES `events`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `check_ins` ADD CONSTRAINT `check_ins_attendee_id_fkey` FOREIGN KEY (`attendee_id`) REFERENCES `attendees`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
