# 🎨 Checklist tài sản cần thiết kế — Village of Classes

> Hiện game đang dùng **emoji + gradient làm placeholder**. Bảng dưới liệt kê những gì cần
> Designer làm, kèm **thư mục + tên file + đuôi file** để bỏ vào, rồi báo dev ráp vào code.
> Quy ước: sprite nhân vật dùng **PNG nền trong suốt**; ảnh nền dùng **JPG/PNG**.

---

## 1) 👤 Nhân vật (sprites) — thư mục `public/sprites/`
PNG nền trong suốt, nhìn **từ trên xuống (top-down)**. Khuyến nghị **256×256 px**.

| ☐ | Nhân vật | Tên file | Ghi chú |
|---|----------|----------|---------|
| ☐ | Người chơi | `player.png` | nhân vật điều khiển (nên có thêm 4 hướng: `player-up/down/left/right.png` nếu muốn mượt) |
| ☐ | Người Nông Dân | `farmer.png` | cầm liềm/cuốc, áo nâu lao động |
| ☐ | Người Thợ Thủ Công | `craftsman.png` | cầm búa/dụng cụ, tạp dề |
| ☐ | Thương Nhân | `merchant.png` | ăn mặc sang, túi tiền |
| ☐ | Người Lao Động | `worker.png` | gầy, áo rách, vẻ phẫn nộ |
| ☐ | Lính Gác | `guard.png` | giáp, giáo, khiên |
| ☐ | Trưởng Làng | `chief.png` | lớn tuổi, áo chức sắc |
| ☐ | Sinh Viên | `student.png` | hiện đại, cầm sách/laptop |
| ☐ | Học Giả | `scholar.png` | áo dài học giả, cầm sách |

→ **9 sprite** (hoặc 12 nếu làm player 4 hướng).

---

## 2) 🏞️ Nền cảnh từng màn (backgrounds) — thư mục `public/scenes/`
Ảnh **top-down**, tỉ lệ ngang ~**16:9**, khuyến nghị **1600×900 px**. Mỗi NPC một cảnh.

| ☐ | Cảnh | Tên file | Bối cảnh |
|---|------|----------|----------|
| ☐ | Nông Dân | `scene-farmer.png` | Cánh đồng chung — bình minh công xã |
| ☐ | Thợ Thủ Công | `scene-craftsman.png` | Xưởng thủ công, công cụ mới |
| ☐ | Thương Nhân | `scene-merchant.png` | Khu chợ & nhà kho — của riêng |
| ☐ | Người Lao Động | `scene-worker.png` | Xóm nghèo — bất mãn dâng cao |
| ☐ | Lính Gác | `scene-guard.png` | Cổng làng — luật pháp ra đời |
| ☐ | Trưởng Làng | `scene-chief.png` | Nhà hội đồng làng — bộ máy nhà nước |
| ☐ | Sinh Viên | `scene-student.png` | Thành phố hiện đại — nhà nước hôm nay |
| ☐ | Học Giả | `scene-scholar.png` | Thư phòng học giả — ôn tập |

→ **8 ảnh nền.** (Chi tiết bối cảnh/tông màu xem [SCENES.md](SCENES.md).)

---

## 3) 🧩 Tranh ghép hình — thư mục `public/puzzles/` — ✅ ĐÃ XONG
| ✅ | Tên file | Khái niệm |
|---|----------|-----------|
| ✅ | `commune.png` | Công xã nguyên thủy |
| ✅ | `surplus.png` | Của cải dư thừa |
| ✅ | `property.png` | Tư hữu ra đời |
| ✅ | `conflict.png` | Mâu thuẫn giai cấp |
| ✅ | `state.png` | Nhà nước ra đời |
| ✅ | `modern.png` | Nhà nước hiện đại |

→ **6/6 ảnh — hoàn tất.** (Chi tiết xem [PUZZLES.md](PUZZLES.md).)

---

## 4) 🖼️ Giao diện / UI (tùy chọn) — thư mục `public/ui/`
Không bắt buộc (hiện làm bằng CSS), nhưng nếu muốn đẹp & đồng bộ:

| ☐ | Hạng mục | Tên file | Ghi chú |
|---|----------|----------|---------|
| ☐ | Logo game | `logo.png` | tiêu đề "Village of Classes" |
| ☐ | Icon chỉ số: Giàu nghèo | `stat-wealth.png` | PNG nhỏ ~64px |
| ☐ | Icon chỉ số: Mâu thuẫn | `stat-conflict.png` | |
| ☐ | Icon chỉ số: Ổn định | `stat-stability.png` | |
| ☐ | Icon chỉ số: Nhà nước | `stat-state.png` | |
| ☐ | Icon chỉ số: Ủng hộ | `stat-support.png` | |
| ☐ | Mốc "Tiếp tục" | `marker-continue.png` | thay vòng tròn xanh hiện tại |
| ☐ | Điểm ghép tranh | `marker-puzzle.png` | thay icon 🧩 hiện tại |
| ☐ | Nền màn mở đầu | `intro-bg.png` | tùy chọn |
| ☐ | Nền kết thúc: Cách mạng | `ending-revolution.png` | tùy chọn |
| ☐ | Nền kết thúc: Áp bức | `ending-oppressive.png` | tùy chọn |
| ☐ | Nền kết thúc: Điều hòa | `ending-reform.png` | tùy chọn |

---

## 📋 Tổng kết ưu tiên
| Mức | Hạng mục | Số file | Trạng thái |
|-----|----------|---------|-----------|
| ⭐ Bắt buộc | Tranh ghép (`public/puzzles/`) | 6 | ✅ Xong |
| ⭐ Nên có | Sprite nhân vật (`public/sprites/`) | 9 | ☐ Chưa |
| ⭐ Nên có | Nền cảnh (`public/scenes/`) | 8 | ☐ Chưa |
| ◽ Tùy chọn | UI / icon / ending (`public/ui/`) | ~12 | ☐ Chưa |

**Khi có file**: bỏ đúng thư mục + đúng tên ở trên rồi báo dev (mình) ráp vào code —
chỉ cần thay phần render placeholder trong [SceneStage.tsx](src/components/SceneStage.tsx).
