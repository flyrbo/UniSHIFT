import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

export const sendResponseEmail = async (email, question, response) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: 'Response to Your Question - UniSHIFT',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #FF6B35, #F7931E); padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 30px;">
            <h1 style="color: white; margin: 0; font-size: 28px;">UniSHIFT</h1>
            <p style="color: white; margin: 10px 0 0 0; opacity: 0.9;">Serving Hope In Food Together</p>
          </div>
          
          <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="color: #333; margin-top: 0;">Your Question:</h3>
            <p style="color: #666; font-style: italic;">"${question}"</p>
          </div>
          
          <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #FF6B35; margin-bottom: 30px;">
            <h3 style="color: #333; margin-top: 0;">Our Response:</h3>
            <p style="color: #333; line-height: 1.6;">${response}</p>
          </div>
          
          <div style="text-align: center; padding: 20px; background: #f0f0f0; border-radius: 8px;">
            <p style="color: #666; margin: 0;">Thank you for reaching out to UniSHIFT!</p>
            <p style="color: #666; margin: 10px 0 0 0; font-size: 14px;">
              If you have any more questions, feel free to contact us at 
              <a href="mailto:info@unishift.org" style="color: #FF6B35;">info@unishift.org</a>
            </p>
          </div>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('Response email sent successfully to:', email);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};