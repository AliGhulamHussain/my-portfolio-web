// ─────────────────────────────────────────────────────────────
// THE DECK — every card in the portfolio, plus the scroll zones
// and formation math that choreograph how cards deal in and out.
// ─────────────────────────────────────────────────────────────

// Section heights in vh. Zone fractions are derived from these so the
// scroll spacers and the 3D choreography always stay in sync.
export const SECTIONS = [
  { id: "hero", label: "The Deck", vh: 100 },
  { id: "about", label: "Identity", vh: 170 },
  { id: "skills", label: "Skills", vh: 190 },
  { id: "projects", label: "Projects", vh: 360 },
  { id: "contact", label: "Contact", vh: 180 },
];

const total = SECTIONS.reduce((s, z) => s + z.vh, 0);
let acc = 0;
export const ZONES = {};
for (const s of SECTIONS) {
  ZONES[s.id] = { start: acc / total, end: (acc + s.vh) / total };
  acc += s.vh;
}

export const SUITS = {
  about: { glyph: "◈", name: "Identity" },
  skills: { glyph: "⬡", name: "Skill" },
  projects: { glyph: "▲", name: "Project" },
  contact: { glyph: "✦", name: "Contact" },
};

export const CARDS = [
  // ── Identity ──────────────────────────────────────────────
  {
    id: "id-builder",
    zone: "about",
    code: "A·01",
    title: "The Builder",
    subtitle: "Ali Ghulam Hussain",
    body: "I don't just write code — I understand the business first, then shape the software around how it works.",
    details:
      "Every project I've shipped started as a real business problem, not a portfolio piece. Full-stack developer based in Badin, Sindh, Pakistan.",
    chips: ["Full-Stack Developer", "Badin, Sindh"],
  },
  {
    id: "id-deployer",
    zone: "about",
    code: "A·02",
    title: "The Deployer",
    subtitle: "Concept → production",
    body: "\"localhost:3000 is not a product.\"",
    details:
      "I take projects from concept to production — VPS setup, Nginx config, Cloudflare, PM2, domain — the whole thing. 2+ years shipping production software for real clients in Pakistan and internationally.",
    chips: ["2+ yrs shipping", "8+ systems live"],
  },
  {
    id: "id-integrator",
    zone: "about",
    code: "A·03",
    title: "The Integrator",
    subtitle: "University of Sindh · Final Year",
    body: "\"AI is just another tool in the stack.\"",
    details:
      "I've integrated Gemini AI, Llama 3.1, TensorFlow, and face-api.js across real production projects — not demos. Final-year BSCS student (2023–2027), currently building SmartGate, an AI face-recognition access control system, as my Final Year Project.",
    chips: ["BSCS · Final Year", "AI Integration"],
  },

  // ── Skills ────────────────────────────────────────────────
  {
    id: "sk-frontend",
    zone: "skills",
    code: "S·01",
    title: "Frontend",
    subtitle: "Interfaces that ship",
    body: "Fast, responsive interfaces built with modern component frameworks.",
    details:
      "React.js, Next.js, TypeScript and JavaScript styled with Tailwind CSS, animated with Framer Motion, built on solid HTML5 fundamentals.",
    chips: ["React.js", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "HTML5", "Framer Motion"],
  },
  {
    id: "sk-backend",
    zone: "skills",
    code: "S·02",
    title: "Backend",
    subtitle: "APIs & systems",
    body: "Clean REST APIs and business logic that hold up in production.",
    details:
      "Node.js and Express.js servers, NestJS for structured apps, JWT authentication, custom middleware, and WebSockets for realtime features.",
    chips: ["Node.js", "Express.js", "NestJS", "REST APIs", "JWT Authentication", "Middleware", "WebSockets"],
  },
  {
    id: "sk-db",
    zone: "skills",
    code: "S·03",
    title: "Databases",
    subtitle: "The right store per job",
    body: "From offline SQLite to relational and document stores at scale.",
    details:
      "Schema design and query optimization across PostgreSQL, MySQL, MongoDB and SQLite, depending on what the project needs.",
    chips: ["PostgreSQL", "MySQL", "MongoDB", "SQLite", "Database Design", "Query Optimization"],
  },
  {
    id: "sk-ai",
    zone: "skills",
    code: "S·04",
    title: "AI & Machine Learning",
    subtitle: "Applied, not hyped",
    body: "AI features embedded in real products — recognition, generation, optimization.",
    details:
      "Face recognition with face-api.js and TensorFlow; LLM integration via Gemini AI, Llama 3.1 and OpenRouter.",
    chips: ["face-api.js", "TensorFlow", "Gemini AI", "Llama 3.1", "OpenRouter"],
  },
  {
    id: "sk-devops",
    zone: "skills",
    code: "S·05",
    title: "DevOps & Tools",
    subtitle: "It runs, everywhere",
    body: "Self-hosted VPS boxes, containers, and edge networking.",
    details:
      "Git version control, Docker containers, Nginx reverse proxies, PM2 process management, Cloudflare (including Tunnels) for edge delivery, and PWA packaging for installable apps.",
    chips: ["Git", "Docker", "Cloudflare", "Nginx", "PM2", "Cloudflare Tunnels", "VPS Deployment", "PWA"],
  },

  // ── Projects ──────────────────────────────────────────────
  {
    id: "pr-bstraders",
    zone: "projects",
    code: "P·01",
    title: "BS Traders",
    subtitle: "Distribution Management System",
    body: "Full distribution management system for a real Pakistan business — dual-role admin dashboard and mobile-first booker interface for field operations.",
    details:
      "Installable as a PWA. Order booking, customer ledger (khata), inventory, vendor management, payroll, and analytics. Live in production for a real paying client.",
    chips: ["React", "Node.js", "Express", "SQLite", "PWA", "Cloudflare"],
    link: "https://bstraders.shop",
  },
  {
    id: "pr-ukshop",
    zone: "projects",
    code: "P·02",
    title: "UK Shop",
    subtitle: "E-Commerce Platform",
    body: "Full-stack e-commerce platform built fully remotely for an international client in South Africa.",
    details:
      "Product catalog, cart, COD checkout, and an admin dashboard, with AI-generated product descriptions using Gemini AI.",
    chips: ["React", "TypeScript", "Node.js", "SQLite", "Gemini AI", "Cloudflare"],
    link: "https://ukshop.co.za",
  },
  {
    id: "pr-flourmill",
    zone: "projects",
    code: "P·03",
    title: "Baba Flour Mill",
    subtitle: "Business Management System",
    body: "Complete offline management system for a flour mill, covering the entire workflow from raw material to final sale.",
    details:
      "Includes a pisai (grinding) service for walk-in customers. Raw material tracking, production, POS, customer ledger, expense tracking, and daily/monthly reports — fully offline, on-site, running under PM2.",
    chips: ["React", "Node.js", "Express", "SQLite", "PM2"],
  },
  {
    id: "pr-kashaf",
    zone: "projects",
    code: "P·04",
    title: "Kashaf Institute",
    subtitle: "School Management System",
    body: "Complete institutional management system deployed and actively running at a real institution in Badin.",
    details:
      "116+ students migrated on launch day. Course & batch management, enrollment, fee tracking, attendance, finance, and role-based auth.",
    chips: ["React", "TypeScript", "Node.js", "SQLite", "Shadcn/ui"],
  },
  {
    id: "pr-saas",
    zone: "projects",
    code: "P·05",
    title: "School Management SaaS",
    subtitle: "Multi-Tenant Cloud Platform",
    body: "Cloud-based multi-tenant school management platform running across multiple institutions with isolated data per school.",
    details:
      "Admin, teacher, student and parent portals; fee management, attendance, and PWA support for offline-first use.",
    chips: ["React", "Node.js", "PostgreSQL", "PWA"],
  },
  {
    id: "pr-pharmacy",
    zone: "projects",
    code: "P·06",
    title: "Pharmacy Management System",
    subtitle: "Hospital POS & Inventory",
    body: "POS and inventory system running in a local hospital pharmacy, with critical FEFO logic ensuring medicines sell before expiry.",
    details:
      "FEFO batch tracking, thermal receipts, credit sales, supplier invoicing, and stock alerts for high-volume counter use.",
    chips: ["React", "Node.js", "MySQL", "SQLite"],
  },
  {
    id: "pr-smartgate",
    zone: "projects",
    code: "P·07",
    title: "SmartGate",
    subtitle: "AI Face Recognition Access Control",
    body: "Final Year Project — AI-powered face recognition for automated attendance and physical access control, with a live admin dashboard.",
    details:
      "Real-time entry/exit tracking, occupancy monitoring, activity logs, and face enrollment/recognition. Currently in active development.",
    chips: ["React", "Node.js", "Express", "PostgreSQL", "face-api.js", "TensorFlow"],
  },
  {
    id: "pr-postcraft",
    zone: "projects",
    code: "P·08",
    title: "PostCraft AI",
    subtitle: "LinkedIn Chrome Extension",
    body: "AI-powered Chrome extension that analyzes and optimizes LinkedIn posts in real time.",
    details:
      "86/100 average quality score with real beta testers. Real-time post scoring, AI rewrites, analytics and history tracking.",
    chips: ["NestJS", "PostgreSQL", "Prisma", "Llama 3.1", "OpenRouter"],
  },

  // ── Contact ───────────────────────────────────────────────
  {
    id: "ct-email",
    zone: "contact",
    code: "C·01",
    title: "Email",
    subtitle: "Drop a message",
    body: "alighulamhussain007@gmail.com",
    details: "For work, collaborations, or anything worth building.",
    chips: ["Primary contact"],
    link: "mailto:alighulamhussain007@gmail.com",
    linkLabel: "Drop a message",
  },
  {
    id: "ct-linkedin",
    zone: "contact",
    code: "C·02",
    title: "LinkedIn",
    subtitle: "Let's connect",
    body: "linkedin.com/in/ali-ghulam-hussain-408b4225a",
    details: "Connect for professional updates and project breakdowns.",
    chips: ["Open to work"],
    link: "https://linkedin.com/in/ali-ghulam-hussain-408b4225a",
    linkLabel: "Let's connect",
  },
  {
    id: "ct-github",
    zone: "contact",
    code: "C·03",
    title: "GitHub",
    subtitle: "See the code",
    body: "The source behind the deck and my other projects.",
    details: "Repos, experiments, and the code behind everything in this deck.",
    chips: ["Open source-ish"],
    link: "https://github.com/AliGhulamHussain",
    linkLabel: "See the code",
  },
  {
    id: "ct-phone",
    zone: "contact",
    code: "C·04",
    title: "Phone",
    subtitle: "WhatsApp welcome",
    body: "+92 316 3765386",
    details: "Calls and WhatsApp, Pakistan hours (PKT, UTC+5).",
    chips: ["PKT · UTC+5"],
    link: "tel:+923163765386",
    linkLabel: "Call or WhatsApp",
  },
];

// Index of each card within its own zone (deal order)
export const zoneIndex = (() => {
  const counters = {};
  const map = {};
  CARDS.forEach((c) => {
    counters[c.zone] = counters[c.zone] ?? 0;
    map[c.id] = counters[c.zone]++;
  });
  return map;
})();

export const ZONE_COUNTS = CARDS.reduce((m, c) => {
  m[c.zone] = (m[c.zone] || 0) + 1;
  return m;
}, {});

// ─────────────────────────────────────────────────────────────
// Formations — where each zone's cards fly to (world units).
// Card ≈ 2.2 × 3.15 world units (280×400px @ distanceFactor 3.2).
// ─────────────────────────────────────────────────────────────

export const DECK_POS = [0, -2.55, 0];

const FAN = {
  about: [
    { x: -2.75, y: 0.42, z: 2.0, rz: 0.11, ry: 0.14 },
    { x: 0, y: 0.68, z: 2.15, rz: 0, ry: 0 },
    { x: 2.75, y: 0.42, z: 2.0, rz: -0.11, ry: -0.14 },
  ],
  skills: [
    { x: -5.4, y: 0.05, z: 0.9, rz: 0.18, ry: 0.2 },
    { x: -2.75, y: 0.72, z: 1.1, rz: 0.09, ry: 0.1 },
    { x: 0, y: 0.98, z: 1.2, rz: 0, ry: 0 },
    { x: 2.75, y: 0.72, z: 1.1, rz: -0.09, ry: -0.1 },
    { x: 5.4, y: 0.05, z: 0.9, rz: -0.18, ry: -0.2 },
  ],
  contact: [
    { x: -4.35, y: 0.18, z: 2.3, rz: 0.15, ry: 0.16 },
    { x: -1.45, y: 0.52, z: 2.45, rz: 0.05, ry: 0.05 },
    { x: 1.45, y: 0.52, z: 2.45, rz: -0.05, ry: -0.05 },
    { x: 4.35, y: 0.18, z: 2.3, rz: -0.15, ry: -0.16 },
  ],
};

// Projects: dealt to centre stage one by one, then tossed to discard piles
const STAGE = { x: 0, y: 0.35, z: 4.6, rz: 0, ry: 0 };
const discardFor = (k) => {
  const side = k % 2 === 0 ? -1 : 1;
  const row = Math.floor(k / 2);
  return {
    x: side * (5.6 + row * 0.14),
    y: -0.5 + row * 0.16,
    z: 0.6 + row * 0.09,
    rz: side * -(0.32 + row * 0.07),
    ry: side * -0.12,
  };
};

// Deterministic pseudo-random per card for deck jitter
const jitter = (i, salt) => {
  const v = Math.sin(i * 127.1 + salt * 311.7) * 43758.5453;
  return v - Math.floor(v) - 0.5;
};

const clamp01 = (v) => Math.max(0, Math.min(1, v));
const ease = (t) => t * t * (3 - 2 * t); // smoothstep

/**
 * Compute the target transform for one card given global scroll progress.
 * Returns [x, y, z, rx, ry, rz, scale, act] — act = how "dealt" it is,
 * used for the flight arc and by the caller for hover gating.
 */
export function cardTarget(card, i, progress, time, spreadK) {
  const k = zoneIndex[card.id];
  const zone = ZONES[card.zone];
  const local = (progress - zone.start) / (zone.end - zone.start);

  // Deck (face-down) resting transform
  const dx = DECK_POS[0] + jitter(i, 1) * 0.09;
  const dy = DECK_POS[1] + i * 0.004 + Math.sin(time * 0.8 + i * 0.55) * 0.014;
  const dz = DECK_POS[2] + i * 0.016;
  const drz = jitter(i, 2) * 0.07;

  let act, fx, fy, fz, frz, fry;

  if (card.zone === "projects") {
    // Two-phase: deck -> centre stage -> discard pile
    const slot = k * 0.115;
    const a = ease(clamp01((local - slot) / 0.048));
    const b = ease(clamp01((local - slot - 0.082) / 0.05));
    const back = ease(clamp01((local - 1.0) / 0.09)); // fold back into deck
    const D = discardFor(k);

    let x = dx + (STAGE.x - dx) * a + (D.x * spreadK - STAGE.x) * b;
    let y = dy + (STAGE.y - dy) * a + (D.y - STAGE.y) * b;
    let z = dz + (STAGE.z - dz) * a + (D.z - STAGE.z) * b;
    let rz = drz + (STAGE.rz - drz) * a + (D.rz - STAGE.rz) * b;
    let ry = Math.PI * (1 - a) + D.ry * b;

    // fold back into the deck after the zone
    x += (dx - x) * back;
    y += (dy - y) * back;
    z += (dz - z) * back;
    rz += (drz - rz) * back;
    ry += (Math.PI - ry) * back;

    // flight arcs
    y += Math.sin(a * Math.PI) * 1.5 + Math.sin(b * Math.PI) * 0.9;
    act = a * (1 - b);

    return [x, y, z, 0, ry, rz, 1, act];
  }

  // Fan zones: deal in near zone start, fold back near zone end
  const stag = card.zone === "about" ? 0.1 : 0.075;
  const inA = (local - 0.04 - k * stag) / 0.17;
  const outA = (1.04 - local) / 0.1;
  act = ease(clamp01(Math.min(inA, outA)));

  const F = FAN[card.zone][k];
  fx = F.x * spreadK;
  fy = F.y + Math.sin(time * 0.9 + k * 1.7) * 0.05 * act;
  fz = F.z;
  frz = F.rz + Math.sin(time * 0.6 + k * 2.3) * 0.012 * act;
  fry = F.ry;

  let x = dx + (fx - dx) * act;
  let y = dy + (fy - dy) * act;
  let z = dz + (fz - dz) * act;
  let rz = drz + (frz - drz) * act;
  let ry = Math.PI * (1 - act) + fry * act;

  // flight arc + the contact cards get a full stylish toss-spin
  y += Math.sin(act * Math.PI) * 1.55;
  z += Math.sin(act * Math.PI) * 0.8;
  if (card.zone === "contact") {
    const dir = k % 2 ? -1 : 1;
    // (1-act)·2π offset ≡ same visual angle in the deck, so as act rises
    // the spring drives a full stylish spin during the toss.
    rz += Math.sin(act * Math.PI) * 0.5 + (1 - act) * Math.PI * 2 * dir;
  }

  return [x, y, z, 0, ry, rz, 1, act];
}

export const CONTACT_INFO = {
  email: "alighulamhussain007@gmail.com",
  phone: "+92 316 3765386",
  linkedin: "https://linkedin.com/in/ali-ghulam-hussain-408b4225a",
  github: "https://github.com/AliGhulamHussain",
};

export const CLOSING_LINE =
  "A blacksmith doesn't fight the iron — he understands it, then shapes it. Good software works the same way.";
