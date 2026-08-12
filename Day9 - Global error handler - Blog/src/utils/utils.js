export function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export function getOtpHtml(otp) {
  return `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 30px; background: #f7fafc; color: #111827; border-radius: 20px; box-shadow: 0 24px 60px rgba(15, 23, 42, 0.08);">
            <div style="text-align: center; background: #ffffff; padding: 32px; border-radius: 18px; border: 1px solid #e5e7eb;">
                <p style="margin: 0 0 12px; font-size: 13px; letter-spacing: 0.18em; text-transform: uppercase; color: #6b7280;">One-time verification code</p>
                <h1 style="margin: 0 0 16px; font-size: 28px; font-weight: 700; color: #111827;">Verify your account</h1>
                <p style="margin: 0 0 28px; font-size: 16px; line-height: 1.6; color: #4b5563;">Use the code below to complete your login or signup. It expires in 10 minutes.</p>
                <div style="display: inline-block; padding: 24px 34px; background: #eef2ff; border-radius: 16px; border: 1px solid #c7d2fe; font-size: 36px; letter-spacing: 8px; font-weight: 800; color: #4338ca;">
                    ${otp}
                </div>
            </div>
            <div style="margin-top: 28px; font-size: 14px; line-height: 1.75; color: #6b7280;">
                <p style="margin: 0 0 10px;">If you did not request this code, please ignore this message.</p>
                <p style="margin: 0;">This code is valid for 10 minutes and can only be used once.</p>
            </div>
        </div>
    `;
}

