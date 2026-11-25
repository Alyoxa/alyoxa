import data from "@/content/insights/posts.json";

export type InsightSection = {
  id: string;
  title: string;
  paragraphs: string[];
  bullets?: string[];
  table?: { headers: string[]; rows: string[][] };
};

export type Insight = {
  slug: string;
  title: string;
  seoTitle: string;
  description: string;
  category: string;
  primaryKeyword: string;
  supportingKeywords: string[];
  date: string;
  theme: string;
  motif: string;
  excerpt: string;
  intro: string;
  takeaway: string;
  sections: InsightSection[];
  questions: { question: string; answer: string }[];
  servicePath: string;
  serviceLabel: string;
  related: string[];
  sources: { label: string; url: string }[];
};

export const insights: Insight[] = data;
export const insightPath = (slug: string) => `/insights/${slug}` as const;
export const getInsight = (slug: string) => insights.find(post => post.slug === slug);
export function insightWordCount(post: Insight) {
  const text = [post.intro, post.takeaway, ...post.sections.flatMap(section => [
    section.title, ...section.paragraphs, ...(section.bullets ?? []),
    ...(section.table?.rows.flat() ?? []),
  ]), ...post.questions.flatMap(question => [question.question, question.answer])].join(" ");
  return text.trim().split(/\s+/).length;
}
export const readingMinutes = (post: Insight) => Math.max(1, Math.ceil(insightWordCount(post) / 200));
export const insightDate = (date: string) => new Intl.DateTimeFormat("en-GB", {
  day: "numeric", month: "long", year: "numeric", timeZone: "UTC",
}).format(new Date(`${date}T00:00:00Z`));
