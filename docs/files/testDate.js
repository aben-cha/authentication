const res = Math.floor(100000 + Math.random()* 900000).toString();
console.log(res);

const tokenExpiry = new Date(Date.now() + 15 * 60 * 1000).toISOString();
console.log(typeof tokenExpiry);


const now = new Date();
const isExpired = new Date(verificationTokenExpiresAt) < now;

// https://www.tldraw.com/f/2LYR8DbGl7_v4RJ1Enib1?d=v-2295.-242.3412.3263.page ==> DB using tldraw



/*
Why .toISOString() is Better for SQLite:

Consistent Format: SQLite stores it as 'YYYY-MM-DD HH:MM:SS.SSS'
Timezone Safe: ISO strings are UTC by default
Query Friendly: Easy to compare dates in SQL queries

javascript// For checking token expiry in verification
const verifyUser = (token) => {
  const query = `
    UPDATE users 
    SET isAccountVerified = 1, verificationToken = NULL, verificationTokenExpiresAt = NULL
    WHERE verificationToken = ? AND verificationTokenExpiresAt > ?
  `;
  
  const now = new Date().toISOString();
  const result = db.prepare(query).run(token, now);
  
  return result.changes > 0; // Returns true if user was verified
};
*/