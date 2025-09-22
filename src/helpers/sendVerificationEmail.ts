import VerificationEmail from '../../emails/VerificationEmail';
import { resend } from '@/lib/resend';

export async function sendVerificationEmail(
    email: string,
    username: string,
    verifyCode: string
) {
  try {
    await resend.emails.send({
      from: 'meetkind <onboarding@resend.dev>',
      to: email,
      subject: 'meetkind Verification Code',
      react: VerificationEmail({username, verifyCode}),
    });

    return { success: true, message: "verification email sent successfully."};
  } catch (error) {
    console.error('Error sending verification email:', error)
    return { success: false, message: "Failed to send verification email."};
  }
}