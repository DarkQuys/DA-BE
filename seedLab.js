const mongoose = require("mongoose");
const Lab = require("./models/Labs");
const connectDB = require('./config/db');
const Web_pentest = [
  {
    "id": 1,
    "title": "XSS Attack Lab in Elgg",
    "platform": "SEED Labs",
    "category": "Web Security",
    "skill_tags": [
      "XSS",
      "Web Security",
      "Stored XSS"
    ],
    "difficulty": 2,
    "subject": "",
    "url": "https://seedsecuritylabs.org/Labs_20.04/Web/Web_XSS_Elgg/",
    "description": "Lab SEED về web security: XSS Attack Lab in Elgg.",
    "description_detail": "Lab này cho bạn thực hành tấn công XSS trên nền tảng mạng xã hội Elgg. Bạn sẽ tìm các vị trí ứng dụng hiển thị lại dữ liệu người dùng mà không lọc/mã hóa đúng cách, sau đó chèn payload JavaScript để tạo stored XSS, đánh cắp cookie, chiếm phiên hoặc thực hiện hành động thay mặt nạn nhân. Qua đó, bạn hiểu rõ cơ chế hoạt động của XSS, cách khai thác và các biện pháp phòng chống XSS trong ứng dụng web thực tế, đồng thời luyện các kỹ năng: XSS, Web Security, Stored XSS."
  },
  {
    "id": 2,
    "title": "CSRF Attack Lab in Elgg",
    "platform": "SEED Labs",
    "category": "Web Security",
    "skill_tags": [
      "CSRF",
      "Web Security",
      "Session",
      "State Change"
    ],
    "difficulty": 2,
    "subject": "",
    "url": "https://seedsecuritylabs.org/Labs_20.04/Web/Web_CSRF_Elgg/",
    "description": "Lab SEED về web security: CSRF Attack Lab in Elgg.",
    "description_detail": "Lab này mô phỏng tấn công CSRF trên Elgg – nơi trình duyệt tự đính kèm cookie phiên khi người dùng truy cập một trang độc hại. Bạn sẽ xây dựng các form/link bẫy để ép nạn nhân vô tình gửi request thay đổi trạng thái (như đổi email, thêm bạn bè, thay đổi profile) mà không hề hay biết. Thông qua bài lab, bạn sẽ hiểu bản chất CSRF gắn với cơ chế session, state change, cũng như vai trò của CSRF token, SameSite cookie và xác nhận lại thao tác, đồng thời luyện các kỹ năng: CSRF, Web Security, Session, State Change."
  },
  {
    "id": 3,
    "title": "SQL Injection Lab",
    "platform": "SEED Labs",
    "category": "Web Security",
    "skill_tags": [
      "SQL Injection",
      "Database",
      "Web Security"
    ],
    "difficulty": 2,
    "subject": "",
    "url": "https://seedsecuritylabs.org/Labs_20.04/Web/Web_SQL_Injection/",
    "description": "Lab SEED về web security: SQL Injection Lab.",
    "description_detail": "Lab này tập trung vào lỗ hổng SQL Injection trong ứng dụng web. Bạn sẽ phân tích các tham số đầu vào được nối thẳng vào câu truy vấn SQL, thử nhiều payload khác nhau để đọc dữ liệu ẩn, bypass đăng nhập, liệt kê cấu trúc database hoặc thay đổi dữ liệu. Sau khi hoàn thành, bạn sẽ nắm được cách nhận diện và khai thác SQLi, đồng thời hiểu rõ lý do nên dùng prepared statement/ORM và validate input để phòng chống. Các kỹ năng được luyện: SQL Injection, Database, Web Security."
  },
  {
    "id": 4,
    "title": "Clickjacking Cupcakes Lab",
    "platform": "SEED Labs",
    "category": "Web Security",
    "skill_tags": [
      "Clickjacking",
      "UI Redressing",
      "Web Security"
    ],
    "difficulty": 2,
    "subject": "",
    "url": "https://seedsecuritylabs.org/Labs_20.04/Web/Web_Clickjacking_Cupcakes/",
    "description": "Lab SEED về web security: Clickjacking Cupcakes Lab.",
    "description_detail": "Lab này minh họa tấn công clickjacking (UI redressing) bằng một trang cupcakes vui nhộn. Bạn sẽ nhúng trang nạn nhân vào trong iframe, chỉnh CSS (độ trong suốt, vị trí, kích thước) để lừa người dùng bấm vào nút nhạy cảm mà tưởng rằng đang thao tác trên trang vô hại. Bài lab giúp bạn hiểu cách clickjacking hoạt động, tác hại nếu không dùng header bảo vệ (X-Frame-Options, CSP frame-ancestors) và cách thiết kế UI hạn chế rủi ro. Các kỹ năng được luyện: Clickjacking, UI Redressing, Web Security."
  },
  {
    "id": 5,
    "title": "Shellshock Bash Vulnerability Lab",
    "platform": "SEED Labs",
    "category": "Web Security",
    "skill_tags": [
      "Shellshock",
      "Bash",
      "Environment Variables",
      "RCE"
    ],
    "difficulty": 3,
    "subject": "",
    "url": "https://seedsecuritylabs.org/Labs_20.04/Web/Shellshock/",
    "description": "Lab SEED về web security: Shellshock Bash Vulnerability Lab.",
    "description_detail": "Lab này cho bạn thực hành lỗ hổng Shellshock trên Bash, thường xuất hiện trong các CGI script của web server. Bạn sẽ lợi dụng cách Bash xử lý biến môi trường để chèn thêm lệnh shell, biến một request HTTP bình thường thành khả năng thực thi lệnh tùy ý trên server (RCE). Qua đó, bạn hiểu rõ cơ chế của Shellshock, phạm vi ảnh hưởng, cách khai thác từ xa và phương án vá lỗi/cấu hình lại dịch vụ. Các kỹ năng được luyện: Shellshock, Bash, Environment Variables, RCE."
  },
  {
    "id": 6,
    "title": "TLS Attack Lab",
    "platform": "SEED Labs",
    "category": "Cryptography",
    "skill_tags": [
      "TLS",
      "PKI",
      "Certificate",
      "Crypto"
    ],
    "difficulty": 3,
    "subject": "",
    "url": "https://seedsecuritylabs.org/Labs_20.04/Crypto/Crypto_TLS/",
    "description": "Lab SEED về cryptography: TLS Attack Lab.",
    "description_detail": "Lab TLS cho bạn tìm hiểu sâu hơn về giao thức TLS và các điểm yếu có thể bị khai thác. Bạn sẽ quan sát quá trình bắt tay, cấu trúc chứng chỉ, kiểm tra chuỗi tin cậy PKI, và thực hiện một số kịch bản tấn công/giả mạo trong môi trường lab có kiểm soát (ví dụ MITM khi người dùng không kiểm tra certificate). Kết thúc lab, bạn sẽ nắm rõ vai trò của TLS, PKI và certificate trong bảo vệ kênh truyền, cũng như hậu quả khi cấu hình sai. Các kỹ năng được luyện: TLS, PKI, Certificate, Crypto."
  },
  {
    "id": 7,
    "title": "PKI Lab",
    "platform": "SEED Labs",
    "category": "Cryptography",
    "skill_tags": [
      "PKI",
      "Certificate Authority",
      "Crypto"
    ],
    "difficulty": 3,
    "subject": "",
    "url": "https://seedsecuritylabs.org/Labs_20.04/Crypto/Crypto_PKI/",
    "description": "Lab SEED về cryptography: PKI Lab.",
    "description_detail": "Lab này giúp bạn hiểu hệ thống hạ tầng khóa công khai PKI trong thực tế. Bạn sẽ đóng vai Certificate Authority (CA) tự tạo CA của riêng mình, ký và quản lý chứng chỉ cho server/client, kiểm tra chuỗi tin cậy và cách trình duyệt/hệ điều hành xác thực certificate. Qua đó, bạn hiểu vì sao PKI là nền tảng của HTTPS, VPN, email bảo mật,… và rủi ro nếu CA bị xâm phạm hoặc người dùng bỏ qua cảnh báo. Các kỹ năng được luyện: PKI, Certificate Authority, Crypto."
  },
  {
    "id": 8,
    "title": "RSA Cryptosystem Lab",
    "platform": "SEED Labs",
    "category": "Cryptography",
    "skill_tags": [
      "RSA",
      "Public Key",
      "Crypto"
    ],
    "difficulty": 3,
    "subject": "",
    "url": "https://seedsecuritylabs.org/Labs_20.04/Crypto/Crypto_RSA/",
    "description": "Lab SEED về cryptography: RSA Cryptosystem Lab.",
    "description_detail": "Lab RSA cho bạn thực hành chi tiết với hệ mật mã khóa công khai RSA. Bạn sẽ tự tạo cặp khóa, thực hiện mã hóa/giải mã, ký số và kiểm tra chữ ký, đồng thời quan sát mối liên hệ giữa kích thước khóa, độ mạnh bảo mật và hiệu năng. Lab cũng giúp bạn hiểu những điểm yếu nếu sử dụng RSA sai cách (ví dụ không padding, dùng lại khóa, số nguyên tố yếu). Các kỹ năng được luyện: RSA, Public Key, Crypto."
  },
  {
    "id": 9,
    "title": "MD5 Collision Lab",
    "platform": "SEED Labs",
    "category": "Cryptography",
    "skill_tags": [
      "MD5",
      "Collision",
      "Hash Function",
      "Crypto"
    ],
    "difficulty": 4,
    "subject": "",
    "url": "https://seedsecuritylabs.org/Labs_20.04/Crypto/Crypto_MD5_Collision/",
    "description": "Lab SEED về cryptography: MD5 Collision Lab.",
    "description_detail": "Lab này cho bạn trực tiếp quan sát và thực hành tấn công tạo va chạm (collision) trên hàm băm MD5. Bạn sẽ sử dụng các công cụ/skript hỗ trợ để sinh ra hai thông điệp khác nhau nhưng có cùng giá trị MD5, sau đó thảo luận hậu quả nếu MD5 vẫn được dùng cho chữ ký số, chứng chỉ hoặc kiểm tra toàn vẹn. Sau bài lab, bạn sẽ hiểu rõ vì sao MD5 không còn an toàn và cần được thay thế bằng các hàm băm hiện đại. Các kỹ năng được luyện: MD5, Collision, Hash Function, Crypto."
  },
  {
    "id": 10,
    "title": "Hash Length Extension Attack Lab",
    "platform": "SEED Labs",
    "category": "Cryptography",
    "skill_tags": [
      "Hash Length Extension",
      "MAC Forgery",
      "Crypto"
    ],
    "difficulty": 4,
    "subject": "",
    "url": "https://seedsecuritylabs.org/Labs_20.04/Crypto/Crypto_Hash_Length_Ext/",
    "description": "Lab SEED về cryptography: Hash Length Extension Attack Lab.",
    "description_detail": "Lab này tập trung vào tấn công length extension trên một số hàm băm dựa trên Merkle–Damgård (như MD5, SHA-1). Bạn sẽ khai thác việc hệ thống dùng trực tiếp hash(secret || message) như MAC, từ đó xây dựng thông điệp dài hơn nhưng vẫn có hash hợp lệ mà không biết secret. Lab giúp bạn hiểu bản chất length extension attack, tại sao cần dùng HMAC thay vì tự chế MAC, và cách thiết kế giao thức an toàn hơn. Các kỹ năng được luyện: Hash Length Extension, MAC Forgery, Crypto."
  },
  {
    "id": 11,
    "title": "Padding Oracle Attack Lab",
    "platform": "SEED Labs",
    "category": "Cryptography",
    "skill_tags": [
      "Padding Oracle",
      "CBC",
      "Block Cipher",
      "Crypto"
    ],
    "difficulty": 4,
    "subject": "",
    "url": "https://seedsecuritylabs.org/Labs_20.04/Crypto/Crypto_Padding_Oracle/",
    "description": "Lab SEED về cryptography: Padding Oracle Attack Lab.",
    "description_detail": "Lab này cho bạn thực hành tấn công padding oracle trên chế độ mã khối CBC. Bạn sẽ lợi dụng thông báo lỗi/response khác nhau khi padding đúng hoặc sai để dần dần giải mã ciphertext mà không cần biết key, chỉ bằng cách gửi nhiều ciphertext đã chỉnh sửa. Bài lab giúp bạn thấy rõ rủi ro khi lộ 'oracle' và tầm quan trọng của việc thiết kế thông báo lỗi/kiểm tra padding đúng cách. Các kỹ năng được luyện: Padding Oracle, CBC, Block Cipher, Crypto."
  },
  {
    "id": 12,
    "title": "Random Number Vulnerability Lab",
    "platform": "SEED Labs",
    "category": "Cryptography",
    "skill_tags": [
      "PRNG",
      "Randomness",
      "Crypto"
    ],
    "difficulty": 3,
    "subject": "",
    "url": "https://seedsecuritylabs.org/Labs_20.04/Crypto/Crypto_Random_Number/",
    "description": "Lab SEED về cryptography: Random Number Vulnerability Lab.",
    "description_detail": "Lab này minh họa nguy cơ khi sử dụng bộ sinh số giả ngẫu nhiên (PRNG) yếu trong hệ thống mật mã. Bạn sẽ phân tích dãy số ngẫu nhiên được sinh ra, thử dự đoán giá trị tiếp theo hoặc lần ngược lại seed, và quan sát hậu quả nếu các số 'ngẫu nhiên' đó dùng làm khóa, nonce hoặc token. Qua lab, bạn hiểu tại sao phải dùng CSPRNG và nguồn entropy tốt trong các ứng dụng bảo mật. Các kỹ năng được luyện: PRNG, Randomness, Crypto."
  },
  {
    "id": 13,
    "title": "Meltdown Side-Channel Attack Lab",
    "platform": "SEED Labs",
    "category": "System Security",
    "skill_tags": [
      "Meltdown",
      "Side Channel",
      "Speculative Execution"
    ],
    "difficulty": 4,
    "subject": "",
    "url": "https://seedsecuritylabs.org/Labs_20.04/System/Meltdown_Attack/",
    "description": "Lab SEED về system security: Meltdown Side-Channel Attack Lab.",
    "description_detail": "Lab Meltdown cho bạn thực hành một dạng tấn công kênh kề (side-channel) khai thác cơ chế thực thi suy đoán (speculative execution) của CPU. Bạn sẽ dùng kỹ thuật đo thời gian truy cập cache để suy ra dữ liệu nhạy cảm trong vùng nhớ mà bình thường không được phép đọc. Bài lab giúp bạn thấy rõ sự khác nhau giữa mô hình bảo mật ở mức phần mềm và các vi sai ở mức vi kiến trúc CPU. Các kỹ năng được luyện: Meltdown, Side Channel, Speculative Execution."
  },
  {
    "id": 14,
    "title": "Spectre Side-Channel Attack Lab",
    "platform": "SEED Labs",
    "category": "System Security",
    "skill_tags": [
      "Spectre",
      "Side Channel",
      "Speculative Execution"
    ],
    "difficulty": 4,
    "subject": "",
    "url": "https://seedsecuritylabs.org/Labs_20.04/System/Spectre_Attack/",
    "description": "Lab SEED về system security: Spectre Side-Channel Attack Lab.",
    "description_detail": "Lab Spectre tiếp tục khai thác cơ chế speculative execution, nhưng tập trung vào việc 'lừa' CPU dự đoán nhánh sai để thực thi tạm thời các lệnh truy cập dữ liệu nhạy cảm, sau đó rò rỉ qua cache. Bạn sẽ xây dựng và phân tích proof-of-concept cho tấn công Spectre trên môi trường lab, từ đó hiểu phạm vi ảnh hưởng rộng của nó đến nhiều loại CPU và phần mềm. Các kỹ năng được luyện: Spectre, Side Channel, Speculative Execution."
  },
  {
    "id": 15,
    "title": "ICMP Redirect Attack Lab",
    "platform": "SEED Labs",
    "category": "Network Security",
    "skill_tags": [
      "ICMP",
      "Routing",
      "Network Attack"
    ],
    "difficulty": 3,
    "subject": "",
    "url": "https://seedsecuritylabs.org/Labs_20.04/Networking/ICMP_Redirect/",
    "description": "Lab SEED về network security: ICMP Redirect Attack Lab.",
    "description_detail": "Lab này mô phỏng tấn công ICMP Redirect, nơi kẻ tấn công gửi gói ICMP giả để lừa host cập nhật bảng định tuyến và chuyển traffic qua một router giả/MITM. Bạn sẽ quan sát cách hệ điều hành xử lý ICMP redirect, thay đổi route và sau đó kiểm tra luồng dữ liệu đã bị chuyển hướng như thế nào. Bài lab giúp bạn hiểu rủi ro của việc tin tưởng ICMP, cách cấu hình thiết bị mạng để hạn chế tấn công kiểu này. Các kỹ năng được luyện: ICMP, Routing, Network Attack."
  },
  {
    "id": 16,
    "title": "TCP Attacks Lab",
    "platform": "SEED Labs",
    "category": "Network Security",
    "skill_tags": [
      "TCP",
      "Session Hijacking",
      "Network Attack"
    ],
    "difficulty": 3,
    "subject": "",
    "url": "https://seedsecuritylabs.org/Labs_20.04/Networking/TCP_Attacks/",
    "description": "Lab SEED về network security: TCP Attacks Lab.",
    "description_detail": "Lab TCP Attacks cho bạn thực hành nhiều dạng tấn công dựa trên giao thức TCP, như giả mạo gói tin, đoán sequence number, reset kết nối hoặc chiếm luôn phiên TCP đang mở (session hijacking). Bạn sẽ quan sát quá trình bắt tay 3 bước, cách TCP duy trì trạng thái kết nối và xem khi bị can thiệp thì phiên làm việc bị phá vỡ ra sao. Qua đó, bạn hiểu rõ hơn điểm yếu của TCP cổ điển và các cơ chế bảo vệ bổ sung. Các kỹ năng được luyện: TCP, Session Hijacking, Network Attack."
  },
  {
    "id": 17,
    "title": "Mitnick Attack Lab",
    "platform": "SEED Labs",
    "category": "Network Security",
    "skill_tags": [
      "TCP",
      "Sequence Prediction",
      "Network Attack"
    ],
    "difficulty": 4,
    "subject": "",
    "url": "https://seedsecuritylabs.org/Labs_20.04/Networking/Mitnick_Attack/",
    "description": "Lab SEED về network security: Mitnick Attack Lab.",
    "description_detail": "Lab này tái hiện lại kiểu tấn công kinh điển của Kevin Mitnick, dựa trên việc dự đoán sequence number trong TCP để giả mạo một host tin cậy. Bạn sẽ thiết lập bối cảnh với máy tin cậy, máy nạn nhân và máy tấn công, sau đó thực hiện spoofing và chiếm phiên để thực thi lệnh mà không cần có phản hồi rõ ràng. Bài lab giúp bạn thấy rõ hạn chế của TCP cũ và tầm quan trọng của các cơ chế xác thực ở tầng cao hơn. Các kỹ năng được luyện: TCP, Sequence Prediction, Network Attack."
  },
  {
    "id": 18,
    "title": "Firewall Exploration Lab",
    "platform": "SEED Labs",
    "category": "Network Security",
    "skill_tags": [
      "Firewall",
      "Filtering",
      "Network Defense"
    ],
    "difficulty": 2,
    "subject": "",
    "url": "https://seedsecuritylabs.org/Labs_20.04/Networking/Firewall/",
    "description": "Lab SEED về network security: Firewall Exploration Lab.",
    "description_detail": "Lab Firewall Exploration giúp bạn làm quen với cơ chế lọc gói và chính sách của tường lửa. Bạn sẽ quan sát các rule hiện có, thử gửi nhiều loại traffic khác nhau (theo IP, port, giao thức) và xem rule nào được áp dụng, từ đó hiểu thứ tự xử lý, default policy và cách thiết kế rule hợp lý. Lab phù hợp để xây nền tảng về network defense trước khi nghiên cứu tấn công vượt tường lửa. Các kỹ năng được luyện: Firewall, Filtering, Network Defense."
  },
  {
    "id": 19,
    "title": "Firewall Evasion Lab",
    "platform": "SEED Labs",
    "category": "Network Security",
    "skill_tags": [
      "Firewall",
      "Evasion",
      "Tunneling"
    ],
    "difficulty": 3,
    "subject": "",
    "url": "https://seedsecuritylabs.org/Labs_20.04/Networking/Firewall_Evasion/",
    "description": "Lab SEED về network security: Firewall Evasion Lab.",
    "description_detail": "Lab này tập trung vào kỹ thuật vượt qua tường lửa (firewall evasion). Bạn sẽ thử các cách như phân mảnh gói, thay đổi port, dùng tunneling hoặc lợi dụng rule cấu hình chưa chặt để đưa traffic đi qua firewall một cách bất ngờ. Qua bài lab, bạn hiểu góc nhìn của attacker khi đối đầu với firewall, từ đó biết cách thắt chặt rule và giám sát tốt hơn. Các kỹ năng được luyện: Firewall, Evasion, Tunneling."
  },
  {
    "id": 20,
    "title": "VPN Tunnel Lab",
    "platform": "SEED Labs",
    "category": "Network Security",
    "skill_tags": [
      "VPN",
      "Tunneling",
      "Encryption"
    ],
    "difficulty": 3,
    "subject": "",
    "url": "https://seedsecuritylabs.org/Labs_20.04/Networking/VPN_Tunnel/",
    "description": "Lab SEED về network security: VPN Tunnel Lab.",
    "description_detail": "Lab VPN Tunnel cho bạn xây dựng và phân tích một đường hầm VPN thực thụ. Bạn sẽ cấu hình hai mạng ở hai đầu tunnel, thiết lập VPN để traffic nội bộ có thể đi qua internet nhưng vẫn được mã hóa và bảo vệ. Sau đó, bạn sẽ so sánh gói tin trước và sau khi đi qua tunnel, hiểu rõ cơ chế encapsulation, encryption và các tham số cấu hình quan trọng. Các kỹ năng được luyện: VPN, Tunneling, Encryption."
  },
  {
    "id": 21,
    "title": "VPN Basics Lab",
    "platform": "SEED Labs",
    "category": "Network Security",
    "skill_tags": [
      "VPN",
      "Remote Access",
      "Network Security"
    ],
    "difficulty": 2,
    "subject": "",
    "url": "https://seedsecuritylabs.org/Labs_20.04/Networking/VPN/",
    "description": "Lab SEED về network security: VPN Basics Lab.",
    "description_detail": "Lab này là bước nhập môn về VPN. Bạn sẽ cấu hình một VPN cơ bản cho người dùng từ xa kết nối vào mạng nội bộ, hiểu khái niệm tunnel, chính sách truy cập, địa chỉ IP cấp cho client và cách xác thực. Bài lab giúp bạn nắm vững khái niệm nền tảng của VPN trước khi chuyển sang các cấu hình và tấn công phức tạp hơn. Các kỹ năng được luyện: VPN, Remote Access, Network Security."
  },
  {
    "id": 22,
    "title": "BGP Exploration Attack Lab",
    "platform": "SEED Labs",
    "category": "Network Security",
    "skill_tags": [
      "BGP",
      "Routing",
      "Network Attack"
    ],
    "difficulty": 4,
    "subject": "",
    "url": "https://seedsecuritylabs.org/Labs_20.04/Networking/BGP/BGP_Exploration_Attack/",
    "description": "Lab SEED về network security: BGP Exploration Attack Lab.",
    "description_detail": "Lab BGP Exploration Attack cho bạn khám phá giao thức định tuyến giữa các hệ tự trị (BGP) và các kiểu tấn công liên quan. Bạn sẽ cấu hình các router BGP, quan sát việc quảng bá route và thực hiện thử nghiệm hijack hoặc route leak trong môi trường lab để thấy traffic bị chuyển hướng như thế nào. Lab giúp bạn hiểu tại sao BGP là xương sống của internet nhưng lại thiếu cơ chế xác thực mạnh, và cách các ISP/doanh nghiệp có thể giảm thiểu rủi ro. Các kỹ năng được luyện: BGP, Routing, Network Attack."
  },
  {
    "id": 23,
    "title": "Morris Worm Lab",
    "platform": "SEED Labs",
    "category": "Network Security",
    "skill_tags": [
      "Worm",
      "Propagation",
      "Network Attack"
    ],
    "difficulty": 3,
    "subject": "",
    "url": "https://seedsecuritylabs.org/Labs_20.04/Networking/Morris_Worm/",
    "description": "Lab SEED về network security: Morris Worm Lab.",
    "description_detail": "Lab này tái hiện lại cơ chế hoạt động của Morris Worm – một trong những sâu máy tính nổi tiếng đầu tiên trên internet. Bạn sẽ phân tích cách nó khai thác nhiều lỗ hổng khác nhau, tự sao chép và lây lan giữa các máy, từ đó thấy rõ tác động của một worm trên diện rộng. Bài lab giúp bạn hiểu khái niệm worm, cơ chế propagation và bài học về vá lỗi/giám sát hệ thống. Các kỹ năng được luyện: Worm, Propagation, Network Attack."
  },
  {
    "id": 24,
    "title": "Heartbleed Attack Lab",
    "platform": "SEED Labs",
    "category": "Network Security",
    "skill_tags": [
      "Heartbleed",
      "OpenSSL",
      "Memory Disclosure"
    ],
    "difficulty": 3,
    "subject": "",
    "url": "https://seedsecuritylabs.org/Labs_20.04/Networking/Heartbleed/",
    "description": "Lab SEED về network security: Heartbleed Attack Lab.",
    "description_detail": "Lab Heartbleed cho bạn thực hành tấn công lỗ hổng nổi tiếng trong OpenSSL (Heartbleed). Bạn sẽ gửi các gói heartbeat có độ dài khai báo lớn hơn dữ liệu thực tế, buộc server trả về thêm dữ liệu từ bộ nhớ, có thể chứa thông tin nhạy cảm như private key, cookie hoặc mật khẩu. Qua đó, bạn thấy rõ mức độ nguy hiểm của lỗi memory disclosure trong thư viện nền tảng và tầm quan trọng của việc cập nhật nhanh chóng. Các kỹ năng được luyện: Heartbleed, OpenSSL, Memory Disclosure."
  },
  {
    "id": 25,
    "title": "Sniffing and Spoofing Lab",
    "platform": "SEED Labs",
    "category": "Network Security",
    "skill_tags": [
      "Sniffing",
      "Spoofing",
      "Man-in-the-Middle"
    ],
    "difficulty": 2,
    "subject": "",
    "url": "https://seedsecuritylabs.org/Labs_20.04/Networking/Sniffing_Spoofing/",
    "description": "Lab SEED về network security: Sniffing and Spoofing Lab.",
    "description_detail": "Lab này giúp bạn thực hành hai kỹ thuật cơ bản trong tấn công mạng: sniffing và spoofing. Bạn sẽ dùng công cụ để bắt các gói tin đi qua mạng LAN, nhìn thấy dữ liệu rõ ràng trong giao thức không mã hóa, đồng thời thử giả mạo địa chỉ IP/MAC để can thiệp vào luồng giao tiếp hoặc dựng MITM. Sau bài lab, bạn hiểu rõ rủi ro trong mạng không chuyển mạch/mạng không mã hóa và tầm quan trọng của việc dùng HTTPS, SSH, switch, ARP protection,… Các kỹ năng được luyện: Sniffing, Spoofing, Man-in-the-Middle."
  },
  {
    "id": 26,
    "title": "ARP Attack Lab",
    "platform": "SEED Labs",
    "category": "Network Security",
    "skill_tags": [
      "ARP",
      "Spoofing",
      "MITM"
    ],
    "difficulty": 2,
    "subject": "",
    "url": "https://seedsecuritylabs.org/Labs_20.04/Networking/ARP_Attack/",
    "description": "Lab SEED về network security: ARP Attack Lab.",
    "description_detail": "Lab ARP Attack tập trung vào tấn công ARP spoofing/poisoning trong mạng LAN. Bạn sẽ gửi các gói ARP giả để đánh lừa bảng ARP của nạn nhân và gateway, khiến lưu lượng đi qua máy tấn công (MITM), sau đó kết hợp với sniffing để quan sát hoặc chỉnh sửa dữ liệu. Bài lab giúp bạn hiểu rõ cơ chế ARP, vì sao nó dễ bị giả mạo và các biện pháp phòng vệ như static ARP, dynamic ARP inspection, sử dụng switch cấu hình tốt. Các kỹ năng được luyện: ARP, Spoofing, MITM."
  }
]

async function seed() {
  try {
    await connectDB();

    // await Roadmap.deleteMany({});
    await Lab.create(Web_pentest);

    console.log("Seed Success");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();
