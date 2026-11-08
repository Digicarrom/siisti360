import React, { useState } from 'react';
import { Language } from '../data/content';
import { TRANSLATIONS } from '../data/translations';
import { VisualBanner } from '../components/VisualBanner';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react';

interface ContactPageProps {
  currentLang: Language;
}

export const ContactPage: React.FC<ContactPageProps> = ({ currentLang }) => {
  const t = TRANSLATIONS[currentLang];
  const cp = t.contactPage;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;
    setIsSent(true);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      <VisualBanner
        type="helsinki"
        badge={cp.badge}
        title={cp.title}
        headingTag="h1"
      />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
        {/* Contact Info Cards */}
        <div className="space-y-4 md:col-span-5">
          <div className="rounded-2xl border border-[#e2e9ee] bg-white p-6 shadow-xs space-y-4">
            <h3 className="text-lg font-bold text-[#142c42]">{cp.h3}</h3>

            <div className="space-y-3 text-xs text-[#334e68]">
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#e5f6f1] text-[#0d9d8c]">
                  <Phone className="h-4 w-4" />
                </div>
                <div>
                  <span className="block text-[#677c8d]">{cp.phoneInfoLabel}</span>
                  <a
                    href="tel:+358401234567"
                    className="font-bold text-[#142c42] hover:text-[#0d9d8c] font-mono text-sm"
                  >
                    +358 40 123 4567
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#e5f6f1] text-[#0d9d8c]">
                  <Mail className="h-4 w-4" />
                </div>
                <div>
                  <span className="block text-[#677c8d]">{cp.emailInfoLabel}</span>
                  <a
                    href="mailto:asiakaspalvelu@siisti360.fi"
                    className="font-bold text-[#142c42] hover:text-[#0d9d8c]"
                  >
                    asiakaspalvelu@siisti360.fi
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#e5f6f1] text-[#0d9d8c]">
                  <MapPin className="h-4 w-4" />
                </div>
                <div>
                  <span className="block text-[#677c8d]">{cp.officeLabel}</span>
                  <strong className="text-[#142c42]">{cp.officeAddress}</strong>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#e5f6f1] text-[#0d9d8c]">
                  <Clock className="h-4 w-4" />
                </div>
                <div>
                  <span className="block text-[#677c8d]">{cp.hoursLabel}</span>
                  <strong className="text-[#142c42]">{cp.hoursVal}</strong>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-[#a5dbd2] bg-[#f0f9f6] p-5 text-xs text-[#1e584f] space-y-1">
            <strong className="block text-[#087f72] font-bold">{cp.coverageTitle}</strong>
            <p>{cp.coverageText}</p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="rounded-2xl border border-[#e2e9ee] bg-white p-6 md:p-8 shadow-xs md:col-span-7">
          <h3 className="text-xl font-bold text-[#142c42] mb-1">{cp.formTitle}</h3>
          <p className="text-xs text-[#677c8d] mb-4">{cp.formSubtitle}</p>

          {isSent ? (
            <div className="rounded-xl border border-[#a5dbd2] bg-[#f0f9f6] p-6 text-center space-y-2">
              <CheckCircle2 className="mx-auto h-8 w-8 text-[#0d9d8c]" />
              <h4 className="text-base font-bold text-[#142c42]">{cp.successTitle}</h4>
              <p className="text-xs text-[#526a7d]">{cp.successMsg}</p>
              <button
                onClick={() => {
                  setIsSent(false);
                  setName('');
                  setEmail('');
                  setMessage('');
                }}
                className="mt-3 rounded-xl bg-[#10263d] px-4 py-2 text-xs font-bold text-white hover:bg-[#1b3d5c] transition-colors"
              >
                {cp.newMsgBtn}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="contact-name" className="text-[13.5px] font-bold text-[#142c42]">
                    {cp.nameLabel}
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={cp.namePlaceholder}
                    className="mt-1.5 w-full min-h-[44px] rounded-xl border border-[#ccd9e0] px-3.5 py-2.5 text-sm text-[#142c42] focus:border-[#0d9d8c] focus:outline-hidden"
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="text-[13.5px] font-bold text-[#142c42]">
                    {cp.emailLabel}
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={cp.emailPlaceholder}
                    className="mt-1.5 w-full min-h-[44px] rounded-xl border border-[#ccd9e0] px-3.5 py-2.5 text-sm text-[#142c42] focus:border-[#0d9d8c] focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contact-phone" className="text-[13.5px] font-bold text-[#142c42]">
                  {cp.phoneLabel}
                </label>
                <input
                  id="contact-phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder={cp.phonePlaceholder}
                  className="mt-1.5 w-full min-h-[44px] rounded-xl border border-[#ccd9e0] px-3.5 py-2.5 text-sm text-[#142c42] focus:border-[#0d9d8c] focus:outline-hidden"
                />
              </div>

              <div>
                <label htmlFor="contact-msg" className="text-[13.5px] font-bold text-[#142c42]">
                  {cp.msgLabel}
                </label>
                <textarea
                  id="contact-msg"
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={cp.msgPlaceholder}
                  className="mt-1.5 w-full rounded-xl border border-[#ccd9e0] p-3 text-sm text-[#142c42] focus:border-[#0d9d8c] focus:outline-hidden"
                />
              </div>

              <button
                type="submit"
                className="flex items-center justify-center gap-2 min-h-[45px] rounded-xl bg-[#0d9d8c] px-6 py-2.5 text-[14px] font-[750] text-white hover:bg-[#09776b] transition-colors touch-target shadow-xs"
              >
                <span>{cp.sendBtn}</span>
                <Send className="h-4 w-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
