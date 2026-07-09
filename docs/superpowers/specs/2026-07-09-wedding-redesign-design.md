# Wedding Landing Page — Redesign Spec

Ngày: 2026-07-09
Cặp đôi: **Hùng Vương & Thu Huyền** — Lễ Thành Hôn **09.08.2026**
Stack hiện tại: Next.js 14 (App Router) · TypeScript · Tailwind 3 · framer-motion · lenis (smooth scroll)

---

## 1. Mục tiêu

Redesign lại thiệp cưới thành một landing page **đẹp, chỉn chu, hoàn chỉnh** — không còn chỗ nào lộ ra dở dang. Giữ nguyên toàn bộ **thông tin đã có** (bố mẹ 2 nhà, tên cô dâu/chú rể, 2 lễ, ngày giờ, địa điểm) và bổ sung 3 việc bố yêu cầu:

1. **Timeline** trình tự trong ngày (component đã viết sẵn nhưng chưa gắn vào trang → gắn vào + vẽ lại).
2. **Lưu vào lịch điện thoại**: nút bấm → thêm sự kiện cưới vào app Lịch của khách mời, **có lời nhắc trước ngày cưới**.
3. **Album ảnh**: dựng bố cục đẹp, chừa sẵn chỗ để sau này thả ảnh vào.
4. **Lưu lời chúc vào Firebase**: form gửi lời chúc lưu lên Firebase, **chừa sẵn chỗ config** để bố đưa config sau.

### Non-goals (ngoài phạm vi)
- Không thêm ảnh chân dung cô dâu/chú rể riêng (bố xác nhận: **bỏ**, vì chưa có ảnh).
- Không đổi nội dung thông tin lễ/gia đình (đã đủ và đúng).
- RSVP giữ backend **Google Sheets** (chỉ restyle giao diện). **Lời chúc (GuestBook) chuyển sang Firebase — xem §7.**
- Không viết lại toàn bộ legacy CSS trong 1 lần — restyle theo từng section (xem §8).

---

## 2. Hiện trạng

| Thành phần | Trạng thái |
|---|---|
| `OpeningCard` | Phong bì mở thiệp (auto 5s) — giữ, tinh chỉnh |
| `Hero` | Tên + ngày, **có ô "Ảnh sẽ cập nhật sau"** → thay bằng hoa lá |
| `Introduction` | Tiêu đề + **2 ô ảnh chân dung cô dâu/chú rể** → **bỏ khối ảnh** |
| `WeddingInfo` | Bố mẹ 2 nhà + tên cặp đôi + 2 lễ (Nạp Tài 07/08, Thành Hôn 09/08) — **giữ đủ** |
| `PhotoStrip` | "Just Married" + ô ảnh → chuyển thành **trang trí chữ** |
| `CalendarSection` | Lịch tháng 8/2026 + đếm ngược — giữ, refine |
| `Timeline` | **Đã viết, CHƯA gắn vào `page.tsx`** + có ô ảnh → **gắn vào, vẽ lại, bỏ ô ảnh** |
| `Gallery` | Toàn ô "Ảnh sẽ cập nhật sau" → **dựng album đẹp, drop-in** |
| `GuestBook` | Form lời chúc → **restyle + đổi lưu sang Firebase (xem §7)** |
| `Rsvp` | Form xác nhận tham dự → restyle |
| `Footer` / branding / snowflakes / `MusicPlayer` | Giữ, refine |

Màu chủ đạo hiện tại: `--color-primary: rgb(78,100,55)` (xanh thực vật) — **giữ làm neo thẩm mỹ**.

---

## 3. Hướng thiết kế — "Vườn cưới thanh lịch" (Elegant Botanical)

Một hướng duy nhất, cam kết rõ: thanh lịch, ấm, thiên nhiên — hoa lá minh hoạ thay cho ảnh chụp.

### Design tokens (khai báo tập trung ở `globals.css` / layer token)
| Token | Giá trị | Dùng cho |
|---|---|---|
| `--color-primary` | `rgb(78,100,55)` (xanh lá đậm) | Hành động chính, tiêu đề nhấn |
| `--color-primary-soft` | xanh lá nhạt hoá | Nền phụ, đường kẻ |
| `--color-surface` | ngà trắng ấm (KHÔNG ám vàng, vd `#faf9f6`) | Nền trang |
| `--color-ink` | xanh-than đậm (vd `#2b3327`) | **Chữ chính — rõ nét, KHÔNG màu kem** |
| `--color-muted` | xám xanh nhạt | Chữ phụ |
| `--color-gold` | vàng đồng nhạt, dùng **rất tiết chế** | Viền, con dấu, dải phân cách |
| `--space-*` | thang 4/8px | Khoảng cách |
| `--radius-*` | thang bo góc theo kích thước | Bo góc |

Nguyên tắc bám theo `frontend-design`:
- **Bỏ hẳn chữ màu kem** (bố đã than). Chữ = `--color-ink` rõ nét.
- **Vàng chỉ là điểm nhấn nhỏ** (viền/dấu/divider), không dùng làm nền mảng lớn.
- Không màu mè chỗ không cần: phần lớn là nền ngà + chữ xanh-than + 1 accent xanh lá.
- Typography: **Dancing Script** (tiêu đề tình cảm) + **Lora** (nội dung). Type-scale theo bậc, không dùng cỡ chữ lẻ.
- Contrast nhẹ nhàng, dễ đọc; không glow/gradient loè loẹt.

### Thay ảnh bằng hoa lá
Mọi ô "Ảnh sẽ cập nhật sau" → thay bằng **panel hoa lá minh hoạ** (dùng `decor-flower1/2.webp` đã có + SVG/typography), để trang trông hoàn chỉnh, không có chữ "cập nhật sau" nào lộ ra ngoài giao diện.

---

## 4. Cấu trúc trang mới (thứ tự render)

1. **OpeningCard** — phong bì mở thiệp (refine token màu)
2. **Hero** — "Save our date" · *Hùng Vương & Thu Huyền* · 09.08.2026 · nền hoa lá (bỏ ô ảnh)
3. **Intro (typographic)** — câu dẫn "When two hearts…" + trang trí hoa lá (**bỏ 2 ô ảnh chân dung**)
4. **WeddingInfo** — bố mẹ nhà trai/nhà gái + tên cặp đôi + 2 lễ đầy đủ (giữ nội dung, restyle)
5. **CalendarSection** — lịch 8/2026 (đánh dấu 07 & 09) + đếm ngược
6. **Timeline (MỚI gắn vào)** — trình tự ngày cưới, vẽ lại theo token, bỏ ô ảnh
7. **SaveToCalendar (MỚI)** — nút "Thêm vào lịch" cho từng lễ (xem §5)
8. **Gallery / Album (dựng lại)** — bố cục album đẹp, drop-in ảnh sau (xem §6)
9. **GuestBook** — sổ lời chúc (restyle)
10. **Rsvp** — xác nhận tham dự (restyle)
11. **Footer** + branding + snowflakes + MusicPlayer (giữ)

---

## 5. Tính năng MỚI — Lưu vào lịch điện thoại

**Hành vi (bố chốt):** khách bấm nút → thêm sự kiện cưới vào app Lịch trên điện thoại, **có lời nhắc trước ngày cưới**.

### Thiết kế
- Một section **"Lưu ngày cưới vào lịch của bạn"** với nút cho **từng lễ**:
  - **Lễ Thành Hôn** — 09/08/2026, 07:15, Tư gia nhà trai (Thanh Hoá) — nút chính.
  - (Tuỳ chọn) **Lễ Nạp Tài** — 07/08/2026, 07:15, Tư gia nhà gái.
- Mỗi nút cung cấp 2 cách (auto theo thiết bị, hoặc hiện cả hai):
  - **Tải file `.ics`** (VEVENT): tiêu đề, thời gian bắt đầu/kết thúc, địa điểm, mô tả, **VALARM nhắc trước 1 ngày** (và có thể trước 1 tuần). iOS/Android bấm mở là nhập thẳng vào Lịch.
  - **Link Google Calendar** (`calendar.google.com/calendar/render?action=TEMPLATE&...`) cho người dùng Google.

### Kỹ thuật
- Component mới `SaveToCalendar.tsx` (client). Sinh nội dung `.ics` phía client (Blob + download), không cần backend.
- Dữ liệu sự kiện lấy từ 1 chỗ chung (constant) để đồng bộ với `WeddingInfo`.
- Trạng thái: hover/focus/active rõ; sau khi bấm hiện xác nhận nhẹ ("Đã tạo lời nhắc" / tên lễ), không báo chung chung.
- Múi giờ: Asia/Ho_Chi_Minh; định dạng thời gian UTC trong `.ics` cho đúng chuẩn.

---

## 6. Tính năng — Album ảnh (drop-in)

**Bố chốt:** chưa có ảnh → dựng album đẹp, chừa sẵn chỗ, sau này thả ảnh vào là hiện. **Không** ghi "ảnh cập nhật sau".

### Thiết kế
- Bố cục album lưới (masonry/grid `auto-fit`), có tiêu đề "Khoảnh khắc của chúng tôi".
- **Khi chưa có ảnh:** hiển thị các khung hoa lá/typography trang trí có chủ đích (trông như một phần thiết kế, không phải chỗ trống). Không có chữ "cập nhật sau" nào.
- **Cơ chế drop-in:** danh sách ảnh đọc từ một nguồn khai báo (manifest/`public/images/album/`). Khi có ảnh, chỉ cần copy file vào thư mục + thêm tên vào manifest là album tự hiện lưới ảnh + **lightbox phóng to**.
- Tài liệu hoá cách thêm ảnh trong README/spec để bố tự thêm sau.


---

## 7. Tính năng MỚI — Lưu lời chúc vào Firebase

**Bố yêu cầu:** phần **gửi lời chúc** (Sổ lưu bút) lưu vào **Firebase**, **chừa sẵn chỗ config** để bố đưa config sau.

### Thiết kế
- Chỉ **GuestBook (lời chúc)** chuyển sang Firebase. **RSVP giữ nguyên** Google Sheets (bố không yêu cầu đổi).
- Lưu vào **Cloud Firestore**: collection `wishes`, mỗi lời chúc 1 document `{ name, message, createdAt }`.
- Sau khi gửi: xác nhận cụ thể ("Cảm ơn <tên> đã gửi lời chúc!"), giữ nội dung nếu lỗi, báo lỗi rõ ràng.

### Config (bố đã đưa — project `vuonghuyenw`)
- Config Firebase đọc từ **biến môi trường** `NEXT_PUBLIC_FIREBASE_*` (apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId, measurementId).
- Thêm dependency `firebase` (SDK web v9 modular). Tạo `src/utils/firebase.ts` khởi tạo app + Firestore 1 lần (đọc env, khởi tạo lazy, chỉ chạy client).
- Bố đã cung cấp config thật → đặt vào `.env.local` (đã được `.gitignore` bỏ qua qua `.env*`, KHÔNG commit key). `.env.example` commit kèm mẫu placeholder.
- **Khi CHƯA có config:** form vẫn hiển thị đẹp nhưng nút gửi **vô hiệu hoá có lý do rõ** ("Tính năng lời chúc sẽ sớm mở") — KHÔNG giả vờ gửi thành công (theo frontend-design).

### Bảo mật (làm khi triển khai)
- Firestore Security Rules: chỉ cho `create` document `wishes` với field hợp lệ (giới hạn độ dài name/message), không cho đọc/sửa/xoá tuỳ tiện; chống spam cơ bản. (Config web SDK `NEXT_PUBLIC_*` vốn công khai — an toàn được đảm bảo bằng Rules, không phải bằng giấu key.)
- Nếu sau này hiện "tường lời chúc": escape nội dung khi render để tránh XSS.
---

## 8. Cách tiếp cận kỹ thuật (restyle an toàn)

- **Không** viết lại toàn bộ legacy CSS (`style.css` ~30KB, `common.css` ~28KB) trong một lần — rủi ro cao.
- Thay vào đó: khai báo **layer design-token** ở `globals.css`, rồi restyle **theo từng section** — mỗi section chuyển sang token/Tailwind sạch, gỡ dần class legacy không dùng và mọi placeholder "ảnh cập nhật sau".
- Giữ layout card dọc mobile (max 575px, căn giữa) — hợp thiệp cưới; đảm bảo đẹp ở 360px.
- Component tách nhỏ, mỗi component 1 nhiệm vụ; dữ liệu (ngày/lễ/địa điểm) đưa vào 1 file constant dùng chung.

## 9. Trạng thái & responsive (theo frontend-design)
- Hover/focus/active trên mọi nút; focus rõ, khác hover.
- Form (RSVP/GuestBook): validate + báo lỗi/thành công cụ thể, giữ nội dung khách nhập.
- `prefers-reduced-motion`: giảm chuyển động.
- Kiểm ở 360 / 768 / 1280+, chữ dài không vỡ layout.

## 10. Xác minh (definition of done)
- `npm run build` + `npm run lint` sạch trên phần đã sửa.
- Chạy `npm run dev`, mở trình duyệt kiểm từng section ở 360px & desktop.
- Timeline hiển thị đúng thứ tự, không còn ô ảnh.
- Bấm nút "Thêm vào lịch" → tải được `.ics` hợp lệ (mở thử vào Lịch, có nhắc trước) + link Google Calendar mở đúng.
- Lời chúc: khi có config Firebase → gửi lưu được 1 document `wishes` (kiểm trong Firestore console). Khi chưa config → nút vô hiệu hoá có lý do, không giả vờ thành công.
- Không còn chuỗi "Ảnh sẽ cập nhật sau" nào render ra giao diện.
- Album hiện khung trang trí khi chưa có ảnh; thả 1 ảnh test vào → lưới + lightbox hoạt động.
- Không lỗi/warning console mới.

## 11. Rủi ro / lưu ý
- Legacy CSS dùng selector theo `id` + `order` flexbox → khi restyle phải kiểm không vỡ các section chưa đụng tới.
- `.ics` trên iOS Safari: kiểm cách tải/mở file (có thể cần mở tab mới thay vì download trực tiếp).
- Không tự ý full-height section (bố dặn): giữ chiều cao vừa phải.
