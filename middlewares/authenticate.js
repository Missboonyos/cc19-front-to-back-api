// filepath: d:\00_Study\cc19\cc19-group-project\cc19-gpmock-api\middlewares\authenticate.js
const jwt = require('jsonwebtoken');
const prisma = require('../configs/prisma');
const createError = require('../utils/createError');

exports.authenticate = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const user = await prisma.user.findUnique({ where: { id: decoded.id } });

        if (!user) return next(createError(401, 'Unauthorized'));

        req.user = user;
        next();
    } catch (error) {
        next(createError(401, 'Unauthorized'));
    }
};