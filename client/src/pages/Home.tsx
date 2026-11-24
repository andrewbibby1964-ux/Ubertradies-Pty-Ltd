/* Design reminder: the home page is an editorial front cover—bold promise, visible limits, then a practical route through the gates. */
import { ArrowRight, BriefcaseBusiness, CheckCircle2, Compass, GraduationCap, ShieldCheck, Users } from "lucide-react";
import { Link } from "wouter";

const HERO_URL = "/images/ubertradies-hero-ledger.webp";

const pathways = [
  { icon: Compass, title: "Explore my options", copy: "See the kinds of work and profession families Uber Tradies is planning for.", link: "/professions" },
  { icon: GraduationCap, title: "Build my first skills", copy: "Understand lawful learning, supervision, qualifications and progression.", link: "/work-readiness" },
  { icon: BriefcaseBusiness, title: "Prepare to work independently", copy: "Learn what genuine independent work requires before a connection is considered.", link: "/work-readiness" },
  { icon: Users, title: "Plan a project team", copy: "See the roles, authority boundaries and evidence gates around complete projects.", link: "/project-teams" },
];

export default function Home() {
  return (
    <>
      <section className="hero">
        <img src={HERO_URL} alt="Illustrated group of skilled workers and professionals gathered around a project planning table" className="hero-art" />
        <div className="hero-overlay" />
        <div className="hero-copy">
          <p className="eyebrow light">Australia-first work and business roadmap</p>
          <h1>Every skill deserves the right connection.</h1>
          <p>Explore a clearer model for trades, professions, technology, labour, learning and accountable project teams. Guidance is open now. Real marketplace activity is not.</p>
          <div className="hero-actions">
            <Link href="/how-it-works" className="button signal">Explore the pathway <ArrowRight /></Link>
            <Link href="/launch-status" className="button ghost-light">What is available now</Link>
          </div>
          <p className="hero-footnote"><ShieldCheck size={17} /> Nothing on this site creates an account, request, application, booking or match.</p>
        </div>
        <div className="hero-stamp"><span>Permanent public guide</span><strong>AU</strong><small>Information only</small></div>
      </section>

      <section className="intro-ledger section-pad">
        <div>
          <p className="eyebrow">One front door for every stage</p>
          <h2>Start where you are. Move at the pace the work and law allow.</h2>
        </div>
        <p className="section-lead">Choose the description closest to your situation. Every route opens public information only—no profile, referral, job request or personal information is collected.</p>
      </section>

      <section className="pathway-cards section-pad" aria-labelledby="pathway-title">
        <div className="pathway-heading"><span>Interactive public guide</span><h2 id="pathway-title">What are you trying to do?</h2><p>Your choice stays on this website. Nothing is submitted or matched.</p></div>
        <div className="pathway-list">
          {pathways.map(({ icon: Icon, title, copy, link }, index) => (
            <Link href={link} className="pathway-card" key={title}>
              <span className="pathway-number">0{index + 1}</span><Icon />
              <div><h3>{title}</h3><p>{copy}</p></div><ArrowRight className="card-arrow" />
            </Link>
          ))}
        </div>
      </section>

      <section className="gate-section section-pad">
        <div className="gate-visual">
          <div className="pathway-illustration" role="img" aria-label="Four-stage pathway ending at a deliberately closed future connection gate">
            <div className="path-line" />
            {[
              ["01", "Explore", "OPEN"],
              ["02", "Prepare", "OPEN"],
              ["03", "Check", "OPEN"],
              ["04", "Connect", "HELD"],
            ].map(([number, label, status]) => <div className={`path-node ${status === "HELD" ? "held" : ""}`} key={number}><span>{number}</span><strong>{label}</strong><em>{status}</em></div>)}
            <div className="path-gate"><span>Future gate</span><i /></div>
          </div>
          <span className="image-caption">Illustrative pathway · no live connection</span>
        </div>
        <div className="gate-copy">
          <p className="eyebrow">A visible route through the gates</p>
          <h2>Four steps. One direction. No shortcuts.</h2>
          <ol className="gate-list">
            <li><span>01</span><div><strong>Explore</strong><p>Understand roles, work types and the boundaries that may apply.</p></div><em>Available</em></li>
            <li><span>02</span><div><strong>Prepare</strong><p>Find starting points for skills, supervision, qualifications and business readiness.</p></div><em>Available</em></li>
            <li><span>03</span><div><strong>Check</strong><p>Confirm the actual task, jurisdiction, authority, safety and written agreement.</p></div><em>Available</em></li>
            <li className="closed"><span>04</span><div><strong>Connect later</strong><p>Profiles, requests, matching, applications, bookings and payments stay unavailable.</p></div><em>Not live</em></li>
          </ol>
          <Link href="/how-it-works" className="text-link">See how the complete model is designed <ArrowRight /></Link>
        </div>
      </section>

      <section className="principles section-pad">
        <div className="principles-title"><p className="eyebrow light">Planned around clear roles</p><h2>A future connector—not your builder, employer, recruiter or adviser.</h2></div>
        <div className="principle-grid">
          <article><CheckCircle2 /><h3>Independent providers</h3><p>The planned model preserves genuine provider control of business arrangements and pricing.</p></article>
          <article><CheckCircle2 /><h3>Accountable opportunity owners</h3><p>Future vacancies and regulated services require identified, appropriately authorised parties.</p></article>
          <article><CheckCircle2 /><h3>Applicant-controlled sharing</h3><p>Any future résumé or application must go privately to a specific authorised opportunity owner.</p></article>
          <article><CheckCircle2 /><h3>No hidden guarantee</h3><p>Any later administrative review would not guarantee safety, quality, suitability or licence coverage.</p></article>
        </div>
      </section>

      <section className="closing-band section-pad">
        <div><p className="eyebrow">Permanent public release</p><h2>Useful now. Honest about what comes later.</h2></div>
        <p>This website is designed to remain available as a public information resource while legal, operational and technical gates for any future marketplace are assessed separately.</p>
        <Link href="/launch-status" className="button primary">View launch status <ArrowRight /></Link>
      </section>
    </>
  );
}
