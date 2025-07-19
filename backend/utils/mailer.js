import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

/*
verifyOtp = ''
verifyOtpExpiredAt
isAccountVerified = 0

id
username
email
passowrd
isAccountVerified = 0
verificationToken = ''
verificationTokenExpiresAt = date
createdat

*/

export default transporter;
