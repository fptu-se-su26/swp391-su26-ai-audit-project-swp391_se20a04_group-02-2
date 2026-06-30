# AI Audit Log

## 1. Thông tin chung

| Thông tin | Nội dung |
| --- | --- |
| Môn học | Software Development Project |
| Mã môn học | SWP391 |
| Lớp | SE20A04 |
| Học kỳ | Summer 2026 |
| Tên bài tập / Project | Preonic - Nền tảng thương mại nông sản |
| Tên sinh viên / Nhóm | Huỳnh Văn Lĩnh / Group 02-2 |
| MSSV / Danh sách MSSV | DE170573 |
| Giảng viên hướng dẫn | Quang Lê |
| Ngày bắt đầu | 19/05/2026 |
| Ngày hoàn thành |  |

---

## 2. Công cụ AI đã sử dụng

* [x] ChatGPT
* [ ] Gemini
* [ ] Claude
* [ ] GitHub Copilot
* [ ] Cursor
* [x] Antigravity
* [ ] Perplexity
* [ ] Microsoft Copilot
* [ ] Công cụ khác: ....................................

---

## 3. Mục tiêu sử dụng AI

### Mô tả mục tiêu sử dụng AI

```text
Tôi (Huỳnh Văn Lĩnh) sử dụng AI để hỗ trợ công việc chính:
1. Thiết kế sơ đồ ERD: Gợi ý các thực thể (entities), thuộc tính, kiểu dữ liệu và xác định 
   mối quan hệ giữa các bảng trong hệ thống thương mại nông sản Preonic.

```

## 4. Nhật ký sử dụng AI chi tiết

---

### Lần sử dụng AI số 1

| Nội dung | Thông tin |
| --- | --- |
| Ngày sử dụng | 20/05/2026 |
| Công cụ AI | ChatGPT |
| Mục đích sử dụng | Gợi ý thiết kế sơ đồ ERD cho hệ thống Preonic |
| Phần việc liên quan | Database / Design |
| Mức độ sử dụng | Hỗ trợ ý tưởng |

**Entry #:** 001
**Prompt Type:** DECISION
**Stage/Component:** Decomposition

#### 4.1. Prompt đã sử dụng

```text
Dự án Preonic là nền tảng thương mại nông sản. Hệ thống bao gồm các module: 
User, Product, Order, Payment, Escrow, Contract, Dispute, Review, Conversation, 
Notification và Weather. Hãy phân tích và liệt kê các thực thể (entities), thuộc 
tính chính và mối quan hệ (Crow's Foot notation) để xây dựng sơ đồ ERD cho 
toàn bộ hệ thống này.

```

#### 4.2. Kết quả AI gợi ý

```text
AI liệt kê các bảng cơ bản (Users, Products, Orders, Payments, OrderDetails) 
và đưa ra các mối quan hệ 1:n cơ bản. Tuy nhiên, AI chưa hiểu sâu về nghiệp vụ 
đặc thù của mô hình Escrow và nông sản (Weather, Contracts).

```

#### 4.3. Phần sinh viên/nhóm đã sử dụng từ AI

```text
Tôi sử dụng cấu trúc chuẩn cho các bảng E-commerce cơ bản (Orders, OrderDetails, 
Users, Products) làm khung xương để phát triển tiếp.

```

#### 4.4. Phần sinh viên/nhóm tự chỉnh sửa hoặc cải tiến

```text
1. Bổ sung các bảng nghiệp vụ chuyên sâu: Contracts, Conversations, Disputes, Escrows, 
   Messages, PartnerRatings, PaymentTransactions, Reviews, WithdrawalRequests, 
   Notifications, WeatherAlerts.
   
2. Thiết lập logic luồng Escrow: Kết nối Orders -> Escrows -> PaymentTransactions 
   để đảm bảo tính an toàn cho giao dịch nông sản.

3. Logic hóa mối quan hệ: Chuyển đổi các quan hệ từ 1:1 sang tùy chọn (0:1) ở 
   phần Payment và Escrow để xử lý các trạng thái đơn hàng (Pending, Success, Failed).

4. Phân quyền dữ liệu: Tách biệt thực thể Farmer và Customer để quản lý địa điểm 
   và nhận WeatherAlerts chính xác.

```

#### 4.5. Minh chứng

| Loại minh chứng | Nội dung |
| --- | --- |
| File liên quan | `Huynh Van Linh/ERD_Preonic_Extended.drawio` |
| Ghi chú khác | Sơ đồ đã được nhóm review về tính logic của khóa ngoại |

#### 4.6. Nhận xét cá nhân/nhóm

```text
AI giúp định hình các bảng cơ bản cực nhanh, nhưng phần nghiệp vụ đặc thù (nông sản, 
trung gian thanh toán) là do tôi tự thiết kế để khớp với yêu cầu dự án. Bài học: 
AI hỗ trợ template, con người quyết định logic nghiệp vụ.

```

---

## 5. Bảng tổng hợp mức độ sử dụng AI

| Hạng mục | Không dùng AI | AI hỗ trợ ít | AI hỗ trợ nhiều | AI sinh chính | Ghi chú |
| --- | --- | --- | --- | --- | --- |
| Phân tích yêu cầu |  | ✓ |  |  |  |
| Viết user story/use case |  | ✓ |  |  |  |
| Thiết kế database (ERD) |  | ✓ |  |  | AI gợi ý, tôi bổ sung nghiệp vụ |
| Thiết kế kiến trúc hệ thống | ✓ |  |  |  |  |
| Thiết kế giao diện | ✓ |  |  |  |  |
| Code backend | ✓ |  |  |  |  |
| Debug lỗi | ✓ |  |  |  |  |
| Viết báo cáo |  | ✓ |  |  |  |

---

## 6. Các lỗi hoặc hạn chế từ AI

| STT | Lỗi/hạn chế từ AI | Cách phát hiện | Cách xử lý/cải tiến |
| --- | --- | --- | --- |
| 1 | Bỏ sót các thực thể chuyên sâu (Escrow, Dispute) | Đối chiếu với yêu cầu dự án | Tự bổ sung thủ công |
| 2 | Gợi ý mối quan hệ quá đơn giản (1:1) | Kiểm tra luồng thanh toán | Chỉnh sửa thành quan hệ 0:1 |

---

## 7. Kiểm chứng kết quả AI

### Nội dung kiểm chứng

```text
1. Đối chiếu tài liệu: Kiểm tra tính đúng đắn của các mối quan hệ so với tài liệu môn học.
2. Review thủ công: Đảm bảo các bảng bổ sung (Escrow, Dispute) không vi phạm 
   Normalization (dạng chuẩn 3NF).
3. Team review: Cả nhóm cùng thảo luận về sơ đồ ERD trước khi chốt để triển khai.

```

---

## 8. Đóng góp cá nhân hoặc đóng góp nhóm

| Thành viên | MSSV | Nhiệm vụ chính | Có sử dụng AI không? | Minh chứng đóng góp |
| --- | --- | --- | --- | --- |
| Huỳnh Văn Lĩnh | DE170573 | Thiết kế ERD, Cấu trúc DB | Có | ERD File, Tài liệu thiết kế |
| (Thành viên 2) | (MSSV) | (Nhiệm vụ) | Có / Không | |
| (Thành viên 3) | (MSSV) | (Nhiệm vụ) | Có / Không | |
| (Thành viên 4) | (MSSV) | (Nhiệm vụ) | Có / Không | |
| (Thành viên 5) | (MSSV) | (Nhiệm vụ) | Có / Không | |

---

## 9. Reflection cuối bài

### 9.1. AI đã hỗ trợ em/nhóm ở điểm nào?

AI giúp tạo nhanh khung bảng (boilerplate) cho sơ đồ ERD, tiết kiệm thời gian khởi tạo cấu trúc dữ liệu cơ bản.

### 9.2. Phần nào em/nhóm không sử dụng theo gợi ý của AI? Vì sao?

Các bảng nghiệp vụ chuyên sâu và các quan hệ phức tạp, vì AI không hiểu sâu quy trình trung gian thanh toán (Escrow) của dự án này.

### 9.3. Em/nhóm đã kiểm tra tính đúng đắn của kết quả AI như thế nào?

Dựa trên kiến thức về Database Design và quá trình review cùng nhóm.

### 9.4. Nếu không có AI, phần nào sẽ khó khăn nhất?

Khó khăn nhất là việc brainstorm danh sách các thuộc tính cho bảng, nếu không có AI sẽ tốn nhiều thời gian hơn.

### 9.5. Sau bài tập này, em/nhóm học được gì?

Hiểu sâu hơn về thiết kế CSDL (ERD) và tầm quan trọng của việc kiểm chứng logic nghiệp vụ.

### 9.6. Sau bài tập này, em/nhóm học được gì về cách sử dụng AI có trách nhiệm?

Coi AI là người trợ lý tham khảo, mọi quyết định về thiết kế hệ thống phải do chính mình chịu trách nhiệm.

---

## 10. Cam kết học thuật

Sinh viên/nhóm cam kết rằng nội dung AI hỗ trợ đã được ghi nhận trung thực và chịu trách nhiệm về kết quả cuối cùng.

| Đại diện sinh viên/nhóm | Ngày xác nhận |
| --- | --- |
| Huỳnh Văn Lĩnh | 01/06/2026 | 



