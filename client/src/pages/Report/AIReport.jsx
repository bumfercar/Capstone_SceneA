import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";

const NAVY = "#0D2240";
const GREEN = "#1D9E75";
const BG = "#F0EFEB";
const CARD = "#FFFFFF";

// ??? Loading Screen ??????????????????????????????????????????????
function LoadingScreen({ onDone }) {
  const [progress, setProgress] = useState(0);
  const [step, setStep] = useState(0);
  const steps = [
    "?뚯꽦 ?곗씠??遺꾩꽍 以?..",
    "WPM 쨌 移⑤У 援ш컙 痢≪젙 以?..",
    "STAR 援ъ“??吏??遺꾨쪟 以?..",
    "Fit-Gap ??웾 援먯감 遺꾩꽍 以?..",
    "AI 由ы룷???앹꽦 ?꾨즺!",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        const next = p + 2.2;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(onDone, 600);
          return 100;
        }
        setStep(Math.floor((next / 100) * (steps.length - 1)));
        return next;
      });
    }, 80);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: BG, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: "'Noto Sans KR', 'Apple SD Gothic Neo', sans-serif" }}>
      {/* Animated logo */}
      <div style={{ marginBottom: 40 }}>
        <div style={{ width: 72, height: 72, background: NAVY, borderRadius: 18, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px", animation: "pulse 1.5s ease-in-out infinite" }}>
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
            <rect x="4" y="4" width="12" height="12" rx="2" fill="white" opacity="0.9" />
            <rect x="20" y="4" width="12" height="12" rx="2" fill="white" opacity="0.6" />
            <rect x="4" y="20" width="12" height="12" rx="2" fill="white" opacity="0.6" />
            <rect x="20" y="20" width="12" height="12" rx="2" fill={GREEN} opacity="1" />
          </svg>
        </div>
        <h2 style={{ textAlign: "center", color: NAVY, fontSize: 22, fontWeight: 700, margin: 0 }}>AI 硫댁젒 遺꾩꽍 由ы룷??/h2>
        <p style={{ textAlign: "center", color: "#666", fontSize: 14, margin: "8px 0 0" }}>硫댁젒 ?곗씠?곕? ?뺣? 遺꾩꽍?섍퀬 ?덉뒿?덈떎</p>
      </div>

      {/* Progress bar */}
      <div style={{ width: 340, background: "#E0DDD8", borderRadius: 99, height: 6, margin: "0 auto 16px" }}>
        <div style={{ height: 6, borderRadius: 99, background: GREEN, width: `${progress}%`, transition: "width 0.08s linear" }} />
      </div>
      <p style={{ color: "#555", fontSize: 13, textAlign: "center", minHeight: 20, transition: "opacity 0.3s" }}>{steps[step]}</p>
      <p style={{ color: "#999", fontSize: 12, marginTop: 8 }}>{Math.round(progress)}%</p>

      <style>{`@keyframes pulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.06)} }`}</style>
    </div>
  );
}

// ??? Shared Header ????????????????????????????????????????????????
function Header({ onExportWord }) {
  return (
    <header style={{ background: NAVY, padding: "0 32px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 36, height: 36, background: "rgba(255,255,255,0.12)", borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="20" height="20" viewBox="0 0 36 36" fill="none">
            <rect x="4" y="4" width="12" height="12" rx="2" fill="white" opacity="0.9" />
            <rect x="20" y="4" width="12" height="12" rx="2" fill="white" opacity="0.6" />
            <rect x="4" y="20" width="12" height="12" rx="2" fill="white" opacity="0.6" />
            <rect x="20" y="20" width="12" height="12" rx="2" fill={GREEN} />
          </svg>
        </div>
        <span style={{ color: "white", fontWeight: 600, fontSize: 15 }}>AI 硫댁젒 遺꾩꽍 由ы룷??/span>
      </div>

      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={onExportWord} style={{ padding: "7px 16px", borderRadius: 8, border: "none", background: GREEN, color: "white", fontSize: 13, cursor: "pointer", fontWeight: 600 }}>
          Word ?대낫?닿린
        </button>
      </div>
    </header>
  );
}

// ??? Star Rating ??????????????????????????????????????????????????
function Stars({ score, color = "#F59E0B" }) {
  return (
    <span style={{ display: "inline-flex", gap: 2 }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 14 14" fill={i <= score ? color : "#DDD"}>
          <path d="M7 1l1.545 3.13 3.455.502-2.5 2.436.59 3.44L7 8.885l-3.09 1.623.59-3.44L2 4.632l3.455-.502z" />
        </svg>
      ))}
    </span>
  );
}

// ??? Fit-Gap Bar ?????????????????????????????????????????????????
function FitGapBar({ label, pct }) {
  const color = pct >= 70 ? GREEN : pct >= 45 ? "#F59E0B" : "#E24B4A";
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 5 }}>
        <span style={{ color: "#333" }}>{label}</span>
        <span style={{ fontWeight: 600, color }}>{pct}%</span>
      </div>
      <div style={{ background: "#E8E5DF", borderRadius: 99, height: 8 }}>
        <div style={{ width: `${pct}%`, height: 8, borderRadius: 99, background: color, transition: "width 1s ease" }} />
      </div>
    </div>
  );
}

// ??? STAR Highlight ???????????????????????????????????????????????
function StarText({ text, highlights }) {
  if (!highlights) return <span style={{ color: "#333", lineHeight: 1.8 }}>{text}</span>;
  const parts = [];
  let last = 0;
  highlights.forEach(({ start, end, type }) => {
    if (start > last) parts.push({ t: text.slice(last, start), type: null });
    parts.push({ t: text.slice(start, end), type });
    last = end;
  });
  if (last < text.length) parts.push({ t: text.slice(last), type: null });
  const colors = { S: "#DBEAFE", T: "#D1FAE5", A: "#FEF3C7", R: "#FCE7F3" };
  const textC = { S: "#1E40AF", T: "#065F46", A: "#92400E", R: "#9D174D" };
  return (
    <span style={{ lineHeight: 1.9, fontSize: 14 }}>
      {parts.map((p, i) =>
        p.type ? (
          <mark key={i} style={{ background: colors[p.type], color: textC[p.type], borderRadius: 3, padding: "1px 3px", fontWeight: 500 }}>{p.t}</mark>
        ) : (
          <span key={i} style={{ color: "#333" }}>{p.t}</span>
        )
      )}
    </span>
  );
}

// ??? Mentee Report ????????????????????????????????????????????????
function MenteeReport({ sessionId }) {
  const navigate = useNavigate();
  const qnas = [
    {
      q: "Q1 쨌 蹂몄씤??寃쏀뿕??媛????湲곗닠???꾩쟾怨??닿껐 怨쇱젙??留먰빐二쇱꽭??",
      text: "移댁뭅???명꽩 ?뱀떆 寃곗젣 ?쒕쾭媛 ?쇳겕 ??꾩뿉 ?묐떟 吏?곗씠 3珥덈? ?섎뒗 ?곹솴??諛쒖깮?덉뒿?덈떎. ?먯씤 遺꾩꽍怨??깅뒫 媛쒖꽑??2二??댁뿉 留덈Т由ы빐???덇퀬, DB 荑쇰━ 理쒖쟻?붿? Redis 罹먯떛???꾩엯?덉뒿?덈떎. N+1 臾몄젣瑜??닿껐?섍퀬 罹먯떆 ?덊듃?⑥쓣 80%源뚯? ?뚯뼱?щ졇?듬땲?? 寃곌낵?곸쑝濡??됯퇏 ?묐떟 ?쒓컙??340ms源뚯? 以꾩씠?????깃났?덉뒿?덈떎.",
      highlights: [{ start: 0, end: 41, type: "S" }, { start: 41, end: 78, type: "T" }, { start: 78, end: 157, type: "A" }, { start: 157, end: 210, type: "R" }],
      score: 4, time: "1:24", note: "?쇰━?기쐯"
    },
    {
      q: "Q2 쨌 ?묒뾽 以?湲곗닠???섍껄 異⑸룎???덉뿀??寃쏀뿕???덈굹??",
      text: "? ?꾨줈?앺듃?먯꽌 REST API ?ㅺ퀎 諛⑹떇???먭퀬 ??먭낵 ?섍껄 李⑥씠媛 ?덉뿀?붾뜲?? ?쒕줈 ?ㅻⅨ 而⑤깽?섏쓣 媛吏怨??덉뼱???듯빀???꾩슂?덉뒿?덈떎. ?쒓? 癒쇱? ?묒そ 諛⑹떇???λ떒?먯쓣 臾몄꽌?뷀빐??怨듭쑀?섍퀬 ? 誘명똿???듯빐 ?⑹쓽瑜??대걣?대깉?댁슂. ?댄썑 API ?쇨??깆씠 ?믪븘?몄꽌 媛쒕컻 ?띾룄媛 鍮⑤씪議뚯뒿?덈떎.",
      highlights: [{ start: 0, end: 43, type: "S" }, { start: 43, end: 79, type: "T" }, { start: 79, end: 159, type: "A" }, { start: 159, end: 210, type: "R" }],
      score: 5, time: "0:58"
    },
    {
      q: "Q3 쨌 MSA ?섍꼍?먯꽌???쒕퉬??媛??듭떊 諛⑹떇??????ㅻ챸?대낫?몄슂.",
      text: "MSA??留덉씠?щ줈?쒕퉬???꾪궎?띿쿂?몃뜲 ?쒕퉬?ㅻ뱾???낅┰?곸쑝濡??댁쁺?섍퀬 洹몃━怨??쒕줈 ?듭떊???뚮뒗 REST瑜??곌굅???꾨땲硫?硫붿떆吏 ?먮? ?곕뒗 諛⑸쾿???덇퀬 ??gRPC?쇰뒗 諛⑸쾿???덈뒗?????二쇰줈 REST瑜?留롮씠 ?⑤뇬怨?..",
      highlights: null,
      score: 2, time: "2:11", bad: true, note: "?쇰━?기뼰"
    },
  ];

  return (
    <div id="report-content" style={{ background: BG, minHeight: "100vh", fontFamily: "'Noto Sans KR', 'Apple SD Gothic Neo', sans-serif", paddingBottom: 80 }}>
      <div style={{ maxWidth: 820, margin: "0 auto", padding: "32px 24px" }}>
        {/* Meta */}
        <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
          {["1李?AI 由ы룷??, "遺꾩꽍 ?꾨즺"].map((t, i) => (
            <span key={i} style={{ fontSize: 12, padding: "3px 10px", borderRadius: 99, background: i === 0 ? "#E1F5EE" : "#E8E5DF", color: i === 0 ? "#0F6E56" : "#666", fontWeight: 600 }}>{t}</span>
          ))}
        </div>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: "#111", margin: "0 0 6px" }}>諛깆뿏??媛쒕컻??紐⑥쓽 硫댁젒</h1>
        <p style={{ color: "#888", fontSize: 13, margin: "0 0 32px" }}>2026.04.02 ?ㅽ썑 7:00 쨌 硫섑넗 諛뺤???쨌 1:1 ?몄뀡 쨌 60遺?/p>

        {/* BEST / WORST */}
        <p style={{ fontSize: 12, fontWeight: 700, color: "#666", letterSpacing: 1, marginBottom: 12 }}>AI媛 戮묒? ?듭떖 臾명빆</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 28 }}>
          <div style={{ background: "#1E3A5F", borderRadius: 14, padding: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: "#7DD3FC", letterSpacing: 1 }}>??BEST 臾명빆</span>
              <span style={{ fontSize: 11, color: "#7DD3FC" }}>Q1</span>
            </div>
            <p style={{ color: "white", fontSize: 14, fontWeight: 600, lineHeight: 1.6, margin: "0 0 12px" }}>"寃곌낵?곸쑝濡??됯퇏 ?묐떟 ?쒓컙??340ms源뚯? 以꾩씠?????깃났?덉뒿?덈떎."</p>
            <p style={{ color: "#93C5FD", fontSize: 12, margin: 0, lineHeight: 1.5 }}>?섏튂 湲곕컲 寃곌낵 ?쒖떆 + ?됰룞-寃곌낵 ?멸낵愿怨꾧? 紐낇솗???ㅻ뱷?μ씠 ?믪븘??</p>
          </div>
          <div style={{ background: "#4A1515", borderRadius: 14, padding: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: "#FCA5A5", letterSpacing: 1 }}>??WORST 臾명빆</span>
              <span style={{ fontSize: 11, color: "#FCA5A5" }}>Q3</span>
            </div>
            <p style={{ color: "white", fontSize: 14, fontWeight: 600, lineHeight: 1.6, margin: "0 0 12px" }}>"REST瑜??곌굅???꾨땲硫?硫붿떆吏 ?먮? ?곕뒗 諛⑸쾿???덇퀬 ??gRPC?쇰뒗 諛⑸쾿???덈뒗??.."</p>
            <p style={{ color: "#FCA5A5", fontSize: 12, margin: 0, lineHeight: 1.5 }}>留뚯뿰泥?+ 寃쏀뿕 ?녿뒗 ?대줎 ?섏뿴. 援ъ껜???щ????숈뒿 ?섏?濡??꾪솚???꾩슂?댁슂.</p>
          </div>
        </div>

        {/* Quantitative metrics */}
        <p style={{ fontSize: 12, fontWeight: 700, color: "#666", letterSpacing: 1, marginBottom: 12 }}>?뺣웾 ?됯? ?붿빟</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 28 }}>
          <div style={{ background: "#F0FDF4", border: "1px solid #BBF7D0", borderRadius: 12, padding: 18 }}>
            <p style={{ fontSize: 11, color: "#166534", fontWeight: 700, margin: "0 0 14px", letterSpacing: 1 }}>BEST ???섑븳 ??/p>
            {[["留먰븯湲??띾룄", "118 WPM 쨌 ?덉젙??, "?묓샇"], ["STAR 援ъ“??, "4 / 4 援ъ꽦", null], ["?됯퇏 諛섏쓳 ?띾룄", "1.8珥?, null]].map(([k, v, badge]) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "9px 0", borderBottom: "1px solid #D1FAE5" }}>
                <span style={{ fontSize: 13, color: "#333" }}>{k}</span>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "#166534" }}>{v}</span>
                  {badge && <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 99, background: GREEN, color: "white" }}>{badge}</span>}
                </div>
              </div>
            ))}
          </div>
          <div style={{ background: "#FFF5F5", border: "1px solid #FED7D7", borderRadius: 12, padding: 18 }}>
            <p style={{ fontSize: 11, color: "#9B1C1C", fontWeight: 700, margin: "0 0 14px", letterSpacing: 1 }}>WORST ??媛쒖꽑 ?꾩슂</p>
            {[["Q3 留먰븯湲??띾룄", "187 WPM 쨌 ?됱냼 ?鍮?1.6諛?鍮좊쫫", "湲댁옣"], ["移⑤У (Dead Air)", "3珥??댁긽 쨌 4??, null], ["臾몄옣 媛꾧껐??, "留뚯뿰泥??⑦꽩 媛먯?", null]].map(([k, v, badge]) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "9px 0", borderBottom: "1px solid #FED7D7" }}>
                <span style={{ fontSize: 13, color: "#333" }}>{k}</span>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "#9B1C1C" }}>{v}</span>
                  {badge && <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 99, background: "#E24B4A", color: "white" }}>{badge}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Fit-Gap */}
        <p style={{ fontSize: 12, fontWeight: 700, color: "#666", letterSpacing: 1, marginBottom: 12 }}>??媛?(Fit-Gap) ??웾 遺꾩꽍</p>
        <div style={{ background: CARD, border: "1px solid #E8E5DF", borderRadius: 14, padding: 22, marginBottom: 28 }}>
          <p style={{ fontSize: 12, color: "#999", marginBottom: 16, margin: "0 0 16px" }}>梨꾩슜 怨듦퀬 ?붽뎄 ??웾 ?鍮??먯냼??& ?듬? 而ㅻ쾭由ъ?</p>
          {[["Java / Spring Boot", 92], ["?洹쒕え ?몃옒??寃쏀뿕", 78], ["CI/CD 쨌 DevOps", 51], ["MSA 쨌 遺꾩궛 ?쒖뒪??, 44], ["?곗씠???뚯씠?꾨씪??, 22]].map(([l, p]) => (
            <FitGapBar key={l} label={l} pct={p} />
          ))}
          <div style={{ display: "flex", gap: 16, marginTop: 16 }}>
            {[["異⑸텇??而ㅻ쾭", GREEN], ["蹂댁셿 ?꾩슂", "#F59E0B"], ["媛?諛쒖깮", "#E24B4A"]].map(([l, c]) => (
              <div key={l} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: "#666" }}>
                <div style={{ width: 8, height: 8, borderRadius: 99, background: c }} /> {l}
              </div>
            ))}
          </div>
        </div>

        {/* Q&A Scripts */}
        <p style={{ fontSize: 12, fontWeight: 700, color: "#666", letterSpacing: 1, marginBottom: 12 }}>?꾩껜 Q&A ?ㅽ겕由쏀듃</p>
        <div style={{ display: "flex", gap: 6, marginBottom: 16 }}>
          {[["S ?곹솴", "#DBEAFE", "#1E40AF"], ["T 怨쇱젣", "#D1FAE5", "#065F46"], ["A ?됰룞", "#FEF3C7", "#92400E"], ["R 寃곌낵", "#FCE7F3", "#9D174D"]].map(([l, bg, c]) => (
            <span key={l} style={{ fontSize: 11, padding: "3px 10px", borderRadius: 99, background: bg, color: c, fontWeight: 600 }}>{l}</span>
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {qnas.map((qa, i) => (
            <div key={i} style={{ background: CARD, border: `1px solid ${qa.bad ? "#FED7D7" : "#E8E5DF"}`, borderRadius: 14, padding: 20 }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: NAVY, marginBottom: 12 }}>{qa.q}</p>
              <StarText text={qa.text} highlights={qa.highlights} />
              {qa.note && <span style={{ fontSize: 11, color: "#666", background: "#F0EFEB", padding: "2px 8px", borderRadius: 99, marginLeft: 6 }}>{qa.note}</span>}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 14 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <Stars score={qa.score} />
                  <span style={{ fontSize: 12, color: "#888" }}>AI {qa.score}.0</span>
                </div>
                <button style={{ fontSize: 12, color: GREEN, border: `1px solid ${GREEN}`, background: "transparent", borderRadius: 99, padding: "4px 12px", cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={GREEN} strokeWidth="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                  ?듬? ?ｊ린 쨌 {qa.time}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* 硫섑넗留??몄뀡 ?낆옣 */}
        <div style={{ marginTop: 32, background: NAVY, borderRadius: 16, padding: 28, textAlign: "center" }}>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 13, margin: "0 0 8px" }}>AI 由ы룷??遺꾩꽍???꾨즺?섏뿀?듬땲??/p>
          <p style={{ color: "white", fontSize: 18, fontWeight: 700, margin: "0 0 20px" }}>硫섑넗? ?④퍡 由ы룷?몃? 由щ럭?섎뒗 ?쒓컙??媛?몃낫?몄슂</p>
          <button
            onClick={() => navigate(`/mentoring/mentee/${sessionId}`)}
            style={{ padding: "14px 40px", borderRadius: 12, border: "none", background: GREEN, color: "white", fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", transition: "opacity 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
            onMouseLeave={e => e.currentTarget.style.opacity = "1"}
          >
            硫섑넗留??몄뀡 ?낆옣?섍린 ??
          </button>
        </div>
      </div>
    </div>
  );
}

// ??? Mentor Report ????????????????????????????????????????????????
function MentorReport({ sessionId }) {
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState("");
  const [saved, setSaved] = useState(false);
  const [filter, setFilter] = useState("?꾩껜");
  const mentees = [
    { initials: "源M", name: "源誘쇱?", track: "諛깆뿏?쑣룹떊??, wpm: 118, star: "4/4", silence: 2, score: 4.2, color: "#3B5A8A",
      quotes: ["?됯퇏 ?묐떟 ?쒓컙??340ms源뚯? 以꾩씠?????깃났?덉뒿?덈떎.", "REST瑜??곌굅??硫붿떆吏 ?먮? ?곕뒗 諛⑸쾿???덇퀬 gRPC?쇰뒗 諛⑸쾿???덈뒗??.."],
      myScore: 4, done: true },
    { initials: "諛뷨", name: "諛뺤꽌??, track: "?꾨줎?몄뿏?쑣??꾩감", wpm: 142, star: "3/4", silence: 1, score: 3.5, color: "#3A7A6A",
      quotes: ["React ?뚮뜑留?理쒖쟻?붾줈 LCP瑜?2.1珥덉뿉??0.8珥덈줈 ?⑥텞?덉뼱??", "寃곌낵媛 ?대뼸寃??먮뒗吏???뺥솗??湲곗뼲???????섏꽌..."],
      myScore: 3.5, done: false },
    { initials: "理쏦", name: "理쒗쁽??, track: "??ㅽ깮쨌?좎엯", wpm: 192, star: "2/4", silence: 5, score: 2.8, color: "#7A4A6A",
      quotes: ["?ъ슜??遺덊렪??吏곸젒 ?명꽣酉고빐??臾몄젣瑜??뺤쓽?덉뒿?덈떎.", "洹몃옒??洹몃깷 ??怨좎퀜蹂대젮怨??덈뒗???????먯뼱??萸붽?..."],
      myScore: 2, done: false },
    { initials: "?퀺", name: "?댁???, track: "諛깆뿏?쑣??꾩감", wpm: 125, star: "4/4", silence: 0, score: 4.7, color: "#5A6A3A",
      quotes: ["? 諛고룷 ?ъ씠?댁쓣 3?쇱뿉???뱀씪濡?以꾩씤 CI/CD ?뚯씠?꾨씪?몄쓣 援ъ텞?덉뒿?덈떎.", "?⑥젏?대씪怨??섎㈃ ?깊엳 ?앷컖?섎뒗 寃??녿뒗?곗슂..."],
      myScore: 4.7, done: false },
  ];

  const filtered = filter === "?꾩껜" ? mentees : filter === "AI 遺꾩꽍 ?꾨즺" ? mentees.slice(0, 2) : mentees.filter(m => !m.done);

  const wpmColor = (wpm) => wpm < 130 ? GREEN : wpm < 160 ? "#F59E0B" : "#E24B4A";

  return (
    <div id="report-content" style={{ background: BG, minHeight: "100vh", fontFamily: "'Noto Sans KR', 'Apple SD Gothic Neo', sans-serif", paddingBottom: 80 }}>
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "32px 24px" }}>
        {/* Session info */}
        <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
          {["洹몃９ 硫댁젒쨌4??, "2026.04.07 ?ㅽ썑 8:00", "?꾨줎?몄뿏??吏곷Т"].map((t, i) => (
            <span key={i} style={{ fontSize: 12, padding: "4px 12px", borderRadius: 99, background: i === 1 ? "#E1F5EE" : CARD, border: "1px solid #E0DDD8", color: i === 1 ? "#0F6E56" : "#555", fontWeight: 600 }}>{t}</span>
          ))}
        </div>

        {/* Filter */}
        <div style={{ display: "flex", gap: 6, marginBottom: 20 }}>
          {["?꾩껜 (4)", "AI 遺꾩꽍 ?꾨즺", "?쇰뱶諛??묒꽦 ?꾩슂"].map((f) => {
            const label = f.split(" ")[0];
            return (
              <button key={f} onClick={() => setFilter(label)}
                style={{ padding: "7px 18px", borderRadius: 99, border: `1.5px solid ${filter === label ? NAVY : "#DDD"}`, background: filter === label ? NAVY : "white", color: filter === label ? "white" : "#555", fontSize: 13, cursor: "pointer", fontWeight: 600, transition: "all 0.2s" }}>
                {f}
              </button>
            );
          })}
        </div>

        {/* Mentee cards */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 36 }}>
          {filtered.map((m, i) => (
            <div key={i} style={{ background: CARD, border: `2px solid ${m.done ? NAVY : "#E8E5DF"}`, borderRadius: 16, padding: 20 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                <div style={{ width: 36, height: 36, borderRadius: "50%", background: m.color, display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: 12, fontWeight: 700 }}>{m.initials}</div>
                <div>
                  <p style={{ fontWeight: 700, margin: 0, fontSize: 15, color: "#111" }}>{m.name}</p>
                  <p style={{ color: "#888", fontSize: 12, margin: 0 }}>{m.track}</p>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 14 }}>
                {[["留먰븯湲??띾룄", `${m.wpm} WPM`, wpmColor(m.wpm)], ["STAR 援ъ“??, m.star, GREEN], ["移⑤У ?잛닔", `${m.silence}??, m.silence <= 2 ? "#555" : "#E24B4A"], ["AI 醫낇빀?먯닔", m.score, m.score >= 4 ? GREEN : m.score >= 3 ? "#F59E0B" : "#E24B4A"]].map(([k, v, c]) => (
                  <div key={k} style={{ background: "#F8F7F4", borderRadius: 8, padding: "10px 12px" }}>
                    <p style={{ fontSize: 11, color: "#999", margin: "0 0 4px" }}>{k}</p>
                    <p style={{ fontSize: 15, fontWeight: 700, color: c, margin: 0 }}>{v}</p>
                  </div>
                ))}
              </div>
              <div style={{ marginBottom: 14 }}>
                {m.quotes.map((q, j) => (
                  <p key={j} style={{ fontSize: 12, color: "#555", lineHeight: 1.6, margin: "0 0 4px", paddingLeft: 12, borderLeft: `3px solid ${j === 0 ? GREEN : "#E24B4A"}` }}>"{q}"</p>
                ))}
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <Stars score={Math.round(m.myScore)} />
                  <span style={{ fontSize: 12, color: "#888" }}>{m.myScore}</span>
                </div>
                <span style={{ fontSize: 12, padding: "4px 12px", borderRadius: 99, background: m.done ? "#E1F5EE" : "#FFF5F5", color: m.done ? "#0F6E56" : "#E24B4A", fontWeight: 600 }}>{m.done ? "?쇰뱶諛??꾨즺" : "?쇰뱶諛??꾩슂"}</span>
              </div>
            </div>
          ))}
        </div>

        {/* 硫섑넗留??몄뀡 ?낆옣 */}
        <div style={{ background: NAVY, borderRadius: 16, padding: 28, textAlign: "center" }}>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 13, margin: "0 0 8px" }}>AI 遺꾩꽍???꾨즺?섏뿀?듬땲??/p>
          <p style={{ color: "white", fontSize: 18, fontWeight: 700, margin: "0 0 20px" }}>硫섑떚? ?④퍡 由ы룷?몃? 由щ럭?섎뒗 硫섑넗留??몄뀡???쒖옉?대낫?몄슂</p>
          <button
            onClick={() => navigate(`/mentoring/mentor/${sessionId}`)}
            style={{ padding: "14px 40px", borderRadius: 12, border: "none", background: GREEN, color: "white", fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", transition: "opacity 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
            onMouseLeave={e => e.currentTarget.style.opacity = "1"}
          >
            硫섑넗留??몄뀡 ?쒖옉?섍린 ??
          </button>
        </div>
      </div>
    </div>
  );
}

function exportWord(role) {
  const el = document.getElementById("report-content");
  const bodyHtml = el ? el.innerHTML : "<p>由ы룷???댁슜??遺덈윭?????놁뒿?덈떎.</p>";

  const html = `<!DOCTYPE html><html><head><meta charset="utf-8">
  <style>
    body { font-family: 'Malgun Gothic', 'Apple SD Gothic Neo', sans-serif; max-width: 860px; margin: 40px auto; color: #111; line-height: 1.8; background: #F0EFEB; }
    button { display: none !important; }
    svg { display: none !important; }
  </style>
  </head><body>${bodyHtml}</body></html>`;

  const blob = new Blob([html], { type: "application/msword;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `硫댁젒_由ы룷??${role === "mentee" ? "硫섑떚" : "硫섑넗"}_${new Date().toISOString().slice(0, 10)}.doc`;
  a.click();
  URL.revokeObjectURL(url);
}

// ??? Page Root ????????????????????????????????????????????????????
export default function AIReportPage() {
  const { sessionId } = useParams();
  const location = useLocation();
  const [phase, setPhase] = useState("loading");
  const role = location.state?.role || "mentee";

  return (
    <div style={{ fontFamily: "'Noto Sans KR', 'Apple SD Gothic Neo', sans-serif" }}>
      {phase === "loading" ? (
        <LoadingScreen onDone={() => setPhase("report")} />
      ) : (
        <>
          <Header onExportWord={() => exportWord(role)} />
          {role === "mentee"
            ? <MenteeReport sessionId={sessionId} />
            : <MentorReport sessionId={sessionId} />
          }
        </>
      )}
    </div>
  );
}
