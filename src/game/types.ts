// Village of Classes — 2D RPG đối thoại + quiz

export type StatKey =
  | "wealthGap" // Khoảng cách giàu nghèo
  | "stability" // Độ ổn định xã hội
  | "conflict" // Mâu thuẫn giai cấp
  | "statePower" // Quyền lực nhà nước
  | "support"; // Sự ủng hộ của người dân

export type Stats = Record<StatKey, number>;

export type Locale = "vi" | "en";

export interface Quiz {
  question: string;
  options: string[]; // gồm tiền tố A. B. ...
  correctIndex: number;
  explanation?: string;
  hint?: string; // gợi ý hiện sau khi ghép tranh xong
}

// Một lựa chọn tác động chỉ số (hệ thống lựa chọn của content.md)
export interface Choice {
  label: string;
  effect: Partial<Stats>;
}

export interface NPC {
  id: string;
  name: string;
  role: string; // vai trò hiển thị
  sprite: string; // emoji đại diện
  color: number; // màu khối pixel trên map
  x: number; // toạ độ ô trên map
  y: number;
  order: number; // thứ tự cốt truyện (1..n)
  stage: number; // giai đoạn tương ứng
  requiresStateBorn?: boolean; // chỉ xuất hiện sau khi nhà nước ra đời
  lines: string[]; // lời thoại (gõ chữ từng dòng)
  quiz?: Quiz;
  onComplete?: Partial<Stats>; // tác động chỉ số khi nói chuyện xong
  choices?: Choice[]; // lựa chọn sau thoại (nếu có)
}

// Khung cảnh của mỗi màn (placeholder bằng icon, chờ art thật)
export interface SceneBg {
  setting: string; // tên bối cảnh
  bg: string; // tailwind gradient classes
  icons: string[]; // emoji trang trí rải nền
}

export type Mode =
  | "explore" // đi bộ trong màn, chưa nói chuyện
  | "dialogue"
  | "quiz"
  | "explanation"
  | "puzzle" // ghép tranh khi trả lời sai
  | "choice"
  | "transition"
  | "ending";

// Tranh ghép (jigsaw 3x3) — phạt khi trả lời sai, ôn lại khái niệm
export interface Puzzle {
  id: string;
  caption: string; // tên tranh / khái niệm
  concept: string; // mô tả ý nghĩa bài học
  bg: string; // tailwind gradient nền (dự phòng)
  tiles: string[]; // 9 emoji dự phòng nếu chưa có ảnh
  image?: string; // ảnh thật, sẽ cắt 3x3 (vd "/puzzles/commune.png")
}

export interface Ending {
  id: string;
  title: string;
  body: string;
  emoji: string;
}
