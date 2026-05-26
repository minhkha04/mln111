# Plan triển khai — Build A Society

> Bản phân tích & kế hoạch dựa trên [content.md](content.md).
> Tech stack chốt: **Next.js + React thuần + Zustand + Framer Motion** (bỏ Phaser.js).

---

## A. Phân tích thiết kế

### A.1. Mô hình hóa lý thuyết → cơ chế game

| Khái niệm Marx–Lenin | Chỉ số trong game | Vai trò |
|----------------------|-------------------|---------|
| Lực lượng sản xuất phát triển | `Resources` | Động lực gốc, sinh ra của cải dư thừa |
| Tư hữu | `Private Ownership` | Hệ quả của dư thừa + chính sách |
| Phân hóa giàu nghèo | `Inequality` | Hệ quả của tư hữu |
| Mâu thuẫn giai cấp | `Class Conflict` | Hệ quả của bất bình đẳng |
| Trật tự xã hội | `Social Stability` | Đối trọng với Class Conflict |
| Nhà nước | `State Power` | Mở khóa khi mâu thuẫn đạt ngưỡng |

**Luận điểm trung tâm**: nhà nước KHÔNG ra đời từ ý chí người chơi, mà ra đời **tất yếu** khi mâu thuẫn giai cấp không thể điều hòa (đúng với câu Lenin ở đầu tài liệu). Đây là điểm cần nhấn về mặt giáo dục.

### A.2. Các lỗ hổng trong tài liệu gốc (đã/sẽ bổ sung)

1. ❌ **Thiếu công thức tác động** của hành động lên chỉ số → bổ sung ở mục B.
2. ❌ **Win/Lose condition** chưa định nghĩa → đề xuất ở mục B.4.
3. ❌ **Cơ chế chuyển giai đoạn** mơ hồ → chốt: chuyển theo ngưỡng chỉ số (mục B.3).
4. ❌ Vai trò `Social Stability` chưa rõ → dùng làm điều kiện thua (mục B.4).

---

## B. Thiết kế công thức game (phần bổ sung quan trọng nhất)

### B.1. Khoảng giá trị chỉ số

Mọi chỉ số trong khoảng `0–100`, trừ `Resources` có thể tích lũy `0–∞` (hiển thị dạng số).

| Chỉ số | Khởi đầu | Ghi chú |
|--------|----------|---------|
| Resources | 10 | tài nguyên dùng để chi cho hành động |
| Private Ownership | 0 | công xã nguyên thủy = chưa có tư hữu |
| Inequality | 0 | |
| Class Conflict | 0 | |
| Social Stability | 100 | bắt đầu ổn định tuyệt đối |
| State Power | 0 | khóa cho tới khi đủ điều kiện |

### B.2. Ma trận tác động hành động → chỉ số (đề xuất)

Mỗi lượt người chơi chọn 1 hành động. Giá trị là delta cộng vào chỉ số mỗi lượt.

| Hành động | Resources | Priv.Own | Inequality | ClassConflict | Stability | StatePower | Điều kiện mở |
|-----------|:---:|:---:|:---:|:---:|:---:|:---:|---|
| Tăng sản xuất | **+15** | +3 | +2 | 0 | -2 | 0 | luôn có |
| Cho phép sở hữu tư nhân | +5 | **+15** | +10 | +5 | -5 | 0 | luôn có |
| Chia lại tài nguyên | -10 | **-12** | **-15** | -10 | +8 | 0 | luôn có |
| Ban hành luật | -5 | +2 | 0 | -8 | +6 | +5 | StatePower mở khóa |
| Thu thuế | **+20** | 0 | +8 | +6 | -4 | +3 | StatePower mở khóa |
| Tăng lực lượng cưỡng chế | -8 | 0 | +3 | **-15** | +10 | +8 | StatePower mở khóa |
| Tăng phúc lợi xã hội | -12 | -3 | **-12** | -8 | +10 | 0 | luôn có |

> Số liệu là **bản nháp cân bằng (balancing)** — sẽ tinh chỉnh khi playtest. Nguyên tắc: tăng sản xuất + tư hữu đẩy hệ thống tới mâu thuẫn; chia lại / phúc lợi làm dịu nhưng tốn tài nguyên.

### B.3. Quy tắc tự động & chuyển giai đoạn

**Phản ứng dây chuyền mỗi cuối lượt** (mô phỏng tính tất yếu):
```txt
Inequality     += floor(PrivateOwnership / 20)
ClassConflict  += floor(Inequality / 15)
Stability      -= floor(ClassConflict / 10)
```

**Chuyển giai đoạn theo ngưỡng** (kiểm tra mỗi lượt):
| Giai đoạn | Điều kiện kích hoạt |
|-----------|---------------------|
| 1. Công xã nguyên thủy | mặc định |
| 2. Phát triển sản xuất | Resources ≥ 50 |
| 3. Xuất hiện tư hữu | Private Ownership ≥ 30 |
| 4. Hình thành giai cấp | Inequality ≥ 50 |
| 5. Mâu thuẫn xã hội | Class Conflict ≥ 60 |
| 6. Nhà nước ra đời | PO ≥ 60 **và** Ineq ≥ 70 **và** Conflict ≥ 80 |

### B.4. Điều kiện thắng / thua

- 🏛️ **Thắng (mục tiêu giáo dục)**: đạt giai đoạn 6 → nhà nước ra đời → hiện popup tổng kết lý thuyết.
- 💥 **Thua (sụp đổ xã hội)**: `Social Stability ≤ 0` trước khi nhà nước ra đời → "xã hội tan rã trong hỗn loạn" → bài học về vai trò điều hòa.

---

## C. Kiến trúc kỹ thuật

```txt
src/
├─ app/
│  └─ page.tsx              # màn game chính
├─ store/
│  └─ gameStore.ts          # Zustand: state + actions + reducers
├─ game/
│  ├─ constants.ts          # giá trị khởi đầu, ngưỡng
│  ├─ actions.ts            # ma trận tác động (B.2)
│  ├─ engine.ts             # applyAction(), endTurn(), checkStage(), checkEndgame()
│  └─ events.ts             # popup sự kiện + nội dung lý thuyết
├─ components/
│  ├─ StatBar.tsx           # thanh chỉ số (Framer Motion animate)
│  ├─ ActionPanel.tsx       # 7 nút hành động (disable theo điều kiện)
│  ├─ SocietyMap.tsx        # SVG/CSS minh họa xã hội theo giai đoạn
│  ├─ EventPopup.tsx        # popup giải thích Marx–Lenin
│  └─ StageIndicator.tsx    # hiển thị giai đoạn hiện tại
└─ content/
   └─ theory.ts             # text lý thuyết cho từng giai đoạn/sự kiện
```

**State (Zustand)**: `{ turn, stage, stats: {...}, unlocked: {tax, law, force}, status: 'playing'|'won'|'lost', activeEvent }`.

---

## D. Lộ trình 5 ngày (bám MVP Plan gốc)

| Ngày | Việc | Output |
|------|------|--------|
| **1** | Setup Next.js + Tailwind + Zustand; dựng layout (mục 11) | Khung UI tĩnh, 6 StatBar render được |
| **2** | Cài state store + engine.ts (B.2, B.3); nối 7 nút hành động | Gameplay loop chạy được, chỉ số thay đổi realtime |
| **3** | Logic chuyển giai đoạn + win/lose + EventPopup | Chơi trọn 1 ván đến khi nhà nước ra đời / sụp đổ |
| **4** | Framer Motion cho StatBar/popup; SocietyMap đổi theo giai đoạn | Game có animation, cảm giác sống động |
| **5** | Viết nội dung lý thuyết (theory.ts), liên hệ thực tiễn (mục 8), playtest cân bằng số liệu | Demo hoàn thiện |

---

## E. Việc cần bạn quyết tiếp (không chặn ngày 1)

1. Số liệu ma trận B.2 — chốt bản nháp này hay muốn điều chỉnh trước?
2. SocietyMap: SVG vẽ tay (làng → thành thị) hay dùng asset/ảnh có sẵn?
3. Ngôn ngữ UI: chỉ tiếng Việt, hay song ngữ Việt–Anh (vì tài liệu trích Lenin song ngữ)?
