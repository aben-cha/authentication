import userModel from "../models/user.model.js"
import bcrypt from "bcryptjs";


const login = async (request, reply) => {
    const users = await userModel.getAllUsers();
    console.log("------> users: ", users);
    return  {message: 'login'};    
};

const signup = async (request, reply) => {
    const {username, email, password} = request.body;

    if (!username || !email || !password)
        return reply.code(400).send({status: false, message: 'All fiels are required.'});
        // throw new Error('');
    const usernameAlreadyExist = userModel.getUserByUsername(username);
    const emailAlreadyExist = userModel.getUserByUsername(email);

    if (usernameAlreadyExist || emailAlreadyExist)
        return reply.code(400).send({status: false, message: 'User already exists'});

    try {
        const hashedPassowrd = await bcrypt.hash(password, 10);
        const user = userModel.createUser(username, email, hashedPassowrd);

        console.log("id of user : --> [", user, "]");
    } catch (error) {
        return reply.code(400).send({status: false, message: error.message});
    }
    return  reply.code(200).send({status: true, message: 'User registered successfully.'});    
};

const logout = async (request, reply) => {
    return  {message: 'logout'};    
};

export default {login, signup, logout};