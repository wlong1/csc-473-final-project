const userService = require('../services/userService');
const { appError } = require('../utils/httpError');


const loginUser = async (req, res, next) => {
    const { username, password } = req.body;
    if (!username || !password) {
        throw appError(400, 'All fields are required');
    }
    
    const user = await userService.loginUser(username, password);
    res.status(200).json(user);
};

const createUser = async (req, res) => {
    const { username, password, email} = req.body;
    if (!username || !password || !email) {
        throw appError(400, 'All fields are required');
    }

    const user = await userService.createUser(username, password, email);
    res.status(201).json(user);
};

module.exports = {
    loginUser,
    createUser
};