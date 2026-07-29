import { useState } from "react";
import {
  AlertTriangle,
  ArrowRight,
  BadgeCheck,
  Boxes,
  CalendarClock,
  Check,
  ChevronDown,
  Cpu,
  Database,
  ExternalLink,
  FileCheck2,
  GitBranch,
  LockKeyhole,
  Mail,
  Network,
  Play,
  Radar,
  ScrollText,
  ShieldCheck,
  Sparkles,
  Telescope,
  Workflow,
} from "lucide-react";
import { toast } from "sonner";
import aiafLogo from "../assets/aiaf.png";
import aegisLogo from "../assets/aiaf-aegis.png";
import sentryLogo from "../assets/aiaf-sentry.png";
import vanguardLogo from "../assets/aiaf-vanguard.png";
import { submitContactForm } from "../lib/contact";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Turnstile } from "./Turnstile";

const REPORT_URL = "/reports/aiaf-section9-report.html";
const VANGUARD_URL = "https://vanguard.codensecurity.com";

const capabilities = [
  "AI-BOM registry",
  "Provenance scoring",
  "Sigstore verification",
  "RAG taint gates",
  "Agent authorization",
  "Egress controls",
  "garak and PyRIT probes",
  "Deployment verification",
  "Incident packages",
  "Compliance evidence",
  "SIEM, OSCAL, and SARIF exports",
];

const problems = [
  {
    icon: Boxes,
    title: "Unknown AI Inventory",
    body: "Models, prompts, tools, RAG indexes, guardrails, and evaluators get captured in a signed AI Bill of Materials.",
  },
  {
    icon: ShieldCheck,
    title: "Untrusted Model Adoption",
    body: "AIAF scores provenance, scans artifacts, probes behavior, and returns an evidence-backed adoption verdict.",
  },
  {
    icon: Radar,
    title: "Poisoned RAG Context",
    body: "Trust labels, taint labels, injection findings, and pre-model gate decisions stop risky retrieved content early.",
  },
  {
    icon: Network,
    title: "Overpowered Agents",
    body: "Tool authorization, egress policy, and a tamper-evident action ledger keep agent behavior bounded and reviewable.",
  },
  {
    icon: GitBranch,
    title: "Deployment Drift",
    body: "Deployment verification compares live systems against approved AI-BOMs, prompts, tools, guardrails, and digests.",
  },
  {
    icon: ScrollText,
    title: "Audit Evidence Gaps",
    body: "Controls map to NIST AI RMF, OWASP LLM Top 10, MITRE ATLAS, ISO 42001, and EU AI Act evidence packages.",
  },
];

const screenshots = [
  { src: "/aiaf/9_1_ai_bom_detail_view_registry.webp", title: "AI-BOM Detail View", caption: "Model identity, runtime components, dependencies, and deployment artifact." },
  { src: "/aiaf/9_2_adoption_triage_report.webp", title: "Model Adoption Triage", caption: "Provenance score, risk caps, blocking issues, and adoption verdict." },
  { src: "/aiaf/9_3_rag_taint_assessment_api_explorer.webp", title: "RAG Taint Assessment", caption: "Trust labels, taint labels, injection findings, and pre-model gate decisions." },
  { src: "/aiaf/9_4_agent_authorization_decision_api_explorer.webp", title: "Agent Authorization", caption: "Agent identity, requested capability, policy verdict, and ledger entry." },
  { src: "/aiaf/9_7_compliance_evidence_pack.webp", title: "Compliance Evidence Pack", caption: "Per-framework coverage, control status, evidence references, and gaps." },
  { src: "/aiaf/9_8_assurance_dashboard.webp", title: "Assurance Dashboard", caption: "Portfolio inventory, active findings, risk trends, and control coverage." },
];

const assuranceSignals = [
  {
    icon: BadgeCheck,
    label: "Signed Evidence",
    body: "Every assessment is packaged as technical proof that security, audit, and leadership teams can review.",
  },
  {
    icon: LockKeyhole,
    label: "Pre-Deployment Gates",
    body: "RAG, agent, model, and deployment checks can stop risky AI changes before production.",
  },
  {
    icon: Cpu,
    label: "Runtime Coverage",
    body: "Track drift, tool access, egress, and compliance posture from one assurance control plane.",
  },
];

const workflow = [
  {
    icon: Sparkles,
    title: "Inventory the System",
    body: "Capture models, prompts, tools, guardrails, RAG indexes, dependencies, and deployment artifacts in a signed AI-BOM.",
  },
  {
    icon: Telescope,
    title: "Stress the Weak Points",
    body: "Run provenance checks, adversarial probing, RAG taint analysis, and policy validation before rollout.",
  },
  {
    icon: ShieldCheck,
    title: "Ship with Evidence",
    body: "Bundle findings, control coverage, and remediation steps into a package security and compliance teams can act on.",
  },
];

const packages = [
  {
    name: "AIAF Sentry",
    status: "Available",
    audience: "Security teams starting structured AI assurance",
    logo: sentryLogo,
    accent: "sentry",
    cta: "View Sentry",
    action: "github",
    summary: "Open assurance and evidence layer for first scans, signed evidence, security testing, governance reporting, and production use.",
    features: [
      {
        title: "Model and Supply Chain",
        details: [
          "External model intake with graded adoption verdicts.",
          "CycloneDX ML-BOM export and import.",
          "Sigstore and OpenSSF signing verification.",
          "Hugging Face model-card enrichment.",
          "Non-executing artifact scanning for pickle, safetensors, and ONNX.",
          "Supply-chain provenance scoring and advisory matching.",
        ],
      },
      {
        title: "Red-Team and Runtime Security",
        details: [
          "Full red-team evaluation with garak and PyRIT.",
          "Live behavioral probing at intake time.",
          "Agentic AI validation for authority, blast radius, and delegation.",
          "Runtime tool authorization with per-tool risk scoring.",
          "Agent containment actions for suspend, quarantine, and tool blocking.",
          "RAG backend posture review for access control, isolation, and provenance.",
        ],
      },
      {
        title: "Trust and Governance",
        details: [
          "Bias and fairness assessment.",
          "Hallucination and factual-reliability risk assessment.",
          "Training-data assurance and membership-inference signals.",
          "Trustworthiness scoring.",
          "Compliance mapping and governance reporting.",
          "Advisory policy engine with a decision API.",
        ],
      },
      {
        title: "Operate and Report",
        details: [
          "Scheduled continuous security operations.",
          "SIEM and OSCAL export.",
          "Signed, point-in-time assurance report snapshots.",
          "Deterministic Ask AIAF assistant.",
          "Full dashboard, CLI, and plugin SDK.",
          "SQLite for local development and PostgreSQL for shared deployments.",
        ],
      },
    ],
  },
  {
    name: "AIAF Vanguard",
    status: "Ready Now",
    audience: "Professional self-hosted deployment",
    logo: vanguardLogo,
    accent: "vanguard",
    cta: "Order Vanguard",
    action: "interest",
    summary: "Self-hosted professional control plane for identity, isolation, automation, workflow integration, policy gates, evidence custody, and governance delivery.",
    features: [
      {
        title: "Identity and Access",
        details: [
          "Hardened OIDC/SSO with issuer-locked discovery.",
          "Algorithm allowlisting and replay protection.",
          "Service accounts with hashed keys, scoped roles, rotation, and expiry.",
          "Product-wide route authorization.",
          "Default-deny behavior for unmapped routes.",
        ],
      },
      {
        title: "Workspaces and Isolation",
        details: [
          "Workspace membership with request-time resolution.",
          "Workspace-scoped access across the Sentry data model.",
          "Cross-workspace deny guarantees backed by automated tests.",
          "PostgreSQL-backed control plane for shared, multi-team deployments.",
        ],
      },
      {
        title: "Reliable Operations",
        details: [
          "Managed assurance runner.",
          "Leader election, durable retries, and freshness SLOs.",
          "Reliable assurance schedules across replicas.",
          "Durable run history tied to the audit trail.",
        ],
      },
      {
        title: "Workflow Integration",
        details: [
          "Two-way connectors for Jira, ServiceNow, GitHub, Slack, and Teams.",
          "Findings become tickets.",
          "Ticket state syncs back automatically.",
          "Signed inbound webhooks, dead-letter queue, and replay.",
        ],
      },
      {
        title: "Policy, Evidence, and Deliverables",
        details: [
          "Policy-as-code gates with signed verdicts for CI, REST, and Kubernetes admission.",
          "Hash-chained, tamper-evident audit trail with offline verification.",
          "Evidence custody, retention, legal hold, and time-boxed auditor access.",
          "Compliance deliverable builder for EU AI Act Annex IV, ISO/IEC 42001 readiness, board reporting, and regulator reporting.",
        ],
      },
      {
        title: "Governance Copilot",
        details: [
          "Ask AIAF gains inference-backed reasoning over scoped organizational evidence.",
          "Workspace-safe execution for write actions.",
          "Air-gapped and offline-first deployment posture.",
        ],
      },
    ],
  },
  {
    name: "AIAF Aegis",
    status: "Preorder",
    audience: "Enterprise AI governance operations",
    logo: aegisLogo,
    accent: "aegis",
    cta: "Preorder Aegis",
    action: "interest",
    summary: "Enterprise enforcement layer for organizations that need low-latency policy decisions directly in the AI request path.",
    features: [
      {
        title: "Low-Latency Enforcement Gateway",
        details: [
          "Inline gateway for enforcing policy in the request path.",
          "Blocks policy-violating requests before they reach the model, tool, or agent action.",
          "Designed for organizations that need real-time AI control points.",
        ],
      },
      {
        title: "Stronger Tenant Isolation",
        details: [
          "Dedicated schema or database per customer.",
          "Designed for hosting multiple external organizations.",
          "Enterprise boundaries for managed assurance providers and larger platforms.",
        ],
      },
      {
        title: "Enterprise Identity and Procurement",
        details: [
          "Planned SAML support for long-tail enterprise identity providers.",
          "Dedicated SLA posture.",
          "Enterprise procurement support for larger organizations.",
        ],
      },
      {
        title: "Managed Framework Mapping",
        details: [
          "Custom framework mapping as a managed service.",
          "Enterprise-specific governance reporting paths.",
          "Early-access input channel for Aegis design partners.",
        ],
      },
    ],
  },
];

const standards = [
  "NIST AI RMF",
  "NIST SSDF",
  "OWASP Top 10 for LLM Apps",
  "MITRE ATLAS",
  "CIS Controls v8",
  "EU AI Act",
  "ISO/IEC 42001:2023",
];

type PackageAction = "github" | "vanguard" | "interest";

export function AIAF() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState("Vanguard Demo");
  const [submitStatus, setSubmitStatus] = useState<{ type: "success" | "error" | null; message: string }>({ type: null, message: "" });

  const scrollToForm = (interest: string) => {
    setSelectedPackage(interest);
    window.setTimeout(() => {
      document.getElementById("aiaf-pilot")?.scrollIntoView({ behavior: "smooth" });
    }, 30);
  };

  const handlePackageAction = (action: PackageAction, name: string) => {
    if (action === "github") {
      window.open("https://github.com/mbwika/AI-Assurance-Framework", "_blank", "noopener,noreferrer");
      return;
    }

    if (action === "vanguard") {
      window.open(VANGUARD_URL, "_blank", "noopener,noreferrer");
      return;
    }

    scrollToForm(name === "AIAF Aegis" ? "Aegis Preorder" : "Vanguard Order");
  };

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
      const result = await submitContactForm(data);
      if (result.ok && result.mode === "api") {
        setSubmitStatus({ type: "success", message: "Thanks. Your AIAF request has been sent. We will be in touch within one business day." });
        formElement.reset();
      } else if (result.ok && result.mode === "mailto") {
        setSubmitStatus({
          type: "success",
          message: "Your default email app was opened with a prepared AIAF enquiry because direct submission is temporarily unavailable.",
        });
      } else {
        setSubmitStatus({ type: "error", message: result.message });
      }
    } catch {
      setSubmitStatus({ type: "error", message: "Failed to send. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="aiaf" className="aiaf-page pt-28 pb-24">
      <div className="container mx-auto px-4">
        <div className="aiaf-hero-grid min-h-[calc(100vh-7rem)]">
          <div className="space-y-8 self-center">
            <div className="inline-flex items-center gap-3 rounded-full border border-slate-200 bg-white px-4 py-2 shadow-sm dark:border-white/15 dark:bg-white/10">
              <img src={aiafLogo} alt="AIAF logo" className="h-10 w-16 rounded-md object-cover object-center" />
              <span className="text-sm font-semibold text-slate-950 dark:text-white">AI Assurance Framework</span>
            </div>

            <div className="space-y-5">
              <h1 className="max-w-4xl text-4xl font-bold leading-tight tracking-tight text-slate-950 md:text-6xl dark:text-white">
                AIAF Turns AI Security Reviews Into Operational Evidence
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-700 md:text-xl dark:text-slate-100">
                Continuous assurance for models, RAG, agents, runtime behavior, deployment drift, and compliance. AIAF helps security teams prove what is safe to ship and what needs to stop.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button size="lg" className="group" onClick={() => scrollToForm("Vanguard Demo")}>
                Request a Demo
                <ArrowRight className="transition-transform group-hover:translate-x-1" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => window.open(REPORT_URL, "_blank", "noopener,noreferrer")}>
                View Sample Report <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </div>

            <div className="aiaf-signal-grid">
              {assuranceSignals.map((signal) => (
                <Card key={signal.label} className="aiaf-glass-card">
                  <CardContent className="space-y-4 p-5">
                    <div className="aiaf-icon-tile">
                      <signal.icon className="h-7 w-7" />
                    </div>
                    <div className="space-y-1">
                      <p className="font-semibold text-slate-950 dark:text-white">{signal.label}</p>
                      <p className="text-sm leading-6 text-slate-700 dark:text-slate-100">{signal.body}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="self-center">
            <div className="aiaf-motion-stage" aria-label="Animated AI assurance control plane visualization">
              <div className="aiaf-orbit-visual">
                <div className="aiaf-orbit aiaf-orbit-one" />
                <div className="aiaf-orbit aiaf-orbit-two" />
                <div className="aiaf-orbit aiaf-orbit-three" />
                <div className="aiaf-orbit-core">
                  <ShieldCheck className="h-20 w-20 text-white" />
                </div>
                <span className="aiaf-node node-one" />
                <span className="aiaf-node node-two" />
                <span className="aiaf-node node-three" />
                <span className="aiaf-node node-four" />
              </div>
              <div className="aiaf-motion-panel">
                <img src={aiafLogo} alt="AI Assurance Framework logo" className="h-32 w-full rounded-xl object-cover object-center" />
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <p className="text-2xl font-bold text-slate-950 dark:text-white">10</p>
                    <p className="text-xs text-slate-700 dark:text-slate-100">Assurance Controls</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-slate-950 dark:text-white">3</p>
                    <p className="text-xs text-slate-700 dark:text-slate-100">Product Paths</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-slate-950 dark:text-white">1</p>
                    <p className="text-xs text-slate-700 dark:text-slate-100">Evidence System</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-24">
          <div className="mx-auto max-w-4xl space-y-6 text-center">
            <h2 className="aiaf-section-title">What AIAF Is</h2>
            <p className="aiaf-section-copy">
              AIAF is an assurance control plane that binds AI security controls to evidence objects. Instead of one-off scans or policy narratives, it produces measurable, traceable artifacts before deployment, at runtime, during incidents, and for governance. It is designed for self-hosted, offline-first environments.
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {capabilities.map((capability) => (
                <span key={capability} className="rounded-full border border-slate-300 bg-white px-3 py-1 text-sm font-medium text-slate-800 dark:border-white/15 dark:bg-white/10 dark:text-white">
                  {capability}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <div className="space-y-3 text-center">
              <h2 className="aiaf-section-title">How the Assurance Flow Works</h2>
              <p className="aiaf-section-copy">A practical sequence that helps teams move from discovery to deployment confidence.</p>
            </div>
            <div className="aiaf-workflow-grid">
              {workflow.map((step) => (
                <Card key={step.title} className="aiaf-quiet-card">
                  <CardContent className="space-y-5 p-6">
                    <div className="aiaf-icon-tile">
                      <step.icon className="h-8 w-8" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold text-slate-950 dark:text-white">{step.title}</h3>
                      <p className="text-sm leading-6 text-slate-700 dark:text-slate-100">{step.body}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <div className="space-y-3 text-center">
              <h2 className="aiaf-section-title">What Problems AIAF Solves</h2>
              <p className="aiaf-section-copy">Six gaps that today's AI security tools often leave open.</p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {problems.map((problem) => (
                <Card key={problem.title} className="aiaf-quiet-card">
                  <CardContent className="space-y-4 p-6">
                    <div className="aiaf-icon-tile">
                      <problem.icon className="h-8 w-8" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-950 dark:text-white">{problem.title}</h3>
                    <p className="text-sm leading-6 text-slate-700 dark:text-slate-100">{problem.body}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <div className="space-y-3 text-center">
              <h2 className="aiaf-section-title">Screenshots</h2>
              <p className="aiaf-section-copy">Real artifacts from a live AIAF assessment. Click any image to enlarge.</p>
            </div>
            <div className="aiaf-screenshot-grid">
              {screenshots.map((screenshot) => (
                <a key={screenshot.src} href={screenshot.src} target="_blank" rel="noreferrer" className="group block">
                  <Card className="h-full overflow-hidden border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-lg dark:border-white/10 dark:bg-slate-950">
                    <div className="h-48 overflow-hidden bg-slate-100 dark:bg-slate-900">
                      <img
                        src={screenshot.src}
                        alt={screenshot.title}
                        loading="lazy"
                        className="h-full w-full object-cover object-top transition-transform group-hover:scale-[1.02]"
                      />
                    </div>
                    <CardContent className="space-y-1 pt-4">
                      <h3 className="text-sm font-semibold text-slate-950 dark:text-white">{screenshot.title}</h3>
                      <p className="text-xs leading-5 text-slate-700 dark:text-slate-100">{screenshot.caption}</p>
                    </CardContent>
                  </Card>
                </a>
              ))}
            </div>
          </div>

          <div className="mx-auto max-w-4xl space-y-4">
            <div className="space-y-3 text-center">
              <h2 className="aiaf-section-title">Short Demo</h2>
              <p className="aiaf-section-copy">A two-minute walkthrough of an end-to-end assessment.</p>
            </div>
            <div className="relative flex aspect-video flex-col items-center justify-center gap-3 rounded-2xl border border-slate-300 bg-white px-6 text-center shadow-sm dark:border-white/15 dark:bg-slate-950">
              <div className="aiaf-icon-tile h-20 w-20">
                <Play className="h-10 w-10" />
              </div>
              <p className="font-semibold text-slate-950 dark:text-white">Demo Video Coming Soon</p>
              <p className="max-w-md text-sm text-slate-700 dark:text-slate-100">
                In the meantime, explore the full sample assessment report below or request a live walkthrough.
              </p>
              <Button variant="outline" size="sm" onClick={() => window.open(REPORT_URL, "_blank", "noopener,noreferrer")}>
                Open Sample Report <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-8">
            <div className="space-y-3 text-center">
              <h2 className="aiaf-section-title">AIAF Sentry vs AIAF Vanguard vs AIAF Aegis</h2>
              <p className="aiaf-section-copy">
                Choose the product path that matches your stage: Sentry for structured assurance, Vanguard for ready professional self-hosting, and Aegis for enterprise governance operations.
              </p>
            </div>

            <div className="aiaf-package-grid">
              {packages.map((pkg) => (
                <Card key={pkg.name} className={`aiaf-package-card aiaf-package-${pkg.accent}`}>
                  <CardHeader className="space-y-4">
                    <img src={pkg.logo} alt={`${pkg.name} logo`} className="h-20 w-full rounded-xl object-cover object-center" />
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="aiaf-status-pill">{pkg.status}</span>
                        <span className="text-xs font-semibold uppercase tracking-wide text-slate-700 dark:text-slate-200">{pkg.audience}</span>
                      </div>
                      <CardTitle className="text-2xl text-slate-950 dark:text-white">{pkg.name}</CardTitle>
                      <p className="text-sm leading-6 text-slate-700 dark:text-slate-100">{pkg.summary}</p>
                    </div>
                  </CardHeader>
                  <CardContent className="flex flex-1 flex-col justify-between gap-6">
                    <div className="space-y-3">
                      {pkg.features.map((feature) => (
                        <details key={feature.title} className="aiaf-feature-detail">
                          <summary>
                            <span className="flex items-center gap-2">
                              <Check className="h-4 w-4 text-primary" />
                              {feature.title}
                            </span>
                            <ChevronDown className="h-4 w-4" />
                          </summary>
                          <ul className="space-y-2 px-4 pb-4 pt-1">
                            {feature.details.map((detail) => (
                              <li key={detail} className="text-sm leading-6 text-slate-700 dark:text-slate-100">
                                {detail}
                              </li>
                            ))}
                          </ul>
                        </details>
                      ))}
                    </div>
                    <Button className="w-full" variant={pkg.action === "github" ? "outline" : "default"} onClick={() => handlePackageAction(pkg.action as PackageAction, pkg.name)}>
                      {pkg.cta}
                      {pkg.action !== "interest" && <ExternalLink className="ml-2 h-4 w-4" />}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm dark:border-white/10 dark:bg-slate-950">
            <div className="space-y-2">
              <h2 className="aiaf-section-title">Standards and Framework Alignment</h2>
              <p className="aiaf-section-copy">
                AIAF maps evidence and controls back to the frameworks governance, security, and compliance reviewers cite.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {standards.map((standard) => (
                <span key={standard} className="rounded-full border border-slate-300 px-3 py-1 text-sm font-semibold text-slate-800 dark:border-white/15 dark:text-white">
                  {standard}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-3 text-center">
              <h2 className="aiaf-section-title">Sample Assessment Artifacts</h2>
              <p className="aiaf-section-copy">
                The complete Section 9 report, including AI-BOM, triage, RAG, agent authorization, deployment verification, incident package, evidence pack, and dashboard.
              </p>
            </div>
            <Card className="overflow-hidden border-slate-200 bg-white shadow-sm dark:border-white/10 dark:bg-slate-950">
              <div className="flex flex-col gap-3 border-b border-slate-200 bg-slate-50 px-4 py-3 sm:flex-row sm:items-center sm:justify-between dark:border-white/10 dark:bg-white/5">
                <span className="flex items-center gap-2 text-sm font-semibold text-slate-950 dark:text-white">
                  <FileCheck2 className="h-5 w-5 text-primary" /> AIAF Sample Assessment
                </span>
                <a href={REPORT_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
                  Open Full Report <ExternalLink className="h-4 w-4" />
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

          <div id="aiaf-pilot" className="mx-auto max-w-3xl space-y-8 scroll-mt-24">
            <div className="space-y-3 text-center">
              <h2 className="aiaf-section-title">Request a Demo or Register Interest</h2>
              <p className="aiaf-section-copy">
                Tell us about your AI systems and the product path you want to evaluate. Vanguard is ready for professional self-hosted conversations; Aegis is open for pre-order interest.
              </p>
            </div>

            <Card className="border-slate-200 bg-white shadow-xl dark:border-white/10 dark:bg-slate-950">
              <CardContent className="pt-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {submitStatus.type && (
                    <Alert variant={submitStatus.type === "error" ? "destructive" : "default"}>
                      <AlertTitle>{submitStatus.type === "success" ? "Request Sent" : "Submission Failed"}</AlertTitle>
                      <AlertDescription>{submitStatus.message}</AlertDescription>
                    </Alert>
                  )}

                  <input type="hidden" name="service" value={selectedPackage} />

                  <div className="space-y-2">
                    <label htmlFor="aiaf-product" className="text-sm font-semibold text-slate-950 dark:text-white">
                      Product Interest *
                    </label>
                    <select
                      id="aiaf-product"
                      name="productInterest"
                      value={selectedPackage}
                      onChange={(event) => setSelectedPackage(event.target.value)}
                      required
                      className="h-10 w-full rounded-md border border-input bg-input-background px-3 py-2 text-sm text-slate-950 outline-none transition-colors focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 dark:bg-input/30 dark:text-white"
                    >
                      <option value="Vanguard Demo">Vanguard Demo</option>
                      <option value="Vanguard Order">Vanguard Order</option>
                      <option value="Aegis Preorder">Aegis Preorder</option>
                    </select>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <label htmlFor="aiaf-firstName" className="text-sm font-semibold text-slate-950 dark:text-white">First Name *</label>
                      <Input id="aiaf-firstName" name="firstName" placeholder="John" required />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="aiaf-lastName" className="text-sm font-semibold text-slate-950 dark:text-white">Last Name</label>
                      <Input id="aiaf-lastName" name="lastName" placeholder="Doe" />
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <label htmlFor="aiaf-email" className="text-sm font-semibold text-slate-950 dark:text-white">Work Email *</label>
                      <Input id="aiaf-email" name="email" type="email" placeholder="john@company.com" required />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="aiaf-company" className="text-sm font-semibold text-slate-950 dark:text-white">Company</label>
                      <Input id="aiaf-company" name="company" placeholder="Your Company" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="aiaf-message" className="text-sm font-semibold text-slate-950 dark:text-white">
                      What AI Systems Do You Want to Assess/Govern? *
                    </label>
                    <Textarea
                      id="aiaf-message"
                      name="message"
                      rows={4}
                      placeholder="For example: a customer-support RAG agent on Bedrock, internal copilots, fine-tuned models, or planned enterprise AI governance needs."
                      required
                    />
                  </div>

                  <div className="flex items-start space-x-2">
                    <input type="checkbox" id="aiaf-privacy" name="privacy" className="mt-1" required />
                    <label htmlFor="aiaf-privacy" className="text-sm text-slate-700 dark:text-slate-100">
                      I agree to the privacy policy and terms of service.
                    </label>
                  </div>

                  <Turnstile action="aiaf-pilot" />

                  <Button type="submit" size="lg" disabled={isSubmitting} className="w-full md:w-auto">
                    {isSubmitting ? "Sending..." : "Submit Request"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card className="flex flex-col items-start justify-between gap-4 border-slate-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center dark:border-white/10 dark:bg-slate-950">
              <div className="flex items-start gap-4">
                <div className="aiaf-icon-tile">
                  <Mail className="h-7 w-7" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-950 dark:text-white">Prefer Email?</h3>
                  <a href="mailto:consulting@codensecurity.com?subject=AIAF%20enquiry" className="font-semibold text-primary hover:underline">
                    consulting@codensecurity.com
                  </a>
                </div>
              </div>
              <p className="flex items-center gap-1.5 text-xs text-slate-700 dark:text-slate-100">
                <AlertTriangle className="h-4 w-4" /> Security issue? security@codensecurity.com
              </p>
            </Card>
          </div>

          <div className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:grid-cols-3 dark:border-white/10 dark:bg-slate-950">
            {[
              { icon: CalendarClock, label: "Ready Demo", body: "Book a Vanguard walkthrough for the professional package." },
              { icon: Workflow, label: "Pilot Fit", body: "Map AIAF to your AI system inventory and governance workflow." },
              { icon: Database, label: "Self-Hosted", body: "Discuss deployment controls, Postgres, access, and evidence retention." },
            ].map((item) => (
              <div key={item.label} className="flex gap-3">
                <item.icon className="mt-1 h-6 w-6 flex-shrink-0 text-primary" />
                <div>
                  <p className="font-semibold text-slate-950 dark:text-white">{item.label}</p>
                  <p className="text-sm leading-6 text-slate-700 dark:text-slate-100">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
