import userModel from "../models/user.model.js"
import bcrypt from "bcryptjs";
// import fastify from "../app.js";
import transporter from "../utils/mailer.js";
import {generateTokenAndSetCookie} from "../utils/generateTokenAndSetCookie.js";
import { sendVerificationEmail } from "../utils/sendVerificationEmail.js"

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
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();
        const tokenExpiry = new Date(Date.now() + 15 * 60 * 1000).toISOString(); // 15 minutes

        // const userId = userModel.createUser(username, email, hashedPassword, verificationToken, tokenExpiry);

        const userId = userModel.createUser({
            username,
            email,
            password: hashedPassword,
            verificationToken,
            tokenExpiry,
            // location
        })
        
        generateTokenAndSetCookie(reply, userId, username, email);

        
        //----------------------------------------
        await sendVerificationEmail(email, verificationToken, username);
        // ----------------------------------------

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

    // app.post('/verify-email', (req, res) => {
    //     const { email, code } = req.body;
        
    //     const query = `
    //       UPDATE users 
    //       SET isAccountVerified = 1, verificationToken = NULL, verificationTokenExpiresAt = NULL
    //       WHERE email = ? AND verificationToken = ? AND verificationTokenExpiresAt > ?
    //     `;
        
    //     const now = new Date().toISOString();
    //     const result = db.prepare(query).run(email, code, now);
        
    //     if (result.changes > 0) {
    //       res.json({ message: 'Email verified successfully!' });
    //     } else {
    //       res.status(400).json({ error: 'Invalid or expired verification code' });
    //     }
    //   });
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