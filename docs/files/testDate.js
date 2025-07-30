const res = Math.floor(100000 + Math.random()* 900000).toString();
console.log(res);

const tokenExpiry = new Date(Date.now() + 15 * 60 * 1000).toISOString();
console.log(typeof tokenExpiry);


const now = new Date();
const isExpired = new Date(verificationTokenExpiresAt) < now;

// https://www.tldraw.com/f/2LYR8DbGl7_v4RJ1Enib1?d=v-2295.-242.3412.3263.page ==> DB using tldraw