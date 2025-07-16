import userModel from "../models/user.model.js"
import bcrypt from "bcryptjs";
import fastify from "../app.js";


const login = async (request, reply) => {
    const users = await userModel.getAllUsers();
    console.log("------> users: ", users);
    return  {message: 'login'};    
};

const signup = async (request, reply) => {
    const {username, email, password} = request.body;

    try {
        if (!username || !email || !password)
            throw new Error('All fields are required');

        const usernameAlreadyExist = userModel.getUserByUsername(username);
        const emailAlreadyExist = userModel.getUserByEmail(email);
    
        if (usernameAlreadyExist)
            throw new Error('Username already exists');

        if (emailAlreadyExist)
            throw new Error('Email already exists');
          
        const hashedPassword = await bcrypt.hash(password, 10);
        const userId = userModel.createUser(username, email, hashedPassword);
        
        console.log("id of user : --> [", userId, "]");
        
        const token = fastify.jwt.sign({
                        id: userId, 
                        username: username, 
                        email: email
                    }, {expiresIn: '7d'});
        
        reply.setCookie('token', token, {
            httpOnly: true, // can't be accessed by JavaScript
            secure: process.env.NODE_ENV === 'production', //local: http , production: https
            sameSite: 'strict', // CSRF protection
            maxAge: 7 * 24 * 60 * 60 // 7 days
        });

        reply.code(201) 
             .send({ status: true, 
                     message: 'User registered successfully.', 
                     user: {
                        id: userId,
                        username: username,
                        email: email,
                   }});    
    } catch (error) {
        console.error("Signup error:", error); // Helpful for debugging
        reply.code(400).send({status: false, message: error.message});
    }
};

const logout = async (request, reply) => {
    return  {message: 'logout'};    
};

export default {login, signup, logout};