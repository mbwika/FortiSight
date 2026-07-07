import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import {
  ShieldCheck, Boxes, GitBranch, Network, ScrollText, FileCheck2,
  Play, Check, Mail, ExternalLink, AlertTriangle, Radar,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Turnstile } from "./Turnstile";

const REPORT_URL = "/reports/aiaf-section9-report.html";

const capabilities = [
  "AI-BOM (CycloneDX)", "Provenance scoring", "RAG taint gates",
  "Agent authorization", "Egress firewall", "garak / PyRIT red-teaming",
  "Deployment verification", "Incident packages", "Compliance evidence packs",
  "SIEM / OSCAL / SARIF export",
];

const problems = [
  {
    icon: Boxes,
    title: "You don't know what's in your AI systems",
    body: "Models, prompts, tools, RAG indexes, guardrails, and evaluators go undocumented. AIAF generates a signed AI Bill of Materials (CycloneDX) for every system.",
  },
  {
    icon: ShieldCheck,
    title: "Unknown models get adopted on trust",
    body: "AIAF runs intake triage: provenance scoring, serialization scanning, and live behavioral plus garak/PyRIT red-team probes, then returns an evidence-backed adoption verdict.",
  },
  {
    icon: Radar,
    title: "Poisoned RAG content reaches the model",
    body: "Trust and taint labels, injection findings, and a pre-model gate (ALLOW / FLAG / DENY) stop untrusted retrieved context before it influences an answer.",
  },
  {
    icon: Network,
    title: "Agents act with excessive authority",
    body: "Tool-authorization verdicts, an egress firewall, and a tamper-evident action ledger bound what agents can do, and record every decision as evidence.",
  },
  {
    icon: GitBranch,
    title: "What runs in prod drifts from what you approved",
    body: "Deployment verification compares the live system to the registered AI-BOM: artifact/container digests, system-prompt hash, tool and guardrail drift, Sigstore.",
  },
  {
    icon: ScrollText,
    title: "Compliance is narrative, not proof",
    body: "Controls map to NIST AI RMF, OWASP LLM Top 10, MITRE ATLAS, ISO 42001, and EU AI Act, and export as audit-ready evidence packs, not slideware.",
  },
];

const screenshots = [
  { src: "/aiaf/9_1_ai_bom_detail_view_registry.webp", title: "AI-BOM detail view", caption: "Model identity, runtime components, dependencies, and deployment artifact." },
  { src: "/aiaf/9_2_adoption_triage_report.webp", title: "Model adoption triage", caption: "Provenance score, risk caps, blocking issues, and adoption verdict." },
  { src: "/aiaf/9_3_rag_taint_assessment_api_explorer.webp", title: "RAG taint assessment", caption: "Trust labels, taint labels, injection findings, and pre-model gate decisions." },
  { src: "/aiaf/9_4_agent_authorization_decision_api_explorer.webp", title: "Agent authorization", caption: "Agent identity, requested capability, policy verdict, and ledger entry." },
  { src: "/aiaf/9_7_compliance_evidence_pack.webp", title: "Compliance evidence pack", caption: "Per-framework coverage, control status, evidence references, and gaps." },
  { src: "/aiaf/9_8_assurance_dashboard.webp", title: "Assurance dashboard", caption: "Portfolio inventory, active findings, risk trends, and control coverage." },
];

const communityFeatures = [
  "Full framework, CLI, REST API & dashboard",
  "AI-BOM generation & CycloneDX export",
  "Intake triage + garak / PyRIT red-teaming",
  "RAG taint gates & agent authorization",
  "Deployment verification & incident packages",
  "Compliance evidence packs (NIST, OWASP, ISO 42001, EU AI Act)",
  "SIEM / OSCAL / SARIF exports · SQLite",
];

const professionalFeatures = [
  "Everything in Community, plus:",
  "SSO (OIDC/SAML) & enforced RBAC",
  "Multi-project / team isolation",
  "Scheduled & continuous assessments",
  "Jira / ServiceNow / SIEM connectors",
  "Signed report snapshots · Postgres / HA",
  "Priority support & onboarding",
];

export function AIAF() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: "success" | "error" | null; message: string }>({ type: null, message: "" });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formElement = e.currentTarget;
    const data = new FormData(formElement);

    if (!data.get("firstName") || !data.get("email") || !data.get("message") || !data.get("privacy")) {
      toast.error("Please fill in the required fields and accept the privacy policy.");
      return;
    }
    if (!data.get("cf-turnstile-response")) {
      toast.error("Please complete the CAPTCHA verification.");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });
    try {
      const response = await fetch("/api/contact", { method: "POST", body: data });
      if (response.ok) {
        setSubmitStatus({ type: "success", message: "Thanks! Your pilot request has been sent. We'll be in touch within one business day." });
        formElement.reset();
      } else {
        const msg = await response.text();
        setSubmitStatus({ type: "error", message: msg || "Failed to send. Please try again." });
      }
    } catch {
      setSubmitStatus({ type: "error", message: "Failed to send. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="aiaf" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 space-y-20">

        {/* Intro */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
            <span className="text-sm text-primary">Open Source · Apache-2.0</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold">AIAF: the AI Assurance Framework</h2>
          <p className="text-lg text-muted-foreground">
            Continuous, evidence-driven security assurance for AI systems. AIAF turns AI
            security controls (across the model supply chain, RAG, agents, runtime,
            deployment, and compliance) into audit-ready technical evidence.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <Button size="lg" onClick={() => document.getElementById("aiaf-pilot")?.scrollIntoView({ behavior: "smooth" })}>
              Request a demo / pilot
            </Button>
            <Button size="lg" variant="outline" onClick={() => window.open(REPORT_URL, "_blank", "noopener,noreferrer")}>
              View sample report <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* What AIAF is */}
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h3 className="text-2xl font-bold">What AIAF is</h3>
          <p className="text-muted-foreground leading-7">
            AIAF is an open-source control plane that binds AI security controls to evidence
            objects. Instead of one-off scans or policy narratives, it produces measurable,
            traceable artifacts before deployment, at runtime, during incidents, and for
            governance. It connects the full AI lifecycle in one system of record.
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {capabilities.map((c) => (
              <span key={c} className="px-3 py-1 rounded-full border bg-background text-sm">{c}</span>
            ))}
          </div>
        </div>

        {/* Problems it solves */}
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-bold">What problems it solves</h3>
            <p className="text-muted-foreground">Six gaps that today's AI security tools leave open.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {problems.map((p) => (
              <Card key={p.title} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6 space-y-3">
                  <div className="w-11 h-11 bg-primary/10 rounded-lg flex items-center justify-center">
                    <p.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h4 className="font-semibold">{p.title}</h4>
                  <p className="text-sm text-muted-foreground leading-6">{p.body}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Screenshots */}
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-bold">Screenshots</h3>
            <p className="text-muted-foreground">Real artifacts from a live AIAF assessment. Click any image to enlarge.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {screenshots.map((s) => (
              <a key={s.src} href={s.src} target="_blank" rel="noreferrer" className="group block">
                <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full">
                  <div className="h-48 overflow-hidden bg-muted">
                    <img
                      src={s.src}
                      alt={s.title}
                      loading="lazy"
                      className="w-full h-full object-cover object-top group-hover:scale-[1.02] transition-transform"
                    />
                  </div>
                  <CardContent className="pt-4 space-y-1">
                    <h4 className="font-semibold text-sm">{s.title}</h4>
                    <p className="text-xs text-muted-foreground leading-5">{s.caption}</p>
                  </CardContent>
                </Card>
              </a>
            ))}
          </div>
        </div>

        {/* Demo video (placeholder) */}
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-bold">Short demo</h3>
            <p className="text-muted-foreground">A two-minute walkthrough of an end-to-end assessment.</p>
          </div>
          <div className="relative aspect-video rounded-xl border-2 border-dashed border-primary/30 bg-primary/5 flex flex-col items-center justify-center gap-3 text-center px-6">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Play className="h-8 w-8 text-primary" />
            </div>
            <p className="font-medium">Demo video coming soon</p>
            <p className="text-sm text-muted-foreground max-w-md">
              In the meantime, explore the full sample assessment report below or request a live walkthrough.
            </p>
            <Button variant="outline" size="sm" onClick={() => window.open(REPORT_URL, "_blank", "noopener,noreferrer")}>
              Open sample report <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Community vs Professional */}
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-bold">Community vs Professional</h3>
            <p className="text-muted-foreground">Start free and self-hosted. Upgrade when you need the enterprise control plane.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Card className="flex flex-col">
              <CardHeader>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 w-fit mb-2">
                  <span className="text-xs text-primary">Apache-2.0 · Free</span>
                </div>
                <CardTitle>Community</CardTitle>
                <p className="text-sm text-muted-foreground">Self-hosted open source for security teams.</p>
              </CardHeader>
              <CardContent className="flex flex-col flex-1 justify-between space-y-6">
                <ul className="space-y-2">
                  {communityFeatures.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Button variant="outline" className="w-full" onClick={() => window.open("https://github.com/mbwika/AI-Assurance-Framework", "_blank", "noopener,noreferrer")}>
                  View on GitHub <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            <Card className="flex flex-col border-primary shadow-md">
              <CardHeader>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary text-primary-foreground w-fit mb-2">
                  <span className="text-xs">Self-hosted · Paid</span>
                </div>
                <CardTitle>Professional</CardTitle>
                <p className="text-sm text-muted-foreground">The enterprise control plane, on your infrastructure.</p>
              </CardHeader>
              <CardContent className="flex flex-col flex-1 justify-between space-y-6">
                <ul className="space-y-2">
                  {professionalFeatures.map((f, i) => (
                    <li key={f} className={`flex items-start gap-2 text-sm ${i === 0 ? "font-medium" : ""}`}>
                      {i === 0 ? <span className="h-4 w-4" /> : <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />}
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full" onClick={() => document.getElementById("aiaf-pilot")?.scrollIntoView({ behavior: "smooth" })}>
                  Request a pilot
                </Button>
              </CardContent>
            </Card>
          </div>
          <p className="text-center text-sm text-muted-foreground">
            Need multi-tenancy, air-gapped deployment, a runtime gateway, or a dedicated SLA?{" "}
            <button onClick={() => document.getElementById("aiaf-pilot")?.scrollIntoView({ behavior: "smooth" })} className="text-primary underline underline-offset-2">
              Talk to us about Enterprise
            </button>.
          </p>
        </div>

        {/* Section 9: sample assessment artifacts (embedded) */}
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-bold">Sample assessment artifacts</h3>
            <p className="text-muted-foreground">
              The complete Section 9 report (AI-BOM, triage, RAG, agent authorization,
              deployment verification, incident package, evidence pack, and dashboard), embedded below.
            </p>
          </div>
          <Card className="overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2 border-b bg-muted/50">
              <span className="text-sm font-medium flex items-center gap-2">
                <FileCheck2 className="h-4 w-4 text-primary" /> AIAF Sample Assessment (Section 9)
              </span>
              <a href={REPORT_URL} target="_blank" rel="noreferrer" className="text-sm text-primary inline-flex items-center gap-1 hover:underline">
                Open full report <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
            <iframe
              src={REPORT_URL}
              title="AIAF Section 9 Sample Assessment Report"
              className="w-full bg-white"
              style={{ height: "75vh" }}
              loading="lazy"
            />
          </Card>
        </div>

        {/* Request a demo / pilot form */}
        <div id="aiaf-pilot" className="max-w-3xl mx-auto space-y-8 scroll-mt-24">
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-bold">Request a demo / design-partner pilot</h3>
            <p className="text-muted-foreground">
              We're onboarding a small number of design partners. Tell us about your AI systems
              and we'll set up a live walkthrough.
            </p>
          </div>

          <Card className="shadow-lg">
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {submitStatus.type && (
                  <Alert variant={submitStatus.type === "error" ? "destructive" : "default"}>
                    <AlertTitle>{submitStatus.type === "success" ? "Request sent" : "Submission failed"}</AlertTitle>
                    <AlertDescription>{submitStatus.message}</AlertDescription>
                  </Alert>
                )}

                {/* Route this lead to the AIAF pilot pipeline */}
                <input type="hidden" name="service" value="AIAF design-partner pilot" />

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="aiaf-firstName" className="text-sm font-medium">First Name *</label>
                    <Input id="aiaf-firstName" name="firstName" placeholder="John" required />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="aiaf-lastName" className="text-sm font-medium">Last Name</label>
                    <Input id="aiaf-lastName" name="lastName" placeholder="Doe" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="aiaf-email" className="text-sm font-medium">Work Email *</label>
                    <Input id="aiaf-email" name="email" type="email" placeholder="john@company.com" required />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="aiaf-company" className="text-sm font-medium">Company</label>
                    <Input id="aiaf-company" name="company" placeholder="Your Company" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="aiaf-message" className="text-sm font-medium">
                    What AI systems do you want to assess? *
                  </label>
                  <Textarea
                    id="aiaf-message"
                    name="message"
                    rows={4}
                    placeholder="e.g. a customer-support RAG agent on Bedrock, plus two fine-tuned models from Hugging Face…"
                    required
                  />
                </div>

                <div className="flex items-start space-x-2">
                  <input type="checkbox" id="aiaf-privacy" name="privacy" className="mt-1" required />
                  <label htmlFor="aiaf-privacy" className="text-sm text-muted-foreground">
                    I agree to the privacy policy and terms of service.
                  </label>
                </div>

                <Turnstile action="aiaf-pilot" />

                <Button type="submit" size="lg" disabled={isSubmitting} className="w-full md:w-auto">
                  {isSubmitting ? "Sending…" : "Request pilot"}
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card className="p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold">Prefer email?</h4>
                <a href="mailto:consulting@codensecurity.com?subject=AIAF%20pilot%20enquiry" className="text-primary hover:underline">
                  consulting@codensecurity.com
                </a>
              </div>
            </div>
            <p className="text-xs text-muted-foreground flex items-center gap-1.5">
              <AlertTriangle className="h-3.5 w-3.5" /> Security issue? security@codensecurity.com
            </p>
          </Card>
        </div>

      </div>
    </section>
  );
}
