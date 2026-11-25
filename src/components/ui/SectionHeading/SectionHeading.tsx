import "./SectionHeading.css";

type Props = {
  id: string;
  className: string;
  lines: readonly [string, string, string];
};

/** One typography system for the four editorial section introductions. */
export default function SectionHeading({ id, className, lines }: Props) {
  return <h2 id={id} className={`section-heading ${className}`}>
    {lines.map((line, index) => {
      const lineClass = `section-heading__line${index === 2 ? " section-heading__line--accent" : ""}`;
      return index === 2
        ? <em className={lineClass} key={line}>{line}</em>
        : <span className={lineClass} key={line}>{line}</span>;
    })}
  </h2>;
}
