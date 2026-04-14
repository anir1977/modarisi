import { Resend } from "resend";

// From address: use verified domain in production, Resend sandbox for testing
const FROM = process.env.EMAIL_FROM ?? "Modarisi <onboarding@resend.dev>";

export async function sendWelcomeEmail(to: string, name: string) {
  if (!process.env.RESEND_API_KEY) {
    console.log("[sendWelcomeEmail] RESEND_API_KEY not set — skipping");
    return;
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const firstName = name.split(" ")[0];

  const html = `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Bienvenue sur Modarisi.ma</title>
</head>
<body style="margin:0;padding:0;background:#f8fafc;font-family:sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.06);">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#2563eb 0%,#1d4ed8 100%);padding:40px 40px 32px;text-align:center;">
              <div style="width:56px;height:56px;background:rgba(255,255,255,0.2);border-radius:16px;display:inline-flex;align-items:center;justify-content:center;margin-bottom:16px;">
                <span style="font-size:28px;">🎓</span>
              </div>
              <h1 style="color:#ffffff;font-size:26px;font-weight:700;margin:0 0 4px;">Bienvenue sur Modarisi.ma !</h1>
              <p style="color:rgba(255,255,255,0.8);font-size:14px;margin:0;">مرحباً بك في مدرسي</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:36px 40px;">
              <p style="font-size:16px;color:#374151;margin:0 0 20px;">Bonjour <strong>${firstName}</strong>,</p>

              <p style="font-size:15px;color:#6b7280;line-height:1.7;margin:0 0 20px;">
                Votre compte est activé. Votre enfant peut maintenant poser ses questions au tuteur IA Modarisi — en Darija ou en français, 24h/7j.
              </p>

              <div style="background:#eff6ff;border-radius:12px;padding:24px;margin-bottom:28px;">
                <p style="font-size:14px;font-weight:600;color:#1d4ed8;margin:0 0 12px;">📚 Ce que votre enfant peut faire :</p>
                <ul style="margin:0;padding-left:20px;color:#374151;font-size:14px;line-height:2;">
                  <li>Poser des questions sur toutes les matières du collège</li>
                  <li>Obtenir des explications en Darija ou en français</li>
                  <li>Recevoir des exercices adaptés à son niveau</li>
                  <li>5 questions gratuites par jour (plan Pro = illimité)</li>
                </ul>
              </div>

              <div style="text-align:center;margin-bottom:28px;">
                <a href="https://modarisi.ma/chat"
                   style="display:inline-block;background:#2563eb;color:#ffffff;font-size:15px;font-weight:600;padding:14px 32px;border-radius:12px;text-decoration:none;">
                  Démarrer le tuteur IA →
                </a>
              </div>

              <p style="font-size:13px;color:#9ca3af;text-align:center;margin:0;">
                Des questions ? Écrivez-nous sur WhatsApp ou répondez à cet email.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f8fafc;padding:20px 40px;text-align:center;border-top:1px solid #e5e7eb;">
              <p style="font-size:12px;color:#9ca3af;margin:0;">
                © 2026 Modarisi.ma · Tutorat IA pour collégiens marocains
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  const { error } = await resend.emails.send({
    from: FROM,
    to,
    subject: "Bienvenue sur Modarisi.ma 🎓",
    html,
  });

  if (error) {
    console.error("[sendWelcomeEmail] Resend error:", error);
  }
}
