import db from '../db/db.js'


const getAllUsers = async () => {
    const query = 'SELECT * FROM USERS';
    const users = db.prepare(query)
    return users.all();
}

const getUserByID = async (id) =>{
    const query = 'SELECT * FROM USERS WHERE id = ?';
    const userID = db.prepare(query);
    return userID.get(id);
}

const getUserByEmail = async (email) =>{
    const query = 'SELECT * FROM USERS WHERE email = ?';
    const userEmail = db.prepare(query);
    return userEmail.get(email);
}

const getUserByUsername = async (username) =>{
    const query = 'SELECT * FROM USERS WHERE username = ?';
    const userUsername = db.prepare(query);
    return userUsername.get(username);
}

const createUser = async (name, email, password) => {
    const query = 'INSERT INTO USERS (name, email, password) VALUES (?, ?, ?)';
    const user = db.prepare(query).run(name, email, password);
    return user.lastInsertRowid;
}

export default { getUserByID, getUserByEmail, getUserByUsername, getAllUsers, createUser};
