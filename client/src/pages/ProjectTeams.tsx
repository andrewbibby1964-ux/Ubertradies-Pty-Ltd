/* Design reminder: project-team content uses layered role bands and visible accountability boundaries, never a generic team-card grid. */
import PageIntro from "@/components/PageIntro";
import { AlertTriangle, ArrowDown } from "lucide-react";

const roles = [
  ["Developer or authorised client", "Defines authority, objectives, procurement route and accountable decisions."],
  ["Builder and principal contractors", "Controls delivery scope, contracting chains, site systems and construction obligations."],
  ["Architecture, engineering and design", "Carries discipline-specific competence, documentation, coordination and professional responsibility."],
  ["Certification, planning and surveying", "Maintains statutory independence and jurisdiction-specific decision boundaries."],
  ["Trades, specialists and plant", "Works only within applicable scope, licensing, competence, safety and supervision controls."],
  ["Labour, apprentices and trainees", "Requires a truthful relationship, lawful pay, appropriate supervision and safe work systems."],
  ["Technology and project systems", "Protects project data, access, cyber security, records and authorised communications."],
];

export default function ProjectTeams() {
  return (
    <>
      <PageIntro eyebrow="For developers and authorised project clients" title="One project can require a whole ecosystem of accountable roles." lead="The long-term roadmap recognises complete teams without blurring who designs, certifies, contracts, supervises, employs or performs the work." aside={<div className="mini-warning"><AlertTriangle /><p>No tender, brief, provider listing, team assembly, message, file or payment is accepted here.</p></div>} />
      <section className="team-map section-pad">
        <div className="team-map-head"><p className="eyebrow">Distinct roles · one visible gate map</p><h2>Accountability travels through the project.</h2></div>
        <div className="role-stack">
          {roles.map(([title, copy], index) => <article key={title}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{title}</h3><p>{copy}</p></div>{index < roles.length - 1 && <ArrowDown className="role-arrow" />}</article>)}
        </div>
      </section>
      <section className="project-rule section-pad"><strong>No single platform check can replace project governance.</strong><p>Real projects require direct verification, contracts, statutory processes, competent advice, site-specific risk controls and active oversight by the responsible parties.</p></section>
    </>
  );
}
