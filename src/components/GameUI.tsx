"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGameStore } from "@/store/gameStore";
import { ORDERED_NPCS, SCENES, PUZZLES, PUZZLE_BY_NPC, INTRO, ENDING_NARRATION } from "@/game/content";
import SceneStage from "@/components/SceneStage";
import PuzzleGame from "@/components/PuzzleGame";
import type { StatKey } from "@/game/types";

const STAT_META: Record<StatKey, { label: string; color: string }> = {
  wealthGap: { label: "Giàu nghèo", color: "from-orange-400 to-orange-600" },
  conflict: { label: "Mâu thuẫn", color: "from-red-400 to-rose-600" },
  stability: { label: "Ổn định", color: "from-sky-400 to-blue-600" },
  statePower: { label: "Nhà nước", color: "from-fuchsia-400 to-purple-600" },
  support: { label: "Ủng hộ", color: "from-emerald-400 to-green-600" },
};
const STAT_ORDER: StatKey[] = ["wealthGap", "conflict", "stability", "statePower", "support"];

function useTypewriter(text: string, speed = 22) {
  const [shown, setShown] = useState("");
  useEffect(() => {
    setShown("");
    let i = 0;
    const id = setInterval(() => {
      i++;
      setShown(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, speed]);
  return shown;
}

// Popup chung cho câu hỏi / ghép tranh
function Modal({ children, wide }: { children: React.ReactNode; wide?: boolean }) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        initial={{ scale: 0.9, y: 24, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        transition={{ type: "spring", stiffness: 220, damping: 24 }}
        className={`max-h-[92vh] w-full overflow-auto rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-2xl ${
          wide ? "max-w-5xl" : "max-w-lg"
        }`}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

export default function GameUI() {
  const s = useGameStore();
  const npc = s.currentNpc();

  // Khi đang thoại: nhấn Space/Enter để sang dòng tiếp (không cần bấm vào khung chat)
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key !== " " && e.key !== "Enter") return;
      const st = useGameStore.getState();
      if (st.mode !== "dialogue") return;
      if (Date.now() - st.interactTs < 250) return; // bỏ qua chính lần nhấn mở thoại
      e.preventDefault();
      st.nextLine();
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, []);

  if (!s.started) return <IntroScreen />;
  if (s.mode === "ending" && s.ending) return <EndingScreen />;
  if (!npc) return null;

  const scene = SCENES[npc.id];
  const popupMode =
    s.mode === "theory" ||
    s.mode === "quiz" ||
    s.mode === "explanation" ||
    s.mode === "choice" ||
    s.mode === "puzzle";

  return (
    <div className="flex h-full flex-col">
      {/* Khung cảnh chiếm toàn màn hình */}
      <div className="relative flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={npc.id}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.06, filter: "brightness(0.3)" }}
            animate={{ opacity: 1, scale: 1, filter: "brightness(1)" }}
            exit={{ opacity: 0, scale: 0.97, filter: "brightness(0.2)" }}
            transition={{ duration: 0.45, ease: "easeInOut" }}
          >
            <SceneStage
              npc={npc}
              scene={scene}
              active={s.mode === "explore"}
              cleared={s.cleared}
              puzzlePending={s.puzzlePending}
              onInteract={s.interact}
              onExit={s.exitToGate}
              onOpenPuzzle={s.openPuzzle}
            />
          </motion.div>
        </AnimatePresence>

        {/* Thanh chỉ số + tiến độ — đè lên background */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 p-2 sm:p-3">
          <div className="rounded-xl bg-black/35 px-3 py-2 backdrop-blur-sm">
            <div className="grid grid-cols-5 gap-3">
              {STAT_ORDER.map((k) => (
                <div key={k}>
                  <div className="flex justify-between text-[10px] text-white/80">
                    <span className="truncate">{STAT_META[k].label}</span>
                    <span className="font-mono font-bold text-white">{s.stats[k]}</span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-black/40">
                    <motion.div
                      className={`h-full bg-gradient-to-r ${STAT_META[k].color}`}
                      animate={{ width: `${s.stats[k]}%` }}
                      transition={{ type: "spring", stiffness: 120, damping: 20 }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-2 flex items-center justify-center gap-1">
              {ORDERED_NPCS.map((n, i) => (
                <span
                  key={n.id}
                  className={`h-1.5 rounded-full transition-all ${
                    i === s.sceneIndex ? "w-6 bg-amber-400" : i < s.sceneIndex ? "w-3 bg-emerald-500" : "w-3 bg-white/30"
                  }`}
                />
              ))}
              <span className="ml-2 text-[10px] text-white/70">
                Màn {s.sceneIndex + 1}/{s.totalScenes}
              </span>
            </div>
          </div>
        </div>

        {/* Thoại NPC — thanh dưới đáy khung cảnh */}
        {s.mode === "dialogue" && (
          <div className="absolute inset-x-0 bottom-0 p-3">
            <div className="rounded-2xl border border-slate-700 bg-slate-900/95 p-4 shadow-2xl backdrop-blur">
              <div className="mb-1 flex items-center gap-2">
                <span className="text-xl">{npc.sprite}</span>
                <span className="text-sm font-bold text-amber-300">{npc.name}</span>
              </div>
              <DialogueLine />
            </div>
          </div>
        )}

        {/* nhắc khi đi bộ */}
        {s.mode === "explore" && (
          <div className="absolute inset-x-0 bottom-3 text-center">
            {s.puzzlePending ? (
              <span className="rounded-full bg-purple-700/80 px-3 py-1 text-xs font-semibold text-white">
                ❌ Trả lời sai! Tới điểm 🧩 và nhấn Space để ghép tranh
              </span>
            ) : s.cleared ? (
              <span className="rounded-full bg-emerald-700/80 px-3 py-1 text-xs font-semibold text-white">
                ✅ Đi tới mốc “Tiếp tục →” để sang nhân vật kế tiếp
              </span>
            ) : s.dialogueSeen ? (
              <span className="rounded-full bg-amber-700/80 px-3 py-1 text-xs font-semibold text-white">
                ✅ Đã ghép xong! Quay lại {npc.name} và nhấn Space để trả lời lại
              </span>
            ) : (
              <span className="rounded-full bg-black/50 px-3 py-1 text-xs text-white/80">
                Tới gần {npc.name} và nhấn Space để trò chuyện
              </span>
            )}
          </div>
        )}
      </div>

      {/* Popup: câu hỏi / giải thích / lựa chọn / ghép tranh */}
      <AnimatePresence>
        {popupMode && (
          <Modal wide={s.mode === "puzzle"}>
            {s.mode === "theory" && <TheoryView />}
            {s.mode === "quiz" && <QuizView />}
            {s.mode === "explanation" && <ExplanationView />}
            {s.mode === "choice" && <ChoiceView />}
            {s.mode === "puzzle" && (
              <PuzzleGame
                puzzle={PUZZLES[PUZZLE_BY_NPC[npc.id]]}
                onSolve={s.solvePuzzle}
                onExit={s.closePuzzle}
              />
            )}
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
}

function DialogueLine() {
  const { currentNpc, lineIndex, nextLine } = useGameStore();
  const npc = currentNpc();
  const line = npc?.lines[lineIndex] ?? "";
  const shown = useTypewriter(line);
  const done = shown.length >= line.length;
  return (
    <button onClick={nextLine} className="w-full text-left">
      <p className="min-h-[3rem] text-base leading-relaxed text-slate-100">{shown}</p>
      <p className="mt-2 text-right text-xs text-slate-500">
        {done ? "▶ nhấn Space hoặc bấm để tiếp" : "…"}
      </p>
    </button>
  );
}

function TheoryView() {
  const { currentNpc, closeTheory } = useGameStore();
  const npc = currentNpc();
  if (!npc?.theory) return null;
  return (
    <div>
      <div className="mb-3 text-base font-bold text-amber-300">📖 Lý thuyết — {npc.name}</div>
      <p className="mb-5 rounded-lg border-l-4 border-amber-500 bg-slate-800/50 p-4 text-lg leading-relaxed text-slate-100">
        {npc.theory}
      </p>
      <button
        onClick={closeTheory}
        className="w-full rounded-lg bg-amber-600 py-3 text-lg font-semibold text-white hover:bg-amber-500"
      >
        Đã đọc → Trả lời câu hỏi
      </button>
    </div>
  );
}

function QuizView() {
  const { currentNpc, answerQuiz, showHint, showTheory } = useGameStore();
  const npc = currentNpc();
  const quiz = npc?.quiz;
  if (!quiz) return null;
  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-2">
        <span className="text-base font-bold text-amber-300">{npc!.name}</span>
        {npc!.theory && (
          <button
            onClick={showTheory}
            className="rounded-md border border-amber-500/60 px-3 py-1 text-sm font-semibold text-amber-300 hover:bg-amber-500/10"
          >
            📖 Ôn lý thuyết
          </button>
        )}
      </div>
      <p className="mb-4 text-2xl font-bold leading-snug text-slate-100">{quiz.question}</p>
      {showHint && quiz.hint && (
        <p className="mb-4 rounded-lg border-l-2 border-amber-400 bg-amber-950/40 p-3 text-base text-amber-100">
          {quiz.hint}
        </p>
      )}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {quiz.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => answerQuiz(i)}
            className="rounded-lg border border-slate-700 bg-slate-800/60 p-4 text-left text-lg text-slate-100 hover:border-amber-500 hover:bg-slate-700/60"
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

function ExplanationView() {
  const { currentNpc, quizResult, closeExplanation } = useGameStore();
  const quiz = currentNpc()?.quiz;
  if (!quiz) return null;
  const correct = quizResult === "correct";

  // Trả lời SAI: không lộ đáp án, bắt đi ghép tranh rồi trả lời lại
  if (!correct) {
    return (
      <div>
        <p className="mb-3 text-2xl font-bold text-rose-400">Chưa đúng!</p>
        <p className="mb-5 text-lg leading-relaxed text-slate-300">
          Bạn cần ôn lại trước khi trả lời tiếp. Hãy tới điểm ghép tranh trên bản đồ,
          sau đó trả lời lại câu hỏi này.
        </p>
        <button
          onClick={closeExplanation}
          className="w-full rounded-lg bg-purple-600 py-3 text-lg font-semibold text-white hover:bg-purple-500"
        >
          Đi ghép tranh →
        </button>
      </div>
    );
  }

  // Trả lời ĐÚNG: mới hiện đáp án + giải thích, rồi cho qua
  return (
    <div>
      <p className="mb-3 text-2xl font-bold text-emerald-400">
        Chính xác! Đáp án: {quiz.options[quiz.correctIndex]}
      </p>
      {quiz.explanation && (
        <p className="mb-5 rounded-lg border-l-2 border-amber-500 bg-slate-800/50 p-4 text-lg italic leading-relaxed text-amber-100">
          {quiz.explanation}
        </p>
      )}
      <button
        onClick={closeExplanation}
        className="w-full rounded-lg bg-amber-600 py-3 text-lg font-semibold text-white hover:bg-amber-500"
      >
        Tiếp tục
      </button>
    </div>
  );
}

function ChoiceView() {
  const { currentNpc, chooseOption } = useGameStore();
  const choices = currentNpc()?.choices;
  if (!choices) return null;
  return (
    <div>
      <p className="mb-3 text-base font-semibold text-slate-100">Bạn quyết định thế nào?</p>
      <div className="grid grid-cols-1 gap-2">
        {choices.map((c, i) => (
          <button
            key={i}
            onClick={() => chooseOption(i)}
            className="rounded-lg border border-slate-700 bg-slate-800/60 p-3 text-left text-sm text-slate-100 hover:border-emerald-500 hover:bg-slate-700/60"
          >
            {c.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function IntroScreen() {
  const start = useGameStore((st) => st.start);
  return (
    <div className="flex h-full items-center justify-center">
      <div className="max-w-lg text-center">
        <h1 className="mb-2 bg-gradient-to-r from-amber-300 to-rose-400 bg-clip-text text-3xl font-extrabold text-transparent">
          Village of Classes
        </h1>
        <p className="mb-6 text-sm text-slate-400">Ngôi làng giai cấp</p>
        <div className="my-6 space-y-2 text-slate-200">
          {INTRO.map((l, i) => (
            <p key={i} className="text-sm leading-relaxed">{l}</p>
          ))}
        </div>
        <button
          onClick={start}
          className="rounded-xl bg-amber-600 px-8 py-3 font-bold text-white hover:bg-amber-500"
        >
          ▶ Bắt đầu hành trình
        </button>
      </div>
    </div>
  );
}

function EndingScreen() {
  const { ending, stats, reset } = useGameStore();
  if (!ending) return null;
  return (
    <div className="relative flex h-full items-center justify-center overflow-hidden">
      {/* Ảnh nền kết cục */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(/endings/ending-${ending.id}.png)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      {/* lớp tối để chữ dễ đọc */}
      <div className="absolute inset-0 bg-black/55" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 max-w-lg rounded-2xl bg-black/50 p-6 text-center backdrop-blur-sm"
      >
        <h2 className="mb-3 text-3xl font-extrabold text-amber-300 drop-shadow">{ending.title}</h2>
        <p className="mb-4 text-base leading-relaxed text-slate-100">{ending.body}</p>
        <div className="my-5 space-y-1.5 border-y border-white/15 py-4 text-left">
          {ENDING_NARRATION.map((l, i) => (
            <p key={i} className="text-sm italic leading-relaxed text-slate-300">{l}</p>
          ))}
        </div>
        <p className="mb-4 text-xs text-slate-300">
          Nhà nước {stats.statePower} · Mâu thuẫn {stats.conflict} · Ủng hộ {stats.support} · Ổn định {stats.stability}
        </p>
        <button
          onClick={reset}
          className="rounded-xl bg-slate-100 px-6 py-2.5 font-bold text-slate-900 hover:bg-white"
        >
          Chơi lại
        </button>
      </motion.div>
    </div>
  );
}
