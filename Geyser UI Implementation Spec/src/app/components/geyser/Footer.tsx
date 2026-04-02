import { Zap, Twitter, Github, Youtube, MessageCircle } from "lucide-react";

const footerLinks = {
  Explore: ["Browse Projects", "Success Stories", "Featured Creators", "New & Noteworthy", "Categories"],
  Creators: ["Start a Project", "Creator Resources", "Community Guidelines", "FAQ", "Creator Stories"],
  Company: ["About Geyser", "Blog", "Press", "Careers", "Contact"],
  Support: ["Help Center", "Report an Issue", "Privacy Policy", "Terms of Service", "Cookie Settings"],
};

const socials = [
  { icon: <Twitter size={18} />, label: "Twitter", href: "#" },
  { icon: <Github size={18} />, label: "GitHub", href: "#" },
  { icon: <Youtube size={18} />, label: "YouTube", href: "#" },
  { icon: <MessageCircle size={18} />, label: "Telegram", href: "#" },
];

export function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "var(--geyser-bg)",
        borderTop: "1px solid var(--geyser-border)",
        padding: "64px 24px 32px",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>

        {/* Top row */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr",
          gap: 48,
          marginBottom: 48,
          paddingBottom: 48,
          borderBottom: "1px solid var(--geyser-border)",
        }} className="footer-grid">

          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
              <div style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                background: "linear-gradient(135deg, #00f5dc 0%, #00ead2 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
                <Zap size={18} color="#007b6c" fill="#007b6c" />
              </div>
              <span style={{
                fontFamily: "var(--geyser-font)",
                fontWeight: 800,
                fontSize: 20,
                color: "var(--geyser-text)",
                letterSpacing: "-0.02em",
              }}>
                Geyser
              </span>
            </div>

            <p style={{
              fontFamily: "var(--geyser-font)",
              fontSize: 14,
              lineHeight: 1.65,
              color: "var(--geyser-text-muted)",
              maxWidth: 260,
              marginBottom: 24,
            }}>
              The home for creators, communities, and ideas worth funding. Powered by Bitcoin.
            </p>

            {/* Social links */}
            <div style={{ display: "flex", gap: 8 }}>
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 36,
                    height: 36,
                    borderRadius: 8,
                    backgroundColor: "var(--geyser-neutral-panel)",
                    border: "1px solid var(--geyser-border)",
                    color: "var(--geyser-text-muted)",
                    textDecoration: "none",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.color = "var(--geyser-primary-text)";
                    el.style.borderColor = "var(--geyser-primary)";
                    el.style.backgroundColor = "var(--geyser-primary-surface)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.color = "var(--geyser-text-muted)";
                    el.style.borderColor = "var(--geyser-border)";
                    el.style.backgroundColor = "var(--geyser-neutral-panel)";
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([col, links]) => (
            <div key={col}>
              <div style={{
                fontFamily: "var(--geyser-font)",
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "0.07em",
                textTransform: "uppercase",
                color: "var(--geyser-text)",
                marginBottom: 16,
              }}>
                {col}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {links.map((link) => (
                  <a
                    key={link}
                    href="#"
                    style={{
                      fontFamily: "var(--geyser-font)",
                      fontSize: 13,
                      color: "var(--geyser-text-muted)",
                      textDecoration: "none",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--geyser-primary-text)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--geyser-text-muted)")}
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom row */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 16,
        }}>
          <span style={{
            fontFamily: "var(--geyser-font)",
            fontSize: 13,
            color: "var(--geyser-text-muted)",
          }}>
            © {new Date().getFullYear()} Geyser. All rights reserved.
          </span>

          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{
              fontFamily: "var(--geyser-font)",
              fontSize: 12,
              color: "var(--geyser-text-muted)",
            }}>
              Built on
            </span>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              padding: "3px 10px",
              borderRadius: 6,
              backgroundColor: "rgba(245,158,11,0.1)",
              border: "1px solid rgba(245,158,11,0.2)",
            }}>
              <span style={{ fontSize: 12 }}>₿</span>
              <span style={{
                fontFamily: "var(--geyser-font)",
                fontSize: 12,
                fontWeight: 700,
                color: "#f59e0b",
              }}>
                Bitcoin
              </span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 899px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 32px !important;
          }
          .footer-grid > div:first-child {
            grid-column: 1 / -1;
          }
        }
        @media (max-width: 480px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}
