import "./SectionEyebrow.css";

type Props = { index: string; category: string; children: React.ReactNode; className: string };

export default function SectionEyebrow({ index, category, children, className }: Props) {
  return <div className={`section-eyebrow ${className}`}>
    <span className="section-eyebrow__rule" aria-hidden="true" />
    <span className="section-eyebrow__index">{index} / {category}</span>
    <span className="section-eyebrow__divider" aria-hidden="true" />
    <span className="section-eyebrow__label">{children}</span>
  </div>;
}
