import { useState, useEffect, useRef } from "react";
import { quizData } from "./quizData";
import LandingScreen from "./components/LandingScreen";
import StartScreen from "./components/StartScreen";
import ChallengeSelect from "./components/ChallengeSelect";
import QuizCard from "./components/QuizCard";
import DoneScreen from "./components/DoneScreen";
import "./index.css";

const SHEET_URL = import.meta.env.VITE_SHEET_URL || "";
const QUIZ_LOCKOUT_MS = 5 * 60 * 1000; // 5 minutes — change to 24 * 60 * 60 * 1000 for Audit Week

export default function App() {
  const [screen, setScreen] = useState("landing");
  const [user, setUser] = useState({ name: "", dept: "" });
  const [current, setCurrent] = useState(null);
  const [answered, setAnswered] = useState([]);
  const [timerStarted, setTimerStarted] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [lockoutMsg, setLockoutMsg] = useState("");
  const timerRef = useRef(null);

  useEffect(() => {
    if (timerStarted && screen !== "done") {
      timerRef.current = setInterval(() => {
        setElapsed(t => t + 1);
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [timerStarted]);

  useEffect(() => {
    if (screen === "done") clearInterval(timerRef.current);
  }, [screen]);

  const handleReady = () => setScreen("start");

  const handleStart = (name, dept) => {
    const completedAt = localStorage.getItem("seplat_quiz_completed");
    if (completedAt) {
      const timeElapsed = Date.now() - parseInt(completedAt);
      if (timeElapsed < QUIZ_LOCKOUT_MS) {
        setLockoutMsg("You have already participated in this quiz. Thank you!");
        return;
      } else {
        localStorage.removeItem("seplat_quiz_completed");
      }
    }
    setLockoutMsg("");
    setUser({ name, dept });
    setAnswered([]);
    setTimerStarted(false);
    setElapsed(0);
    setScreen("challenge");
  };

  const handleSelectQuestion = (idx) => {
    if (!timerStarted) setTimerStarted(true);
    setCurrent(idx);
    setScreen("quiz");
  };

  const formatTime = (s) => {
    const m = Math.floor(s / 60).toString().padStart(2, "0");
    const sec = (s % 60).toString().padStart(2, "0");
    return `${m}:${sec}`;
  };

  const submitToSheet = async (score, total, time) => {
    if (!SHEET_URL) { console.warn("No SHEET_URL configured"); return; }
    try {
      await fetch(SHEET_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: user.name,
          dept: user.dept,
          score: `${score}/${total}`,
          time: formatTime(time)
        })
      });
      console.log("Submitted successfully");
    } catch (err) {
      console.error("Submission failed:", err);
    }
  };

  const handleAnswer = (selectedIndex) => {
    const updated = [...answered, { question: current, selected: selectedIndex }];
    setAnswered(updated);
    if (updated.length >= quizData.length) {
      clearInterval(timerRef.current);
      const score = updated.filter(
        a => a.selected === quizData[a.question].correct
      ).length;
      // Set lockout IMMEDIATELY before anything else
      localStorage.setItem("seplat_quiz_completed", Date.now().toString());
      submitToSheet(score, updated.length, elapsed);
      setScreen("done");
    } else {
      const answeredIdxs = updated.map(a => a.question);
      const next = quizData.findIndex((_, i) => !answeredIdxs.includes(i));
      if (next !== -1) {
        setCurrent(next);
        setScreen("quiz");
      } else {
        localStorage.setItem("seplat_quiz_completed", Date.now().toString());
        setScreen("done");
      }
    }
  };

  const progress = answered.length;

  return (
    <div className="min-h-screen bg-slate-50">
      {screen !== "landing" && screen !== "start" && (
        <div className="fixed top-0 left-0 right-0 h-14 bg-white border-b border-slate-200 flex items-center justify-between px-6 z-50 shadow-sm">
          <img src="/seplat-logo.png" alt="Seplat Energy" className="h-11 object-contain" />
          <span className="text-xs font-bold tracking-widest uppercase text-slate-400">
            Internal Audit Week 2026
          </span>
          <div className="flex items-center gap-4">
            {timerStarted && (
              <span className="text-xs font-bold text-slate-600 tabular-nums">
                ⏱ {formatTime(elapsed)}
              </span>
            )}
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Progress</span>
              <span className="text-xs font-bold text-slate-700">{progress}/{quizData.length}</span>
              <div className="w-24 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-600 rounded-full transition-all duration-500"
                  style={{ width: `${(progress / quizData.length) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {screen === "landing" && <LandingScreen onReady={handleReady} />}
      {screen === "start" && (
        <StartScreen onStart={handleStart} lockoutMsg={lockoutMsg} />
      )}
      {screen === "challenge" && (
        <div className="pt-14">
          <ChallengeSelect
            quizData={quizData}
            answered={answered}
            timerStarted={timerStarted}
            onSelect={handleSelectQuestion}
          />
        </div>
      )}
      {screen === "quiz" && (
        <div className="pt-14">
          <QuizCard
            key={current}
            question={quizData[current]}
            questionNumber={current + 1}
            total={quizData.length}
            onAnswer={handleAnswer}
          />
        </div>
      )}
      {screen === "done" && (
        <div className="pt-14">
          <DoneScreen name={user.name} elapsed={elapsed} formatTime={formatTime} />
        </div>
      )}
    </div>
  );
}