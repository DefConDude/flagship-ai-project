import { Icon } from "../Icon";
import { Logo } from "../Logo";

const quickLinks = [
  { href: "#about", label: "About" },
  { href: "#steering", label: "Steering" },
  { href: "#timeline", label: "Journey" },
  { href: "#architecture", label: "Architecture" },
  { href: "#lessons", label: "Lessons" },
  { href: "#team", label: "Team" },
  { href: "#status", label: "Status" },
];

export function Footer() {
  return (
    <footer className="navy-band on-navy">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <Logo id="ca-logo-footer" as="h3" />
            <p className="mt-4 text-sm text-muted">
              Commercial Banking · Enterprise AI
            </p>
            <p className="mt-3 max-w-xs text-sm italic text-muted">
              No LLMs were harmed in the making of this project. Several
              developers&apos; sleep schedules, and one CI plan branch,
              however&hellip;
            </p>
                      </div>

          <div>
            <h4 className="font-heading text-sm font-semibold uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="mt-4 space-y-2">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-sm text-white/80 transition-colors hover:text-turquoise"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-sm font-semibold uppercase tracking-wider">
              Project Details
            </h4>
            <ul className="mt-4 space-y-2 text-sm text-muted">
              <li>AI agent for commercial credit pre-screening</li>
              <li>Client: a tier-1 South African bank</li>
              <li>Role: AI Engineer, Jacques van Heerden</li>
              <li>Details generalised to protect client confidentiality</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/15 pt-6 text-xs text-white/70 sm:flex-row">
          <p className="flex items-center gap-1.5">
            © 2026 Jacques van Heerden — Built with
            <Icon name="heart" className="h-4 w-4 text-turquoise" />
            and an unreasonable amount of YAML
          </p>
          <p>MVP1 · Showcase</p>
        </div>
      </div>
    </footer>
  );
}
