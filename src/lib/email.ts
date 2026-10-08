import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendOnboardingThanksEmail(to: string, firstName: string) {
  if (!process.env.RESEND_API_KEY) {
    console.warn("RESEND_API_KEY is not set. Skipping email.");
    return;
  }

  try {
    await resend.emails.send({
      from: 'VedaSync <onboarding@syncnodex.in>',
      to,
      subject: 'Documents Received - Under Review',
      html: `
        <h2>Thank you for submitting your documents!</h2>
        <p>Hi ${firstName},</p>
        <p>We have successfully received your onboarding documents. Our team is currently reviewing them.</p>
        <p>Please allow <strong>24 to 48 hours</strong> for the verification process to complete. We will notify you once your account is fully verified.</p>
        <br/>
        <p>Best regards,</p>
        <p>The VedaSync Team</p>
      `
    });
  } catch (error) {
    console.error("Failed to send onboarding email:", error);
  }
}
