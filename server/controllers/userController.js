const userService = require('../services/userService');
const { appError } = require('../utils/httpError');


const loginUser = async (req, res, next) => {
    const { username, password } = req.body;
    if (!username || !password) {
        throw appError(400, 'All fields are required');
    }
    
    const { token, role } = await userService.loginUser(username, password);
    res.status(200).json({ token, role });
};

const createUser = async (req, res) => {
    const { username, email, password} = req.body;
    if (!username || !password || !email) {
        throw appError(400, 'All fields are required');
    }

    const { token, role } = await userService.createUser(username, email, password);
    res.status(201).json({ token, role });
};

module.exports = {
    loginUser,
    createUser
};