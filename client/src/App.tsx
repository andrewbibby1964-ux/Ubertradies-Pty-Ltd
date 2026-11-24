/* Design reminder: Civic Work Ledger — permanent public guide with explicit availability states and no faux marketplace actions. */
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import SiteLayout from "./components/SiteLayout";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import HowItWorks from "./pages/HowItWorks";
import Professions from "./pages/Professions";
import WorkReadiness from "./pages/WorkReadiness";
import ProjectTeams from "./pages/ProjectTeams";
import Safety from "./pages/Safety";
import AppHub from "./pages/AppHub";
import { Accessibility, Feedback, LaunchStatus, Privacy, Terms } from "./pages/PolicyPages";
import NotFound from "./pages/NotFound";

function Router() {
  return (
    <SiteLayout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/how-it-works" component={HowItWorks} />
        <Route path="/professions" component={Professions} />
        <Route path="/work-readiness" component={WorkReadiness} />
        <Route path="/project-teams" component={ProjectTeams} />
        <Route path="/safety" component={Safety} />
        <Route path="/app" component={AppHub} />
        <Route path="/privacy" component={Privacy} />
        <Route path="/terms" component={Terms} />
        <Route path="/accessibility" component={Accessibility} />
        <Route path="/feedback" component={Feedback} />
        <Route path="/launch-status" component={LaunchStatus} />
        <Route component={NotFound} />
      </Switch>
    </SiteLayout>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
