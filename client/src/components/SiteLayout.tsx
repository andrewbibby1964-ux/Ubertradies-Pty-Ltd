/* Design reminder: Civic Work Ledger — editorial cream, eucalyptus ink, visible status labels, asymmetric public-guide structure. */
import { useEffect, useState, type ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { ArrowUpRight, Mail, Menu, ShieldCheck, X } from "lucide-react";
import ConsentBanner from "./ConsentBanner";

const LOGO_URL = "/images/ubertradies-mark.webp";

const navItems = [
  ["How it works", "/how-it-works"],
  ["Professions", "/professions"],
  ["Work readiness", "/work-readiness"],
  ["Project teams", "/project-teams"],
  ["Safety", "/safety"],
] as const;

function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => window.scrollTo({ top: 0, behavior: "instant" }), [location]);
  return null;
}

export default function SiteLayout({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => setMenuOpen(false), [location]);

  return (
    <div className="site-shell">
      <ScrollToTop />
      <a className="skip-link" href="#main-content">Skip to content</a>

      <header className="site-header">
        <div className="header-inner">
          <Link href="/" className="brand-lockup" aria-label="Uber Tradies home">
            <img src={LOGO_URL} alt="" className="brand-mark" />
            <span className="brand-words"><strong>Uber</strong><em>Tradies</em><small>Australia-first work pathways</small></span>
          </Link>

          <nav className="desktop-nav" aria-label="Primary navigation">
            {navItems.map(([label, href]) => (
              <Link key={href} href={href} className={location === href ? "active" : ""}>{label}</Link>
            ))}
          </nav>

          <div className="header-actions">
            <Link href="/launch-status" className="status-pill"><span /> Information only</Link>
            <button className="menu-button" type="button" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <nav className="mobile-nav" aria-label="Mobile navigation">
            {navItems.map(([label, href], index) => (
              <Link key={href} href={href}><span>0{index + 1}</span>{label}<ArrowUpRight size={17} /></Link>
            ))}
            <Link href="/launch-status"><span>06</span>Launch status<ArrowUpRight size={17} /></Link>
            <Link href="/app"><span>07</span>Apps & web access<ArrowUpRight size={17} /></Link>
          </nav>
        )}
      </header>

      <div className="public-notice" role="status">
        <div><ShieldCheck size={17} /><strong>Public guidance only.</strong></div>
        <p>No requests, profiles, vacancies, applications, bookings, matching or payments are accepted in this release.</p>
        <Link href="/launch-status">Read status <ArrowUpRight size={14} /></Link>
      </div>

      <main id="main-content">{children}</main>

      <footer className="site-footer">
        <div className="footer-brand">
          <img src={LOGO_URL} alt="" />
          <div><strong>Uber Tradies</strong><p>A clearer path toward safer work connections.</p></div>
        </div>
        <div className="footer-grid">
          <section>
            <p className="footer-label">Explore</p>
            <Link href="/how-it-works">How it works</Link>
            <Link href="/professions">Profession roadmap</Link>
            <Link href="/work-readiness">Work-readiness hub</Link>
            <Link href="/project-teams">Project teams</Link>
            <Link href="/app">Apps & web access</Link>
          </section>
          <section>
            <p className="footer-label">Safety & policy</p>
            <Link href="/safety">Safer participation</Link>
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/accessibility">Accessibility</Link>
          </section>
          <section>
            <p className="footer-label">Contact</p>
            <a href="mailto:ubertradieshelp@gmail.com"><Mail size={15} /> ubertradieshelp@gmail.com</a>
            <Link href="/feedback">Website feedback</Link>
            <Link href="/launch-status">Launch status</Link>
            <button type="button" onClick={() => window.dispatchEvent(new Event("ubertradies:privacy"))}>Privacy choices</button>
          </section>
        </div>
        <div className="footer-bottom">
          <p>© 2026 Uber Tradies. Australian information-only public release.</p>
          <p>No live matching, booking, payment, provider verification or work guarantee.</p>
        </div>
      </footer>
      <ConsentBanner />
    </div>
  );
}
