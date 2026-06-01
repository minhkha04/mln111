"use client";

import { motion } from "framer-motion";

const TOOLS = [
  { name: "ChatGPT (GPT-4)", purpose: "Brainstorm ý tưởng game, soạn nháp nội dung lý thuyết", role: "Hỗ trợ sáng tạo" },
  { name: "Claude (Anthropic)", purpose: "Viết code Next.js/React, debug, tối ưu cấu trúc dự án", role: "Hỗ trợ lập trình" },
  { name: "Gemini (Google)", purpose: "Tạo hình ảnh sprite nhân vật, cảnh nền, tranh ghép", role: "Hỗ trợ thiết kế" },
];

const SOURCES = [
  "Giáo trình Triết học Mác-Lênin (NXB Chính trị quốc gia Sự thật, 2021)",
  "Slide bài giảng Tiết 42-43: \"Nhà nước và Cách mạng xã hội\"",
  "Hiến pháp nước CHXHCN Việt Nam 2013",
  "Các nghị quyết, chính sách được trích dẫn đều từ nguồn chính thống",
];

const AI_DID = [
  "Tạo framework code (Next.js, React components)",
  "Generate hình ảnh sprite, cảnh nền, tranh ghép (AI image generation)",
  "Soạn bản nháp thoại NPC, câu hỏi quiz",
  "Gợi ý cấu trúc nội dung lý thuyết",
];

const STUDENT_DID = [
  "Thiết kế gameplay, cốt truyện, hệ thống chỉ số",
  "Kiểm chứng toàn bộ nội dung lý thuyết bằng giáo trình chính thống",
  "Viết nội dung liên hệ thực tiễn Việt Nam",
  "Chỉnh sửa, biên tập toàn bộ output từ AI",
  "Playtest, cân bằng gameplay, sửa lỗi",
  "Thiết kế bài thuyết trình",
];

export default function AIUsage({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        initial={{ scale: 0.92, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 22 }}
        className="max-h-[90vh] w-full max-w-2xl overflow-auto rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-2xl"
      >
        <h2 className="mb-1 text-xl font-extrabold text-amber-300">📋 Phụ lục: Sử dụng AI có trách nhiệm</h2>
        <p className="mb-5 text-sm text-slate-400">Village of Classes — Ngôi làng giai cấp</p>

        <Section title="1. Công cụ AI đã sử dụng">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700 text-left text-slate-400">
                  <th className="py-2 pr-3">Công cụ</th>
                  <th className="py-2 pr-3">Mục đích</th>
                  <th className="py-2">Vai trò</th>
                </tr>
              </thead>
              <tbody>
                {TOOLS.map((t) => (
                  <tr key={t.name} className="border-b border-slate-800">
                    <td className="py-2 pr-3 font-medium text-slate-200">{t.name}</td>
                    <td className="py-2 pr-3 text-slate-300">{t.purpose}</td>
                    <td className="py-2 text-slate-400">{t.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        <Section title="2. Kiểm chứng thông tin">
          <ul className="space-y-1.5">
            {SOURCES.map((s, i) => (
              <li key={i} className="flex gap-2 text-sm text-slate-300">
                <span className="text-emerald-400">✓</span>{s}
              </li>
            ))}
          </ul>
        </Section>

        <Section title="3. Phân công: AI hỗ trợ vs Sinh viên thực hiện">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-3">
              <p className="mb-2 text-sm font-bold text-sky-300">🤖 AI hỗ trợ</p>
              <ul className="space-y-1">
                {AI_DID.map((item, i) => (
                  <li key={i} className="text-xs text-slate-400">• {item}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-3">
              <p className="mb-2 text-sm font-bold text-emerald-300">👨‍🎓 Sinh viên thực hiện</p>
              <ul className="space-y-1">
                {STUDENT_DID.map((item, i) => (
                  <li key={i} className="text-xs text-slate-300">• {item}</li>
                ))}
              </ul>
            </div>
          </div>
        </Section>

        <Section title="4. Cam kết liêm chính học thuật">
          <div className="rounded-lg border-l-4 border-amber-500 bg-amber-950/30 p-4">
            <p className="text-sm leading-relaxed text-amber-100">
              Nhóm cam kết: AI chỉ đóng vai trò <b>công cụ hỗ trợ</b>, không thay thế quá trình sáng tạo
              và học tập của sinh viên. Mọi nội dung lý thuyết trong game đã được <b>kiểm chứng bằng giáo
              trình và tài liệu chính thống</b>. Nhóm chịu trách nhiệm hoàn toàn về nội dung cuối cùng
              của sản phẩm.
            </p>
          </div>
        </Section>

        <button
          onClick={onClose}
          className="mt-5 w-full rounded-lg bg-slate-700 py-2.5 text-sm font-bold text-white hover:bg-slate-600"
        >
          Đóng
        </button>
      </motion.div>
    </motion.div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-5">
      <h3 className="mb-2 text-sm font-bold text-slate-200">{title}</h3>
      {children}
    </div>
  );
}
