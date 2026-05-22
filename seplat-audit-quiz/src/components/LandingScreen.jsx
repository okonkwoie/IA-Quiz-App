export default function LandingScreen({ onReady }) {
  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
      style={{
        backgroundImage: "url('/screensaver-one.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}
    >
      <div className="absolute inset-0 bg-white/20 backdrop-blur-[4px]" />

      <div className="relative z-10 bg-white/90 backdrop-blur-sm rounded-2xl shadow-md p-10 w-full max-w-sm text-center flex flex-col items-center gap-4">

        <img
          src="/seplat-logo.png"
          alt="Seplat Energy"
          className="h-16 object-contain"
        />

        <h1 className="text-2xl font-black text-slate-900 tracking-tight leading-tight">
          THINK LIKE A NEW{" "}
          <span
            className="text-green-600 inline-block"
            style={{ animation: "heartbeat 1.6s ease-in-out infinite" }}
          >
            AUDITOR
          </span>
        </h1>

        <p className="text-xs text-slate-500">
          Can you can spot what others miss? 🤔
        </p>

        <button
          onClick={onReady}
          className="mt-3 w-4/5 bg-green-600 hover:bg-green-700 text-white font-bold text-sm tracking-widest uppercase py-3 rounded-xl transition-all duration-200 cursor-pointer"
          style={{ boxShadow: "0 0 16px rgba(22,163,74,0.4), 0 4px 12px rgba(22,163,74,0.2)" }}
        >
          I'M READY
        </button>

        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span className="text-amber-500">🏆</span>
          Amazing Prizes to be Won!
        </div>

        <p className="text-[10px] text-slate-300 uppercase tracking-widest">
          © 2026 Internal Audit Department
        </p>

      </div>
    </div>
  );
}