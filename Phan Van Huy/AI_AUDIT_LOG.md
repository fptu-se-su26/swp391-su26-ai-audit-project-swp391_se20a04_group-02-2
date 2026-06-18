# AI Audit Log

## 1. Thông tin chung

| Thông tin | Nội dung |
|---|---|
| Môn học | Software Development Project |
| Mã môn học | SWP391 |
| Lớp | SE20A04 |
| Học kỳ | Summer 2026 |
| Tên bài tập / Project | Preonic - Nền tảng thương mại nông sản |
| Tên sinh viên / Nhóm | Phan Văn Huy / Group 02-2 |
| MSSV / Danh sách MSSV | DE170252 |
| Giảng viên hướng dẫn | Quang Lê |
| Ngày bắt đầu | 19/05/2026 |
| Ngày hoàn thành | |

---

## 2. Công cụ AI đã sử dụng

- [x] ChatGPT
- [ ] Gemini
- [ ] Claude
- [ ] GitHub Copilot
- [ ] Cursor
- [x] Antigravity
- [ ] Perplexity
- [ ] Microsoft Copilot
- [ ] Công cụ khác: ....................................

---

## 3. Mục tiêu sử dụng AI

### Mô tả mục tiêu sử dụng AI

```text
Tôi (Phan Văn Huy) sử dụng AI để hỗ trợ hai mảng công việc chính:
1. Thiết kế Use Case Diagram: Phân tích actors, xác định use cases và mối quan hệ UML.
2. Phát triển Backend (Node.js + Express + MSSQL): Thiết kế database schema, xây dựng
   Product model và controller.
```

## 4. Nhật ký sử dụng AI chi tiết

---

### Lần sử dụng AI số 1

| Nội dung | Thông tin |
|---|---|
| Ngày sử dụng | 19/05/2026 |
| Công cụ AI | ChatGPT |
| Mục đích sử dụng | Phân tích actors và xác định danh sách use cases cho hệ thống Preonic |
| Phần việc liên quan | Requirement / Design |
| Mức độ sử dụng | Hỗ trợ ý tưởng |

**Entry #:** 001
**Prompt Type:** DECISION
**Stage/Component:** Decomposition

#### 4.1. Prompt đã sử dụng

```text
Dự án Preonic là nền tảng thương mại nông sản kết nối nông dân (Farmer) với người tiêu dùng
(Customer). Hệ thống có các chức năng chính: đăng ký/đăng nhập, quản lý sản phẩm nông sản,
đặt hàng, thanh toán, đánh giá sản phẩm, và dashboard thống kê. Hãy phân tích và liệt kê
tất cả actors cùng use cases cho hệ thống này theo chuẩn UML.
```

#### 4.2. Kết quả AI gợi ý

```text
AI liệt kê 4 actors (Guest, Customer, Farmer, Admin) và khoảng 35 use cases chia theo module:
Authentication, Product Management, Order Management, Payment, Review, Dashboard. AI cũng gợi
ý các mối quan hệ include/extend cơ bản, ví dụ Place Order <<include>> Login.
```

#### 4.3. Phần sinh viên/nhóm đã sử dụng từ AI

```text
Tôi sử dụng danh sách actors cơ bản (Guest, Customer, Farmer, Admin) và cấu trúc phân nhóm
use cases theo module làm khung sườn ban đầu.
```

#### 4.4. Phần sinh viên/nhóm tự chỉnh sửa hoặc cải tiến

```text
1. AI thiếu use cases đặc thù cho domain nông sản: tôi bổ sung thêm Manage Farm Profile,
   View Product Origin, Manage Harvest Schedule - nghiệp vụ mà AI không thể biết.

2. AI gộp Customer và Farmer chung nhiều use cases, nhưng Preonic phân quyền rõ ràng:
   Farmer có dashboard riêng với thống kê doanh thu, Customer có dashboard đơn hàng.
   Tôi tách riêng.

3. Tôi mở rộng danh sách từ 35 lên 50 use cases, bổ sung module Blog/News cho nông dân
   chia sẻ kinh nghiệm canh tác.

4. Sửa mối quan hệ UML sai: AI đề xuất "Login" <<include>> "View Dashboard" - sai về
   ngữ nghĩa. Login là precondition, không phải include. Tôi sửa lại đúng chuẩn.
```

#### 4.5. Minh chứng

| Loại minh chứng | Nội dung |
|---|---|
| File liên quan | `Phan Van Huy/#1/`, `Preonic_UseCase_Specifications.md` |
| Ghi chú khác | Danh sách 50 use cases đã được team review |

#### 4.6. Nhận xét cá nhân/nhóm

```text
AI giúp có khung sườn nhanh, nhưng phần domain-specific (nông sản, truy xuất nguồn gốc)
hoàn toàn do tôi bổ sung. Bài học: AI tốt cho generic e-commerce use cases, nhưng cần
kiến thức domain để tùy chỉnh.
```

---

### Lần sử dụng AI số 2

| Nội dung | Thông tin |
|---|---|
| Ngày sử dụng | 21/05/2026 |
| Công cụ AI | ChatGPT |
| Mục đích sử dụng | Thiết kế database schema cho bảng Products trên MSSQL |
| Phần việc liên quan | Database / Backend |
| Mức độ sử dụng | Hỗ trợ một phần |

**Entry #:** 002
**Prompt Type:** DECISION
**Stage/Component:** Abstraction

#### 4.1. Prompt đã sử dụng

```text
Thiết kế database schema cho bảng Products trong hệ thống Preonic (nền tảng nông sản).
Sử dụng MSSQL. Mỗi product thuộc về một farmer, có thông tin: tên, mô tả, danh mục, giá,
số lượng tồn kho, ảnh sản phẩm.
```

#### 4.2. Kết quả AI gợi ý

```text
AI đề xuất schema: ProductID (INT IDENTITY), FarmerID (INT, FK references Farmers),
ProductName (VARCHAR(200)), Description (TEXT), CategoryID (INT, FK references Categories),
Price (MONEY), StockQuantity (INT), ImagePath (VARCHAR(500)), CreatedDate (DATETIME).
AI gợi ý tạo bảng Categories riêng với FK constraint.
```

#### 4.3. Phần sinh viên/nhóm đã sử dụng từ AI

```text
Tôi tham khảo cấu trúc cơ bản: các cột name, description, price, quantity, imageUrl,
createdAt, updatedAt. Ý tưởng dùng IDENTITY cho primary key cũng được áp dụng.
```

#### 4.4. Phần sinh viên/nhóm tự chỉnh sửa hoặc cải tiến

```text
1. VARCHAR → NVARCHAR: AI dùng VARCHAR sẽ mất dấu tiếng Việt (tên nông sản như "Bưởi Năm
   Roi", "Xoài cát Hòa Lộc"). Đây là lỗi nghiêm trọng cho ứng dụng Việt Nam.

2. FarmerID: Đổi từ INT (FK) → NVARCHAR(128) vì authentication dùng MongoDB ở backend
   riêng, farmer ID là ObjectId dạng string. AI không biết kiến trúc 2-backend nên gợi ý
   FK constraint là không khả thi.

3. Bỏ bảng Categories riêng: Chỉ có vài category cố định, dùng NVARCHAR(128) đơn giản
   hơn, đủ cho MVP.

4. Price: Đổi MONEY → DECIMAL(18,2) vì MONEY có vấn đề rounding, DECIMAL an toàn hơn.

5. Thêm IF NOT EXISTS check trong ensureTable() để auto-create table khi server start.
```

#### 4.5. Minh chứng

| Loại minh chứng | Nội dung |
|---|---|
| File liên quan | `Phan Van Huy/backend/models/Product.js` (lines 15-33: ensureTable) |
| Kết quả chạy/test | Table tạo thành công, test INSERT/SELECT dữ liệu tiếng Việt OK |

#### 4.6. Nhận xét cá nhân/nhóm

```text
AI đưa ra schema "chuẩn quốc tế" nhưng thiếu localization cho Việt Nam. Quyết định đổi
VARCHAR → NVARCHAR tuy nhỏ nhưng ảnh hưởng toàn bộ data layer. Bài học: luôn xem xét
yêu cầu ngôn ngữ/locale khi thiết kế database.
```

---

### Lần sử dụng AI số 3

| Nội dung | Thông tin |
|---|---|
| Ngày sử dụng | 23/05/2026 |
| Công cụ AI | ChatGPT |
| Mục đích sử dụng | Viết Product model class với parameterized queries chống SQL Injection |
| Phần việc liên quan | Backend |
| Mức độ sử dụng | Hỗ trợ một phần |

**Entry #:** 003
**Prompt Type:** PROBLEM-SOLVING
**Stage/Component:** Algorithms

#### 4.1. Prompt đã sử dụng

```text
Viết Product model class trong Node.js sử dụng thư viện mssql để tương tác với SQL Server.
Model cần có các method: getAll (có filter theo farmerId), getById, create, update, delete.
Yêu cầu sử dụng parameterized queries để chống SQL injection.
```

#### 4.2. Kết quả AI gợi ý

```text
AI cung cấp Product model class với CRUD methods. Sử dụng pool.request().input() cho
parameterized queries. Tuy nhiên, method getAll lại dùng string concatenation để build
WHERE clause: query += " WHERE farmerId = '" + farmerId + "'"
```

#### 4.3. Phần sinh viên/nhóm đã sử dụng từ AI

```text
Tôi sử dụng cấu trúc class-based model với static methods và pattern trả về
new Product(result.recordset[0]) thay vì raw data.
```

#### 4.4. Phần sinh viên/nhóm tự chỉnh sửa hoặc cải tiến

```text
HALLUCINATION DETECTED - Logic Error:

AI nói "use parameterized queries" nhưng code getAll lại dùng string concatenation:
  query += " WHERE farmerId = '" + farmerId + "'"
→ Nói một đằng, code một nẻo.

Tôi sửa thành:
  query += ' WHERE farmerId = @farmerId';
  request.input('farmerId', farmerId);

Các cải tiến khác:
1. Thêm OUTPUT INSERTED.* vào INSERT/UPDATE queries để trả về record vừa tạo mà không
   cần query lại - tiết kiệm 1 round-trip.
2. Constructor defaults (description || '', price || 0) tránh undefined.
3. Bỏ try-catch trong model, để error handling ở controller/middleware layer.
```

#### 4.5. Minh chứng

| Loại minh chứng | Nội dung |
|---|---|
| File liên quan | `Phan Van Huy/backend/models/Product.js`, `Phan Van Huy/backend/controllers/productController.js` |
| Kết quả chạy/test | Test SQL injection với `'; DROP TABLE Products;--` → parameterized, không bị inject |

#### 4.6. Nhận xét cá nhân/nhóm

```text
Bài học quan trọng: KHÔNG BAO GIỜ tin AI về vấn đề bảo mật. AI có thể nói đúng lý thuyết
nhưng code thực tế lại sai. Phải tự review từng dòng code, đặc biệt phần xử lý user input
và database queries.
```

---

## 5. Bảng tổng hợp mức độ sử dụng AI

| Hạng mục | Không dùng AI | AI hỗ trợ ít | AI hỗ trợ nhiều | AI sinh chính | Ghi chú |
|---|:---:|:---:|:---:|:---:|---|
| Phân tích yêu cầu |  | ✓ |  |  | AI gợi ý khung, tôi bổ sung domain-specific |
| Viết user story/use case |  | ✓ |  |  | AI tạo template, tôi chỉnh sửa nội dung |
| Thiết kế database |  | ✓ |  |  | AI gợi ý schema, tôi đổi data types |
| Thiết kế kiến trúc hệ thống | ✓ |  |  |  | Tự quyết định kiến trúc |
| Thiết kế giao diện | ✓ |  |  |  | Không thuộc phần việc của tôi |
| Code frontend | ✓ |  |  |  | Không thuộc phần việc của tôi |
| Code backend |  | ✓ |  |  | AI hỗ trợ cấu trúc, tôi viết logic và fix security |
| Debug lỗi | ✓ |  |  |  | Tự debug |
| Viết test case | ✓ |  |  |  | Chưa thực hiện |
| Kiểm thử sản phẩm | ✓ |  |  |  | Tự test bằng Postman |
| Tối ưu code | ✓ |  |  |  | Chưa thực hiện |
| Viết báo cáo |  | ✓ |  |  | AI hỗ trợ format |
| Làm slide thuyết trình | ✓ |  |  |  | Chưa thực hiện |

---

## 6. Các lỗi hoặc hạn chế từ AI

| STT | Lỗi/hạn chế từ AI | Cách phát hiện | Cách xử lý/cải tiến |
|---:|---|---|---|
| 1 | SQL Injection trong code AI: nói dùng parameterized queries nhưng code dùng string concatenation (Entry #003) | Code review thủ công | Sửa thành pool.request().input() |
| 2 | AI dùng VARCHAR thay vì NVARCHAR cho ứng dụng tiếng Việt (Entry #002) | Test INSERT dữ liệu có dấu | Đổi tất cả VARCHAR → NVARCHAR |
| 3 | AI nhầm precondition với <<include>> relationship trong UML (Entry #001) | Đối chiếu tài liệu môn SE | Sửa thành precondition |

---

## 7. Kiểm chứng kết quả AI

### Nội dung kiểm chứng

```text
1. Code review thủ công: Đọc từng dòng code AI gợi ý, kiểm tra SQL queries, data types.
2. Chạy thử: Test API endpoints bằng Postman (GET, POST, PUT, DELETE).
3. Security test: Thử SQL injection qua API → verify parameterized queries hoạt động.
4. Đối chiếu tài liệu: UML relationships đối chiếu với slide môn Software Engineering.
5. Team review: Use Case Diagram được team review trước khi chốt.
```

---

## 8. Đóng góp cá nhân hoặc đóng góp nhóm

### 8.1. Đối với bài cá nhân

```text
N/A - Đây là bài nhóm.
```

### 8.2. Đối với bài nhóm

| Thành viên | MSSV | Nhiệm vụ chính | Có sử dụng AI không? | Minh chứng đóng góp |
|---|---|---|---|---|
| Phan Văn Huy | DE170252 | Use Case Diagram, Backend (MSSQL, Product CRUD) | Có | Code commits, Use Case Specifications doc |
| (Thành viên 2) | (MSSV) | (Nhiệm vụ) | Có / Không | |
| (Thành viên 3) | (MSSV) | (Nhiệm vụ) | Có / Không | |
| (Thành viên 4) | (MSSV) | (Nhiệm vụ) | Có / Không | |
| (Thành viên 5) | (MSSV) | (Nhiệm vụ) | Có / Không | |

---

## 9. Reflection cuối bài

### 9.1. AI đã hỗ trợ em/nhóm ở điểm nào?

```text
AI hỗ trợ hiệu quả ở việc brainstorming (liệt kê actors, use cases) và tạo code boilerplate
(cấu trúc model class, CRUD template), giúp tiết kiệm thời gian setup ban đầu.
```

### 9.2. Phần nào em/nhóm không sử dụng theo gợi ý của AI? Vì sao?

```text
- VARCHAR → đổi NVARCHAR vì cần hỗ trợ tiếng Việt.
- String concatenation SQL → đổi parameterized queries vì lỗ hổng bảo mật.
- UML include sai → sửa thành precondition vì AI nhầm khái niệm UML.
- FK constraint cho FarmerID → bỏ vì kiến trúc 2-backend (MSSQL + MongoDB).
```

### 9.3. Em/nhóm đã kiểm tra tính đúng đắn của kết quả AI như thế nào?

```text
Code review thủ công, test API bằng Postman, test SQL injection, đối chiếu tài liệu UML.
```

### 9.4. Nếu không có AI, phần nào sẽ khó khăn nhất?

```text
Liệt kê đầy đủ use cases sẽ mất thêm thời gian brainstorm. Tuy nhiên phần database
design, backend coding và UML modeling tôi hoàn toàn tự làm được dựa trên kiến thức
từ các môn học.
```

### 9.5. Sau bài tập/project này, em/nhóm học được gì về môn học?

```text
Hiểu sâu hơn về database design (NVARCHAR cho Unicode, DECIMAL vs MONEY), RESTful API
design, và UML Use Case Diagram đúng chuẩn (phân biệt include/extend/precondition).
```

### 9.6. Sau bài tập/project này, em/nhóm học được gì về cách sử dụng AI có trách nhiệm?

```text
AI là công cụ hỗ trợ, không phải giải pháp. Luôn verify code AI (đặc biệt về security),
xem xét bối cảnh cụ thể (locale, team constraints), và có khả năng giải thích mọi phần
code đã sử dụng.
```

---

## 10. Cam kết học thuật

Sinh viên/nhóm cam kết rằng:

- Nội dung AI hỗ trợ đã được ghi nhận trung thực.
- Không nộp nguyên văn kết quả AI mà không kiểm tra.
- Có khả năng giải thích các phần đã nộp.
- Chịu trách nhiệm về tính đúng đắn của sản phẩm cuối cùng.
- Hiểu rằng việc sử dụng AI không khai báo có thể ảnh hưởng đến kết quả đánh giá.

| Đại diện sinh viên/nhóm | Ngày xác nhận |
|---|---|
| Phan Văn Huy | 01/06/2026 |
