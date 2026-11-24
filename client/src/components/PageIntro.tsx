/* Design reminder: every page begins like a printed public guide—status label, decisive serif title, concise plain-language lead. */
import type { ReactNode } from "react";

export default function PageIntro({ eyebrow, title, lead, aside }: { eyebrow: string; title: string; lead: string; aside?: ReactNode }) {
  return (
    <section className="page-intro paper-grid">
      <div className="page-intro-copy">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="lead">{lead}</p>
      </div>
      {aside && <aside className="page-intro-aside">{aside}</aside>}
    </section>
  );
}
