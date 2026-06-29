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
| Ngày bắt đầu          | 29/06/2026                               |
| Ngày hoàn thành       |                                          |

---

## 2. Công cụ AI đã sử dụng

- [ ] ChatGPT
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

## Entr #01
 
**Prompt Type:** PROBLEM-SOLVING
**Stage/Component:** Pattern Recognition (CT) — Module Withdrawal (rút tiền)
 
**Problem/Context:**
Trong `WithdrawalService`, user có thể tạo nhiều đơn rút tiền liên tiếp trước khi admin xử lý đơn nào. Nếu chỉ kiểm tra `amount > user.virtualBalance` tại thời điểm tạo đơn, user có thể tạo 3 đơn rút 5 triệu trong khi số dư chỉ có 10 triệu (3 × 5tr = 15tr > 10tr) vì mỗi request đọc số dư gốc, chưa trừ các đơn đang "treo".
 
**Prompt to AI:**
"I have a withdrawal request feature where users submit requests and admin approves later (balance isn't deducted until admin completes it). How do I prevent a user from creating multiple pending requests that together exceed their actual balance?"
 
**AI Response (Summary):**
AI đề xuất 2 hướng: (1) trừ tạm số dư ngay khi tạo đơn (escrow-style hold), hoặc (2) tính tổng các đơn `pending` bằng aggregation rồi lấy `available = balance - pendingTotal` để chặn ở bước validate, không cần thêm field mới trên User.
 
**Human Delta & Reflection:**
 
- **Critical Thinking:** AI đúng về bản chất vấn đề (race giữa nhiều đơn pending), nhưng đề xuất "trừ tạm số dư" (option 1) không hợp với schema hiện tại — `User.virtualBalance` chỉ có một field, không có khái niệm `heldBalance`. Nếu áp dụng máy móc sẽ phải sửa schema và mọi nơi đọc `virtualBalance`. AI không tự nhận ra ràng buộc này vì không thấy toàn bộ codebase.
- **Contextualization:** Hệ thống đã có sẵn `PaymentTransaction` và pattern dùng MongoDB aggregate (`$group`/`$sum`) ở nhiều service khác (escrow, rating). Dùng aggregate tính `pendingTotal` theo `status: 'pending'` mỗi lần validate là cách ít tốn công sửa đổi nhất, nhất quán với cách code hiện có xử lý số liệu tổng hợp.
- **Creative Synthesis:** Chọn option 2, viết `getPendingTotal(userId)` bằng `aggregate([$match, $group: {total: $sum: '$amount'}])`, rồi tính `available = user.virtualBalance - pending` ngay trong `createRequest`. Trả lỗi kèm cả hai số (`available`, `pending`) trong message để user hiểu vì sao bị chặn, thay vì chỉ báo "không đủ tiền".
- **Decision Ownership:** Chọn tính `pendingTotal` động mỗi lần thay vì cache, vì khối lượng đơn rút tiền của một user thường nhỏ (vài chục), nên chi phí aggregate không đáng kể so với rủi ro cache bị lệch khi có đơn được duyệt/từ chối song song.
**Liên hệ PBL/RBL:** CT — Pattern Recognition (nhận diện race condition giữa nhiều request cùng đọc một số dư gốc). Đây là quyết định kiến trúc nhỏ nhưng ảnh hưởng trực tiếp đến tính đúng của số dư hệ thống.
 
**Evidence:** `be/src/services/withdrawal.service.ts` — hàm `getPendingTotal()` (dòng 22-28) và `createRequest()` (dòng 30-60).
 
---
 
## Entry #02
 
**Prompt Type:** DECISION
**Stage/Component:** Abstraction (CT) — Module Đánh giá đối tác (Partner Rating)
 
**Problem/Context:**
Hệ thống cần cho nông dân đánh giá doanh nghiệp và ngược lại sau khi hợp đồng hoàn tất, nhưng hai chiều đánh giá có ý nghĩa nghiệp vụ khác nhau hoàn toàn (nông dân quan tâm doanh nghiệp có trả đúng hạn không; doanh nghiệp quan tâm nông dân có giao đúng chất lượng/sản lượng không). Cần quyết định: dùng một bộ tiêu chí chung cho cả hai chiều, hay tách riêng?
 
**Prompt to AI:**
"Should a two-way rating system (farmer rates enterprise, enterprise rates farmer) use the same rating criteria fields for both directions, or different criteria per direction? Give pros/cons."
 
**AI Response (Summary):**
AI phân tích: dùng chung 1 bộ tiêu chí (ví dụ "professionalism", "communication", "reliability") giúp model đơn giản, dễ hiển thị UI thống nhất; dùng riêng 2 bộ tiêu chí giúp đánh giá sát thực tế nghiệp vụ hơn nhưng tăng độ phức tạp ở schema, validate, và tính điểm trung bình tổng (`reputationScore`).
 
**Human Delta & Reflection:**
 
- **Critical Thinking:** AI trình bày đúng trade-off nhưng không đưa ra khuyến nghị cuối — đây là lựa chọn nghiệp vụ, không phải lỗi kỹ thuật để AI "sửa". Không có hallucination ở đây, nhưng AI có xu hướng trung lập an toàn (liệt kê pros/cons cả hai phía mà không cam kết), nên phần quyết định phải do mình tự làm.
- **Contextualization:** Trong mô hình bao tiêu nông sản thực tế, nông dân và doanh nghiệp KHÔNG đối xứng về vai trò: nông dân không quan tâm "doanh nghiệp có giao hàng đúng hạn" (doanh nghiệp không giao hàng vật lý), mà quan tâm minh bạch giá cả + thanh toán đúng hạn + phối hợp. Doanh nghiệp lại cần biết chất lượng nông sản, đúng tiến độ giao, đúng sản lượng cam kết. Dùng 1 bộ tiêu chí chung sẽ ép cả hai bên trả lời câu hỏi không liên quan đến họ (ví dụ hỏi nông dân về "on-time delivery" của chính họ thì vô lý khi họ là người giao).
- **Creative Synthesis:** Thiết kế 2 type riêng: `FarmerToEnterpriseCriteria` (transparency, paymentPunctuality, coordination) và `EnterpriseToFarmerCriteria` (quality, onTimeDelivery, committedVolume), union thành `RatingCriteria`. Viết `normalizeCriteriaByRole()` để validate đúng bộ 3 tiêu chí theo `reviewerRole`, và `extractCriteriaScores()` để lấy ra đúng field tương ứng tính điểm trung bình — tránh phải viết 2 hàm tính điểm riêng.
- **Decision Ownership:** Chọn tách 2 bộ tiêu chí dù tốn thêm code validate, vì độ chính xác nghiệp vụ quan trọng hơn việc tiết kiệm vài chục dòng code — điểm `reputationScore` ảnh hưởng đến uy tín đối tác hiển thị cho cả hệ thống, sai lệch tiêu chí sẽ làm điểm số vô nghĩa.
**Liên hệ PBL/RBL:** CT — Abstraction (tách union type theo vai trò thay vì một struct chung). PBL: milestone "đánh giá sau hợp đồng" — tính năng có nền tảng nhưng chưa được liệt kê trong các bug/tính năng đã ghi nhận trước đó.
 
**Evidence:** `be/src/services/partner-rating.service.ts` — type `FarmerToEnterpriseCriteria`/`EnterpriseToFarmerCriteria` (dòng 9-21), `normalizeCriteriaByRole()` (dòng 91-129).
 
---
 
## Entry #03
 
**Prompt Type:** VERIFICATION
**Stage/Component:** Algorithms (CT) — Module Thanh toán (SePay webhook)
 
**Problem/Context:**
Webhook nhận thông báo chuyển khoản từ SePay để cộng tiền vào ví ảo (`virtualBalance`). Webhook là endpoint public (SePay gọi từ ngoài), nên cần đảm bảo: (1) request thực sự từ SePay, (2) không bị cộng tiền 2 lần nếu SePay gọi lại webhook (retry), (3) số tiền chuyển khớp đúng số tiền yêu cầu nạp.
 
**Prompt to AI:**
"How should I secure and make idempotent a payment webhook endpoint that credits a user's wallet balance, given the payment gateway may retry the same webhook call multiple times?"
 
**AI Response (Summary):**
AI gợi ý xác thực bằng API key/secret trong header `Authorization`, kiểm tra trạng thái giao dịch hiện tại trước khi xử lý (idempotency check), và validate số tiền nhận được khớp số tiền giao dịch lưu trong DB trước khi coi là hoàn tất.
 
**Human Delta & Reflection:**
 
- **Critical Thinking:** AI đúng về 3 nguyên tắc chung (auth, idempotency, amount-check), nhưng gợi ý ban đầu của AI là "trả lỗi 400/500 khi mismatch để gateway biết và retry" — đây là điểm cần xem lại: trả lỗi sẽ khiến SePay tiếp tục retry webhook đó vô thời hạn, trong khi mismatch ở đây nhiều khả năng là do người dùng chuyển sai số tiền (không phải lỗi hệ thống), retry không giải quyết được gì.
- **Contextualization:** Trong thực tế vận hành ví ảo nội bộ (không qua cổng thanh toán thật), các trường hợp "ignored" hợp lệ gồm: không phải giao dịch tiền vào (`transferType !== 'in'`), không tìm thấy mã giao dịch trong nội dung chuyển khoản, giao dịch không tồn tại trong DB, giao dịch đã `completed` từ trước (SePay gọi lại), và sai số tiền. Tất cả các trường hợp này KHÔNG nên trả lỗi HTTP — nếu trả lỗi, SePay sẽ retry liên tục một thông báo không bao giờ xử lý được.
- **Creative Synthesis:** Sửa lại toàn bộ luồng để luôn trả `{ success: true, ignored: true, reason: ... }` cho mọi trường hợp không xử lý được (5 lý do khác nhau: `not_incoming_transfer`, `missing_transfer_code`, `transaction_not_found`, `already_processed`, `amount_mismatch`), chỉ trả lỗi 401 thật khi sai `Authorization` header. Với trường hợp `amount_mismatch`, lưu lại `lastWebhookMismatch` vào `metadata` của transaction để có dấu vết tra soát thủ công sau này, thay vì âm thầm bỏ qua.
- **Decision Ownership:** Chọn cách xác thực webhook bằng so khớp chuỗi `Apikey {secretKey}` đơn giản (không dùng HMAC signature) vì SePay sandbox/free tier không cung cấp signature, và chấp nhận rủi ro thấp này ở giai đoạn MVP — có ghi rõ trong code rằng nếu secret rỗng thì coi như chưa cấu hình bảo mật webhook (`isAuthorizedWebhook` trả `true` mặc định), để không chặn luồng dev/test.
**Liên hệ PBL/RBL:** CT — Algorithms (idempotency: kiểm tra trạng thái trước khi side-effect). AI Reflection: phát hiện AI đưa giải pháp generic ("trả lỗi để gateway retry") không phù hợp bối cảnh webhook ví ảo nội bộ — một dạng context misunderstanding.
 
**Evidence:** `be/src/services/payment.service.ts` — hàm `handleWebhook()` (dòng 208-257), `isAuthorizedWebhook()` (dòng 127-144).
 
---
 
## Entry #04
 
**Prompt Type:** PROBLEM-SOLVING
**Stage/Component:** Decomposition (CT) — Module Hợp đồng (Contract) — kiểm tra tồn kho
 
**Problem/Context:**
Một sản phẩm nông sản (ví dụ 10 tấn cà phê) có thể được nhiều doanh nghiệp khác nhau đề xuất hợp đồng cùng lúc. Nếu chỉ kiểm tra "sản lượng còn lại đủ" tại thời điểm TẠO hợp đồng, đến khi cả hai bên KÝ hợp đồng (có thể cách nhau vài ngày, qua nhiều bước xác nhận), sản lượng thực tế có thể đã bị các hợp đồng khác (được ký trước) tiêu hết — dẫn đến bán vượt số lượng tồn (oversell).
 
**Prompt to AI:**
"If creating a contract and signing a contract are two separate steps in time, and stock availability can change between them because other contracts may get signed first, where should I validate available quantity — at creation, at signing, or both?"
 
**AI Response (Summary):**
AI khuyến nghị validate tại cả hai thời điểm: lần đầu khi tạo (để báo lỗi sớm cho UX tốt) và lần hai ngay trước khi commit thay đổi tồn kho lúc ký (để đảm bảo tính đúng dữ liệu — "validate early for UX, validate again before commit for correctness").
 
**Human Delta & Reflection:**
 
- **Critical Thinking:** AI đúng về nguyên tắc "double-check pattern", đây là pattern hợp lý và không có hallucination. Nhưng AI không đề cập đến việc cần dùng `availableKg` (sản lượng còn lại tại thời điểm kiểm tra) thay vì giá trị đã lưu trong contract — nếu code lấy nhầm "quantity đã đăng ký lúc tạo hợp đồng" để so sánh lại lúc ký, mà không truy vấn lại `Product` mới nhất, thì check lần 2 sẽ vô nghĩa vì dùng dữ liệu cũ.
- **Contextualization:** `Product.remaining` là field thay đổi liên tục mỗi khi có hợp đồng được ký (trừ dần), nên giữa lúc tạo hợp đồng và lúc ký, các hợp đồng khác có thể đã trừ vào `remaining` này. Phải đảm bảo lần kiểm tra thứ hai luôn query lại `Product` mới nhất từ DB, không dùng cache hay snapshot cũ.
- **Creative Synthesis:** Tạo `getAvailableProductQuantityKg()` dùng chung cho cả `ensureRequestedQuantityAvailable()` (chạy lúc tạo hợp đồng, dòng 105-128) và `updateProductCommitment()` (chạy lúc cả hai bên đã ký, dòng 171-200) — cả hai hàm đều `Product.findById()` lại từ đầu thay vì nhận `product` qua tham số, đảm bảo luôn đọc giá trị `remaining` mới nhất tại đúng thời điểm gọi. Dùng `requestedKg - availableKg > 1e-9` thay vì `>` thường để tránh lỗi so sánh số thực dấu phẩy động (floating-point) khi quy đổi đơn vị tấn/tạ/kg.
- **Decision Ownership:** Chọn chặn cứng (throw lỗi 400) ở bước ký thứ hai nếu tồn kho không đủ, dù hợp đồng đã được tạo và có thể đã qua bước "PreOnic xác nhận" — chấp nhận trải nghiệm xấu hơn (hợp đồng bị huỷ giữa luồng) để đổi lại không bao giờ bán vượt sản lượng thực tế, vì hậu quả nghiệp vụ của oversell (doanh nghiệp ký hợp đồng nhận hàng không có) nghiêm trọng hơn việc phải tạo lại hợp đồng.
**Liên hệ PBL/RBL:** CT — Decomposition (tách bài toán tồn kho thành 2 điểm kiểm tra độc lập theo thời điểm xảy ra side-effect). Đây là quyết định ảnh hưởng trực tiếp đến tính đúng dữ liệu tồn kho toàn hệ thống, khác biệt về bản chất nếu không có (project sẽ có lỗ hổng oversell).
 
**Evidence:** `be/src/services/contract.service.ts` — `getAvailableProductQuantityKg()` (dòng 82-84), `ensureRequestedQuantityAvailable()` (dòng 105-128), `updateProductCommitment()` (dòng 171-200).
 
---
 
## Entry #05
 
**Prompt Type:** DECISION
**Stage/Component:** Abstraction (CT) — Module Tranh chấp (Dispute resolution)
 
**Problem/Context:**
Khi nông dân hoặc doanh nghiệp khiếu nại một milestone (ví dụ: doanh nghiệp cho rằng hàng giao không đúng chất lượng), admin cần một cơ chế để "phân xử" và quyết định tiền đi đâu. Câu hỏi thiết kế: kết quả phân xử nên cho phép admin chia tiền theo tỷ lệ tuỳ ý (ví dụ 70/30), hay chỉ cho 2 lựa chọn: toàn bộ về nông dân hoặc toàn bộ hoàn lại doanh nghiệp?
 
**Prompt to AI:**
"For an admin dispute-resolution feature on an escrow milestone, should the resolution outcome support an arbitrary split (e.g. 70/30) between the two parties, or just a binary outcome (release to one party vs refund the other)?"
 
**AI Response (Summary):**
AI cho rằng hỗ trợ tỷ lệ tuỳ ý linh hoạt hơn cho thực tế phân xử (nhiều tranh chấp không phải đúng/sai hoàn toàn), nhưng cũng ghi nhận rằng binary outcome đơn giản hơn để implement, dễ audit, và đủ cho giai đoạn MVP.
 
**Human Delta & Reflection:**
 
- **Critical Thinking:** AI đưa ra cả hai hướng hợp lý, không sai về kỹ thuật, nhưng đây thuộc nhóm quyết định nghiệp vụ + phạm vi dự án (scope), không phải vấn đề AI có thể "quyết" giùm — mình cần tự cân nhắc theo deadline và độ phức tạp test, không chỉ theo "tính linh hoạt" mà AI ưu tiên.
- **Contextualization:** Đây là dự án MVP học thuật với deadline cố định. Cho phép tỷ lệ tuỳ ý sẽ kéo theo: cần UI nhập % cho admin, cần validate tổng = 100%, cần logic chia `releasedAmount` cho nông dân và `refund` cho doanh nghiệp đồng thời (2 side-effect tài chính trong 1 lần resolve thay vì 1), và khó viết test bao quát hết các tỷ lệ. Mức độ phức tạp này không tương xứng với số lượng tranh chấp thực tế dự kiến ở MVP.
- **Creative Synthesis:** Chọn binary outcome, model hoá trực tiếp trong enum `status` của `Dispute`: chỉ có `resolved_farmer` hoặc `resolved_enterprise`, không có `resolved_split`. Khi `resolution === 'farmer'`: hoàn tất milestone, set cả `farmerConfirmed` và `enterpriseConfirmed` đều `true` để tái dùng được logic `completeMilestone()` đã có cho luồng xác nhận thông thường (không cần viết logic giải ngân riêng cho trường hợp tranh chấp). Khi `resolution === 'enterprise'`: hoàn lại toàn bộ `remainingAmount` (số tiền chưa giải ngân) cho doanh nghiệp.
- **Decision Ownership:** Chấp nhận giới hạn "không chia tỷ lệ" như một trade-off có chủ đích ở MVP, ghi rõ trong `resolution` text để admin và 2 bên hiểu lý do ("Admin xác nhận nông dân đúng — tiền giải ngân cho nông dân" / "Admin xác nhận doanh nghiệp đúng — hoàn tiền cho doanh nghiệp"), thay vì để hệ thống ngầm định mà không giải thích. Đây là quyết định ưu tiên tốc độ triển khai và khả năng kiểm thử hơn là độ linh hoạt nghiệp vụ tối đa.
**Liên hệ PBL/RBL:** CT — Abstraction (rút gọn bài toán phân xử phức tạp về 2 trạng thái rời rạc, tái dùng hàm `completeMilestone()` có sẵn). Quyết định này thay đổi bản chất kiến trúc: nếu chọn hướng tỷ lệ tuỳ ý, `Dispute.model.ts` và `resolveDispute()` sẽ có shape hoàn toàn khác.
 
**Evidence:** `be/src/models/Dispute.model.ts` — enum `status` (dòng 14); `be/src/services/escrow.service.ts` — `resolveDispute()` (dòng 543-603+).
 
---

## 5. Bảng tổng hợp mức độ sử dụng AI

| Hạng mục                  | Không dùng AI | AI hỗ trợ ít | AI hỗ trợ nhiều | AI sinh chính | Ghi chú                      |
| ------------------------- | :-----------: | :----------: | :-------------: | :-----------: | ---------------------------- |
| Phân tích yêu cầu         |               |       ✓      |                 |               | Gợi ý actor và use case      |
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

---

## 7. Kiểm chứng kết quả AI

```text
- Đối chiếu với yêu cầu nghiệp vụ của hệ thống PreOnic.
- Thảo luận nhóm trước khi áp dụng.
- Kiểm tra tài liệu tham khảo và nguồn chính thức.
- Đánh giá lại mô hình dữ liệu và quy trình nghiệp vụ.
```

---

