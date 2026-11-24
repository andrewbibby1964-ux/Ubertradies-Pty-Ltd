/* Design reminder: even an error page should feel like a useful field-note, with one clear route back. */
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";

export default function NotFound() {
  return <section className="not-found paper-grid"><p className="eyebrow">404 · Route not found</p><h1>This path is not on the public roadmap.</h1><p>The page may have moved, or the feature may not be available in this information-only release.</p><Link href="/" className="button primary"><ArrowLeft /> Return home</Link></section>;
}
