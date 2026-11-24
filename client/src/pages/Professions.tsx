/* Design reminder: profession discovery feels like an indexed field manual, with search for orientation but no live provider directory. */
import { useMemo, useState } from "react";
import PageIntro from "@/components/PageIntro";
import { Search, ShieldAlert } from "lucide-react";

const families = [
  { title: "Construction, trades & home services", examples: "Builders, electricians, plumbers, carpenters, landscapers, painters and specialist contractors.", checks: "Licensing, registration, insurance, permits, safety, supervision and contract requirements depend on the exact work and location." },
  { title: "Engineering, architecture & design", examples: "Engineers, architects, building designers, surveyors, planners and drafters.", checks: "Professional registration, protected titles, competence, design responsibility, conflicts and jurisdiction-specific building rules may apply." },
  { title: "Technology, cyber & computer repairs", examples: "Computer repairers, IT support, software specialists, network technicians and cyber professionals.", checks: "Device access, credentials, privacy, backups, data security, intellectual property and remote-access controls need clear scope." },
  { title: "Labour, logistics & operations", examples: "Labourers, warehouse workers, drivers, machine operators and operations teams.", checks: "The relationship must distinguish employment, labour hire and genuine contracting, with role-specific tickets, fatigue, safety and insurance controls." },
  { title: "Apprentices, trainees & entry pathways", examples: "School leavers, mature-age apprentices, trainees, learners and career changers.", checks: "Structured training, employer identity, supervision, pay, safety, training contracts and child protections may be essential." },
  { title: "Business & professional services", examples: "Accountants, lawyers, consultants, bookkeepers and project managers.", checks: "Professional authority, referrals, conflicts, confidentiality, advice boundaries, client money, complaints and insurance rules differ by profession." },
  { title: "Health, care & education", examples: "Nurses, educators, clinical facilitators, teachers, trainers and care professionals.", checks: "Registration, screening, safeguarding, sensitive-data privacy, incident response and clinical or educational boundaries require specialist review." },
  { title: "Creative, media & administration", examples: "Designers, writers, photographers, videographers and administrators.", checks: "Copyright, portfolio permission, confidentiality, media liability, worker status, accessibility and truthful advertising should be settled." },
  { title: "Hospitality, retail & personal services", examples: "Hospitality workers, retail teams, cleaners, beauty and personal-service businesses.", checks: "Awards, young-worker rules, hygiene, licensing, food safety, responsible service, public liability and local approvals may apply." },
];

export default function Professions() {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => families.filter((family) => `${family.title} ${family.examples} ${family.checks}`.toLowerCase().includes(query.toLowerCase())), [query]);
  return (
    <>
      <PageIntro eyebrow="Planned occupation families" title="From first skills to specialist practice." lead="Browse the broad work families in the long-term roadmap. These are information categories, not provider listings, vacancies or endorsements." aside={<div className="mini-warning"><ShieldAlert /><p>Every work type keeps its own legal, safety, insurance and professional boundaries.</p></div>} />
      <section className="profession-visual section-pad">
        <div className="profession-illustration" role="img" aria-label="Abstract editorial index representing nine distinct occupation families">
          {families.map((family, index) => <div className="profession-tile" key={family.title}><span>{String(index + 1).padStart(2, "0")}</span><strong>{family.title.split(" ")[0]}</strong><i /></div>)}
        </div>
        <div><p className="eyebrow light">One broad vision</p><h2>Many separate responsibilities.</h2><p>Uber Tradies is intended to make pathways easier to understand—not to collapse every kind of work into one set of rules.</p></div>
      </section>
      <section className="profession-index section-pad">
        <div className="index-toolbar"><div><p className="eyebrow">Public profession roadmap</p><h2>Explore every family</h2></div><label className="search-box"><Search /><span className="sr-only">Search profession families</span><input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search work, skills or checks" /></label></div>
        <div className="family-grid">
          {filtered.map((family, index) => <article key={family.title}><span>0{families.indexOf(family) + 1}</span><em>Information only</em><h3>{family.title}</h3><p className="examples">{family.examples}</p><p className="checks">{family.checks}</p></article>)}
          {filtered.length === 0 && <div className="empty-state"><strong>No matching family</strong><p>Try a broader occupation or skill term. This index does not search live jobs or providers.</p></div>}
        </div>
      </section>
    </>
  );
}
