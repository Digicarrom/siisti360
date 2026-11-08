import React, { useState } from 'react';
import { Language, ReviewItem, REVIEWS } from '../data/content';
import { TRANSLATIONS } from '../data/translations';
import { Star, CheckCircle2, MessageSquarePlus, Send } from 'lucide-react';

interface ReviewsSectionProps {
  currentLang: Language;
  isStandalone?: boolean;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ currentLang, isStandalone = false }) => {
  const t = TRANSLATIONS[currentLang];
  const HeadingTag = isStandalone ? 'h1' : 'h2';
  const [reviewsList, setReviewsList] = useState<ReviewItem[]>(REVIEWS);

  // Review form states
  const [authorName, setAuthorName] = useState('');
  const [rating, setRating] = useState(5);
  const [commentText, setCommentText] = useState('');
  const [consent, setConsent] = useState(false);
  const [submittedMessage, setSubmittedMessage] = useState(false);

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !commentText.trim() || !consent) return;

    const newReview: ReviewItem = {
      id: `rev-${Date.now()}`,
      name: authorName.trim(),
      city: 'Pääkaupunkiseutu',
      service: 'Kotisiivous',
      rating,
      date: new Date().toISOString().split('T')[0],
      text: {
        fi: commentText.trim(),
        sv: commentText.trim(),
        en: commentText.trim(),
      },
    };

    setReviewsList((prev) => [newReview, ...prev]);
    setAuthorName('');
    setCommentText('');
    setConsent(false);
    setSubmittedMessage(true);
    setTimeout(() => setSubmittedMessage(false), 5000);
  };

  return (
    <section id="reviews" className="space-y-6">
      <div>
        <span className="text-[10.5px] font-[750] uppercase tracking-[1.55px] text-[#0d9d8c]">
          {t.reviews.badge}
        </span>
        <HeadingTag className="mt-1 text-2xl sm:text-3xl font-[780] tracking-[-0.045em] text-[#142c42] leading-[1.2]">
          {t.reviews.title}
        </HeadingTag>
        <p className="mt-1.5 text-[15px] sm:text-[16px] text-[#526a7d] max-w-2xl leading-[1.6]">{t.reviews.subtitle}</p>
      </div>

      {/* Reviews Cards Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {reviewsList.map((rev) => (
          <article
            key={rev.id}
            className="flex flex-col justify-between rounded-xl border border-[#e2e9ee] bg-white p-5 shadow-xs transition-shadow hover:shadow-md"
          >
            <div>
              <div className="flex items-center gap-1 text-[#f59e0b]">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < rev.rating ? 'fill-[#f59e0b] text-[#f59e0b]' : 'text-[#d1d5db]'
                    }`}
                  />
                ))}
              </div>

              <p className="mt-3 text-[14px] sm:text-[14.5px] text-[#334e68] leading-[1.625] italic">
                "{rev.text[currentLang] || rev.text.fi}"
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-[#f0f4f7] flex items-center justify-between text-xs">
              <div>
                <strong className="block text-[14px] font-bold text-[#142c42]">{rev.name}</strong>
                <span className="text-[12.5px] text-[#677c8d]">{rev.city}</span>
              </div>
              <span className="rounded bg-[#f5f8fa] px-2 py-0.5 text-[11.5px] font-medium text-[#718c9f] font-mono-numbers">
                {rev.date}
              </span>
            </div>
          </article>
        ))}
      </div>

      {/* Review Submission Form Card */}
      <div className="rounded-2xl border border-[#e2e9ee] bg-white p-6 shadow-xs">
        <div className="flex items-center gap-2 mb-3">
          <MessageSquarePlus className="h-5 w-5 text-[#0d9d8c]" />
          <h3 className="text-base sm:text-[17px] font-[780] text-[#142c42]">{t.reviews.leaveReviewTitle}</h3>
        </div>

        {submittedMessage && (
          <div className="mb-4 flex items-center gap-2 rounded-xl bg-[#e5f6f1] p-3 text-xs font-semibold text-[#087f72]">
            <CheckCircle2 className="h-4 w-4 shrink-0" />
            <span>{t.reviews.reviewSuccessMsg}</span>
          </div>
        )}

        <form onSubmit={handleReviewSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="rev-author" className="text-[13.5px] font-bold text-[#142c42]">
                {t.reviews.namePlaceholder}
              </label>
              <input
                id="rev-author"
                type="text"
                required
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                placeholder="Esim. Maija V., Helsinki"
                className="mt-1 w-full min-h-[44px] rounded-xl border border-[#ccd9e0] bg-[#f8fafb] px-3.5 py-2 text-sm text-[#142c42] focus:border-[#0d9d8c] focus:bg-white focus:outline-hidden"
              />
            </div>

            <div>
              <label htmlFor="rev-rating" className="text-[13.5px] font-bold text-[#142c42]">
                {t.reviews.ratingLabel}
              </label>
              <select
                id="rev-rating"
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                className="mt-1 w-full min-h-[44px] rounded-xl border border-[#ccd9e0] bg-[#f8fafb] px-3.5 py-2 text-sm font-medium text-[#142c42] focus:border-[#0d9d8c] focus:bg-white focus:outline-hidden"
              >
                <option value={5}>★★★★★ (5/5 Erinomainen)</option>
                <option value={4}>★★★★☆ (4/5 Hyvä)</option>
                <option value={3}>★★★☆☆ (3/5 Kohtalainen)</option>
                <option value={2}>★★☆☆☆ (2/5 Välttävä)</option>
                <option value={1}>★☆☆☆☆ (1/5 Heikko)</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="rev-comment" className="text-[13.5px] font-bold text-[#142c42]">
              {t.reviews.commentPlaceholder}
            </label>
            <textarea
              id="rev-comment"
              rows={3}
              required
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Kerro siivoustyön laadusta ja kokemuksestasi..."
              className="mt-1 w-full rounded-xl border border-[#ccd9e0] bg-[#f8fafb] px-3.5 py-2.5 text-sm text-[#142c42] focus:border-[#0d9d8c] focus:bg-white focus:outline-hidden"
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-2">
            <label className="flex items-center gap-2 text-[13px] text-[#526a7d] cursor-pointer">
              <input
                type="checkbox"
                required
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="h-4 w-4 rounded accent-[#0d9d8c]"
              />
              <span>{t.reviews.consentText}</span>
            </label>

            <button
              type="submit"
              className="flex items-center justify-center gap-1.5 min-h-[44px] rounded-xl bg-[#0d9d8c] px-5 py-2.5 text-[13.5px] font-[750] text-white hover:bg-[#09776b] transition-colors"
            >
              <span>{t.reviews.submitReviewBtn}</span>
              <Send className="h-3.5 w-3.5" />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};
