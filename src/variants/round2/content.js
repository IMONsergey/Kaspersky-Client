export const chapters = [
  { id: "priority", number: "01", label: "The priority" },
  { id: "shifts", number: "02", label: "The four cyber shifts" },
  { id: "agenda", number: "03", label: "The 90-day agenda" },
  { id: "download", number: "04", label: "Download" },
];

export const shifts = [
  "AI accelerating attacks",
  "Governance of human and non-human identity",
  "SaaS ecosystems and supply chain exposure",
  "Attacks on AI, data leakage",
];

export const evidence = [
  "The potential business impact",
  "The decisions that require executive attention",
  "The functions to involve",
  "The actions to initiate within 30, 60 and 90 days",
  "The evidence leadership requires to assess progress",
];

export const agenda = [
  {
    days: "30",
    title: "Establish visibility via critical, urgent tasks",
    copy: "What to fund in the first 30 days to block threats.",
  },
  {
    days: "60",
    title: "Strengthen and test once critical tasks are completed",
    copy: "How to strengthen and test at 60 days.",
  },
  {
    days: "90",
    title: "Validate and embed at a more measured pace",
    copy: "How to lower the temperature at 90 days.",
  },
];

export const hero = {
  title: "Focus your cyber budget on the four shifts that matter most",
  lead: "As you plan next year’s budget, the challenge isn’t deciding whether to spend on cybersecurity, but where to spend.",
  support: "Kaspersky has identified the four cyber shifts expected to have the greatest impact on businesses worldwide through late 2026 and early 2027 — turning them into a practical 90-day action plan.",
  cta: "Get your priorities for the next 90 days",
};

export const shiftHeading = "Understand the four shifts reshaping business risk";
export const agendaHeading = "From four shifts to one business agenda: Why the next 90 days?";
export const agendaLead = "Cyber risk is changing faster than many business controls, leading many cyber strategies to treat everything as “urgent”.";
export const downloadHeading = "Start reducing cyber risk in the next 90 days";

export const assetUrl = (path) => `${import.meta.env.BASE_URL}${path}`;

export function scrollToChapter(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}
