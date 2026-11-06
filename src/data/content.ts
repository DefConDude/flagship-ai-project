import { z } from "zod";

/**
 * All showcase content is defined here and validated with Zod at module load.
 * This keeps the site's facts in one typed place and fails loudly if the
 * shape ever drifts. Drive updates from TRACK-daily-project-log.md and the
 * LOCKED decision steering files.
 */

/* ------------------------------------------------------------------ */
/* Schemas                                                             */
/* ------------------------------------------------------------------ */

const StatSchema = z.object({
  // Either an animated count-up (`target`) OR a static display string (`value`).
  target: z.number().optional(),
  value: z.string().optional(),
  prefix: z.string().default(""),
  suffix: z.string().default(""),
  label: z.string(),
});

const AboutCardSchema = z.object({
  icon: z.string(),
  title: z.string(),
  body: z.string(),
});

/** A planet (connected system/data source) in the hero orrery. */
const PlanetSchema = z.object({
  label: z.string(),
  /** hex colour for the planet + its glow */
  color: z.string(),
  /** orbit radius in scene units */
  radius: z.number(),
  /** relative orbital speed (sign sets direction) */
  speed: z.number(),
  /** starting angle in radians */
  phase: z.number(),
  /** planet size */
  size: z.number(),
});

const TierSchema = z.object({
  tier: z.string(),
  title: z.string(),
  description: z.string(),
  files: z.array(z.string()).min(1),
  purpose: z.string(),
  accent: z.enum(["azure", "purple", "plum", "turquoise"]),
});

const TimelineSchema = z.object({
  date: z.string(),
  title: z.string(),
  body: z.string(),
  tags: z.array(z.string()),
  state: z.enum(["completed", "current", "future"]),
});

const FlowNodeSchema = z.object({
  icon: z.string(),
  title: z.string(),
  caption: z.string(),
  highlight: z.boolean().default(false),
});

/** A side-by-side alternative inside a governance decision (e.g. public cloud vs internal platform). */
const GovOptionSchema = z.object({
  name: z.string(),
  chosen: z.boolean(),
  note: z.string(),
  points: z.array(z.string()).default([]),
});

/** One box in the end-to-end governance flow. */
const GovStepSchema = z.object({
  /** process = navy box, decision = diamond, artefact = red box in the source diagram */
  kind: z.enum(["process", "decision", "artefact"]).default("process"),
  title: z.string(),
  /** decision outcome, e.g. "Yes" / "No" */
  outcome: z.string().default(""),
  notes: z.array(z.string()).default([]),
  /** short reasons / constraints shown as pills */
  points: z.array(z.string()).default([]),
  options: z.array(GovOptionSchema).default([]),
  artefacts: z.array(z.string()).default([]),
  people: z.array(z.string()).default([]),
});

const GovPhaseSchema = z.object({
  number: z.string(),
  title: z.string(),
  summary: z.string(),
  steps: z.array(GovStepSchema).min(1),
});

/** An AI model label the agent resolves via aiModels.yaml. */
const ModelSchema = z.object({
  /** aiModels.yaml label, e.g. "report-model" */
  label: z.string(),
  /** human model name, e.g. "GPT-4.1" */
  model: z.string(),
  /** deployment / physical name, e.g. "gpt-41" */
  deployment: z.string(),
  purpose: z.string(),
  why: z.string(),
});

/** A workflow / operational API endpoint. */
const EndpointSchema = z.object({
  method: z.enum(["GET", "POST"]),
  path: z.string(),
  /** who calls whom, e.g. "CRM → agent" */
  direction: z.string(),
  purpose: z.string(),
  /** drives the badge colour and grouping */
  kind: z.enum(["inbound", "outbound", "consumed", "ops"]),
});

const FlowSchema = z.object({
  number: z.string(),
  title: z.string(),
  description: z.string(),
  nodes: z.array(FlowNodeSchema).min(1),
});

/** One lessons-learned theme: overview tagline + "What happened" + the lesson. */
const LessonSchema = z.object({
  num: z.string(),
  title: z.string(),
  /** one-line tagline shown on the overview tile */
  summary: z.string(),
  happened: z.array(z.string()).min(1),
  lesson: z.string(),
});

const TeamMemberSchema = z.object({
  /** surname drives sort order */
  surname: z.string(),
  name: z.string(),
  role: z.string(),
  image: z.string(),
  tags: z.array(z.string()),
});

/** A key stakeholder / enabler outside the core delivery team. */
const PartnerSchema = z.object({
  name: z.string(),
  role: z.string(),
  /** team / department, optional */
  org: z.string().default(""),
  /** optional headshot in public/images/; falls back to initials if missing */
  image: z.string().default(""),
});

/** A business-value / benefit card. */
const ValueSchema = z.object({
  icon: z.string(),
  /** short tag shown above the title, e.g. "CustX" / "EmpX" */
  badge: z.string().default(""),
  title: z.string(),
  body: z.string(),
});

/** A big headline impact number (the ROI block). */
const ImpactStatSchema = z.object({
  value: z.string(),
  label: z.string(),
  sub: z.string().default(""),
  accent: z.enum(["azure", "purple", "plum", "turquoise"]),
});

const StatusCardSchema = z.object({
  tone: z.enum(["green", "blue", "yellow"]),
  title: z.string(),
  value: z.string(),
  env: z.string(),
});

/** A child task under a progress item, e.g. one event's unit tests. */
const ProgressSubItemSchema = z.object({
  /** event id from the credit_event seed (PG Schema.sql) */
  num: z.number().int(),
  label: z.string(),
  state: z.enum(["done", "in-progress", "pending"]).default("pending"),
});

const ProgressItemSchema = z.object({
  label: z.string(),
  state: z.enum(["done", "in-progress", "pending"]),
  /** optional breakdown, rendered as a full-width nested checklist */
  subitems: z.array(ProgressSubItemSchema).default([]),
});

const ContentSchema = z.object({
  hero: z.object({
    badge: z.string(),
    titleLine: z.string(),
    titleHighlight: z.string(),
    subtitle: z.string(),
    stats: z.array(StatSchema),
    orrery: z.array(PlanetSchema),
  }),
  about: z.object({
    tag: z.string(),
    heading: z.string(),
    description: z.string(),
    cards: z.array(AboutCardSchema),
  }),
  steering: z.object({
    tag: z.string(),
    heading: z.string(),
    description: z.string(),
    intro: z.string(),
    tiers: z.array(TierSchema),
    stats: z.array(z.object({ value: z.string(), label: z.string() })),
    quote: z.string(),
  }),
  timeline: z.object({
    tag: z.string(),
    heading: z.string(),
    description: z.string(),
    items: z.array(TimelineSchema),
  }),
  governance: z.object({
    tag: z.string(),
    heading: z.string(),
    description: z.string(),
    phases: z.array(GovPhaseSchema).min(1),
  }),
  architecture: z.object({
    tag: z.string(),
    heading: z.string(),
    description: z.string(),
    flows: z.array(FlowSchema),
    modelsIntro: z.string(),
    models: z.array(ModelSchema).min(1),
    endpointsIntro: z.string(),
    endpoints: z.array(EndpointSchema).min(1),
    endpointsNote: z.string(),
    techStack: z.array(z.string()),
  }),
  value: z.object({
    tag: z.string(),
    heading: z.string(),
    description: z.string(),
    items: z.array(ValueSchema),
  }),
  impact: z.object({
    tag: z.string(),
    heading: z.string(),
    description: z.string(),
    /** the headline before → after turnaround comparison */
    turnaround: z.object({
      before: z.string(),
      beforeLabel: z.string(),
      beforeCaption: z.string(),
      after: z.string(),
      afterLabel: z.string(),
      afterCaption: z.string(),
    }),
    stats: z.array(ImpactStatSchema),
    footnote: z.string().default(""),
  }),
  lessons: z.object({
    tag: z.string(),
    heading: z.string(),
    description: z.string(),
    items: z.array(LessonSchema),
  }),
  team: z.object({
    tag: z.string(),
    heading: z.string(),
    description: z.string(),
    members: z.array(TeamMemberSchema),
    enablersHeading: z.string(),
    enablersIntro: z.string(),
    enablers: z.array(PartnerSchema).min(1),
  }),
  status: z.object({
    tag: z.string(),
    heading: z.string(),
    description: z.string(),
    cards: z.array(StatusCardSchema),
    // No hand-typed percentage: the bar is derived from `items` (see mvp1Progress).
    items: z.array(ProgressItemSchema),
  }),
});

export type Content = z.infer<typeof ContentSchema>;
export type ContentInput = z.input<typeof ContentSchema>;
export type TeamMember = z.infer<typeof TeamMemberSchema>;
export type TimelineItem = z.infer<typeof TimelineSchema>;
export type Partner = z.infer<typeof PartnerSchema>;
export type ValueItem = z.infer<typeof ValueSchema>;
export type ImpactStat = z.infer<typeof ImpactStatSchema>;
export type AiModel = z.infer<typeof ModelSchema>;
export type GovStep = z.infer<typeof GovStepSchema>;
export type GovPhase = z.infer<typeof GovPhaseSchema>;
export type Endpoint = z.infer<typeof EndpointSchema>;

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

// Typed as the schema INPUT (so fields with Zod .default() are optional here);
// ContentSchema.parse below produces the fully-populated output `Content`.
const raw: ContentInput = {
  hero: {
    badge: "Commercial Banking · Enterprise AI",
    titleLine: "Credit Assist",
    titleHighlight: "AI Agent",
    subtitle:
      "Empowering commercial bankers at a tier-1 bank with AI-driven pre-screening intelligence. One Opportunity. One request. One comprehensive, banker-reviewed credit report.",
    stats: [
      { target: 14, prefix: "", suffix: "", label: "Orchestrated Events" },
      { value: "72h \u2192 <10min", label: "Pre-Screening Time" },
    ],
    // The systems the agent connects to, as satellite orbs. Phases are spread
    // evenly (~2π/6 apart) so the cards sit around the orbit, not on top of each
    // other. radius/speed/yAmp are derived from index in HeroCanvas.
    orrery: [
      { label: "Credit API", color: "#07c2c9", radius: 2.4, speed: 0.26, phase: 0.0, size: 0.24 },
      { label: "D365", color: "#3876ff", radius: 2.7, speed: -0.2, phase: 1.05, size: 0.24 },
      { label: "SharePoint", color: "#4f87f8", radius: 3.0, speed: 0.22, phase: 2.1, size: 0.24 },
      { label: "Weaviate", color: "#9d4ccd", radius: 3.3, speed: -0.24, phase: 3.14, size: 0.24 },
      { label: "PostgreSQL", color: "#22cfd5", radius: 3.6, speed: 0.18, phase: 4.19, size: 0.24 },
      { label: "Langfuse", color: "#c99bf0", radius: 3.9, speed: -0.22, phase: 5.24, size: 0.24 },
    ],
  },
  about: {
    tag: "The Mission",
    heading: "What is Credit Assist?",
    description:
      "When a banker needs to pre-screen a client's credit profile, they shouldn't have to dig through multiple systems and spreadsheets. Credit Assist does the heavy lifting — fetching live credit-bureau data, reading the Opportunity's financial statements, running it all through an AI model, and delivering a polished pre-screening report. The banker always makes the call — the agent never decides credit.",
    cards: [
      {
        icon: "brain",
        title: "AI-Powered Analysis",
        body: "GPT-4.1 generates the structured pre-screen report from credit-bureau data and financial statements against static credit-policy guidance — assessment reasoning, never a credit decision.",
      },
      {
        icon: "user-check",
        title: "Banker-in-the-Loop",
        body: "Credit Assist is assistive by design. Mandatory human approval, no autonomous credit decisions — the report informs the banker, it never replaces them.",
      },
      {
        icon: "shield",
        title: "Enterprise Security",
        body: "API-gateway consumer-signed-JWT auth, OpenShift secrets, zero PII in logs. Because \u201ctrust me bro\u201d is not a security policy.",
      },
      {
        icon: "eye",
        title: "Full Observability",
        body: "Every interaction traced in Langfuse, metrics in Prometheus, dashboards in Grafana. Langfuse is a hard dependency — no tracing, no chat.",
      },
    ],
  },
  value: {
    tag: "Why It Matters",
    heading: "Business Value",
    description:
      "Credit Assist is not automation for its own sake. It targets the parts of pre-screening that cost bankers time and introduce variability — measured against the bank's customer-experience (CustX) and employee-experience (EmpX) goals.",
    items: [
      {
        icon: "rocket",
        badge: "CustX",
        title: "Faster Turnaround",
        body: "Automates data extraction to accelerate pre-screening and deal origination.",
      },
      {
        icon: "heart",
        badge: "EmpX",
        title: "Enhanced Employee Experience",
        body: "Reduces manual tasks, freeing bankers to focus on client engagement.",
      },
      {
        icon: "check",
        badge: "Quality",
        title: "Improved Quality & Standardisation",
        body: "Applies consistent logic and templates, reducing errors and variability.",
      },
      {
        icon: "gauge",
        badge: "Speed",
        title: "Faster Deal Progression",
        body: "Shortens pre-screen timelines and speeds up credit decisioning.",
      },
      {
        icon: "sliders",
        badge: "Efficiency",
        title: "Automation & Productivity Gains",
        body: "Eliminates manual processes, improving efficiency and reducing operational risk.",
      },
      {
        icon: "vector",
        badge: "Insight",
        title: "Knowledge Creation & Reuse",
        body: "Structures data and outputs for future insights and analytics.",
      },
      {
        icon: "brain",
        badge: "People",
        title: "Learning & Capability Uplift",
        body: "Supports skill development through transparent, explainable calculations.",
      },
    ],
  },
  impact: {
    tag: "The Numbers",
    heading: "Saving a Minute per Lending Opportunity",
    description:
      "Pre-screening today waits on a ~72-hour financial-spreading turnaround. Credit Assist targets under 10 minutes. And even a single minute saved per lending opportunity compounds quickly at enterprise volume.",
    turnaround: {
      before: "~72 hrs",
      beforeLabel: "Today",
      beforeCaption:
        "Financial-spreading turnaround before pre-screen drafting and credit engagement can start, which delays proposals and slows decisions.",
      after: "<10 min",
      afterLabel: "With Credit Assist",
      afterCaption:
        "Statements ingested, ratios calculated and a banker-reviewable draft pre-screen delivered inside the CRM Opportunity.",
    },
    stats: [
      { value: "50,000", label: "Opportunities / Year", sub: "illustrative volume", accent: "turquoise" },
      { value: "50,000", label: "Minutes Saved", sub: "1 minute each", accent: "azure" },
      { value: "833", label: "Hours Saved", sub: "50,000 ÷ 60", accent: "purple" },
      { value: "~104", label: "Working Days", sub: "at 8 hours / day", accent: "plum" },
    ],
    footnote:
      "Illustrative, deliberately conservative model with round example numbers, not client data: it counts just one minute per opportunity, while the target turnaround drops from ~72 hours to under 10 minutes.",
  },
  steering: {
    tag: "AI-Powered Development",
    heading: "Steering Files",
    description:
      "How do you teach an AI assistant everything about your project — architecture, credentials, deployment rules, and team conventions — without repeating yourself every session? You build a tiered steering system.",
    intro:
      "Steering files are markdown documents that live in .kiro/steering/ and automatically inject project context into every AI session. Think of them as the agent's institutional memory — always present, always accurate, never needing a \u201cquick refresher\u201d meeting. During a three-week access gap, they were also how the project kept its continuity on paper.",
    tiers: [
      {
        tier: "Tier 1",
        title: "Foundation & Identity",
        description:
          "Who are we, what are we building, and how does a new developer (or AI) get oriented?",
        files: [
          "TRACK-onboarding.md",
          "TRACK-team-and-department.md",
          "TRACK-repo-navigation.md",
        ],
        purpose:
          "Any AI session starts already knowing the project layout, who does what, and where everything lives. Zero ramp-up time.",
        accent: "azure",
      },
      {
        tier: "Tier 2",
        title: "Operations & Workflow",
        description: "How do we build, deploy, test, and track things?",
        files: [
          "DEV-deployment-workflow.md",
          "DEV-code-branching-rules.md",
          "DEV-credentials-reference.md",
          "DEV-orchestration-versioning.md",
          "TRACK-support-ticket-tracker.md",
          "TRACK-daily-project-log.md",
        ],
        purpose:
          "The AI never suggests hardcoding secrets, pushing to main, or skipping versioning — because it already knows the rules.",
        accent: "purple",
      },
      {
        tier: "Tier 3",
        title: "Technical Standards & Compliance",
        description:
          "What are the non-negotiable platform rules and security guardrails?",
        files: [
          "DEV-agent-development-standards.md",
          "DEV-qa-testing-standards.md",
          "DEV-required-application-metrics.md",
          "DEV-environment-variables.md",
          "DEV-configure-python-pod.md",
        ],
        purpose:
          "Every line of code generated already meets platform standards, Prometheus requirements, and security policies. Compliance baked in, not bolted on.",
        accent: "plum",
      },
      {
        tier: "Tier 4",
        title: "Architecture & Integration Decisions",
        description:
          "What has been decided and locked — the architectural truths that cannot be debated mid-session?",
        files: [
          "DEV-credit-data-integration-decisions.md",
          "DEV-api-endpoint-conventions.md",
          "TRACK-access-register.md",
          "DEV-namespace-components.md",
          "DEV-alert-routing.md",
          "DEV-standard-environment-metrics.md",
        ],
        purpose:
          "Locked decisions stay locked. The AI won't suggest RAG for credit-bureau data or mock endpoints — because it knows why those were rejected.",
        accent: "turquoise",
      },
    ],
    stats: [
      { value: "25+", label: "Steering Files" },
      { value: "4", label: "Knowledge Tiers" },
      { value: "0", label: "Repeated Explanations" },
      { value: "\u221e", label: "Context Retained" },
    ],
    quote:
      "Instead of explaining the project to the AI every session, we wrote it down once. Now every session starts at full speed — like an engineer who actually read the wiki.",
  },
  timeline: {
    tag: "The Journey",
    heading: "Where We've Been, Where We Are, Where We're Going",
    description:
      "Every great product has a story. Ours involves Kubernetes, coffee, contract renewals, and an unreasonable number of YAML files.",
    items: [
      {
        date: "June 2026",
        title: "Project Kickoff",
        body: "Solution design approved. Architecture first draft. The team assembled like a very corporate Avengers squad.",
        tags: ["Design", "Architecture"],
        state: "completed",
      },
      {
        date: "July 2026",
        title: "Infrastructure & Steering",
        body: "OpenShift namespaces, CI/CD pipelines and secrets provisioned. Tiered Kiro steering system established — the agent's institutional memory.",
        tags: ["OpenShift", "CI/CD", "Steering"],
        state: "completed",
      },
      {
        date: "August 2026",
        title: "Agent Live on INT + Credit Data Locked",
        body: "First deploy to the integration environment. /health and /ready green, Langfuse wired. Credit-data integration decisions finalised with the data provider's team — no mocks, real data or bust.",
        tags: ["INT", "Langfuse", "Credit Data"],
        state: "completed",
      },
      {
        date: "September 2026",
        title: "Gateway Onboarding & Schema Migration",
        body: "The agent onboarded to the enterprise API gateway as both consumer and provider, endpoints registered, consumer-signed-JWT auth implemented. Database migrated to a dedicated credit_assist schema. Canonical 14-event model locked.",
        tags: ["API Gateway", "PostgreSQL", "14 Events"],
        state: "completed",
      },
      {
        date: "Oct 2026 — Access Gap",
        title: "Contract Renewal Window",
        body: "Contract renewals caused a near-complete access loss of ~3 weeks for part of the team. The rest of the team kept continuity, and the steering files did the remembering. A real lesson learned, documented in the daily log.",
        tags: ["Access", "Continuity", "Resilience"],
        state: "completed",
      },
      {
        date: "21–23 Oct 2026",
        title: "Architecture Correction",
        body: "Architecture sense-checks reshaped MVP1: the document platform moved out of scope, financial statements are supplied by the CRM in the request, credit policy goes static and the report sub-agent was dropped. Spec, diagram and steering reconciled.",
        tags: ["Graph API", "Static Policy", "MVP1 Scope"],
        state: "completed",
      },
      {
        date: "29 Oct – 2 Nov 2026",
        title: "First initiate-prescreen",
        body: "Integration environment fully green (postgres, weaviate, langfuse). First successful initiate-prescreen \u2192 202, Events 1–3 proven in Langfuse. The agent signs its JWT and reaches the gateway handshake.",
        tags: ["Events 1\u20133 \u2713", "JWT Signing", "Langfuse"],
        state: "completed",
      },
      {
        date: "Nov 2026 — NOW",
        title: "Credit Data Path Blocked Upstream",
        body: "The credit-data call (Event 4) is reached, but requests fail at the gateway's TLS layer, reproduced from both the pod and an on-network workstation. Root-caused as a server-side gateway fault, not our code or configuration. Sits with the network team.",
        tags: ["In Progress", "Gateway Blocker", "Event 4"],
        state: "current",
      },
      {
        date: "Next",
        title: "Credit Data End-to-End (Event 4)",
        body: "Once the gateway fault is resolved, confirm the first successful credit-data response and prove the core flow end to end. In parallel: confirm the CRM callback routing (Event 3) and the document-payload shape, and remove the temporary callback shim.",
        tags: ["Gateway", "Event 3 / Docs", "End-to-End"],
        state: "future",
      },
      {
        date: "Late 2026",
        title: "Product Owner Demo",
        body: "End-to-end demonstration for the product owner. CRM trigger \u2192 Agent \u2192 credit data + statements \u2192 banker-reviewed report. No mocks allowed.",
        tags: ["Demo", "Sign-off"],
        state: "future",
      },
      {
        date: "Q1 2027",
        title: "QA & Stress Testing",
        body: "Promotion to the release branch. QA validation and stress testing with concurrent users. Finding out if our \u201chorizontal scaling\u201d claims actually hold up.",
        tags: ["QA", "Performance", "Release"],
        state: "future",
      },
      {
        date: "2027",
        title: "Production Launch",
        body: "Commercial bankers get their AI sidekick. Pre-screening goes from \u201clet me check 5 systems\u201d to \u201chere's your report\u201d. The future is now.",
        tags: ["Production", "Go-Live", "MVP1"],
        state: "future",
      },
      {
        date: "MVP2 & Beyond",
        title: "The Expansion",
        body: "Policy document RAG via the document platform. Weaviate policy collection. Multi-segment analysis. Everything that didn't fit in MVP1 because scope creep is real and we respect deadlines (mostly).",
        tags: ["RAG", "Document Platform", "Multi-Segment"],
        state: "future",
      },
    ],
  },
  governance: {
    tag: "The Paper Trail",
    heading: "Governance Journey",
    description:
      "The end-to-end governance flow for AI in a regulated bank: why an off-the-shelf copilot could not carry the use case, why we landed on the internal AI platform, and every gate between a lab prototype and implementation readiness.",
    phases: [
      {
        number: "01",
        title: "Why not Copilot?",
        summary:
          "Three generations of Copilot were explored before the pilot was tested against production needs.",
        steps: [
          { title: "Copilot Light (2024)" },
          { title: "Copilot Studio (2025)" },
          { title: "Copilot Studio (2026) — shared AI production environment" },
          {
            kind: "decision",
            title: "Can the pilot become the production solution?",
            outcome: "No",
            points: [
              "Deterministic component",
              "DLP challenges",
              "Platform control",
              "Scalability",
              "Long-term financial benefit",
            ],
          },
          {
            title: "Copilot Light and Copilot Studio were insufficient for the deterministic requirement",
          },
        ],
      },
      {
        number: "02",
        title: "Choosing the platform",
        summary:
          "The group AI governance framework set the rules; the platform had to be an approved pattern.",
        steps: [
          { kind: "artefact", title: "Group AI governance framework reviewed" },
          {
            kind: "decision",
            title: "Platform decision?",
            options: [
              {
                name: "Public cloud",
                chosen: false,
                note: "Not an approved pattern, so it needs additional gates.",
                points: ["Architecture board", "Security review", "Cloud approval", "Quality framework"],
              },
              {
                name: "Internal AI platform",
                chosen: true,
                note: "An already-approved enterprise pattern.",
              },
            ],
          },
          { title: "Decision to adopt the internal AI platform" },
          { title: "Platform architecture consultation with the AI platform team" },
          { kind: "decision", title: "Platform suitable?", outcome: "Yes" },
          { title: "Proceed on the internal AI platform" },
        ],
      },
      {
        number: "03",
        title: "Gates to production",
        summary:
          "From risk classification through the AI risk, data privacy, architecture and data councils to implementation readiness.",
        steps: [
          {
            title: "Medium risk classification",
            artefacts: ["Self Assessment (Risk Questionnaire)"],
          },
          {
            title: "AI risk committee review required",
            artefacts: [
              "Self Assessment (Risk Questionnaire)",
              "Algorithm Assessment",
              "PIA (Privacy Impact Assessment)",
            ],
          },
          { title: "Obtain lab access", notes: ["Logged the AI platform lab request."] },
          {
            title: "Build prototype",
            points: [
              "180-day lab window",
              "One optional 60-day extension",
              "Inactivity limitation (security)",
            ],
          },
          { kind: "decision", title: "Prototype successful?", outcome: "Yes" },
          { title: "Governance submissions" },
          { title: "AI risk committee conditional approval" },
          {
            title: "Data privacy review",
            artefacts: [
              "Data assessment template",
              "Credit Assist data sources",
              "Credit Assist technical specification",
            ],
          },
          { title: "Data privacy approval" },
          { title: "Architecture council review", artefacts: ["Architecture deck"] },
          { title: "Architecture council approval" },
          { title: "Data & analytics council review" },
          { title: "Implementation readiness" },
        ],
      },
    ],
  },
  architecture: {
    tag: "Under the Hood",
    heading: "System Architecture",
    description:
      "The MVP1 flows, as they stand after the October architecture correction. Fewer moving parts than we started with — on purpose.",
    flows: [
      {
        number: "01",
        title: "Credit Assessment (Credit Data API)",
        description:
          "The primary pre-screening flow — banker triggers, agent fetches, LLM generates. The API gateway sits on both sides.",
        nodes: [
          { icon: "microsoft", title: "D365", caption: "Banker triggers pre-screen", highlight: false },
          { icon: "network", title: "APIM", caption: "Inbound gateway", highlight: false },
          { icon: "robot", title: "Our Agent", caption: "Orchestration + LLM", highlight: true },
          { icon: "shield", title: "API Gateway", caption: "Outbound (JWT)", highlight: false },
          { icon: "database", title: "Credit Data API", caption: "Credit factors data source", highlight: false },
        ],
      },
      {
        number: "02",
        title: "Financial Statements",
        description:
          "MVP1: D365 supplies the Opportunity's financial statements in the request payload; the agent parses, extracts and embeds them. No separate document platform in MVP1.",
        nodes: [
          { icon: "cloud", title: "SharePoint", caption: "Statements stored", highlight: false },
          { icon: "microsoft", title: "D365", caption: "Supplies docs in request", highlight: false },
          { icon: "robot", title: "Agent", caption: "Parse \u2192 extract \u2192 embed", highlight: true },
          { icon: "vector", title: "Weaviate", caption: "Customer Financial collection", highlight: false },
        ],
      },
      {
        number: "03",
        title: "Credit Policy (Static — MVP1)",
        description:
          "The on-prem policy source is not yet integration-ready, so MVP1 ships policy statically: guidance in the prompt, numeric thresholds in config. Policy numbers never touch the LLM.",
        nodes: [
          { icon: "contract", title: "credit_policy.md", caption: "How-to-assess guidance", highlight: false },
          { icon: "sliders", title: "policy_thresholds.yaml", caption: "Versioned numeric config", highlight: false },
          { icon: "robot", title: "Agent", caption: "Prompt + Credit_Calculator", highlight: true },
        ],
      },
      {
        number: "04",
        title: "Monitoring & Observability",
        description:
          "Every trace, metric and log flows out for analysis — because flying blind is not an option.",
        nodes: [
          { icon: "robot", title: "Agent", caption: "Emits traces & metrics", highlight: true },
          { icon: "eye", title: "Langfuse", caption: "LLM tracing & analytics", highlight: false },
          { icon: "chart", title: "Prometheus", caption: "Metrics", highlight: false },
          { icon: "gauge", title: "Grafana", caption: "Dashboards & alerts", highlight: false },
        ],
      },
      {
        number: "05",
        title: "Orchestration State",
        description:
          "PostgreSQL is the system of record for the pre-screen lifecycle — a flat four-table credit_assist schema the stateless agent rehydrates on every request.",
        nodes: [
          { icon: "robot", title: "Agent", caption: "Rehydrates run state", highlight: true },
          { icon: "database", title: "PostgreSQL", caption: "credit_assist schema (4 tables)", highlight: false },
        ],
      },
      {
        number: "06",
        title: "Async Chat (Push, Not Poll)",
        description:
          "The banker chats with the agent from the D365 PCF control. The agent acks fast, then pushes the reply and \u201cThinking Mode\u201d progress back via the D365 callback endpoints.",
        nodes: [
          { icon: "chat", title: "PCF Control", caption: "Banker chat UI", highlight: false },
          { icon: "robot", title: "Agent", caption: "Ack now, reply later", highlight: true },
          { icon: "microsoft", title: "D365 Callbacks", caption: "chat-response / update-credit-status", highlight: false },
        ],
      },
    ],
    modelsIntro:
      "Each job gets the model that fits it. The agent resolves these labels through aiModels.yaml, so swapping a model is a config change, not a code change.",
    models: [
      {
        label: "report-model",
        model: "GPT-4.1",
        deployment: "gpt-41",
        purpose:
          "Pre-screen report generation — financial calculations, ratio cross-checks, structured 14-section output, policy alignment.",
        why: "Best balance of instruction-following accuracy and cost for complex structured generation.",
      },
      {
        label: "chat-model",
        model: "GPT-4o-mini",
        deployment: "gpt-4o-mini",
        purpose: "Banker Q&A, draft amendments, lightweight conversational tasks.",
        why: "Fast, low-cost, and sufficient for short-form responses.",
      },
      {
        label: "extraction-model",
        model: "GPT-4o-mini",
        deployment: "gpt-4o-mini",
        purpose:
          "LLM extraction of financial data from parsed statement PDFs in the document-processing pipeline.",
        why: "Cost and speed for high-volume extraction.",
      },
      {
        label: "embedding-model",
        model: "text-embedding-3-large",
        deployment: "text-embedding-3-large",
        purpose: "Embedding Customer Financial chunks into Weaviate.",
        why: "Called via native AsyncAzureOpenAI, never LangChain (standards §11).",
      },
    ],
    endpointsIntro:
      "MVP1 uses exactly four workflow endpoints: two agent-hosted (inbound) and two CRM-hosted (outbound via the gateway). Every path follows /{system}/credit-assist/{operation}/v{version}.",
    endpoints: [
      {
        method: "POST",
        path: "/agent/credit-assist/initiate-prescreen/v1",
        direction: "CRM → agent",
        purpose: "Start pre-screen orchestration (returns 202; async pipeline).",
        kind: "inbound",
      },
      {
        method: "POST",
        path: "/agent/credit-assist/chat-send/v1",
        direction: "CRM → agent",
        purpose: "Banker chat message (returns 202; reply delivered async via chat-response).",
        kind: "inbound",
      },
      {
        method: "POST",
        path: "/crm/credit-assist/update-credit-status/v1",
        direction: "agent → CRM",
        purpose: "Update the Opportunity's AI Process Status.",
        kind: "outbound",
      },
      {
        method: "POST",
        path: "/crm/credit-assist/chat-response/v1",
        direction: "agent → CRM",
        purpose:
          "Push chat replies, updated drafts and Thinking Mode narration back to the PCF control.",
        kind: "outbound",
      },
      {
        method: "POST",
        path: "/credit-data/customer-credit-factors/v1",
        direction: "agent → Credit Data API (via gateway)",
        purpose:
          "Consumed, not hosted — retrieves customer credit-assessment data for the client (Event 4).",
        kind: "consumed",
      },
      {
        method: "GET",
        path: "/health",
        direction: "Platform → agent",
        purpose: "Liveness probe — process alive, no dependency checks.",
        kind: "ops",
      },
      {
        method: "GET",
        path: "/ready",
        direction: "Platform → agent",
        purpose: "Readiness probe — Postgres, Weaviate and Langfuse must all be up.",
        kind: "ops",
      },
      {
        method: "POST",
        path: "/auth/pcf/token/v1",
        direction: "PCF → agent",
        purpose: "Operational token endpoint for the PCF chat control.",
        kind: "ops",
      },
    ],
    endpointsNote:
      "All cross-boundary traffic routes through the enterprise API gateway — inbound (CRM → agent) and outbound (agent → credit data, agent → CRM callbacks). The agent never calls an external system directly. Outbound calls are authenticated with a consumer-signed JWT (RS256).",
    techStack: [
      "Python 3.11",
      "FastAPI",
      "GPT-4.1 / 4o-mini",
      "text-embedding-3-large",
      "Docker",
      "OpenShift",
      "PostgreSQL",
      "Weaviate",
      "Prometheus",
      "Langfuse",
      "API Gateway",
      "Azure APIM",
      "D365 / PCF",
    ],
  },
  lessons: {
    tag: "The Honest Part",
    heading: "Lessons Learned",
    description:
      "Nine themes from building the business unit's first AI initiative — what happened, and what we take forward.",
    items: [
      {
        num: "1",
        title: "Knowledge sharing",
        summary: "Standing forum beats ad hoc discovery",
        happened: [
          "The team attends a weekly Kiro knowledge-sharing session, where members share platform insights and lessons learned, keeping everyone current with the latest developments.",
        ],
        lesson:
          "A regular, standing forum for a new toolchain spreads hard-won knowledge far faster than ad-hoc discovery.",
      },
      {
        num: "2",
        title: "Methodology",
        summary: "Up-front way-of-working investment pays off later",
        happened: [
          "AI initiatives were new to the business unit. Establishing the right methodology and a repeatable delivery pipeline took longer than a typical project.",
          "Elements of Scaled Agile were applied — PI Planning, sprint planning, DSU, weekly primers and bi-weekly demos.",
        ],
        lesson:
          "This up-front investment in finding the best way of working is expected to pay off on future AI initiatives.",
      },
      {
        num: "3",
        title: "Project governance",
        summary: "Engage LIA & name owners early",
        happened: [
          "Engage the lead information architect before governance kick-off, and keep lines of communication open throughout the project lifecycle.",
          "Ensure data sources are understood and AI-ready before build starts.",
          "Ensure the architecture is understood and well designed before committing.",
          "Identify technical, business and data owners up front.",
        ],
        lesson:
          "For AI in a regulated domain, naming accountable owners and looping in architecture governance early prevents late-stage rework.",
      },
      {
        num: "4",
        title: "Platform & integration readiness",
        summary: "Integration plumbing is the critical path",
        happened: [
          "Platform certificate tooling was not in place when it was needed, forcing a time-boxed, signed-off workaround.",
          "External integration points (API gateway, document platforms, Graph) were the dominant source of delay across the whole project.",
        ],
        lesson:
          "Validate that the platform can host what your security standards require before designing around them. The integration plumbing — not the agent logic — is the critical path, so start access, certificate and onboarding requests on day one.",
      },
      {
        num: "5",
        title: "Contract renewals & access continuity",
        summary: "Renewals cost ~3 weeks — stagger them",
        happened: [
          "Contractor contract-renewal cycles caused a complete loss of system access for part of the team — roughly three weeks of lost delivery time.",
          "Access had to be fully re-applied for on return (directory roles, source control, certificates, environments).",
        ],
        lesson:
          "Plan contractor renewal timelines and access continuity ahead so approvals overlap existing contracts, avoiding a hard access gap mid-delivery.",
      },
      {
        num: "6",
        title: "Ownership & integration guidance",
        summary: "Peer patterns de-risk fastest",
        happened: [
          "Delivery risk came from unclear platform guidance on external integrations, which needed a dedicated RACI session to assign accountability.",
          "Much of the fastest unblocking came from peer reference patterns from teams already live in production (e.g. an existing agent's gateway setup).",
        ],
        lesson:
          "Establish RACI for shared platform pieces early — don't assume someone owns them — and deliberately build a network of peers who have shipped similar work.",
      },
      {
        num: "7",
        title: "Requirements & architecture iteration",
        summary: "One dated source of truth",
        happened: [
          "Several architecture decisions changed more than once — data-source path, document-retrieval approach, endpoint naming, progress-feedback design.",
          "Design artifacts drifted from the live implementation (e.g. the ERD diverged from the deployed schema).",
        ],
        lesson:
          "AI solution boundaries are hard to pin down early. Expect iteration, but record each decision in one authoritative, dated place and keep a single source of truth per artifact. Stale docs cost more than no docs.",
      },
      {
        num: "8",
        title: "Environments & dependencies",
        summary: "Confirm reachability; pauses decay",
        happened: [
          "The Dev environment couldn't reach external systems, so INT became the development and testing playground.",
          "A long dependency-driven pause had hidden side effects, including a silently expired CI plan branch.",
        ],
        lesson:
          "Confirm environment network reachability early — it reshapes the test strategy. Extended pauses quietly degrade access, branches, tokens and certificates.",
      },
      {
        num: "9",
        title: "AI governance & human-in-the-loop",
        summary: "Human-in-the-loop boundary early",
        happened: [
          "Credit policy had to be delivered as static prompt guidance plus configuration (with a flagged governance exception) because the policy source sat on an incompatible system.",
          "The solution was deliberately positioned as banker-assisted — mandatory human approval, no autonomous credit decisions.",
        ],
        lesson:
          "Define the human-in-the-loop boundary and AI governance sign-off paths early — they constrain the design more than expected.",
      },
    ],
  },
  team: {
    tag: "The Humans",
    heading: "Meet the Team",
    description:
      "The brilliant (and slightly caffeinated) minds behind Credit Assist. We write code, we break things, we fix things. In that order. Usually.",
    members: [
      {
        surname: "van Heerden",
        name: "Jacques van Heerden",
        role: "AI Engineer",
        image: "images/jacques-van-heerden.jpg",
        tags: ["LLM", "Orchestration", "Python"],
      },
      {
        surname: "",
        name: "AI Engineer",
        role: "Requirements & Business Link",
        image: "",
        tags: ["Requirements", "Business Link"],
      },
      {
        surname: "",
        name: "CRM & API Developer",
        role: "Integration",
        image: "",
        tags: ["CRM", "API", "Integration"],
      },
      {
        surname: "",
        name: "UI Dev & Test Lead",
        role: "UI & Quality",
        image: "",
        tags: ["Testing", "UI", "Governance"],
      },
      {
        surname: "",
        name: "Test Analyst",
        role: "Quality Assurance",
        image: "",
        tags: ["Testing", "QA Evidence"],
      },
    ],
    enablersHeading: "Key Stakeholders & Enablers",
    enablersIntro:
      "Delivering AI in a regulated bank takes far more than a delivery team. These are the roles that sponsored, approved, built the platform for, and unblocked Credit Assist.",
    // Roles only: no names or photos of colleagues on a public site.
    enablers: [
      { name: "Product Owner", role: "Ownership & prioritisation" },
      { name: "Executive Sponsor", role: "Data & analytics leadership" },
      { name: "Business & Information Owner", role: "Business accountability" },
      { name: "Solutions Architect", role: "Solution design" },
      { name: "Project Lead & Manager", role: "Delivery & coordination" },
      { name: "AI Platform Team", role: "Platform, architecture & enablement" },
      { name: "Data Steward", role: "Data quality & access" },
      { name: "Data Protection Officer", role: "Privacy & compliance" },
      { name: "Information Architects", role: "Architecture governance" },
      { name: "AI & Model Risk", role: "Risk review & approval" },
      { name: "Compliance", role: "Regulatory sign-off" },
      { name: "Systems Architects", role: "Integration & credit data APIs" },
    ],
  },
  status: {
    tag: "Right Now",
    heading: "Current Status",
    description: "Project health at a glance. Last updated: November 2026.",
    cards: [
      { tone: "green", title: "/health", value: "OK", env: "Integration Environment" },
      { tone: "green", title: "/ready", value: "Ready — postgres, weaviate, langfuse", env: "Integration Environment" },
      { tone: "blue", title: "Version", value: "2.5.0", env: "main.py" },
      { tone: "yellow", title: "Blocker", value: "Gateway TLS fault — credit data path (Event 4)", env: "Network team" },
    ],
    items: [
      { label: "Infrastructure & CI/CD", state: "done" },
      { label: "Agent built & deployed to the integration environment", state: "done" },
      { label: "Langfuse observability", state: "done" },
      { label: "Architecture decisions locked", state: "done" },
      { label: "API gateway consumer + provider onboarding", state: "done" },
      { label: "credit_assist schema migrated", state: "done" },
      { label: "Canonical 14-event model", state: "done" },
      { label: "Weaviate readiness green", state: "done" },
      { label: "Events 1–10 implemented (spec complete)", state: "done" },
      { label: "First initiate-prescreen → 202 (Events 1–3)", state: "done" },
      { label: "JWT signing — gateway handshake reached", state: "done" },
      { label: "Agent signing key registered with the gateway", state: "done" },
      { label: "Event 4 - Credit data (gateway TLS fault)", state: "in-progress" },
      { label: "Event 3 - CRM (callback routing error)", state: "in-progress" },
      { label: "Document-payload shape confirmed", state: "pending" },
      { label: "First credit-data response — core flow proven end-to-end", state: "pending" },
      {
        label: "Unit testing of each individual event",
        state: "pending",
        subitems: [
          { num: 1, label: "Opportunity Pre-screen Request Activated" },
          { num: 2, label: "Processing State Started" },
          { num: 3, label: "Credit Data Context Retrieved" },
          { num: 4, label: "Documents Retrieved and Validated" },
          { num: 5, label: "Financial Data Extracted and Vectorised" },
          { num: 6, label: "Policy Context Loaded" },
          { num: 7, label: "Deterministic Calculations Completed" },
          { num: 8, label: "Draft Pre-screen Generated" },
          { num: 9, label: "Draft Published and Banker Notified" },
          { num: 10, label: "Banker Query Answered" },
          { num: 11, label: "Draft Amendment Applied" },
          { num: 12, label: "Recalculation Requested" },
          { num: 13, label: "Final Word Document Generated" },
          { num: 14, label: "Final Artifact Linked and Status Completed" },
        ],
      },
      { label: "Move signing certificate to a platform secret", state: "pending" },
      { label: "Promote develop → release (QA/Stress/Prod)", state: "pending" },
      { label: "QA sign-off + product owner demo", state: "pending" },
    ],
  },
};

// Validate at module load — fail loudly if the shape drifts.
export const content: Content = ContentSchema.parse(raw);

/**
 * MVP1 progress, derived from the checklist so it can never drift from it.
 *  - each top-level item counts as one unit of work;
 *  - "done" earns full credit, "in-progress" and "pending" earn none (still left);
 *  - an item with a breakdown (e.g. per-event unit tests) earns partial credit
 *    for its done sub-items, so ticking events off moves the bar.
 */
export function mvp1Progress(items: Content["status"]["items"]) {
  const credit = (it: Content["status"]["items"][number]) =>
    it.subitems.length > 0
      ? it.subitems.filter((s) => s.state === "done").length / it.subitems.length
      : it.state === "done"
        ? 1
        : 0;
  const total = items.length;
  const earned = items.reduce((sum, it) => sum + credit(it), 0);
  return {
    percent: total ? Math.round((earned / total) * 100) : 0,
    done: items.filter((it) => credit(it) === 1).length,
    inProgress: items.filter((it) => it.state === "in-progress").length,
    total,
  };
}

/** Core team in the order written (names kept only for the author). */
export const teamBySurname: TeamMember[] = [...content.team.members];

/** Stakeholder roles, in the order written. */
export const enablersBySurname: Partner[] = [...content.team.enablers];
