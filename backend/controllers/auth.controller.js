import userModel from "../models/user.model.js"
import bcrypt from "bcryptjs";
// import fastify from "../app.js";
import transporter from "../utils/mailer.js";
import {generateTokenAndSetCoookie} from "../utils/generateTokenAndSetCoookie.js";
import { VERIFICATION_EMAIL_TEMPLATE } from "../utils/emailTemplates.js";

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
        const verificationCode = Math.floor(100000 + Math.random()* 900000).toString();
        const userId = userModel.createUser(username, email, hashedPassword);
        
        generateTokenAndSetCoookie(reply, userId, username, email);

        const mailOptions = {
            from: '"PingPong App" <no-reply@pingpong.com>',
            to: email,
            subject: 'Verify your PingPong account',
            text: VERIFICATION_EMAIL_TEMPLATE(verificationToken)
        };

        await transporter.sendMail(mailOptions);

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
    try {
        reply.clearCookie('token', { path: '/' });
        reply.send({status: true, message: 'Logged out successfully'})
    } catch (error) {
        console.error("logout error:", error);
        reply.code(400).send({status:false, message: error.message});
    }    
};

const verifyEmail = async (request, reply) => {

}

export default {login, signup, logout, verifyEmail};