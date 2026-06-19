# AI Audit Log

## 1. Thông tin chung

| Thông tin | Nội dung |
|---|---|
| Môn học | SWP391 |
| Project | PreOnic – Nền tảng bao tiêu trước mùa vụ |
| Nhóm | Group 5 |
| Học kỳ | Summer 2026 |

---

## 2. Công cụ AI sử dụng

- [x] ChatGPT

---

## 3. Nhật ký sử dụng AI

### Entry #001

| Nội dung | Thông tin |
|---|---|
| Mục đích | Phân tích Actors và Use Cases |
| Loại Prompt | Decision |
| Component | Decomposition |

**Prompt**
Analyze actors and use cases for a pre-harvest agricultural contract platform.

**AI gợi ý**
- Farmer
- Buyer
- Admin

**Nhóm cải tiến**
- Bổ sung Contract Management.
- Bổ sung Crop Planning.
- Bổ sung Harvest Tracking.

**Nhận xét**
AI hỗ trợ xác định actor cơ bản nhưng chưa bao quát nghiệp vụ bao tiêu mùa vụ.

---

### Entry #002

| Nội dung | Thông tin |
|---|---|
| Mục đích | Thiết kế Database |
| Loại Prompt | Decision |
| Component | Abstraction |

**Prompt**
Design database schema for an agricultural pre-order contract platform.

**AI gợi ý**
- User
- Product
- Order

**Nhóm cải tiến**
- Thêm CropSeason.
- Thêm Contract.
- Thêm ContractStatus.

**Nhận xét**
AI đưa ra mô hình thương mại điện tử cơ bản, nhóm mở rộng theo nghiệp vụ nông nghiệp.

---

### Entry #003

| Nội dung | Thông tin |
|---|---|
| Mục đích | Thiết kế hợp đồng bao tiêu |
| Loại Prompt | Problem-Solving |
| Component | Algorithms |

**Prompt**
How should a pre-harvest agricultural contract be managed in a web system?

**AI gợi ý**
Cho phép tạo, chỉnh sửa và xác nhận hợp đồng.

**Nhóm cải tiến**
- Thêm trạng thái Pending, Approved, Rejected, Completed.
- Thêm thời gian hiệu lực hợp đồng.

**Nhận xét**
Giúp quản lý hợp đồng rõ ràng hơn.

---

### Entry #004

| Nội dung | Thông tin |
|---|---|
| Mục đích | Xử lý thanh toán đặt cọc |
| Loại Prompt | Problem-Solving |
| Component | Algorithms |

**Prompt**
How to manage deposit payments in contract-based systems?

**AI gợi ý**
Lưu thông tin thanh toán và trạng thái.

**Nhóm cải tiến**
- Tách Deposit và Final Payment.
- Kiểm tra số tiền đặt cọc tối thiểu.

**Nhận xét**
Phù hợp với mô hình bao tiêu trước mùa vụ.

---

### Entry #005 (Hallucination)

| Nội dung | Thông tin |
|---|---|
| Mục đích | Tìm API dự báo nông nghiệp |
| Loại Prompt | Verification |
| Component | Research |

**Prompt**
Suggest APIs for agricultural crop prediction.

**AI gợi ý**
Một API dự báo mùa vụ không có tài liệu chính thức.

**Phát hiện**
- Không tìm thấy website.
- Không có tài liệu API.

**Cách xử lý**
- Loại bỏ đề xuất.
- Chỉ sử dụng dữ liệu do người dùng nhập.

**Loại Hallucination**
Fabrication.

---

## 4. Reflection

### AI hỗ trợ gì?
- Phân tích yêu cầu.
- Thiết kế database.
- Gợi ý quy trình hợp đồng bao tiêu.

### Nhóm đã điều chỉnh gì?
- Bổ sung nghiệp vụ mùa vụ.
- Bổ sung quản lý hợp đồng.
- Điều chỉnh quy trình thanh toán.

### Bài học rút ra
- AI giúp tạo ý tưởng nhanh.
- Các nghiệp vụ đặc thù của PreOnic vẫn cần nhóm tự phân tích và quyết định.
- Luôn kiểm tra lại thông tin AI cung cấp trước khi áp dụng.
