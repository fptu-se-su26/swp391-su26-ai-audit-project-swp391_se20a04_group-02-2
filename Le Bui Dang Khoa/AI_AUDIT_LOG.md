# AI Audit Log

## 1. Thông tin chung

| Thông tin             | Nội dung                                 |
| --------------------- | ---------------------------------------- |
| Môn học               | Software Development Project             |
| Mã môn học            | SWP391                                   |
| Lớp                   | SE20A04                                  |
| Học kỳ                | Summer 2026                              |
| Tên bài tập / Project | PreOnic – Nền tảng bao tiêu trước mùa vụ |
| Tên sinh viên / Nhóm  | Lê Bùi Đăng Khoa / Group 02              |
| MSSV / Danh sách MSSV | DE180183                                 |
| Giảng viên hướng dẫn  | Quang Lê                                 |
| Ngày bắt đầu          | 19/05/2026                               |
| Ngày hoàn thành       |                                          |

---

## 2. Công cụ AI đã sử dụng

- [x] ChatGPT
- [x] Gemini
- [x] Claude
- [x] GitHub Copilot
- [x] Cursor
- [ ] Antigravity
- [ ] Perplexity
- [ ] Microsoft Copilot
- [ ] Công cụ khác:

---

## 3. Mục tiêu sử dụng AI

### Mô tả mục tiêu sử dụng AI

```text
Nhóm sử dụng ChatGPT để hỗ trợ phân tích yêu cầu hệ thống, xác định actor và use case,
thiết kế cơ sở dữ liệu, xây dựng quy trình quản lý hợp đồng bao tiêu trước mùa vụ,
thiết kế quy trình thanh toán và hỗ trợ nghiên cứu các giải pháp cho nền tảng PreOnic.
```

---

## 4. Nhật ký sử dụng AI chi tiết

### Lần sử dụng AI số 1

| Nội dung            | Thông tin                     |
| ------------------- | ----------------------------- |
| Ngày sử dụng        | 22/05/2026                    |
| Công cụ AI          | ChatGPT                       |
| Mục đích sử dụng    | Phân tích Actors và Use Cases |
| Phần việc liên quan | Requirement Analysis          |
| Mức độ sử dụng      | Hỗ trợ một phần               |

**Entry #:** 001

**Prompt Type:** DECISION

**Stage/Component:** Decomposition

#### 4.1. Prompt đã sử dụng

```text
Analyze actors and use cases for a pre-harvest agricultural contract platform.
```

#### 4.2. Kết quả AI gợi ý

```text
- Farmer
- Buyer
- Admin
```

#### 4.3. Phần sinh viên/nhóm đã sử dụng từ AI

```text
Sử dụng các actor cơ bản làm nền tảng cho Use Case Diagram.
```

#### 4.4. Phần sinh viên/nhóm tự chỉnh sửa hoặc cải tiến

```text
- Bổ sung Contract Management.
- Bổ sung Crop Planning.
- Bổ sung Harvest Tracking.
```

#### 4.5. Minh chứng

| Loại minh chứng | Nội dung                                       |
| --------------- | ---------------------------------------------- |
| File liên quan  | Use Case Diagram, Requirement Specification    |
| Kết quả         | Hoàn thiện sơ đồ Use Case cho hệ thống PreOnic |

#### 4.6. Nhận xét cá nhân/nhóm

```text
AI hỗ trợ xác định actor cơ bản nhưng chưa bao quát đầy đủ nghiệp vụ bao tiêu mùa vụ.
```

---

### Lần sử dụng AI số 2

| Nội dung            | Thông tin         |
| ------------------- | ----------------- |
| Ngày sử dụng        | 25/05/2026        |
| Công cụ AI          | ChatGPT           |
| Mục đích sử dụng    | Thiết kế Database |
| Phần việc liên quan | Database Design   |
| Mức độ sử dụng      | Hỗ trợ một phần   |

**Entry #:** 002

**Prompt Type:** DECISION

**Stage/Component:** Abstraction

#### 4.1. Prompt đã sử dụng

```text
Design database schema for an agricultural pre-order contract platform.
```

#### 4.2. Kết quả AI gợi ý

```text
- User
- Product
- Order
```

#### 4.3. Phần sinh viên/nhóm đã sử dụng từ AI

```text
Tham khảo mô hình dữ liệu cơ bản và các thực thể chính.
```

#### 4.4. Phần sinh viên/nhóm tự chỉnh sửa hoặc cải tiến

```text
- Thêm CropSeason.
- Thêm Contract.
- Thêm ContractStatus.
```

#### 4.5. Minh chứng

| Loại minh chứng | Nội dung                                |
| --------------- | --------------------------------------- |
| File liên quan  | Database Schema, ERD                    |
| Kết quả         | Hoàn thiện sơ đồ ERD và Database Design |

#### 4.6. Nhận xét cá nhân/nhóm

```text
AI đưa ra mô hình thương mại điện tử cơ bản, nhóm mở rộng theo nghiệp vụ nông nghiệp.
```

---

### Lần sử dụng AI số 3

| Nội dung            | Thông tin                  |
| ------------------- | -------------------------- |
| Ngày sử dụng        | 28/05/2026                 |
| Công cụ AI          | ChatGPT                    |
| Mục đích sử dụng    | Thiết kế hợp đồng bao tiêu |
| Phần việc liên quan | Business Process Design    |
| Mức độ sử dụng      | Hỗ trợ một phần            |

**Entry #:** 003

**Prompt Type:** PROBLEM-SOLVING

**Stage/Component:** Algorithms

#### 4.1. Prompt đã sử dụng

```text
How should a pre-harvest agricultural contract be managed in a web system?
```

#### 4.2. Kết quả AI gợi ý

```text
Cho phép tạo, chỉnh sửa và xác nhận hợp đồng.
```

#### 4.3. Phần sinh viên/nhóm đã sử dụng từ AI

```text
Áp dụng luồng tạo và xác nhận hợp đồng.
```

#### 4.4. Phần sinh viên/nhóm tự chỉnh sửa hoặc cải tiến

```text
- Pending
- Approved
- Rejected
- Completed
- Thêm thời gian hiệu lực hợp đồng
```

#### 4.5. Minh chứng

| Loại minh chứng | Nội dung                          |
| --------------- | --------------------------------- |
| File liên quan  | Contract Module Design            |
| Kết quả         | Hoàn thiện luồng quản lý hợp đồng |

#### 4.6. Nhận xét cá nhân/nhóm

```text
Giúp quản lý hợp đồng rõ ràng và phù hợp hơn với nghiệp vụ thực tế.
```

---

### Lần sử dụng AI số 4

| Nội dung            | Thông tin                             |
| ------------------- | ------------------------------------- |
| Ngày sử dụng        | 30/05/2026                            |
| Công cụ AI          | ChatGPT                               |
| Mục đích sử dụng    | Thiết kế quy trình thanh toán đặt cọc |
| Phần việc liên quan | Business Logic Design                 |
| Mức độ sử dụng      | Hỗ trợ một phần                       |

**Entry #:** 004

**Prompt Type:** PROBLEM-SOLVING

**Stage/Component:** Algorithms

#### 4.1. Prompt đã sử dụng

```text
How to manage deposit payments in contract-based systems?
```

#### 4.2. Kết quả AI gợi ý

```text
Lưu thông tin thanh toán và trạng thái thanh toán.
```

#### 4.3. Phần sinh viên/nhóm đã sử dụng từ AI

```text
Sử dụng mô hình lưu giao dịch và trạng thái thanh toán.
```

#### 4.4. Phần sinh viên/nhóm tự chỉnh sửa hoặc cải tiến

```text
- Tách Deposit Payment.
- Tách Final Payment.
- Kiểm tra mức đặt cọc tối thiểu.
```

#### 4.5. Minh chứng

| Loại minh chứng | Nội dung                                 |
| --------------- | ---------------------------------------- |
| File liên quan  | Payment Flow Diagram                     |
| Kết quả         | Hoàn thiện quy trình thanh toán hợp đồng |

#### 4.6. Nhận xét cá nhân/nhóm

```text
Phù hợp với mô hình bao tiêu trước mùa vụ.
```

---

### Lần sử dụng AI số 5

| Nội dung            | Thông tin                         |
| ------------------- | --------------------------------- |
| Ngày sử dụng        | 02/06/2026                        |
| Công cụ AI          | ChatGPT                           |
| Mục đích sử dụng    | Nghiên cứu API dự báo nông nghiệp |
| Phần việc liên quan | Research                          |
| Mức độ sử dụng      | Hỗ trợ ít                         |

**Entry #:** 005

**Prompt Type:** VERIFICATION

**Stage/Component:** Research

#### 4.1. Prompt đã sử dụng

```text
Suggest APIs for agricultural crop prediction.
```

#### 4.2. Kết quả AI gợi ý

```text
AI đề xuất một API dự báo mùa vụ.
```

#### 4.3. Phần sinh viên/nhóm đã sử dụng từ AI

```text
Không sử dụng trực tiếp.
```

#### 4.4. Phần sinh viên/nhóm tự chỉnh sửa hoặc cải tiến

```text
- Kiểm tra nguồn API.
- Không tìm thấy tài liệu chính thức.
- Loại bỏ đề xuất khỏi hệ thống.
```

#### 4.5. Minh chứng

| Loại minh chứng    | Nội dung                          |
| ------------------ | --------------------------------- |
| Kết quả kiểm chứng | Không tồn tại tài liệu API hợp lệ |

#### 4.6. Nhận xét cá nhân/nhóm

```text
Đây là trường hợp Hallucination (Fabrication). AI tạo ra thông tin không thể xác minh.
```

---

## 5. Bảng tổng hợp mức độ sử dụng AI

| Hạng mục                  | Không dùng AI | AI hỗ trợ ít | AI hỗ trợ nhiều | AI sinh chính | Ghi chú                      |
| ------------------------- | :-----------: | :----------: | :-------------: | :-----------: | ---------------------------- |
| Phân tích yêu cầu         |               |       ✓      |                 |               | Gợi ý actor và use case      |
| Thiết kế Use Case         |               |       ✓      |                 |               | AI hỗ trợ ban đầu            |
| Thiết kế Database         |               |       ✓      |                 |               | AI gợi ý thực thể cơ bản     |
| Thiết kế Business Process |               |       ✓      |                 |               | Hợp đồng và thanh toán       |
| Thiết kế UI               |               |              |                 |       ✓       | Nhóm tự thực hiện            |
| Coding                    |               |              |        ✓        |               | Chưa sử dụng AI để sinh code |
| Testing                   |       ✓       |              |                 |               | Tự thực hiện                 |
| Research                  |               |       ✓      |                 |               | Có kiểm chứng lại            |

---

## 6. Các lỗi hoặc hạn chế từ AI

| STT | Lỗi/hạn chế từ AI                | Cách phát hiện               | Cách xử lý/cải tiến                     |
| --: | -------------------------------- | ---------------------------- | --------------------------------------- |
|   1 | Actor chưa đầy đủ                | Review nghiệp vụ             | Bổ sung Crop Planning, Harvest Tracking |
|   2 | Database quá đơn giản            | So sánh yêu cầu hệ thống     | Thêm Contract, CropSeason               |
|   3 | Quy trình hợp đồng chưa chi tiết | Phân tích nghiệp vụ          | Thêm trạng thái hợp đồng                |
|   4 | Hallucination về API nông nghiệp | Kiểm tra tài liệu chính thức | Loại bỏ API                             |

---

## 7. Kiểm chứng kết quả AI

```text
- Đối chiếu với yêu cầu nghiệp vụ của hệ thống PreOnic.
- Thảo luận nhóm trước khi áp dụng.
- Kiểm tra tài liệu tham khảo và nguồn chính thức.
- Đánh giá lại mô hình dữ liệu và quy trình nghiệp vụ.
```

---

## 9. Reflection cuối bài

### AI đã hỗ trợ em/nhóm ở điểm nào?

```text
- Phân tích yêu cầu.
- Thiết kế database.
- Gợi ý quy trình hợp đồng.
- Hỗ trợ nghiên cứu giải pháp.
```

### Phần nào em/nhóm không sử dụng theo gợi ý của AI? Vì sao?

```text
Các đề xuất không phù hợp với nghiệp vụ nông nghiệp hoặc không thể xác minh.
```

### Em/nhóm đã kiểm tra tính đúng đắn của kết quả AI như thế nào?

```text
Đối chiếu với tài liệu môn học, yêu cầu dự án và nguồn tham khảo chính thức.
```

### Nếu không có AI, phần nào sẽ khó khăn nhất?

```text
Phân tích yêu cầu ban đầu và thiết kế cơ sở dữ liệu cho mô hình bao tiêu trước mùa vụ.
```

### Sau bài tập/project này, em/nhóm học được gì về cách sử dụng AI có trách nhiệm?

```text
AI chỉ nên được xem là công cụ hỗ trợ. Mọi kết quả đều cần kiểm chứng trước khi áp dụng vào sản phẩm thực tế.
```
