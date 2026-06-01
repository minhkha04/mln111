"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGameStore } from "@/store/gameStore";
import { ORDERED_NPCS, SCENES, PUZZLES, PUZZLE_BY_NPC, INTRO, ENDING_NARRATION, SECONDARY_NPCS } from "@/game/content";
import { LESSON_INTROS, THEORY_DEEPS } from "@/game/theory";
import SceneStage from "@/components/SceneStage";
import PuzzleGame from "@/components/PuzzleGame";
import AIUsage from "@/components/AIUsage";
import Timeline from "@/components/Timeline";
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

function Modal({ children, wide, medium }: { children: React.ReactNode; wide?: boolean; medium?: boolean }) {
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
          wide ? "max-w-5xl" : medium ? "max-w-2xl" : "max-w-lg"
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

  // Keyboard: Space/Enter để sang dòng thoại tiếp
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key !== " " && e.key !== "Enter") return;
      const st = useGameStore.getState();
      if (st.mode === "dialogue") {
        if (Date.now() - st.interactTs < 250) return;
        e.preventDefault();
        st.nextLine();
      } else if (st.mode === "secondary-dialogue") {
        if (Date.now() - st.interactTs < 250) return;
        e.preventDefault();
        st.nextSecondaryLine();
      }
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, []);

  if (!s.started) return <IntroScreen />;
  if (s.mode === "ending" && s.ending) return <EndingScreen />;
  if (!npc) return null;

  const scene = SCENES[npc.id];
  const secNpc = SECONDARY_NPCS[npc.id] ?? undefined;
  const lesson = LESSON_INTROS[npc.id];
  const theory = THEORY_DEEPS[npc.id];
  const popupMode =
    s.mode === "theory" ||
    s.mode === "quiz" ||
    s.mode === "explanation" ||
    s.mode === "choice" ||
    s.mode === "puzzle";

  return (
    <div className="flex h-full flex-col">
      {/* Lesson Intro — trước khi explore */}
      <AnimatePresence>
        {s.mode === "lesson" && lesson && (
          <Modal medium>
            <LessonIntroView lesson={lesson} sceneIndex={s.sceneIndex} npcId={npc.id} onClose={s.closeLesson} />
          </Modal>
        )}
      </AnimatePresence>

      {/* Khung cảnh */}
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
              secondaryNpc={secNpc}
              secondarySeen={s.secondarySeen}
              onInteract={s.interact}
              onExit={s.exitToGate}
              onOpenPuzzle={s.openPuzzle}
              onInteractSecondary={s.interactSecondary}
            />
          </motion.div>
        </AnimatePresence>

        {/* Thanh chỉ số */}
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

        {/* Thoại NPC chính */}
        {s.mode === "dialogue" && (
          <div className="absolute inset-x-0 bottom-0 p-3">
            <div className="rounded-2xl border border-slate-700 bg-slate-900/95 p-4 shadow-2xl backdrop-blur">
              <div className="mb-1 flex items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/sprites/${npc.id}.png`} alt={npc.name} className="h-12 w-12 object-contain" />
                <span className="text-sm font-bold text-amber-300">{npc.name}</span>
              </div>
              <DialogueLine />
            </div>
          </div>
        )}

        {/* Thoại NPC phụ */}
        {s.mode === "secondary-dialogue" && secNpc && (
          <div className="absolute inset-x-0 bottom-0 p-3">
            <div className="rounded-2xl border border-rose-800/50 bg-slate-900/95 p-4 shadow-2xl backdrop-blur">
              <div className="mb-1 flex items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={secNpc.sprite} alt={secNpc.name} className="h-12 w-12 object-contain" />
                <span className="text-sm font-bold text-rose-300">{secNpc.name}</span>
                <span className="rounded bg-rose-900/50 px-1.5 py-0.5 text-[10px] text-rose-300">Góc nhìn khác</span>
              </div>
              <SecondaryDialogueLine />
            </div>
          </div>
        )}

        {/* Nhắc khi đi bộ */}
        {s.mode === "explore" && (
          <div className="absolute inset-x-0 bottom-3 text-center">
            {s.puzzlePending ? (
              <span className="rounded-full bg-purple-700/80 px-3 py-1 text-xs font-semibold text-white">
                ❌ Trả lời sai! Tới điểm 🧩 và nhấn Space để ghép tranh
              </span>
            ) : s.cleared ? (
              <span className="rounded-full bg-emerald-700/80 px-3 py-1 text-xs font-semibold text-white">
                ✅ Đi tới mốc "Tiếp tục →" để sang nhân vật kế tiếp
              </span>
            ) : s.dialogueSeen ? (
              <span className="rounded-full bg-amber-700/80 px-3 py-1 text-xs font-semibold text-white">
                ✅ Đã ghép xong! Quay lại {npc.name} và nhấn Space để trả lời lại
              </span>
            ) : (
              <span className="rounded-full bg-black/50 px-3 py-1 text-xs text-white/80">
                Tới gần {npc.name} và nhấn Space để trò chuyện
                {secNpc && !s.secondarySeen && " · Hoặc nói chuyện với " + secNpc.name}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Popup: quiz / giải thích / theory / lựa chọn / ghép tranh */}
      <AnimatePresence>
        {popupMode && (
          <Modal medium={s.mode !== "puzzle"} wide={s.mode === "puzzle"}>
            {s.mode === "theory" && npc.theory && <InlineTheoryView npc={npc} onClose={s.closeTheory} />}
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

      {/* AI Usage modal */}
      <AnimatePresence>
        {s.showAIUsage && <AIUsage onClose={s.toggleAIUsage} />}
      </AnimatePresence>
    </div>
  );
}

// === Sub-components ===

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

function SecondaryDialogueLine() {
  const { currentNpc, secondaryLineIndex, nextSecondaryLine } = useGameStore();
  const npc = currentNpc();
  const secNpc = npc ? SECONDARY_NPCS[npc.id] : null;
  const line = secNpc?.lines[secondaryLineIndex] ?? "";
  const shown = useTypewriter(line);
  const done = shown.length >= line.length;
  return (
    <button onClick={nextSecondaryLine} className="w-full text-left">
      <p className="min-h-[3rem] text-base leading-relaxed text-slate-100">{shown}</p>
      <p className="mt-2 text-right text-xs text-slate-500">
        {done ? "▶ nhấn Space hoặc bấm để tiếp" : "…"}
      </p>
    </button>
  );
}

function LessonIntroView({ lesson, sceneIndex, npcId, onClose }: { lesson: { title: string; concept: string; bullets: string[]; citation: string }; sceneIndex: number; npcId: string; onClose: () => void }) {
  return (
    <div>
      <div className="flex gap-5">
        {/* NPC portrait */}
        <div className="hidden shrink-0 sm:block">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`/sprites/${npcId}.png`} alt="" className="h-36 w-36 rounded-xl bg-slate-800/50 object-contain p-2" />
        </div>
        <div className="flex-1">
          <div className="mb-1 flex items-center gap-2">
            <span className="rounded-full bg-amber-600/30 px-2.5 py-0.5 text-xs font-bold text-amber-300">
              📖 Bài học {sceneIndex + 1}/8
            </span>
          </div>
          <h2 className="mb-3 text-xl font-extrabold text-amber-200">{lesson.title}</h2>
          <div className="mb-4 rounded-lg border-l-4 border-amber-500 bg-amber-950/30 p-3">
            <p className="text-sm font-semibold leading-relaxed text-amber-100">{lesson.concept}</p>
          </div>
        </div>
      </div>
      <ul className="mb-4 space-y-2">
        {lesson.bullets.map((b, i) => (
          <li key={i} className="flex gap-2 text-sm leading-relaxed text-slate-200">
            <span className="mt-0.5 text-amber-400">•</span>
            <span>{b}</span>
          </li>
        ))}
      </ul>
      <p className="mb-5 rounded-lg bg-slate-800/60 p-2 text-xs italic leading-relaxed text-slate-400">
        📚 {lesson.citation}
      </p>
      <button
        onClick={onClose}
        className="w-full rounded-lg bg-amber-600 py-3 text-base font-bold text-white hover:bg-amber-500"
      >
        Đã đọc → Vào màn chơi ▶
      </button>
    </div>
  );
}

function TheoryPanelView({ theory, onClose }: { theory: { title: string; keyPoint: string; explanation: string[]; diagram: string; citation: string; realWorld?: string }; onClose: () => void }) {
  return (
    <div>
      <span className="mb-2 inline-block rounded-full bg-emerald-600/30 px-2.5 py-0.5 text-xs font-bold text-emerald-300">
        🔍 Phân tích chuyên sâu
      </span>
      <h2 className="mb-3 text-lg font-extrabold text-emerald-200">{theory.title}</h2>

      {/* Key point */}
      <div className="mb-4 rounded-lg border-l-4 border-emerald-500 bg-emerald-950/30 p-3">
        <p className="text-sm font-semibold leading-relaxed text-emerald-100">{theory.keyPoint}</p>
      </div>

      {/* Diagram */}
      <div className="mb-4 rounded-lg bg-slate-800/60 p-3 text-center">
        <p className="text-xs font-bold text-slate-400">Sơ đồ logic</p>
        <p className="mt-1 text-sm font-mono leading-relaxed text-amber-200">{theory.diagram}</p>
      </div>

      {/* Explanation */}
      <ul className="mb-4 space-y-2">
        {theory.explanation.map((e, i) => (
          <li key={i} className="flex gap-2 text-sm leading-relaxed text-slate-200">
            <span className="mt-0.5 text-emerald-400">▸</span>
            <span>{e}</span>
          </li>
        ))}
      </ul>

      {/* Real-world connection */}
      {theory.realWorld && (
        <div className="mb-4 rounded-lg border border-sky-800/50 bg-sky-950/30 p-3">
          <p className="mb-1 text-xs font-bold text-sky-300">🌏 Liên hệ thực tiễn</p>
          <p className="text-sm leading-relaxed text-sky-100">{theory.realWorld}</p>
        </div>
      )}

      {/* Citation */}
      <p className="mb-5 rounded-lg bg-slate-800/60 p-2 text-xs italic leading-relaxed text-slate-400">
        📚 {theory.citation}
      </p>

      <button
        onClick={onClose}
        className="w-full rounded-lg bg-emerald-600 py-3 text-base font-bold text-white hover:bg-emerald-500"
      >
        Đã hiểu → Tiếp tục
      </button>
    </div>
  );
}

function QuizView() {
  const { currentNpc, answerQuiz, showHint } = useGameStore();
  const npc = currentNpc();
  const quiz = npc?.quiz;
  if (!quiz) return null;
  return (
    <div>
      <div className="mb-2 text-base font-bold text-amber-300">{npc!.name}</div>
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

function InlineTheoryView({ npc, onClose }: { npc: { id: string; name: string; theory?: string }; onClose: () => void }) {
  if (!npc.theory) return null;
  return (
    <div>
      <div className="mb-4 flex items-center gap-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`/sprites/${npc.id}.png`} alt={npc.name} className="h-20 w-20 rounded-xl bg-slate-800/50 object-contain p-1" />
        <div>
          <div className="text-base font-bold text-amber-300">📖 Lý thuyết — {npc.name}</div>
          <p className="mt-1 text-xs text-slate-400">Ôn tập trước khi trả lời câu hỏi</p>
        </div>
      </div>
      <p className="mb-5 rounded-lg border-l-4 border-amber-500 bg-slate-800/50 p-4 text-base leading-relaxed text-slate-100">
        {npc.theory}
      </p>
      <button
        onClick={onClose}
        className="w-full rounded-lg bg-amber-600 py-3 text-lg font-semibold text-white hover:bg-amber-500"
      >
        Đã đọc → Trả lời câu hỏi
      </button>
    </div>
  );
}

function ExplanationView() {
  const { currentNpc, quizResult, closeExplanation, closeDeepTheory } = useGameStore();
  const npc = currentNpc();
  const quiz = npc?.quiz;
  if (!quiz) return null;
  const correct = quizResult === "correct";
  const [showDeep, setShowDeep] = useState(false);
  const theory = npc ? THEORY_DEEPS[npc.id] : null;

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

  // Deep theory view (step 2)
  if (showDeep && theory) {
    return <TheoryPanelView theory={theory} onClose={closeDeepTheory} />;
  }

  // Explanation view (step 1)
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
        onClick={() => theory ? setShowDeep(true) : closeExplanation()}
        className="w-full rounded-lg bg-amber-600 py-3 text-lg font-semibold text-white hover:bg-amber-500"
      >
        {theory ? "Xem phân tích chuyên sâu →" : "Tiếp tục →"}
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
  const toggleAI = useGameStore((st) => st.toggleAIUsage);
  const showAI = useGameStore((st) => st.showAIUsage);
  return (
    <div className="flex h-full items-center justify-center">
      <div className="max-w-lg text-center">
        <h1 className="mb-2 bg-gradient-to-r from-amber-300 to-rose-400 bg-clip-text text-3xl font-extrabold text-transparent">
          Village of Classes
        </h1>
        <p className="mb-4 text-sm text-slate-400">Ngôi làng giai cấp</p>

        {/* Quote Lenin */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mx-auto mb-5 max-w-md rounded-lg border border-slate-700 bg-slate-800/50 p-4"
        >
          <p className="text-sm italic leading-relaxed text-amber-200">
            &ldquo;The state is a product and a manifestation of the irreconcilability of class antagonisms.&rdquo;
          </p>
          <p className="mt-1 text-xs text-slate-400">— V.I. Lenin</p>
        </motion.div>

        {/* Mục tiêu học tập */}
        <div className="mb-5 rounded-lg bg-slate-800/30 p-3 text-left">
          <p className="mb-2 text-xs font-bold text-slate-300">🎯 Mục tiêu học tập:</p>
          <ul className="space-y-1 text-xs text-slate-400">
            <li>1. Hiểu nguồn gốc ra đời của nhà nước</li>
            <li>2. Phân biệt bản chất và chức năng nhà nước</li>
            <li>3. Liên hệ vai trò nhà nước trong xã hội hiện đại</li>
          </ul>
        </div>

        <div className="my-4 space-y-2 text-slate-200">
          {INTRO.map((l, i) => (
            <p key={i} className="text-sm leading-relaxed">{l}</p>
          ))}
        </div>

        <div className="flex flex-col gap-2">
          <button
            onClick={start}
            className="rounded-xl bg-amber-600 px-8 py-3 font-bold text-white hover:bg-amber-500"
          >
            ▶ Bắt đầu hành trình
          </button>
          <button
            onClick={toggleAI}
            className="rounded-xl bg-slate-700 px-6 py-2 text-sm font-medium text-slate-300 hover:bg-slate-600"
          >
            📋 Phụ lục AI Usage
          </button>
        </div>
      </div>

      <AnimatePresence>
        {showAI && <AIUsage onClose={toggleAI} />}
      </AnimatePresence>
    </div>
  );
}

function EndingScreen() {
  const { ending, stats, reset } = useGameStore();
  if (!ending) return null;

  const SUMMARY = [
    "Nhà nước ra đời do mâu thuẫn giai cấp không thể điều hòa được.",
    "Nhà nước là tổ chức chính trị của giai cấp thống trị về kinh tế.",
    "Nhà nước có chức năng thống trị chính trị và chức năng xã hội.",
    "Cách mạng xã hội là quy luật tất yếu khi QHSX kìm hãm LLSX.",
  ];

  return (
    <div className="relative flex h-full items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(/endings/ending-${ending.id}.png)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 bg-black/55" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 max-w-lg rounded-2xl bg-black/50 p-6 text-center backdrop-blur-sm"
      >
        <h2 className="mb-3 text-3xl font-extrabold text-amber-300 drop-shadow">{ending.title}</h2>
        <p className="mb-4 text-base leading-relaxed text-slate-100">{ending.body}</p>

        {/* Timeline */}
        <div className="mb-4">
          <Timeline />
        </div>

        {/* Tổng kết kiến thức */}
        <div className="mb-4 rounded-lg bg-black/40 p-3 text-left">
          <p className="mb-2 text-xs font-bold text-amber-300">📝 Tổng kết kiến thức:</p>
          <ul className="space-y-1">
            {SUMMARY.map((s, i) => (
              <li key={i} className="flex gap-2 text-xs leading-relaxed text-slate-300">
                <span className="text-emerald-400">✓</span>{s}
              </li>
            ))}
          </ul>
        </div>

        <div className="my-4 space-y-1.5 border-y border-white/15 py-3 text-left">
          {ENDING_NARRATION.map((l, i) => (
            <p key={i} className="text-sm italic leading-relaxed text-slate-300">{l}</p>
          ))}
        </div>

        <p className="mb-2 text-[10px] text-slate-400">
          Nguồn: Giáo trình Triết học Mác-Lênin, NXB CTQG Sự thật, 2021 · Slide Tiết 42-43
        </p>
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
