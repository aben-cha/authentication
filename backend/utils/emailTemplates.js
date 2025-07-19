export const VERIFICATION_EMAIL_TEMPLATE = (verificationCode) => (
  `<!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8" />
      <title>Verify Your Email</title>
    </head>
    <body style="font-family: Arial, sans-serif; background-color: #f5f5f5; margin: 0; padding: 0;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="border-collapse: collapse; background-color: #ffffff;">
        <tr>
          <td align="center" bgcolor="#4CAF50" style="padding: 20px 0; color: #ffffff; font-size: 24px; font-weight: bold;">
            Verify Your Email
          </td>
        </tr>
        <tr>
          <td style="padding: 20px;">
            <p>Hello,</p>
            <p>Thank you for signing up! Your verification code is:</p>
            <p style="text-align: center; font-size: 24px; font-weight: bold; color: #4CAF50;">
              ${verificationCode}
            </p>
            <p>Enter this code on the verification page to complete your registration.</p>
            <p>This code will expire in 15 minutes for security reasons.</p>
            <p>If you didn't create an account with us, please ignore this email.</p>
            <p>Best regards,<br/>PingPong App Team</p>
          </td>
        </tr>
        <tr>
          <td bgcolor="#f5f5f5" style="text-align: center; padding: 10px; font-size: 12px; color: #888888;">
            This is an automated message, please do not reply to this email.
          </td>
        </tr>
      </table>
    </body>
  </html>`
);


