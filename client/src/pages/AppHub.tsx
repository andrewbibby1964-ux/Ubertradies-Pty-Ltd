/* Design reminder: the app hub is a public ledger of availability, not a download screen or a working app. */
import PageIntro from "@/components/PageIntro";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowRight, ClipboardList, Globe, ShieldCheck, Smartphone } from "lucide-react";
import { Link } from "wouter";

const faqs = [
  {
    id: "timeline",
    question: "When will the iPhone and Android apps be released?",
    answer: (
      <>
        <p>No release date has been set. Both native apps are still <strong>not yet released</strong>, and neither is available in the App Store or Google Play.</p>
        <p>A release would follow these stages. Dates will be published only once they are confirmed.</p>
        <ol className="app-hub-faq-timeline">
          <li><strong>Now — public website.</strong> Information and guidance are available on this website.</li>
          <li><strong>In preparation — native companion.</strong> A separate companion app is being planned and built. It is not available to download.</li>
          <li><strong>Before release — review and testing.</strong> Privacy, security, safety, store and owner approval checks must be completed.</li>
          <li><strong>Release — verified store listings.</strong> Official App Store and Google Play links will be added here only after the listings are live.</li>
        </ol>
      </>
    ),
  },
  {
    id: "where-download",
    question: "Where can I download the app today?",
    answer: <p>There is no native app to download yet. Do not install files that claim to be an Uber Tradies APK or app from an unofficial source. Official store links will appear on this page when the apps are released.</p>,
  },
  {
    id: "iphone-shortcut",
    question: "How do I add the temporary shortcut on iPhone?",
    answer: (
      <>
        <ol>
          <li>Open this website in <strong>Safari</strong>.</li>
          <li>Tap the <strong>Share</strong> button. It looks like a square with an upward arrow.</li>
          <li>Scroll the menu and tap <strong>Add to Home Screen</strong>.</li>
          <li>Check the name, then tap <strong>Add</strong>.</li>
        </ol>
        <p>The menu wording can vary between iOS versions. If the option is missing, bookmark the website instead.</p>
      </>
    ),
  },
  {
    id: "android-shortcut",
    question: "How do I add the temporary shortcut on Android?",
    answer: (
      <>
        <ol>
          <li>Open this website in <strong>Chrome</strong>.</li>
          <li>Tap the <strong>three-dot menu</strong> in the top corner.</li>
          <li>Tap <strong>Add to Home screen</strong>.</li>
          <li>Confirm the name, then tap <strong>Add</strong>. Your phone may ask where to place it.</li>
        </ol>
        <p>Other browsers and device makers use different wording. If the option is missing, bookmark the website instead.</p>
      </>
    ),
  },
  {
    id: "shortcut-difference",
    question: "Is the browser shortcut the same as the app?",
    answer: <p>No. The shortcut simply opens this website in your browser. It does not install the native companion, work offline, send notifications or create an account. You can remove it at any time like any other home-screen icon.</p>,
  },
  {
    id: "remove-shortcut",
    question: "Will the shortcut keep working after the apps are released?",
    answer: <p>The shortcut will keep opening the website while the website remains available. When the native apps are released, you can choose to install them from the official store listing and remove the browser shortcut.</p>,
  },
];

export default function AppHub() {
  return (
    <div className="app-hub">
      <PageIntro
        eyebrow="App information hub"
        title="The public guide today. A companion is planned."
        lead="Read what is available, what is planned and how to keep this website handy. This page does not install a native app or open a marketplace service."
        aside={
          <div className="status-card">
            <span>Available here</span>
            <strong>Information only</strong>
            <p>No native app downloads</p>
          </div>
        }
      />

      <section className="app-hub-availability section-pad" aria-labelledby="app-availability-heading">
        <div className="app-hub-section-heading">
          <p className="eyebrow">01 / Native app availability</p>
          <h2 id="app-availability-heading">Not in the stores yet.</h2>
          <p>Neither native app has been released. There are no app-store links, APK files or native downloads available here. No release date is promised.</p>
        </div>
        <div className="app-hub-store-grid">
          <article className="app-hub-store" aria-labelledby="app-iphone-heading">
            <Smartphone aria-hidden="true" />
            <div>
              <h3 id="app-iphone-heading">iPhone</h3>
              <p className="app-hub-store-name">App Store</p>
              <p className="app-hub-status">Not yet released</p>
            </div>
          </article>
          <article className="app-hub-store" aria-labelledby="app-android-heading">
            <Smartphone aria-hidden="true" />
            <div>
              <h3 id="app-android-heading">Android</h3>
              <p className="app-hub-store-name">Google Play</p>
              <p className="app-hub-status">Not yet released</p>
            </div>
          </article>
        </div>
      </section>

      <section className="app-hub-faq section-pad" aria-labelledby="app-faq-heading">
        <div className="app-hub-section-heading">
          <p className="eyebrow">Questions / Release and shortcuts</p>
          <h2 id="app-faq-heading">App release FAQ.</h2>
          <p>Open a question to learn about the release timeline and how to add a temporary browser shortcut.</p>
        </div>
        <Accordion type="single" collapsible defaultValue="timeline" className="app-hub-faq-list">
          {faqs.map((faq, index) => (
            <AccordionItem key={faq.id} value={faq.id} className="app-hub-faq-item">
              <AccordionTrigger className="app-hub-faq-trigger">
                <span className="app-hub-faq-number">{String(index + 1).padStart(2, "0")}</span>
                <span className="app-hub-faq-question">{faq.question}</span>
              </AccordionTrigger>
              <AccordionContent className="app-hub-faq-answer">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      <section className="app-hub-plans section-pad" aria-labelledby="app-plans-heading">
        <div className="app-hub-section-heading">
          <p className="eyebrow">02 / Separate native companion</p>
          <h2 id="app-plans-heading">Private preparation, not a submitted request.</h2>
          <p>A separate native companion is planned. The ideas below are planned, not available here; they are not functions of this public website.</p>
        </div>
        <div className="app-hub-plan-grid">
          <article>
            <ClipboardList aria-hidden="true" />
            <h3>Offline customer job briefs</h3>
            <p className="app-hub-plan-status">Planned, not available here</p>
            <p>The planned companion would help customers prepare a job brief privately, including offline preparation. A private draft would not be a job request submitted to a tradie.</p>
          </article>
          <article>
            <ShieldCheck aria-hidden="true" />
            <h3>Private tradie readiness</h3>
            <p className="app-hub-plan-status">Planned, not available here</p>
            <p>Private preparation tools are planned to help tradies organise readiness questions. Preparation is not verification, a qualification, approval to work or a promise of jobs.</p>
          </article>
        </div>
        <p className="app-hub-boundary"><strong>The public website remains information-only.</strong> No accounts, job submission, matching, bookings or payments are available here.</p>
      </section>

      <section className="app-hub-shortcuts section-pad" aria-labelledby="app-shortcuts-heading">
        <div className="app-hub-section-heading">
          <p className="eyebrow">03 / Keep the website handy</p>
          <h2 id="app-shortcuts-heading">A browser shortcut, where available.</h2>
          <p>You may be able to add a shortcut to this website on your home screen. The option and wording depend on your browser and device.</p>
        </div>
        <div className="app-hub-shortcut-grid">
          <article>
            <h3>iPhone · Safari</h3>
            <ol>
              <li>Open this website in Safari.</li>
              <li>Open the <strong>Share</strong> menu.</li>
              <li>Choose <strong>Add to Home Screen</strong>, where available, and follow the browser instructions.</li>
            </ol>
          </article>
          <article>
            <h3>Android · Chrome</h3>
            <ol>
              <li>Open this website in Chrome.</li>
              <li>Open the Chrome menu.</li>
              <li>Choose <strong>Add to Home screen</strong>, where available, and follow the browser instructions.</li>
            </ol>
          </article>
        </div>
        <aside className="app-hub-shortcut-note" aria-label="Browser shortcut limitations">
          <Globe aria-hidden="true" />
          <p><strong>A shortcut is only a convenient way back to the website.</strong> It is not the native companion and does not guarantee offline access. This website has no web app manifest, service worker or site-provided install prompt. If your browser does not offer a home-screen shortcut, use a bookmark instead.</p>
        </aside>
      </section>

      <section className="app-hub-guidance section-pad" aria-labelledby="app-guidance-heading">
        <div className="app-hub-section-heading">
          <p className="eyebrow">04 / Read the public guidance</p>
          <h2 id="app-guidance-heading">Clear boundaries before any next step.</h2>
        </div>
        <nav className="app-hub-links" aria-label="App hub related guidance">
          <Link href="/launch-status">Launch status <ArrowRight aria-hidden="true" /></Link>
          <Link href="/work-readiness">Work-readiness guide <ArrowRight aria-hidden="true" /></Link>
          <Link href="/privacy">Privacy notice <ArrowRight aria-hidden="true" /></Link>
          <Link href="/safety">Safety guidance <ArrowRight aria-hidden="true" /></Link>
        </nav>
      </section>
    </div>
  );
}
