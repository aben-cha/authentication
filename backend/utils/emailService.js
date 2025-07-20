import resend from "./resend.js";

export const sendVerificationEmail = async (email, verificationToken) => {
    const verificationUrl = `http://localhost:5000/verify-email?token=${verificationToken}`;
    const {data, error} = await resend.emails.send({
        // from: 'PingPong App <onboarding@resend.dev>',
        from: "Acme <onboarding@resend.dev>",
        to: 'ayoubhadiri0320@gmail.com',
        // to: [email],
        subject: 'Activate your PingPong account',
        html: `
            <h3>Thank you for registering!</h3>
            <h3><a href="${verificationUrl}" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none;">Activate your account</a></h3>`
    });
    if (error) {
        console.error('Resend error:', error);
        throw new Error('Failed to send verification email');
    }

    console.log('Email sent: ', data);
};
