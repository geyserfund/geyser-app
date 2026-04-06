import { useRef } from "react";
import { motion } from "motion/react";
import { ArrowRight, Users, Globe, TrendingUp } from "lucide-react";

const HERO_IMAGE = "https://images.unsplash.com/photo-1722623259595-5ed33e63fddf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwY3JlYXRvcnMlMjBmaWxtbWFrZXJzJTIwY29tbXVuaXR5JTIwZ2F0aGVyaW5nfGVufDF8fHx8MTc3NTA2NTAyOHww&ixlib=rb-4.1.0&q=80&w=1080";

const COMMUNITY_IMG = "https://images.unsplash.com/photo-1760992003927-96ac55e57296?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmFzc3Jvb3RzJTIwY29tbXVuaXR5JTIwb3JnYW5pemluZyUyMGV2ZW50JTIwcGVvcGxlfGVufDF8fHx8MTc3NTA2NTAzMHww&ixlib=rb-4.1.0&q=80&w=1080";

const CREATOR_IMG = "https://images.unsplash.com/photo-1758788506109-8ed33e99d3a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaWxtbWFrZXIlMjBkb2N1bWVudGFyeSUyMGNhbWVyYSUyMHNob290aW5nfGVufDF8fHx8MTc3NTA2NTAyOHww&ixlib=rb-4.1.0&q=80&w=1080";

export function HeroSection() {
  return (
    <section
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        backgroundColor: "#0a0f0e",
      }}
    >
      {/* Background image collage */}
      <div style={{ position: "absolute", inset: 0 }}>
        <img
          src={HERO_IMAGE}
          alt="Creators community"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center 30%",
            opacity: 0.45,
          }}
        />

        {/* Floating accent images */}
        <div
          style={{
            position: "absolute",
            top: "15%",
            right: "4%",
            width: 200,
            height: 260,
            borderRadius: 16,
            overflow: "hidden",
            border: "2px solid rgba(0,245,220,0.2)",
            boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
          }}
          className="hero-accent-img"
        >
          <img src={COMMUNITY_IMG} alt="Community" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>

        <div
          style={{
            position: "absolute",
            bottom: "18%",
            right: "7%",
            width: 150,
            height: 190,
            borderRadius: 12,
            overflow: "hidden",
            border: "2px solid rgba(0,245,220,0.15)",
            boxShadow: "0 16px 40px rgba(0,0,0,0.4)",
          }}
          className="hero-accent-img"
        >
          <img src={CREATOR_IMG} alt="Creator" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>

        {/* Gradient overlays */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(105deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.6) 45%, rgba(0,0,0,0.25) 100%)",
        }} />
        <div style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "35%",
          background: "linear-gradient(to top, #0a0f0e 0%, transparent 100%)",
        }} />

        {/* Teal accent glow */}
        <div style={{
          position: "absolute",
          bottom: "15%",
          left: "20%",
          width: 500,
          height: 300,
          borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(0,245,220,0.08) 0%, transparent 70%)",
          filter: "blur(40px)",
        }} />
      </div>

      {/* Content */}
      <div style={{ position: "relative", zIndex: 10, maxWidth: 1200, margin: "0 auto", padding: "120px 24px 80px", width: "100%" }}>
        <div style={{ maxWidth: 680 }}>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              backgroundColor: "rgba(0,245,220,0.1)",
              border: "1px solid rgba(0,245,220,0.25)",
              borderRadius: 100,
              padding: "6px 14px",
              marginBottom: 28,
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "#00f5dc", display: "block" }} />
            <span style={{
              fontFamily: "var(--geyser-font)",
              fontSize: 12,
              fontWeight: 600,
              color: "#00f5dc",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}>
              Creator Community
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            style={{
              fontFamily: "var(--geyser-font)",
              fontSize: "clamp(38px, 6vw, 68px)",
              fontWeight: 800,
              lineHeight: 1.08,
              letterSpacing: "-0.03em",
              color: "#ffffff",
              marginBottom: 24,
            }}
          >
            Join the Geyser
            <br />
            <span style={{
              background: "linear-gradient(90deg, #00f5dc 0%, #00ead2 50%, #4ade80 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              creator community
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{
              fontFamily: "var(--geyser-font)",
              fontSize: "clamp(16px, 2vw, 20px)",
              lineHeight: 1.6,
              color: "rgba(255,255,255,0.72)",
              marginBottom: 40,
              maxWidth: 540,
            }}
          >
            Creators, organizers, educators, builders, and storytellers come here to find the community behind their next meaningful project.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 48 }}
          >
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
                padding: "14px 28px",
                borderRadius: 12,
                background: "linear-gradient(135deg, #00f5dc 0%, #00ead2 100%)",
                transition: "all 0.2s",
                boxShadow: "0 4px 24px rgba(0,245,220,0.35)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,245,220,0.45)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 24px rgba(0,245,220,0.35)";
              }}
            >
              Start your project
              <ArrowRight size={16} />
            </a>

            <a
              href="#stories"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                fontFamily: "var(--geyser-font)",
                fontSize: 15,
                fontWeight: 600,
                color: "rgba(255,255,255,0.85)",
                textDecoration: "none",
                padding: "14px 24px",
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
              Explore success stories
            </a>
          </motion.div>

          {/* Social proof stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            style={{ display: "flex", flexWrap: "wrap", gap: 28 }}
          >
            {[
              { icon: <Users size={15} />, value: "10,000+", label: "Creators worldwide" },
              { icon: <Globe size={15} />, value: "80+", label: "Countries" },
              { icon: <TrendingUp size={15} />, value: "$5M+", label: "Raised by creators" },
            ].map((stat) => (
              <div key={stat.label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ color: "#00f5dc" }}>{stat.icon}</span>
                <span style={{
                  fontFamily: "var(--geyser-font)",
                  fontSize: 15,
                  fontWeight: 700,
                  color: "#ffffff",
                }}>
                  {stat.value}
                </span>
                <span style={{
                  fontFamily: "var(--geyser-font)",
                  fontSize: 13,
                  color: "rgba(255,255,255,0.5)",
                }}>
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll hint */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        style={{
          position: "absolute",
          bottom: 32,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 4,
        }}
      >
        <span style={{ fontFamily: "var(--geyser-font)", fontSize: 11, color: "rgba(255,255,255,0.35)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
          Scroll
        </span>
        <div style={{ width: 1, height: 32, background: "linear-gradient(to bottom, rgba(0,245,220,0.4), transparent)" }} />
      </motion.div>

      <style>{`
        @media (max-width: 899px) {
          .hero-accent-img { display: none !important; }
        }
      `}</style>
    </section>
  );
}
