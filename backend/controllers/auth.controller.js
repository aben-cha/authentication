import userModel from "../models/user.model.js"
import bcrypt from "bcryptjs";
// import fastify from "../app.js";
import transporter from "../utils/mailer.js";
import {generateTokenAndSetCookie} from "../utils/generateTokenAndSetCookie.js";
import { VERIFICATION_EMAIL_TEMPLATE } from "../utils/emailTemplates.js";
import { sendVerificationEmail } from "../utils/emailService.js";

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
        const tokenExpiry = new Date(Date.now() + 15 * 60 * 1000).toISOString();
        const userId = userModel.createUser(username, email, hashedPassword, verificationCode, tokenExpiry);
        
        generateTokenAndSetCookie(reply, userId, username, email);

        
        // const mailOptions = {
        //     from: `PingPong App ${process.env.EMAIL}`,
        //     to: email,
        //     subject: 'Verify your PingPong account',
        // };
        
        //----------------------------------------
        // verification email
            // const verificationUrl = `http://localhost:${process.env.PORT}/verify-email?token=${verificationCode}`;
            // const mailOptions = {
            //     from: `"PingPong App" <${process.env.EMAIL}>`,
            //     to: email,
            //     subject: 'Verify your PingPong account',
            //     // html: VERIFICATION_EMAIL_TEMPLATE(verificationCode)
            //     html: `
            //         <h3>Thank you for registering!</h3>
            //         <h3>
            //             <a href="${verificationUrl}" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none;">
            //                 Activate your account
            //             </a>
            //         </h3>`
            // };

            // await transporter.sendMail(mailOptions);
        //----------------------------------------
        // await sendVerificationEmail(email, verificationCode);

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
        
        generateTokenAndSetCookie(reply, user.id, user.username, user.email);

        reply.send({status: true, message: 'User Logged in successfully'});

    } catch(error) {
        console.error("login error:", error);
        reply.code(400).send({status:false, message: error.message});
    }
};

const logout = async (request, reply) => {
    try {
        // reply.clearCookie('token', { path: '/' });
        reply.clearCookie('token', {
            path: '/',
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        });
        
        reply.send({status: true, message: 'Logged out successfully'});
    } catch (error) {
        console.error("logout error:", error);
        reply.code(400).send({status:false, message: error.message});
    }    
};

const verifyEmail = async (request, reply) => {
    const { token } = request.query;
    try {
        if (!token) {
            return reply.status(400).send({ message: 'Token is required' });
        }

        console.log("code:    -------------------> : ", token);
    } catch (error) {
        console.error("verifyEmail error:", error);
        reply.code(400).send({status:false, message: error.message});
    }   
}

const checkAuth = async (request, reply) => {
    try {
        // User data is available in request.user after JWT verification
        const user = request.user;

        const userExist = userModel.getUserByID(user.id);
        if (!userExist)
            return reply.code(400).send({status:false, message: 'User not found'});

        return reply.send({ success: true,message: 'You are authenticated', user: user});

    } catch (error) {
        console.log('checkAuth error :', error);
        return reply.code(500).send({ status: false, message: 'Server error' });
    }
}

export default {login, signup, logout, verifyEmail, checkAuth};