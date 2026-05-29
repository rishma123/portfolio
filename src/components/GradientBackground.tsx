export function GradientBackground() {
  return (
    <div className="fixed inset-0 -z-20 pointer-events-none overflow-hidden" aria-hidden>
      {/* Orb 1 — large teal, top-right, primary atmosphere */}
      <div
        className="absolute rounded-full"
        style={{
          width: "800px",
          height: "800px",
          top: "-250px",
          right: "-220px",
          background: "radial-gradient(circle, hsl(173 65% 42% / 0.12) 0%, transparent 68%)",
          filter: "blur(72px)",
          animation: "orb1 22s ease-in-out infinite alternate",
        }}
      />
      {/* Orb 2 — blue-teal, bottom-left */}
      <div
        className="absolute rounded-full"
        style={{
          width: "700px",
          height: "700px",
          bottom: "5%",
          left: "-200px",
          background: "radial-gradient(circle, hsl(210 70% 50% / 0.08) 0%, transparent 70%)",
          filter: "blur(80px)",
          animation: "orb2 28s ease-in-out infinite alternate",
        }}
      />
      {/* Orb 3 — deep purple, mid-right, depth accent */}
      <div
        className="absolute rounded-full"
        style={{
          width: "500px",
          height: "500px",
          top: "35%",
          right: "15%",
          background: "radial-gradient(circle, hsl(280 55% 45% / 0.06) 0%, transparent 70%)",
          filter: "blur(90px)",
          animation: "orb3 34s ease-in-out infinite alternate",
        }}
      />
      {/* Orb 4 — subtle warm teal, lower center */}
      <div
        className="absolute rounded-full"
        style={{
          width: "450px",
          height: "450px",
          bottom: "30%",
          left: "35%",
          background: "radial-gradient(circle, hsl(173 45% 30% / 0.055) 0%, transparent 70%)",
          filter: "blur(100px)",
          animation: "orb4 40s ease-in-out infinite alternate-reverse",
        }}
      />
      {/* Orb 5 — cinematic blue, top-left counter-balance */}
      <div
        className="absolute rounded-full"
        style={{
          width: "600px",
          height: "600px",
          top: "10%",
          left: "-100px",
          background: "radial-gradient(circle, hsl(215 65% 45% / 0.05) 0%, transparent 70%)",
          filter: "blur(85px)",
          animation: "orb5 30s ease-in-out infinite alternate-reverse",
        }}
      />

      {/* Horizontal light streak — cinematic depth line */}
      <div
        className="absolute"
        style={{
          width: "70%",
          height: "1px",
          top: "28%",
          left: "15%",
          background: "linear-gradient(90deg, transparent 0%, hsl(173 65% 42% / 0.07) 40%, hsl(173 65% 42% / 0.04) 60%, transparent 100%)",
          filter: "blur(2px)",
          animation: "streak 18s ease-in-out infinite alternate",
        }}
      />

      {/* Noise grain overlay */}
      <div
        className="absolute inset-0 opacity-[0.028]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "200px 200px",
        }}
      />

      {/* Edge vignette */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 90% 90% at 50% 50%, transparent 60%, hsl(220 16% 4% / 0.55) 100%)",
        }}
      />

      <style>{`
        @keyframes orb1 {
          0%   { transform: translate(0px, 0px) scale(1); }
          40%  { transform: translate(-50px, 70px) scale(1.07); }
          100% { transform: translate(35px, -55px) scale(0.94); }
        }
        @keyframes orb2 {
          0%   { transform: translate(0px, 0px) scale(1); }
          50%  { transform: translate(60px, -45px) scale(1.09); }
          100% { transform: translate(-40px, 55px) scale(0.93); }
        }
        @keyframes orb3 {
          0%   { transform: translate(0px, 0px) scale(1); }
          60%  { transform: translate(-70px, 40px) scale(1.06); }
          100% { transform: translate(50px, -50px) scale(0.96); }
        }
        @keyframes orb4 {
          0%   { transform: translate(0px, 0px) scale(1); }
          45%  { transform: translate(45px, -35px) scale(1.08); }
          100% { transform: translate(-55px, 45px) scale(0.95); }
        }
        @keyframes orb5 {
          0%   { transform: translate(0px, 0px) scale(1); }
          55%  { transform: translate(40px, 60px) scale(1.05); }
          100% { transform: translate(-30px, -40px) scale(0.97); }
        }
        @keyframes streak {
          0%   { opacity: 0.6; transform: scaleX(0.8) translateX(-4%); }
          50%  { opacity: 1; }
          100% { opacity: 0.4; transform: scaleX(1.1) translateX(4%); }
        }
      `}</style>
    </div>
  );
}
