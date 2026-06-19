# AI Audit Log

## 1. Thông tin chung

| Thông tin | Nội dung |
| --- | --- |
| Môn học | Software Development Project |
| Mã môn học | SWP391 |
| Lớp | SE20A04 |
| Học kỳ | Summer 2026 |
| Tên bài tập / Project | PreOnic – Nền tảng bao tiêu trước mùa vụ |
| Tên sinh viên / Nhóm | Lê Văn Hoàng Quang / Group 02 |
| MSSV / Danh sách MSSV | DE180183 |
| Giảng viên hướng dẫn | Quang Lê |
| Ngày bắt đầu | 19/05/2026 |
| Ngày hoàn thành |  |

---

## 2. Công cụ AI đã sử dụng

* [x] ChatGPT
* [x] Gemini
* [ ] Claude
* [x] GitHub Copilot
* [x] Cursor
* [ ] Perplexity
* [ ] Microsoft Copilot

---

## 3. Mục tiêu sử dụng AI

```text
Nhóm sử dụng các mô hình ngôn ngữ lớn (ChatGPT, Gemini) và AI Coding Assistant (GitHub Copilot, Cursor) để hỗ trợ phân tích yêu cầu hệ thống, xây dựng kiến trúc cơ sở dữ liệu phi quan hệ (MongoDB/Mongoose), thiết kế luồng xử lý xác thực bảo mật hệ thống (Authentication & Authorization với JWT), tối ưu hóa cấu trúc mã nguồn theo mô hình 3-Layer Architecture (Routes - Controller - Service), và nghiên cứu các giải pháp phòng ngừa rủi ro logic/bảo mật cho nền tảng bao tiêu PreOnic.

```

---

## 4. Nhật ký sử dụng AI chi tiết

### Lần sử dụng AI số 1

* **Entry #:** 001
* **Prompt Type:** DECISION
* **Stage/Component:** Decomposition (Phân rã hệ thống)

#### 4.1. Problem/Context

Hệ thống cần xác định rõ các đối tượng tác động (Actors) và các ca sử dụng (Use Cases) cốt lõi ngay từ giai đoạn khởi đầu để làm căn cứ thiết kế kiến trúc hệ thống PreOnic.

#### 4.2. Prompt to AI (NGUYÊN VĂN)

```text
Analyze actors and use cases for a pre-harvest agricultural contract platform.

```

#### 4.3. AI Response (Summary)

AI đề xuất 3 nhóm actor cơ bản bao gồm: Farmer (Nông dân), Buyer (Thương lái/Người mua), và Admin (Quản trị viên) cùng các tính năng cơ bản như quản lý tài khoản, đăng bài sản phẩm và quản lý đơn hàng thương mại điện tử.

#### 4.4. Human Delta & Reflection

* **Critical Thinking:** AI đưa ra các actor chính xác nhưng ở mức độ quá chung chung, tương tự như một website thương mại điện tử (E-commerce) mua bán thông thường, chưa chỉ ra được các nghiệp vụ đặc thù mang tính ràng buộc pháp lý của mô hình bao tiêu nông sản.
* **Contextualization:** AI hoàn toàn bỏ qua bối cảnh thực tế tại Việt Nam: việc bao tiêu trước mùa vụ đòi hỏi phải quản lý chặt chẽ tiến độ tăng trưởng của nông sản theo thời gian thực và kiểm soát rủi ro tranh chấp hợp đồng khi có thiên tai/mất mùa từ phía nhà nông.
* **Creative Synthesis:** Nhóm giữ lại 3 actor nền tảng của AI, đồng thời tự nghiên cứu thực tế và chủ động thiết kế thêm các Use Case quan trọng: *Crop Planning (Lập kế hoạch mùa vụ)*, *Harvest Tracking (Theo dõi thu hoạch)* và *Contract Management (Quản lý hợp đồng bao tiêu)*.
* **Decision Ownership:** Nhóm quyết định tái cấu trúc lại toàn bộ sơ đồ Use Case theo quy trình nghiệp vụ nông nghiệp thực tế, bởi nếu chỉ dùng gợi ý thương mại điện tử của AI thì project sẽ bị sai lệch bản chất đề tài và không giải quyết được bài toán bao tiêu.

#### 4.5. Liên hệ với PBL/RBL Component

* **PBL:** Giai đoạn Phân tích yêu cầu - Milestone tuần 2.
* **CT (Computational Thinking):** *Decomposition* – Phân rã hệ thống lớn thành các module tính năng nhỏ hơn dựa trên đặc thù Actor nông nghiệp.
* **AI Reflection:** Phát hiện lỗi *Oversimplification* (Quá đơn giản hóa) của AI đối với domain chuyên biệt.

#### 4.6. Evidence (Minh chứng)

* Tài liệu SRS: `SRS_PreOnic_V1.0 (Section 3.2: Use Case Specification)`.

---

### Lần sử dụng AI số 2

* **Entry #:** 002
* **Prompt Type:** DECISION
* **Stage/Component:** Abstraction (Mô hình hóa dữ liệu)

#### 4.1. Problem/Context

Cần thiết kế Schema lưu trữ thông tin người dùng trong cơ sở dữ liệu MongoDB/Mongoose cho hệ thống PreOnic, đảm bảo phân tách rõ quyền hạn người dùng ngay từ lúc đăng ký.

#### 4.2. Prompt to AI (NGUYÊN VĂN)

```text
Design a Mongoose schema for a user profile with role-based access control.

```

#### 4.3. AI Response (Summary)

AI gợi ý một Schema cơ bản gồm các trường `username`, `email`, `password`, và `role` kiểu String nhận giá trị mặc định là 'user' hoặc 'admin'.

#### 4.4. Human Delta & Reflection

* **Critical Thinking:** Schema của AI chỉ phù hợp với các ứng dụng Web thông thường. Với một nền tảng nông nghiệp bao tiêu như PreOnic, thông tin định danh địa lý và phân loại pháp nhân (Nông dân vs Doanh nghiệp/Thương lái) là bắt buộc để ràng buộc hợp đồng kinh tế.
* **Contextualization:** Trong thực tế giao dịch nông sản tại Việt Nam, việc xác định rõ địa chỉ chi tiết tới cấp Xã/Huyện/Tỉnh (`province`, `district`, `ward`) là điều kiện cốt lõi để tính toán vùng trồng và điều phối logistics thu mua.
* **Creative Synthesis:** Nhóm đã lấy cấu trúc Schema nền tảng của AI và thực hiện các cải tiến sâu sắc: Giới hạn trường `role` nghiêm ngặt bằng cấu trúc Enum gồm `['Farmer', 'Business']`, tích hợp các trường định danh địa điểm chi tiết, và thêm cấu hình thuộc tính `{ timestamps: true }` để Mongoose tự động quản lý thời gian tạo tài khoản (`createdAt`).
* **Decision Ownership:** Quyết định áp dụng Schema tùy biến này vào file `User.js` để làm nền tảng vững chắc cho việc đối chiếu vị trí địa lý giữa hộ trồng và thương lái sau này.

#### 4.5. Liên hệ với PBL/RBL Component

* **PBL:** Giai đoạn Thiết kế Cơ sở dữ liệu - Milestone tuần 3.
* **CT (Computational Thinking):** *Abstraction* – Lọc bỏ các thông tin thừa, chỉ trích xuất các thuộc tính dữ liệu cốt lõi phục vụ bài toán quản lý người dùng nông nghiệp.
* **AI Reflection:** Khắc phục nhược điểm thiếu trường dữ liệu thực tế (Missing Contextual Fields) của AI.

#### 4.6. Evidence (Minh chứng)

* File mã nguồn: `src/preonic/user/User.js`.

```javascript
const UserSchema = new mongoose.Schema({
    role: { type: String, enum: ['Farmer', 'Business'], required: true },
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    province: { type: String, required: true },
    district: { type: String, required: true },
    ward: { type: String },
    password: { type: String, required: true }
}, { timestamps: true });

```

---

### Lần sử dụng AI số 3

* **Entry #:** 003
* **Prompt Type:** PROBLEM-SOLVING
* **Stage/Component:** Algorithms (Kiến trúc & Xử lý Logic)

#### 4.1. Problem/Context

Thiết kế kiến trúc cho Module Authentication xử lý việc đăng ký tài khoản (`registerUser`), đảm bảo mật khẩu được băm bảo mật và kiểm tra sự trùng lặp email trên hệ thống một cách tối ưu.

#### 4.2. Prompt to AI (NGUYÊN VĂN)

```text
Write a service function in Node.js to register a user, hash password using bcrypt, and check if email already exists.

```

#### 4.3. AI Response (Summary)

AI cung cấp một hàm JavaScript xử lý việc kiểm tra `User.findOne`, băm mật khẩu bằng hàm `bcrypt.hash` với salt và lưu `newUser.save()`. Tuy nhiên, mã nguồn gợi ý viết gộp chung tất cả logic vào trong hàm xử lý Route của Express.

#### 4.4. Human Delta & Reflection

* **Critical Thinking:** AI viết mã nguồn chạy được nhưng vi phạm nghiêm trọng nguyên lý Single Responsibility (SRP) và mô hình SoC (Separation of Concerns). Việc để logic cơ sở dữ liệu bám chặt vào tầng giao tiếp HTTP (Route/Controller) sẽ khiến dự án cực kỳ khó bảo trì và viết Unit Test khi mở rộng quy mô.
* **Contextualization:** Khi hệ thống PreOnic vận hành thực tế, luồng tạo tài khoản của nông dân có thể kích hoạt thêm các tác vụ phụ sau đó như khởi tạo ví điện tử, tạo hồ sơ mùa vụ trống. Do đó, logic này cần phải đứng độc lập ở tầng Service.
* **Creative Synthesis:** Nhóm đã bác bỏ cách tổ chức mã nguồn lộn xộn của AI. Nhóm tiến hành bóc tách toàn bộ nghiệp vụ xử lý nghiệp vụ sang một Class riêng biệt tên là `AuthService` nằm ở tầng Service. Đồng thời, chuẩn hóa email bằng cách thêm xử lý `.trim().toLowerCase()` trước khi truy vấn dữ liệu để tránh lỗi phân biệt chữ hoa chữ thường.
* **Decision Ownership:** Quyết định tổ chức mã nguồn theo mô hình 3-Layer (Routes -> Controller -> Service). File `AuthService.js` sẽ chịu trách nhiệm tính toán logic và băm mật khẩu mã hóa 10 lớp (`bcrypt.genSalt(10)`), đảm bảo tầng Controller chỉ làm nhiệm vụ tiếp nhận dữ liệu và phản hồi HTTP status code thích hợp (`400`, `409`, `201`).

#### 4.5. Liên hệ với PBL/RBL Component

* **PBL:** Giai đoạn Triển khai Code (Coding backend module) - Milestone tuần 4.
* **CT (Computational Thinking):** *Algorithms & Pattern Recognition* – Tổ chức mã nguồn theo mẫu kiến trúc chuẩn (Architectural Pattern - 3-Layer Architectural style) để quản lý mã nguồn quy mô lớn.
* **AI Reflection:** Khắc phục lỗi cấu trúc code kém (Spaghetti Code / Tight Coupling) do AI sinh ra.

#### 4.6. Evidence (Minh chứng)

* File mã nguồn: `src/preonic/auth/AuthService.js` (Hàm `registerUser`) và `src/preonic/auth/AuthController.js` (Hàm `register`).

---

### Lần sử dụng AI số 4

* **Entry #:** 004
* **Prompt Type:** DECISION
* **Stage/Component:** Algorithms (Bảo mật hệ thống)

#### 4.1. Problem/Context

Thiết kế cơ chế duy trì trạng thái đăng nhập bảo mật cho người dùng (Nông dân và Doanh nghiệp) sau khi xác thực tài khoản thành công bằng mật khẩu.

#### 4.2. Prompt to AI (NGUYÊN VĂN)

```text
How to implement JWT login authentication in Node.js and return user info?

```

#### 4.3. AI Response (Summary)

AI hướng dẫn sử dụng thư viện `jsonwebtoken`, gọi hàm `jwt.sign` chứa `userId` trong payload và trả về token cùng với toàn bộ đối tượng `user` tìm thấy trong DB về cho Client.

#### 4.4. Human Delta & Reflection

* **Critical Thinking:** Đề xuất của AI dính phải lỗi bảo mật nghiêm trọng **(Security Vulnerability)** khi trả nguyên bản đối tượng `user` về Client. Trường `password` (dù đã băm) tuyệt đối không được phép gửi lộ ra môi trường bên ngoài qua phản hồi HTTP API nhằm tránh nguy cơ bị khai thác rò rỉ thông tin.
* **Contextualization:** Trong một hệ thống giao dịch tiền tệ/bao tiêu nông sản như PreOnic, việc bảo mật thông tin tài khoản người dùng phải được đặt lên hàng đầu để tránh các cuộc tấn công trung gian (Man-in-the-middle).
* **Creative Synthesis:** Nhóm sử dụng giải pháp ký mã hóa JWT của AI nhưng thay đổi hoàn toàn cấu trúc dữ liệu phản hồi. Nhóm chủ động lọc bỏ trường mật khẩu, chỉ đóng gói thông tin an toàn bao gồm `_id`, `fullName`, và `role` để trả về cho Client. Trong hàm `jwt.sign`, nhóm cấu hình thời gian hết hạn nghiêm ngặt cho mã token là `expiresIn: '24h'` để bảo vệ phiên làm việc.
* **Decision Ownership:** Quyết định thực thi cấu trúc lọc dữ liệu an toàn này trực tiếp tại hàm `loginUser` thuộc `AuthService.js`, bảo đảm bảo mật dữ liệu đầu ra ở mức cao nhất.

#### 4.5. Liên hệ với PBL/RBL Component

* **PBL:** Giai đoạn Phát triển Hệ thống - Bảo mật Module - Milestone tuần 4.
* **CT (Computational Thinking):** *Evaluation* – Đánh giá rủi ro an toàn thông tin và tối ưu hóa thuật toán phản hồi dữ liệu.
* **AI Reflection:** Phát hiện và vá thành công lỗ hổng bảo mật nghiêm trọng *Information Disclosure* (Lộ lọt thông tin nhạy cảm) từ gợi ý của AI.

#### 4.6. Evidence (Minh chứng)

* File mã nguồn: `src/preonic/auth/AuthService.js` (Hàm `loginUser`).

```javascript
const token = jwt.sign(
    { userId: user._id, role: user.role },
    JWT_SECRET,
    { expiresIn: '24h' }
);
return { token, user: { id: user._id, fullName: user.fullName, role: user.role } };

```

---

### Lần sử dụng AI số 5

* **Entry #:** 005
* **Prompt Type:** VERIFICATION
* **Stage/Component:** Research (Kiểm chứng giải pháp kỹ thuật)

#### 4.1. Problem/Context

Cần tìm kiếm các dịch vụ REST API mở, miễn phí chuyên cung cấp dữ liệu dự báo sản lượng và dự báo thời tiết nông nghiệp có độ chính xác cao tại khu vực các tỉnh miền Trung Việt Nam để tích hợp vào hệ thống PreOnic.

#### 4.2. Prompt to AI (NGUYÊN VĂN)

```text
Suggest free REST APIs for agricultural crop yield prediction in Vietnam.

```

#### 4.3. AI Response (Summary)

AI tự tin đề xuất một API công cộng có tên là `AgroForecast-VN API` quản lý bởi một tổ chức giả định, kèm theo một đoạn tài liệu cấu trúc JSON mẫu chi tiết mô tả cách gọi endpoint dữ liệu dự báo mùa vụ theo tọa độ.

#### 4.4. Human Delta & Reflection

* **Critical Thinking:** **Phát hiện lỗi Hallucination cực kỳ nghiêm trọng (Fabrication - Bịa đặt thông tin)**. Khi tiến hành kiểm chứng chéo, dịch vụ và tài liệu API mà AI đưa ra hoàn toàn không tồn tại trên thực tế mạng internet. AI đã tự động tạo ra một chuỗi thông tin giả lập trông rất thuyết phục.
* **Contextualization:** Các dữ liệu khí tượng thủy văn và dự báo sản lượng nông nghiệp chuyên sâu tại Việt Nam thường thuộc quyền quản lý khép kín của các cơ quan nhà nước (như Tổng cục Khí tượng Thủy văn) và hiếm khi được public dưới dạng REST API mở miễn phí cho các hệ thống bên ngoài kết nối tự do.
* **Creative Synthesis:** Tiến hành tra cứu độc lập bằng cách tìm kiếm thủ công trên Google Scholar, các kho lưu trữ GitHub nhưng không mang lại kết quả hợp lệ nào cho API trên. Nhóm quyết định đổi phương án kỹ thuật: Thay vì phụ thuộc vào một API không có thật, nhóm tự thiết kế một thuật toán nội bộ dựa trên các tham số diện tích canh tác, lịch sử năng suất trung bình của từng loại cây do hộ nông dân cung cấp kết hợp tích hợp widget thời tiết thế giới của OpenWeatherMap (API thật đã kiểm chứng) để đưa ra dự báo trực quan.
* **Decision Ownership:** Quyết định loại bỏ hoàn toàn đề xuất về API giả mạo kia ra khỏi kiến trúc dự án để tránh gây lỗi nghiêm trọng (Crash/Lỗi logic hệ thống) khi phân phối sản phẩm thực tế.

#### 4.5. Liên hệ với PBL/RBL Component

* **PBL:** Giai đoạn Nghiên cứu giải pháp & Công nghệ tích hợp - Milestone tuần 4.
* **CT (Computational Thinking):** *Evaluation* – Đánh giá và xác minh tính xác thực, độ tin cậy của tài nguyên kỹ thuật trước khi đưa vào sản xuất.
* **AI Reflection:** Phát hiện và xử lý thành công ca lỗi *Fabrication* (Bịa đặt thông tin hoàn toàn) của AI.

#### 4.6. Evidence (Minh chứng)

* Minh chứng tra cứu: Kết quả tìm kiếm từ khóa `"AgroForecast-VN API"` trên Google Search trả về kết quả rỗng (0 kết quả phù hợp - Not Found).

---

## 5. Bảng tổng hợp mức độ sử dụng AI

| Hạng mục | Không dùng AI | AI hỗ trợ ít | AI hỗ trợ nhiều | AI sinh chính | Ghi chú |
| --- | --- | --- | --- | --- | --- |
| Phân tích yêu cầu |  | ✓ |  |  | AI gợi ý mô hình cơ bản, nhóm tự mở rộng |
| Thiết kế Use Case |  | ✓ |  |  | Phân rã thêm các case nông nghiệp thực tế |
| Thiết kế Database |  | ✓ |  |  | Thêm trường địa lý chi tiết, Enum Role |
| Thiết kế Business Process |  | ✓ |  |  | Quy trình quản lý hợp đồng bao tiêu mùa vụ |
| Thiết kế UI | ✓ |  |  |  | Nhóm tự thực hiện thiết kế giao diện Figma |
| Coding |  |  | ✓ |  | Sử dụng Copilot/Cursor gợi ý viết hàm nhanh |
| Testing | ✓ |  |  |  | Nhóm tự viết script kiểm thử API bằng Postman |
| Research |  | ✓ |  |  | Có kiểm chứng nguồn gốc để lọc Hallucination |

---

## 6. Các lỗi hoặc hạn chế từ AI

| STT | Lỗi/hạn chế từ AI | Cách phát hiện | Cách xử lý/cải tiến |
| --- | --- | --- | --- |
| 1 | Sơ đồ Use Case quá đơn giản hóa | Đọc và so sánh với nghiệp vụ nông nghiệp Việt Nam | Bổ sung các use case: Crop Planning, Harvest Tracking |
| 2 | Thiếu trường dữ liệu thực tế (Schema) | Đối chiếu yêu cầu làm hợp đồng kinh tế nông nghiệp | Thêm phân cấp địa lý (Tỉnh/Huyện/Xã) vào User Schema |
| 3 | Mã nguồn bị ràng buộc chặt (Tight Coupling) | Đánh giá cấu trúc code theo nguyên lý SRP và SoC | Bóc tách toàn bộ logic thành mô hình kiến trúc 3-Layer |
| 4 | Lỗ hổng rò rỉ mật khẩu bảo mật (JWT Response) | Thực hiện code review và kiểm tra dữ liệu đầu ra | Lọc bỏ password, chỉ đóng gói thông tin an toàn về Client |
| 5 | Hallucination bịa đặt thông tin (Fabrication) | Kiểm tra tài liệu, URL endpoint và tra cứu chéo Google | Loại bỏ API giả, tự lập trình module thuật toán dự báo nội bộ |

---

## 7. Kiểm chứng kết quả AI

```text
- Thực hiện Code Review chéo giữa các thành viên trong nhóm đối với mọi đoạn code do AI Assistant gợi ý.
- Sử dụng các công cụ tìm kiếm độc lập (Google, GitHub) để xác thực sự tồn tại của các thư viện hoặc API bên thứ ba.
- Chạy thử nghiệm trực tiếp trên môi trường Localhost, sử dụng Postman để kiểm tra toàn bộ dữ liệu đầu ra (Response) của các API Endpoints xem có vi phạm an toàn thông tin hay không.
- Đối chiếu nghiêm ngặt kết quả logic hệ thống với các yêu cầu thực tế trong sách hướng dẫn môn học SWP391.

```

---

## 9. Reflection cuối bài

### AI đã hỗ trợ em/nhóm ở điểm nào?

AI đã hỗ trợ nhóm cực kỳ đắc lực trong việc tăng tốc độ viết mã nguồn (Code Generation), nhanh chóng dựng lên bộ khung (Boilerplate) cho hệ thống sử dụng Node.js/Express, gợi ý các cú pháp cấu hình thư viện chuẩn xác (Mongoose, Bcrypt, JWT) và hỗ trợ khơi gợi các ý tưởng phân tích hệ thống ban đầu.

### Phần nào em/nhóm không sử dụng theo gợi ý của AI? Vì sao?

Nhóm quyết định không sử dụng cấu trúc Spaghetti Code (gộp chung logic vào Route) của AI vì gây khó khăn cho việc bảo trì. Nhóm cũng loại bỏ hoàn toàn việc trả về trường password trong API Đăng nhập và các đề xuất API dự báo nông nghiệp giả mạo từ AI do chúng vi phạm nghiêm trọng quy chuẩn an toàn thông tin và không có thật trên thực tế.

### Em/nhóm đã kiểm tra tính đúng đắn của kết quả AI như thế nào?

Nhóm áp dụng quy trình kiểm chứng 3 lớp: Kiểm tra tài liệu chính thức (Official Documentation) của công nghệ sử dụng -> Code Review nội bộ nhóm -> Viết kịch bản kiểm thử API thực tế bằng Postman để kiểm tra tính toàn vẹn và bảo mật của dữ liệu.

### Nếu không có AI, phần nào sẽ khó khăn nhất?

Nếu không có AI, phần khó khăn và tốn thời gian nhất sẽ là việc tra cứu cú pháp và cấu hình tích hợp các middleware bảo mật (như thiết lập giải mã Bearer Token trong AuthMiddleware.js) cũng như thiết kế chuẩn phác thảo sơ bộ của các Schema thực thể dữ liệu ban đầu.

### Sau project này, em/nhóm học được gì về cách sử dụng AI có trách nhiệm?

Nhóm nhận ra rằng AI chỉ là một người trợ lý hỗ trợ tăng hiệu suất chứ không thể thay thế tư duy phản biện của người kỹ sư phần mềm. Mọi sản phẩm do AI tạo ra đều có thể chứa lỗi logic, lỗ hổng bảo mật hoặc thông tin bịa đặt (Hallucination). Việc sử dụng AI có trách nhiệm đòi hỏi lập trình viên phải luôn kiểm chứng, làm chủ mã nguồn của mình và không được phép sao chép mù quáng vào sản phẩm thực tế.