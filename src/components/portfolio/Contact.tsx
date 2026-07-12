import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { useSettings } from "@/contexts/SettingsContext";
import { PROFILE } from "@/lib/portfolio-data";
import { SectionLabel } from "./About";
import { Mail, Phone, MessageCircle, Send, Copy } from "lucide-react";
import emailjs from "@emailjs/browser"; // 👇 استيراد مكتبة EmailJS

const Schema = z.object({
  name: z.string().trim().min(1, "Required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  message: z.string().trim().min(5, "Too short").max(2000),
});

export function Contact() {
  const { t } = useSettings();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = Schema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    setSending(true);

    // 👇 تجهيز البيانات لترسل بنفس الأسماء المتوقعة في الـ Template لديكِ
    const templateParams = {
      from_name: form.name,
      reply_to: form.email,
      message: form.message,
    };

    // 👇 الربط المباشر مع سيرفر EmailJS باستخدام بياناتكِ
    emailjs.send(
      'merro.3adel@gmail.com', // ⚠️ إذا لم يعمل، تأكدي من تغييره لـ Service ID المكتوب في حسابك (مثل service_xxx)
      'template_8gum8c2',      // الـ Template ID الخاص بكِ
      templateParams,
      'n4FnIr1cmuZEORr_I'      // الـ Public Key الخاص بكِ
    )
    .then(() => {
      toast.success(t("Message sent successfully! 🎉", "تم إرسال رسالتك بنجاح! 🎉"));
      setForm({ name: "", email: "", message: "" }); // تفريغ الحقول بعد النجاح
      setSending(false);
    })
    .catch((error) => {
      console.error("EmailJS Error:", error);
      toast.error(t("Failed to send, try again.", "للأسف فشل الإرسال، يرجى المحاولة مرة أخرى."));
      setSending(false);
    });
  };

  const copy = (txt: string) => {
    navigator.clipboard.writeText(txt);
    toast.success(t("Copied!", "تم النسخ!"));
  };

  return (
    <section id="contact" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-10">
          <SectionLabel>{t("Contact", "تواصل")}</SectionLabel>
          <h2 className="mt-3 text-3xl md:text-5xl font-bold">{t("Let's create something", "لنصنع شيئًا معًا")}</h2>
        </div>

        <div className="grid lg:grid-cols-5 gap-6">
          <div className="lg:col-span-2 space-y-3">
            <ContactCard icon={<Mail className="h-5 w-5" />} label={t("Email", "البريد")} value={PROFILE.email} onCopy={() => copy(PROFILE.email)} href={`mailto:${PROFILE.email}`} />
            <ContactCard icon={<MessageCircle className="h-5 w-5" />} label="Discord" value={PROFILE.discord} onCopy={() => copy(PROFILE.discord)} />
            <ContactCard icon={<Phone className="h-5 w-5" />} label={t("Phone", "الهاتف")} value={PROFILE.phone} onCopy={() => copy(PROFILE.phone)} href={`tel:${PROFILE.phone}`} />
          </div>

          <form onSubmit={submit} className="lg:col-span-3 glass-strong rounded-3xl p-6 md:p-8 space-y-4">
            <div>
              <label className="text-xs uppercase tracking-widest text-muted-foreground">{t("Name", "الاسم")}</label>
              <input
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                maxLength={100}
                className="mt-1 w-full bg-transparent border-b border-border focus:border-[var(--brand)] outline-none py-2"
                placeholder={t("Your name", "اسمك")}
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-widest text-muted-foreground">{t("Email", "البريد")}</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                maxLength={255}
                className="mt-1 w-full bg-transparent border-b border-border focus:border-[var(--brand)] outline-none py-2"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-widest text-muted-foreground">{t("Message", "الرسالة")}</label>
              <textarea
                rows={5}
                value={form.message}
                onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                maxLength={2000}
                className="mt-1 w-full bg-transparent border-b border-border focus:border-[var(--brand)] outline-none py-2 resize-none"
                placeholder={t("Tell me about your idea…", "أخبرني عن فكرتك…")}
              />
            </div>
            <button
              type="submit"
              disabled={sending}
              className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-gradient-brand text-primary-foreground py-3 font-medium shadow-glow hover:scale-[1.02] transition disabled:opacity-60"
            >
              <Send className="h-4 w-4" /> {sending ? t("Sending…", "جارٍ الإرسال…") : t("Send message", "إرسال")}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

function ContactCard({ icon, label, value, onCopy, href }: { icon: React.ReactNode; label: string; value: string; onCopy: () => void; href?: string }) {
  const Inner = (
    <div className="glass rounded-2xl p-5 flex items-center gap-4 hover-lift">
      <div className="grid place-items-center h-12 w-12 rounded-xl bg-gradient-brand text-primary-foreground">{icon}</div>
      <div className="flex-1 min-w-0">
        <div className="text-xs text-muted-foreground uppercase tracking-widest">{label}</div>
        <div className="truncate font-medium">{value}</div>
      </div>
      <button type="button" onClick={(e) => { e.preventDefault(); onCopy(); }} className="p-2 rounded-lg hover:bg-muted" aria-label="Copy">
        <Copy className="h-4 w-4" />
      </button>
    </div>
  );
  return href ? <a href={href}>{Inner}</a> : Inner;
}