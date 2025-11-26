import { resend } from "@/lib/resend";
import PasswordResetEmail from "../../emails/PasswordResetEmail";

export async function sendPasswordResetEmail(
    email: string,
    id: string,
    username: string,
    token: string,
) {
    try {
        await resend.emails.send({
            from: 'meetkind <onboarding@resend.dev>',
            to: email,
            subject: 'meetkind Password Reset Code',
            react: PasswordResetEmail({id, username, token}),
        });

        return { success: true, message: "Password reset email sent successfully."};
    } catch (error) {
        console.log("Error sending password reset email: ", error);
        return { success: false, message: "Failed to send password reset email." };
    }
}