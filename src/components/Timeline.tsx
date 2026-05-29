"use client";

import { motion } from "framer-motion";

const STAGES = [
  { emoji: "🧑‍🌾", label: "Công xã nguyên thủy" },
  { emoji: "🔨", label: "Phát triển sản xuất" },
  { emoji: "💰", label: "Tư hữu ra đời" },
  { emoji: "😠", label: "Hình thành giai cấp" },
  { emoji: "🛡️", label: "Nhà nước ra đời" },
  { emoji: "👑", label: "Chức năng nhà nước" },
  { emoji: "🎓", label: "Nhà nước hiện đại" },
  { emoji: "📚", label: "Tổng kết" },
];

export default function Timeline() {
  return (
    <div className="rounded-xl bg-black/30 px-4 py-3">
      <p className="mb-3 text-center text-xs font-semibold text-slate-400">
        Hành trình xã hội loài người
      </p>
      <div className="flex items-center justify-between gap-1 overflow-x-auto">
        {STAGES.map((s, i) => (
          <div key={i} className="flex items-center">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: i * 0.12, type: "spring", stiffness: 200, damping: 18 }}
              className="flex flex-col items-center"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/20 ring-2 ring-emerald-400/60 shadow-[0_0_12px_rgba(52,211,153,0.3)]">
                <span className="text-lg">{s.emoji}</span>
              </div>
              <span className="mt-1.5 max-w-[64px] text-center text-[9px] leading-tight text-slate-300">
                {s.label}
              </span>
            </motion.div>
            {i < STAGES.length - 1 && (
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: i * 0.12 + 0.06, duration: 0.3 }}
                className="mx-0.5 h-0.5 w-4 shrink-0 origin-left bg-gradient-to-r from-emerald-500/60 to-amber-500/60 sm:w-6"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
