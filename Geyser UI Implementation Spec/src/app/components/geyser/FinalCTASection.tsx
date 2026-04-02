import { motion } from "motion/react";
import { ArrowRight, Sparkles } from "lucide-react";

const BG_IMG = "https://images.unsplash.com/photo-1722623259595-5ed33e63fddf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwY3JlYXRvcnMlMjBmaWxtbWFrZXJzJTIwY29tbXVuaXR5JTIwZ2F0aGVyaW5nfGVufDF8fHx8MTc3NTA2NTAyOHww&ixlib=rb-4.1.0&q=80&w=1080";

export function FinalCTASection() {
  return (
    <section
      style={{
        position: "relative",
        padding: "120px 24px",
        overflow: "hidden",
        backgroundColor: "#080c0b",
      }}
    >
      {/* Background */}
      <div style={{ position: "absolute", inset: 0 }}>
        <img
          src={BG_IMG}
          alt="Creator community"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center 20%",
            opacity: 0.2,
          }}
        />
        <div style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at center, rgba(0,245,220,0.06) 0%, transparent 70%)",
        }} />
        <div style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(180deg, rgba(8,12,11,0.6) 0%, rgba(8,12,11,0.3) 50%, rgba(8,12,11,0.6) 100%)",
        }} />
      </div>

      {/* Glow blobs */}
      <div style={{
        position: "absolute",
        top: "20%",
        left: "15%",
        width: 400,
        height: 300,
        borderRadius: "50%",
        background: "radial-gradient(ellipse, rgba(0,245,220,0.1) 0%, transparent 70%)",
        filter: "blur(60px)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute",
        bottom: "15%",
        right: "10%",
        width: 350,
        height: 250,
        borderRadius: "50%",
        background: "radial-gradient(ellipse, rgba(167,139,250,0.08) 0%, transparent 70%)",
        filter: "blur(50px)",
        pointerEvents: "none",
      }} />

      {/* Content */}
      <div style={{
        position: "relative",
        zIndex: 10,
        maxWidth: 760,
        margin: "0 auto",
        textAlign: "center",
      }}>

        {/* Icon badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            backgroundColor: "rgba(0,245,220,0.1)",
            border: "1px solid rgba(0,245,220,0.25)",
            borderRadius: 100,
            padding: "7px 16px",
            marginBottom: 28,
          }}
        >
          <Sparkles size={14} color="#00f5dc" />
          <span style={{
            fontFamily: "var(--geyser-font)",
            fontSize: 12,
            fontWeight: 600,
            color: "#00f5dc",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
          }}>
            Join the movement
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          style={{
            fontFamily: "var(--geyser-font)",
            fontSize: "clamp(32px, 5.5vw, 64px)",
            fontWeight: 900,
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            color: "#ffffff",
            marginBottom: 20,
          }}
        >
          Start the project only
          <br />
          <span style={{
            background: "linear-gradient(90deg, #00f5dc 0%, #4ade80 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>
            you can bring to life
          </span>
        </motion.h2>

        {/* Supporting copy */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            fontFamily: "var(--geyser-font)",
            fontSize: "clamp(15px, 2vw, 18px)",
            lineHeight: 1.65,
            color: "rgba(255,255,255,0.65)",
            maxWidth: 560,
            margin: "0 auto 40px",
          }}
        >
          Culture, tools, education, media, local impact — Geyser connects creators with the people who will care about their work most.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 12,
            justifyContent: "center",
            marginBottom: 48,
          }}
        >
          <a
            href="#"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontFamily: "var(--geyser-font)",
              fontSize: 16,
              fontWeight: 700,
              color: "#007b6c",
              textDecoration: "none",
              padding: "16px 32px",
              borderRadius: 12,
              background: "linear-gradient(135deg, #00f5dc 0%, #00ead2 100%)",
              transition: "all 0.25s",
              boxShadow: "0 6px 32px rgba(0,245,220,0.4)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-3px)";
              e.currentTarget.style.boxShadow = "0 12px 48px rgba(0,245,220,0.5)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 6px 32px rgba(0,245,220,0.4)";
            }}
          >
            Start your project
            <ArrowRight size={18} />
          </a>

          <a
            href="#stories"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontFamily: "var(--geyser-font)",
              fontSize: 16,
              fontWeight: 600,
              color: "rgba(255,255,255,0.85)",
              textDecoration: "none",
              padding: "16px 28px",
              borderRadius: 12,
              border: "1px solid rgba(255,255,255,0.18)",
              backgroundColor: "rgba(255,255,255,0.06)",
              backdropFilter: "blur(8px)",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.28)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.06)";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.18)";
            }}
          >
            Browse creator stories
          </a>
        </motion.div>

        {/* Trust line */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 20,
            flexWrap: "wrap",
          }}
        >
          {["Free to launch", "Global community support", "Bitcoin-native payments"].map((item) => (
            <div key={item} style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                backgroundColor: "#00f5dc",
                opacity: 0.7,
              }} />
              <span style={{
                fontFamily: "var(--geyser-font)",
                fontSize: 13,
                color: "rgba(255,255,255,0.5)",
              }}>
                {item}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
