import { Trophy } from "lucide-react";

export default function DoneScreen({ name, elapsed, formatTime }) {
  const handleExit = () => {
    window.location.reload();
  };

  return (
    <div className="h-[calc(100vh-56px)] bg-slate-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-md px-10 py-8 w-full max-w-sm text-center flex flex-col items-center gap-3">

        <div className="w-14 h-14 bg-amber-50 rounded-full flex items-center justify-center">
          <Trophy size={28} className="text-amber-500" strokeWidth={1.5} />
        </div>

        <h1 className="text-2xl font-black text-green-600 leading-tight">
          Congratulations!
        </h1>

        <p className="text-sm font-semibold text-slate-700">
          {name.split(" ")[0]}, your answers have been recorded.
        </p>

        {elapsed > 0 && (
          <div className="bg-slate-50 border border-slate-200 rounded-xl px-6 py-3 w-full">
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Your Time</p>
            <p className="text-2xl font-black text-slate-900 tabular-nums">{formatTime(elapsed)}</p>
          </div>
        )}

        <p className="text-xs text-slate-500 leading-relaxed">
          Scores are being tallied by the Internal Audit team.
          Top performers will be announced at the end of Audit Week. Good luck!
        </p>

        <div className="w-full h-px bg-slate-100" />

        <img
          src="/seplat-logo.png"
          alt="Seplat Energy"
          className="h-9 object-contain"
        />

        <p className="text-xs text-slate-400 leading-relaxed">
          Thank you for participating in<br />
          <strong className="text-slate-500">Seplat Energy Internal Audit Week 2026</strong>
        </p>

        <button
          onClick={handleExit}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold text-xs uppercase tracking-widest py-3 rounded-xl transition-all cursor-pointer mt-2"
        >
          Exit Quiz
        </button>

      </div>
    </div>
  );
}