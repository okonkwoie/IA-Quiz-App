import { useState } from "react";
import { AlertCircle, SearchCheck } from "lucide-react";

export default function StartScreen({ onStart, lockoutMsg }) {
  const [name, setName] = useState("");
  const [dept, setDept] = useState("");
  const [errors, setErrors] = useState({ name: "", dept: "" });

  const handleStart = () => {
    const newErrors = { name: "", dept: "" };
    if (!name.trim()) newErrors.name = "Please enter your full name.";
    if (!dept.trim()) newErrors.dept = "Please enter your department.";
    if (newErrors.name || newErrors.dept) { setErrors(newErrors); return; }
    onStart(name.trim(), dept.trim());
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
      style={{
        backgroundImage: "url('/detective-bg2.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-white/20 backdrop-blur-[0.2px]" />

      {/* Card */}
      <div className="relative z-10 bg-white/90 backdrop-blur-sm rounded-2xl shadow-md p-10 w-full max-w-sm flex flex-col items-center text-center">

        <img
          src="/seplat-logo.png"
          alt="Seplat Energy"
          className="h-14 object-contain mb-6"
        />

        <h2 className="text-lg font-black tracking-wide text-slate-900 mb-1 flex items-center justify-center gap-2">
            OUR AUDITOR OF THE DAY! 🕵️
        </h2>

        <p className="text-[11px] text-slate-400 mb-8">
          Please provide your <b>"auditor"</b> details to help us track your winnings!
        </p>

        {/* Full Name */}
        <div className="w-full text-left mb-8">
          <label className="block text-[10px] font-semibold tracking-widest uppercase text-slate-400 mb-2">
            Full Name
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="e.g. John Doe"
              value={name}
              onChange={e => { setName(e.target.value); setErrors(p => ({ ...p, name: "" })); }}
              onKeyDown={e => e.key === "Enter" && handleStart()}
              className={`w-full bg-slate-50 rounded-lg px-4 py-3 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 border ${errors.name || lockoutMsg ? "border-red-400" : "border-slate-200 focus:border-green-600"}`}
            />
            {lockoutMsg && (
              <div className="absolute left-0 -bottom-8 z-10 flex items-center gap-1.5 bg-red-50 border border-red-200 text-red-500 text-[10px] font-medium px-3 py-1.5 rounded-lg shadow-sm w-full">
                {lockoutMsg}
                <div className="absolute -top-1.5 left-4 w-3 h-3 bg-red-50 border-l border-t border-red-200 rotate-45" />
              </div>
            )}
            {errors.name && !lockoutMsg && (
              <div className="absolute left-0 -bottom-8 z-10 flex items-center gap-1.5 bg-red-50 border border-red-200 text-red-500 text-[10px] font-medium px-3 py-1.5 rounded-lg shadow-sm w-full">
                <AlertCircle size={11} strokeWidth={2.5} className="flex-shrink-0" />
                {errors.name}
                <div className="absolute -top-1.5 left-4 w-3 h-3 bg-red-50 border-l border-t border-red-200 rotate-45" />
              </div>
            )}
          </div>
        </div>

        {/* Department */}
        <div className="w-full text-left mb-8">
          <label className="block text-[10px] font-semibold tracking-widest uppercase text-slate-400 mb-2">
            Department
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="e.g. Finance, HR, IT"
              value={dept}
              onChange={e => { setDept(e.target.value); setErrors(p => ({ ...p, dept: "" })); }}
              onKeyDown={e => e.key === "Enter" && handleStart()}
              className={`w-full bg-slate-50 rounded-lg px-4 py-3 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 border ${errors.dept ? "border-red-400" : "border-slate-200 focus:border-green-600"}`}
            />
            {errors.dept && (
              <div className="absolute left-0 -bottom-8 z-10 flex items-center gap-1.5 bg-red-50 border border-red-200 text-red-500 text-[10px] font-medium px-3 py-1.5 rounded-lg shadow-sm w-full">
                <AlertCircle size={11} strokeWidth={2.5} className="flex-shrink-0" />
                {errors.dept}
                <div className="absolute -top-1.5 left-4 w-3 h-3 bg-red-50 border-l border-t border-red-200 rotate-45" />
              </div>
            )}
          </div>
        </div>

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