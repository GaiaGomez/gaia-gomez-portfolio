import { useEffect, useRef, useState } from "react";

const VIOLET   = "rgba(255,255,255,0.55)";
const VIOLET_L = "rgba(255,255,255,0.88)";
const VIOLET_D = "rgba(255,255,255,0.38)";
const MUTED    = "#7a6e8a";
const TEXT     = "#ede8f5";

const skillGroups = [
  {
    category: "Engineering",
    skills: [
      { name: "React / Next.js",         level: 78 },
      { name: "JavaScript",              level: 76 },
      { name: "TypeScript",              level: 72 },
      { name: "APIs",                    level: 70 },
      { name: "Node.js",                 level: 68 },
      { name: "Python",                  level: 65 },
    ],
  },
  {
    category: "Design",
    skills: [
      { name: "Packaging & Print Design", level: 96 },
      { name: "Adobe Creative Suite",     level: 95 },
      { name: "Brand Identity",           level: 94 },
      { name: "Visual Design",            level: 92 },
      { name: "Prototyping",              level: 90 },
      { name: "Webflow / WordPress",      level: 82 },
    ],
  },
  {
    category: "AI & Workflow",
    skills: [
      { name: "Notion Systems",              level: 94 },
      { name: "AI Creative Workflows",       level: 92 },
      { name: "Process Design",              level: 91 },
      { name: "Prompt Engineering",          level: 90 },
      { name: "Digital Content Systems",     level: 89 },
      { name: "Research & Tool Exploration", level: 88 },
    ],
  },
];

export default function Skills() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} id="skills" style={{
      padding: "110px 48px",
      maxWidth: 1200,
      margin: "0 auto",
      position: "relative",
      zIndex: 1,
    }}>
      <p style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: 11,
        letterSpacing: 3,
        color: VIOLET,
        textTransform: "uppercase",
        marginBottom: 10,
      }}>
  <span style={{ width: 24, height: 1, background: VIOLET, display: "inline-block", marginRight: 8, verticalAlign: "middle" }} />
  My Stack
</p>

      <h2 style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: "var(--text-section-title)",
        fontWeight: 700,
        letterSpacing: -2,
        color: TEXT,
        lineHeight: 1,
        marginBottom: 16,
      }}>
        What I bring<br />
        <span style={{ color: 'rgba(255,255,255,0.88)' }}>to the table</span>
      </h2>

      <p style={{ color: MUTED, fontSize: 'var(--text-body)', marginBottom: 64, maxWidth: 480, fontFamily: "'DM Sans', sans-serif" }}>
        Every skill here has a late night behind it.
      </p>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: 48,
      }}>
        {skillGroups.map((group) => (
          <div key={group.category}>
            <p style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 11,
              letterSpacing: 3,
              color: VIOLET,
              textTransform: "uppercase",
              marginBottom: 24,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}>
              <span style={{ width: 24, height: 1, background: VIOLET, display: "inline-block" }} />
              {group.category}
            </p>

            {group.skills.map((sk, i) => (
              <div key={sk.name} style={{ marginBottom: 20 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <span style={{
                    fontSize: 13,
                    color: "#c4b8d8",
                    fontFamily: "'Space Grotesk', sans-serif",
                  }}>{sk.name}</span>
                  <span style={{ fontSize: 12, color: MUTED }}>{sk.level}%</span>
                </div>
                <div style={{
                  height: 3,
                  background: "#1c1626",
                  borderRadius: 2,
                  overflow: "hidden",
                }}>
                  <div style={{
                    height: "100%",
                    width: visible ? `${sk.level}%` : "0%",
                    background: `linear-gradient(90deg, ${VIOLET_D}, ${VIOLET_L})`,
                    borderRadius: 2,
                    transition: `width 1.2s ease ${i * 0.08}s`,
                  }} />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}