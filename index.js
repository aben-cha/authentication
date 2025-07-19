const res = Math.floor(100000 + Math.random()* 900000).toString();
console.log(res);

const tokenExpiry = new Date(Date.now() + 15 * 60 * 1000).toISOString();
console.log(typeof tokenExpiry);


const now = new Date();
const isExpired = new Date(verificationTokenExpiresAt) < now;