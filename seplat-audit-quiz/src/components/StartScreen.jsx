import { useState } from "react";

export default function StartScreen({ onStart }) {
  const [name, setName] = useState("");
  const [dept, setDept] = useState("");
  const [error, setError] = useState("");

  const handleStart = () => {
    if (!name.trim()) { setError("Please enter your name."); return; }
    if (!dept.trim()) { setError("Please enter your department."); return; }
    onStart(name.trim(), dept.trim());
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-md p-10 w-full max-w-sm flex flex-col items-center text-center">

        <img
          src="/seplat-logo.png"
          alt="Seplat Energy"
          className="h-14 object-contain mb-6"
        />

        <h2 className="text-lg font-black tracking-wide text-slate-900 mb-1">
          INVESTIGATOR ID
        </h2>

        <p className="text-[11px] text-slate-400 mb-8">
          Please provide your details to proceed with the audit.
        </p>

        <div className="w-full text-left mb-5">
          <label className="block text-[10px] font-semibold tracking-widest uppercase text-slate-400 mb-2">
            Full Name
          </label>
          <input
            type="text"
            placeholder="e.g. John Doe"
            value={name}
            onChange={e => { setName(e.target.value); setError(""); }}
            onKeyDown={e => e.key === "Enter" && handleStart()}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm text-slate-900 outline-none focus:border-green-600 focus:bg-white transition-colors placeholder:text-slate-400"
          />
        </div>

        <div className="w-full text-left mb-8">
          <label className="block text-[10px] font-semibold tracking-widest uppercase text-slate-400 mb-2">
            Department
          </label>
          <input
            type="text"
            placeholder="e.g. Finance, HR, IT"
            value={dept}
            onChange={e => { setDept(e.target.value); setError(""); }}
            onKeyDown={e => e.key === "Enter" && handleStart()}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm text-slate-900 outline-none focus:border-green-600 focus:bg-white transition-colors placeholder:text-slate-400"
          />
        </div>

        {error && (
          <p className="text-xs text-red-500 text-left w-full mb-4">{error}</p>
        )}

        <button
          onClick={handleStart}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold text-sm tracking-widest uppercase py-3 rounded-xl transition-all duration-200 cursor-pointer"
          style={{ boxShadow: "0 0 16px rgba(22,163,74,0.4), 0 4px 12px rgba(22,163,74,0.2)" }}
        >
          START QUIZ
        </button>

      </div>
    </div>
  );
}