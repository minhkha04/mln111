import { create } from "zustand";
import { ORDERED_NPCS, SECONDARY_NPCS } from "@/game/content";
import { INITIAL_STATS, applyDelta, computeEnding } from "@/game/stats";
import type { Ending, Mode, NPC, Stats } from "@/game/types";

interface GameState {
  started: boolean;
  sceneIndex: number;
  mode: Mode;
  stats: Stats;
  lineIndex: number;
  quizResult: "correct" | "wrong" | null;
  cleared: boolean;
  puzzlePending: boolean;
  showHint: boolean;
  dialogueSeen: boolean;
  interactTs: number;
  ending: Ending | null;
  showAIUsage: boolean;
  // secondary NPC
  secondaryLineIndex: number;
  secondarySeen: boolean;
  // getters
  currentNpc: () => NPC | null;
  totalScenes: number;
  // actions
  start: () => void;
  closeLesson: () => void;
  interact: () => void;
  nextLine: () => void;
  closeTheory: () => void;
  answerQuiz: (index: number) => void;
  closeExplanation: () => void;
  closeDeepTheory: () => void;
  openPuzzle: () => void;
  closePuzzle: () => void;
  solvePuzzle: () => void;
  chooseOption: (index: number) => void;
  completeScene: (extra: Partial<Stats>) => void;
  exitToGate: () => void;
  // secondary NPC
  interactSecondary: () => void;
  nextSecondaryLine: () => void;
  closeSecondary: () => void;
  // AI Usage
  toggleAIUsage: () => void;
  reset: () => void;
}

function fresh() {
  return {
    started: false,
    sceneIndex: 0,
    mode: "lesson" as Mode,
    stats: { ...INITIAL_STATS },
    lineIndex: 0,
    quizResult: null as "correct" | "wrong" | null,
    cleared: false,
    puzzlePending: false,
    showHint: false,
    dialogueSeen: false,
    interactTs: 0,
    ending: null as Ending | null,
    showAIUsage: false,
    secondaryLineIndex: 0,
    secondarySeen: false,
  };
}

export const useGameStore = create<GameState>((set, get) => ({
  ...fresh(),
  totalScenes: ORDERED_NPCS.length,

  currentNpc: () => ORDERED_NPCS[get().sceneIndex] ?? null,

  // Bắt đầu game → hiện lesson intro màn đầu
  start: () => set({ started: true, mode: "lesson", sceneIndex: 0, lineIndex: 0 }),

  // Đóng lesson intro → chuyển sang explore
  closeLesson: () => set({ mode: "explore" }),

  interact: () => {
    const s = get();
    if (s.mode !== "explore" || s.cleared || s.puzzlePending) return;
    if (s.dialogueSeen) set({ mode: "quiz" });
    else set({ mode: "dialogue", lineIndex: 0, interactTs: Date.now() });
  },

  // Flow: dialogue → (npc.theory inline panel nếu có) → quiz
  nextLine: () => {
    const s = get();
    const npc = get().currentNpc();
    if (!npc || s.mode !== "dialogue") return;
    if (s.lineIndex < npc.lines.length - 1) {
      set({ lineIndex: s.lineIndex + 1 });
    } else if (npc.theory) {
      // Có inline theory từ NPC → hiện theory panel trước quiz
      set({ mode: "theory", dialogueSeen: true });
    } else if (npc.quiz) {
      set({ mode: "quiz", dialogueSeen: true });
    } else {
      set({ dialogueSeen: true });
      get().closeExplanation();
    }
  },

  // Đóng inline theory panel (npc.theory) → vào quiz
  closeTheory: () => set({ mode: "quiz" }),

  answerQuiz: (index) => {
    const s = get();
    const npc = get().currentNpc();
    if (!npc?.quiz || s.mode !== "quiz") return;
    const correct = index === npc.quiz.correctIndex;
    set({
      quizResult: correct ? "correct" : "wrong",
      mode: "explanation",
      stats: correct ? applyDelta(s.stats, { support: +5 }) : s.stats,
    });
  },

  // Sau explanation: sai → ghép tranh, đúng → deep theory panel (từ theory.ts)
  closeExplanation: () => {
    const s = get();
    const npc = get().currentNpc();
    if (!npc) return;
    if (s.quizResult === "wrong") {
      set({ mode: "explore", puzzlePending: true });
      return;
    }
    // Đúng → chuyển tới choice hoặc complete
    // (Deep theory panel sẽ được GameUI render trước choice dựa trên THEORY_DEEPS)
    if (npc.choices?.length) set({ mode: "choice" });
    else get().completeScene({});
  },

  // Sau deep theory panel (THEORY_DEEPS) → choice hoặc complete
  closeDeepTheory: () => {
    const npc = get().currentNpc();
    if (!npc) return;
    if (npc.choices?.length) set({ mode: "choice" });
    else get().completeScene({});
  },

  openPuzzle: () => {
    if (get().mode === "explore") set({ mode: "puzzle" });
  },

  closePuzzle: () => {
    if (get().mode === "puzzle") set({ mode: "explore" });
  },

  solvePuzzle: () => {
    const s = get();
    if (s.puzzlePending) {
      set({ puzzlePending: false, quizResult: null, mode: "explore", showHint: true });
    } else {
      set({ mode: "explore" });
    }
  },

  chooseOption: (index) => {
    const npc = get().currentNpc();
    if (!npc?.choices) return;
    get().completeScene(npc.choices[index].effect);
  },

  completeScene: (extra) => {
    const s = get();
    const npc = get().currentNpc();
    if (!npc) return;
    let stats = applyDelta(s.stats, npc.onComplete ?? {});
    stats = applyDelta(stats, extra);

    const isLast = s.sceneIndex >= ORDERED_NPCS.length - 1;
    if (isLast) {
      set({ stats, mode: "ending", ending: computeEnding(stats) });
    } else {
      set({ stats, mode: "explore", cleared: true });
    }
  },

  // Sang màn kế → hiện lesson intro
  exitToGate: () => {
    const s = get();
    if (!s.cleared) return;
    set({
      sceneIndex: s.sceneIndex + 1,
      mode: "lesson",
      cleared: false,
      lineIndex: 0,
      quizResult: null,
      showHint: false,
      dialogueSeen: false,
      secondaryLineIndex: 0,
      secondarySeen: false,
    });
  },

  // === Secondary NPC ===
  interactSecondary: () => {
    const s = get();
    if (s.mode !== "explore" || s.secondarySeen) return;
    const npc = get().currentNpc();
    if (!npc || !SECONDARY_NPCS[npc.id]) return;
    set({ mode: "secondary-dialogue", secondaryLineIndex: 0, interactTs: Date.now() });
  },

  nextSecondaryLine: () => {
    const s = get();
    const npc = get().currentNpc();
    if (!npc || s.mode !== "secondary-dialogue") return;
    const sec = SECONDARY_NPCS[npc.id];
    if (!sec) return;
    if (s.secondaryLineIndex < sec.lines.length - 1) {
      set({ secondaryLineIndex: s.secondaryLineIndex + 1 });
    } else {
      get().closeSecondary();
    }
  },

  closeSecondary: () => {
    set({ mode: "explore", secondarySeen: true });
  },

  toggleAIUsage: () => set((s) => ({ showAIUsage: !s.showAIUsage })),

  reset: () => set(fresh()),
}));
