const mongoose = require("mongoose");
const QuizQuestion = require("./models/CQuestion");
const connectDB = require('./config/db');
const Web_pentest = [
  {
    "id": 1,
    "domain": "Malware Analyst",
    "skill": "Malware Basics",
    "difficulty": "easy",
    "type": "knowledge",
    "question": "Mục tiêu chính của một malware analyst là gì?",
    "options": [
      "A. Phân tích mã độc để hiểu hành vi, mục tiêu và cách phòng thủ",
      "B. Viết thêm nhiều loại malware mới",
      "C. Thiết kế giao diện người dùng cho ứng dụng",
      "D. Quản lý cơ sở dữ liệu doanh nghiệp"
    ],
    "answer": 0
  },
  {
    "id": 2,
    "domain": "Malware Analyst",
    "skill": "Static vs Dynamic",
    "difficulty": "easy",
    "type": "knowledge",
    "question": "Khác biệt chính giữa phân tích tĩnh (static) và phân tích động (dynamic) là gì?",
    "options": [
      "A. Static không chạy mã, chỉ xem cấu trúc/binary; dynamic cho chạy mã trong môi trường kiểm soát",
      "B. Static luôn an toàn tuyệt đối, dynamic luôn làm hỏng máy",
      "C. Static chỉ dùng cho script, dynamic chỉ dùng cho file PE",
      "D. Static chỉ xem log, dynamic chỉ xem network"
    ],
    "answer": 0
  },
  {
    "id": 3,
    "domain": "Malware Analyst",
    "skill": "Basic Static",
    "difficulty": "easy",
    "type": "knowledge",
    "question": "Công cụ nào sau đây thường dùng cho phân tích tĩnh file PE trên Windows?",
    "options": [
      "A. PEiD, PE-bear, IDA, Ghidra",
      "B. Wireshark, Zeek",
      "C. Burp Suite",
      "D. Sqlmap"
    ],
    "answer": 0
  },
  {
    "id": 4,
    "domain": "Malware Analyst",
    "skill": "Hashing",
    "difficulty": "easy",
    "type": "knowledge",
    "question": "Tại sao cần tính hash (MD5/SHA-256) của mẫu mã độc?",
    "options": [
      "A. Để định danh mẫu, chia sẻ IOC và đảm bảo tính toàn vẹn file",
      "B. Để nén file cho nhẹ",
      "C. Để mã hóa file",
      "D. Để tăng tốc độ phân tích"
    ],
    "answer": 0
  },
  {
    "id": 5,
    "domain": "Malware Analyst",
    "skill": "File Types",
    "difficulty": "easy",
    "type": "knowledge",
    "question": "Trên Windows, mã độc dạng thực thi native thường có định dạng gì?",
    "options": [
      "A. PE (Portable Executable), ví dụ .exe, .dll",
      "B. ELF",
      "C. Mach-O",
      "D. Script .sh"
    ],
    "answer": 0
  },
  {
    "id": 6,
    "domain": "Malware Analyst",
    "skill": "PE Structure",
    "difficulty": "medium",
    "type": "knowledge",
    "question": "Trong file PE, bảng import (Import Table) giúp analyst biết điều gì?",
    "options": [
      "A. Các API và thư viện mà chương trình gọi tới",
      "B. Danh sách user trên hệ thống",
      "C. Danh sách địa chỉ IP liên hệ",
      "D. Các tiến trình đang chạy"
    ],
    "answer": 0
  },
  {
    "id": 7,
    "domain": "Malware Analyst",
    "skill": "Packing",
    "difficulty": "medium",
    "type": "knowledge",
    "question": "Dấu hiệu thường gặp cho thấy một file PE có thể đã bị pack/obfuscate là gì?",
    "options": [
      "A. Số lượng section ít, tên section lạ, entropy cao, import table rất nhỏ",
      "B. Nhiều comment tiếng Anh trong code",
      "C. Dung lượng file rất lớn nhưng không có code",
      "D. File không có phần header"
    ],
    "answer": 0
  },
  {
    "id": 8,
    "domain": "Malware Analyst",
    "skill": "Unpacking",
    "difficulty": "hard",
    "type": "scenario",
    "question": "Khi chạy mã độc pack trong debugger, bạn muốn lấy được payload đã giải nén. Bước nào sau đây là hợp lý?",
    "options": [
      "A. Đặt breakpoint sau API VirtualAlloc/WriteProcessMemory và dump vùng nhớ chứa code đã unpack",
      "B. Chỉ đổi tên file .exe",
      "C. Nén lại file bằng ZIP",
      "D. Đổi quyền file thành read-only"
    ],
    "answer": 0
  },
  {
    "id": 9,
    "domain": "Malware Analyst",
    "skill": "Sandbox",
    "difficulty": "easy",
    "type": "knowledge",
    "question": "Mục đích chính của sandbox khi phân tích mã độc là gì?",
    "options": [
      "A. Cho phép chạy mã độc an toàn, ghi lại hành vi mà không ảnh hưởng môi trường thật",
      "B. Tăng tốc chạy phần mềm hợp lệ",
      "C. Thay thế hoàn toàn antivirus",
      "D. Lưu trữ log hệ thống"
    ],
    "answer": 0
  },
  {
    "id": 10,
    "domain": "Malware Analyst",
    "skill": "Network Behavior",
    "difficulty": "medium",
    "type": "scenario",
    "question": "Khi chạy mã độc trong sandbox, bạn thấy nó kết nối đều đặn tới domain lạ trên port 443, gửi gói dữ liệu nhỏ. Điều này thường gợi ý gì?",
    "options": [
      "A. Lưu lượng C2 (Command & Control) hoặc beaconing",
      "B. Cập nhật Windows bình thường",
      "C. Quét port nội bộ",
      "D. In tài liệu ra máy in"
    ],
    "answer": 0
  },
  {
    "id": 11,
    "domain": "Malware Analyst",
    "skill": "Persistence",
    "difficulty": "medium",
    "type": "knowledge",
    "question": "Kỹ thuật persistence phổ biến của malware trên Windows là gì?",
    "options": [
      "A. Thêm key vào HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run",
      "B. Chỉ thay đổi hình nền",
      "C. Xóa toàn bộ log",
      "D. Đổi tên user"
    ],
    "answer": 0
  },
  {
    "id": 12,
    "domain": "Malware Analyst",
    "skill": "Windows Internals",
    "difficulty": "medium",
    "type": "knowledge",
    "question": "Khái niệm 'process hollowing' mô tả điều gì?",
    "options": [
      "A. Tạo tiến trình hợp lệ rồi thay thế code bên trong bằng mã độc",
      "B. Tắt tiến trình antivirus",
      "C. Tăng ưu tiên CPU cho tiến trình",
      "D. Nén tiến trình lại để chạy nhanh hơn"
    ],
    "answer": 0
  },
  {
    "id": 13,
    "domain": "Malware Analyst",
    "skill": "API Monitoring",
    "difficulty": "medium",
    "type": "scenario",
    "question": "Khi theo dõi API, bạn thấy chuỗi lệnh: VirtualAlloc → WriteProcessMemory → CreateRemoteThread. Chuỗi này thường gợi ý kỹ thuật gì?",
    "options": [
      "A. Code injection vào tiến trình khác",
      "B. Mã hóa file log",
      "C. Thay đổi cấu hình mạng",
      "D. Cập nhật driver"
    ],
    "answer": 0
  },
  {
    "id": 14,
    "domain": "Malware Analyst",
    "skill": "Obfuscation",
    "difficulty": "medium",
    "type": "knowledge",
    "question": "Mục tiêu của kỹ thuật obfuscation trong malware là gì?",
    "options": [
      "A. Làm khó analyst và tránh bị phát hiện bởi chữ ký tĩnh",
      "B. Nén dữ liệu cho nhẹ",
      "C. Tăng tốc thực thi",
      "D. Tối ưu bộ nhớ cache"
    ],
    "answer": 0
  },
  {
    "id": 15,
    "domain": "Malware Analyst",
    "skill": "String Analysis",
    "difficulty": "easy",
    "type": "knowledge",
    "question": "Phân tích chuỗi (strings) trong file malware có thể giúp tìm thấy gì?",
    "options": [
      "A. Tên domain/IP, đường dẫn file, API, thông điệp, key hard-code",
      "B. Cấu hình BIOS",
      "C. Tốc độ CPU",
      "D. Dung lượng RAM"
    ],
    "answer": 0
  },
  {
    "id": 16,
    "domain": "Malware Analyst",
    "skill": "Anti-VM / Anti-Sandbox",
    "difficulty": "hard",
    "type": "knowledge",
    "question": "Ví dụ nào sau đây là kỹ thuật anti-VM/anti-sandbox của malware?",
    "options": [
      "A. Kiểm tra tên process phổ biến của VM, kiểm tra MAC OUI, độ phân giải màn hình, thời gian uptime",
      "B. Tắt Windows Update",
      "C. Đổi tên file thực thi",
      "D. Chạy trên cổng 80"
    ],
    "answer": 0
  },
  {
    "id": 17,
    "domain": "Malware Analyst",
    "skill": "Ransomware",
    "difficulty": "medium",
    "type": "knowledge",
    "question": "Đặc điểm nổi bật của ransomware so với các loại malware khác là gì?",
    "options": [
      "A. Mã hóa dữ liệu nạn nhân và đòi tiền chuộc để giải mã",
      "B. Chỉ dùng để đào tiền ảo",
      "C. Chỉ dùng để gửi spam",
      "D. Chỉ thay đổi giao diện website"
    ],
    "answer": 0
  },
  {
    "id": 18,
    "domain": "Malware Analyst",
    "skill": "Banking / Spyware",
    "difficulty": "medium",
    "type": "knowledge",
    "question": "Banking trojan thường nhắm tới mục tiêu nào?",
    "options": [
      "A. Thông tin đăng nhập ngân hàng, giao dịch tài chính",
      "B. Thông tin cấu hình router",
      "C. Thư mục hệ điều hành",
      "D. Ứng dụng chơi game"
    ],
    "answer": 0
  },
  {
    "id": 19,
    "domain": "Malware Analyst",
    "skill": "C2 Protocols",
    "difficulty": "hard",
    "type": "knowledge",
    "question": "Vì sao nhiều malware hiện đại dùng HTTPS hoặc các dịch vụ hợp pháp (CDN, cloud, Telegram, Discord) làm kênh C2?",
    "options": [
      "A. Để ngụy trang lưu lượng C2 vào traffic bình thường và tránh bị chặn theo port",
      "B. Để tăng tốc độ tấn công",
      "C. Để giảm chi phí máy chủ",
      "D. Để bắt buộc nạn nhân nâng cấp trình duyệt"
    ],
    "answer": 0
  },
  {
    "id": 20,
    "domain": "Malware Analyst",
    "skill": "YARA / Signatures",
    "difficulty": "medium",
    "type": "knowledge",
    "question": "YARA rule thường được dùng để làm gì trong malware analysis?",
    "options": [
      "A. Mô tả mẫu (pattern) của malware để quét, phân loại và săn tìm (hunt)",
      "B. Cấu hình firewall",
      "C. Quản lý tài khoản AD",
      "D. Nén log hệ thống"
    ],
    "answer": 0
  },
  {
    "id": 21,
    "domain": "Malware Analyst",
    "skill": "Lab Safety",
    "difficulty": "easy",
    "type": "knowledge",
    "question": "Biện pháp nào sau đây giúp đảm bảo an toàn khi dựng lab phân tích mã độc?",
    "options": [
      "A. Dùng máy ảo cô lập, tắt shared folder/hyper-v integration không cần thiết, chặn Internet hoặc chỉ cho đi qua proxy kiểm soát",
      "B. Phân tích trực tiếp trên máy cá nhân đang dùng Internet bình thường",
      "C. Tắt antivirus rồi mở file trên máy chính",
      "D. Chia sẻ folder mã độc qua mạng nội bộ công ty"
    ],
    "answer": 0
  },
  {
    "id": 22,
    "domain": "Malware Analyst",
    "skill": "Static Tools",
    "difficulty": "easy",
    "type": "knowledge",
    "question": "Công cụ nào sau đây thường dùng để disassemble mã máy của malware?",
    "options": [
      "A. IDA Pro hoặc Ghidra",
      "B. Wireshark",
      "C. Burp Suite",
      "D. Nmap"
    ],
    "answer": 0
  },
  {
    "id": 23,
    "domain": "Malware Analyst",
    "skill": "Dynamic Tools",
    "difficulty": "easy",
    "type": "knowledge",
    "question": "Công cụ nào thường dùng để giám sát thay đổi registry và file system khi chạy malware?",
    "options": [
      "A. Sysmon, Procmon (Process Monitor)",
      "B. Sqlmap",
      "C. Dirbuster",
      "D. Nikto"
    ],
    "answer": 0
  },
  {
    "id": 24,
    "domain": "Malware Analyst",
    "skill": "Sysinternals",
    "difficulty": "medium",
    "type": "knowledge",
    "question": "Process Explorer/Process Hacker giúp malware analyst làm gì?",
    "options": [
      "A. Quan sát tiến trình, tree, handle, DLL loaded, memory usage của malware",
      "B. Cấu hình router",
      "C. Quản lý user domain",
      "D. Sửa mã nguồn ứng dụng web"
    ],
    "answer": 0
  },
  {
    "id": 25,
    "domain": "Malware Analyst",
    "skill": "Indicators Extraction",
    "difficulty": "medium",
    "type": "scenario",
    "question": "Sau khi phân tích, bạn trích xuất được domain, IP, hash, và tên mutex mà malware sử dụng. Các thông tin này gọi là gì?",
    "options": [
      "A. Indicator of Compromise (IOC)",
      "B. Vulnerability",
      "C. Patch",
      "D. Service Level Agreement"
    ],
    "answer": 0
  },
  {
    "id": 26,
    "domain": "Malware Analyst",
    "skill": "String Deobfuscation",
    "difficulty": "hard",
    "type": "scenario",
    "question": "Mã độc lưu chuỗi C2 ở dạng XOR với một key 1 byte. Cách nhanh để tìm C2 là gì?",
    "options": [
      "A. Viết script brute force XOR với 256 giá trị và tìm chuỗi trông giống domain/IP",
      "B. Nén file rồi mở lại",
      "C. Đổi đuôi file sang .txt",
      "D. Đổi timezone hệ điều hành"
    ],
    "answer": 0
  },
  {
    "id": 27,
    "domain": "Malware Analyst",
    "skill": "Process Injection",
    "difficulty": "medium",
    "type": "scenario",
    "question": "Khi giám sát, bạn thấy malware tạo process 'svchost.exe' với tham số lạ, sau đó inject code vào đó. Mục đích chính là gì?",
    "options": [
      "A. Ẩn hoạt động trong process hệ thống hợp lệ để khó phát hiện",
      "B. Tăng tốc độ mạng",
      "C. Giảm dung lượng RAM",
      "D. Tạo thêm user hợp lệ"
    ],
    "answer": 0
  },
  {
    "id": 28,
    "domain": "Malware Analyst",
    "skill": "Rootkits",
    "difficulty": "hard",
    "type": "knowledge",
    "question": "Rootkit khác gì so với malware thông thường?",
    "options": [
      "A. Rootkit tập trung vào ẩn sự tồn tại của malware/bản thân nó bằng cách can thiệp sâu vào hệ thống (kernel, driver)",
      "B. Rootkit chỉ dùng trên Linux",
      "C. Rootkit chỉ dùng để đào coin",
      "D. Rootkit không thể bị phát hiện"
    ],
    "answer": 0
  },
  {
    "id": 29,
    "domain": "Malware Analyst",
    "skill": "Log / DFIR Integration",
    "difficulty": "medium",
    "type": "knowledge",
    "question": "Vì sao malware analyst cần phối hợp với SOC/DFIR khi xử lý sự cố thực tế?",
    "options": [
      "A. SOC/DFIR cung cấp log, timeline, phạm vi lây nhiễm để analyst hiểu bối cảnh và đề xuất IOC/phòng thủ",
      "B. Để chia sẻ mật khẩu admin",
      "C. Để tắt hệ thống giám sát",
      "D. Để giảm lượng log lưu trữ"
    ],
    "answer": 0
  },
  {
    "id": 30,
    "domain": "Malware Analyst",
    "skill": "Packing Detection",
    "difficulty": "medium",
    "type": "scenario",
    "question": "Bạn chạy 'strings' nhưng rất ít chuỗi đọc được, entropy section .text cao, import rất ít. Bước tiếp theo hợp lý là gì?",
    "options": [
      "A. Thử phát hiện packer (PEiD, DIE) và tiến hành dynamic analysis/unpacking",
      "B. Kết luận file sạch",
      "C. Xóa file ngay lập tức",
      "D. Gửi cho người dùng mở thử"
    ],
    "answer": 0
  },
  {
    "id": 31,
    "domain": "Malware Analyst",
    "skill": "Macro Malware",
    "difficulty": "medium",
    "type": "scenario",
    "question": "Với mẫu malware là file Word chứa macro, bước phân tích hợp lý là gì?",
    "options": [
      "A. Dùng công cụ như olevba, olevba3, mraptor để trích xuất và phân tích macro",
      "B. Mở file bằng Word và bấm Enable Content trên máy thật",
      "C. Đổi đuôi file sang .txt",
      "D. Nén file lại bằng ZIP"
    ],
    "answer": 0
  },
  {
    "id": 32,
    "domain": "Malware Analyst",
    "skill": "Script Malware",
    "difficulty": "medium",
    "type": "knowledge",
    "question": "Vì sao malware dùng PowerShell/JavaScript ngày càng phổ biến?",
    "options": [
      "A. Tận dụng công cụ có sẵn trong hệ thống, khó phân biệt với hoạt động hợp lệ",
      "B. Chạy chậm hơn nên ít bị phát hiện",
      "C. Không cần Internet",
      "D. Không tạo log hệ thống"
    ],
    "answer": 0
  },
  {
    "id": 33,
    "domain": "Malware Analyst",
    "skill": "Behavioral Analysis",
    "difficulty": "medium",
    "type": "scenario",
    "question": "Trong dynamic analysis, bạn tập trung quan sát những hành vi nào của malware?",
    "options": [
      "A. Tạo/sửa/xóa file, registry, network connection, process, service",
      "B. Độ sáng màn hình",
      "C. Tốc độ quay quạt CPU",
      "D. Dung lượng pin"
    ],
    "answer": 0
  },
  {
    "id": 34,
    "domain": "Malware Analyst",
    "skill": "Anti-Debugging",
    "difficulty": "hard",
    "type": "knowledge",
    "question": "Kỹ thuật anti-debugging phổ biến của malware là gì?",
    "options": [
      "A. Gọi API như IsDebuggerPresent, CheckRemoteDebuggerPresent hoặc dùng timing check, exception trick",
      "B. Đổi icon chương trình",
      "C. Thay đổi DNS server",
      "D. Xóa file log"
    ],
    "answer": 0
  },
  {
    "id": 35,
    "domain": "Malware Analyst",
    "skill": "Code Flow",
    "difficulty": "hard",
    "type": "scenario",
    "question": "Khi reverse một function lớn, bạn thấy rất nhiều jump không cần thiết và control flow bị rối. Đây là dấu hiệu của gì?",
    "options": [
      "A. Control-flow obfuscation",
      "B. Code sạch, tối ưu",
      "C. Compiler lỗi",
      "D. Hệ điều hành hỏng"
    ],
    "answer": 0
  },
  {
    "id": 36,
    "domain": "Malware Analyst",
    "skill": "Config Extraction",
    "difficulty": "hard",
    "type": "scenario",
    "question": "Tại sao trích xuất cấu hình (config) của malware (C2, key, campaign ID, flags…) lại quan trọng?",
    "options": [
      "A. Giúp hiểu rõ chiến dịch, IOC và cách phòng thủ, chia sẻ với cộng đồng/khách hàng",
      "B. Chỉ để tăng độ khó reverse",
      "C. Để nén file",
      "D. Để thay đổi mã độc"
    ],
    "answer": 0
  },
  {
    "id": 37,
    "domain": "Malware Analyst",
    "skill": "Classification",
    "difficulty": "medium",
    "type": "knowledge",
    "question": "Khi phân loại malware theo hành vi, nhóm 'trojan' thường có đặc điểm nào?",
    "options": [
      "A. Giả dạng phần mềm hợp lệ nhưng thực hiện hành vi độc hại",
      "B. Tự nhân bản lây lan không cần tương tác",
      "C. Chỉ mã hóa dữ liệu",
      "D. Chỉ nghe lén bàn phím"
    ],
    "answer": 0
  },
  {
    "id": 38,
    "domain": "Malware Analyst",
    "skill": "Worms & Botnets",
    "difficulty": "medium",
    "type": "knowledge",
    "question": "Worm khác với trojan ở điểm nào?",
    "options": [
      "A. Worm tự động lây lan qua mạng mà không cần người dùng chạy thủ công",
      "B. Worm luôn vô hại",
      "C. Worm chỉ chạy trên Linux",
      "D. Worm không bao giờ dùng mạng"
    ],
    "answer": 0
  },
  {
    "id": 39,
    "domain": "Malware Analyst",
    "skill": "Crypto Basics",
    "difficulty": "medium",
    "type": "knowledge",
    "question": "Trong ransomware, vì sao việc mã độc dùng Crypto chuẩn (AES/RSA đúng cách) lại khiến việc giải mã trở nên rất khó nếu không có key?",
    "options": [
      "A. Vì thuật toán đã được thiết kế để chống lại brute-force trong thời gian khả thi",
      "B. Vì file bị xoá luôn sau khi mã hóa",
      "C. Vì nạn nhân không được phép backup",
      "D. Vì key luôn công khai"
    ],
    "answer": 0
  },
  {
    "id": 40,
    "domain": "Malware Analyst",
    "skill": "Reporting",
    "difficulty": "easy",
    "type": "knowledge",
    "question": "Trong báo cáo malware analysis gửi cho SOC/khách hàng, phần quan trọng nhất đối với phòng thủ là gì?",
    "options": [
      "A. IOC, hành vi chính, kỹ thuật tấn công và khuyến nghị phòng thủ",
      "B. Nhật ký cảm xúc của analyst",
      "C. Mọi đoạn disassembly chi tiết",
      "D. Tất cả lệnh debugger đã dùng"
    ],
    "answer": 0
  },
  {
    "id": 41,
    "domain": "Malware Analyst",
    "skill": "Automation",
    "difficulty": "medium",
    "type": "knowledge",
    "question": "Tại sao nên tự động hóa một số bước phân tích malware (trích xuất hash, strings, PE info,…)?",
    "options": [
      "A. Tiết kiệm thời gian, giảm lỗi lặp và giúp analyst tập trung vào phần khó hơn",
      "B. Để không cần hiểu malware",
      "C. Để tránh phải viết báo cáo",
      "D. Để không cần sandbox"
    ],
    "answer": 0
  },
  {
    "id": 42,
    "domain": "Malware Analyst",
    "skill": "Threat Intelligence",
    "difficulty": "medium",
    "type": "knowledge",
    "question": "Khi tra hash malware trên VirusTotal và nhiều nguồn TI, bạn có thể thu được gì?",
    "options": [
      "A. Tên họ hàng biến thể, IOC bổ sung, mẫu rule YARA, liên kết tới campaign/nhóm APT",
      "B. Thông tin lương của attacker",
      "C. Cấu hình router của nạn nhân",
      "D. Mật khẩu Wi-Fi"
    ],
    "answer": 0
  },
  {
    "id": 43,
    "domain": "Malware Analyst",
    "skill": "Ethics",
    "difficulty": "easy",
    "type": "knowledge",
    "question": "Về mặt đạo đức/nghề nghiệp, malware analyst cần tuân thủ điều gì?",
    "options": [
      "A. Không sử dụng kiến thức/mẫu đã phân tích để tấn công, chỉ phục vụ phòng thủ và nghiên cứu hợp pháp",
      "B. Có thể bán mẫu cho bất kỳ ai trả giá cao",
      "C. Được phép phát tán thử trên Internet để test thực tế",
      "D. Được phép thu tiền chuộc thay ransomware"
    ],
    "answer": 0
  },
  {
    "id": 44,
    "domain": "Malware Analyst",
    "skill": "Environment Artifacts",
    "difficulty": "medium",
    "type": "scenario",
    "question": "Sau khi chạy malware, bạn nên thu thập những artifact nào từ máy để phục vụ phân tích/DFIR?",
    "options": [
      "A. Memory dump, log hệ thống, bản snapshot, danh sách file/registry mới/đổi, PCAP nếu có",
      "B. Chỉ chụp ảnh màn hình desktop",
      "C. Chỉ lưu file .exe ban đầu",
      "D. Chỉ ghi lại thời gian bắt đầu chạy"
    ],
    "answer": 0
  },
  {
    "id": 45,
    "domain": "Malware Analyst",
    "skill": "Mobile Malware",
    "difficulty": "medium",
    "type": "knowledge",
    "question": "Mobile malware trên Android thường phân phối dưới dạng gì?",
    "options": [
      "A. File APK cài ngoài (sideload), app giả mạo trên store, link phishing dẫn tới app độc",
      "B. File .exe gửi qua email",
      "C. Script .bat",
      "D. File .iso"
    ],
    "answer": 0
  },
  {
    "id": 46,
    "domain": "Malware Analyst",
    "skill": "Evasion",
    "difficulty": "hard",
    "type": "knowledge",
    "question": "Một kỹ thuật giúp malware trốn tránh antivirus dựa trên chữ ký là gì?",
    "options": [
      "A. Thay đổi nhỏ binary mỗi lần (polymorphic/metamorphic) để hash và pattern khác nhau",
      "B. Luôn dùng cùng một binary không đổi",
      "C. Chỉ chạy vào ban đêm",
      "D. Tăng kích thước file lên rất lớn"
    ],
    "answer": 0
  },
  {
    "id": 47,
    "domain": "Malware Analyst",
    "skill": "Sandbox Evasion",
    "difficulty": "hard",
    "type": "scenario",
    "question": "Malware chỉ thực thi payload sau 2 giờ hệ thống hoạt động và khi phát hiện có tương tác chuột/bàn phím. Mục tiêu chính là gì?",
    "options": [
      "A. Né sandbox tự động vốn chỉ chạy trong thời gian ngắn và thiếu tương tác người dùng",
      "B. Tăng trải nghiệm người dùng",
      "C. Tiết kiệm pin",
      "D. Giảm dung lượng log"
    ],
    "answer": 0
  },
  {
    "id": 48,
    "domain": "Malware Analyst",
    "skill": "Cooperation",
    "difficulty": "medium",
    "type": "knowledge",
    "question": "Tại sao trong doanh nghiệp lớn, malware analyst thường không làm một mình?",
    "options": [
      "A. Cần phối hợp với SOC, DFIR, network, system admin để triển khai IOC, containment và remediation",
      "B. Vì công cụ quá khó dùng",
      "C. Vì không ai muốn làm",
      "D. Vì không cần báo cáo"
    ],
    "answer": 0
  },
  {
    "id": 49,
    "domain": "Malware Analyst",
    "skill": "Career Skills",
    "difficulty": "medium",
    "type": "knowledge",
    "question": "Kỹ năng nền tảng quan trọng với một Malware Analyst là gì?",
    "options": [
      "A. Nắm vững hệ điều hành (nhất là Windows), lập trình C/C++/ASM cơ bản, hiểu mạng và bảo mật",
      "B. Chỉ cần biết dùng Word/Excel",
      "C. Chỉ cần thuộc lòng tên các loại virus",
      "D. Chỉ cần biết cấu hình router"
    ],
    "answer": 0
  },
  {
    "id": 50,
    "domain": "Malware Analyst",
    "skill": "Mindset",
    "difficulty": "easy",
    "type": "knowledge",
    "question": "Tư duy phù hợp nhất với công việc phân tích mã độc là gì?",
    "options": [
      "A. Tò mò, kiên nhẫn, tỉ mỉ, thích mổ xẻ cách mọi thứ hoạt động",
      "B. Ghét chi tiết, chỉ thích trả lời nhanh",
      "C. Chỉ thích làm việc không cần suy nghĩ",
      "D. Chỉ quan tâm đến giao tiếp, không cần kỹ thuật"
    ],
    "answer": 0
  }
]
async function seed() {
  try {
    await connectDB();

    // await Roadmap.deleteMany {};
    await QuizQuestion.create(Web_pentest);

    console.log("Seed Success");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();
