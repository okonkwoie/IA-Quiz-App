import { useState } from "react";
import { Search, CheckCircle2, XCircle } from "lucide-react";

export default function QuizCard({ question, questionNumber, total, onAnswer }) {
  const [selected, setSelected] = useState(null);
  const [confirming, setConfirming] = useState(false);

  const handleSelect = (idx) => {
    if (selected !== null) return;
    setSelected(idx);
    setConfirming(true);
  };

  const handleConfirm = () => {
    setConfirming(false);
    setTimeout(() => onAnswer(selected), 300);
  };

  const handleCancel = () => {
    setSelected(null);
    setConfirming(false);
  };

  const difficulty = questionNumber <= 3 ? "EASY" : questionNumber <= 7 ? "MEDIUM" : "HARD";
  const diffColor = questionNumber <= 3
    ? "bg-green-100 text-green-700"
    : questionNumber <= 7
    ? "bg-amber-100 text-amber-700"
    : "bg-red-100 text-red-600";

  return (
    <div className="max-w-3xl mx-auto px-6 py-8">

      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div>
          <h2 className="text-lg font-black text-slate-900">Question {questionNumber}</h2>
          <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">
            {question.topic || "Audit Scenario"}
          </p>
        </div>
        <span className={`ml-auto text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full ${diffColor}`}>
          {difficulty}
        </span>
      </div>

      {/* Scenario context */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 mb-4">
        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-green-600 mb-3">
          <Search size={13} strokeWidth={2.5} />
          Investigation Context
        </div>
        <p className="text-sm text-slate-600 leading-relaxed">
          {question.scenario}
        </p>
        {question.hint && (
          <p className="text-xs text-slate-400 mt-3">
            <strong className="text-slate-500">Audit Hint:</strong> {question.hint}
          </p>
        )}
      </div>

      {/* Question + options */}
      <div className="bg-white border border-slate-200 rounded-xl p-5">
        <p className="text-sm font-bold text-slate-900 mb-4 leading-relaxed">
          {question.question}
        </p>

        <div className="flex flex-col gap-3">
          {question.options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              disabled={selected !== null}
              className={`
                flex items-center gap-3 w-full text-left border-2 rounded-xl px-4 py-3
                transition-all duration-150
                ${selected === idx
                  ? "border-green-500 bg-green-50"
                  : "border-slate-200 bg-white hover:border-green-400 hover:bg-green-50 hover:translate-x-1 cursor-pointer"
                }
                disabled:cursor-default
              `}
            >
              <span className={`
                w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 border
                ${selected === idx
                  ? "bg-green-600 text-white border-green-600"
                  : "bg-slate-100 text-slate-500 border-slate-200"
                }
              `}>
                {String.fromCharCode(65 + idx)}
              </span>
              <span className="text-sm text-slate-700">{opt}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Confirmation modal */}
      {confirming && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-sm w-full text-center">
            <div className="w-14 h-14 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 size={28} className="text-amber-500" strokeWidth={1.5} />
            </div>
            <h3 className="text-base font-black text-slate-900 mb-2">Confirm Answer</h3>
            <p className="text-xs text-slate-500 mb-1">You selected:</p>
            <p className="text-sm font-semibold text-slate-800 mb-6 px-2">
              "{question.options[selected]}"
            </p>
            <p className="text-xs text-slate-400 mb-6">
              Are you sure? You cannot change your answer after confirming.
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleCancel}
                className="flex-1 border-2 border-slate-200 text-slate-600 font-bold text-xs uppercase tracking-widest py-3 rounded-xl hover:border-slate-300 transition-all cursor-pointer"
              >
                Go Back
              </button>
              <button
                onClick={handleConfirm}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold text-xs uppercase tracking-widest py-3 rounded-xl transition-all cursor-pointer"
                style={{ boxShadow: "0 0 12px rgba(22,163,74,0.3)" }}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}