-- Corrected SQLite Database Schema for Ping Pong Tournament App

CREATE TABLE `User`(
    `id` INTEGER PRIMARY KEY AUTOINCREMENT,
    `username` VARCHAR(50) NOT NULL UNIQUE,
    `email` VARCHAR(100) NOT NULL UNIQUE,
    `avatar_url` VARCHAR(255),
    `points` INTEGER NOT NULL DEFAULT 0,
    `location` VARCHAR(100),
    `wins` INT NOT NULL DEFAULT 0,
    `losses` INT NOT NULL DEFAULT 0
    `rank` INTEGER NOT NULL DEFAULT 0,
    `online_status` BOOLEAN NOT NULL DEFAULT FALSE,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE `Friend`(
    `id` INTEGER PRIMARY KEY AUTOINCREMENT,
    `user_id` INTEGER NOT NULL,
    `friend_id` INTEGER NOT NULL,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(`user_id`) REFERENCES `User`(`id`) ON DELETE CASCADE,
    FOREIGN KEY(`friend_id`) REFERENCES `User`(`id`) ON DELETE CASCADE,
    UNIQUE(`user_id`, `friend_id`)
);

CREATE TABLE `Game`(
    `id` INTEGER PRIMARY KEY AUTOINCREMENT,
    `player1_id` INTEGER NOT NULL,
    `player2_id` INTEGER NOT NULL,
    `player1_score` INTEGER NOT NULL DEFAULT 0,
    `player2_score` INTEGER NOT NULL DEFAULT 0,
    `winner_id` INTEGER,
    `played_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(`player1_id`) REFERENCES `User`(`id`) ON DELETE CASCADE,
    FOREIGN KEY(`player2_id`) REFERENCES `User`(`id`) ON DELETE CASCADE,
    FOREIGN KEY(`winner_id`) REFERENCES `User`(`id`) ON DELETE SET NULL,
    CHECK(`player1_id` != `player2_id`)
);

CREATE TABLE `Tournament`(
    `id` INTEGER PRIMARY KEY AUTOINCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `start_date` DATETIME NOT NULL,
    `end_date` DATETIME NOT NULL,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE `Tournament_Games`(
    `id` INTEGER PRIMARY KEY AUTOINCREMENT,
    `tournament_id` INTEGER NOT NULL,
    `game_id` INTEGER NOT NULL,
    FOREIGN KEY(`tournament_id`) REFERENCES `Tournament`(`id`) ON DELETE CASCADE,
    FOREIGN KEY(`game_id`) REFERENCES `Game`(`id`) ON DELETE CASCADE,
    UNIQUE(`tournament_id`, `game_id`)
);

CREATE TABLE `Message`(
    `id` INTEGER PRIMARY KEY AUTOINCREMENT,
    `sender_id` INTEGER NOT NULL,
    `receiver_id` INTEGER NOT NULL,
    `content` TEXT NOT NULL,
    `sent_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `read_at` DATETIME,
    FOREIGN KEY(`sender_id`) REFERENCES `User`(`id`) ON DELETE CASCADE,
    FOREIGN KEY(`receiver_id`) REFERENCES `User`(`id`) ON DELETE CASCADE,
    CHECK(`sender_id` != `receiver_id`)
);

CREATE TABLE `Notification`(
    `id` INTEGER PRIMARY KEY AUTOINCREMENT,
    `user_id` INTEGER NOT NULL,
    `type` VARCHAR(50) NOT NULL,
    `content` TEXT NOT NULL,
    `is_read` BOOLEAN NOT NULL DEFAULT 0,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(`user_id`) REFERENCES `User`(`id`) ON DELETE CASCADE
);

CREATE TABLE `Match_Request`(
    `id` INTEGER PRIMARY KEY AUTOINCREMENT,
    `requester_id` INTEGER NOT NULL,
    `receiver_id` INTEGER NOT NULL,
    `status` VARCHAR(20) NOT NULL DEFAULT 'pending',
    `requested_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `responded_at` DATETIME,
    FOREIGN KEY(`requester_id`) REFERENCES `User`(`id`) ON DELETE CASCADE,
    FOREIGN KEY(`receiver_id`) REFERENCES `User`(`id`) ON DELETE CASCADE,
    CHECK(`requester_id` != `receiver_id`)
);

-- Improved Block table with better constraints and indexes
CREATE TABLE Block (
    `id` INTEGER PRIMARY KEY AUTOINCREMENT,
    `blocker_id` INTEGER NOT NULL,
    `blocked_id` INTEGER NOT NULL,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    
    -- Constraints
    UNIQUE(`blocker_id`, `blocked_id`),
    CHECK(`blocker_id` != `blocked_id`), -- Prevent self-blocking
    
    -- Foreign keys with proper CASCADE behavior
    FOREIGN KEY (`blocker_id`) REFERENCES `User`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`blocked_id`) REFERENCES `User`(`id`) ON DELETE CASCADE
);

-- Indexes for better performance
CREATE INDEX `idx_block_blocker` ON Block(`blocker_id`);
CREATE INDEX `idx_block_blocked` ON Block(`blocked_id`);
-- Optional: Index for checking if user A blocked user B
CREATE INDEX idx_block_relationship ON Block(blocker_id, blocked_id);


-- Create indexes for better performance
CREATE INDEX `idx_user_username` ON `User`(`username`);
CREATE INDEX `idx_user_email` ON `User`(`email`);
CREATE INDEX `idx_user_rank` ON `User`(`rank`);
CREATE INDEX `idx_friend_user_id` ON `Friend`(`user_id`);
CREATE INDEX `idx_friend_friend_id` ON `Friend`(`friend_id`);
CREATE INDEX `idx_game_player1` ON `Game`(`player1_id`);
CREATE INDEX `idx_game_player2` ON `Game`(`player2_id`);
CREATE INDEX `idx_game_winner` ON `Game`(`winner_id`);
CREATE INDEX `idx_game_played_at` ON `Game`(`played_at`);
CREATE INDEX `idx_tournament_games_tournament` ON `Tournament_Games`(`tournament_id`);
CREATE INDEX `idx_tournament_games_game` ON `Tournament_Games`(`game_id`);
CREATE INDEX `idx_message_sender` ON `Message`(`sender_id`);
CREATE INDEX `idx_message_receiver` ON `Message`(`receiver_id`);
CREATE INDEX `idx_message_sent_at` ON `Message`(`sent_at`);
CREATE INDEX `idx_notification_user` ON `Notification`(`user_id`);
CREATE INDEX `idx_notification_unread` ON `Notification`(`user_id`, `is_read`);
CREATE INDEX `idx_match_request_requester` ON `Match_Request`(`requester_id`);
CREATE INDEX `idx_match_request_receiver` ON `Match_Request`(`receiver_id`);
CREATE INDEX `idx_match_request_status` ON `Match_Request`(`status`);