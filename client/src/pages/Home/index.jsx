import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

/* ============================================================
   SceneA — 메인 홈 페이지  (pages/Home/index.jsx)
   딥 네이비 + 크림 컬러 시스템 / 반응형
   ============================================================ */

/* ── 컬러 & 스타일 상수 ── */
const C = {
  navy:     "#0D2244",
  navyMid:  "#1A3660",
  cream:    "#F2F0EB",
  creamDark:"#E8E5DE",
  white:    "#FFFFFF",
  teal:     "#1D9E75",
  tealDark: "#0F6E56",
  text:     "#1A1818",
  textSub:  "#6B6863",
  textMuted:"#9E9B95",
};

/* ── 글로벌 CSS ── */
const GlobalStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700&family=Playfair+Display:wght@700&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    html { scroll-behavior: smooth; }

    body {
      font-family: 'Noto Sans KR', sans-serif;
      background: ${C.cream};
      color: ${C.text};
      -webkit-font-smoothing: antialiased;
    }

    /* ── 스크롤 애니메이션 ── */
    .fade-up {
      opacity: 0;
      transform: translateY(32px);
      transition: opacity 0.7s ease, transform 0.7s ease;
    }
    .fade-up.visible {
      opacity: 1;
      transform: translateY(0);
    }

    /* ── Hero blob ── */
    @keyframes blobDrift {
      0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
      50%       { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
    }

    /* ── 반응형 브레이크포인트 ── */
    @media (max-width: 768px) {
      .step-row { flex-direction: column !important; }
      .step-row.reverse { flex-direction: column !important; }
      .mentor-grid { grid-template-columns: 1fr 1fr !important; }
      .review-grid { grid-template-columns: 1fr !important; }
      .hero-title { font-size: 32px !important; }
      .section-title { font-size: 26px !important; }
      .bottom-cta-wrap { flex-direction: column !important; gap: 2rem !important; text-align: center; }
    }
    @media (max-width: 480px) {
      .mentor-grid { grid-template-columns: 1fr !important; }
      .hero-title { font-size: 26px !important; }
    }
  `}</style>
);

/* ── 로고 아이콘 SVG ── */
const LogoIcon = ({ size = 28, color = C.white }) => (
  <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
    <circle cx="14" cy="14" r="2" fill={color} />
    {[0,45,90,135,180,225,270,315].map((deg, i) => {
      const r = deg * Math.PI / 180;
      const x1 = 14 + 2.5 * Math.cos(r), y1 = 14 + 2.5 * Math.sin(r);
      const x2 = 14 + 10 * Math.cos(r), y2 = 14 + 10 * Math.sin(r);
      return (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
          stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      );
    })}
    {[0,90,180,270].map((deg, i) => {
      const r = deg * Math.PI / 180;
      const mx = 14 + 7 * Math.cos(r), my = 14 + 7 * Math.sin(r);
      const offR = r + Math.PI / 2;
      return (
        <g key={`branch-${i}`}>
          <line x1={mx} y1={my}
            x2={mx + 3 * Math.cos(offR)} y2={my + 3 * Math.sin(offR)}
            stroke={color} strokeWidth="1.2" strokeLinecap="round" />
          <line x1={mx} y1={my}
            x2={mx - 3 * Math.cos(offR)} y2={my - 3 * Math.sin(offR)}
            stroke={color} strokeWidth="1.2" strokeLinecap="round" />
        </g>
      );
    })}
  </svg>
);

/* ── 헤더 ── */
const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: C.navy,
      borderBottom: scrolled ? `1px solid rgba(255,255,255,0.08)` : "none",
      transition: "border-bottom 0.3s ease",
      padding: "0 5%",
    }}>
      <nav style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        height: 68,
      }}>
        {/* 로고 */}
        <Link to="/" style={{
          display: "flex", alignItems: "center", gap: 10,
          textDecoration: "none",
        }}>
          <LogoIcon size={28} color={C.white} />
          <span style={{
            fontFamily: "'Noto Sans KR', sans-serif",
            fontWeight: 700, fontSize: 18, color: C.white, letterSpacing: "-0.3px",
          }}>
            SceneA
          </span>
        </Link>

        {/* 우측 버튼 */}
        <Link to="/auth/login" style={{
          background: C.white, color: C.navy,
          fontFamily: "'Noto Sans KR', sans-serif",
          fontSize: 14, fontWeight: 500,
          padding: "9px 22px", borderRadius: 999,
          textDecoration: "none",
          transition: "background 0.2s",
        }}
          onMouseEnter={e => e.target.style.background = C.cream}
          onMouseLeave={e => e.target.style.background = C.white}
        >
          로그인
        </Link>
      </nav>
    </header>
  );
};

/* ── 히어로 섹션 ── */
const Hero = () => (
  <section style={{
    background: C.navy,
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    overflow: "hidden",
    padding: "80px 5% 80px",
    textAlign: "center",
    width: "100vw",
    marginLeft: "calc(50% - 50vw)",
  }}>
    {/* 컬러풀 파스텔 블롭 배경 */}
    {[
      { color: "#F9C6C6", top: "10%", left: "5%",  w: 380, h: 340, delay: "0s"   },
      { color: "#C8E6C9", top: "5%",  left: "45%", w: 320, h: 290, delay: "4s"   },
      { color: "#FFF9C4", top: "40%", left: "60%", w: 300, h: 260, delay: "2s"   },
      { color: "#BBDEFB", top: "50%", left: "10%", w: 260, h: 240, delay: "6s"   },
      { color: "#E1BEE7", top: "25%", left: "30%", w: 200, h: 180, delay: "3s"   },
    ].map((b, i) => (
      <div key={i} style={{
        position: "absolute", top: b.top, left: b.left,
        width: b.w, height: b.h,
        background: b.color,
        opacity: 0.18,
        filter: "blur(60px)",
        borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
        animation: `blobDrift 12s ease-in-out ${b.delay} infinite alternate`,
        pointerEvents: "none",
      }} />
    ))}

    {/* 콘텐츠 */}
    <div style={{ position: "relative", zIndex: 1, maxWidth: 760 }}>
      <p style={{
        fontSize: 12, fontWeight: 500, letterSpacing: "0.15em",
        color: "rgba(255,255,255,0.55)", textTransform: "uppercase",
        marginBottom: 24,
      }}>
        AI × 현직자 하이브리드 모의 면접 플랫폼
      </p>

      <h1 className="hero-title" style={{
        fontSize: 48, fontWeight: 700, color: C.white,
        lineHeight: 1.25, letterSpacing: "-0.02em",
        marginBottom: 20,
      }}>
        "면접, 더 이상
        <br />
        혼자 준비하지 마세요"
      </h1>

      <h2 style={{
        fontSize: 22, fontWeight: 400, color: "rgba(255,255,255,0.72)",
        lineHeight: 1.5, marginBottom: 48,
      }}>
        AI가 분석하고, 현직자가 완성합니다
      </h2>

      <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
        <Link to="/auth/register" style={{
          background: C.white, color: C.navy,
          fontSize: 15, fontWeight: 700,
          padding: "14px 36px", borderRadius: 999,
          textDecoration: "none",
          transition: "transform 0.2s, background 0.2s",
        }}
          onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
          onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
        >
          면접 참여하러 가기
        </Link>
        <Link to="/mentor/search" style={{
          background: "transparent", color: C.white,
          fontSize: 15, fontWeight: 400,
          padding: "14px 36px", borderRadius: 999,
          border: `1.5px solid rgba(255,255,255,0.4)`,
          textDecoration: "none",
          transition: "border-color 0.2s",
        }}
          onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.9)"}
          onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)"}
        >
          멘토 둘러보기
        </Link>
      </div>
    </div>

    {/* 하단 페이드 */}
    <div style={{
      position: "absolute", bottom: 0, left: 0, right: 0, height: 100,
      background: `linear-gradient(to bottom, transparent, ${C.cream})`,
    }} />
  </section>
);

/* ── STEP 피처 섹션 ── */
const steps = [
  {
    num: "STEP 01",
    title: "AI 기반 정밀 역량 매칭",
    desc: "AI가 목표 기업의 공고와 당신의 자소서를 교차 분석하여 핵심 역량을 추출합니다. 이를 바탕으로 현직자 멘토가 당신만을 위한 맞춤형 면접 질문을 설계합니다.",
    reverse: false,
    accent: "#E8F5EE",
    tag: "Smart Matching",
  },
  {
    num: "STEP 02",
    title: "실시간 하이브리드 모의 면접",
    desc: "화상 면접이 진행됩니다. AI는 실시간으로 당신의 발화 속도와 답변 구조를 분석하고, 멘토는 맞은편에서 당신의 태도와 경험의 전달성을 놓치지 않고 체크합니다.",
    reverse: true,
    accent: "#EEF5FF",
    tag: "Live Session",
  },
  {
    num: "STEP 03",
    title: "데이터와 경험이 결합된 진화형 리포트",
    desc: "AI 정량적 평가(말하기 속도, 침묵, 논리성)와 멘토의 경험 기반 코칭이 결합된 1차·2차 리포트를 제공합니다. 당신의 약점을 정확하게 알고 강화할 수 있는 가장 완벽한 피드백을 만나보세요.",
    reverse: false,
    accent: "#FFF5E8",
    tag: "Dual Report",
  },
];

/* 플레이스홀더 "화면 미리보기" 카드 */
const ScreenPreview = ({ accent, num }) => (
  <div style={{
    background: C.navy,
    borderRadius: 20,
    overflow: "hidden",
    aspectRatio: "16/10",
    display: "flex",
    flexDirection: "column",
    padding: 20,
    gap: 10,
    boxShadow: `0 24px 60px rgba(13,34,68,0.18)`,
  }}>
    {/* 가짜 헤더 바 */}
    <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
      {["#F87171","#FBBF24","#34D399"].map((c, i) => (
        <div key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: c }} />
      ))}
    </div>
    {/* 가짜 컨텐츠 */}
    <div style={{ flex: 1, display: "flex", gap: 10 }}>
      <div style={{ flex: 2, display: "flex", flexDirection: "column", gap: 8 }}>
        <div style={{ height: 10, background: "rgba(255,255,255,0.12)", borderRadius: 4, width: "60%" }} />
        <div style={{ height: 8, background: "rgba(255,255,255,0.07)", borderRadius: 4, width: "80%" }} />
        <div style={{ height: 8, background: "rgba(255,255,255,0.07)", borderRadius: 4, width: "55%" }} />
        <div style={{ height: 40, background: accent, borderRadius: 10, marginTop: 8, opacity: 0.7 }} />
        <div style={{ height: 40, background: "rgba(255,255,255,0.06)", borderRadius: 10 }} />
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
        <div style={{ flex: 1, background: "rgba(255,255,255,0.06)", borderRadius: 10 }} />
        <div style={{ height: 30, background: C.teal, borderRadius: 8, opacity: 0.8 }} />
      </div>
    </div>
  </div>
);

const FeaturesSection = () => (
  <section style={{ background: C.cream, padding: "100px 5%" }}>
      {steps.map((step, i) => (
        <div
          key={i}
          className={`step-row fade-up ${step.reverse ? "reverse" : ""}`}
          style={{
            display: "flex",
            flexDirection: step.reverse ? "row-reverse" : "row",
            alignItems: "center",
            gap: "6%",
            marginBottom: i < steps.length - 1 ? 120 : 0,
          }}
        >
          {/* 텍스트 */}
          <div style={{ flex: 1 }}>
            <span style={{
              fontSize: 11, fontWeight: 700, letterSpacing: "0.18em",
              color: C.teal, textTransform: "uppercase", display: "block",
              marginBottom: 12,
            }}>
              {step.num}
            </span>
            <h3 className="section-title" style={{
              fontSize: 30, fontWeight: 700, color: C.navy,
              lineHeight: 1.3, letterSpacing: "-0.02em", marginBottom: 20,
            }}>
              {step.title}
            </h3>
            <p style={{
              fontSize: 15, color: C.textSub, lineHeight: 1.85,
              wordBreak: "keep-all",
            }}>
              {step.desc}
            </p>
            <div style={{
              display: "inline-block", marginTop: 28,
              background: step.accent, color: C.navyMid,
              fontSize: 12, fontWeight: 600, padding: "6px 16px",
              borderRadius: 999, letterSpacing: "0.05em",
            }}>
              {step.tag}
            </div>
          </div>

          {/* 비주얼 */}
          <div style={{ flex: 1.2 }}>
            <ScreenPreview accent={step.accent} num={i} />
          </div>
        </div>
      ))}
  </section>
);

/* ── 멘토 카드 섹션 ── */
const mentors = [
  { initials: "박J", name: "박지훈", company: "네이버", role: "백엔드 개발", years: 6, tags: ["기술 면접", "JAVA/Spring", "대규모 보안 처리 경험"], rating: 4.9, reviews: 42 },
  { initials: "이S", name: "이수연", company: "카카오", role: "프론트엔드", years: 5, tags: ["기술 면접", "React", "성능 최적화"], rating: 4.8, reviews: 38 },
  { initials: "최H", name: "최현아", company: "라인", role: "풀스택 개발", years: 4, tags: ["포트폴리오 리뷰", "TypeScript", "DevOps"], rating: 4.7, reviews: 29 },
  { initials: "김D", name: "김도현", company: "쿠팡", role: "데이터 엔지니어", years: 7, tags: ["기술 면접", "Python", "데이터 파이프라인"], rating: 5.0, reviews: 55 },
  { initials: "정M", name: "정민서", company: "토스", role: "iOS 개발", years: 3, tags: ["기술 면접", "Swift", "앱 아키텍처"], rating: 4.6, reviews: 21 },
  { initials: "한G", name: "한기욱", company: "배달의민족", role: "인프라/SRE", years: 8, tags: ["인성 면접", "클라우드", "MSA"], rating: 4.9, reviews: 63 },
];

const StarRating = ({ val }) => (
  <span style={{ display: "inline-flex", gap: 2, alignItems: "center" }}>
    {"★★★★★".split("").map((s, i) => (
      <span key={i} style={{
        fontSize: 12,
        color: i < Math.floor(val) ? "#F59E0B" : "#D1CFC9",
      }}>★</span>
    ))}
    <span style={{ fontSize: 12, color: C.textSub, marginLeft: 4 }}>{val}</span>
  </span>
);

const MentorCard = ({ mentor }) => {
  const colors = ["#1A3660","#0F6E56","#533BA0","#8B4513","#1A5276","#145A32"];
  const bg = colors[mentors.indexOf(mentor) % colors.length];

  return (
    <div style={{
      background: C.white,
      borderRadius: 16,
      padding: "20px 20px 18px",
      border: `1px solid ${C.creamDark}`,
      transition: "transform 0.25s, box-shadow 0.25s",
      cursor: "pointer",
    }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "0 12px 32px rgba(13,34,68,0.12)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* 상단 */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
        <div style={{
          width: 44, height: 44, borderRadius: "50%",
          background: bg, flexShrink: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 13, fontWeight: 700, color: C.white,
        }}>
          {mentor.initials}
        </div>
        <div>
          <div style={{ fontSize: 15, fontWeight: 700, color: C.navy }}>{mentor.name} 멘토</div>
          <div style={{ fontSize: 12, color: C.textSub, marginTop: 1 }}>
            {mentor.company} · {mentor.role} {mentor.years}년차
          </div>
        </div>
      </div>

      {/* 태그 */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 14 }}>
        {mentor.tags.map((t, i) => (
          <span key={i} style={{
            fontSize: 11, padding: "3px 10px", borderRadius: 999,
            background: C.cream, color: C.textSub,
          }}>
            #{t}
          </span>
        ))}
      </div>

      {/* 하단 */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: `1px solid ${C.creamDark}`, paddingTop: 12 }}>
        <StarRating val={mentor.rating} />
        <span style={{ fontSize: 12, color: C.textMuted }}>후기 {mentor.reviews}건</span>
      </div>
    </div>
  );
};

const MentorsSection = () => (
  <section style={{ background: C.navy, padding: "100px 5%" }}>
      <div className="fade-up" style={{ textAlign: "center", marginBottom: 56 }}>
        <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.18em",
          color: C.teal, textTransform: "uppercase", marginBottom: 14 }}>
          지금 당신을 기다리는
        </p>
        <h2 className="section-title" style={{
          fontSize: 34, fontWeight: 700, color: C.white,
          letterSpacing: "-0.02em",
        }}>
          현직자 멘토
        </h2>
        <p style={{ marginTop: 16, fontSize: 15, color: "rgba(255,255,255,0.5)", lineHeight: 1.7 }}>
          Here's what people are saying
        </p>
      </div>

      <div className="mentor-grid" style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 16,
      }}>
        {mentors.map((m, i) => <MentorCard key={i} mentor={m} />)}
      </div>

      <div className="fade-up" style={{ textAlign: "center", marginTop: 48 }}>
        <Link to="/mentor/search" style={{
          display: "inline-block",
          background: C.teal, color: C.white,
          fontSize: 15, fontWeight: 600,
          padding: "14px 40px", borderRadius: 999,
          textDecoration: "none",
          transition: "background 0.2s, transform 0.2s",
        }}
          onMouseEnter={e => {
            e.currentTarget.style.background = C.tealDark;
            e.currentTarget.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = C.teal;
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          전체 멘토 보기 →
        </Link>
      </div>
  </section>
);

/* ── 멘티 후기 섹션 ── */
const reviews = [
  { initials: "김M", name: "김민준", bg: "#1A3660", company: "카카오 백엔드 개발자 지원", stars: 5,
    text: "실제 현장에서 어떤 답변을 원하는지 구체적으로 알려주셔서 너무 좋았어요. STAR 구조 피드백 덕분에 다음 면접에서 훨씬 자신감 있게 답변할 수 있었습니다!" },
  { initials: "박S", name: "박서연", bg: "#0F6E56", company: "네이버 프론트엔드 지원", stars: 4,
    text: "AI 리포트로 제 약점을 정확히 파악하고, 멘토님이 그 부분을 집중 코칭해주셔서 단기간에 많이 성장한 느낌이에요. 강력 추천합니다." },
  { initials: "이J", name: "이준석", bg: "#533BA0", company: "라인 지원", stars: 4,
    text: "기술 면접 준비에 정말 큰 도움이 됐어요. 다음 세션도 꼭 신청할 예정입니다. WPM 분석으로 말하기 속도가 문제였다는 걸 처음 알게 됐어요." },
];

const ReviewCard = ({ review }) => (
  <div style={{
    background: C.white, borderRadius: 16, padding: "24px",
    border: `1px solid ${C.creamDark}`,
  }}>
    <div style={{ display: "flex", gap: 6, marginBottom: 16 }}>
      {"★★★★★".split("").map((s, i) => (
        <span key={i} style={{ fontSize: 14, color: i < review.stars ? "#F59E0B" : "#D1CFC9" }}>★</span>
      ))}
    </div>
    <p style={{ fontSize: 14, color: C.text, lineHeight: 1.8, marginBottom: 20, wordBreak: "keep-all" }}>
      {review.text}
    </p>
    <div style={{ display: "flex", alignItems: "center", gap: 10, borderTop: `1px solid ${C.creamDark}`, paddingTop: 16 }}>
      <div style={{
        width: 36, height: 36, borderRadius: "50%",
        background: review.bg,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 11, fontWeight: 700, color: C.white, flexShrink: 0,
      }}>
        {review.initials}
      </div>
      <div>
        <div style={{ fontSize: 14, fontWeight: 600, color: C.navy }}>{review.name}</div>
        <div style={{ fontSize: 12, color: C.textMuted }}>{review.company}</div>
      </div>
    </div>
  </div>
);


const ReviewsAndCTA = () => (
  <section style={{
    background: C.cream,
    padding: "100px 5%",
    /* 가로 스크롤 차단 */
    overflow: "hidden",
  }}>
    <div style={{
      display: "grid",
      gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)",
      gap: "60px",
      alignItems: "start",
    }}>

      {/* ── 왼쪽: 실제 멘티들의 후기 ── */}
      <div className="fade-up">
        <p style={{
          fontSize: 12, fontWeight: 600, letterSpacing: "0.18em",
          color: C.teal, textTransform: "uppercase",
          marginBottom: 14,
        }}>
          Real Story
        </p>
        <h2 style={{
          fontSize: 28, fontWeight: 700, color: C.navy,
          letterSpacing: "-0.02em", marginBottom: 6,
        }}>
          실제 멘티들의 후기
        </h2>
        <p style={{ fontSize: 13, color: C.textMuted, marginBottom: 36 }}>
          A little line about what's being said and who's saying it.
        </p>

        {/* 후기 카드 리스트 — 세로 스택 */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {[
            {
              initials: "박J", bg: "#533BA0", name: "Sally Spiracle", role: "Nest Founder", stars: 5,
              text: "When we began building this colony, I was skeptical about how we could make sure the right bugs would find us to join in. Namedly's integrated solution exceeded all my expectations.",
            },
            {
              initials: "최C", bg: "#8B4513", name: "Carl Caterpillar", role: "Head of Growth", stars: 5,
              text: "I've been transformed completely. I wouldn't use any other service.",
            },
            {
              initials: "소S", bg: "#145A32", name: "Sophia Segment", role: "CIO", stars: 4,
              text: "As Chief Insect Officer, it's my job to make sure all bugs feel represented, and Namedly exceeded all my expectations.",
            },
          ].map((r, i) => (
            <div key={i} style={{
              background: C.white,
              borderRadius: 14,
              padding: "18px 20px",
              border: `1px solid ${C.creamDark}`,
            }}>
              {/* 별점 */}
              <div style={{ display: "flex", gap: 2, marginBottom: 10 }}>
                {"★★★★★".split("").map((s, j) => (
                  <span key={j} style={{ fontSize: 13, color: j < r.stars ? "#F59E0B" : "#D1CFC9" }}>★</span>
                ))}
              </div>
              {/* 본문 */}
              <p style={{
                fontSize: 13, color: C.text, lineHeight: 1.75,
                marginBottom: 16, wordBreak: "keep-all",
              }}>
                {r.text}
              </p>
              {/* 작성자 */}
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{
                  width: 34, height: 34, borderRadius: "50%",
                  background: r.bg, flexShrink: 0,
                  display: "flex", alignItems: "center",
                  justifyContent: "center", fontSize: 11,
                  fontWeight: 700, color: C.white,
                }}>
                  {r.initials}
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: C.navy }}>{r.name}</div>
                  <div style={{ fontSize: 11, color: C.textMuted }}>{r.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── 오른쪽: 막막한 당신에게 CTA ── */}
      <div className="fade-up" style={{ display: "flex", flexDirection: "column" }}>
        <p style={{
          fontSize: 12, fontWeight: 600, letterSpacing: "0.18em",
          color: C.teal, textTransform: "uppercase",
          marginBottom: 14,
        }}>
          Start now
        </p>
        <h2 style={{
          fontSize: 28, fontWeight: 700, color: C.navy,
          lineHeight: 1.35, letterSpacing: "-0.02em",
          marginBottom: 12,
        }}>
          막막한 당신에게
          <br />
          이제 '전략'으로 승부하세요
        </h2>
        <p style={{ fontSize: 14, color: C.textSub, lineHeight: 1.7, marginBottom: 32 }}>
          Go ahead and say just a little more about what you do.
        </p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 40 }}>
          <a href="/auth/register" style={{
            background: C.navy, color: C.white,
            fontFamily: "inherit", fontSize: 14, fontWeight: 700,
            padding: "12px 28px", borderRadius: 999,
            textDecoration: "none",
            transition: "transform 0.2s, background 0.2s",
          }}
            onMouseEnter={e => { e.currentTarget.style.background = C.navyMid; e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = C.navy; e.currentTarget.style.transform = "translateY(0)"; }}
          >
            면접 참여하러 가기
          </a>
          <a href="/mentor/search" style={{
            background: "transparent", color: C.navy,
            fontFamily: "inherit", fontSize: 14, fontWeight: 400,
            padding: "12px 28px", borderRadius: 999,
            border: `1.5px solid rgba(13,34,68,0.3)`,
            textDecoration: "none",
            transition: "border-color 0.2s",
          }}
            onMouseEnter={e => e.currentTarget.style.borderColor = C.navy}
            onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(13,34,68,0.3)"}
          >
            멘토 탐색하기
          </a>
        </div>

        {/* 컬러 카드 2개 — 2열 그리드, overflow 차단 */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 14,
          /* 이 그리드가 부모를 넘치지 않도록 */
          minWidth: 0,
        }}>
          {[
            {
              bg: "#F9C6C6",
              text: "혼자 하는 면접 연습, 계속 같은 실수를 반복하고 있는 건 아닌가요?",
            },
            {
              bg: "#C8E6C9",
              text: "데이터 위에 현직자의 경험을 입혀드립니다.",
            },
          ].map((card, i) => (
            <div key={i} style={{
              background: card.bg,
              borderRadius: 16,
              padding: "24px 20px",
              /* 고정 높이 대신 자연 높이 사용 */
              minHeight: 140,
              display: "flex",
              alignItems: "flex-end",
              /* 박스가 절대 그리드 셀 바깥으로 안 나가도록 */
              minWidth: 0,
              overflow: "hidden",
            }}>
              <p style={{
                fontSize: 13, color: C.navy, fontWeight: 500,
                lineHeight: 1.65, wordBreak: "keep-all",
              }}>
                {card.text}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>

    {/* ── 반응형 스타일 (좁은 화면에서 1열로) ── */}
    <style>{`
      @media (max-width: 768px) {
        .reviews-cta-grid {
          grid-template-columns: 1fr !important;
        }
      }
    `}</style>
  </section>
);



/* ── 푸터 ── */
const Footer = () => (
  <footer style={{
    background: "#080F1D",
    padding: "20px 5%",
    borderTop: `1px solid rgba(255,255,255,0.06)`,
  }}>
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      flexWrap: "wrap", gap: 16,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <LogoIcon size={22} color="rgba(255,255,255,0.5)" />
        <span style={{ fontSize: 15, fontWeight: 700, color: "rgba(255,255,255,0.5)" }}>SceneA</span>
      </div>
      <p style={{ fontSize: 12, color: "rgba(255,255,255,0.25)" }}>
        © 2026 SceneA. Capstone Design Project.
      </p>
    </div>
  </footer>
);

/* ── 스크롤 애니메이션 훅 ── */
const useScrollFadeUp = () => {
  useEffect(() => {
    const elements = document.querySelectorAll(".fade-up");
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      }),
      { threshold: 0.12 }
    );
    elements.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
};

/* ── 메인 컴포넌트 ── */
export default function Home() {
  useScrollFadeUp();

  return (
    <>
      <GlobalStyle />
      <Header />
      <main style={{ paddingTop: 68 }}>
        <Hero />
        <FeaturesSection />
        <MentorsSection />
        <ReviewsAndCTA />
      </main>
      <Footer />
    </>
  );
}

