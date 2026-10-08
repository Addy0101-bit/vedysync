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

export async function sendStatusUpdateEmail(to: string, firstName: string, status: 'verified' | 'rejected' | 'hold') {
  if (!process.env.RESEND_API_KEY) {
    console.warn("RESEND_API_KEY is not set. Skipping email.");
    return;
  }

  let subject = '';
  let content = '';

  switch (status) {
    case 'verified':
      subject = 'Verification Successful - Welcome to VedaSync!';
      content = `
        <h2>Your Account has been Verified!</h2>
        <p>Hi ${firstName},</p>
        <p>Great news! Your documents have been reviewed and approved. Your account is now fully verified.</p>
        <p>You can now log in and access all platform features.</p>
      `;
      break;
    case 'rejected':
      subject = 'Action Required: Verification Issue';
      content = `
        <h2>Action Required on Your Account</h2>
        <p>Hi ${firstName},</p>
        <p>We reviewed your documents but unfortunately, they do not meet our requirements at this time.</p>
        <p>Please contact support for more details or re-upload valid documents.</p>
      `;
      break;
    case 'hold':
      subject = 'Your Verification is On Hold';
      content = `
        <h2>Update on Your Verification</h2>
        <p>Hi ${firstName},</p>
        <p>Your verification process has been placed on hold. We might need some additional information from you.</p>
        <p>Our support team will reach out to you shortly with more details.</p>
      `;
      break;
  }

  try {
    await resend.emails.send({
      from: 'VedaSync <onboarding@syncnodex.in>',
      to,
      subject,
      html: `
        ${content}
        <br/>
        <p>Best regards,</p>
        <p>The VedaSync Team</p>
      `
    });
  } catch (error) {
    console.error("Failed to send status update email:", error);
  }
}
