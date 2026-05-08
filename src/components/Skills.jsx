import { useEffect, useRef, useState } from "react";

const MUTED = "rgba(243, 233, 216, 0.38)";
const TEXT  = "#F3E9D8";

const CATEGORY_COLORS = {
  Engineering:     { label: "#A891C4", barFrom: "rgba(168,145,196,0.2)", barTo: "rgba(168,145,196,0.65)" },
  Design:          { label: "#A891C4", barFrom: "rgba(168,145,196,0.2)", barTo: "rgba(168,145,196,0.65)" },
  "AI & Workflow": { label: "#A891C4", barFrom: "rgba(168,145,196,0.2)", barTo: "rgba(168,145,196,0.65)" },
};

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
        fontSize: 'var(--text-meta)',
        letterSpacing: 3,
        color: "var(--color-lavender)",
        textTransform: "uppercase",
        marginBottom: 10,
        display: "flex",
        alignItems: "center",
        gap: 8,
      }}>
        <span style={{ width: 24, height: 1, background: "var(--color-lavender)", display: "inline-block", opacity: 0.6 }} />
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
        {skillGroups.map((group) => {
          const cc = CATEGORY_COLORS[group.category] || { label: "rgba(255,255,255,0.55)", barFrom: "rgba(255,255,255,0.28)", barTo: "rgba(255,255,255,0.75)" };
          return (
          <div key={group.category}>
            <p style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'var(--text-meta)',
              letterSpacing: 3,
              color: cc.label,
              textTransform: "uppercase",
              marginBottom: 24,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}>
              <span style={{ width: 24, height: 1, background: cc.label, display: "inline-block", opacity: 0.55 }} />
              {group.category}
            </p>

            {group.skills.map((sk, i) => (
              <div key={sk.name} style={{ marginBottom: 20 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <span style={{
                    fontSize: 'var(--text-nav)',
                    color: "#c4b8d8",
                    fontFamily: "'Space Grotesk', sans-serif",
                  }}>{sk.name}</span>
                  <span style={{ fontSize: 'var(--text-meta)', color: MUTED }}>{sk.level}%</span>
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
                    background: `linear-gradient(90deg, ${cc.barFrom}, ${cc.barTo})`,
                    borderRadius: 2,
                    transition: `width 1.2s ease ${i * 0.08}s`,
                  }} />
                </div>
              </div>
            ))}
          </div>
          );
        })}
      </div>
    </section>
  );
}