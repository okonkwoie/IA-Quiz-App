import { useState, useMemo } from "react";
import { Search, CheckCircle2 } from "lucide-react";

export default function QuizCard({ question, questionNumber, total, onAnswer }) {
  const [selected, setSelected] = useState(null);
  const [confirming, setConfirming] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [matches, setMatches] = useState({});
  const [assignments, setAssignments] = useState({});
  const [draggedCard, setDraggedCard] = useState(null);
  const [spotlightChoice, setSpotlightChoice] = useState(null);
  const [sequenceItems, setSequenceItems] = useState(
    question.type === "sequence"
      ? [...(question.items || [])].sort(() => Math.random() - 0.5)
      : []
  );
  const [draggedSeqId, setDraggedSeqId] = useState(null);
  const [dragPos, setDragPos] = useState({ x: 0, y: 0 });

  const shuffledAnomalies = useMemo(() => {
    const arr = [...(question.anomalies || [])];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }, []);

  const shuffledCards = useMemo(() => {
    const arr = [...(question.cards || [])];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }, []);

  // MCQ handlers
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

  // Match handlers
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
    const newMatches = { ...matches, [selectedTransaction]: aid };
    setMatches(newMatches);
    setSelectedTransaction(null);
    if (Object.keys(newMatches).length === question.transactions.length) {
      setTimeout(() => setConfirming(true), 400);
    }
  };

  const handleConfirmMatch = () => {
    setConfirming(false);
    const correct = question.anomalies.filter(
      a => matches[a.correctFor] === a.id
    ).length;
    setTimeout(() => onAnswer(correct === question.anomalies.length ? 1 : 0), 300);
  };

  const handleGoBackMatch = () => {
    const tids = Object.keys(matches);
    if (tids.length > 0) {
      const lastTid = tids[tids.length - 1];
      const newMatches = { ...matches };
      delete newMatches[lastTid];
      setMatches(newMatches);
    }
    setConfirming(false);
  };

  // Drag handlers
  const handleDragStart = (cardId) => setDraggedCard(cardId);

  const handleDrop = (catId) => {
    if (!draggedCard) return;
    const newAssignments = { ...assignments, [draggedCard]: catId };
    setAssignments(newAssignments);
    setDraggedCard(null);
    if (Object.keys(newAssignments).length === question.cards.length) {
      setTimeout(() => setConfirming(true), 400);
    }
  };

  const handleDragOver = (e) => e.preventDefault();

  const removeFromCategory = (cardId) => {
    const newAssignments = { ...assignments };
    delete newAssignments[cardId];
    setAssignments(newAssignments);
  };

  const handleConfirmDrag = () => {
    setConfirming(false);
    const correct = question.cards.filter(
      c => assignments[c.id] === c.correctCategory
    ).length;
    setTimeout(() => onAnswer(correct === question.cards.length ? 1 : 0), 300);
  };

  // Sequence handlers
  const handleSeqDragStart = (id, e) => {
    setDraggedSeqId(id);
    setDragPos({ x: e.clientX, y: e.clientY });
    const ghost = document.createElement("div");
    ghost.style.opacity = "0";
    ghost.style.position = "fixed";
    ghost.style.top = "-9999px";
    document.body.appendChild(ghost);
    e.dataTransfer.setDragImage(ghost, 0, 0);
    setTimeout(() => document.body.removeChild(ghost), 0);
  };

  const handleSeqDrag = (e) => {
    if (e.clientX === 0 && e.clientY === 0) return;
    setDragPos({ x: e.clientX, y: e.clientY });
  };

  const handleSeqDragOver = (e, overIdx) => {
    e.preventDefault();
    if (draggedSeqId === null) return;
    const fromIdx = sequenceItems.findIndex(i => i.id === draggedSeqId);
    if (fromIdx === overIdx) return;
    const updated = [...sequenceItems];
    const [moved] = updated.splice(fromIdx, 1);
    updated.splice(overIdx, 0, moved);
    setSequenceItems(updated);
  };

  const handleSeqDragEnd = () => setDraggedSeqId(null);

  const handleConfirmSequence = () => {
    setConfirming(false);
    const isCorrect = sequenceItems.every((item, idx) => item.order === idx + 1);
    setTimeout(() => onAnswer(isCorrect ? 1 : 0), 300);
  };

  const getRightSide = () => {
    const usedAids = Object.values(matches);
    const unmatchedPool = shuffledAnomalies.filter(a => !usedAids.includes(a.id));
    let poolIdx = 0;
    return question.transactions.map(t => {
      const matchedAid = matches[t.id];
      if (matchedAid) {
        return { anomaly: question.anomalies.find(a => a.id === matchedAid), isPaired: true };
      }
      return { anomaly: unmatchedPool[poolIdx++] || null, isPaired: false };
    });
  };

  // ── SEQUENCE TYPE ──
  if (question.type === "sequence") {
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
            Arrange the Sequence
          </div>
          <p className="text-sm text-slate-600 leading-relaxed">
            {question.question}
          </p>
        </div>

        <div className="flex flex-col gap-3 mb-6">
          {sequenceItems.map((item, idx) => (
            <div
              key={item.id}
              draggable
              onDragStart={(e) => handleSeqDragStart(item.id, e)}
              onDrag={(e) => handleSeqDrag(e)}
              onDragOver={(e) => handleSeqDragOver(e, idx)}
              onDragEnd={handleSeqDragEnd}
              className={`
                flex items-center gap-4 bg-white border-2 rounded-xl px-4 py-3 cursor-grab active:cursor-grabbing transition-all duration-150 select-none
                ${draggedSeqId === item.id
                  ? "border-green-400 shadow-lg ring-2 ring-green-300 bg-green-50 opacity-50"
                  : "border-slate-200 hover:border-slate-400"
                }
              `}
            >
              <div className="w-7 h-7 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-xs font-bold text-slate-500 flex-shrink-0">
                {idx + 1}
              </div>
              <span className="text-xs text-slate-700 leading-relaxed">{item.text}</span>
              <div className="ml-auto flex flex-col gap-1 opacity-70 flex-shrink-0">
                <div className="w-4 h-0.5 bg-slate-600 rounded" />
                <div className="w-4 h-0.5 bg-slate-600 rounded" />
                <div className="w-4 h-0.5 bg-slate-600 rounded" />
              </div>
            </div>
          ))}
        </div>

        {draggedSeqId && (
          <div
            className="fixed pointer-events-none z-50 bg-white border-2 border-green-400 rounded-xl px-4 py-3 shadow-xl text-xs text-slate-700 max-w-sm ring-2 ring-green-300"
            style={{
              left: dragPos.x + 12,
              top: dragPos.y - 20,
              transform: "rotate(1.5deg)"
            }}
          >
            {sequenceItems.find(i => i.id === draggedSeqId)?.text}
          </div>
        )}

        <div className="flex justify-center">
          <button
            onClick={() => setConfirming(true)}
            className="bg-green-600 hover:bg-green-700 text-white font-bold text-sm tracking-widest uppercase px-10 py-3 rounded-xl transition-all cursor-pointer"
            style={{ boxShadow: "0 0 16px rgba(22,163,74,0.4)" }}
          >
            Submit Order
          </button>
        </div>

        {confirming && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
            <div className="bg-white rounded-2xl shadow-xl p-8 max-w-sm w-full text-center">
              <div className="w-14 h-14 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 size={28} className="text-amber-500" strokeWidth={1.5} />
              </div>
              <h3 className="text-base font-black text-slate-900 mb-2">Confirm Order</h3>
              <p className="text-xs text-slate-400 mb-6">
                Are you happy with your sequence? You cannot change it after confirming.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setConfirming(false)}
                  className="flex-1 border-2 border-slate-200 text-slate-600 font-bold text-xs uppercase tracking-widest py-3 rounded-xl hover:border-slate-300 transition-all cursor-pointer"
                >
                  Go Back
                </button>
                <button
                  onClick={handleConfirmSequence}
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

  // ── SPOTLIGHT TYPE ──
  if (question.type === "spotlight") {
    return (
      <div className="max-w-5xl mx-auto px-6 py-8">

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
            Document Review
          </div>
          <p className="text-sm text-slate-600 leading-relaxed">
            {question.question}
          </p>
        </div>

        <div className="grid grid-cols-[1fr_2fr] gap-4 mb-6">

          {/* Staff list first */}
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
            <div className="bg-slate-50 border-b border-slate-200 px-4 py-2">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                {question.staffList.title}
              </p>
            </div>
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-slate-100">
                  {question.staffList.headers.map((h, i) => (
                    <th key={i} className="text-left px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {question.staffList.rows.map((row, ridx) => (
                  <tr key={ridx} className="border-b border-slate-50">
                    {row.map((cell, cidx) => (
                      <td key={cidx} className="px-3 py-2 text-slate-600">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Image second and bigger */}
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
            <div className="bg-slate-50 border-b border-slate-200 px-4 py-2">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                123 Limited User Access Log — May 2026
              </p>
            </div>
            <div className="relative w-full">
              <img
                src={question.image}
                alt="User Access Log"
                className="w-full object-contain"
              />
              {question.hotspots.map(spot => (
                <div
                  key={spot.id}
                  onClick={() => {
                    if (spotlightChoice) return;
                    setSpotlightChoice(spot.id);
                    setConfirming(true);
                  }}
                  className={`
                    absolute left-[18%] right-0 h-[10%] cursor-pointer transition-all duration-150
                    ${spotlightChoice === spot.id
                      ? "bg-green-400/20 border-l-4 border-green-500"
                      : "hover:bg-blue-400/10 hover:border-l-4 hover:border-blue-400"
                    }
                  `}
                  style={{ top: spot.top }}
                />
              ))}
            </div>
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
                  onClick={() => { setConfirming(false); setSpotlightChoice(null); }}
                  className="flex-1 border-2 border-slate-200 text-slate-600 font-bold text-xs uppercase tracking-widest py-3 rounded-xl hover:border-slate-300 transition-all cursor-pointer"
                >
                  Go Back
                </button>
                <button
                  onClick={() => {
                    setConfirming(false);
                    setTimeout(() => onAnswer(spotlightChoice === question.correct ? 1 : 0), 300);
                  }}
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

  // ── DRAG TYPE ──
  if (question.type === "drag") {
    const unassigned = shuffledCards.filter(c => !assignments[c.id]);

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
            Sort the Controls
          </div>
          <p className="text-sm text-slate-600 leading-relaxed">
            {question.question} Drag each card into the correct box. Click a placed card to remove it.
          </p>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-6 min-h-[80px]">
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">
            Controls Bank
          </p>
          {unassigned.length === 0 ? (
            <p className="text-xs text-slate-300 text-center py-2">All cards assigned</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {unassigned.map(card => (
                <div
                  key={card.id}
                  draggable
                  onDragStart={() => handleDragStart(card.id)}
                  className="bg-white border-2 border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-700 cursor-grab active:cursor-grabbing hover:border-green-400 hover:shadow-sm transition-all select-none"
                >
                  {card.text}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          {question.categories.map(cat => {
            const assignedCards = question.cards.filter(c => assignments[c.id] === cat.id);
            return (
              <div
                key={cat.id}
                onDrop={() => handleDrop(cat.id)}
                onDragOver={handleDragOver}
                className="border-2 border-dashed border-slate-300 rounded-xl p-4 min-h-[180px] transition-all"
              >
                <p className="text-xs font-black uppercase tracking-widest text-slate-600 mb-3 text-center">
                  {cat.label}
                </p>
                <div className="flex flex-col gap-2">
                  {assignedCards.length === 0 ? (
                    <p className="text-[10px] text-slate-300 text-center mt-4">Drop cards here</p>
                  ) : (
                    assignedCards.map(card => (
                      <div
                        key={card.id}
                        onClick={() => removeFromCategory(card.id)}
                        className="bg-slate-50 border-2 border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-600 cursor-pointer hover:border-slate-400 hover:bg-slate-100 transition-all select-none"
                        title="Click to remove"
                      >
                        {card.text}
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {confirming && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
            <div className="bg-white rounded-2xl shadow-xl p-8 max-w-sm w-full text-center">
              <div className="w-14 h-14 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 size={28} className="text-amber-500" strokeWidth={1.5} />
              </div>
              <h3 className="text-base font-black text-slate-900 mb-2">Confirm Selection</h3>
              <p className="text-xs text-slate-400 mb-6">
                Are you sure about your selections? You cannot change them after confirming.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setConfirming(false)}
                  className="flex-1 border-2 border-slate-200 text-slate-600 font-bold text-xs uppercase tracking-widest py-3 rounded-xl hover:border-slate-300 transition-all cursor-pointer"
                >
                  Go Back
                </button>
                <button
                  onClick={handleConfirmDrag}
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
                  onClick={handleGoBackMatch}
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