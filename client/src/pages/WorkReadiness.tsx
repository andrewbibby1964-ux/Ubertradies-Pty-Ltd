/* Design reminder: readiness guidance is a progression map, not a score, credential or promise of work. */
import PageIntro from "@/components/PageIntro";
import { BadgeCheck, BookOpenCheck, Building2, ClipboardCheck, GraduationCap, Handshake } from "lucide-react";

const stages = [
  { icon: BookOpenCheck, title: "Explore honestly", copy: "Describe what you can currently do without presenting interest, exposure or informal experience as a qualification." },
  { icon: GraduationCap, title: "Learn with the right structure", copy: "Use recognised education, supervised practice, apprenticeships, traineeships or other lawful development paths where required." },
  { icon: ClipboardCheck, title: "Check the exact scope", copy: "Confirm which licences, registrations, tickets, supervision, insurance and safety controls apply to the real task and location." },
  { icon: Building2, title: "Prepare the business", copy: "For genuine independent work, establish the right entity, pricing, records, tax, insurance, contracts and operating controls." },
  { icon: BadgeCheck, title: "Keep evidence current", copy: "Do not rely on expired, borrowed, irrelevant or unverifiable documents. Evidence must match the person, business, work and jurisdiction." },
  { icon: Handshake, title: "Agree before work starts", copy: "Use a clear written scope, responsibilities, timing, price, change process, privacy terms and complaint or dispute pathway." },
];

export default function WorkReadiness() {
  return (
    <>
      <PageIntro eyebrow="Work-readiness hub" title="Preparation is a pathway, not a badge." lead="Use this guide to identify questions and evidence that may matter. It does not assess competence, grant authority, verify documents or certify readiness." aside={<div className="status-card"><span>Guide type</span><strong>Self-directed</strong><p>No answers are collected</p></div>} />
      <section className="readiness-timeline section-pad">
        {stages.map(({ icon: Icon, title, copy }, index) => <article key={title}><div className="timeline-marker"><span>0{index + 1}</span><Icon /></div><div><h2>{title}</h2><p>{copy}</p></div></article>)}
      </section>
      <section className="readiness-note section-pad"><div><p className="eyebrow light">Important distinction</p><h2>Learning, employment and independent business are not interchangeable.</h2></div><p>A person may move between these stages over time, but each relationship has different protections, responsibilities and evidence. A platform label cannot decide the true legal character of work.</p></section>
    </>
  );
}
