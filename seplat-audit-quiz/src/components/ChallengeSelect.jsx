import { Lock, LockOpen, CheckCircle2 } from "lucide-react";

export default function ChallengeSelect({ quizData, answered, onSelect }) {
  const answeredIdxs = answered.map(a => a.question);
  const nextIdx = answeredIdxs.length;

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">

      <h1 className="text-xl font-black text-slate-900 mb-1">Start The Challenge!</h1>
      <p className="text-xs text-slate-500 mb-4">
        Find all anomalies as fast as possible!
      </p>

      <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-600 text-[10px] font-bold tracking-widest uppercase px-4 py-2 rounded-full mb-6">
        ⏱ Timer starts on your first click!
      </div>

      <div className="grid grid-cols-5 gap-3 mb-6">
        {quizData.map((q, idx) => {
          const isDone = answeredIdxs.includes(idx);
          const isNext = idx === nextIdx;
          const isLocked = !isDone && !isNext;

          return (
            <div
              key={idx}
              onClick={() => isNext && onSelect(idx)}
              className={`
                bg-white rounded-xl border-2 p-4 text-center transition-all duration-200
                ${isDone ? "border-green-300 bg-green-50 cursor-default" : ""}
                ${isNext ? "border-green-500 bg-white cursor-pointer hover:shadow-md hover:-translate-y-0.5" : ""}
                ${isLocked ? "border-slate-200 bg-slate-50 cursor-not-allowed opacity-60" : ""}
              `}
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3">
                {isDone ? (
                  <CheckCircle2 size={26} className="text-green-500" strokeWidth={2} />
                ) : isNext ? (
                  <LockOpen size={24} className="text-green-600" strokeWidth={2} />
                ) : (
                  <Lock size={24} className="text-slate-400" strokeWidth={2} />
                )}
              </div>
              <div className="text-xs font-bold text-slate-800 mb-1">
                Question {idx + 1}
              </div>
              <div className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                {q.topic || "Audit Scenario"}
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-start gap-3">
        <span className="text-base">ℹ️</span>
        <p className="text-xs text-slate-600">
          <strong>Quick Tip:</strong> Audit findings aren't always big errors, sometimes they're just tiny inconsistencies!
        </p>
      </div>

    </div>
  );
}