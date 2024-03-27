const User = require('../models/user');
const createError = require('http-errors');
const bcrypt = require('bcrypt');

// Login 
exports.login = (req, res, next) => {
    let data = { email, password } = req.body;
    User.findOne({email})
        .then(user => {
            if(!user || !user.checkPassword(password)){
                throw createError(401, 'الرجاء التحقق من اسم المستخدم وكلمة المرور');
            }
            res.json(user.signJwt());
        })
        .catch(next);
};

// Register
exports.register = (req, res, next) => {
    let data = { name, email, password } = req.body;
    data.password = bcrypt.hashSync(password, 8);

    User.findOne({email})
        .then(user => {
            if(user) throw createError(422, "البريد الالكتروني مسجل مسبقا");
            return User.create(data);
        })
        .then(user => {
            res.json(user.signJwt());
        })
        .catch(next);
};
