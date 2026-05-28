import type { NPC, Puzzle, SceneBg } from "./types";

// Nội dung lấy từ flow.md (Content Writer Pack). Tiếng Việt theo bản gốc.
export const INTRO = [
  "Ngày xưa, trong một ngôi làng nhỏ,",
  "mọi người cùng lao động và chia sẻ tài nguyên.",
  "Không ai sở hữu quá nhiều. Không có giàu nghèo. Không có nhà nước.",
];

export const NPCS: NPC[] = [
  {
    id: "farmer",
    name: "Người Nông Dân",
    role: "Farmer — Người lao động",
    sprite: "🧑‍🌾",
    color: 0x6abe30,
    x: 3,
    y: 3,
    order: 1,
    stage: 1,
    lines: [
      "Chúng tôi cùng nhau trồng trọt và săn bắt.",
      "Ai cũng có phần như nhau. Không ai giàu hơn ai cả.",
    ],
    theory:
      "Nguồn gốc nhà nước — Công xã nguyên thủy: công cụ sản xuất lạc hậu (đồ đá), năng suất thấp, KHÔNG có của dư thừa. Do chưa có chế độ tư hữu nên chưa có giai cấp, vì vậy nhà nước CHƯA xuất hiện.",
    quiz: {
      question: "Trong xã hội công xã nguyên thủy, vì sao nhà nước chưa xuất hiện?",
      options: [
        "A. Vì chưa có chiến tranh",
        "B. Vì chưa có pháp luật",
        "C. Vì chưa xuất hiện giai cấp",
        "D. Vì dân số còn ít",
      ],
      correctIndex: 2,
      explanation:
        "Trong xã hội nguyên thủy, chưa tồn tại chế độ tư hữu và giai cấp, nên chưa cần nhà nước để duy trì sự thống trị xã hội.",
      hint: "💡 Nhà nước chỉ xuất hiện khi xã hội tách thành các giai cấp đối kháng. Vậy thứ gì CHƯA có trong công xã nguyên thủy?",
    },
    onComplete: { support: +10 },
  },
  {
    id: "craftsman",
    name: "Người Thợ Thủ Công",
    role: "Craftsman — Lực lượng sản xuất",
    sprite: "🧑‍🏭",
    color: 0xd9a066,
    x: 7,
    y: 2,
    order: 2,
    stage: 2,
    lines: [
      "Công cụ mới giúp chúng tôi sản xuất nhiều hơn.",
      "Bây giờ đã có của cải dư thừa.",
    ],
    theory:
      "Nguyên nhân SÂU XA ra đời nhà nước: sự phát triển của lực lượng sản xuất (công cụ tiến bộ — đồ đồng) làm năng suất tăng, dẫn đến của cải DƯ THỪA tương đối. Đây là tiền đề vật chất làm xuất hiện chế độ tư hữu.",
    quiz: {
      question: "Sự phát triển của lực lượng sản xuất dẫn đến điều gì?",
      options: [
        "A. Nhà nước biến mất",
        "B. Xuất hiện của cải dư thừa",
        "C. Xóa bỏ giai cấp",
        "D. Không thay đổi xã hội",
      ],
      correctIndex: 1,
      explanation:
        "Lực lượng sản xuất phát triển tạo ra của cải dư thừa — tiền đề vật chất cho tư hữu và phân hóa giai cấp về sau.",
      hint: "💡 Công cụ tốt hơn → làm ra nhiều hơn mức cần dùng. Phần làm ra nhiều hơn đó gọi là gì?",
    },
    onComplete: { support: +5 },
  },
  {
    id: "merchant",
    name: "Thương Nhân",
    role: "Merchant — Người tích lũy tài sản",
    sprite: "🤵",
    color: 0xffd700,
    x: 11,
    y: 3,
    order: 3,
    stage: 3,
    lines: [
      "Tôi làm việc chăm chỉ hơn người khác.",
      "Tôi có quyền giữ nhiều tài sản hơn.",
      "(Một Worker gần đó thì thầm: Nhưng chúng tôi ngày càng nghèo. Mọi thứ không còn công bằng nữa.)",
    ],
    theory:
      "Chế độ TƯ HỮU về tư liệu sản xuất ra đời khi một số người chiếm của dư làm của riêng. Tư hữu là nguyên nhân TRỰC TIẾP làm xã hội phân hóa thành các giai cấp có lợi ích đối lập (giàu — nghèo).",
    quiz: {
      question: "Nguyên nhân trực tiếp dẫn đến sự phân hóa giai cấp là gì?",
      options: [
        "A. Dân số tăng",
        "B. Xuất hiện tư hữu",
        "C. Xuất hiện tôn giáo",
        "D. Thiên tai",
      ],
      correctIndex: 1,
      explanation:
        "Chế độ tư hữu về tư liệu sản xuất là nguyên nhân trực tiếp làm xã hội phân hóa thành giai cấp.",
      hint: "💡 Khi một số người bắt đầu chiếm của dư làm 'của riêng', chế độ gì ra đời và gây phân hóa?",
    },
    onComplete: { wealthGap: +35 },
    choices: [
      { label: "Chia lại tài nguyên cho người nghèo", effect: { wealthGap: -15, conflict: -10, support: +10, stability: +5 } },
      { label: "Bảo vệ quyền sở hữu của thương nhân", effect: { wealthGap: +10, conflict: +10, statePower: +5, support: -5 } },
      { label: "Thương lượng hòa bình giữa hai bên", effect: { conflict: -5, stability: +5, support: +5 } },
    ],
  },
  {
    id: "worker",
    name: "Người Lao Động Phẫn Nộ",
    role: "Worker — Giai cấp bị bóc lột",
    sprite: "😠",
    color: 0xac3232,
    x: 11,
    y: 7,
    order: 4,
    stage: 5,
    lines: [
      "Chúng tôi làm việc cả ngày, nhưng vẫn không đủ thức ăn.",
      "Trong khi người giàu ngày càng giàu hơn.",
      "(Thương nhân giàu đáp: Ta sở hữu đất đai và công cụ. Họ phải làm việc cho ta.)",
    ],
    theory:
      "Nguyên nhân TRỰC TIẾP ra đời nhà nước: mâu thuẫn giai cấp gay gắt đến mức KHÔNG THỂ ĐIỀU HÒA. Theo Lenin: “Nhà nước là sản phẩm và biểu hiện của những mâu thuẫn giai cấp không thể điều hòa được.” Đây cũng là cội nguồn của cách mạng xã hội.",
    quiz: {
      question: "Theo Lenin, nhà nước ra đời vì nguyên nhân nào?",
      options: [
        "A. Để phát triển khoa học",
        "B. Vì mâu thuẫn giai cấp không thể điều hòa",
        "C. Vì nhu cầu tôn giáo",
        "D. Vì chiến tranh",
      ],
      correctIndex: 1,
      explanation:
        "Nhà nước là sản phẩm và biểu hiện của những mâu thuẫn giai cấp không thể điều hòa được. — V. I. Lenin",
      hint: "💡 Nhớ câu nói nổi tiếng của Lenin ở đầu game: nhà nước sinh ra từ điều gì 'không thể điều hòa'?",
    },
    onComplete: { conflict: +45 },
    choices: [
      { label: "Ủng hộ người nghèo đấu tranh", effect: { conflict: +10, support: +10, stability: -10 } },
      { label: "Ủng hộ người giàu giữ trật tự", effect: { statePower: +10, conflict: -5, support: -10 } },
      { label: "Dùng bạo lực dẹp bất ổn", effect: { conflict: -15, stability: +5, statePower: +10, support: -15 } },
    ],
  },
  {
    id: "guard",
    name: "Lính Gác",
    role: "Guard — Bộ máy cưỡng chế",
    sprite: "💂",
    color: 0x4b5bab,
    x: 7,
    y: 5,
    order: 5,
    stage: 6,
    requiresStateBorn: true,
    lines: [
      "Mâu thuẫn xã hội ngày càng gay gắt.",
      "Người giàu muốn bảo vệ tài sản. Người nghèo muốn thay đổi xã hội.",
      "Từ hôm nay, luật pháp sẽ được thực thi trong ngôi làng này.",
    ],
    theory:
      "Bản chất nhà nước: là tổ chức chính trị của giai cấp thống trị về kinh tế, nhằm bảo vệ trật tự hiện hành và đàn áp sự phản kháng của các giai cấp khác. 3 đặc trưng: (1) quản lý cư dân theo lãnh thổ; (2) có cơ quan quyền lực cưỡng chế (quân đội, cảnh sát); (3) có hệ thống thuế khóa.",
    quiz: {
      question: "Nhà nước là gì theo quan điểm Marx – Lenin?",
      options: [
        "A. Tổ chức tôn giáo",
        "B. Tổ chức trung lập tuyệt đối",
        "C. Tổ chức chính trị của giai cấp thống trị",
        "D. Tổ chức giáo dục xã hội",
      ],
      correctIndex: 2,
      explanation:
        "Nhà nước là tổ chức chính trị của giai cấp thống trị, dùng để duy trì sự thống trị đối với các giai cấp khác.",
      hint: "💡 Nhà nước không trung lập — nó phục vụ và bảo vệ lợi ích của giai cấp nào?",
    },
    onComplete: { statePower: +20, stability: +10 },
  },
  {
    id: "chief",
    name: "Trưởng Làng",
    role: "Village Chief — Đại diện quyền lực",
    sprite: "🧓",
    color: 0x8f563b,
    x: 7,
    y: 8,
    order: 6,
    stage: 6,
    requiresStateBorn: true,
    lines: [
      "Chúng ta cần luật pháp, thuế và lực lượng bảo vệ",
      "để duy trì trật tự xã hội.",
    ],
    theory:
      "Chức năng cơ bản của nhà nước: theo tính chất gồm chức năng thống trị chính trị (duy trì sự thống trị, bảo vệ lợi ích giai cấp) và chức năng xã hội (quản lý, thúc đẩy XH phát triển); theo phạm vi gồm chức năng đối nội (luật pháp, văn hóa, y tế, giáo dục) và đối ngoại (bảo vệ lãnh thổ, trao đổi quốc tế).",
    quiz: {
      question: "Đâu là chức năng của nhà nước?",
      options: [
        "A. Quản lý xã hội",
        "B. Bảo vệ lợi ích giai cấp thống trị",
        "C. Duy trì trật tự xã hội",
        "D. Tất cả đáp án trên",
      ],
      correctIndex: 3,
      explanation:
        "Nhà nước vừa quản lý xã hội, vừa duy trì trật tự, vừa bảo vệ lợi ích của giai cấp thống trị.",
      hint: "💡 Cả ba việc: quản lý xã hội, duy trì trật tự, bảo vệ giai cấp thống trị — đều đúng. Vậy chọn đáp án nào?",
    },
    onComplete: { statePower: +10 },
  },
  {
    id: "student",
    name: "Sinh Viên",
    role: "Student — Liên hệ hiện đại",
    sprite: "🧑‍🎓",
    color: 0x5b6ee1,
    x: 3,
    y: 8,
    order: 7,
    stage: 6,
    requiresStateBorn: true,
    lines: [
      "Ngày nay, nhà nước còn quản lý:",
      "AI, mạng xã hội, thuế, giáo dục và an sinh xã hội.",
    ],
    theory:
      "Cách mạng xã hội hiện nay: thời đại CMCN 4.0, kinh tế tri thức, xu hướng đối thoại thay đối đầu. CMXH có xu hướng diễn ra dưới hình thức chuyển hóa dần dần sang hình thái KT-XH tiến bộ hơn. Nhà nước hiện đại đồng thời quản lý xã hội, ổn định chính trị và điều tiết kinh tế. Mục tiêu của Việt Nam: dân giàu, nước mạnh, công bằng, dân chủ, văn minh.",
    quiz: {
      question: "Trong xã hội hiện đại, nhà nước có vai trò gì?",
      options: [
        "A. Quản lý xã hội",
        "B. Ổn định chính trị",
        "C. Điều tiết kinh tế",
        "D. Tất cả đáp án trên",
      ],
      correctIndex: 3,
      explanation:
        "Nhà nước hiện đại đảm nhiệm đồng thời quản lý xã hội, ổn định chính trị và điều tiết kinh tế.",
      hint: "💡 Nhà nước hôm nay làm rất nhiều việc cùng lúc — quản lý xã hội, ổn định chính trị, điều tiết kinh tế. Đáp án nào bao trùm tất cả?",
    },
    onComplete: { support: +5 },
  },
  {
    id: "scholar",
    name: "Học Giả",
    role: "Scholar — Giải thích triết học",
    sprite: "📚",
    color: 0x76428a,
    x: 13,
    y: 5,
    order: 8,
    stage: 1,
    lines: [
      "Ta là người ghi chép lịch sử ngôi làng.",
      "Hãy trả lời một câu hỏi ôn tập nhé.",
    ],
    theory:
      "Nguồn gốc cách mạng xã hội: nguyên nhân sâu xa là mâu thuẫn giữa lực lượng sản xuất (LLSX) phát triển với quan hệ sản xuất (QHSX) đã lỗi thời kìm hãm nó. Mâu thuẫn cơ bản này biểu hiện thành đấu tranh giai cấp, tất yếu dẫn tới cách mạng xã hội — đỉnh cao của đấu tranh giai cấp.",
    quiz: {
      question: "Mâu thuẫn cơ bản dẫn đến cách mạng xã hội là gì?",
      options: [
        "A. Mâu thuẫn dân tộc",
        "B. Mâu thuẫn tôn giáo",
        "C. Mâu thuẫn giữa lực lượng sản xuất và quan hệ sản xuất",
        "D. Mâu thuẫn văn hóa",
      ],
      correctIndex: 2,
      explanation:
        "Mâu thuẫn giữa lực lượng sản xuất và quan hệ sản xuất là mâu thuẫn cơ bản thúc đẩy cách mạng xã hội.",
      hint: "💡 Cách mạng xã hội bắt nguồn từ mâu thuẫn giữa cái 'làm ra của cải' và cái 'quan hệ sở hữu'. Đó là hai yếu tố nào?",
    },
    onComplete: { support: +5 },
  },
];

// Khung cảnh từng màn (keyed theo id NPC). Icon là placeholder, sẽ thay bằng art.
export const SCENES: Record<string, SceneBg> = {
  farmer: {
    setting: "Cánh đồng chung — Bình minh công xã",
    bg: "from-amber-300/30 via-emerald-700 to-emerald-950",
    icons: ["🌾", "🌅", "🏕️", "🐄", "🌱", "🌾", "☀️", "🌿"],
  },
  craftsman: {
    setting: "Xưởng thủ công — Công cụ mới",
    bg: "from-orange-300/30 via-amber-800 to-stone-900",
    icons: ["🔨", "⚒️", "🪵", "🏚️", "🌾", "🛠️", "📦", "🔧"],
  },
  merchant: {
    setting: "Khu chợ & nhà kho — Của riêng",
    bg: "from-yellow-300/30 via-amber-800 to-stone-950",
    icons: ["💰", "🏠", "⚖️", "📦", "🪙", "💎", "🛖", "🪙"],
  },
  worker: {
    setting: "Xóm nghèo — Bất mãn dâng cao",
    bg: "from-rose-400/30 via-rose-950 to-stone-950",
    icons: ["😠", "🔥", "✊", "🏚️", "⛓️", "💢", "🥀", "🔥"],
  },
  guard: {
    setting: "Cổng làng — Luật pháp ra đời",
    bg: "from-indigo-400/30 via-indigo-950 to-slate-950",
    icons: ["💂", "⚖️", "📜", "🚧", "🛡️", "⛓️", "🏰", "📜"],
  },
  chief: {
    setting: "Nhà hội đồng làng — Bộ máy nhà nước",
    bg: "from-amber-300/30 via-stone-700 to-slate-950",
    icons: ["🏛️", "📜", "💰", "🪑", "🔔", "⚖️", "🗳️", "📜"],
  },
  student: {
    setting: "Thành phố hiện đại — Nhà nước hôm nay",
    bg: "from-sky-400/30 via-indigo-900 to-slate-950",
    icons: ["🏙️", "🤖", "📱", "💡", "🌐", "🚇", "💳", "📡"],
  },
  scholar: {
    setting: "Thư phòng học giả — Ôn tập",
    bg: "from-purple-300/30 via-purple-950 to-slate-950",
    icons: ["📚", "🕯️", "📜", "🪶", "🔖", "🗺️", "⏳", "📖"],
  },
};

// Danh sách màn chơi theo đúng thứ tự cốt truyện
export const ORDERED_NPCS: NPC[] = [...NPCS].sort((a, b) => a.order - b.order);

// Tranh ghép (jigsaw) — mỗi bức minh họa một khái niệm bài học bằng 9 ô emoji.
export const PUZZLES: Record<string, Puzzle> = {
  commune: {
    id: "commune",
    caption: "Công xã nguyên thủy",
    concept: "Lao động chung, chia đều, chưa có tư hữu nên chưa có giai cấp.",
    bg: "from-amber-300/40 via-emerald-700 to-emerald-900",
    tiles: ["☀️", "☁️", "🌾", "🧑", "🤝", "🧑", "🌿", "🔥", "🌿"],
    image: "/puzzles/commune.png",
  },
  surplus: {
    id: "surplus",
    caption: "Của cải dư thừa",
    concept: "Công cụ phát triển → năng suất tăng → xuất hiện sản phẩm thặng dư.",
    bg: "from-orange-300/40 via-amber-800 to-stone-900",
    tiles: ["🔨", "⚒️", "🪵", "🌾", "📦", "🌾", "🐂", "🛖", "🌱"],
    image: "/puzzles/surplus.png",
  },
  property: {
    id: "property",
    caption: "Tư hữu ra đời",
    concept: "Một số người chiếm của dư làm của riêng — chế độ tư hữu hình thành.",
    bg: "from-yellow-300/40 via-amber-800 to-stone-950",
    tiles: ["💰", "🔑", "💎", "🏠", "🤵", "📦", "⚖️", "🪙", "🚪"],
    image: "/puzzles/property.png",
  },
  conflict: {
    id: "conflict",
    caption: "Mâu thuẫn giai cấp",
    concept: "Giàu – nghèo phân hóa, lợi ích đối kháng dẫn tới đấu tranh.",
    bg: "from-rose-400/40 via-rose-950 to-stone-950",
    tiles: ["🤵", "💢", "😣", "💰", "⚔️", "🥀", "✊", "🔥", "⛓️"],
    image: "/puzzles/conflict.png",
  },
  state: {
    id: "state",
    caption: "Nhà nước ra đời",
    concept: "Luật pháp và lực lượng cưỡng chế xuất hiện để duy trì trật tự xã hội.",
    bg: "from-indigo-400/40 via-indigo-950 to-slate-950",
    tiles: ["📜", "⚖️", "📜", "💂", "🏛️", "💂", "🛡️", "🔔", "🚧"],
    image: "/puzzles/state.png",
  },
  modern: {
    id: "modern",
    caption: "Nhà nước hiện đại",
    concept: "Nhà nước quản lý xã hội, kinh tế, công nghệ, an sinh.",
    bg: "from-sky-400/40 via-indigo-900 to-slate-950",
    tiles: ["🏙️", "📡", "🛰️", "🏦", "🏛️", "💳", "🤖", "📱", "🌐"],
    image: "/puzzles/modern.png",
  },
};

// NPC nào trả lời sai thì ghép tranh nào (theo khái niệm của màn)
export const PUZZLE_BY_NPC: Record<string, string> = {
  farmer: "commune",
  craftsman: "surplus",
  merchant: "property",
  worker: "conflict",
  guard: "state",
  chief: "state",
  student: "modern",
  scholar: "conflict",
};

export const ENDING_NARRATION = [
  "Từ xã hội nguyên thủy đến sự ra đời của nhà nước,",
  "lịch sử xã hội luôn gắn liền với: sản xuất, giai cấp, và mâu thuẫn xã hội.",
  "Nhà nước không tự nhiên xuất hiện, mà là sản phẩm của lịch sử xã hội loài người.",
];
