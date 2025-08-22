-- CREATE TABLE IF NOT EXISTS USERS (
--     id INTEGER PRIMARY KEY AUTOINCREMENT,
--     username TEXT NOT NULL UNIQUE,
--     email TEXT NOT NULL UNIQUE,
--     password TEXT NOT NULL
-- );

-- CREATE TABLE IF NOT EXISTS USERS (
--     id INTEGER PRIMARY KEY AUTOINCREMENT,
--     username TEXT NOT NULL UNIQUE,
--     email TEXT NOT NULL UNIQUE,
--     password TEXT NOT NULL,
--     isAccountVerified INTEGER DEFAULT 0,
--     verificationToken TEXT,
--     verificationTokenExpiresAt DATETIME,
--     createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
-- );

CREATE TABLE IF NOT EXISTS USERS (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    avatar_url VARCHAR(255) NOT NULL, -- Generated via generatePingPongAvatar
    
    -- Account verification
    -- isAccountVerified INTEGER DEFAULT 0,
    -- verificationToken TEXT,
    -- verificationTokenExpiresAt DATETIME,

    isAccountVerified INTEGER DEFAULT 0,
    verificationToken TEXT,
    verificationTokenExpiresAt DATETIME,
    resetPasswordToken TEXT,
    resetPasswordExpiresAt DATETIME,
    
    -- Game stats
    points INTEGER NOT NULL DEFAULT 0,
    wins INTEGER NOT NULL DEFAULT 0,
    losses INTEGER NOT NULL DEFAULT 0,
    rank INTEGER NOT NULL DEFAULT 0,
    
    -- Profile info
    location VARCHAR(100),
    online_status BOOLEAN NOT NULL DEFAULT FALSE,
    
    -- Timestamps
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);
