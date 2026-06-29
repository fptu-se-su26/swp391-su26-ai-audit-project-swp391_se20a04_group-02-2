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

- [x] ChatGPT, Claude 

---

## 3. Nhật ký sử dụng AI

ENTRY #001


Prompt Type: DECISION-MAKING
Stage/Component: Decomposition (CT)
Problem/Context: Trước khi code, cần chia hệ thống bao tiêu nông sản (farmer ↔
enterprise ↔ escrow) thành các module backend độc lập, tránh một service "biết quá
nhiều" (god service) khi nghiệp vụ hợp đồng + ký quỹ phình to.
Prompt to AI: "I'm building a contract-farming platform with Farmer, Enterprise,
Contract and Escrow entities. Should escrow logic live inside the Contract service, or
be its own service/module? Compare trade-offs."
AI Response (Summary): AI đề xuất tách EscrowService riêng khỏi ContractService,
với lý do escrow có state machine riêng (pending → deposited → milestone → released)
và có thể tái sử dụng nếu sau này có thêm loại hợp đồng khác. AI cũng gợi ý dùng
Mongoose populate để tham chiếu giữa hai collection thay vì nhúng (embed) dữ liệu.
Human Delta & Reflection:

Critical Thinking: AI đúng về việc tách service theo bounded context, nhưng gợi ý
ban đầu (embed milestones trực tiếp trong Contract.model) sẽ làm document Contract
phình to và khó query escrow độc lập (ví dụ: liệt kê tất cả escrow đang chờ giải
ngân của một enterprise). Tôi yêu cầu AI so sánh lại với phương án "Escrow là
collection riêng, tham chiếu contractId" — AI đồng ý đây là lựa chọn tốt hơn cho
truy vấn báo cáo.
Contextualization: AI không biết yêu cầu thực tế của đồ án là phải có cơ chế
tranh chấp (dispute) độc lập với hợp đồng — một escrow có thể bị dispute nhiều
lần trong khi hợp đồng vẫn ở trạng thái "đã ký". Việc tách Escrow + Dispute thành
model riêng (Escrow.model.ts, Dispute.model.ts) là quyết định riêng của tôi dựa
trên yêu cầu nghiệp vụ này, AI chỉ gợi ý mức kiến trúc chung.
Creative Synthesis: Kết hợp gợi ý tách service của AI với mô hình 5 module thực
tế của repo: auth, contract, escrow, product, messaging/notification,
mỗi module có routes → controller → service → model riêng (xem be/src/routes/,
be/src/controllers/, be/src/services/).
Decision Ownership: Chọn kiến trúc layered theo module (routes/controllers/
services/models tách riêng cho từng domain), KHÔNG dùng MVC gộp chung vì project có
nhiều domain nghiệp vụ độc lập (escrow, weather, messaging) cần scale riêng. Đây là
quyết định kiến trúc nền tảng, ảnh hưởng toàn bộ cấu trúc thư mục be/src/.



Liên hệ PBL/RBL Component:

PBL: Milestone giai đoạn thiết kế kiến trúc backend (tuần đầu dự án).
CT: Decomposition – chia hệ thống lớn thành module độc lập theo domain.
AI Reflection: AI cho giải pháp đúng hướng nhưng thiếu ngữ cảnh nghiệp vụ dispute.



Evidence: Cấu trúc thư mục be/src/{routes,controllers,services,models}/; file
Escrow.model.ts và Dispute.model.ts tách riêng dù cùng phục vụ một hợp đồng.



ENTRY #002


Prompt Type: PROBLEM-SOLVING
Stage/Component: Pattern Recognition (CT) + Algorithms
Problem/Context: Mỗi hợp đồng có paymentTerms khác nhau (50/50, 30/70, 100% khi
giao hàng, 100% trả trước) và cần sinh ra 5 milestone với tỷ lệ giải ngân khác nhau cho
từng loại. Viết if/else lặp lại nhiều lần trong escrow.service.ts khiến file vượt 700
dòng và khó maintain.
Prompt to AI: "I have a 700+ line escrow.service.ts with repeated if/else blocks
building milestone percentages for 4 different payment-term types. How should I
refactor this to avoid duplication and keep it data-driven?"
AI Response (Summary): AI gợi ý dùng một lookup table (object/map) ánh xạ
paymentTerms → [percent step1..step5], sau đó dùng một hàm builder duy nhất đọc từ
map này, tách hẳn ra một utility file riêng vì logic này thuần data, không phụ thuộc DB.
Human Delta & Reflection:

Critical Thinking: Gợi ý đúng về pattern (table-driven thay vì if/else), nhưng
bảng mẫu AI đưa ra giả định tổng % luôn chia đều ở mốc đầu và cuối — không đúng
với yêu cầu thực tế của tôi là milestone "Chuẩn bị hàng hóa", "Giao hàng", "Kiểm tra
chất lượng" (step 2–4) phải luôn là 0% (chỉ giải ngân tại ký quỹ và hoàn tất), trừ
trường hợp 100_delivery thì dồn 100% vào step 4. Tôi phải tự thiết kế lại bảng
RELEASE_PERCENT_BY_TERMS cho khớp đúng 5 loại điều khoản thực tế của hệ thống.
Contextualization: AI không biết milestone step 1 ("Ký quỹ") trong hệ thống này
đã được đổi nghĩa: doanh nghiệp nạp 100% totalValue vào ký quỹ ngay từ đầu, hệ
thống chỉ giải ngân theo % bảng trên — khác với giả định ban đầu của AI là "nạp
từng phần theo milestone". Comment trong code (escrow.service.ts) ghi rõ "Cơ chế
mới: doanh nghiệp nạp 100% totalValue vào ký quỹ; hệ thống giải ngân ngay theo điều
khoản" — đây là quyết định nghiệp vụ riêng của nhóm, không phải gợi ý từ AI.
Creative Synthesis: Giữ ý tưởng "tách utility thuần data" của AI nhưng viết lại
hoàn toàn bảng tỷ lệ và đưa ra khỏi escrow.service.ts thành milestone.util.ts
riêng (hàm buildMilestones(paymentTerms, totalAmount)), giúp file escrow giảm tải
và có thể unit-test độc lập phần tính tỷ lệ giải ngân.
Decision Ownership: Chọn tách buildMilestones() thành pure function không phụ
thuộc Mongoose/DB, vì đây là logic tính toán có thể test bằng input/output thuần,
không cần mock database — quyết định này trực tiếp giúp viết được unit test
escrow-payment-transactions.test.ts mà không phải spin MongoDB.



Liên hệ PBL/RBL Component:

PBL: Giai đoạn refactor module Escrow khi nghiệp vụ giải ngân thay đổi.
CT: Pattern Recognition (nhận diện logic lặp lại) + Algorithms (thiết kế bảng tra cứu).
AI Reflection: Phát hiện AI oversimplification về cách hiểu milestone ký quỹ.



Evidence: be/src/utils/milestone.util.ts (bảng RELEASE_PERCENT_BY_TERMS), comment
giải thích cơ chế trong escrow.service.ts, file test
be/src/__tests__/escrow-payment-transactions.test.ts.



ENTRY #003


Prompt Type: DECISION-MAKING
Stage/Component: Abstraction (CT)
Problem/Context: Cần tích hợp API thời tiết hỗ trợ mùa vụ cho nông dân, nhưng
OpenWeatherMap (OWM) yêu cầu API key trả phí khi vượt hạn mức, còn nhóm chỉ có gói free
giới hạn request. Cần tránh việc toàn hệ thống "chết" tính năng thời tiết khi hết quota.
Prompt to AI: "How do I design a weather service in TypeScript that can fall back to
a free provider (Open-Meteo) when OpenWeatherMap is unavailable or unconfigured, without
changing code in every controller that calls it?"
AI Response (Summary): AI đề xuất Adapter pattern: định nghĩa interface chung
WeatherProvider (isAvailable(), fetchCurrent(), fetchForecast()), implement hai
adapter riêng cho OWM và Open-Meteo, rồi để WeatherService chọn provider theo thứ tự
ưu tiên.
Human Delta & Reflection:

Critical Thinking: Thiết kế interface đúng, nhưng AI ban đầu giả định cả hai
provider trả về cùng định dạng response — sai, vì OWM dùng mã icon riêng
(01d, 02n...) còn Open-Meteo trả weather_code dạng số WMO. Nếu áp dụng thẳng
gợi ý của AI, frontend sẽ hiển thị icon thời tiết sai khi fallback sang Open-Meteo.
Contextualization: AI không biết phần lớn nông dân dùng hệ thống này ở khu vực
nông thôn, nơi việc thời tiết "không hiển thị được vì hết API key" là rủi ro thực
tế cao hơn ở môi trường demo — nên fallback bắt buộc phải luôn available
(isAvailable: () => true cho Open-Meteo), không phải optional.
Creative Synthesis: Tôi viết thêm hàm mapOpenMeteoCode() để dịch mã WMO của
Open-Meteo sang cùng format icon với OWM (01d–13n), đảm bảo tầng UI không cần
biết provider nào đang chạy. Đồng thời để openWeatherMapProvider.isAvailable()
kiểm tra 3 biến môi trường khả dĩ (OPENWEATHER_API_KEY, OWM_API_KEY,
WEATHER_API_KEY) để tránh lỗi cấu hình tên biến.
Decision Ownership: Chọn OWM là provider chính (dữ liệu chi tiết hơn: rain 1h/24h,
wind theo km/h) và Open-Meteo là fallback bắt buộc, không phải ngược lại — vì OWM có
cảnh báo thời tiết cực đoan tốt hơn, phù hợp tính năng cron cảnh báo nông vụ.



Liên hệ PBL/RBL Component:

PBL: Tính năng "Thời tiết hỗ trợ mùa vụ" trong dashboard Farmer.
CT: Abstraction – ẩn sự khác biệt giữa 2 provider sau một interface chung.
AI Reflection: Phát hiện AI oversimplification về format response giống nhau giữa
2 nhà cung cấp.



Evidence: be/src/services/weather-providers.ts (interface WeatherProvider, hàm
mapOpenMeteoCode), comment đầu file giải thích lý do tách adapter.



ENTRY #004


Prompt Type: PROBLEM-SOLVING
Stage/Component: Algorithms + Decomposition
Problem/Context: Bug thực tế khi test: 2 request refresh-token gửi gần như đồng thời
(ví dụ user mở 2 tab) khiến cả hai cùng cố ghi refreshToken mới vào User, dẫn đến
request thứ hai bị 401 vì token đã bị request thứ nhất "ghi đè" trước khi xác thực xong.
Prompt to AI: "Two near-simultaneous refresh-token requests from the same user are
racing and invalidating each other's token in MongoDB. What's the standard fix for this
concurrent refresh-token race condition?"
AI Response (Summary): AI gợi ý dùng refresh token rotation với danh sách token
đã dùng (token family/blacklist) lưu trong Redis, hoặc dùng optimistic locking ở mức
document MongoDB với version key.
Human Delta & Reflection:

Critical Thinking: Giải pháp Redis đúng về mặt lý thuyết cho hệ thống lớn, nhưng
quá nặng cho quy mô đồ án (chưa có Redis trong stack, thêm dependency mới chỉ để
sửa 1 race condition là over-engineering). AI không tự nhận ra mismatch giữa quy mô
đề xuất và quy mô project thực tế — tôi phải hỏi lại "giải pháp không cần thêm
service mới được không?"
Contextualization: Hệ thống đang chạy đơn instance (xem render.yaml, không có
load balancer), nên optimistic locking ở mức MongoDB document là đủ — không cần
Redis. Đây là constraint hạ tầng thực tế mà AI không biết khi mới đưa gợi ý đầu.
Creative Synthesis: Tôi áp dụng hướng đơn giản hơn: thêm guard kiểm tra
user.refreshToken !== token ngay trong AuthService.refreshToken() trước khi cấp
token mới (so khớp đúng token đang lưu trong DB), kết hợp với rate limiter riêng cho
nhóm endpoint /auth/* (rateLimit.middleware.ts) để giảm khả năng race xảy ra liên
tục từ cùng một client.
Decision Ownership: Chọn "so khớp token + rate-limit theo IP" thay vì rotation
với token family, vì đủ để chặn race trong phạm vi đồ án và không cần thêm
infrastructure mới. Commit thực tế f6b2e09 fix(auth): ... concurrent refresh race + pre-auth API guards ghi nhận quyết định này.



Liên hệ PBL/RBL Component:

PBL: Sprint sửa lỗi auth trước khi demo (mục [5.3] PROJECT_OVERVIEW: nền tảng OAuth).
CT: Algorithms (so khớp trạng thái token) + Decomposition (tách rate-limit middleware).
AI Reflection: AI đề xuất giải pháp đúng hướng nhưng sai về độ phù hợp quy mô (scope
mismatch), không phải hallucination dữ liệu.



Evidence: be/src/services/auth.service.ts (hàm refreshToken), commit
f6b2e09, be/src/middlewares/rateLimit.middleware.ts (authLimiter).



ENTRY #005


Prompt Type: DECISION-MAKING
Stage/Component: Abstraction
Problem/Context: Cần quyết định luồng đăng ký: sau khi tạo tài khoản thành công, có
nên tự động đăng nhập (auto-login) cho người dùng luôn, hay yêu cầu họ đăng nhập lại
bằng tay?
Prompt to AI: "After successful registration, should the backend auto-login the
user (return access/refresh token immediately) or force them to log in manually? What
are the security/UX trade-offs?"
AI Response (Summary): AI trình bày cả 2 hướng: auto-login tốt cho UX (giảm 1 bước),
nhưng nếu hệ thống có email verification thì nên buộc đăng nhập lại sau khi verify để
đảm bảo email là thật trước khi cấp quyền truy cập đầy đủ.
Human Delta & Reflection:

Critical Thinking: AI trình bày đúng cả 2 phương án nhưng không đưa ra khuyến
nghị dứt khoát cho trường hợp cụ thể của hệ thống — đây là chỗ tôi phải tự quyết định
dựa trên roadmap thực tế (email verification chưa hoàn thiện 100% — xem mục [5.3]
PROJECT_OVERVIEW.txt: "Email verification sau đăng ký" còn ở dạng nền tảng).
Contextualization: Vì hệ thống xử lý giao dịch tiền (escrow) giữa Farmer và
Enterprise, rủi ro tài khoản giả/email rác cao hơn ứng dụng thông thường — bối cảnh
nghiệp vụ này khiến tôi nghiêng về phương án an toàn hơn dù tốn 1 bước UX.
Creative Synthesis: Đổi luồng đăng ký từ auto-login sang yêu cầu đăng nhập lại sau
khi tạo tài khoản, đồng thời cho phép đăng ký bằng tên một từ (single-name) để giảm
rào cản cho người dùng nông thôn có thể chỉ điền tên ngắn.
Decision Ownership: Chọn "register chỉ tạo tài khoản, không tự setUser" — thể hiện
rõ trong AuthContext.jsx (register không gọi setUser) và commit
7f2f820 fix(auth): update registration flow to require manual login after account creation. Đây là quyết định đánh đổi UX để tăng kiểm soát truy cập, có thể giải
thích được khi vấn đáp.



Liên hệ PBL/RBL Component:

PBL: Module xác thực và tài khoản (mục A trong PROJECT_OVERVIEW.txt).
CT: Abstraction – tách rõ ranh giới giữa "tạo tài khoản" và "thiết lập session".
AI Reflection: AI không hallucinate nhưng thiếu khuyến nghị dứt khoát do thiếu ngữ
cảnh nghiệp vụ — phần quyết định hoàn toàn do con người.



Evidence: fe/src/contexts/AuthContext.jsx (hàm register), commit 7f2f820,
commit f6b2e09 (single-name registration).



ENTRY #006


Prompt Type: PROBLEM-SOLVING
Stage/Component: Pattern Recognition + Research Stage (RBL)
Problem/Context: Khi deploy backend lên Render (free tier) để demo, chức năng gửi
email (quên mật khẩu, xác minh email) liên tục lỗi timeout, trong khi chạy local hoàn
toàn bình thường.
Prompt to AI: "Nodemailer SMTP works fine on localhost but times out (ETIMEDOUT) in
production on Render free tier, port 587 STARTTLS. What's likely happening and how do I
fix it without changing my email provider?"
AI Response (Summary): AI khẳng định nguyên nhân chắc chắn là do "Render chặn toàn
bộ outbound SMTP trên mọi cổng" và đề xuất chuyển thẳng sang dùng HTTP API của nhà cung
cấp email (ví dụ SendGrid) thay vì SMTP.
Human Delta & Reflection:

Critical Thinking: Đây là một hallucination dạng Oversimplification/Logic
Error: AI khẳng định "Render chặn TẤT CẢ cổng SMTP" như một sự thật chắc chắn, nhưng
thực tế dựa trên test thủ công của tôi (xem log thực tế trong code), cổng 587 bị chặn
nhưng cổng 465 (SSL) đôi khi vẫn đi qua được tùy thời điểm — không phải lúc nào cũng
chặn tuyệt đối. Tôi không tin ngay khẳng định "luôn luôn chặn" của AI và đã tự thêm
logic fallback + logging để quan sát thực tế trước khi kết luận.
Contextualization: AI không có quyền truy cập log thực tế của server tôi, nên
không thể biết chính xác hành vi mạng của Render free tier tại thời điểm dự án chạy —
đây là thông tin chỉ có được qua quan sát thực nghiệm, không thể suy luận lý thuyết.
Creative Synthesis: Tôi triển khai theo 3 bước tăng dần: (1) thử fallback tự động
587 → 465 SSL trong cùng lần gửi (sendVia() với cờ alreadyTried465), (2) log rõ kết
quả thành công/thất bại của từng cổng để có dữ liệu thật, (3) khi log xác nhận cả 2
cổng đều không ổn định trên Render free tier, mới chuyển hẳn sang gửi email qua HTTP
API (Brevo) như AI đã gợi ý ban đầu — nhưng là bước cuối cùng dựa trên evidence,
không phải tin ngay lời AI.
Decision Ownership: Quyết định giữ SMTP fallback 587→465 làm lớp bảo vệ đầu, và
chỉ coi Brevo HTTP API là giải pháp dự phòng cấp cao hơn — phản ánh qua 3 commit liên
tiếp: 760f386 fix(email): fallback SMTP cổng 465..., f4da96a chore(email): log rõ kết quả gửi SMTP..., 9ee6364 feat(email): gửi mail qua Brevo HTTP API + fix trust proxy. Việc giữ cả 2 lớp (không xóa SMTP fallback) là quyết định của tôi để hệ thống
không phụ thuộc hoàn toàn vào một nhà cung cấp.



Liên hệ PBL/RBL Component:

PBL: Sự cố vận hành thật khi deploy demo (không phải lỗi giả định trong lab).
CT: Pattern Recognition – nhận diện pattern lỗi mạng lặp lại theo cổng.
AI Reflection: Hallucination phát hiện được — AI đưa kết luận tuyệt đối ("luôn
luôn chặn") thiếu căn cứ thực nghiệm; corrective action là tự logging để kiểm chứng
trước khi hành động theo gợi ý AI.



Evidence: be/src/services/email.service.ts (hằng số SMTP_CONNECTION_ERRORS, hàm
sendVia với fallback 465), commit 760f386, f4da96a, 9ee6364.



ENTRY #007


Prompt Type: PROBLEM-SOLVING
Stage/Component: Pattern Recognition
Problem/Context: Trang "Theo dõi đơn hàng" của Enterprise hiển thị sai trạng thái
giao hàng (deliveryStatus) — đơn đã giao xong vẫn hiện "đang vận chuyển" trên dashboard.
Prompt to AI: "My order list shows the wrong delivery status — backend returns
'delivered' but the Enterprise dashboard UI still shows 'in transit'. Where should I
look first?"
AI Response (Summary): AI liệt kê hướng kiểm tra chung: kiểm tra response API, kiểm
tra mapping enum ở frontend, kiểm tra cache/stale state — không chỉ ra được nguyên nhân
cụ thể vì không có quyền xem code thực tế trong câu hỏi đầu.
Human Delta & Reflection:

Critical Thinking: Gợi ý của AI đúng nhưng quá tổng quát để tự áp dụng — tôi phải
cung cấp thêm đoạn code mapping enum thật thì AI mới chỉ ra chính xác: bảng mapping
deliveryStatus ở frontend thiếu một giá trị enum mà backend trả về (lệch tên biến
giữa BE/FE), khiến fallback về giá trị mặc định "đang vận chuyển".
Contextualization: Đây là lỗi tích hợp giữa 2 tầng do nhóm tự định nghĩa enum
riêng ở FE và BE không đồng bộ — bối cảnh "2 codebase, 2 người maintain enum riêng"
là điều AI không thể biết nếu không được cung cấp cả 2 phía code.
Creative Synthesis: Sau khi xác định lệch enum, tôi không chỉ sửa 1 chỗ mà rà
soát toàn bộ các mapping trạng thái tương tự trong Enterprise dashboard để tránh lỗi
tái diễn ở các trường khác (trạng thái hợp đồng, trạng thái escrow).
Decision Ownership: Quyết định chuẩn hóa lại enum trạng thái dùng chung
(CONTRACT_STATUS_LABEL, ORDER_STEPS — xem DASHBOARD_UX_REVIEW.md mục 2.2) thay
vì chỉ patch riêng lẻ, để tránh phải lặp lại quá trình debug này cho mỗi màn hình mới.



Liên hệ PBL/RBL Component:

PBL: Mục [7] Bug đã sửa trong PROJECT_OVERVIEW.txt — "Sai mapping trạng thái giao
hàng enterprise".
CT: Pattern Recognition – nhận diện lỗi lệch enum là một pattern lặp lại có thể xảy
ra ở nhiều màn hình khác.
AI Reflection: AI không hallucinate nhưng cần thêm context cụ thể (code thật) mới đưa
được chẩn đoán chính xác — minh chứng cho việc prompt tốt cần kèm dữ liệu thực tế.



Evidence: PROJECT_OVERVIEW.txt mục 7 (bug đã sửa); DASHBOARD_UX_REVIEW.md mục 2.2
(hệ thống nhãn trạng thái tập trung).



ENTRY #008


Prompt Type: VERIFICATION
Stage/Component: Research Stage (RBL)
Problem/Context: Trước khi viết phần báo cáo so sánh kiến trúc escrow/ký quỹ, cần
kiểm tra một số khẳng định kỹ thuật mà AI đưa ra về cách các nền tảng thương mại điện
tử lớn xử lý "ký quỹ giải ngân theo milestone" để tham khảo, tránh đưa thông tin sai vào
báo cáo.
Prompt to AI: "Can you cite specific case studies or papers describing how
marketplace platforms implement milestone-based escrow release for B2B agricultural
contracts?"
AI Response (Summary): AI đưa ra một số tên "case study" và mô tả khá chi tiết với
số liệu cụ thể, trình bày rất tự tin như đây là nguồn có thật.
Human Delta & Reflection:

Critical Thinking: Đây là Hallucination dạng Fabrication. Tôi không tìm thấy
nguồn nào khớp với tên và số liệu AI đưa ra khi tra cứu lại — các chi tiết "quá vừa
khít" với câu hỏi của tôi là dấu hiệu điển hình của fabrication thay vì trích dẫn
thật. Tôi không đưa các "nguồn" này vào báo cáo.
Contextualization: Phần báo cáo của nhóm yêu cầu trích dẫn phải kiểm chứng được
(giảng viên có thể hỏi vấn đáp), nên bất kỳ nguồn không xác minh được đều là rủi ro
học thuật, không chỉ là rủi ro kỹ thuật.
Creative Synthesis: Tôi đổi hướng: bỏ yêu cầu AI "cho case study cụ thể", thay
bằng tự tìm tài liệu công khai về cơ chế escrow của các nền tảng thật (mô hình ký quỹ
sàn thương mại điện tử, cơ chế giải ngân theo xác nhận hai chiều) và chỉ dùng AI để
tổng hợp khái niệm chung (state machine của escrow), không dùng AI để cung cấp số
liệu/nguồn cụ thể.
Decision Ownership: Quyết định không trích dẫn bất kỳ "case study" nào do AI đề
xuất mà không tự xác minh được nguồn gốc — áp dụng đúng nguyên tắc trong tài liệu
hướng dẫn (mục VI): tra cứu lại trước khi tin, loại bỏ nếu không tìm thấy.



Liên hệ PBL/RBL Component:

PBL: Giai đoạn viết báo cáo thiết kế hệ thống escrow.
CT: (không trực tiếp DTC — thuộc giai đoạn Research/Verification của RBL).
AI Reflection: Hallucination phát hiện được (Fabrication) — corrective action là
loại bỏ hoàn toàn nguồn không xác minh được, không cố "sửa nhẹ" để giữ lại.



Evidence: Ghi chú đối chiếu (không đưa nguồn fabricated vào báo cáo cuối); phần mô
tả state machine escrow trong báo cáo dùng ngôn ngữ tự viết, không trích dẫn số liệu từ
AI.



ENTRY #009


Prompt Type: DECISION-MAKING
Stage/Component: Abstraction
Problem/Context: Cần quyết định cách xử lý ngày thu hoạch (expectedDate) của nông
sản — dữ liệu này có thể là ngày cụ thể (dd/mm/yyyy, yyyy-mm-dd) hoặc giá trị đặc
biệt "quanh năm" do nông dân tự nhập, và hệ thống cần biết khi nào được phép cho phép
tạo đơn vận chuyển.
Prompt to AI: "I need a function that takes a flexible date string (could be
'dd/mm/yyyy', 'yyyy-mm-dd', or a special value meaning 'all year round') and determines
whether shipping should be allowed today. How do I abstract this cleanly?"
AI Response (Summary): AI gợi ý dùng một thư viện parse ngày tổng quát (ví dụ
date-fns hoặc dayjs với nhiều locale) để tự động nhận diện format, kèm theo regex
dự phòng.
Human Delta & Reflection:

Critical Thinking: Gợi ý thêm thư viện ngoài là hợp lý cho ứng dụng tổng quát,
nhưng với chỉ 2 format cố định (dd/mm/yyyy và yyyy-mm-dd) cộng 1 giá trị đặc biệt
tiếng Việt ("quanh năm"), thêm cả thư viện parse đa locale là dư thừa — tăng bundle
size backend không cần thiết cho một bài toán hẹp.
Contextualization: Giá trị "quanh năm" là thuật ngữ nông nghiệp tiếng Việt đặc
thù mà không thư viện parse ngày quốc tế nào hiểu được — đây là edge case chỉ có thể
xử lý bằng kiểm tra chuỗi tiếng Việt thủ công, AI hoàn toàn không biết giá trị này tồn
tại cho đến khi tôi cung cấp.
Creative Synthesis: Tôi viết hàm parseExpectedDate() thuần regex (2 pattern cố
định) + so khớp chuỗi đặc biệt /^quanh nam$/i (có và không dấu, vì dữ liệu nhập tay
có thể thiếu dấu), trả về null an toàn cho mọi case không khớp — sau đó
getHarvestEligibility() dùng kết quả này để abstract hoàn toàn logic "được phép giao
hàng hay chưa" khỏi phần gọi nó trong escrow.service.ts.
Decision Ownership: Chọn không thêm dependency ngoài, giữ logic parse ngày bằng
regex thuần để dễ kiểm soát edge case tiếng Việt, đánh đổi việc phải tự viết test cho
từng pattern thay vì tin tưởng thư viện ngoài xử lý đúng.



Liên hệ PBL/RBL Component:

PBL: Tính năng kiểm tra điều kiện thu hoạch trước khi cho tạo vận chuyển.
CT: Abstraction – tách getHarvestEligibility() thành API rõ ràng
(shippingAllowed, reason) che giấu toàn bộ chi tiết parse ngày bên trong.
AI Reflection: AI đề xuất giải pháp tổng quát nhưng over-engineered cho bài toán hẹp;
không có hallucination, chỉ là context thiếu (không biết giá trị đặc thù "quanh năm").



Evidence: be/src/utils/harvest.util.ts (parseExpectedDate,
getHarvestEligibility), được gọi từ escrow.service.ts khi tạo đơn giao hàng.



ENTRY #010


Prompt Type: PROBLEM-SOLVING
Stage/Component: Algorithms
Problem/Context: Tính năng nhắn tin (Messaging) giữa Farmer và Enterprise cần cập
nhật tin nhắn mới gần như real-time, nhưng dự án chưa có hạ tầng WebSocket và thời gian
còn lại không đủ để triển khai Socket.io an toàn trước deadline.
Prompt to AI: "I don't have time to implement WebSocket for a chat feature before
deadline. Is polling every few seconds an acceptable trade-off for an MVP, and what
interval balances UX vs server load?"
AI Response (Summary): AI xác nhận polling là một trade-off hợp lý cho MVP, gợi ý
khoảng 3–10 giây tùy mức độ "real-time" cần thiết, kèm khuyến nghị dùng setInterval +
cleanup đúng cách trong useEffect để tránh leak nhiều interval khi component re-render.
Human Delta & Reflection:

Critical Thinking: Gợi ý đúng về kỹ thuật cleanup, nhưng khoảng đề xuất "3–10
giây" là dải rộng chung, không tính đến việc dashboard có nhiều người dùng cùng mở
cuộc trò chuyện sẽ tạo tải lặp lên server free-tier (Render) — tôi phải tự cân nhắc
chọn điểm trong dải đó dựa trên giới hạn hạ tầng thực tế, không phải AI quyết.
Contextualization: Backend đang chạy trên Render free tier (giới hạn resource),
nên chọn 3 giây (đầu dải AI gợi ý) sẽ làm tăng tải đáng kể nếu nhiều cặp Farmer–
Enterprise cùng chat — đây là constraint hạ tầng cụ thể của đồ án, AI không biết môi
trường deploy khi mới tư vấn.
Creative Synthesis: Chọn 5 giây (POLLING_INTERVAL_MS = 5000) làm điểm cân bằng,
kết hợp thêm optimistic send (hiển thị tin nhắn ngay khi người dùng gửi, không
chờ round-trip API) để cảm giác "real-time" tốt hơn dù polling chậm hơn WebSocket.
Decision Ownership: Quyết định giữ polling cho bản nộp này và liệt kê rõ
"WebSocket/Socket.io real-time" là rủi ro/roadmap tiếp theo (mục [5.1] và [6] trong
PROJECT_OVERVIEW.txt), thay vì cố nhồi WebSocket vào sát deadline gây rủi ro vỡ tiến
độ — đây là quyết định ưu tiên đánh đổi giữa chất lượng kỹ thuật và rủi ro deadline.



Liên hệ PBL/RBL Component:

PBL: Module Nhắn tin (mục G, PROJECT_OVERVIEW.txt).
CT: Algorithms – chọn tham số (interval) cân bằng giữa UX và tải hệ thống.
AI Reflection: AI không hallucinate, nhưng đưa khuyến nghị tổng quát thiếu constraint
hạ tầng cụ thể — phần "đo ni đóng giày" do con người quyết định.



Evidence: fe/src/Component/Messaging/Messaging.jsx
(POLLING_INTERVAL_MS = 5000, pollingRef), mục [5.1]/[6] PROJECT_OVERVIEW.txt.



ENTRY #011


Prompt Type: VERIFICATION
Stage/Component: Pattern Recognition + Research Stage (RBL)
Problem/Context: Khi nhờ AI review nhanh middleware xác thực (auth.middleware.ts),
AI đưa ra một khẳng định về cách JWT hoạt động khiến tôi nghi ngờ và phải tự kiểm tra
lại logic của chính mình.
Prompt to AI: "Review this Express auth middleware. Does verifying a JWT signature
guarantee the user account is still active, or do I need an extra DB check?"
AI Response (Summary): AI khẳng định khá dứt khoát rằng "nếu JWT verify thành công
thì coi như user hợp lệ, không cần query DB thêm vì sẽ làm chậm mọi request" — đề xuất
bỏ bước check DB để tối ưu hiệu năng.
Human Delta & Reflection:

Critical Thinking: Đây là Logic Error/Hallucination dạng Context
Misunderstanding: AI nhầm giữa "JWT hợp lệ về chữ ký/hạn token" với "tài khoản còn
hoạt động". Một JWT đã ký hợp lệ vẫn có thể thuộc về tài khoản đã bị deactivate
sau khi token được phát hành (tính năng "vô hiệu hóa tài khoản" — mục A,
PROJECT_OVERVIEW.txt) — nếu bỏ check DB như AI đề xuất, user bị khóa vẫn có thể tiếp
tục dùng access token cũ cho đến khi hết hạn.
Contextualization: Hệ thống có yêu cầu nghiệp vụ rõ ràng: tài khoản có thể bị
admin/người dùng tự vô hiệu hóa bất kỳ lúc nào, và yêu cầu này phải có hiệu lực
ngay lập tức, không thể chờ token hết hạn — đây là ngữ cảnh bảo mật cụ thể AI
không có khi đưa ra khuyến nghị tối ưu hiệu năng thuần túy.
Creative Synthesis: Giữ nguyên bước query DB sau khi verify JWT (
User.findById(decoded.id).select('email role fullName isActive')) và kiểm tra cờ
isActive, nhưng để giảm chi phí, chỉ select đúng 4 field cần thiết thay vì toàn bộ
document — đây là cách tối ưu một phần gợi ý hiệu năng của AI mà KHÔNG đánh đổi tính
đúng đắn bảo mật.
Decision Ownership: Bác bỏ khuyến nghị "bỏ check DB" của AI, giữ middleware
protect() luôn xác minh lại trạng thái isActive từ DB cho mọi request — đây là
quyết định ưu tiên bảo mật hơn tốc độ thuần, đặc biệt quan trọng vì hệ thống xử lý
giao dịch tiền (escrow).



Liên hệ PBL/RBL Component:

PBL: Module xác thực — cơ chế bảo vệ route (protect middleware).
CT: Pattern Recognition – nhận diện AI đang nhầm 2 khái niệm "token hợp lệ" và
"tài khoản hợp lệ".
AI Reflection: Hallucination phát hiện được (Context Misunderstanding) — AI tối
ưu sai vì hiểu nhầm yêu cầu nghiệp vụ deactivate-account; corrective action là giữ
nguyên kiểm tra DB, chỉ tối ưu field select.



Evidence: be/src/middlewares/auth.middleware.ts (hàm protect, comment "Luồng
bảo vệ luôn kiểm tra lại người dùng trong DB để chặn tài khoản đã bị vô hiệu hóa").