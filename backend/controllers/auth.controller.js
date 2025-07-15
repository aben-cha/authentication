import userModel from "../models/user.model.js"



const login = async (request, reply) => {
    
    const users = await userModel.getAllUsers();
    console.log("------> users: ", users);
    return  {message: 'login'};    
};

const signup = async (request, reply) => {
    return  {message: 'signup'};    
};

const logout = async (request, reply) => {
    return  {message: 'logout'};    
};

export default {login, signup, logout};
