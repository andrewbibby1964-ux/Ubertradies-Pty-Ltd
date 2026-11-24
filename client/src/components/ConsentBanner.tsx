/* Design reminder: privacy is a first-class safety control; the choice must be plain, reversible and never pre-selected. */
import { useCallback, useEffect, useState } from "react";
import { Shield } from "lucide-react";
import { Link } from "wouter";

type Consent = "essential" | "analytics";

function setAnalytics(enabled: boolean) {
  const existing = document.getElementById("ubertradies-analytics");
  if (!enabled) {
    existing?.remove();
    return;
  }
  if (existing) return;
  const endpoint = import.meta.env.VITE_ANALYTICS_ENDPOINT;
  const websiteId = import.meta.env.VITE_ANALYTICS_WEBSITE_ID;
  if (!endpoint || !websiteId) return;
  const script = document.createElement("script");
  script.id = "ubertradies-analytics";
  script.defer = true;
  script.src = `${endpoint.replace(/\/$/, "")}/umami`;
  script.dataset.websiteId = websiteId;
  document.head.appendChild(script);
}

export default function ConsentBanner() {
  const [open, setOpen] = useState(false);

  const applyChoice = useCallback((choice: Consent) => {
    localStorage.setItem("ubertradies-privacy-choice", choice);
    setAnalytics(choice === "analytics");
    setOpen(false);
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("ubertradies-privacy-choice") as Consent | null;
    if (saved) setAnalytics(saved === "analytics");
    else setOpen(true);
    const reopen = () => setOpen(true);
    window.addEventListener("ubertradies:privacy", reopen);
    return () => window.removeEventListener("ubertradies:privacy", reopen);
  }, []);

  if (!open) return null;

  return (
    <aside className="consent-banner" aria-label="Privacy choices">
      <div className="consent-icon"><Shield /></div>
      <div className="consent-copy">
        <strong>Your privacy choice</strong>
        <p>Essential browser storage remembers this choice. Optional audience analytics remains off unless you allow it. <Link href="/privacy">Read the privacy notice.</Link></p>
      </div>
      <div className="consent-actions">
        <button type="button" className="button secondary" onClick={() => applyChoice("essential")}>Essential only</button>
        <button type="button" className="button primary" onClick={() => applyChoice("analytics")}>Allow analytics</button>
      </div>
    </aside>
  );
}
