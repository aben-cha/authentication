-- CREATE TABLE IF NOT EXISTS USERS (
--     id INTEGER PRIMARY KEY AUTOINCREMENT,
--     username TEXT NOT NULL UNIQUE,
--     email TEXT NOT NULL UNIQUE,
--     password TEXT NOT NULL
-- );

CREATE TABLE IF NOT EXISTS USERS (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    isAccountVerified INTEGER DEFAULT 0, -- 0 = false, 1 = true
    verificationToken TEXT,
    verificationTokenExpiresAt DATETIME,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);
