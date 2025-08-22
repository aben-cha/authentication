import db from '../db/db.js'
import { generatePingPongAvatar } from '../utils/generatePingPongAvatar.js'

const getAllUsers =  () => {
    const query = 'SELECT * FROM USERS';
    const users = db.prepare(query)
    return users.all();
}

const getUserByID =  (id) => {
    const query = 'SELECT * FROM USERS WHERE id = ?';
    const userID = db.prepare(query);
    return userID.get(id);
}

const getUserByEmail =  (email) => {
    const query = 'SELECT * FROM USERS WHERE email = ?';
    const userEmail = db.prepare(query);
    return userEmail.get(email);
}

const getUserByUsername =  (username) => {
    const query = 'SELECT * FROM USERS WHERE username = ?';
    const userUsername = db.prepare(query);
    return userUsername.get(username);
}

// const createUser =  (username, email, password) => {
//     const query = 'INSERT INTO USERS (username, email, password) VALUES (?, ?, ?)';
//     const user = db.prepare(query).run(username, email, password);
//     return user.lastInsertRowid;
// }

// const createUser =  (username, email, password, verificationToken, tokenExpiry) => {
//     const query = `
//       INSERT INTO USERS 
//       (username, email, password, verificationToken, verificationTokenExpiresAt) 
//       VALUES (?, ?, ?, ?, ?)
//     `;
//     const user = db.prepare(query).run(username, email, password, verificationToken, tokenExpiry);
//     return user.lastInsertRowid;
// }

const createUser = (userData) => {
    const {
        username,
        email,
        password,
        verificationToken,
        tokenExpiry,
    } = userData;

    const query = `
        INSERT INTO USERS 
        (username, email, password, avatar_url, verificationToken, verificationTokenExpiresAt)
        VALUES (?, ?, ?, ?, ?, ?);
    `;

    const avatar_url = generatePingPongAvatar(username);

    const user = db.prepare(query).run(
        username,
        email,
        password,
        avatar_url,
        verificationToken,
        tokenExpiry
    );

    return user.lastInsertRowid;
}

export default { getUserByID, getUserByEmail, getUserByUsername, getAllUsers, createUser};
