const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { appError } = require('../utils/httpError');

const SECRET_KEY = process.env.JWT_SECRET;
const TOKEN_EXPIRATION = process.env.TOKEN_EXPIRATION;
const SALT_ROUNDS = 1;

if (!SECRET_KEY) throw new Error("JWT_SECRET missing");


function generateToken(user) {
    return jwt.sign(
    {
        id: user.id,
        username: user.username,
        role: user.role,
    },
    SECRET_KEY,
    { expiresIn: TOKEN_EXPIRATION }
    );
}

const loginUser = async (username, password) => {
    const user = await User.findOne({ where: { username } });
        
    if (!user || !(await bcrypt.compare(password, user.password))) {
        throw appError(401, 'Invalid credentials');
    }

    return { token: generateToken(user), role: user.role };
}


const createUser = async (username, email, password) => {
    const dupeUser = await User.findOne({ where: { username } });
    const dupeEmail = await User.findOne({ where: { email } });
    if (dupeUser || dupeEmail) {
      throw appError(409, 'Account already exists');
    }
    
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const newUser = await User.create({
        username: username,
        email: email,
        password: hashedPassword,
        role: username === 'admin' ? 'admin' : 'user'
    });

    return { token: generateToken(newUser), role: newUser.role};
}


module.exports = {
    loginUser,
    createUser
};