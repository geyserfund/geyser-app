import { useState, useEffect } from "react";
import { Menu, X, Zap } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: "all 0.3s ease",
        backgroundColor: scrolled ? "var(--geyser-bg)" : "transparent",
        borderBottom: scrolled ? "1px solid var(--geyser-border)" : "1px solid transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: "linear-gradient(135deg, var(--geyser-primary) 0%, #00ead2 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
              <Zap size={18} color="#007b6c" fill="#007b6c" />
            </div>
            <span style={{
              fontFamily: "var(--geyser-font)",
              fontWeight: 700,
              fontSize: 20,
              color: "var(--geyser-text)",
              letterSpacing: "-0.02em",
            }}>
              Geyser
            </span>
          </div>

          {/* Desktop nav */}
          <div style={{ display: "flex", alignItems: "center", gap: 32 }} className="hidden-mobile">
            {["Explore", "Success Stories", "Community", "About"].map((item) => (
              <a
                key={item}
                href="#"
                style={{
                  fontFamily: "var(--geyser-font)",
                  fontSize: 14,
                  fontWeight: 500,
                  color: "var(--geyser-text-muted)",
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--geyser-text)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--geyser-text-muted)")}
              >
                {item}
              </a>
            ))}
          </div>

          {/* CTA */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <a
              href="#"
              style={{
                fontFamily: "var(--geyser-font)",
                fontSize: 14,
                fontWeight: 500,
                color: "var(--geyser-text-muted)",
                textDecoration: "none",
                padding: "8px 0",
              }}
              className="hidden-mobile"
            >
              Sign in
            </a>
            <a
              href="#"
              style={{
                fontFamily: "var(--geyser-font)",
                fontSize: 14,
                fontWeight: 600,
                color: "#007b6c",
                textDecoration: "none",
                padding: "8px 16px",
                borderRadius: 8,
                backgroundColor: "var(--geyser-primary-surface)",
                border: "1px solid rgba(0,245,220,0.25)",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(0,245,220,0.14)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "var(--geyser-primary-surface)";
              }}
            >
              Start your project
            </a>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "var(--geyser-text)",
                padding: 4,
              }}
              className="show-mobile"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            style={{
              backgroundColor: "var(--geyser-bg)",
              borderTop: "1px solid var(--geyser-border)",
              padding: "16px 24px 24px",
            }}
          >
            {["Explore", "Success Stories", "Community", "About", "Sign in"].map((item) => (
              <a
                key={item}
                href="#"
                style={{
                  display: "block",
                  fontFamily: "var(--geyser-font)",
                  fontSize: 16,
                  fontWeight: 500,
                  color: "var(--geyser-text)",
                  textDecoration: "none",
                  padding: "12px 0",
                  borderBottom: "1px solid var(--geyser-border-muted)",
                }}
              >
                {item}
              </a>
            ))}
            <a
              href="#"
              style={{
                display: "block",
                fontFamily: "var(--geyser-font)",
                fontSize: 16,
                fontWeight: 700,
                color: "#007b6c",
                textDecoration: "none",
                padding: "14px 0 0",
              }}
            >
              Start your project →
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (min-width: 900px) {
          .hidden-mobile { display: flex !important; }
          .show-mobile { display: none !important; }
        }
        @media (max-width: 899px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}
