"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import type { NPC, SceneBg } from "@/game/types";

const NPC_POS = { x: 72, y: 40 };
const PLAYER_START = { x: 20, y: 72 };
const GATE_POS = { x: 93, y: 50 };
const PUZZLE_POS = { x: 48, y: 22 };
const SPEED = 0.22;
const INTERACT_DIST = 15;
const GATE_DIST = 11;

interface Props {
  npc: NPC;
  scene: SceneBg;
  active: boolean;
  cleared: boolean; // đã xong NPC -> mở cổng
  puzzlePending: boolean; // trả lời sai -> hiện điểm ghép tranh
  onInteract: () => void;
  onExit: () => void;
  onOpenPuzzle: () => void;
}

export default function SceneStage({
  npc,
  scene,
  active,
  cleared,
  puzzlePending,
  onInteract,
  onExit,
  onOpenPuzzle,
}: Props) {
  const [pos, setPos] = useState(PLAYER_START);
  const posRef = useRef(PLAYER_START);
  const keys = useRef<Set<string>>(new Set());
  const activeRef = useRef(active);
  const clearedRef = useRef(cleared);
  const puzzleRef = useRef(puzzlePending);
  const exitedRef = useRef(false);
  const onInteractRef = useRef(onInteract);
  const onExitRef = useRef(onExit);
  const onOpenPuzzleRef = useRef(onOpenPuzzle);
  activeRef.current = active;
  clearedRef.current = cleared;
  puzzleRef.current = puzzlePending;
  onInteractRef.current = onInteract;
  onExitRef.current = onExit;
  onOpenPuzzleRef.current = onOpenPuzzle;

  const dist = Math.hypot(pos.x - NPC_POS.x, pos.y - NPC_POS.y);
  const near = dist < INTERACT_DIST;
  const nearPuzzle = Math.hypot(pos.x - PUZZLE_POS.x, pos.y - PUZZLE_POS.y) < INTERACT_DIST;

  useEffect(() => {
    posRef.current = PLAYER_START;
    setPos(PLAYER_START);
    exitedRef.current = false;
  }, [npc.id]);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      if (["arrowup", "arrowdown", "arrowleft", "arrowright", " "].includes(k)) e.preventDefault();
      keys.current.add(k);
      if (k === " " || k === "e") {
        if (!activeRef.current) return;
        const { x, y } = posRef.current;
        // gần điểm ghép tranh -> mở ghép tranh (chơi tự do, bất kể sai/đúng)
        if (Math.hypot(x - PUZZLE_POS.x, y - PUZZLE_POS.y) < INTERACT_DIST) {
          onOpenPuzzleRef.current();
        } else if (!clearedRef.current) {
          // gần NPC -> nói chuyện
          if (Math.hypot(x - NPC_POS.x, y - NPC_POS.y) < INTERACT_DIST)
            onInteractRef.current();
        }
      }
    };
    const up = (e: KeyboardEvent) => keys.current.delete(e.key.toLowerCase());
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);

    let raf = 0;
    const loop = () => {
      if (activeRef.current) {
        const k = keys.current;
        let { x, y } = posRef.current;
        if (k.has("arrowleft") || k.has("a")) x -= SPEED;
        if (k.has("arrowright") || k.has("d")) x += SPEED;
        if (k.has("arrowup") || k.has("w")) y -= SPEED;
        if (k.has("arrowdown") || k.has("s")) y += SPEED;
        x = Math.max(5, Math.min(95, x));
        y = Math.max(8, Math.min(92, y));
        if (x !== posRef.current.x || y !== posRef.current.y) {
          posRef.current = { x, y };
          setPos({ x, y });
        }
        // chạm cổng khi đã xong màn -> sang role kế
        if (clearedRef.current && !exitedRef.current) {
          const dg = Math.hypot(x - GATE_POS.x, y - GATE_POS.y);
          if (dg < GATE_DIST) {
            exitedRef.current = true;
            onExitRef.current();
          }
        }
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
      cancelAnimationFrame(raf);
    };
  }, []);

  const facingLeft = pos.x > NPC_POS.x;

  return (
    <div className="relative h-full min-h-[320px] w-full overflow-hidden rounded-2xl ring-1 ring-white/10">
      {/* Ảnh nền cảnh (top-down) */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(/scenes/scene-${npc.id}.png)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />


      {/* NPC (có bóng tròn dưới chân kiểu top-down) */}
      <div
        className="absolute -translate-x-1/2 -translate-y-1/2 text-center"
        style={{ left: `${NPC_POS.x}%`, top: `${NPC_POS.y}%` }}
      >
        <div className="mx-auto h-2 w-10 rounded-[50%] bg-black/40 blur-[1px]" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`/sprites/${npc.id}.png`}
          alt={npc.name}
          draggable={false}
          className="mx-auto -mt-2 h-40 w-40 object-contain drop-shadow-[0_6px_4px_rgba(0,0,0,0.5)]"
        />
        <div className="inline-block rounded-md bg-black/50 px-2 py-0.5 text-[11px] font-bold text-amber-200 backdrop-blur">
          {npc.name} {cleared && "✅"}
        </div>
      </div>

      {/* Mốc "Tiếp tục" — hiện khi đã xong NPC */}
      {cleared && (
        <div
          className="absolute -translate-x-1/2 -translate-y-1/2 text-center"
          style={{ left: `${GATE_POS.x}%`, top: `${GATE_POS.y}%` }}
        >
          <motion.div
            animate={{ scale: [1, 1.25, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ repeat: Infinity, duration: 1.4 }}
            className="mx-auto h-12 w-12 rounded-full bg-emerald-400/30 ring-2 ring-emerald-300"
          />
          <div className="-mt-9 inline-block rounded-md bg-emerald-600 px-2 py-0.5 text-[11px] font-bold text-white shadow-lg">
            Tiếp tục →
          </div>
        </div>
      )}

      {/* Điểm ghép tranh — luôn hiện trên map */}
      <div
        className="absolute -translate-x-1/2 -translate-y-1/2 text-center"
        style={{ left: `${PUZZLE_POS.x}%`, top: `${PUZZLE_POS.y}%`, opacity: puzzlePending ? 1 : 0.55 }}
      >
        <motion.div
          animate={puzzlePending ? { scale: [1, 1.18, 1], rotate: [0, 6, -6, 0] } : {}}
          transition={{ repeat: Infinity, duration: 1.4 }}
          className="text-[2.8rem] leading-none drop-shadow-[0_5px_3px_rgba(0,0,0,0.5)]"
        >
          🧩
        </motion.div>
        <div className="inline-block rounded-md bg-purple-600 px-2 py-0.5 text-[11px] font-bold text-white shadow-lg">
          Ghép tranh
        </div>
      </div>

      {/* Người chơi (bóng tròn + sprite nhìn từ trên xuống) */}
      <div
        className="absolute -translate-x-1/2 -translate-y-1/2 text-center"
        style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
      >
        <div className="mx-auto h-2 w-8 rounded-[50%] bg-black/40 blur-[1px]" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/sprites/player.png"
          alt="player"
          draggable={false}
          className="mx-auto -mt-2 h-36 w-36 object-contain drop-shadow-[0_5px_3px_rgba(0,0,0,0.5)]"
          style={{ transform: facingLeft ? "scaleX(-1)" : "none" }}
        />
      </div>

    </div>
  );
}
