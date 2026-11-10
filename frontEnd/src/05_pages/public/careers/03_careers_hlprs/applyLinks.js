// The subject is always the ENGLISH title (owner decision D5): the CV workflow
// sorts the careers@ inbox by subject, and the job ads on LinkedIn/Indeed use
// the same "Head Chef – Vkusno" wording.
export const jobSubject = (job, common) => `${job.title.en} – ${common.brand}`;

export const generalSubject = (common) => `General application – ${common.brand}`;

// RFC 6068: spaces as %20 (encodeURIComponent, not "+"), line breaks as CRLF.
export const mailtoHref = (email, subject, body = "") =>
  `mailto:${email}?subject=${encodeURIComponent(subject)}` +
  (body ? `&body=${encodeURIComponent(body.replace(/\r?\n/g, "\r\n"))}` : "");

// Only when the owner gives a WhatsApp number for CVs (D3); otherwise no button at all.
export const whatsappHref = (digits, text) =>
  digits ? `https://wa.me/${digits}?text=${encodeURIComponent(text)}` : null;
