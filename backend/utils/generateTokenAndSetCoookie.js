import fastify from "../app.js"


export const generateTokenAndSetCoookie = (reply, id, username, email) => {
    const token = fastify.jwt.sign({
        id: id, 
        username: username, 
        email: email
    }, {expiresIn: '7d'});

    reply.setCookie('token', token, {
        httpOnly: true, // can't be accessed by JavaScript
        secure: process.env.NODE_ENV === 'production', //local: http , production: https
        sameSite: 'strict', // CSRF protection
        maxAge: 7 * 24 * 60 * 60 // 7 days
    });
}
