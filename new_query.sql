-- In Service Table
-- As per requirements name of service change
UPDATE `apaihgbx_bookings`.`services` SET `Name` = 'Airport Drop-offs' WHERE (`id` = '6');

-- In cars table field updated
-- Alter the name of maximum hours to ...
ALTER TABLE `apaihgbx_bookings`.`cars`
CHANGE COLUMN `maximum_hours` `minimum_hours` INT NULL DEFAULT NULL ;

-- Add a new field in reservation Table
ALTER TABLE apaihgbx_bookings.reservations
ADD special_instruction TEXT;