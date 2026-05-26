import { create } from "zustand";
import { ORDERED_NPCS } from "@/game/content";
import { INITIAL_STATS, applyDelta, computeEnding } from "@/game/stats";
import type { Ending, Mode, NPC, Stats } from "@/game/types";

interface GameState {
  started: boolean;
  sceneIndex: number; // màn hiện tại (0..n-1)
  mode: Mode;
  stats: Stats;
  lineIndex: number;
  quizResult: "correct" | "wrong" | null;
  cleared: boolean; // đã nói chuyện xong NPC màn này -> mở cổng
  puzzlePending: boolean; // trả lời sai -> phải ghép tranh trước khi trả lời lại
  showHint: boolean; // hiện gợi ý sau khi ghép tranh xong
  dialogueSeen: boolean; // đã xem thoại NPC màn này -> lần sau vào thẳng câu hỏi
  interactTs: number; // mốc thời gian mở thoại (chặn lần nhấn Space mở thoại tự nhảy dòng)
  ending: Ending | null;
  // getters
  currentNpc: () => NPC | null;
  totalScenes: number;
  // actions
  start: () => void;
  interact: () => void;
  nextLine: () => void;
  answerQuiz: (index: number) => void;
  closeExplanation: () => void;
  openPuzzle: () => void;
  closePuzzle: () => void;
  solvePuzzle: () => void;
  chooseOption: (index: number) => void;
  completeScene: (extra: Partial<Stats>) => void;
  exitToGate: () => void;
  reset: () => void;
}

function fresh() {
  return {
    started: false,
    sceneIndex: 0,
    mode: "dialogue" as Mode,
    stats: { ...INITIAL_STATS },
    lineIndex: 0,
    quizResult: null as "correct" | "wrong" | null,
    cleared: false,
    puzzlePending: false,
    showHint: false,
    dialogueSeen: false,
    interactTs: 0,
    ending: null as Ending | null,
  };
}

export const useGameStore = create<GameState>((set, get) => ({
  ...fresh(),
  totalScenes: ORDERED_NPCS.length,

  currentNpc: () => ORDERED_NPCS[get().sceneIndex] ?? null,

  start: () => set({ started: true, mode: "explore", sceneIndex: 0, lineIndex: 0 }),

  interact: () => {
    const s = get();
    if (s.mode !== "explore" || s.cleared || s.puzzlePending) return;
    // đã xem thoại rồi -> vào thẳng câu hỏi, chưa thì xem thoại trước
    if (s.dialogueSeen) set({ mode: "quiz" });
    else set({ mode: "dialogue", lineIndex: 0, interactTs: Date.now() });
  },

  nextLine: () => {
    const s = get();
    const npc = get().currentNpc();
    if (!npc || s.mode !== "dialogue") return;
    if (s.lineIndex < npc.lines.length - 1) {
      set({ lineIndex: s.lineIndex + 1 });
    } else if (npc.quiz) {
      set({ mode: "quiz", dialogueSeen: true });
    } else {
      set({ dialogueSeen: true });
      get().closeExplanation();
    }
  },

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

  closeExplanation: () => {
    const s = get();
    const npc = get().currentNpc();
    if (!npc) return;
    // Trả lời sai -> ra map, phải tới điểm ghép tranh rồi nhấn Space
    if (s.quizResult === "wrong") {
      set({ mode: "explore", puzzlePending: true });
      return;
    }
    if (npc.choices?.length) set({ mode: "choice" });
    else get().completeScene({});
  },

  // tới điểm ghép tranh + Space -> mở ghép tranh (chơi tự do, không cần sai)
  openPuzzle: () => {
    if (get().mode === "explore") set({ mode: "puzzle" });
  },

  closePuzzle: () => {
    if (get().mode === "puzzle") set({ mode: "explore" });
  },

  solvePuzzle: () => {
    const s = get();
    if (s.puzzlePending) {
      // ghép tranh bắt buộc do trả lời sai -> quay lại tìm NPC trả lời, kèm gợi ý
      set({ puzzlePending: false, quizResult: null, mode: "explore", showHint: true });
    } else {
      // chơi tự do -> chỉ đóng lại
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
      // màn cuối: xong là kết thúc luôn
      set({ stats, mode: "ending", ending: computeEnding(stats) });
    } else {
      // mở cổng, người chơi đi tới cổng để sang màn mới
      set({ stats, mode: "explore", cleared: true });
    }
  },

  // người chơi chạm cổng -> sang màn (role) kế tiếp
  exitToGate: () => {
    const s = get();
    if (!s.cleared) return;
    set({
      sceneIndex: s.sceneIndex + 1,
      mode: "explore",
      cleared: false,
      lineIndex: 0,
      quizResult: null,
      showHint: false,
      dialogueSeen: false,
    });
  },

  reset: () => set(fresh()),
}));
