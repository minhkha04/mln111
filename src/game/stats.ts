import type { Ending, Stats } from "./types";

export const INITIAL_STATS: Stats = {
  wealthGap: 0,
  stability: 100,
  conflict: 0,
  statePower: 0,
  support: 50,
};

export function clampStats(s: Stats): Stats {
  const out = { ...s };
  (Object.keys(out) as (keyof Stats)[]).forEach((k) => {
    out[k] = Math.max(0, Math.min(100, Math.round(out[k])));
  });
  return out;
}

export function applyDelta(s: Stats, d: Partial<Stats>): Stats {
  const out = { ...s };
  (Object.keys(d) as (keyof Stats)[]).forEach((k) => {
    out[k] = out[k] + (d[k] ?? 0);
  });
  return clampStats(out);
}

// Nhà nước ra đời khi mâu thuẫn + khoảng cách giàu nghèo đủ cao.
export function isStateBorn(s: Stats): boolean {
  return s.conflict >= 40 && s.wealthGap >= 30;
}

// Nhiều ending theo chỉ số cuối (hệ thống ending của content.md).
export function computeEnding(s: Stats): Ending {
  if (s.conflict >= 60 && s.support >= 55 && s.stability < 50) {
    return {
      id: "revolution",
      emoji: "✊",
      title: "Cách mạng xã hội",
      body: "Mâu thuẫn giai cấp bùng nổ thành cách mạng. Quần chúng lật đổ trật tự cũ — đúng quy luật khi mâu thuẫn giữa lực lượng sản xuất và quan hệ sản xuất lên đến đỉnh điểm.",
    };
  }
  if (s.statePower >= 55 && s.support < 45) {
    return {
      id: "oppressive",
      emoji: "🛡️",
      title: "Nhà nước áp bức",
      body: "Bạn củng cố quyền lực nhà nước để bảo vệ giai cấp thống trị. Trật tự được duy trì, nhưng bằng cưỡng chế và sự bất mãn âm ỉ của dân chúng.",
    };
  }
  return {
    id: "reform",
    emoji: "⚖️",
    title: "Nhà nước điều hòa",
    body: "Bạn dung hòa lợi ích các giai cấp. Nhà nước ra đời như một bộ máy quản lý xã hội — nhưng mâu thuẫn giai cấp vẫn tồn tại bên dưới bề mặt ổn định.",
  };
}
