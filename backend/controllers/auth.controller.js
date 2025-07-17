import userModel from "../models/user.model.js"
import bcrypt from "bcryptjs";
// import fastify from "../app.js";
import {generateTokenAndSetCoookie} from "../utils/generateTokenAndSetCoookie.js";

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
        

        // const token = fastify.jwt.sign({
        //                 id: userId, 
        //                 username: username, 
        //                 email: email
        //             }, {expiresIn: '7d'});
        
        // reply.setCookie('token', token, {
        //     httpOnly: true, // can't be accessed by JavaScript
        //     secure: process.env.NODE_ENV === 'production', //local: http , production: https
        //     sameSite: 'strict', // CSRF protection
        //     maxAge: 7 * 24 * 60 * 60 // 7 days
        // });
        generateTokenAndSetCoookie(reply, userId, username, email);

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

const login = async (request, reply) => {
    const {email, password} = request.body;
    
    try {
        if (!email || !password)
            throw new Error("Email and password are required fields.");

        const user = userModel.getUserByEmail(email);
        if (!user)
            throw new Error("No account found with this email.");

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid)
            throw new Error("Incorrect password.");
        
        generateTokenAndSetCoookie(reply, user.id, user.username, user.email);

        reply.send({status: true, message: 'User Logged in successfully'});

    } catch(error) {
        console.error("login error:", error);
        reply.code(400).send({status:false, message: error.message});
    }
};

const logout = async (request, reply) => {
    return  {message: 'logout'};    
};

export default {login, signup, logout};