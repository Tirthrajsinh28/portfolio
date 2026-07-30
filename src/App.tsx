import {
  type AnchorHTMLAttributes,
  type MouseEvent,
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { projects } from "./data/projects";

const navigation = [
  ["Home", "/"],
  ["About", "/about"],
  ["Projects", "/projects"],
  ["Experience", "/experience"],
  ["Skills", "/skills"],
  ["Contact", "/contact"],
] as const;

type RouterValue = {
  path: string;
  navigate: (path: string) => void;
};

const RouterContext = createContext<RouterValue | undefined>(undefined);

function normalizePath(path: string) {
  if (!path.startsWith("/")) {
    return "/";
  }

  const normalized = path.split(/[?#]/, 1)[0] ?? "/";
  return normalized.length > 1 ? normalized.replace(/\/+$/, "") : normalized;
}

function getCurrentPath() {
  if (typeof window === "undefined") {
    return "/";
  }

  return normalizePath(window.location.pathname);
}

function useRouter() {
  const value = useContext(RouterContext);
  if (!value) {
    throw new Error("Router context is missing.");
  }
  return value;
}

function Link({
  children,
  onClick,
  to,
  ...props
}: Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  children: ReactNode;
  to: string;
}) {
  const { navigate } = useRouter();

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    onClick?.(event);

    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.altKey ||
      event.ctrlKey ||
      event.shiftKey ||
      props.target
    ) {
      return;
    }

    event.preventDefault();
    navigate(to);
  }

  return (
    <a {...props} href={to} onClick={handleClick}>
      {children}
    </a>
  );
}

function NavLink({
  children,
  className,
  end,
  to,
}: {
  children: ReactNode;
  className?: (state: { isActive: boolean }) => string | undefined;
  end?: boolean;
  to: string;
}) {
  const { path } = useRouter();
  const isActive = end ? path === to : path === to || path.startsWith(`${to}/`);

  return (
    <Link
      aria-current={isActive ? "page" : undefined}
      className={className?.({ isActive })}
      to={to}
    >
      {children}
    </Link>
  );
}

function usePageTitle(title: string) {
  useEffect(() => {
    document.title = `${title} | Tirthrajsinh Parmar`;
  }, [title]);
}

function PageHeading({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro: string;
}) {
  return (
    <header className="page-heading">
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      <p className="lede">{intro}</p>
    </header>
  );
}

function HomePage() {
  usePageTitle("Backend-Focused Software Engineer");

  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero__copy">
          <p className="eyebrow">Independent engineering portfolio</p>
          <h1 id="hero-title">
            Reliable backends.
            <span> Clear evidence.</span>
          </h1>
          <p className="lede">
            I&apos;m Tirthrajsinh Parmar, a backend-focused software engineer
            in the Greater Calgary area. I build APIs, cloud applications, and
            developer tools with an emphasis on maintainability, testing, and
            honest operational documentation.
          </p>
          <div className="hero__actions">
            <Link className="button button--primary" to="/projects">
              Explore the work
            </Link>
            <Link className="button button--secondary" to="/about">
              How I approach engineering
            </Link>
          </div>
        </div>
        <div className="proof-card">
          <p className="proof-card__label">Evidence policy</p>
          <p className="proof-card__value">Build it. Test it. Explain it.</p>
          <ul className="check-list">
            <li>Original, independent project work</li>
            <li>Reproducible setup and current test results</li>
            <li>Explicit trade-offs and known limitations</li>
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="current-work">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Current work</p>
            <h2 id="current-work">One substantial project at a time</h2>
          </div>
          <Link className="text-link" to="/projects">
            View project roadmap <span aria-hidden="true">→</span>
          </Link>
        </div>
        <div className="project-grid">
          {projects.slice(0, 3).map((project) => (
            <article className="project-card" key={project.slug}>
              <div className="card-meta">
                <span>{project.name}</span>
                <span className={`status status--${project.status.toLowerCase().replace(" ", "-")}`}>
                  {project.status}
                </span>
              </div>
              <p>{project.summary}</p>
              <Link className="text-link" to={`/projects/${project.slug}`}>
                Read the case-study plan <span aria-hidden="true">→</span>
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="section split-section" aria-labelledby="focus-title">
        <div>
          <p className="eyebrow">Technical direction</p>
          <h2 id="focus-title">Backend depth, supported by delivery skills</h2>
        </div>
        <div className="focus-list">
          <p>Java · Spring Boot · PostgreSQL · REST APIs</p>
          <p>Python · Event-driven processing · AWS concepts</p>
          <p>TypeScript · React · Docker · GitHub Actions</p>
        </div>
      </section>
    </>
  );
}

function AboutPage() {
  usePageTitle("About");

  return (
    <>
      <PageHeading
        eyebrow="About"
        title="Engineering that can be inspected"
        intro="I am developing a backend-focused portfolio around systems that have real workflows, failure modes, and operational constraints—not disconnected code samples."
      />
      <div className="content-grid">
        <section className="content-card">
          <h2>What I value</h2>
          <p>
            Clear boundaries, useful tests, explicit error handling, and
            documentation that helps another developer run and understand the
            system.
          </p>
        </section>
        <section className="content-card">
          <h2>What this portfolio proves</h2>
          <p>
            Each project is designed to connect implementation choices to
            evidence: source code, automated checks, architecture decisions,
            deployment state, and known limitations.
          </p>
        </section>
        <section className="content-card">
          <h2>What it does not claim</h2>
          <p>
            Portfolio projects are independent work. They do not represent
            employer systems, production traffic, customers, or guarantees of
            security.
          </p>
        </section>
      </div>
    </>
  );
}

function ProjectsPage() {
  usePageTitle("Projects");

  return (
    <>
      <PageHeading
        eyebrow="Projects"
        title="A focused backend and cloud portfolio"
        intro="Each case study separates implemented evidence from blocked gates, future work, and publication state."
      />
      <div className="project-list">
        {projects.map((project, index) => (
          <article className="project-row" key={project.slug}>
            <p className="project-row__number" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </p>
            <div>
              <div className="card-meta">
                <h2>{project.name}</h2>
                <span className={`status status--${project.status.toLowerCase().replace(" ", "-")}`}>
                  {project.status}
                </span>
              </div>
              <p>{project.summary}</p>
              <Link className="text-link" to={`/projects/${project.slug}`}>
                View case study and evidence <span aria-hidden="true">→</span>
              </Link>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}

function ProjectPage({ slug }: { slug: string }) {
  const project = projects.find((item) => item.slug === slug);
  usePageTitle(project?.name ?? "Project not found");

  if (!project) {
    return <NotFoundPage />;
  }

  return (
    <>
      <PageHeading
        eyebrow={`Independent project · ${project.status}`}
        title={project.name}
        intro={project.summary}
      />
      <div className="case-study-layout">
        <article className="case-study-main">
          <section>
            <h2>The problem</h2>
            <p>{project.problem}</p>
          </section>
          <section>
            <h2>Engineering focus</h2>
            <ul className="feature-list">
              {project.engineeringFocus.map((focus) => (
                <li key={focus}>{focus}</li>
              ))}
            </ul>
          </section>
          {project.architecture ? (
            <section>
              <h2>Architecture</h2>
              <p>{project.architecture}</p>
            </section>
          ) : null}
          {project.evidence ? (
            <section>
              <h2>Verification evidence</h2>
              <ul className="feature-list">
                {project.evidence.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          ) : null}
          {project.tradeoffs ? (
            <section>
              <h2>Trade-offs</h2>
              <ul className="feature-list">
                {project.tradeoffs.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          ) : null}
          {project.lessons ? (
            <section>
              <h2>Lessons learned</h2>
              <ul className="feature-list">
                {project.lessons.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          ) : null}
          {project.limitations ? (
            <section>
              <h2>Current limitations</h2>
              <ul className="feature-list">
                {project.limitations.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          ) : null}
          <section>
            <h2>Evidence gate</h2>
            <p>{project.evidenceGate}</p>
          </section>
        </article>
        <aside className="case-study-aside">
          <p className="eyebrow">Current record</p>
          <dl>
            <div>
              <dt>Status</dt>
              <dd>{project.status}</dd>
            </div>
            <div>
              <dt>Repository</dt>
              <dd>
                {project.repositoryUrl ? (
                  <a className="text-link" href={project.repositoryUrl}>
                    {project.repositoryStatus ?? project.repositoryUrl}
                  </a>
                ) : (
                  (project.repositoryStatus ?? "Not published")
                )}
              </dd>
            </div>
            <div>
              <dt>Live demo</dt>
              <dd>{project.demoStatus ?? "Not available"}</dd>
            </div>
            <div>
              <dt>Verification</dt>
              <dd>{project.verification ?? "Pending implementation"}</dd>
            </div>
          </dl>
        </aside>
      </div>
      <Link className="text-link back-link" to="/projects">
        <span aria-hidden="true">←</span> Back to all projects
      </Link>
    </>
  );
}

function ExperiencePage() {
  usePageTitle("Experience");

  return (
    <>
      <PageHeading
        eyebrow="Experience"
        title="Claims are reviewed before they become profile copy"
        intro="Candidate-provided employment details are being checked for current status, accurate scope, confidentiality, and defensible wording."
      />
      <section className="notice" aria-labelledby="experience-notice-title">
        <h2 id="experience-notice-title">Why this section is intentionally limited</h2>
        <p>
          Public experience entries will be added after the underlying title,
          dates, and responsibilities are confirmed. Unsupported percentage
          metrics and confidential employer details will not be published.
        </p>
      </section>
    </>
  );
}

function EducationPage() {
  usePageTitle("Education");

  return (
    <>
      <PageHeading
        eyebrow="Education"
        title="Computer Programming, Sault College"
        intro="September 2024-April 2026"
      />
      <section className="notice" aria-labelledby="education-notice-title">
        <h2 id="education-notice-title">Credential type held for confirmation</h2>
        <p>
          The program name and study dates are candidate-confirmed. A diploma
          or degree type will be added only after that exact credential type is
          confirmed.
        </p>
      </section>
    </>
  );
}

function SkillsPage() {
  usePageTitle("Technical Skills");

  const groups = [
    ["Backend", "Java, Spring Boot, Python, REST API design"],
    ["Data", "PostgreSQL, relational modelling, migrations, SQL"],
    ["Frontend", "TypeScript, React, semantic HTML, responsive CSS"],
    ["Delivery", "Git, Docker, GitHub Actions, automated testing"],
    ["Operations", "Health checks, structured logs, metrics, cloud concepts"],
  ];

  return (
    <>
      <PageHeading
        eyebrow="Technical direction"
        title="Skills connected to project evidence"
        intro="This page describes the portfolio's current engineering focus. Featured skill claims will link to verified code and documentation as projects pass their gates."
      />
      <div className="skill-list">
        {groups.map(([name, items]) => (
          <section key={name}>
            <h2>{name}</h2>
            <p>{items}</p>
          </section>
        ))}
      </div>
    </>
  );
}

function ResumePage() {
  usePageTitle("Resume");

  return (
    <>
      <PageHeading
        eyebrow="Resume"
        title="Evidence-based revision in progress"
        intro="The public resume is not available yet because certification, employment, and publication-link claims are being reconciled."
      />
      <section className="notice" aria-labelledby="resume-status-title">
        <h2 id="resume-status-title">Release gate</h2>
        <p>
          An ATS-friendly and a human-readable version will be linked here
          after claims review, project verification, link checks, and a final
          visual inspection.
        </p>
      </section>
    </>
  );
}

function ContactPage() {
  usePageTitle("Contact");

  return (
    <>
      <PageHeading
        eyebrow="Contact"
        title="Let's connect"
        intro="For professional conversations, use LinkedIn, GitHub, or the public email below. This site does not currently collect contact-form data."
      />
      <div className="contact-grid">
        <a
          aria-label="Email tirthrajsinh2803@gmail.com"
          className="contact-card"
          href="mailto:tirthrajsinh2803@gmail.com"
        >
          <span>Email</span>
          <strong>tirthrajsinh2803@gmail.com</strong>
        </a>
        <a
          className="contact-card"
          href="https://www.linkedin.com/in/parmar-tirthrajsinh/"
          rel="noreferrer"
          target="_blank"
        >
          <span>LinkedIn</span>
          <strong>Professional profile ↗</strong>
        </a>
        <a
          className="contact-card"
          href="https://github.com/Tirthrajsinh28"
          rel="noreferrer"
          target="_blank"
        >
          <span>GitHub</span>
          <strong>Code and repositories ↗</strong>
        </a>
      </div>
      <p className="privacy-note">
        Read the site&apos;s <Link to="/privacy">data-handling notice</Link>.
      </p>
    </>
  );
}

function PrivacyPage() {
  usePageTitle("Data Handling");

  return (
    <>
      <PageHeading
        eyebrow="Data handling"
        title="A minimal-data portfolio"
        intro="The current portfolio foundation does not include a contact form, account system, analytics, advertising, or tracking cookies."
      />
      <div className="prose">
        <h2>External links</h2>
        <p>
          LinkedIn and GitHub links open their respective services. Their
          privacy practices apply after you leave this site.
        </p>
        <h2>Future changes</h2>
        <p>
          If a contact form or analytics is introduced later, this notice will
          be updated before that feature is enabled.
        </p>
      </div>
    </>
  );
}

function NotFoundPage() {
  usePageTitle("Page not found");

  return (
    <section className="not-found">
      <p className="eyebrow">404</p>
      <h1>That route is not in the architecture.</h1>
      <p>
        The page may have moved, or the link may be waiting for a project to
        pass its evidence gate.
      </p>
      <Link className="button button--primary" to="/">
        Return home
      </Link>
    </section>
  );
}

function Layout() {
  const { path } = useRouter();
  const initialPath = useRef(path);

  useEffect(() => {
    if (path === initialPath.current) {
      return;
    }

    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    document.getElementById("main-content")?.focus({ preventScroll: true });
  }, [path]);

  const projectMatch = path.match(/^\/projects\/([^/]+)$/);
  const page = (() => {
    if (path === "/") return <HomePage />;
    if (path === "/about") return <AboutPage />;
    if (path === "/projects") return <ProjectsPage />;
    if (projectMatch) return <ProjectPage slug={projectMatch[1]} />;
    if (path === "/experience") return <ExperiencePage />;
    if (path === "/education") return <EducationPage />;
    if (path === "/skills") return <SkillsPage />;
    if (path === "/resume") return <ResumePage />;
    if (path === "/contact") return <ContactPage />;
    if (path === "/privacy") return <PrivacyPage />;
    return <NotFoundPage />;
  })();

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <header className="site-header">
        <Link className="brand" to="/" aria-label="Tirthrajsinh Parmar, home">
          <span aria-hidden="true">TP</span>
          <strong>Tirthrajsinh Parmar</strong>
        </Link>
        <nav aria-label="Primary navigation">
          <ul>
            {navigation.map(([label, href]) => (
              <li key={href}>
                <NavLink
                  className={({ isActive }) => (isActive ? "active" : undefined)}
                  end={href === "/"}
                  to={href}
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </header>
      <main id="main-content" tabIndex={-1}>
        {page}
      </main>
      <footer className="site-footer">
        <div>
          <strong>Tirthrajsinh Parmar</strong>
          <p>Backend-focused software engineering portfolio.</p>
        </div>
        <nav aria-label="Footer navigation">
          <Link to="/education">Education</Link>
          <Link to="/resume">Resume</Link>
          <Link to="/privacy">Data handling</Link>
        </nav>
        <p>Independent projects. Honest status. No fabricated metrics.</p>
      </footer>
    </div>
  );
}

export function App() {
  const [path, setPath] = useState(getCurrentPath);

  useEffect(() => {
    function handlePopState() {
      setPath(getCurrentPath());
    }

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  function navigate(nextPath: string) {
    const normalized = normalizePath(nextPath);
    if (normalized === path) {
      return;
    }

    window.history.pushState({}, "", normalized);
    setPath(normalized);
  }

  return (
    <RouterContext.Provider value={{ path, navigate }}>
      <Layout />
    </RouterContext.Provider>
  );
}
