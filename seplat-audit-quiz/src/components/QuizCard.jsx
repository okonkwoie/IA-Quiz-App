import { useState, useMemo } from "react";
import { Search, CheckCircle2 } from "lucide-react";

export default function QuizCard({ question, questionNumber, total, onAnswer }) {
  const [selected, setSelected] = useState(null);
  const [confirming, setConfirming] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [matches, setMatches] = useState({});

  const shuffledAnomalies = useMemo(() => {
    return [...(question.anomalies || [])].sort(() => Math.random() - 0.5);
  }, [question]);

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

  const handleTransactionClick = (tid) => {
    if (matches[tid]) {
      const newMatches = { ...matches };
      delete newMatches[tid];
      setMatches(newMatches);
      setSelectedTransaction(null);
      return;
    }
    setSelectedTransaction(tid === selectedTransaction ? null : tid);
  };

  const handleAnomalyClick = (aid) => {
    const existingTid = Object.keys(matches).find(t => matches[t] === aid);
    if (existingTid) {
      const newMatches = { ...matches };
      delete newMatches[existingTid];
      setMatches(newMatches);
      return;
    }
    if (!selectedTransaction) return;
    setMatches(prev => ({ ...prev, [selectedTransaction]: aid }));
    setSelectedTransaction(null);
  };

  const handleSubmitMatches = () => {
    setConfirming(true);
  };

  const handleConfirmMatch = () => {
    setConfirming(false);
    const correct = question.anomalies.filter(
      a => matches[a.correctFor] === a.id
    ).length;
    setTimeout(() => onAnswer(correct === question.anomalies.length ? 1 : 0), 300);
  };

  const allMatched = Object.keys(matches).length === (question.transactions?.length || 0);

  const getRightSide = () => {
    const usedAids = Object.values(matches);
    const unmatchedPool = shuffledAnomalies.filter(a => !usedAids.includes(a.id));
    let poolIdx = 0;
    return question.transactions.map(t => {
      const matchedAid = matches[t.id];
      if (matchedAid) {
        return { anomaly: question.anomalies.find(a => a.id === matchedAid), isPaired: true };
      } else {
        const next = unmatchedPool[poolIdx++] || null;
        return { anomaly: next, isPaired: false };
      }
    });
  };

  // ── MATCH TYPE ──
  if (question.type === "match") {
    const rightSide = getRightSide();

    return (
      <div className="max-w-3xl mx-auto px-6 py-8">

        <div className="flex items-center gap-3 mb-6">
          <div>
            <h2 className="text-lg font-black text-slate-900">Question {questionNumber}</h2>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">
              {question.topic}
            </p>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 mb-6">
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-green-600 mb-3">
            <Search size={13} strokeWidth={2.5} />
            Match the Anomaly
          </div>
          <p className="text-sm text-slate-600 leading-relaxed">
            {question.question} Click a transaction, then click its matching anomaly. Click a paired item to undo.
          </p>
        </div>

        <div className="grid grid-cols-[1fr_32px_1fr] gap-2 mb-2 px-1">
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Transactions</p>
          <div />
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Anomaly Bank</p>
        </div>

        <div className="flex flex-col gap-3">
          {question.transactions.map((t, idx) => {
            const isPairedT = !!matches[t.id];
            const isSelectedT = selectedTransaction === t.id;
            const { anomaly, isPaired: isPairedA } = rightSide[idx];

            return (
              <div key={t.id} className="grid grid-cols-[1fr_32px_1fr] items-center gap-2">

                <div
                  onClick={() => handleTransactionClick(t.id)}
                  className={`
                    rounded-xl border-2 p-3 text-xs leading-relaxed transition-all duration-200 cursor-pointer
                    ${isSelectedT ? "border-green-500 shadow-md bg-slate-50"
                      : isPairedT ? "border-slate-400 bg-slate-50"
                      : "border-slate-200 bg-white hover:border-slate-400"}
                  `}
                >
                  {t.text}
                </div>

                <div className="flex items-center justify-center w-full">
                  <div className="w-full" style={{ borderTop: isPairedT ? "2px dashed #94a3b8" : "2px dashed #e2e8f0" }} />
                </div>

                {anomaly ? (
                  <div
                    onClick={() => handleAnomalyClick(anomaly.id)}
                    className={`
                      rounded-xl border-2 p-3 text-xs leading-relaxed transition-all duration-200 cursor-pointer
                      ${isPairedA ? "border-slate-400 bg-slate-50"
                        : selectedTransaction ? "border-slate-200 bg-white hover:border-slate-400 hover:bg-slate-50"
                        : "border-slate-200 bg-white opacity-50 cursor-default"}
                    `}
                  >
                    {anomaly.text}
                  </div>
                ) : (
                  <div className="rounded-xl border-2 border-dashed border-slate-100 p-3 text-xs text-slate-200 text-center">—</div>
                )}

              </div>
            );
          })}
        </div>

        {selectedTransaction && (
          <p className="mt-4 text-center text-xs text-green-600 font-semibold animate-pulse">
            Now click the matching anomaly →
          </p>
        )}

        {allMatched && (
          <div className="mt-6 flex justify-center">
            <button
              onClick={handleSubmitMatches}
              className="bg-green-600 hover:bg-green-700 text-white font-bold text-sm tracking-widest uppercase px-10 py-3 rounded-xl transition-all cursor-pointer"
              style={{ boxShadow: "0 0 16px rgba(22,163,74,0.4)" }}
            >
              Submit Matches
            </button>
          </div>
        )}

        {confirming && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
            <div className="bg-white rounded-2xl shadow-xl p-8 max-w-sm w-full text-center">
              <div className="w-14 h-14 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 size={28} className="text-amber-500" strokeWidth={1.5} />
              </div>
              <h3 className="text-base font-black text-slate-900 mb-2">Confirm Matches</h3>
              <p className="text-xs text-slate-400 mb-6">
                Are you sure about your matches? You cannot change them after confirming.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setConfirming(false)}
                  className="flex-1 border-2 border-slate-200 text-slate-600 font-bold text-xs uppercase tracking-widest py-3 rounded-xl hover:border-slate-300 transition-all cursor-pointer"
                >
                  Go Back
                </button>
                <button
                  onClick={handleConfirmMatch}
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

  // ── MCQ TYPE ──
  return (
    <div className="max-w-3xl mx-auto px-6 py-8">

      <div className="flex items-center gap-3 mb-6">
        <div>
          <h2 className="text-lg font-black text-slate-900">Question {questionNumber}</h2>
          <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">
            {question.topic || "Audit Scenario"}
          </p>
        </div>
      </div>

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

      {confirming && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-sm w-full text-center">
            <div className="w-14 h-14 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 size={28} className="text-amber-500" strokeWidth={1.5} />
            </div>
            <h3 className="text-base font-black text-slate-900 mb-2">Confirm Answer</h3>
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