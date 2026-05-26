# 🧩 Danh sách tranh cần cho phần ghép hình

> Mỗi bức tranh sẽ được **cắt thành lưới 3×3 (9 mảnh)** để người chơi ghép lại.
> Cần **6 bức** (mỗi bức ứng với một khái niệm bài học). Hiện đang dùng emoji làm placeholder
> trong [content.ts](src/game/content.ts) — biến `PUZZLES`.

## ⚙️ Quy cách ảnh (quan trọng)
- **Tỉ lệ vuông 1:1** (vì cắt 3×3 đều nhau). Khuyến nghị **900×900 px** (tối thiểu 600×600).
- Định dạng **PNG hoặc JPG**.
- **Bố cục rõ ràng, nhiều chi tiết rải đều** khắp ảnh (đừng để một góc trống trơn) — để 9 mảnh đều phân biệt được, ghép mới thú vị.
- Phong cách nên đồng bộ với game (minh họa / pixel-art / tranh vẽ đều được, miễn cùng tông).
- Đặt tên file đúng theo cột "Tên file" rồi bỏ vào thư mục `public/puzzles/`.

---

## Danh sách 6 bức tranh

### 1. `commune` — Công xã nguyên thủy
- **Dùng cho NPC**: Người Nông Dân 🧑‍🌾
- **Nội dung cần thể hiện**: cộng đồng nguyên thủy cùng lao động, **chia đều**, bình đẳng, chưa có giàu nghèo.
- **Gợi ý hình ảnh**: nhóm người cùng săn bắt / hái lượm / quây quanh đống lửa, lều trại, cánh đồng, cảnh chia thức ăn cho nhau.
- **Tên file**: `public/puzzles/commune.jpg`

### 2. `surplus` — Của cải dư thừa
- **Dùng cho NPC**: Người Thợ Thủ Công 🧑‍🏭
- **Nội dung cần thể hiện**: công cụ lao động phát triển → sản xuất nhiều hơn → **của cải dư thừa**.
- **Gợi ý hình ảnh**: xưởng thủ công, búa/đe/cày, kho lúa đầy ắp, gia súc, mùa màng bội thu.
- **Tên file**: `public/puzzles/surplus.jpg`

### 3. `property` — Tư hữu ra đời
- **Dùng cho NPC**: Thương Nhân 🤵
- **Nội dung cần thể hiện**: một số người **chiếm của dư làm của riêng** — chế độ tư hữu hình thành.
- **Gợi ý hình ảnh**: người giàu ôm túi tiền/vàng, nhà kho có khóa, ranh giới đất đai (hàng rào), cán cân, két sắt.
- **Tên file**: `public/puzzles/property.jpg`

### 4. `conflict` — Mâu thuẫn giai cấp
- **Dùng cho NPC**: Người Lao Động 😠 và Học Giả 📚
- **Nội dung cần thể hiện**: **giàu – nghèo phân hóa**, lợi ích đối kháng, đấu tranh.
- **Gợi ý hình ảnh**: một bên người giàu sang vs một bên người nghèo đói, đám đông biểu tình giơ nắm đấm, băng rôn, không khí căng thẳng.
- **Tên file**: `public/puzzles/conflict.jpg`

### 5. `state` — Nhà nước ra đời
- **Dùng cho NPC**: Lính Gác 💂 và Trưởng Làng 🧓
- **Nội dung cần thể hiện**: **luật pháp + lực lượng cưỡng chế** xuất hiện để duy trì trật tự.
- **Gợi ý hình ảnh**: lính gác/quân đội, cán cân công lý, bộ luật/sắc lệnh, tòa nhà nhà nước, cổng thành, con dấu quyền lực.
- **Tên file**: `public/puzzles/state.jpg`

### 6. `modern` — Nhà nước hiện đại
- **Dùng cho NPC**: Sinh Viên 🧑‍🎓
- **Nội dung cần thể hiện**: vai trò nhà nước **ngày nay** — quản lý xã hội, kinh tế, công nghệ, an sinh.
- **Gợi ý hình ảnh**: thành phố hiện đại, tòa nhà chính phủ, AI/robot, mạng lưới internet, thuế/ngân hàng, an sinh xã hội.
- **Tên file**: `public/puzzles/modern.jpg`

---

## Tổng kết
| # | Tên file | Khái niệm | NPC dùng |
|---|----------|-----------|----------|
| 1 | `commune.jpg` | Công xã nguyên thủy | Nông dân |
| 2 | `surplus.jpg` | Của cải dư thừa | Thợ thủ công |
| 3 | `property.jpg` | Tư hữu ra đời | Thương nhân |
| 4 | `conflict.jpg` | Mâu thuẫn giai cấp | Người lao động, Học giả |
| 5 | `state.jpg` | Nhà nước ra đời | Lính gác, Trưởng làng |
| 6 | `modern.jpg` | Nhà nước hiện đại | Sinh viên |

→ **Tổng cộng 6 ảnh vuông.** Khi bạn có ảnh, bỏ vào `public/puzzles/` đúng tên trên,
báo tôi để tôi sửa code cắt ảnh thật thành 9 mảnh (thay cho emoji hiện tại).
