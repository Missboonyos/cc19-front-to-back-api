// filepath: d:\00_Study\cc19\cc19-group-project\cc19-gpmock-api\controllers\mfa-controllers.js
const speakeasy = require('speakeasy');
const qrcode = require('qrcode');
const prisma = require('../configs/prisma');
const createError = require('../utils/createError');

exports.generateMfaSecret = async (req, res, next) => {
    try {
        const secret = speakeasy.generateSecret({ length: 20 });
        const url = speakeasy.otpauthURL({ 
            secret: secret.base32, 
            label: req.user.email, 
            issuer: 'YourAppName' 
        });

        await prisma.user.update({
            where: { id: req.user.id },
            data: { mfaSecret: secret.base32 }
        });

        qrcode.toDataURL(url, (err, data_url) => {
            if (err) return next(createError(500, 'Failed to generate QR code'));
            res.json({ secret: secret.base32, qrCodeUrl: data_url });
        });
    } catch (error) {
        next(error);
    }
};

exports.verifyMfaToken = async (req, res, next) => {
    try {
        const { token } = req.body;
        const user = await prisma.user.findUnique({ where: { id: req.user.id } });

        const verified = speakeasy.totp.verify({
            secret: user.mfaSecret,
            encoding: 'base32',
            token
        });

        if (!verified) return next(createError(400, 'Invalid MFA token'));

        res.json({ message: 'MFA token verified successfully' });
    } catch (error) {
        next(error);
    }
};