import { useState, useEffect, useRef } from "react";

const C = {
  bg: "#07091a",
  bgMid: "#0d1230",
  plum: "#3d1545",
  plumBright: "#6b2580",
  plumSoft: "rgba(107,37,128,0.2)",
  gold: "#c9a84c",
  goldLight: "#e8c96a",
  goldGlow: "rgba(201,168,76,0.15)",
  white: "#f0eafa",
  muted: "#7a6f98",
  mutedLight: "#9d93b8",
  danger: "#c94c6a",
  dangerSoft: "rgba(201,76,106,0.15)",
  safe: "#4cc9a8",
  safeSoft: "rgba(76,201,168,0.15)",
  warn: "#e07a30",
  warnSoft: "rgba(224,122,48,0.15)",
  border: "rgba(201,168,76,0.12)",
  borderMid: "rgba(201,168,76,0.22)",
  card: "rgba(13,18,48,0.72)",
};

const SunSVG = ({ size = 70, animate = false }) => {
  const rays = 32, cx = size / 2, cy = size / 2;
  const innerR = size * 0.18, outerR = size * 0.42, coreR = size * 0.13;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}
      style={animate ? { animation: "spin 40s linear infinite" } : {}}>
      <defs>
        <radialGradient id={`sg${size}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={C.goldLight} />
          <stop offset="100%" stopColor={C.gold} />
        </radialGradient>
     const STRIPE__LINK = "https://buy.stripe.com/3cI28r5Wk52Rf705Bl4AU01";
      {Array.from({ length: rays }).map((_, i) => {
        const a = (i * 360) / rays, r = (a * Math.PI) / 180;
        const long = i % 2 === 0, len = long ? outerR : outerR * 0.75;
        return <line key={i} x1={cx + innerR * Math.cos(r)} y1={cy + innerR * Math.sin(r)}
          x2={cx + len * Math.cos(r)} y2={cy + len * Math.sin(r)}
          stroke={C.gold} strokeWidth={long ? 1.5 : 0.8} strokeOpacity={long ? 1 : 0.5} />;
      })}
      <circle cx={cx} cy={cy} r={coreR} fill={`url(#sg${size})`} />
    </svg>
  );
};

const questions = [
  { id: 1, text: "After conversations with this person, do you often feel confused about what actually happened?", tag: "Gaslighting" },
  { id: 2, text: "Do you find yourself apologizing frequently — even when you're unsure what you did wrong?", tag: "Guilt Cycling" },
  { id: 3, text: "Have you started to feel like your emotions are 'too much' or overreactions?", tag: "Emotional Minimizing" },
  { id: 4, text: "Do you feel like you've quietly changed who you are to keep the peace?", tag: "Identity Erosion" },
  { id: 5, text: "Does this person make you feel special and criticized by turns — sometimes within the same conversation?", tag: "Hot/Cold Pattern" },
  { id: 6, text: "Do you feel responsible for managing this person's mood or emotional state?", tag: "Emotional Labor" },
  { id: 7, text: "Have you pulled away from friends or family since this relationship intensified?", tag: "Isolation" },
  { id: 8, text: "Do you replay conversations trying to figure out where things went wrong — even when you were the one hurt?", tag: "Self-Blame Loop" },
];

const FLAGS = [
  { name: "Love Bombing", desc: "Overwhelming affection early on to create dependency fast.", color: C.danger },
  { name: "Gaslighting", desc: "Making you question your memory, perception, or sanity.", color: C.danger },
  { name: "DARVO", desc: "Deny, Attack, Reverse Victim and Offender.", color: C.danger },
  { name: "Silent Treatment", desc: "Weaponized withdrawal of communication as punishment.", color: C.warn },
  { name: "Isolation", desc: "Gradually cutting you off from your support network.", color: C.danger },
  { name: "Triangulation", desc: "Using a third person to provoke jealousy or insecurity.", color: C.warn },
  { name: "Future Faking", desc: "Big promises that are never intended to be kept.", color: C.warn },
  { name: "Intermittent Reinforcement", desc: "Random rewards keep you hooked — the slot machine effect.", color: C.danger },
  { name: "Blame Shifting", desc: "Your reaction is always the problem, not their action.", color: C.warn },
  { name: "Covert Contracts", desc: "Unspoken deals — doing things with hidden strings attached.", color: C.warn },
];

const getResult = (score, max) => {
  const p = score / max;
  if (p < 0.25) return { level: "Grounded", color: C.safe, bg: C.safeSoft, icon: "○", message: "Your patterns reflect a relatively balanced dynamic. Stay aware — growth is always available." };
  if (p < 0.55) return { level: "Aware", color: C.gold, bg: C.goldGlow, icon: "◑", message: "Some patterns here are worth exploring. Your awareness is your power — keep looking inward." };
  if (p < 0.8) return { level: "At Risk", color: C.warn, bg: C.warnSoft, icon: "◕", message: "Several patterns suggest you may be in a manipulative dynamic. You deserve clarity and peace." };
  return { level: "High Alert", color: C.danger, bg: C.dangerSoft, icon: "●", message: "These patterns are significant. What you're experiencing is real. You are not the problem." };
};

const globalStyles = `
  @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
  @keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.5; } }
  * { box-sizing: border-box; margin: 0; padding: 0; -webkit-tap-highlight-color: transparent; }
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: rgba(201,168,76,0.2); border-radius: 2px; }
`;

const Btn = ({ children, onClick, variant = "gold", style = {}, disabled = false }) => {
  const base = {
    width: "100%", padding: "15px", border: "none", borderRadius: 12,
    fontSize: 12, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase",
    cursor: disabled ? "not-allowed" : "pointer", fontFamily: "Georgia, serif",
    transition: "all 0.25s ease",
  };
  const variants = {
    gold: { background: `linear-gradient(135deg, ${C.plumBright}, ${C.gold})`, color: C.bg, opacity: disabled ? 0.4 : 1 },
    outline: { background: "transparent", border: `1px solid ${C.gold}`, color: C.gold },
    ghost: { background: "rgba(255,255,255,0.04)", border: `1px solid rgba(255,255,255,0.08)`, color: C.muted },
  };
  return <button onClick={disabled ? undefined : onClick} style={{ ...base, ...variants[variant], ...style }}>{children}</button>;
};

const Card = ({ children, style = {} }) => (
  <div style={{
    background: C.card, border: `1px solid ${C.border}`, borderRadius: 20,
    padding: "28px 24px", backdropFilter: "blur(20px)",
    boxShadow: "0 8px 48px rgba(0,0,0,0.4), inset 0 1px 0 rgba(201,168,76,0.08)",
    ...style
  }}>{children}</div>
);

const Divider = ({ color = C.gold }) => (
  <div style={{ width: 36, height: 1, background: `linear-gradient(90deg, transparent, ${color}, transparent)`, margin: "16px auto" }} />
);

const Tag = ({ children, color = C.plumBright }) => (
  <span style={{
    padding: "5px 12px", borderRadius: 20, border: `1px solid ${color}`,
    color: C.goldLight, fontSize: 10, letterSpacing: 1.5,
    background: `${color}22`, textTransform: "uppercase", display: "inline-block",
  }}>{children}</span>
);

function SplashScreen({ onDone }) {
  useEffect(() => { const t = setTimeout(onDone, 2600); return () => clearTimeout(t); }, []);
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: C.bg, animation: "fadeUp 0.6s ease" }}>
      <div style={{ animation: "spin 30s linear infinite", marginBottom: 24 }}>
        <SunSVG size={100} />
      </div>
      <h1 style={{ color: C.white, fontSize: 28, fontWeight: 400, letterSpacing: 2, fontFamily: "Georgia, serif", marginBottom: 8 }}>Embodying Sane</h1>
      <p style={{ color: C.gold, fontSize: 10, letterSpacing: 4, textTransform: "uppercase" }}>BELIEVE · TRANSFORM · CREATE</p>
      <div style={{ marginTop: 48, display: "flex", gap: 6 }}>
        {[0, 1, 2].map(i => (
          <div key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: C.gold, animation: `pulse 1.2s ease ${i * 0.2}s infinite` }} />
        ))}
      </div>
    </div>
  );
}

function HomeScreen({ onNav, onStartTest, diaryCount }) {
  return (
    <div style={{ padding: "24px 20px 100px", animation: "fadeUp 0.4s ease" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
        <div>
          <p style={{ color: C.muted, fontSize: 11, letterSpacing: 3, textTransform: "uppercase", marginBottom: 4 }}>Welcome back</p>
          <h1 style={{ color: C.white, fontSize: 22, fontWeight: 400, fontFamily: "Georgia, serif" }}>Embodying Sane</h1>
        </div>
        <SunSVG size={44} />
      </div>

      {/* Hero - Self Test */}
      <div onClick={onStartTest} style={{
        background: `linear-gradient(135deg, ${C.plum} 0%, #1a0d35 60%, ${C.bgMid} 100%)`,
        border: `1px solid ${C.borderMid}`, borderRadius: 20, padding: "28px 24px",
        marginBottom: 16, cursor: "pointer", position: "relative", overflow: "hidden",
        boxShadow: `0 0 40px rgba(107,37,128,0.25)`,
      }}>
        <div style={{ position: "absolute", right: -20, top: -20, opacity: 0.15 }}>
          <SunSVG size={140} />
        </div>
        <Tag color={C.gold}>Featured</Tag>
        <h2 style={{ color: C.white, fontSize: 20, fontWeight: 400, fontFamily: "Georgia, serif", marginTop: 12, marginBottom: 8 }}>Self Test</h2>
        <p style={{ color: C.mutedLight, fontSize: 13, lineHeight: 1.6, marginBottom: 20 }}>8 questions. Uncover the patterns in your relationship dynamic. No wrong answers.</p>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: `linear-gradient(135deg, ${C.plumBright}, ${C.gold})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: C.bg, fontSize: 14, fontWeight: 700 }}>▶</span>
          </div>
          <span style={{ color: C.gold, fontSize: 12, letterSpacing: 2, textTransform: "uppercase" }}>Begin Test</span>
        </div>
      </div>

      {/* Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
        {[
          { label: "Diary", icon: "✦", sub: `${diaryCount} entries`, nav: "diary", color: C.gold },
          { label: "Red Flag Dictionary", icon: "◈", sub: "10 patterns", nav: "flags", color: C.danger },
          { label: "Pattern Timeline", icon: "◉", sub: "Track over time", nav: "timeline", color: C.safe },
          { label: "Mirror", icon: "◎", sub: "Reflect inward", nav: "mirror", color: C.plumBright },
        ].map(({ label, icon, sub, nav, color }) => (
          <div key={nav} onClick={() => onNav(nav)} style={{
            background: C.card, border: `1px solid ${C.border}`, borderRadius: 16,
            padding: "18px 16px", cursor: "pointer",
            boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
          }}>
            <span style={{ fontSize: 18, color, display: "block", marginBottom: 8 }}>{icon}</span>
            <p style={{ color: C.white, fontSize: 13, fontFamily: "Georgia, serif", marginBottom: 4 }}>{label}</p>
            <p style={{ color: C.muted, fontSize: 11, letterSpacing: 1 }}>{sub}</p>
          </div>
        ))}
      </div>

      <Card style={{ textAlign: "center", padding: "20px 24px" }}>
        <p style={{ color: C.muted, fontSize: 11, letterSpacing: 2, textTransform: "uppercase", marginBottom: 6 }}>Daily Reflection</p>
        <p style={{ color: C.white, fontSize: 14, fontStyle: "italic", lineHeight: 1.7 }}>"The wound is where the light enters you."</p>
        <p style={{ color: C.gold, fontSize: 11, marginTop: 8 }}>— Rumi</p>
      </Card>
    </div>
  );
}

function SelfTestFlow({ onBack, onSaveResult }) {
  const [stage, setStage] = useState("intro"); // intro | quiz | result
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selected, setSelected] = useState(null);
  const [sliding, setSliding] = useState(false);

  const next = () => {
    if (selected === null) return;
    const newA = { ...answers, [questions[current].id]: selected };
    setAnswers(newA);
    setSliding(true);
    setTimeout(() => {
      setSelected(null);
      if (current + 1 < questions.length) setCurrent(current + 1);
      else setStage("result");
      setSliding(false);
    }, 280);
  };

  const totalScore = Object.values(answers).reduce((a, b) => a + b, 0);
  const result = getResult(totalScore, questions.length * 2);
  const flaggedTags = [...new Set(Object.entries(answers).filter(([, v]) => v >= 1).map(([id]) => questions.find(q => q.id === Number(id))?.tag).filter(Boolean))];

  if (stage === "intro") return (
    <div style={{ padding: "32px 20px 100px", animation: "fadeUp 0.4s ease" }}>
      <button onClick={onBack} style={{ background: "none", border: "none", color: C.muted, fontSize: 13, cursor: "pointer", fontFamily: "Georgia, serif", marginBottom: 28, letterSpacing: 1 }}>← Back</button>
      <Card style={{ textAlign: "center" }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}><SunSVG size={80} animate /></div>
        <Tag color={C.gold}>Self Test</Tag>
        <h2 style={{ color: C.white, fontSize: 22, fontWeight: 400, fontFamily: "Georgia, serif", margin: "16px 0 8px" }}>Know Your Pattern</h2>
        <Divider />
        <p style={{ color: C.mutedLight, fontSize: 14, lineHeight: 1.8, marginBottom: 28 }}>
          8 honest questions. This is your mirror — not a judgment. Answer for the relationship that brought you here.
        </p>
        <Btn onClick={() => setStage("quiz")}>Begin Test</Btn>
      </Card>
    </div>
  );

  if (stage === "result") return (
    <div style={{ padding: "32px 20px 100px", animation: "fadeUp 0.4s ease" }}>
      <button onClick={onBack} style={{ background: "none", border: "none", color: C.muted, fontSize: 13, cursor: "pointer", fontFamily: "Georgia, serif", marginBottom: 28, letterSpacing: 1 }}>← Home</button>
      <Card style={{ textAlign: "center" }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}><SunSVG size={60} /></div>
        <div style={{ width: 60, height: 60, borderRadius: "50%", background: result.bg, border: `2px solid ${result.color}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", fontSize: 22, color: result.color }}>{result.icon}</div>
        <h2 style={{ color: result.color, fontSize: 22, fontWeight: 400, letterSpacing: 3, textTransform: "uppercase", fontFamily: "Georgia, serif", textShadow: `0 0 24px ${result.color}44` }}>{result.level}</h2>
        <Divider color={result.color} />
        <p style={{ color: C.white, fontSize: 14, lineHeight: 1.8, marginBottom: 24 }}>{result.message}</p>
        {flaggedTags.length > 0 && (
          <div style={{ marginBottom: 24 }}>
            <p style={{ color: C.muted, fontSize: 10, letterSpacing: 3, textTransform: "uppercase", marginBottom: 12 }}>Patterns Detected</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center" }}>
              {flaggedTags.map(tag => <Tag key={tag}>{tag}</Tag>)}
            </div>
          </div>
        )}
        <Btn onClick={() => onSaveResult({ result, flaggedTags, score: totalScore, max: questions.length * 2 })} style={{ marginBottom: 10 }}>Save to Diary</Btn>
        <Btn variant="outline" onClick={() => { setCurrent(0); setAnswers({}); setSelected(null); setStage("intro"); }}>Retake Test</Btn>
      </Card>
    </div>
  );

  const q = questions[current];
  return (
    <div style={{ padding: "32px 20px 100px" }}>
      <button onClick={onBack} style={{ background: "none", border: "none", color: C.muted, fontSize: 13, cursor: "pointer", fontFamily: "Georgia, serif", marginBottom: 20, letterSpacing: 1 }}>← Back</button>

      {/* Progress */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
          <span style={{ color: C.muted, fontSize: 10, letterSpacing: 2, textTransform: "uppercase" }}>Self Test</span>
          <span style={{ color: C.gold, fontSize: 11 }}>{current + 1} / {questions.length}</span>
        </div>
        <div style={{ width: "100%", height: 2, background: "rgba(255,255,255,0.06)", borderRadius: 1 }}>
          <div style={{ width: `${((current + 1) / questions.length) * 100}%`, height: "100%", background: `linear-gradient(90deg, ${C.plumBright}, ${C.gold})`, borderRadius: 1, transition: "width 0.5s cubic-bezier(0.4,0,0.2,1)" }} />
        </div>
      </div>

      <div style={{ opacity: sliding ? 0 : 1, transform: sliding ? "translateY(8px)" : "translateY(0)", transition: "all 0.28s ease" }}>
        <Card>
          <Tag>{q.tag}</Tag>
          <p style={{ color: C.white, fontSize: 17, lineHeight: 1.75, fontFamily: "Georgia, serif", fontWeight: 400, margin: "20px 0 28px", minHeight: 90 }}>{q.text}</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
            {[{ label: "Rarely", value: 0 }, { label: "Sometimes", value: 1 }, { label: "Often", value: 2 }].map(opt => {
              const on = selected === opt.value;
              return (
                <button key={opt.value} onClick={() => setSelected(opt.value)} style={{
                  padding: "14px 18px", borderRadius: 12, textAlign: "left", cursor: "pointer",
                  fontFamily: "Georgia, serif", fontSize: 14, letterSpacing: 0.5,
                  border: on ? `1px solid ${C.gold}` : "1px solid rgba(255,255,255,0.07)",
                  background: on ? `linear-gradient(135deg, rgba(201,168,76,0.12), rgba(107,37,128,0.2))` : "rgba(255,255,255,0.02)",
                  color: on ? C.goldLight : C.mutedLight, transition: "all 0.2s ease",
                  display: "flex", alignItems: "center", gap: 12,
                  boxShadow: on ? `0 0 12px rgba(201,168,76,0.12)` : "none",
                }}>
                  <span style={{ width: 16, height: 16, borderRadius: "50%", border: on ? `2px solid ${C.gold}` : "2px solid rgba(255,255,255,0.15)", background: on ? C.gold : "transparent", flexShrink: 0, transition: "all 0.2s ease" }} />
                  {opt.label}
                </button>
              );
            })}
          </div>
          <Btn onClick={next} disabled={selected === null}>
            {current === questions.length - 1 ? "See Results" : "Next →"}
          </Btn>
        </Card>
      </div>
    </div>
  );
}

function DiaryScreen({ entries, onAdd, onBack }) {
  const [view, setView] = useState("list"); // list | new
  const [text, setText] = useState("");
  const [mood, setMood] = useState(null);

  const moods = [
    { label: "Clear", color: C.safe, icon: "○" },
    { label: "Uncertain", color: C.gold, icon: "◑" },
    { label: "Heavy", color: C.warn, icon: "◕" },
    { label: "Raw", color: C.danger, icon: "●" },
  ];

  const save = () => {
    if (!text.trim()) return;
    onAdd({ text, mood, date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }), type: "journal" });
    setText(""); setMood(null); setView("list");
  };

  if (view === "new") return (
    <div style={{ padding: "32px 20px 100px", animation: "fadeUp 0.35s ease" }}>
      <button onClick={() => setView("list")} style={{ background: "none", border: "none", color: C.muted, fontSize: 13, cursor: "pointer", fontFamily: "Georgia, serif", marginBottom: 28, letterSpacing: 1 }}>← Diary</button>
      <Card>
        <p style={{ color: C.gold, fontSize: 10, letterSpacing: 3, textTransform: "uppercase", marginBottom: 16 }}>New Entry</p>
        <p style={{ color: C.mutedLight, fontSize: 12, letterSpacing: 2, textTransform: "uppercase", marginBottom: 10 }}>How are you feeling?</p>
        <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
          {moods.map(m => (
            <button key={m.label} onClick={() => setMood(m)} style={{
              flex: 1, padding: "10px 4px", borderRadius: 10, cursor: "pointer",
              border: mood?.label === m.label ? `1px solid ${m.color}` : "1px solid rgba(255,255,255,0.07)",
              background: mood?.label === m.label ? `${m.color}22` : "rgba(255,255,255,0.02)",
              color: mood?.label === m.label ? m.color : C.muted, fontFamily: "Georgia, serif",
              fontSize: 11, transition: "all 0.2s ease",
            }}>
              <div style={{ fontSize: 16, marginBottom: 4 }}>{m.icon}</div>
              {m.label}
            </button>
          ))}
        </div>
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Write freely. This is your space..."
          style={{
            width: "100%", minHeight: 160, background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: "14px",
            color: C.white, fontSize: 14, lineHeight: 1.7, fontFamily: "Georgia, serif",
            resize: "vertical", outline: "none", marginBottom: 16,
          }}
        />
        <Btn onClick={save} disabled={!text.trim()}>Save Entry</Btn>
      </Card>
    </div>
  );

  return (
    <div style={{ padding: "32px 20px 100px", animation: "fadeUp 0.4s ease" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div>
          <p style={{ color: C.muted, fontSize: 10, letterSpacing: 3, textTransform: "uppercase", marginBottom: 4 }}>Your Journey</p>
          <h2 style={{ color: C.white, fontSize: 20, fontWeight: 400, fontFamily: "Georgia, serif" }}>Diary</h2>
        </div>
        <button onClick={() => setView("new")} style={{
          width: 40, height: 40, borderRadius: "50%", border: `1px solid ${C.gold}`,
          background: "transparent", color: C.gold, fontSize: 20, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
        }}>+</button>
      </div>

      {entries.length === 0 ? (
        <Card style={{ textAlign: "center", padding: "40px 24px" }}>
          <SunSVG size={50} />
          <p style={{ color: C.muted, fontSize: 14, marginTop: 16, lineHeight: 1.7 }}>Your diary is empty. Start writing — or take the Self Test and save your results here.</p>
          <div style={{ marginTop: 20 }}>
            <Btn onClick={() => setView("new")} variant="outline">Write First Entry</Btn>
          </div>
        </Card>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {entries.map((e, i) => (
            <Card key={i} style={{ padding: "18px 20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  {e.mood && <span style={{ color: e.mood.color, fontSize: 14 }}>{e.mood.icon}</span>}
                  <Tag color={e.type === "test" ? C.plumBright : C.gold}>{e.type === "test" ? "Test Result" : "Journal"}</Tag>
                </div>
                <span style={{ color: C.muted, fontSize: 11 }}>{e.date}</span>
              </div>
              {e.type === "test" ? (
                <div>
                  <p style={{ color: e.result.color, fontSize: 15, fontFamily: "Georgia, serif", fontWeight: 400, marginBottom: 6 }}>{e.result.level}</p>
                  {e.flaggedTags?.length > 0 && (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                      {e.flaggedTags.map(t => <Tag key={t} color={C.muted}>{t}</Tag>)}
                    </div>
                  )}
                </div>
              ) : (
                <p style={{ color: C.mutedLight, fontSize: 14, lineHeight: 1.7 }}>{e.text.length > 120 ? e.text.slice(0, 120) + "…" : e.text}</p>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

function FlagsScreen() {
  const [open, setOpen] = useState(null);
  return (
    <div style={{ padding: "32px 20px 100px", animation: "fadeUp 0.4s ease" }}>
      <p style={{ color: C.muted, fontSize: 10, letterSpacing: 3, textTransform: "uppercase", marginBottom: 4 }}>Know the Signs</p>
      <h2 style={{ color: C.white, fontSize: 20, fontWeight: 400, fontFamily: "Georgia, serif", marginBottom: 24 }}>Red Flag Dictionary</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {FLAGS.map((f, i) => (
          <div key={f.name} onClick={() => setOpen(open === i ? null : i)} style={{
            background: C.card, border: `1px solid ${open === i ? f.color + "55" : C.border}`,
            borderRadius: 14, padding: "16px 18px", cursor: "pointer", transition: "all 0.25s ease",
            boxShadow: open === i ? `0 0 20px ${f.color}22` : "none",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: f.color, flexShrink: 0, display: "inline-block" }} />
                <span style={{ color: C.white, fontSize: 14, fontFamily: "Georgia, serif" }}>{f.name}</span>
              </div>
              <span style={{ color: C.muted, fontSize: 12 }}>{open === i ? "−" : "+"}</span>
            </div>
            {open === i && (
              <p style={{ color: C.mutedLight, fontSize: 13, lineHeight: 1.7, marginTop: 12, paddingLeft: 18, animation: "fadeUp 0.2s ease" }}>{f.desc}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function MirrorScreen() {
  const prompts = [
    "What would you tell a friend in this situation?",
    "Which version of yourself showed up in that moment?",
    "What boundary got crossed — and what would honoring it look like?",
    "What are you tolerating that you wouldn't accept for someone you love?",
    "What feeling are you trying to avoid right now?",
    "If you already knew the answer, what would it be?",
  ];
  const [idx, setIdx] = useState(0);
  return (
    <div style={{ padding: "32px 20px 100px", animation: "fadeUp 0.4s ease" }}>
      <p style={{ color: C.muted, fontSize: 10, letterSpacing: 3, textTransform: "uppercase", marginBottom: 4 }}>Reflect Inward</p>
      <h2 style={{ color: C.white, fontSize: 20, fontWeight: 400, fontFamily: "Georgia, serif", marginBottom: 24 }}>Mirror</h2>
      <Card style={{ textAlign: "center", padding: "36px 28px", marginBottom: 16 }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}><SunSVG size={56} /></div>
        <p style={{ color: C.muted, fontSize: 10, letterSpacing: 3, textTransform: "uppercase", marginBottom: 20 }}>Reflection Prompt</p>
        <p style={{ color: C.white, fontSize: 18, lineHeight: 1.75, fontFamily: "Georgia, serif", fontStyle: "italic", minHeight: 90, marginBottom: 28 }}>"{prompts[idx]}"</p>
        <Btn onClick={() => setIdx((idx + 1) % prompts.length)} variant="outline">Next Prompt</Btn>
      </Card>
      <Card style={{ padding: "18px 20px" }}>
        <p style={{ color: C.gold, fontSize: 10, letterSpacing: 3, textTransform: "uppercase", marginBottom: 8 }}>Remember</p>
        <p style={{ color: C.mutedLight, fontSize: 13, lineHeight: 1.7 }}>You are not here to fix them. You are here to return to yourself.</p>
      </Card>
    </div>
  );
}

function TimelineScreen({ entries }) {
  const testEntries = entries.filter(e => e.type === "test");
  return (
    <div style={{ padding: "32px 20px 100px", animation: "fadeUp 0.4s ease" }}>
      <p style={{ color: C.muted, fontSize: 10, letterSpacing: 3, textTransform: "uppercase", marginBottom: 4 }}>Your Progress</p>
      <h2 style={{ color: C.white, fontSize: 20, fontWeight: 400, fontFamily: "Georgia, serif", marginBottom: 24 }}>Pattern Timeline</h2>
      {testEntries.length === 0 ? (
        <Card style={{ textAlign: "center", padding: "36px 24px" }}>
          <p style={{ color: C.muted, fontSize: 14, lineHeight: 1.7 }}>Take the Self Test to begin tracking your patterns over time. Each saved result appears here.</p>
        </Card>
      ) : (
        <div style={{ position: "relative" }}>
          <div style={{ position: "absolute", left: 20, top: 0, bottom: 0, width: 1, background: `linear-gradient(180deg, ${C.plumBright}, transparent)` }} />
          <div style={{ display: "flex", flexDirection: "column", gap: 16, paddingLeft: 44 }}>
            {testEntries.map((e, i) => (
              <div key={i} style={{ position: "relative" }}>
                <div style={{ position: "absolute", left: -32, top: 12, width: 14, height: 14, borderRadius: "50%", background: e.result.color, border: `2px solid ${C.bg}`, boxShadow: `0 0 8px ${e.result.color}88` }} />
                <Card style={{ padding: "16px 18px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                    <span style={{ color: e.result.color, fontSize: 14, fontFamily: "Georgia, serif" }}>{e.result.level}</span>
                    <span style={{ color: C.muted, fontSize: 11 }}>{e.date}</span>
                  </div>
                  <p style={{ color: C.muted, fontSize: 12 }}>Score: {e.score}/{e.max}</p>
                </Card>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

const NAV = [
  { id: "home", icon: "⌂", label: "Home" },
  { id: "test", icon: "◎", label: "Test" },
  { id: "diary", icon: "✦", label: "Diary" },
  { id: "flags", icon: "◈", label: "Flags" },
  { id: "mirror", icon: "◑", label: "Mirror" },
];

export default function App() {
  const [splash, setSplash] = useState(true);
  const [screen, setScreen] = useState("home");
  const [diary, setDiary] = useState([]);

  const addDiaryEntry = (entry) => setDiary(prev => [entry, ...prev]);

  const savTestResult = ({ result, flaggedTags, score, max }) => {
    addDiaryEntry({ type: "test", result, flaggedTags, score, max, date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) });
    setScreen("diary");
  };

  if (splash) return (
    <>
      <style>{globalStyles}</style>
      <div style={{ background: C.bg, minHeight: "100vh" }}>
        <SplashScreen onDone={() => setSplash(false)} />
      </div>
    </>
  );

  const bg = {
    background: `radial-gradient(ellipse at 25% 0%, ${C.plum} 0%, ${C.bg} 50%), radial-gradient(ellipse at 80% 100%, #1a0a2e 0%, ${C.bg} 60%)`,
    minHeight: "100vh", position: "relative", fontFamily: "Georgia, serif",
  };

  return (
    <>
      <style>{globalStyles}</style>
      <div style={bg}>
        {/* Decorative triangle */}
        <div style={{ position: "fixed", bottom: -80, right: -80, width: 0, height: 0, borderLeft: "220px solid transparent", borderBottom: `220px solid rgba(61,21,69,0.3)`, pointerEvents: "none", zIndex: 0 }} />

        <div style={{ position: "relative", zIndex: 1, maxWidth: 480, margin: "0 auto" }}>
          {screen === "home" && <HomeScreen onNav={setScreen} onStartTest={() => setScreen("test")} diaryCount={diary.length} />}
          {screen === "test" && <SelfTestFlow onBack={() => setScreen("home")} onSaveResult={savTestResult} />}
          {screen === "diary" && <DiaryScreen entries={diary} onAdd={addDiaryEntry} onBack={() => setScreen("home")} />}
          {screen === "flags" && <FlagsScreen />}
          {screen === "mirror" && <MirrorScreen />}
          {screen === "timeline" && <TimelineScreen entries={diary} />}
        </div>

        {/* Bottom Nav */}
        <div style={{
          position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 10,
          background: "rgba(7,9,26,0.92)", backdropFilter: "blur(20px)",
          borderTop: `1px solid ${C.border}`, padding: "10px 0 16px",
        }}>
          <div style={{ display: "flex", justifyContent: "space-around", maxWidth: 480, margin: "0 auto" }}>
            {NAV.map(n => {
              const active = screen === n.id || (n.id === "home" && screen === "home");
              return (
                <button key={n.id} onClick={() => setScreen(n.id)} style={{
                  background: "none", border: "none", cursor: "pointer", padding: "4px 8px",
                  display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
                  color: active ? C.gold : C.muted, transition: "color 0.2s ease",
                }}>
                  <span style={{ fontSize: 18, lineHeight: 1 }}>{n.icon}</span>
                  <span style={{ fontSize: 9, letterSpacing: 1.5, textTransform: "uppercase", fontFamily: "Georgia, serif" }}>{n.label}</span>
                  {active && <div style={{ width: 4, height: 4, borderRadius: "50%", background: C.gold, marginTop: 1 }} />}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
