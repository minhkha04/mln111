# 🎨 Danh sách cảnh cần thiết kế — Village of Classes

> Game đã chia thành **từng màn (screen)**, mỗi màn là một khung cảnh gắn với một nhân vật.
> Hiện tại nền + nhân vật đang dùng **emoji/icon làm placeholder** (xem [SceneStage.tsx](src/components/SceneStage.tsx) và [content.ts](src/game/content.ts) — biến `SCENES`).
> Designer thay placeholder bằng art thật theo bảng dưới.

## Quy cách chung
- **Tỉ lệ khung cảnh**: ngang, ~16:10 (component cao `clamp(300px, 46vh, 460px)`, rộng tối đa 672px). Nên xuất **1344×840 px** (2x).
- **Phong cách**: pixel-art / retro RPG (tham khảo Stardew Valley, Pokémon GBA) — theo [content.md](content.md) mục 12.
- Mỗi cảnh cần: **(1) ảnh nền (background)**, **(2) sprite nhân vật** đứng giữa.
- Có vùng tối ở đáy (nền đất) để chữ tên nhân vật dễ đọc.
- Tông màu gradient hiện tại ghi sẵn trong cột "Tông màu" để giữ mạch cảm xúc sáng → tối dần theo mâu thuẫn.

---

## Các màn (8 cảnh + intro + ending)

### 0. Màn mở đầu (Intro) — *không cần nhân vật*
- **Bối cảnh**: bình minh trên ngôi làng nguyên thủy, yên bình.
- **Mục đích**: lời dẫn của Narrator.
- **Art cần**: 1 ảnh nền toàn cảnh làng buổi sớm (tùy chọn, hiện đang để nền tối trơn).

### 1. Người Nông Dân — 🧑‍🌾
- **Bối cảnh**: *Cánh đồng chung — Bình minh công xã.*
- **Không khí**: tươi sáng, bình đẳng, cộng đồng cùng lao động.
- **Tông màu**: vàng bình minh → xanh lá đậm.
- **Phần tử nền**: ruộng lúa, mặt trời mọc, lều/lán chung, gia súc, mạ non.
- **Sprite**: nông dân cầm liềm/cuốc, nét mặt vui.

### 2. Người Thợ Thủ Công — 🧑‍🏭
- **Bối cảnh**: *Xưởng thủ công — Công cụ mới.*
- **Không khí**: hăng say sản xuất, bắt đầu có của dư.
- **Tông màu**: cam đất → nâu xưởng.
- **Phần tử nền**: bàn thợ, búa/đe, gỗ, thùng chứa lúa dư, dụng cụ.
- **Sprite**: thợ cầm búa/dụng cụ.

### 3. Thương Nhân — 🤵
- **Bối cảnh**: *Khu chợ & nhà kho — Của riêng.*
- **Không khí**: giàu có, bắt đầu khoe của, kho khóa kín.
- **Tông màu**: vàng kim → nâu sẫm.
- **Phần tử nền**: sạp chợ, túi tiền/vàng, cân, kho hàng, nhà to.
- **Sprite**: thương nhân ăn mặc sang, vẻ tự mãn. *(màn này có lựa chọn)*

### 4. Người Lao Động Phẫn Nộ — 😠
- **Bối cảnh**: *Xóm nghèo — Bất mãn dâng cao.*
- **Không khí**: căng thẳng, phẫn nộ, sắp bùng nổ.
- **Tông màu**: đỏ hồng → đỏ sẫm/đen.
- **Phần tử nền**: nhà rách, lửa, nắm đấm giơ cao ✊, xiềng xích, hoa héo.
- **Sprite**: người lao động giận dữ, quần áo rách. *(màn này có lựa chọn — quyết định ending)*

### 5. Lính Gác — 💂
- **Bối cảnh**: *Cổng làng — Luật pháp ra đời.*
- **Không khí**: nghiêm trang, quyền lực mới xuất hiện.
- **Tông màu**: chàm → xanh đen.
- **Phần tử nền**: cổng/tường thành, cán cân công lý, cuộn luật, rào chắn, khiên.
- **Sprite**: lính gác cầm giáo/khiên, đứng canh.

### 6. Trưởng Làng — 🧓
- **Bối cảnh**: *Nhà hội đồng làng — Bộ máy nhà nước.*
- **Không khí**: trang nghiêm, quản trị, thu thuế.
- **Tông màu**: vàng → xám đá.
- **Phần tử nền**: tòa nhà hội đồng, cuộn sắc lệnh, hòm thuế, ghế quyền lực, chuông.
- **Sprite**: trưởng làng lớn tuổi, áo chức sắc.

### 7. Sinh Viên — 🧑‍🎓
- **Bối cảnh**: *Thành phố hiện đại — Nhà nước hôm nay.*
- **Không khí**: hiện đại, công nghệ, liên hệ thực tiễn.
- **Tông màu**: xanh trời → tím đêm thành phố.
- **Phần tử nền**: tòa nhà cao, robot/AI, điện thoại, bóng đèn ý tưởng, mạng lưới, tàu điện.
- **Sprite**: sinh viên cầm sách/laptop.

### 8. Học Giả — 📚
- **Bối cảnh**: *Thư phòng học giả — Ôn tập.*
- **Không khí**: trầm tĩnh, tổng kết kiến thức.
- **Tông màu**: tím → xanh đêm.
- **Phần tử nền**: kệ sách, nến, cuộn giấy, bút lông, bản đồ, đồng hồ cát.
- **Sprite**: học giả/già làng cầm sách.

### 9. Màn kết (Ending) — *không cần nhân vật*
- **3 biến thể** theo kết cục (xem [stats.ts](src/game/stats.ts) `computeEnding`):
  - ✊ **Cách mạng xã hội** — quần chúng nổi dậy (đỏ rực, biểu tình).
  - 🛡️ **Nhà nước áp bức** — quyền lực đè nén (xám lạnh, lính gác).
  - ⚖️ **Nhà nước điều hòa** — cân bằng (trung tính).
- **Art cần**: 3 ảnh nền kết cục (tùy chọn).

---

## Cách thay placeholder bằng art thật
1. Bỏ ảnh nền vào `public/scenes/<id>.png` (vd `public/scenes/farmer.png`).
2. Trong [SceneStage.tsx](src/components/SceneStage.tsx): thay lớp gradient bằng `<Image src={...}>` và bỏ phần emoji rải nền.
3. Thay `npc.sprite` (emoji) bằng ảnh sprite `public/sprites/<id>.png`.
4. Bảng màu/không khí giữ theo cột "Tông màu" để mạch cảm xúc không đổi.

## Tổng kết số art cần làm
| Loại | Số lượng |
|------|----------|
| Ảnh nền cảnh nhân vật | 8 |
| Sprite nhân vật | 8 (Farmer, Craftsman, Merchant, Worker, Guard, Chief, Student, Scholar) |
| Ảnh nền intro | 1 (tùy chọn) |
| Ảnh nền ending | 3 (tùy chọn) |
