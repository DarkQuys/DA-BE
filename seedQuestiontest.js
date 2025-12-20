const mongoose = require("mongoose");
const QuizQuestion = require("./models/CQuestion");
const connectDB = require('./config/db');
const Web_pentest = [
  {
    "id": 1,
    "domain": "DFIR Analyst (Digital Forensics)",
    "skill": "DFIR Basics",
    "difficulty": "easy",
    "type": "knowledge",
    "question": "DFIR (Digital Forensics & Incident Response) tập trung chủ yếu vào mục tiêu nào?",
    "options": [
      "A. Thu thập, phân tích chứng cứ số và xử lý sự cố bảo mật",
      "B. Thiết kế giao diện người dùng cho ứng dụng web",
      "C. Tối ưu hiệu năng cơ sở dữ liệu",
      "D. Cấu hình mạng LAN cho công ty"
    ],
    "answer": 0
  },
  {
    "id": 2,
    "domain": "DFIR Analyst (Digital Forensics)",
    "skill": "Order of Volatility",
    "difficulty": "easy",
    "type": "knowledge",
    "question": "Trong DFIR, \"order of volatility\" dùng để chỉ điều gì?",
    "options": [
      "A. Thứ tự ưu tiên thu thập dữ liệu theo mức độ dễ mất đi",
      "B. Thứ tự các bước cài đặt hệ điều hành",
      "C. Thứ tự backup dữ liệu trong tuần",
      "D. Thứ tự vá lỗi phần mềm"
    ],
    "answer": 0
  },
  {
    "id": 3,
    "domain": "DFIR Analyst (Digital Forensics)",
    "skill": "Order of Volatility",
    "difficulty": "medium",
    "type": "knowledge",
    "question": "Dữ liệu nào thường được xem là biến động (volatile) nhất và nên thu thập sớm nhất?",
    "options": [
      "A. Nội dung RAM và bảng kết nối mạng đang hoạt động",
      "B. Ổ cứng hệ thống đã tắt nguồn",
      "C. Bản sao lưu tuần trước trên tape",
      "D. Tài liệu in giấy trong văn phòng"
    ],
    "answer": 0
  },
  {
    "id": 4,
    "domain": "DFIR Analyst (Digital Forensics)",
    "skill": "Chain of Custody",
    "difficulty": "easy",
    "type": "knowledge",
    "question": "Mục đích chính của 'chain of custody' trong điều tra số là gì?",
    "options": [
      "A. Ghi lại quá trình ai đã tiếp xúc với chứng cứ, khi nào và vì lý do gì",
      "B. Mã hóa toàn bộ ổ đĩa",
      "C. Xóa dấu vết tạm thời khỏi hệ thống",
      "D. Thay đổi quyền sở hữu file"
    ],
    "answer": 0
  },
  {
    "id": 5,
    "domain": "DFIR Analyst (Digital Forensics)",
    "skill": "Imaging",
    "difficulty": "medium",
    "type": "knowledge",
    "question": "Khi tạo image forensics của ổ đĩa, thao tác nào sau đây là đúng chuẩn hơn?",
    "options": [
      "A. Tạo bản sao bit-by-bit và tính hash trước/sau để đảm bảo tính toàn vẹn",
      "B. Sao chép các file quan trọng bằng Windows Explorer",
      "C. Nén ổ đĩa thành file ZIP",
      "D. Chỉ chụp ảnh màn hình các thư mục chính"
    ],
    "answer": 0
  },
  {
    "id": 6,
    "domain": "DFIR Analyst (Digital Forensics)",
    "skill": "Hashing",
    "difficulty": "easy",
    "type": "knowledge",
    "question": "Giá trị hash (MD5/SHA-1/SHA-256…) thường dùng để làm gì trong điều tra số?",
    "options": [
      "A. Xác minh tính toàn vẹn của file hoặc image",
      "B. Nén dữ liệu để tiết kiệm dung lượng",
      "C. Mã hóa dữ liệu trên đĩa",
      "D. Tăng tốc truy cập file"
    ],
    "answer": 0
  },
  {
    "id": 7,
    "domain": "DFIR Analyst (Digital Forensics)",
    "skill": "Windows Artifacts",
    "difficulty": "medium",
    "type": "knowledge",
    "question": "Trong Windows, MFT (Master File Table) thuộc về thành phần nào?",
    "options": [
      "A. Hệ thống file NTFS",
      "B. Registry SYSTEM hive",
      "C. Bộ nhớ ảo (pagefile)",
      "D. Event Log Security"
    ],
    "answer": 0
  },
  {
    "id": 8,
    "domain": "DFIR Analyst (Digital Forensics)",
    "skill": "Windows Artifacts",
    "difficulty": "medium",
    "type": "knowledge",
    "question": "File prefetch (.pf) trong Windows giúp DFIR analyst làm gì?",
    "options": [
      "A. Xác định chương trình nào đã được thực thi và thời điểm gần đây",
      "B. Xem nội dung email đã gửi",
      "C. Lưu cấu hình tường lửa",
      "D. Lưu danh sách user trong domain"
    ],
    "answer": 0
  },
  {
    "id": 9,
    "domain": "DFIR Analyst (Digital Forensics)",
    "skill": "Registry",
    "difficulty": "medium",
    "type": "knowledge",
    "question": "Hive registry nào chứa thông tin tài khoản local (SAM database) trên Windows?",
    "options": [
      "A. SAM",
      "B. SYSTEM",
      "C. SOFTWARE",
      "D. SECURITY"
    ],
    "answer": 0
  },
  {
    "id": 10,
    "domain": "DFIR Analyst (Digital Forensics)",
    "skill": "Timestamps",
    "difficulty": "medium",
    "type": "knowledge",
    "question": "Trong phân tích NTFS, \"MACB\" thường dùng để chỉ gì?",
    "options": [
      "A. Các loại timestamp: Modified, Accessed, Created, Birth/Changed",
      "B. Các loại firewall rule",
      "C. Các chế độ boot của Windows",
      "D. Các kiểu tài khoản user"
    ],
    "answer": 0
  },
  {
    "id": 11,
    "domain": "DFIR Analyst (Digital Forensics)",
    "skill": "Incident Triage",
    "difficulty": "medium",
    "type": "scenario",
    "question": "Bạn được báo cáo một máy có dấu hiệu bị ransomware. Bước hợp lý đầu tiên trong DFIR là gì?",
    "options": [
      "A. Cô lập máy khỏi mạng, sau đó đánh giá phạm vi ảnh hưởng và thu thập chứng cứ",
      "B. Ngay lập tức format ổ đĩa để sạch malware",
      "C. Trả lời email tống tiền để thương lượng",
      "D. Thay đổi toàn bộ mật khẩu nhân viên"
    ],
    "answer": 0
  },
  {
    "id": 12,
    "domain": "DFIR Analyst (Digital Forensics)",
    "skill": "Memory Forensics",
    "difficulty": "medium",
    "type": "knowledge",
    "question": "Công cụ nào thường dùng để phân tích dump bộ nhớ (RAM) trong DFIR?",
    "options": [
      "A. Volatility",
      "B. Nmap",
      "C. Sqlmap",
      "D. Nessus"
    ],
    "answer": 0
  },
  {
    "id": 13,
    "domain": "DFIR Analyst (Digital Forensics)",
    "skill": "Memory Forensics",
    "difficulty": "scenario",
    "type": "scenario",
    "question": "Khi phân tích RAM, bạn thấy một tiến trình lạ kết nối tới IP nước ngoài trên port bất thường. Động thái tiếp theo nên là gì?",
    "options": [
      "A. Trích xuất tiến trình, module và network connection liên quan để phân tích sâu thêm",
      "B. Bỏ qua vì có thể chỉ là phần mềm bình thường",
      "C. Ngay lập tức tắt máy mà không thu thêm dữ liệu",
      "D. Xóa log hệ điều hành để tiết kiệm dung lượng"
    ],
    "answer": 0
  },
  {
    "id": 14,
    "domain": "DFIR Analyst (Digital Forensics)",
    "skill": "Network Forensics",
    "difficulty": "easy",
    "type": "knowledge",
    "question": "Trong phân tích PCAP, giao thức nào thường chứa nội dung HTTP rõ ràng (nếu không dùng HTTPS)?",
    "options": [
      "A. TCP port 80",
      "B. UDP port 53",
      "C. ICMP",
      "D. ARP"
    ],
    "answer": 0
  },
  {
    "id": 15,
    "domain": "DFIR Analyst (Digital Forensics)",
    "skill": "Network Forensics",
    "difficulty": "medium",
    "type": "scenario",
    "question": "Bạn phân tích PCAP và thấy nhiều kết nối nhỏ, đều đặn từ một host nội bộ tới một domain mới đăng ký, payload trông ngẫu nhiên. Điều này gợi ý gì?",
    "options": [
      "A. Lưu lượng C2 hoặc data exfiltration được mã hóa/ẩn",
      "B. Người dùng xem video YouTube",
      "C. Cập nhật Windows bình thường",
      "D. Truy vấn DNS nội bộ bình thường"
    ],
    "answer": 0
  },
  {
    "id": 16,
    "domain": "DFIR Analyst (Digital Forensics)",
    "skill": "Log Analysis",
    "difficulty": "medium",
    "type": "scenario",
    "question": "Trong log web server, bạn thấy tham số URL chứa 'cmd=whoami' và 'cmd=powershell'. Điều này có thể chỉ ra điều gì?",
    "options": [
      "A. Cố gắng khai thác web shell hoặc RCE trên server",
      "B. Người dùng test tốc độ mạng",
      "C. Cấu hình cronjob",
      "D. Backup database"
    ],
    "answer": 0
  },
  {
    "id": 17,
    "domain": "DFIR Analyst (Digital Forensics)",
    "skill": "Email Forensics",
    "difficulty": "medium",
    "type": "knowledge",
    "question": "Khi phân tích email, phần nào giúp xác định đường đi thực tế của email qua các mail server?",
    "options": [
      "A. Các trường 'Received' trong header",
      "B. Trường 'Subject'",
      "C. Hình nền trong email",
      "D. Font chữ sử dụng"
    ],
    "answer": 0
  },
  {
    "id": 18,
    "domain": "DFIR Analyst (Digital Forensics)",
    "skill": "Artifacts Correlation",
    "difficulty": "hard",
    "type": "knowledge",
    "question": "Lý do chính cần tương quan nhiều loại artifact (RAM, disk, log mạng, registry) trong một cuộc điều tra là gì?",
    "options": [
      "A. Xây dựng timeline đầy đủ và kiểm chứng chéo các dấu vết",
      "B. Tăng kích thước báo cáo cho ấn tượng",
      "C. Giảm thời gian điều tra xuống 0",
      "D. Có thể bỏ qua chain of custody"
    ],
    "answer": 0
  },
  {
    "id": 19,
    "domain": "DFIR Analyst (Digital Forensics)",
    "skill": "Timeline Analysis",
    "difficulty": "medium",
    "type": "knowledge",
    "question": "Mục đích chính của phân tích timeline trong DFIR là gì?",
    "options": [
      "A. Sắp xếp các sự kiện theo thời gian để hiểu trình tự tấn công",
      "B. Tối ưu hiệu năng hệ thống",
      "C. Tạo biểu đồ cho đẹp báo cáo",
      "D. Giảm dung lượng log"
    ],
    "answer": 0
  },
  {
    "id": 20,
    "domain": "DFIR Analyst (Digital Forensics)",
    "skill": "Reporting",
    "difficulty": "easy",
    "type": "knowledge",
    "question": "Trong báo cáo DFIR, phần 'Findings' nên tập trung vào nội dung gì?",
    "options": [
      "A. Những gì đã phát hiện được: dấu vết, nguyên nhân, phạm vi ảnh hưởng",
      "B. Chỉ liệt kê công cụ đã sử dụng",
      "C. Chỉ liệt kê lệnh đã gõ",
      "D. Danh sách lỗi cấu hình không liên quan"
    ],
    "answer": 0
  },
  {
    "id": 21,
    "domain": "DFIR Analyst (Digital Forensics)",
    "skill": "Disk Imaging",
    "difficulty": "medium",
    "type": "scenario",
    "question": "Khi tạo image ổ đĩa nghi bị xâm nhập, tại sao nên dùng write blocker phần cứng hoặc phần mềm?",
    "options": [
      "A. Ngăn việc ghi mới lên ổ gốc, bảo vệ tính toàn vẹn chứng cứ",
      "B. Tăng tốc độ đọc dữ liệu",
      "C. Giảm kích thước image",
      "D. Tự động xoá file rác"
    ],
    "answer": 0
  },
  {
    "id": 22,
    "domain": "DFIR Analyst (Digital Forensics)",
    "skill": "File Carving",
    "difficulty": "medium",
    "type": "knowledge",
    "question": "File carving là kỹ thuật gì trong forensics?",
    "options": [
      "A. Khôi phục file dựa trên header/footer và cấu trúc dữ liệu chứ không dựa vào bảng file system",
      "B. Nén file log để tiết kiệm chỗ",
      "C. Chia nhỏ file lớn thành nhiều phần",
      "D. Mã hóa file trên ổ đĩa"
    ],
    "answer": 0
  },
  {
    "id": 23,
    "domain": "DFIR Analyst (Digital Forensics)",
    "skill": "Anti-Forensics",
    "difficulty": "hard",
    "type": "knowledge",
    "question": "Ví dụ nào sau đây thuộc nhóm kỹ thuật anti-forensics của attacker?",
    "options": [
      "A. Xóa log, ghi đè file, dùng timestomping để thay đổi timestamp",
      "B. Sử dụng mật khẩu mạnh",
      "C. Bật tường lửa cá nhân",
      "D. Sử dụng HTTPS"
    ],
    "answer": 0
  },
  {
    "id": 24,
    "domain": "DFIR Analyst (Digital Forensics)",
    "skill": "Timestomping",
    "difficulty": "medium",
    "type": "scenario",
    "question": "Trong điều tra, bạn thấy một file thực thi độc hại nhưng timestamp 'Created' lại rất cũ, không khớp với các artifact khác. Điều này gợi ý gì?",
    "options": [
      "A. Attacker có thể đã dùng timestomping để che giấu thời điểm tạo file",
      "B. File không liên quan đến cuộc tấn công",
      "C. Hệ thống bị lỗi đồng hồ nên bỏ qua",
      "D. Đây là file hệ thống hợp lệ"
    ],
    "answer": 0
  },
  {
    "id": 25,
    "domain": "DFIR Analyst (Digital Forensics)",
    "skill": "Cloud DFIR",
    "difficulty": "medium",
    "type": "knowledge",
    "question": "Thách thức lớn khi làm DFIR trên môi trường cloud là gì?",
    "options": [
      "A. Hạn chế quyền truy cập tầng hạ tầng, log phân tán trên nhiều dịch vụ",
      "B. Không thể dùng bất kỳ công cụ forensics nào",
      "C. Không tồn tại log trên cloud",
      "D. Không thể tạo snapshot máy ảo"
    ],
    "answer": 0
  },
  {
    "id": 26,
    "domain": "DFIR Analyst (Digital Forensics)",
    "skill": "Linux Forensics",
    "difficulty": "medium",
    "type": "knowledge",
    "question": "Trên Linux, file nào thường chứa lịch sử lệnh shell của user (ví dụ bash)?",
    "options": [
      "A. ~/.bash_history",
      "B. /etc/passwd",
      "C. /var/log/dmesg",
      "D. /etc/hosts"
    ],
    "answer": 0
  },
  {
    "id": 27,
    "domain": "DFIR Analyst (Digital Forensics)",
    "skill": "Linux Forensics",
    "difficulty": "scenario",
    "type": "scenario",
    "question": "Trong quá trình điều tra, bạn phát hiện cron job lạ chạy script từ /tmp mỗi phút. Điều hợp lý là gì?",
    "options": [
      "A. Phân tích script, nguồn gốc tạo cron và vai trò của nó trong cuộc tấn công",
      "B. Xóa luôn script và cron rồi đóng case",
      "C. Bỏ qua vì cron thường là hợp lệ",
      "D. Tắt toàn bộ dịch vụ cron trên server"
    ],
    "answer": 0
  },
  {
    "id": 28,
    "domain": "DFIR Analyst (Digital Forensics)",
    "skill": "Windows Persistence",
    "difficulty": "medium",
    "type": "knowledge",
    "question": "Kỹ thuật persistence nào sau đây phổ biến trên Windows?",
    "options": [
      "A. Thêm key vào Run/RunOnce trong registry hoặc tạo scheduled task độc hại",
      "B. Chỉ đổi tên file hệ điều hành",
      "C. Tắt Windows Defender",
      "D. Đổi hình nền máy tính"
    ],
    "answer": 0
  },
  {
    "id": 29,
    "domain": "DFIR Analyst (Digital Forensics)",
    "skill": "Browser Artifacts",
    "difficulty": "medium",
    "type": "knowledge",
    "question": "Dữ liệu trình duyệt (history, cookies, cache) có thể giúp DFIR analyst điều tra điều gì?",
    "options": [
      "A. Website đã truy cập, thời gian, phiên đăng nhập, có click link phishing hay không",
      "B. Cấu hình BIOS",
      "C. Thông tin phần cứng CPU",
      "D. Danh sách driver thiết bị"
    ],
    "answer": 0
  },
  {
    "id": 30,
    "domain": "DFIR Analyst (Digital Forensics)",
    "skill": "Ransomware",
    "difficulty": "medium",
    "type": "scenario",
    "question": "Trong một sự cố ransomware, thông tin nào DFIR analyst cần thu thập sớm nhất để đánh giá khả năng khôi phục?",
    "options": [
      "A. Loại ransomware, phạm vi file bị mã hóa, tình trạng backup gần nhất",
      "B. Màu nền màn hình của nạn nhân",
      "C. Tên user đăng nhập Windows",
      "D. Số lượng máy in trong mạng"
    ],
    "answer": 0
  },
  {
    "id": 31,
    "domain": "DFIR Analyst (Digital Forensics)",
    "skill": "Malware Triage",
    "difficulty": "medium",
    "type": "scenario",
    "question": "Bạn nhận được một file nghi malware từ hệ thống EDR. Bước triage đầu tiên phù hợp là gì?",
    "options": [
      "A. Tính hash, tra cứu trên VirusTotal/threat intel rồi quyết định phân tích sâu thêm hay không",
      "B. Mở trực tiếp trên máy cá nhân để xem",
      "C. Xóa file ngay lập tức",
      "D. Gửi file cho tất cả nhân viên để cảnh báo"
    ],
    "answer": 0
  },
  {
    "id": 32,
    "domain": "DFIR Analyst (Digital Forensics)",
    "skill": "Log Preservation",
    "difficulty": "easy",
    "type": "knowledge",
    "question": "Khi bắt đầu điều tra, tại sao cần nhanh chóng lưu giữ (preserve) log liên quan?",
    "options": [
      "A. Log có thể bị xoá bởi rotation, bởi attacker hoặc bởi hệ thống",
      "B. Để giảm dung lượng ổ cứng",
      "C. Để tránh phải xem log",
      "D. Để hệ thống chạy nhanh hơn"
    ],
    "answer": 0
  },
  {
    "id": 33,
    "domain": "DFIR Analyst (Digital Forensics)",
    "skill": "IR Plan",
    "difficulty": "medium",
    "type": "knowledge",
    "question": "Vì sao tổ chức cần có sẵn Incident Response Plan trước khi xảy ra sự cố?",
    "options": [
      "A. Để khi sự cố xảy ra có quy trình rõ ràng, giảm thời gian phản ứng và sai sót",
      "B. Để không cần đào tạo nhân viên",
      "C. Để tránh phải mua công cụ bảo mật",
      "D. Để không cần backup dữ liệu"
    ],
    "answer": 0
  },
  {
    "id": 34,
    "domain": "DFIR Analyst (Digital Forensics)",
    "skill": "Mobile Forensics",
    "difficulty": "medium",
    "type": "knowledge",
    "question": "Thách thức đặc trưng của mobile forensics so với PC là gì?",
    "options": [
      "A. Mã hóa mạnh, khoá bootloader, nhiều hệ điều hành và kiểu lưu trữ khác nhau",
      "B. Không có bất kỳ cơ chế log nào",
      "C. Không thể kết nối thiết bị với máy tính",
      "D. Không tồn tại công cụ hỗ trợ"
    ],
    "answer": 0
  },
  {
    "id": 35,
    "domain": "DFIR Analyst (Digital Forensics)",
    "skill": "Legal Considerations",
    "difficulty": "medium",
    "type": "knowledge",
    "question": "Trong DFIR, tại sao yếu tố pháp lý (legal) lại quan trọng?",
    "options": [
      "A. Chứng cứ có thể phải sử dụng trước toà hoặc với cơ quan chức năng, nên phải được thu thập và bảo quản đúng quy định",
      "B. Để tránh phải báo cáo sự cố",
      "C. Để có thể xoá log thoải mái",
      "D. Để không cần chain of custody"
    ],
    "answer": 0
  },
  {
    "id": 36,
    "domain": "DFIR Analyst (Digital Forensics)",
    "skill": "Root Cause",
    "difficulty": "medium",
    "type": "knowledge",
    "question": "Mục tiêu của phân tích nguyên nhân gốc (root cause analysis) trong DFIR là gì?",
    "options": [
      "A. Xác định điểm vào, kỹ thuật tấn công ban đầu để đưa ra biện pháp phòng ngừa",
      "B. Tìm ai là người chịu trách nhiệm tài chính",
      "C. Giảm dung lượng ổ đĩa",
      "D. Tăng số lượng công cụ bảo mật"
    ],
    "answer": 0
  },
  {
    "id": 37,
    "domain": "DFIR Analyst (Digital Forensics)",
    "skill": "Host vs Network Forensics",
    "difficulty": "medium",
    "type": "knowledge",
    "question": "Điểm khác nhau chính giữa host-based forensics và network forensics là gì?",
    "options": [
      "A. Host forensics tập trung vào artifact trên máy cuối; network forensics tập trung vào lưu lượng và thiết bị mạng",
      "B. Host forensics chỉ dùng cho Windows, network forensics chỉ dùng cho Linux",
      "C. Host forensics không thể dùng hash",
      "D. Network forensics không cần log"
    ],
    "answer": 0
  },
  {
    "id": 38,
    "domain": "DFIR Analyst (Digital Forensics)",
    "skill": "Case Management",
    "difficulty": "easy",
    "type": "knowledge",
    "question": "Tại sao DFIR team cần hệ thống quản lý case/ticket riêng?",
    "options": [
      "A. Theo dõi công việc, timeline, chứng cứ và người phụ trách từng bước",
      "B. Để xóa dữ liệu sự cố nhanh hơn",
      "C. Để thay thế SIEM",
      "D. Để giảm số người trong team"
    ],
    "answer": 0
  },
  {
    "id": 39,
    "domain": "DFIR Analyst (Digital Forensics)",
    "skill": "Tool Validation",
    "difficulty": "medium",
    "type": "knowledge",
    "question": "Vì sao cần kiểm thử và xác nhận độ tin cậy của công cụ forensics trước khi sử dụng chính thức?",
    "options": [
      "A. Đảm bảo kết quả chính xác, có thể bảo vệ được trước toà hoặc kiểm toán",
      "B. Để công cụ chạy nhanh hơn",
      "C. Để giảm dung lượng log",
      "D. Để tránh phải dùng chain of custody"
    ],
    "answer": 0
  },
  {
    "id": 40,
    "domain": "DFIR Analyst (Digital Forensics)",
    "skill": "Steganography",
    "difficulty": "medium",
    "type": "knowledge",
    "question": "Trong bối cảnh DFIR, tại sao cần quan tâm tới steganography (giấu tin) trong file media?",
    "options": [
      "A. Attacker có thể giấu dữ liệu hoặc cấu hình C2 trong ảnh/âm thanh để tránh bị phát hiện",
      "B. Để nén log tốt hơn",
      "C. Để tăng chất lượng hình ảnh",
      "D. Để mã hóa toàn bộ ổ đĩa"
    ],
    "answer": 0
  },
  {
    "id": 41,
    "domain": "DFIR Analyst (Digital Forensics)",
    "skill": "PCAP Tools",
    "difficulty": "easy",
    "type": "knowledge",
    "question": "Công cụ nào sau đây thường dùng để phân tích file PCAP trong điều tra số?",
    "options": [
      "A. Wireshark",
      "B. Nmap",
      "C. Sqlmap",
      "D. John the Ripper"
    ],
    "answer": 0
  },
  {
    "id": 42,
    "domain": "DFIR Analyst (Digital Forensics)",
    "skill": "Zeek / Network Metadata",
    "difficulty": "medium",
    "type": "knowledge",
    "question": "Ưu điểm của việc dùng Zeek (Bro) hoặc hệ thống tạo log metadata mạng so với chỉ lưu PCAP thô là gì?",
    "options": [
      "A. Giảm dung lượng lưu trữ nhưng vẫn giữ thông tin phiên, dễ tìm kiếm và tương quan",
      "B. Không cần cấu hình gì thêm",
      "C. Tự động chặn mọi tấn công",
      "D. Thay thế hoàn toàn firewall"
    ],
    "answer": 0
  },
  {
    "id": 43,
    "domain": "DFIR Analyst (Digital Forensics)",
    "skill": "Working Copies",
    "difficulty": "easy",
    "type": "knowledge",
    "question": "Khi phân tích image ổ đĩa, tại sao nên làm việc trên bản copy thay vì bản gốc?",
    "options": [
      "A. Tránh làm thay đổi chứng cứ gốc, giữ nguyên cho mục đích pháp lý",
      "B. Bản copy chạy nhanh hơn",
      "C. Bản gốc không thể mount được",
      "D. Để giảm dung lượng"
    ],
    "answer": 0
  },
  {
    "id": 44,
    "domain": "DFIR Analyst (Digital Forensics)",
    "skill": "Log Normalization",
    "difficulty": "medium",
    "type": "knowledge",
    "question": "Log normalization trong DFIR giúp ích điều gì?",
    "options": [
      "A. Chuẩn hoá nhiều định dạng log khác nhau về cấu trúc chung để dễ tìm kiếm và so sánh",
      "B. Giảm kích thước log xuống 0",
      "C. Mã hóa log để không ai đọc được",
      "D. Xoá các trường không quan trọng"
    ],
    "answer": 0
  },
  {
    "id": 45,
    "domain": "DFIR Analyst (Digital Forensics)",
    "skill": "Time Synchronization",
    "difficulty": "medium",
    "type": "knowledge",
    "question": "Tại sao đồng bộ thời gian (NTP) giữa các hệ thống lại quan trọng với DFIR?",
    "options": [
      "A. Để timeline giữa các log/thiết bị khớp nhau, giúp tái dựng sự kiện chính xác",
      "B. Để tăng tốc CPU",
      "C. Để giảm dung lượng RAM",
      "D. Để tắt bớt log"
    ],
    "answer": 0
  },
  {
    "id": 46,
    "domain": "DFIR Analyst (Digital Forensics)",
    "skill": "Collaboration",
    "difficulty": "easy",
    "type": "knowledge",
    "question": "Trong một cuộc điều tra lớn, tại sao DFIR analyst cần phối hợp chặt với SOC và team hạ tầng?",
    "options": [
      "A. SOC cung cấp cảnh báo/log, hạ tầng hỗ trợ thao tác trên hệ thống, giúp điều tra và ứng cứu hiệu quả",
      "B. Để chia sẻ mật khẩu admin",
      "C. Để giảm số lượng log",
      "D. Để tắt bớt hệ thống giám sát"
    ],
    "answer": 0
  },
  {
    "id": 47,
    "domain": "DFIR Analyst (Digital Forensics)",
    "skill": "Documentation",
    "difficulty": "easy",
    "type": "knowledge",
    "question": "Vì sao việc ghi chép chi tiết các bước đã làm trong quá trình DFIR lại quan trọng?",
    "options": [
      "A. Để có thể tái hiện, giải thích và bảo vệ kết luận điều tra nếu bị chất vấn",
      "B. Để báo cáo trông dài hơn",
      "C. Để tránh phải dùng công cụ forensics",
      "D. Để ẩn bớt lỗi trong quá trình điều tra"
    ],
    "answer": 0
  },
  {
    "id": 48,
    "domain": "DFIR Analyst (Digital Forensics)",
    "skill": "Data Recovery",
    "difficulty": "medium",
    "type": "knowledge",
    "question": "Trong nhiều vụ việc, tại sao khả năng khôi phục dữ liệu (data recovery) cũng là một phần quan trọng của DFIR?",
    "options": [
      "A. Giúp tổ chức nhanh chóng trở lại hoạt động, giảm tác động kinh doanh sau sự cố",
      "B. Để tăng dung lượng ổ cứng",
      "C. Để không cần backup nữa",
      "D. Để che giấu dấu vết tấn công"
    ],
    "answer": 0
  },
  {
    "id": 49,
    "domain": "DFIR Analyst (Digital Forensics)",
    "skill": "Continuous Improvement",
    "difficulty": "medium",
    "type": "knowledge",
    "question": "Bài học rút ra từ một cuộc điều tra DFIR nên được sử dụng như thế nào?",
    "options": [
      "A. Cập nhật playbook, quy trình, use case phát hiện và biện pháp phòng ngừa",
      "B. Lưu trữ rồi bỏ quên",
      "C. Chỉ dùng để báo cáo cho lãnh đạo rồi xoá",
      "D. Chỉ dùng để đánh giá cá nhân"
    ],
    "answer": 0
  },
  {
    "id": 50,
    "domain": "DFIR Analyst (Digital Forensics)",
    "skill": "Mindset",
    "difficulty": "easy",
    "type": "knowledge",
    "question": "Tư duy quan trọng của một DFIR analyst giỏi là gì?",
    "options": [
      "A. Tư duy điều tra, kiên nhẫn, chú ý chi tiết và luôn kiểm chứng chéo chứng cứ",
      "B. Chỉ tin vào cảm giác cá nhân",
      "C. Luôn cố xoá nhanh sự cố để đỡ tốn thời gian",
      "D. Chỉ quan tâm tới công cụ, không cần hiểu bối cảnh"
    ],
    "answer": 0
  }
]
async function seed() {
  try {
    await connectDB();

    // await Roadmap.deleteMany({});
    await QuizQuestion.create(Web_pentest);

    console.log("Seed Success");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();
