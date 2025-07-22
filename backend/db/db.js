import dotenv from 'dotenv';
dotenv.config({path: './backend/.env'});

import Database from "better-sqlite3";
import fs from 'fs';

const db = new Database(`./backend/db/${process.env.DATABASE_NAME}`);

const sql = fs.readFileSync('./backend/db/user.sql', 'utf8');

db.exec(sql);

export default db;
