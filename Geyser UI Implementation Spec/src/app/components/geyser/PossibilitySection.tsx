import { motion } from "motion/react";
import { Film, Radio, GraduationCap, Code2, Palette, Building2, PenLine, FlaskConical, Users } from "lucide-react";

const ideas = [
  {
    icon: <Film size={20} />,
    title: "A documentary",
    desc: "The story only you can tell, for the audience waiting to hear it.",
    color: "#ff6b6b",
    bg: "rgba(255,107,107,0.08)",
  },
  {
    icon: <Users size={20} />,
    title: "A local meetup series",
    desc: "Recurring spaces where your community shows up in person.",
    color: "#34d399",
    bg: "rgba(52,211,153,0.08)",
  },
  {
    icon: <Radio size={20} />,
    title: "A podcast",
    desc: "Long-form conversations with the audience that earns them.",
    color: "#ffd93d",
    bg: "rgba(255,217,61,0.08)",
  },
  {
    icon: <GraduationCap size={20} />,
    title: "An education initiative",
    desc: "Structured learning that changes what people can do.",
    color: "#60a5fa",
    bg: "rgba(96,165,250,0.08)",
  },
  {
    icon: <Code2 size={20} />,
    title: "An open-source tool",
    desc: "Infrastructure built in the open, for everyone to use and improve.",
    color: "#00f5dc",
    bg: "rgba(0,245,220,0.08)",
  },
  {
    icon: <Palette size={20} />,
    title: "A cultural project",
    desc: "Art, music, or performance that marks this moment in time.",
    color: "#f472b6",
    bg: "rgba(244,114,182,0.08)",
  },
  {
    icon: <Building2 size={20} />,
    title: "A community hub",
    desc: "A physical or digital home for the people who already belong together.",
    color: "#a78bfa",
    bg: "rgba(167,139,250,0.08)",
  },
  {
    icon: <FlaskConical size={20} />,
    title: "A startup experiment",
    desc: "An early idea tested with the community most likely to care.",
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.08)",
  },
  {
    icon: <PenLine size={20} />,
    title: "A writing project",
    desc: "Books, essays, journalism, and newsletters with staying power.",
    color: "#fb923c",
    bg: "rgba(251,146,60,0.08)",
  },
];

export function PossibilitySection() {
  return (
    <section
      style={{
        backgroundColor: "var(--geyser-bg)",
        padding: "100px 24px",
        borderTop: "1px solid var(--geyser-border)",
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{
              display: "inline-block",
              fontFamily: "var(--geyser-font)",
              fontSize: 12,
              fontWeight: 600,
              color: "var(--geyser-primary-text)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              marginBottom: 16,
            }}
          >
            What you can build here
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              fontFamily: "var(--geyser-font)",
              fontSize: "clamp(28px, 4vw, 48px)",
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: "-0.025em",
              color: "var(--geyser-text)",
              margin: "0 0 16px",
            }}
          >
            What could you bring to life?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{
              fontFamily: "var(--geyser-font)",
              fontSize: 17,
              lineHeight: 1.6,
              color: "var(--geyser-text-muted)",
              maxWidth: 520,
              margin: "0 auto",
            }}
          >
            Geyser has room for every scale of ambition. Show up with your idea and find the people who've been waiting for it.
          </motion.p>
        </div>

        {/* Ideas grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 16,
        }} className="ideas-grid">
          {ideas.map((idea, i) => (
            <motion.div
              key={idea.title}
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.05 }}
              whileHover={{ y: -4 }}
              style={{
                padding: "24px",
                borderRadius: 16,
                backgroundColor: idea.bg,
                border: `1px solid ${idea.color}25`,
                cursor: "pointer",
                transition: "box-shadow 0.2s",
              }}
            >
              <div style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: 44,
                height: 44,
                borderRadius: 12,
                backgroundColor: `${idea.color}20`,
                border: `1px solid ${idea.color}35`,
                color: idea.color,
                marginBottom: 14,
              }}>
                {idea.icon}
              </div>

              <div style={{
                fontFamily: "var(--geyser-font)",
                fontSize: 16,
                fontWeight: 700,
                color: "var(--geyser-text)",
                marginBottom: 6,
                lineHeight: 1.2,
              }}>
                {idea.title}
              </div>

              <div style={{
                fontFamily: "var(--geyser-font)",
                fontSize: 13,
                lineHeight: 1.55,
                color: "var(--geyser-text-muted)",
              }}>
                {idea.desc}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom pull-quote */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            marginTop: 60,
            padding: "40px 48px",
            borderRadius: 24,
            background: "linear-gradient(135deg, rgba(0,245,220,0.06) 0%, rgba(0,245,220,0.02) 100%)",
            border: "1px solid rgba(0,245,220,0.15)",
            textAlign: "center",
          }}
        >
          <p style={{
            fontFamily: "var(--geyser-font-accent)",
            fontSize: "clamp(22px, 3vw, 34px)",
            fontStyle: "italic",
            fontWeight: 300,
            lineHeight: 1.4,
            color: "var(--geyser-text)",
            maxWidth: 700,
            margin: "0 auto 24px",
          }}>
            "An idea worth sharing deserves a community worth having."
          </p>

          <a
            href="#"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontFamily: "var(--geyser-font)",
              fontSize: 15,
              fontWeight: 700,
              color: "#007b6c",
              textDecoration: "none",
              padding: "13px 28px",
              borderRadius: 10,
              background: "linear-gradient(135deg, #00f5dc 0%, #00ead2 100%)",
              transition: "all 0.2s",
              boxShadow: "0 4px 20px rgba(0,245,220,0.3)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 8px 28px rgba(0,245,220,0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,245,220,0.3)";
            }}
          >
            Start your project today
          </a>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .ideas-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 480px) {
          .ideas-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
