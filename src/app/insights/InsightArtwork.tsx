import type { Insight } from "@/lib/insights";

// Decorative, code-native editorial artwork: no image download or client runtime.
export default function InsightArtwork({ post, number }: { post: Insight; number: number }) {
  return <div className={`insight-art insight-art--${post.theme}`} aria-hidden="true">
    <div className="insight-art__label"><span>ALYOXA / FIELD NOTES</span><span>NO. {String(number).padStart(2, "0")}</span></div>
    <svg className={`insight-art__drawing insight-art__drawing--${post.motif}`} viewBox="0 0 600 400" fill="none" focusable="false">
      {post.motif === "connection" ? <>
        <path d="M95 110H270V290H95zM330 110H505V290H330z" stroke="currentColor" strokeWidth="1" />
        <path d="M180 60L420 340M420 60L180 340" stroke="currentColor" strokeOpacity=".25" />
        <path d="M220 110L380 290M380 110L220 290" stroke="var(--art-accent)" strokeWidth="38" />
        <circle cx="300" cy="200" r="10" fill="currentColor" />
      </> : post.motif === "framework" ? <>
        {[0, 1, 2].map(row => [0, 1, 2].map(col => <rect key={`${row}-${col}`} x={145 + col * 108} y={65 + row * 93} width="94" height="79" rx="2" stroke="currentColor" strokeOpacity=".35" />))}
        <path d="M145 251L347 65H441V144L239 330H145z" fill="var(--art-accent)" />
        <path d="M145 65H441V330H145z" stroke="currentColor" />
      </> : post.motif === "layers" ? <>
        {[0, 1, 2, 3].map(index => <path key={index} d={`M130 ${170 + index * 34}L340 ${64 + index * 34}L475 ${144 + index * 34}L265 ${250 + index * 34}Z`} fill={index === 0 ? "var(--art-accent)" : "var(--art-bg)"} stroke="currentColor" strokeOpacity={1 - index * .2} />)}
        <path d="M130 95V345M475 70V320" stroke="currentColor" strokeOpacity=".2" strokeDasharray="3 7" />
      </> : post.motif === "flow" ? <>
        {Array.from({ length: 13 }, (_, index) => <path key={index} d={`M75 ${108 + index * 13}C220 ${315 + index * 5} 340 ${-30 + index * 7} 525 ${126 + index * 13}`} stroke={index > 5 && index < 9 ? "var(--art-accent)" : "currentColor"} strokeWidth={index > 5 && index < 9 ? 3 : 1} strokeOpacity={index > 5 && index < 9 ? 1 : .35} />)}
        <path d="M75 65V335M525 65V335" stroke="currentColor" strokeOpacity=".25" />
      </> : <>
        <path d="M100 290H480M100 200H480M100 110H480" stroke="currentColor" strokeOpacity=".2" />
        <path d="M135 285L260 160L330 230L460 100" stroke="var(--art-accent)" strokeWidth="45" strokeLinejoin="miter" />
        <path d="M345 100H460V215" stroke="currentColor" strokeWidth="2" />
        <path d="M100 65V335M500 65V335" stroke="currentColor" strokeOpacity=".25" />
      </>}
      <path d="M40 200H56M48 192V208M544 200H560M552 192V208" stroke="currentColor" strokeOpacity=".5" />
    </svg>
    <div className="insight-art__base"><span>{post.category}</span><span>THINKING / MAKING</span></div>
  </div>;
}
