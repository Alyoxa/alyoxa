import Link from "next/link";
import { insightPath, readingMinutes, type Insight } from "@/lib/insights";
import InsightArtwork from "./InsightArtwork";

export default function InsightCard({ post, number }: { post: Insight; number: number }) {
  return <article className="insight-card">
    <Link href={insightPath(post.slug)} className="insight-card__link">
      <InsightArtwork post={post} number={number} />
      <div className="insight-card__meta"><span>{post.category}</span><span>{readingMinutes(post)} MIN READ</span></div>
      <div className="insight-card__title"><h3>{post.title}</h3><span className="insight-arrow" aria-hidden="true">&#8599;</span></div>
      <p>{post.excerpt}</p>
    </Link>
  </article>;
}
