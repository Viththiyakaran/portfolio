export type Project = {
  slug: string; title: string; summary: string; description: string; updated: string; technologies: string[]; type: 'CreativeWork' | 'SoftwareApplication';
  problem: string; context: string; users: string; requirements: string[]; solution: string; architecture: string; security: string[]; challenges: string; decisions: string[]; outcomes: string; lessons: string;
};

export const projects: Project[] = [
  {
    slug: 'qr-facility-access-system', title: 'QR Facility Access Management System', updated: '2026-07-15', type: 'CreativeWork',
    summary: 'A privacy-conscious architecture case study for managing QR-based facility access, attendance and auditable administration.',
    description: 'Explore a .NET and React architecture case study for secure QR facility access, role-based administration and practical operational support.',
    technologies: ['ASP.NET Core', 'React', 'PostgreSQL', 'Azure', 'OpenID Connect'],
    problem: 'Paper registers and shared spreadsheets make access records slow to reconcile and difficult to audit. Operators need a quick check-in flow without exposing personal information in a QR code.',
    context: 'This is a portfolio architecture case study, not a claim about a deployed client system. It demonstrates how I would turn an operational requirement into a supportable business application.',
    users: 'Visitors need a fast check-in; reception staff need clear status feedback; authorised administrators need reporting and exception handling; support teams need traceable diagnostics.',
    requirements: ['Keep personally identifiable data out of QR payloads', 'Support role-based access and revocation', 'Provide a clear audit trail', 'Remain usable on small mobile screens', 'Degrade safely during temporary connectivity problems'],
    solution: 'The proposed flow exchanges a short-lived opaque token for a server-side access decision. A React interface gives staff a focused scan-and-confirm experience, while an ASP.NET Core API owns authorisation, validation and audit events.',
    architecture: 'A server-rendered web shell loads the scanner only when required. The API separates identity, access policy and reporting modules. PostgreSQL stores transactional data; append-only audit events support investigation without becoming the operational source of truth.',
    security: ['Short-lived, single-purpose QR tokens', 'Least-privilege roles enforced in the API', 'Rate limiting and replay detection', 'Encrypted transport and managed secrets', 'Retention rules for access and audit records'],
    challenges: 'The central trade-off is speed versus assurance. A scan must feel immediate, but cached or offline decisions can become unsafe when access is revoked.',
    decisions: ['Prefer online authorisation for final access decisions', 'Use opaque tokens rather than encoded personal data', 'Log decision reasons without recording unnecessary sensitive data', 'Keep recovery workflows explicit for support staff'],
    outcomes: 'The design produces a testable boundary between identity, policy and the user interface. Success would be measured with check-in completion time, failed-scan reasons, support volume and audit completeness after a real pilot.',
    lessons: 'Operational exceptions deserve first-class design. Expired codes, duplicate scans and temporary outages need understandable recovery paths, not generic error messages.'
  },
  {
    slug: 'fuelops-rota-planning', title: 'FuelOps Rota Planning', updated: '2026-07-15', type: 'CreativeWork',
    summary: 'A business software concept for clear weekly rota planning, shift validation and staff availability.',
    description: 'A practical business software case study covering rota planning, validation, accessibility and maintainable React application architecture.',
    technologies: ['TypeScript', 'React', '.NET', 'SQL', 'Playwright'],
    problem: 'Small teams often coordinate shifts through messages and spreadsheets, creating overlaps, uncovered periods and uncertainty about the current version.',
    context: 'This portfolio concept explores software automation for small businesses. It is an honest technical design exercise rather than a published customer result.',
    users: 'Managers prepare schedules; team members confirm availability; support staff investigate validation or notification failures.',
    requirements: ['Make weekly coverage easy to scan', 'Prevent overlapping assignments', 'Preserve a history of schedule changes', 'Support keyboard and touch interaction', 'Export a stable printable view'],
    solution: 'A constraint-aware planning screen surfaces conflicts before publication. The API treats drafts and published rotas as distinct states and records who made each material change.',
    architecture: 'A React planning interface consumes a versioned .NET API. Domain rules live in the application layer rather than UI components. SQL transactions protect publication, and a background queue would handle notifications.',
    security: ['Role-based schedule editing', 'Tenant-scoped data access', 'Audit events for publication and amendments', 'Server-side validation of every change', 'Minimal personal data in notifications'],
    challenges: 'Dense scheduling interfaces can become inaccessible. Drag-and-drop alone is insufficient, especially for keyboard users and small screens.',
    decisions: ['Provide form-based editing alongside direct manipulation', 'Validate on both client and server', 'Use optimistic concurrency when publishing', 'Keep notification delivery outside the scheduling transaction'],
    outcomes: 'The design makes schedule state and conflicts explicit. A live implementation would measure uncovered shifts, amendment frequency, publishing time and notification delivery—not invent productivity claims.',
    lessons: 'A useful planning tool is built around exceptions and clarity. Visual polish matters, but trustworthy validation and an understandable history matter more.'
  }
];

export type Post = { slug: string; title: string; seoTitle: string; description: string; published: string; updated: string; author: string; category: string; tags: string[]; draft: boolean; featuredImage: string; featuredImageAlt: string; relatedProjects: string[]; relatedPosts: string[]; intro: string; sections: { heading: string; paragraphs: string[] }[] };

export const posts: Post[] = [
  {
    slug: 'secure-qr-access-system-design', title: 'How to Design a Secure QR Access System', seoTitle: 'Designing a Secure QR Access System',
    description: 'A practical guide to QR access system architecture, covering opaque tokens, authorisation, replay protection, audit trails and supportability.',
    published: '2026-06-18', updated: '2026-07-15', author: 'Viththiyakaran Nadarajah', category: 'Software Architecture', tags: ['.NET', 'Security', 'QR codes'], draft: false,
    featuredImage: '/api/og?title=Secure%20QR%20Access%20System', featuredImageAlt: 'Architecture layers for a secure QR access system', relatedProjects: ['qr-facility-access-system'], relatedPosts: ['supportable-business-software'],
    intro: 'A QR code should identify a short-lived request, not act as a portable database record. The safest designs keep sensitive data on the server and make every access decision against current policy.',
    sections: [
      { heading: 'Start with the threat model', paragraphs: ['List what could go wrong before choosing a library: screenshots can be shared, tokens can be replayed, staff accounts can be over-privileged, and logs can collect more personal data than intended.', 'Turn those risks into testable controls. Expiry, single-use rules, rate limits and role checks should be enforced by the server rather than trusted to the scanning device.'] },
      { heading: 'Use opaque, short-lived tokens', paragraphs: ['Avoid embedding a name, email address or permission set in the visible QR payload. An opaque random token limits disclosure and lets the server revoke access without changing the physical code format.', 'Sign or securely store token state, compare it safely, and record the reason for rejection. Error messages shown to visitors can stay simple while authorised support staff receive a traceable diagnostic.'] },
      { heading: 'Design the audit trail for support', paragraphs: ['An audit trail should answer who attempted what, when, against which policy version and with what result. It should not become an excuse to retain unnecessary personal data indefinitely.', 'Define retention, access and export rules early. Good operational tooling turns failed scans into actionable categories instead of an undifferentiated error count.'] },
      { heading: 'Plan for unreliable connections', paragraphs: ['Offline access decisions are a policy choice, not merely a caching technique. If revocation must take effect immediately, the system needs online authorisation or a tightly bounded offline window.', 'Make the degraded state visible and document recovery steps. Supportable systems fail clearly and protect the user from unknowingly relying on stale permissions.'] }
    ]
  },
  {
    slug: 'supportable-business-software', title: 'Building Business Software That Is Easier to Support', seoTitle: 'How to Build Supportable Business Software',
    description: 'Practical ways small-business software can reduce support friction through clear errors, audit events, simple architecture and useful diagnostics.',
    published: '2026-07-02', updated: '2026-07-15', author: 'Viththiyakaran Nadarajah', category: 'Technical Support', tags: ['Support', 'Observability', 'Small business'], draft: false,
    featuredImage: '/api/og?title=Supportable%20Business%20Software', featuredImageAlt: 'Application, diagnostics and support workflow connected in layers', relatedProjects: ['fuelops-rota-planning'], relatedPosts: ['secure-qr-access-system-design'],
    intro: 'Supportability begins during product design. Clear state, useful diagnostics and small failure boundaries help users recover quickly and give technical support engineers evidence they can act on.',
    sections: [
      { heading: 'Make application state understandable', paragraphs: ['Users should be able to tell whether work is saved, pending, published or rejected. Ambiguous state produces duplicate actions and difficult support conversations.', 'Use specific language and retain stable identifiers that a user can safely share with support. Avoid exposing raw stack traces or internal database details.'] },
      { heading: 'Log decisions, not noise', paragraphs: ['A useful event explains the operation, outcome and correlation identifier. High-volume debug output without context makes an incident harder to investigate.', 'Choose structured fields deliberately, redact secrets and set retention according to operational need. Logs need access controls because they often contain sensitive context.'] },
      { heading: 'Separate recovery from diagnosis', paragraphs: ['A user may need a simple retry or correction, while an engineer needs the underlying failure category. Design both experiences without making the public message frightening or vague.', 'Runbooks should connect known symptoms to checks, owners and safe recovery actions. When the same incident repeats, improve the product or automation rather than extending the runbook forever.'] }
    ]
  }
];

export const services = [
  { slug: 'website-development', title: 'Website Development', description: 'Accessible, fast website development for small businesses in Newtown, Powys and across Wales, with maintainable content and SEO foundations.', audience: 'Small organisations that need a clear, credible website without unnecessary platform complexity.', deliverables: ['Content and information architecture', 'Responsive, accessible interface', 'Technical SEO and analytics-ready measurement', 'Deployment guidance and maintainable documentation'] },
  { slug: 'business-software-automation', title: 'Business Software & Automation', description: 'Practical business software development and workflow automation for small teams in Wales and UK remote clients.', audience: 'Teams replacing repetitive spreadsheets, disconnected forms or fragile manual hand-offs.', deliverables: ['Workflow discovery', 'Small, testable application increments', 'Secure integrations and validation', 'Support documentation and measured handover'] },
  { slug: 'technical-support', title: 'Technical & Application Support', description: 'Structured technical support, application troubleshooting and operational documentation for organisations in Wales and remotely across the UK.', audience: 'Teams that need calm investigation, clearer diagnostics and durable fixes for recurring application problems.', deliverables: ['Incident investigation', 'Knowledge-base and runbook improvements', 'Root-cause analysis', 'Monitoring and supportability recommendations'] }
] as const;

export const publishedPosts = posts.filter((post) => !post.draft);
