"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { Puzzle } from "@/game/types";

function shuffledPieces(): number[] {
  const a = [...Array(9).keys()];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

type Drag = { src: "tray"; piece: number } | { src: "board"; slot: number } | null;

// Một mảnh: nếu có ảnh -> hiện lát ảnh tương ứng, không thì hiện emoji.
function Piece({ puzzle, index }: { puzzle: Puzzle; index: number }) {
  if (puzzle.image) {
    const col = index % 3;
    const row = Math.floor(index / 3);
    return (
      <div
        className="h-full w-full rounded-md"
        style={{
          backgroundImage: `url(${puzzle.image})`,
          backgroundSize: "300% 300%",
          backgroundPosition: `${col * 50}% ${row * 50}%`,
        }}
      />
    );
  }
  return <span>{puzzle.tiles[index]}</span>;
}

export default function PuzzleGame({
  puzzle,
  onSolve,
  onExit,
}: {
  puzzle: Puzzle;
  onSolve: () => void;
  onExit: () => void;
}) {
  const [tray, setTray] = useState<number[]>(shuffledPieces);
  const [board, setBoard] = useState<(number | null)[]>(Array(9).fill(null));
  const [drag, setDrag] = useState<Drag>(null);
  const [wrong, setWrong] = useState<number[]>([]);
  const [solved, setSolved] = useState(false);

  const filledAll = board.every((p) => p !== null);

  // Thả vào một ô trên bảng
  const dropOnSlot = (slot: number) => {
    if (!drag || solved) return;
    setWrong([]);
    const nb = [...board];
    let nt = [...tray];

    if (drag.src === "tray") {
      const piece = drag.piece;
      const occupant = nb[slot];
      nb[slot] = piece;
      nt = nt.filter((p) => p !== piece);
      if (occupant !== null) nt.push(occupant); // ô có sẵn -> trả về khay
    } else {
      const from = drag.slot;
      const piece = nb[from];
      nb[from] = nb[slot]; // hoán đổi 2 ô
      nb[slot] = piece;
    }
    setBoard(nb);
    setTray(nt);
    setDrag(null);
  };

  // Thả về khay
  const dropOnTray = () => {
    if (!drag || solved) return;
    if (drag.src === "board") {
      setWrong([]);
      const piece = board[drag.slot];
      const nb = [...board];
      nb[drag.slot] = null;
      setBoard(nb);
      if (piece !== null) setTray((t) => [...t, piece]);
    }
    setDrag(null);
  };

  const check = () => {
    if (!filledAll) return;
    const bad = board.map((p, i) => (p === i ? -1 : i)).filter((i) => i >= 0);
    if (bad.length === 0) {
      setSolved(true);
      setTimeout(onSolve, 1100);
    } else {
      setWrong(bad);
      setTimeout(() => setWrong([]), 1200);
    }
  };

  return (
    <div className="relative text-center">
      <button
        onClick={onExit}
        className="absolute -right-1 -top-1 rounded-lg bg-slate-700 px-3 py-1 text-sm font-bold text-white hover:bg-rose-600"
      >
        ✕ Thoát
      </button>
      <p className="mb-1 text-lg font-bold text-rose-300">
        🧩 Ghép lại bức tranh để ôn tập
      </p>
      <p className="mb-4 text-sm text-slate-300">
        <b className="text-amber-200">{puzzle.caption}</b> — {puzzle.concept}
      </p>

      <div className="flex flex-wrap items-start justify-center gap-6">
        {/* Tranh mẫu */}
        <div className="shrink-0">
          <p className="mb-1 text-xs text-slate-500">Tranh mẫu</p>
          {puzzle.image ? (
            <div
              className="h-40 w-40 rounded-md ring-1 ring-white/10"
              style={{ backgroundImage: `url(${puzzle.image})`, backgroundSize: "cover", backgroundPosition: "center" }}
            />
          ) : (
            <div className={`grid grid-cols-3 gap-px overflow-hidden rounded-md bg-gradient-to-br ${puzzle.bg} p-1 ring-1 ring-white/10`}>
              {puzzle.tiles.map((t, i) => (
                <span key={i} className="flex h-9 w-9 items-center justify-center text-lg opacity-90">
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Bảng ghép */}
        <div>
          <p className="mb-1 text-xs text-slate-500">Bảng ghép — kéo mảnh vào</p>
          <div
            className={`grid grid-cols-3 gap-1.5 rounded-xl bg-gradient-to-br ${puzzle.bg} p-2 ring-1 ring-white/10`}
          >
            {board.map((piece, slot) => {
              const filled = piece !== null;
              const isWrong = wrong.includes(slot);
              return (
                <motion.div
                  key={slot}
                  draggable={filled && !solved}
                  onDragStart={() => filled && setDrag({ src: "board", slot })}
                  onDragEnd={() => setDrag(null)}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => dropOnSlot(slot)}
                  animate={isWrong ? { x: [0, -6, 6, -6, 0] } : {}}
                  className={`flex h-28 w-28 items-center justify-center overflow-hidden rounded-lg text-5xl transition-colors ${
                    isWrong
                      ? "bg-rose-500/40 ring-2 ring-rose-400"
                      : filled
                        ? "cursor-grab bg-black/25 ring-1 ring-white/20 active:cursor-grabbing"
                        : drag
                          ? "bg-amber-400/10 ring-2 ring-dashed ring-amber-300/60"
                          : "bg-black/30 ring-1 ring-white/10"
                  }`}
                >
                  {filled ? <Piece puzzle={puzzle} index={piece!} /> : ""}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Khay mảnh ghép */}
      {!solved && (
        <div
          className="mx-auto mt-5 max-w-xl"
          onDragOver={(e) => e.preventDefault()}
          onDrop={dropOnTray}
        >
          <p className="mb-1 text-xs text-slate-500">Khay mảnh ghép — kéo vào bảng (kéo ngược lại để gỡ)</p>
          <div className="flex min-h-[4rem] flex-wrap justify-center gap-2 rounded-xl border border-dashed border-slate-700 bg-slate-800/40 p-2">
            {tray.length === 0 ? (
              <span className="self-center py-2 text-xs text-slate-500">— đã đặt hết, bấm Kiểm tra —</span>
            ) : (
              tray.map((piece) => (
                <motion.div
                  key={piece}
                  draggable
                  onDragStart={() => setDrag({ src: "tray", piece })}
                  onDragEnd={() => setDrag(null)}
                  whileHover={{ scale: 1.1 }}
                  className={`flex h-20 w-20 cursor-grab items-center justify-center overflow-hidden rounded-lg bg-slate-700 text-4xl ring-1 ring-white/10 active:cursor-grabbing ${
                    drag?.src === "tray" && drag.piece === piece ? "opacity-40" : ""
                  }`}
                >
                  <Piece puzzle={puzzle} index={piece} />
                </motion.div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Nút kiểm tra / kết quả */}
      {solved ? (
        <motion.p
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-5 text-base font-bold text-emerald-400"
        >
          ✅ Đã ôn xong! Quay lại trả lời câu hỏi…
        </motion.p>
      ) : (
        <div className="mt-5">
          {wrong.length > 0 && (
            <p className="mb-2 text-sm text-rose-400">Chưa đúng, hãy sửa các ô được tô đỏ.</p>
          )}
          <button
            onClick={check}
            disabled={!filledAll}
            className="rounded-xl bg-emerald-600 px-8 py-2.5 text-sm font-bold text-white hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Kiểm tra
          </button>
        </div>
      )}
    </div>
  );
}
