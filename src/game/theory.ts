import type { LessonIntro, TheoryDeep } from "./types";

// ===== LESSON INTRO — Bài học lý thuyết TRƯỚC khi explore mỗi màn =====

export const LESSON_INTROS: Record<string, LessonIntro> = {
  farmer: {
    title: "Giai đoạn 1: Xã hội công xã nguyên thủy",
    concept:
      "Trong xã hội nguyên thủy, công cụ lao động thô sơ, năng suất thấp, không có của dư thừa — nên chưa có tư hữu, chưa có giai cấp, và chưa có nhà nước.",
    bullets: [
      "Công cụ sản xuất lạc hậu (đồ đá) → năng suất lao động rất thấp.",
      "Mỗi người chỉ làm ra vừa đủ để tồn tại — không có sản phẩm dư thừa.",
      "Chưa có chế độ tư hữu → chưa có phân hóa giàu nghèo → chưa có giai cấp.",
      "Không có giai cấp → không có mâu thuẫn giai cấp → nhà nước chưa ra đời.",
    ],
    citation:
      "Slide Tiết 42, tr.5 — \"CSNT: Không có của dư thừa, CCSX lạc hậu (đá), NSLĐ thấp, CĐ tư hữu chưa ra đời, Giai cấp chưa ra đời → Nhà nước chưa ra đời.\"",
  },

  craftsman: {
    title: "Giai đoạn 2: Lực lượng sản xuất phát triển",
    concept:
      "Khi công cụ lao động phát triển (từ đá sang đồng), năng suất tăng vọt, lần đầu tiên xuất hiện của cải dư thừa — tiền đề vật chất cho mọi biến đổi xã hội sau này.",
    bullets: [
      "Công cụ sản xuất phát triển: đá → đồng → sắt.",
      "Năng suất lao động tăng → sản phẩm làm ra nhiều hơn mức cần để sống.",
      "Xuất hiện sản phẩm thặng dư (của cải dư thừa).",
      "Câu hỏi then chốt: Phần dư thừa này sẽ thuộc về ai?",
    ],
    citation:
      "Slide Tiết 42, tr.5 — \"Cuối CSNT: CCSX phát triển (đồng), NSLĐ tăng, có của dư thừa.\"",
  },

  merchant: {
    title: "Giai đoạn 3: Chế độ tư hữu ra đời",
    concept:
      "Sự phát triển của lực lượng sản xuất dẫn đến sự dư thừa tương đối của cải, từ đó xuất hiện chế độ tư hữu — một số người chiếm của dư làm của riêng, xã hội bắt đầu phân hóa.",
    bullets: [
      "Của dư thừa → một số người chiếm làm của riêng → chế độ tư hữu hình thành.",
      "Tư hữu về tư liệu sản xuất (đất đai, công cụ) là nguyên nhân trực tiếp gây phân hóa.",
      "Xã hội chia thành: người sở hữu tư liệu sản xuất (giàu) và người không sở hữu (nghèo).",
      "Đây là bước ngoặt: từ bình đẳng sang bất bình đẳng.",
    ],
    citation:
      "Slide Tiết 42, tr.6 — \"Sự phát triển của lực lượng sản xuất dẫn đến sự dư thừa tương đối của cải, xuất hiện CHẾ ĐỘ TƯ HỮU.\"",
  },

  worker: {
    title: "Giai đoạn 4: Mâu thuẫn giai cấp không thể điều hòa",
    concept:
      "Tư hữu dẫn đến phân hóa giai cấp: giai cấp bóc lột (nắm tư liệu sản xuất) và giai cấp bị bóc lột (chỉ có sức lao động). Mâu thuẫn giữa hai giai cấp ngày càng gay gắt, không thể điều hòa.",
    bullets: [
      "Giai cấp bóc lột: sở hữu đất đai, công cụ, nhà xưởng — nắm quyền lực kinh tế.",
      "Giai cấp bị bóc lột: chỉ có sức lao động — phải làm thuê để sống.",
      "Lợi ích hai giai cấp đối kháng nhau → mâu thuẫn ngày càng gay gắt.",
      "Khi mâu thuẫn không thể điều hòa → xã hội cần một bộ máy quyền lực đặc biệt.",
    ],
    citation:
      "Slide Tiết 42, tr.5-6 — \"CĐ tư hữu xuất hiện → Giai cấp xuất hiện, mâu thuẫn giai cấp không thể điều hòa → Nhà nước xuất hiện.\"",
  },

  guard: {
    title: "Giai đoạn 5: Nhà nước ra đời",
    concept:
      "Nhà nước ra đời do mâu thuẫn giai cấp trong xã hội gay gắt không thể điều hòa được. Nhà nước là tổ chức chính trị của giai cấp thống trị về mặt kinh tế.",
    bullets: [
      "Nhà nước KHÔNG ra đời từ ý chí chủ quan — mà là tất yếu khách quan.",
      "\"Nhà nước là sản phẩm và biểu hiện của những mâu thuẫn giai cấp không thể điều hòa được.\" — V.I. Lenin",
      "Nhà nước là tổ chức chính trị của giai cấp thống trị về kinh tế, nhằm bảo vệ trật tự hiện hành.",
      "Công cụ của nhà nước: quân đội, cảnh sát, nhà tù, tòa án, luật pháp.",
    ],
    citation:
      "Slide Tiết 42, tr.6-7 — \"Do mâu thuẫn giai cấp trong xã hội gay gắt không thể điều hòa được\" → \"Nhà nước là tổ chức chính trị của một giai cấp thống trị về mặt kinh tế nhằm bảo vệ trật tự hiện hành và đàn áp sự phản kháng của các giai cấp khác.\"",
  },

  chief: {
    title: "Giai đoạn 6: Chức năng của nhà nước",
    concept:
      "Nhà nước có hai chức năng cơ bản: chức năng thống trị chính trị (bảo vệ lợi ích giai cấp thống trị) và chức năng xã hội (quản lý, ổn định, phát triển xã hội).",
    bullets: [
      "Chức năng thống trị chính trị: củng cố, duy trì sự thống trị giai cấp, bảo vệ lợi ích giai cấp cầm quyền.",
      "Chức năng xã hội: thúc đẩy xã hội phát triển, ổn định chính trị, quản lý các lĩnh vực đời sống.",
      "Chức năng đối nội: chính sách xã hội, luật pháp, văn hóa, y tế, giáo dục.",
      "Chức năng đối ngoại: bảo vệ lãnh thổ, trao đổi kinh tế, văn hóa, KHKT với các nước.",
    ],
    citation:
      "Slide Tiết 42, tr.9-10 — Chức năng chính trị (Củng cố, Duy trì sự thống trị GC) + Chức năng xã hội (Thúc đẩy XH phát triển, Ổn định chính trị).",
  },

  student: {
    title: "Giai đoạn 7: Nhà nước trong thời đại hiện nay",
    concept:
      "Lịch sử có 4 kiểu nhà nước (chiếm hữu nô lệ, phong kiến, tư sản, vô sản). Trong thời đại CMCN 4.0, nhà nước đối mặt thách thức mới: quản lý AI, mạng xã hội, an ninh mạng, kinh tế số.",
    bullets: [
      "4 kiểu nhà nước trong lịch sử: Chiếm hữu nô lệ → Phong kiến → Tư sản → Vô sản.",
      "Mỗi kiểu nhà nước có hình thức chính thể khác nhau (quân chủ, cộng hòa...).",
      "Nhà nước hiện đại: quản lý xã hội, ổn định chính trị, điều tiết kinh tế.",
      "Thách thức mới: CMCN 4.0, chuyển đổi số, an ninh mạng, biến đổi khí hậu.",
    ],
    citation:
      "Slide Tiết 42, tr.11-16 — 4 kiểu nhà nước (CHNL, PK, TS, VS) và các hình thức nhà nước tương ứng.",
  },

  scholar: {
    title: "Giai đoạn 8: Cách mạng xã hội — Tổng kết",
    concept:
      "Cách mạng xã hội là sự thay đổi căn bản về chất toàn bộ các lĩnh vực đời sống xã hội. Nguyên nhân sâu xa là mâu thuẫn giữa lực lượng sản xuất và quan hệ sản xuất.",
    bullets: [
      "Cách mạng xã hội: thay đổi căn bản về chất, lật đổ chính quyền cũ, thiết lập chính quyền mới tiến bộ hơn.",
      "Nguyên nhân khách quan: mâu thuẫn giữa LLSX phát triển và QHSX lỗi thời kìm hãm.",
      "Nguyên nhân chủ quan: sự nhận thức và tổ chức của giai cấp cách mạng.",
      "Hai phương pháp: bạo lực cách mạng hoặc hòa bình (đấu tranh nghị trường).",
    ],
    citation:
      "Slide Tiết 43, tr.4-8 — \"Nguyên nhân sâu xa của CMXH là mâu thuẫn gay gắt giữa nhu cầu khách quan của sự phát triển LLSX với sự kìm hãm của QHSX.\"",
  },
};

// ===== THEORY DEEP — Phân tích sâu SAU khi quiz đúng =====

export const THEORY_DEEPS: Record<string, TheoryDeep> = {
  farmer: {
    title: "Phân tích: Tại sao nhà nước chưa ra đời?",
    keyPoint:
      "Không có của dư thừa → không có tư hữu → không có giai cấp → không có nhà nước. Đây là chuỗi logic nhân quả tất yếu.",
    explanation: [
      "Trong xã hội công xã nguyên thủy, con người sống thành bầy đàn, cùng lao động và chia đều sản phẩm.",
      "Công cụ lao động thô sơ (đồ đá, gậy gộc) khiến năng suất rất thấp — mỗi người chỉ làm ra vừa đủ để tồn tại.",
      "Khi không có sản phẩm dư thừa, không ai có thể tích lũy tài sản riêng → chế độ tư hữu chưa ra đời.",
      "Không có tư hữu → xã hội chưa phân hóa thành giai cấp → chưa có mâu thuẫn giai cấp → chưa cần nhà nước.",
    ],
    diagram:
      "CCSX lạc hậu → NSLĐ thấp → Không dư thừa → Không tư hữu → Không giai cấp → Không nhà nước",
    citation:
      "Slide Tiết 42, tr.5 — Giáo trình Triết học Mác-Lênin, NXB CTQG Sự thật, 2021",
  },

  craftsman: {
    title: "Phân tích: Bước ngoặt — của cải dư thừa",
    keyPoint:
      "Sự phát triển của lực lượng sản xuất tạo ra của cải dư thừa — đây là tiền đề vật chất cho mọi biến đổi xã hội về sau.",
    explanation: [
      "Khi con người phát minh ra công cụ bằng đồng, rồi bằng sắt, năng suất lao động tăng đáng kể.",
      "Lần đầu tiên trong lịch sử, một người có thể làm ra nhiều hơn mức cần thiết để sống.",
      "Phần sản phẩm vượt quá nhu cầu tồn tại gọi là 'sản phẩm thặng dư' hay 'của cải dư thừa'.",
      "Của cải dư thừa đặt ra câu hỏi lịch sử: Ai sẽ sở hữu phần dư này? Câu trả lời sẽ quyết định cấu trúc xã hội.",
    ],
    diagram:
      "Công cụ đá → Công cụ đồng/sắt → NSLĐ tăng → Sản phẩm thặng dư xuất hiện → ?",
    citation:
      "Slide Tiết 42, tr.5 — Giáo trình Triết học Mác-Lênin, NXB CTQG Sự thật, 2021",
  },

  merchant: {
    title: "Phân tích: Tư hữu — Nguồn gốc phân hóa",
    keyPoint:
      "Chế độ tư hữu về tư liệu sản xuất là nguyên nhân trực tiếp làm xã hội phân hóa thành giai cấp: giai cấp sở hữu và giai cấp không sở hữu.",
    explanation: [
      "Khi của cải dư thừa xuất hiện, những người có vị thế (thủ lĩnh, người mạnh) bắt đầu chiếm phần dư làm của riêng.",
      "Dần dần, tư liệu sản xuất (đất đai, công cụ, gia súc) tập trung vào tay một nhóm nhỏ.",
      "Xã hội chia thành hai cực: người sở hữu TLSX (giai cấp bóc lột) và người chỉ có sức lao động (giai cấp bị bóc lột).",
      "Bất bình đẳng kinh tế ngày càng sâu sắc — khoảng cách giàu nghèo mở rộng.",
    ],
    diagram:
      "Của dư thừa → Một số người chiếm → Tư hữu TLSX → GC bóc lột + GC bị bóc lột → Bất bình đẳng",
    citation:
      "Slide Tiết 42, tr.6 — Giáo trình Triết học Mác-Lênin, NXB CTQG Sự thật, 2021",
    realWorld:
      "Theo báo cáo Oxfam (2024), 1% người giàu nhất thế giới sở hữu hơn 45% tổng tài sản toàn cầu. Tại Việt Nam, hệ số Gini về thu nhập năm 2023 là 0,33 — cho thấy phân hóa giàu nghèo vẫn tồn tại dù ở mức kiểm soát được.",
  },

  worker: {
    title: "Phân tích: Mâu thuẫn — Tất yếu dẫn đến nhà nước",
    keyPoint:
      "\"Nhà nước là sản phẩm và biểu hiện của những mâu thuẫn giai cấp không thể điều hòa được.\" — V.I. Lenin. Đây là luận điểm trung tâm của toàn bộ game.",
    explanation: [
      "Giai cấp bóc lột muốn duy trì trật tự hiện tại (bảo vệ quyền sở hữu, giữ lợi nhuận).",
      "Giai cấp bị bóc lột muốn thay đổi (đòi quyền lợi, chống áp bức, phân chia lại tài sản).",
      "Hai lợi ích này đối kháng nhau — không thể cùng thỏa mãn. Mâu thuẫn ngày càng gay gắt.",
      "Khi mâu thuẫn lên đến mức không thể điều hòa, xã hội cần một bộ máy quyền lực đặc biệt để 'giữ trật tự' — bộ máy đó chính là NHÀ NƯỚC.",
    ],
    diagram:
      "GC bóc lột (giữ trật tự) ←→ GC bị bóc lột (thay đổi) → Mâu thuẫn không thể điều hòa → NHÀ NƯỚC ra đời",
    citation:
      "Slide Tiết 42, tr.5-6 — V.I. Lenin, \"Nhà nước và Cách mạng\" — Giáo trình Triết học Mác-Lênin, NXB CTQG Sự thật, 2021",
    realWorld:
      "Trên thế giới, các cuộc đình công lao động phản ánh mâu thuẫn giai cấp hiện đại. Năm 2022, công nhân kho hàng Amazon tại Staten Island (Mỹ) đã bỏ phiếu thành lập công đoàn để đòi quyền lợi. Tại Trung Quốc, các nhà máy Foxconn (lắp ráp iPhone) từng chứng kiến nhiều cuộc đình công lớn do điều kiện lao động khắc nghiệt — cho thấy mâu thuẫn lợi ích giữa người lao động và chủ doanh nghiệp vẫn tồn tại phổ biến trong xã hội tư bản đương đại.",
  },

  guard: {
    title: "Phân tích: Bản chất giai cấp của nhà nước",
    keyPoint:
      "Nhà nước không phải tổ chức trung lập — nó là công cụ chính trị của giai cấp thống trị về kinh tế, nhằm bảo vệ trật tự hiện hành và đàn áp sự phản kháng.",
    explanation: [
      "Nhà nước ra đời để 'giữ trật tự' — nhưng trật tự đó phục vụ lợi ích của giai cấp thống trị.",
      "Công cụ quyền lực của nhà nước: quân đội, cảnh sát, nhà tù, tòa án — bộ máy cưỡng chế.",
      "Nhà nước ban hành luật pháp — nhưng luật pháp phản ánh ý chí của giai cấp cầm quyền.",
      "Tuy nhiên, nhà nước cũng phải thực hiện chức năng xã hội (quản lý, ổn định) để duy trì sự tồn tại.",
    ],
    diagram:
      "GC thống trị → Nhà nước (quân đội + cảnh sát + tòa án + luật pháp) → Duy trì trật tự → Bảo vệ lợi ích GC thống trị",
    citation:
      "Slide Tiết 42, tr.7 — \"Nhà nước là tổ chức chính trị của một giai cấp thống trị về mặt kinh tế nhằm bảo vệ trật tự hiện hành và đàn áp sự phản kháng của các giai cấp khác.\"",
    realWorld:
      "Hiến pháp nước CHXHCN Việt Nam 2013, Điều 2: \"Nhà nước Cộng hòa xã hội chủ nghĩa Việt Nam là nhà nước pháp quyền xã hội chủ nghĩa của Nhân dân, do Nhân dân, vì Nhân dân.\" — Đây là mô hình nhà nước vô sản, nơi giai cấp công nhân và nhân dân lao động là chủ thể quyền lực.",
  },

  chief: {
    title: "Phân tích: Hai chức năng cơ bản",
    keyPoint:
      "Nhà nước vừa thực hiện chức năng thống trị chính trị (bảo vệ giai cấp cầm quyền), vừa thực hiện chức năng xã hội (quản lý, phát triển đất nước). Hai chức năng này gắn bó không thể tách rời.",
    explanation: [
      "Chức năng chính trị: củng cố quyền lực, duy trì sự thống trị giai cấp, định hướng chính trị, bảo vệ lợi ích giai cấp cầm quyền.",
      "Chức năng xã hội: thúc đẩy phát triển kinh tế, ổn định xã hội, chăm lo văn hóa, y tế, giáo dục, an sinh.",
      "Chức năng đối nội: ban hành chính sách, luật pháp, quản lý các lĩnh vực trong nước.",
      "Chức năng đối ngoại: bảo vệ lãnh thổ quốc gia, hợp tác kinh tế, văn hóa, KHKT với các nước.",
    ],
    diagram:
      "Nhà nước → (1) CN Chính trị: Bảo vệ GC thống trị + (2) CN Xã hội: Quản lý & Phát triển → Đối nội + Đối ngoại",
    citation:
      "Slide Tiết 42, tr.9-10 — Giáo trình Triết học Mác-Lênin, NXB CTQG Sự thật, 2021",
    realWorld:
      "Trong đại dịch COVID-19, nhà nước Việt Nam thể hiện rõ chức năng xã hội: cách ly tập trung, gói hỗ trợ 62.000 tỷ đồng (Nghị quyết 42/NQ-CP), tiêm vaccine miễn phí cho toàn dân — bảo vệ lợi ích chung của cộng đồng, đặc biệt là người lao động và người yếu thế.",
  },

  student: {
    title: "Phân tích: Nhà nước và Cách mạng công nghiệp 4.0",
    keyPoint:
      "Trong thời đại CMCN 4.0, nhà nước phải đổi mới để quản lý những lĩnh vực hoàn toàn mới: AI, kinh tế số, an ninh mạng, dữ liệu cá nhân — đồng thời vẫn đảm bảo công bằng xã hội.",
    explanation: [
      "4 kiểu nhà nước trong lịch sử: Chiếm hữu nô lệ → Phong kiến → Tư sản → Vô sản — mỗi kiểu phản ánh QHSX của thời đại.",
      "Nhà nước hiện đại không chỉ cai trị, mà còn quản lý xã hội, điều tiết kinh tế, đảm bảo an sinh.",
      "CMCN 4.0 đặt ra thách thức mới: quản lý AI, dữ liệu cá nhân, kinh tế nền tảng (Grab, Shopee), tiền mã hóa.",
      "Xu hướng: 'đối thoại thay cho đối đầu', hội nhập quốc tế, xây dựng nhà nước pháp quyền.",
    ],
    diagram:
      "CHNL → PK → TS → VS (4 kiểu NH) | Hiện đại: Quản lý XH + Kinh tế + Công nghệ + An sinh",
    citation:
      "Slide Tiết 42, tr.11-16; Slide Tiết 43, tr.9-10 — Giáo trình Triết học Mác-Lênin, NXB CTQG Sự thật, 2021",
    realWorld:
      "Nghị quyết 52-NQ/TW (2019) về chủ động tham gia CMCN 4.0. Luật An ninh mạng 2018 quản lý không gian số. Chương trình Chuyển đổi số quốc gia đến 2025. Mục tiêu: \"dân giàu, nước mạnh, xã hội công bằng, dân chủ, văn minh.\"",
  },

  scholar: {
    title: "Tổng kết: Quy luật Cách mạng xã hội",
    keyPoint:
      "Cách mạng xã hội là quy luật tất yếu khi quan hệ sản xuất lỗi thời kìm hãm sự phát triển của lực lượng sản xuất. Đây là động lực thúc đẩy xã hội tiến lên.",
    explanation: [
      "Cách mạng xã hội là sự thay đổi căn bản về chất toàn bộ các lĩnh vực đời sống xã hội.",
      "Nguyên nhân khách quan: mâu thuẫn giữa LLSX phát triển và QHSX lỗi thời kìm hãm. Mâu thuẫn này biểu hiện thành đấu tranh giai cấp.",
      "Nguyên nhân chủ quan: sự nhận thức và năng lực tổ chức của giai cấp đại biểu cho PTSX mới tiến bộ.",
      "Hai phương pháp: bạo lực cách mạng (giành chính quyền bằng vũ lực) hoặc hòa bình (đấu tranh nghị trường, bầu cử).",
    ],
    diagram:
      "LLSX phát triển ←→ QHSX lỗi thời (mâu thuẫn) → Đấu tranh GC → CMXH → Xã hội mới tiến bộ hơn",
    citation:
      "Slide Tiết 43, tr.4-8 — \"Nguyên nhân sâu xa của CMXH là mâu thuẫn gay gắt giữa nhu cầu khách quan của sự phát triển LLSX với sự kìm hãm của QHSX.\"",
    realWorld:
      "Xu hướng hiện đại (Slide Tiết 43, tr.9-10): CMCN 4.0, xu hướng đối thoại thay cho đối đầu, các quốc gia đi tới xã hội dân chủ, tự do theo cách riêng. Mục tiêu Việt Nam: \"dân giàu, nước mạnh, xã hội công bằng, dân chủ, văn minh.\"",
  },
};
