import userModel from "../models/user.model.js"
import bcrypt from "bcryptjs";


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
    
        if (usernameAlreadyExist || emailAlreadyExist)
            throw new Error('User already exists');

        const hashedPassword = await bcrypt.hash(password, 10);
        const userId = userModel.createUser(username, email, hashedPassword);
        console.log("id of user : --> [", userId, "]");
        
        reply.code(200) 
             .send({ status: true, 
                     message: 'User registered successfully.', 
                     userId: userId});    
    } catch (error) {
        console.error("Signup error:", error); // Helpful for debugging
        reply.code(400).send({status: false, message: error.message});
    }
};

const logout = async (request, reply) => {
    return  {message: 'logout'};    
};

export default {login, signup, logout};