/* Design reminder: explain availability as a numbered civic process, never as a sales funnel or live booking workflow. */
import PageIntro from "@/components/PageIntro";
import { ArrowRight, BookOpen, CheckSquare2, LockKeyhole, Route } from "lucide-react";
import { Link } from "wouter";

const stages = [
  { icon: BookOpen, n: "01", status: "Available now", title: "Explore", copy: "Use plain-language public guidance to understand occupation families, relationship types and common boundaries." },
  { icon: Route, n: "02", status: "Available now", title: "Prepare", copy: "Identify the skills, supervision, qualifications, authority, insurance and business preparation that may be relevant." },
  { icon: CheckSquare2, n: "03", status: "Available now", title: "Check", copy: "Confirm the real task, location, parties, scope, evidence, safety process and written terms with appropriate qualified support." },
  { icon: LockKeyhole, n: "04", status: "Not available", title: "Connect later", copy: "A future connection service would require separate legal approval, verified controls and an explicit owner launch decision." },
];

export default function HowItWorks() {
  return (
    <>
      <PageIntro eyebrow="How it is designed to work" title="A visible pathway, with the final gate kept closed." lead="The permanent public site explains the intended model without pretending that information is a marketplace, a licence check or a promise of work." aside={<div className="status-card"><span>Current release</span><strong>Steps 1–3</strong><p>Public guidance only</p></div>} />
      <section className="process-rail section-pad">
        {stages.map(({ icon: Icon, n, status, title, copy }) => (
          <article className={status === "Not available" ? "process-step unavailable" : "process-step"} key={n}>
            <div className="step-top"><span>{n}</span><em>{status}</em></div>
            <Icon />
            <h2>{title}</h2>
            <p>{copy}</p>
          </article>
        ))}
      </section>
      <section className="relationship-section section-pad">
        <div><p className="eyebrow light">Different relationships need different rules</p><h2>A quote is not a vacancy. An apprenticeship is not an independent contract.</h2></div>
        <div className="relationship-table" role="table" aria-label="Future relationship types">
          {["Business service quote", "Employee vacancy", "Apprenticeship or traineeship", "Professional introduction", "Project team invitation"].map((item, index) => (
            <div role="row" key={item}><span>0{index + 1}</span><strong>{item}</strong><p>Separate authority, information, safety and accountability checks required.</p></div>
          ))}
        </div>
      </section>
      <section className="info-callout section-pad"><div><strong>What this website does not do</strong><p>It does not verify providers, assess qualifications, make introductions, collect work requests, accept applications or form an agreement between parties.</p></div><Link href="/safety" className="button signal">Open the safety guide <ArrowRight /></Link></section>
    </>
  );
}
