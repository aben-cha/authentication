import Database from "better-sqlite3";
import fs from 'fs';

const db = new Database(process.env.DATABASE_NAME);

const sql = fs.readFileSync('./user.sql', 'utf8');

db.exec(sql);


const getUesers()

export default db;

