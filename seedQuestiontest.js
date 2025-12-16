const mongoose = require("mongoose");
const QuizQuestion = require("./models/CQuestion");
const connectDB = require('./config/db');
const Web_pentest = [
  {
    "id": 1,
    "domain": "Network Security / Red Team",
    "skill": "TCP/IP",
    "difficulty": "easy",
    "type": "knowledge",
    "question": "Giao thức nào làm việc ở tầng Transport trong mô hình TCP/IP?",
    "options": [
      "A. TCP và UDP",
      "B. IP và ICMP",
      "C. HTTP và HTTPS",
      "D. ARP và DNS"
    ],
    "answer": 0
  },
  {
    "id": 2,
    "domain": "Network Security / Red Team",
    "skill": "TCP/IP",
    "difficulty": "easy",
    "type": "knowledge",
    "question": "Mục đích của cổng 443/TCP là gì?",
    "options": [
      "A. HTTPS",
      "B. SSH",
      "C. FTP",
      "D. SMTP"
    ],
    "answer": 0
  },
  {
    "id": 3,
    "domain": "Network Security / Red Team",
    "skill": "Scanning",
    "difficulty": "medium",
    "type": "scenario",
    "question": "Lệnh nmap nào dưới đây dùng để quét nhanh các cổng phổ biến trên một host?",
    "options": [
      "A. nmap -sS -F target",
      "B. nmap -sP target",
      "C. nmap -sU -p- target",
      "D. nmap -A -p- target"
    ],
    "answer": 0
  },
  {
    "id": 4,
    "domain": "Network Security / Red Team",
    "skill": "Wireshark",
    "difficulty": "easy",
    "type": "knowledge",
    "question": "Trong Wireshark, bộ lọc nào hiển thị chỉ các gói HTTP?",
    "options": [
      "A. http",
      "B. tcp.port==80",
      "C. dns",
      "D. arp"
    ],
    "answer": 0
  },
  {
    "id": 5,
    "domain": "Network Security / Red Team",
    "skill": "ARP Spoofing",
    "difficulty": "medium",
    "type": "knowledge",
    "question": "Mục tiêu của tấn công ARP spoofing là gì?",
    "options": [
      "A. Giả mạo bản ghi ARP để chuyển hướng lưu lượng qua máy tấn công",
      "B. Thay đổi mật khẩu tài khoản máy chủ",
      "C. Mã hóa toàn bộ lưu lượng bằng HTTPS",
      "D. Chặn tất cả truy cập internet"
    ],
    "answer": 0
  },
  {
    "id": 6,
    "domain": "Network Security / Red Team",
    "skill": "MITM",
    "difficulty": "medium",
    "type": "scenario",
    "question": "Sau khi thực hiện ARP spoofing thành công, bước tiếp theo thường dùng để nghe lén lưu lượng là gì?",
    "options": [
      "A. Bật IP forwarding và capture gói bằng Wireshark",
      "B. Xóa toàn bộ bảng ARP của router",
      "C. Thay đổi địa chỉ MAC của nạn nhân",
      "D. Tắt DHCP trên mạng"
    ],
    "answer": 0
  },
  {
    "id": 7,
    "domain": "Network Security / Red Team",
    "skill": "DNS",
    "difficulty": "easy",
    "type": "knowledge",
    "question": "Bản ghi DNS loại A dùng để làm gì?",
    "options": [
      "A. Ánh xạ tên miền sang địa chỉ IPv4",
      "B. Ánh xạ tên miền sang địa chỉ IPv6",
      "C. Lưu thông tin mail server",
      "D. Lưu bản ghi chuyển tiếp tên miền"
    ],
    "answer": 0
  },
  {
    "id": 8,
    "domain": "Network Security / Red Team",
    "skill": "Firewall",
    "difficulty": "medium",
    "type": "knowledge",
    "question": "Quy tắc nào dưới đây thể hiện chính sách \"deny all, allow some\" trên tường lửa?",
    "options": [
      "A. Mặc định chặn tất cả, chỉ cho phép một số rule cụ thể",
      "B. Mặc định cho phép tất cả, chỉ chặn một số rule cụ thể",
      "C. Không có rule nào trên tường lửa",
      "D. Chỉ log mà không chặn gói tin"
    ],
    "answer": 0
  },
  {
    "id": 9,
    "domain": "Network Security / Red Team",
    "skill": "IDS/IPS",
    "difficulty": "medium",
    "type": "knowledge",
    "question": "Điểm khác nhau chính giữa IDS và IPS là gì?",
    "options": [
      "A. IDS chỉ phát hiện, IPS có thể chặn lưu lượng",
      "B. IDS mã hóa lưu lượng, IPS giải mã",
      "C. IDS chạy trên router, IPS chạy trên switch",
      "D. IDS chỉ dùng cho mạng nội bộ, IPS chỉ dùng cho Internet"
    ],
    "answer": 0
  },
  {
    "id": 10,
    "domain": "Network Security / Red Team",
    "skill": "Brute Force",
    "difficulty": "easy",
    "type": "knowledge",
    "question": "Công cụ nào thường dùng để brute force mật khẩu dịch vụ SSH hoặc FTP?",
    "options": [
      "A. Hydra",
      "B. Wireshark",
      "C. Dirbuster",
      "D. Sqlmap"
    ],
    "answer": 0
  },
  {
    "id": 11,
    "domain": "Network Security / Red Team",
    "skill": "Enumeration",
    "difficulty": "medium",
    "type": "scenario",
    "question": "Dịch vụ nào trên cổng 445 thường bị lợi dụng để liệt kê chia sẻ mạng và người dùng trong mạng Windows?",
    "options": [
      "A. SMB",
      "B. HTTP",
      "C. SSH",
      "D. SMTP"
    ],
    "answer": 0
  },
  {
    "id": 12,
    "domain": "Network Security / Red Team",
    "skill": "VPN",
    "difficulty": "easy",
    "type": "knowledge",
    "question": "Mục đích chính của VPN trong bảo mật mạng là gì?",
    "options": [
      "A. Tạo kênh mã hóa giữa hai điểm để truyền dữ liệu an toàn",
      "B. Tăng tốc độ truy cập Internet",
      "C. Thay thế hoàn toàn tường lửa",
      "D. Lọc nội dung web độc hại"
    ],
    "answer": 0
  },
  {
    "id": 13,
    "domain": "Network Security / Red Team",
    "skill": "Pivoting",
    "difficulty": "hard",
    "type": "knowledge",
    "question": "Trong red team, pivoting là kỹ thuật gì?",
    "options": [
      "A. Dùng một máy đã xâm nhập làm bàn đạp để tấn công các máy khác trong mạng nội bộ",
      "B. Thay đổi địa chỉ IP công cộng liên tục",
      "C. Mã hóa payload bằng nhiều lớp",
      "D. Tăng quyền trên máy nạn nhân từ user lên admin"
    ],
    "answer": 0
  },
  {
    "id": 14,
    "domain": "Network Security / Red Team",
    "skill": "Port Security",
    "difficulty": "medium",
    "type": "knowledge",
    "question": "Biện pháp nào sau đây giúp hạn chế tấn công cắm thiết bị lạ vào switch?",
    "options": [
      "A. Bật port security và giới hạn số MAC trên mỗi cổng",
      "B. Tắt hoàn toàn DHCP",
      "C. Chỉ dùng địa chỉ IP tĩnh",
      "D. Đổi tên hostname của switch"
    ],
    "answer": 0
  },
  {
    "id": 15,
    "domain": "Network Security / Red Team",
    "skill": "ICMP",
    "difficulty": "easy",
    "type": "knowledge",
    "question": "Lệnh ping sử dụng giao thức nào để kiểm tra kết nối?",
    "options": [
      "A. ICMP",
      "B. TCP",
      "C. UDP",
      "D. ARP"
    ],
    "answer": 0
  },
  {
    "id": 16,
    "domain": "Network Security / Red Team",
    "skill": "DoS",
    "difficulty": "medium",
    "type": "knowledge",
    "question": "Đặc điểm của tấn công DoS là gì?",
    "options": [
      "A. Làm dịch vụ hợp pháp không thể phục vụ người dùng",
      "B. Đánh cắp mật khẩu người dùng",
      "C. Mã hóa dữ liệu đòi tiền chuộc",
      "D. Thay đổi giao diện website"
    ],
    "answer": 0
  },
  {
    "id": 17,
    "domain": "Network Security / Red Team",
    "skill": "Proxy / Tunneling",
    "difficulty": "medium",
    "type": "scenario",
    "question": "Bạn muốn ẩn nguồn gốc lưu lượng khi tấn công. Kỹ thuật nào phù hợp?",
    "options": [
      "A. Sử dụng chain proxy hoặc VPN",
      "B. Tăng kích thước MTU",
      "C. Tắt IPv6 trên máy tính",
      "D. Dùng cáp mạng loại khác"
    ],
    "answer": 0
  },
  {
    "id": 18,
    "domain": "Network Security / Red Team",
    "skill": "Password Cracking",
    "difficulty": "medium",
    "type": "knowledge",
    "question": "Công cụ nào thường dùng để bẻ khóa hash mật khẩu từ file shadow hoặc dump SAM?",
    "options": [
      "A. John the Ripper hoặc Hashcat",
      "B. Nmap",
      "C. Nikto",
      "D. Sqlmap"
    ],
    "answer": 0
  },
  {
    "id": 19,
    "domain": "Network Security / Red Team",
    "skill": "Network Segmentation",
    "difficulty": "medium",
    "type": "knowledge",
    "question": "Lý do chính để chia VLAN trong doanh nghiệp là gì?",
    "options": [
      "A. Cô lập các phân đoạn mạng để giảm phạm vi tấn công và broadcast",
      "B. Tăng độ mạnh tín hiệu Wi-Fi",
      "C. Giảm số lượng switch cần dùng",
      "D. Tự động mã hóa toàn bộ dữ liệu lưu thông"
    ],
    "answer": 0
  },
  {
    "id": 20,
    "domain": "Network Security / Red Team",
    "skill": "Logs",
    "difficulty": "medium",
    "type": "scenario",
    "question": "Khi tấn công brute force SSH, dấu hiệu nào dễ thấy trong log auth.log trên Linux?",
    "options": [
      "A. Nhiều dòng 'Failed password' liên tiếp từ cùng một IP",
      "B. Các bản ghi 'Connection closed by remote host' từ nhiều IP khác nhau",
      "C. Thông báo kernel panic",
      "D. Bản ghi cron chạy định kỳ"
    ],
    "answer": 0
  },
  {
    "id": 21,
    "domain": "Network Security / Red Team",
    "skill": "OSI Model",
    "difficulty": "easy",
    "type": "knowledge",
    "question": "Tầng nào trong mô hình OSI chịu trách nhiệm định tuyến gói tin qua các mạng khác nhau?",
    "options": [
      "A. Tầng Network",
      "B. Tầng Data Link",
      "C. Tầng Transport",
      "D. Tầng Session"
    ],
    "answer": 0
  },
  {
    "id": 22,
    "domain": "Network Security / Red Team",
    "skill": "Ports & Services",
    "difficulty": "easy",
    "type": "knowledge",
    "question": "Dịch vụ SSH mặc định sử dụng cổng nào?",
    "options": [
      "A. 22/TCP",
      "B. 21/TCP",
      "C. 25/TCP",
      "D. 110/TCP"
    ],
    "answer": 0
  },
  {
    "id": 23,
    "domain": "Network Security / Red Team",
    "skill": "Banner Grabbing",
    "difficulty": "medium",
    "type": "knowledge",
    "question": "Mục đích của kỹ thuật banner grabbing là gì?",
    "options": [
      "A. Thu thập thông tin phiên bản dịch vụ đang chạy trên cổng",
      "B. Tạo lưu lượng giả để gây nghẽn mạng",
      "C. Mã hóa lưu lượng giữa client và server",
      "D. Kiểm tra tốc độ đường truyền"
    ],
    "answer": 0
  },
  {
    "id": 24,
    "domain": "Network Security / Red Team",
    "skill": "Netcat",
    "difficulty": "medium",
    "type": "scenario",
    "question": "Công cụ netcat thường được red team dùng để làm gì?",
    "options": [
      "A. Tạo kết nối shell từ xa, chuyển tiếp cổng hoặc gửi/nhận dữ liệu thô qua TCP/UDP",
      "B. Mã hóa toàn bộ traffic HTTP",
      "C. Cấu hình tường lửa trên router",
      "D. Tạo chứng chỉ TLS"
    ],
    "answer": 0
  },
  {
    "id": 25,
    "domain": "Network Security / Red Team",
    "skill": "SMB Exploitation",
    "difficulty": "medium",
    "type": "scenario",
    "question": "Lỗ hổng EternalBlue (MS17-010) khai thác dịch vụ nào?",
    "options": [
      "A. SMBv1 trên cổng 445/TCP",
      "B. RDP trên cổng 3389/TCP",
      "C. HTTP trên cổng 80/TCP",
      "D. DNS trên cổng 53/UDP"
    ],
    "answer": 0
  },
  {
    "id": 26,
    "domain": "Network Security / Red Team",
    "skill": "RDP Security",
    "difficulty": "medium",
    "type": "knowledge",
    "question": "Biện pháp nào sau đây giúp giảm rủi ro khi expose RDP ra Internet?",
    "options": [
      "A. Giới hạn IP truy cập, dùng VPN và bật NLA",
      "B. Mở RDP cho mọi IP và đổi cổng",
      "C. Tắt hoàn toàn firewall trên server",
      "D. Chỉ thay đổi giao diện đăng nhập"
    ],
    "answer": 0
  },
  {
    "id": 27,
    "domain": "Network Security / Red Team",
    "skill": "Wi-Fi Security",
    "difficulty": "easy",
    "type": "knowledge",
    "question": "Chuẩn mã hóa Wi-Fi nào hiện được khuyến nghị sử dụng cho bảo mật cao hơn?",
    "options": [
      "A. WPA2 hoặc WPA3 (ưu tiên WPA3 nếu có)",
      "B. WEP",
      "C. Không dùng mã hóa (Open)",
      "D. 802.1X không kèm mã hóa"
    ],
    "answer": 0
  },
  {
    "id": 28,
    "domain": "Network Security / Red Team",
    "skill": "Wi-Fi Attacks",
    "difficulty": "medium",
    "type": "scenario",
    "question": "Trong tấn công Wi-Fi, tại sao attacker hay dùng deauth attack?",
    "options": [
      "A. Buộc client reconnect để bắt handshake phục vụ crack mật khẩu",
      "B. Tăng tốc độ Wi-Fi",
      "C. Đổi SSID của access point",
      "D. Cấp IP tĩnh cho client"
    ],
    "answer": 0
  },
  {
    "id": 29,
    "domain": "Network Security / Red Team",
    "skill": "Routing & NAT",
    "difficulty": "medium",
    "type": "knowledge",
    "question": "Chức năng chính của NAT trên firewall/router là gì?",
    "options": [
      "A. Chuyển đổi địa chỉ IP private sang public và ngược lại",
      "B. Mã hóa lưu lượng VPN",
      "C. Lọc gói tin theo port",
      "D. Phân giải tên miền thành địa chỉ IP"
    ],
    "answer": 0
  },
  {
    "id": 30,
    "domain": "Network Security / Red Team",
    "skill": "Pivoting",
    "difficulty": "hard",
    "type": "scenario",
    "question": "Sau khi chiếm được một máy trong mạng nội bộ, bạn dùng SSH dynamic port forwarding (ssh -D) để duyệt web nội bộ qua proxy. Đây là ví dụ của gì?",
    "options": [
      "A. Pivoting kết hợp tunneling qua SSH",
      "B. Brute force SSH",
      "C. ARP spoofing",
      "D. DNS poisoning"
    ],
    "answer": 0
  },
  {
    "id": 31,
    "domain": "Network Security / Red Team",
    "skill": "Scanning Evasion",
    "difficulty": "medium",
    "type": "knowledge",
    "question": "Kỹ thuật nào giúp giảm khả năng bị phát hiện khi quét port?",
    "options": [
      "A. Giảm tốc độ quét, dùng nhiều source IP hoặc dùng chế độ stealth (SYN scan)",
      "B. Chỉ quét các cổng đã đóng",
      "C. Quét đồng thời toàn bộ dải IP với tốc độ tối đa",
      "D. Chỉ quét bằng ICMP echo"
    ],
    "answer": 0
  },
  {
    "id": 32,
    "domain": "Network Security / Red Team",
    "skill": "Sniffing",
    "difficulty": "easy",
    "type": "knowledge",
    "question": "Điều kiện nào thường cần để sniff được traffic của người khác trong mạng LAN switch?",
    "options": [
      "A. Thực hiện ARP spoofing hoặc cấu hình port mirroring",
      "B. Cắm vào bất kỳ cổng nào trên switch là thấy hết",
      "C. Tắt STP trên switch",
      "D. Dùng cáp chéo thay vì cáp thẳng"
    ],
    "answer": 0
  },
  {
    "id": 33,
    "domain": "Network Security / Red Team",
    "skill": "IP Spoofing",
    "difficulty": "medium",
    "type": "knowledge",
    "question": "IP spoofing là gì?",
    "options": [
      "A. Giả mạo địa chỉ IP nguồn trong gói tin",
      "B. Giả mạo địa chỉ MAC trên card mạng",
      "C. Giả mạo tên miền DNS",
      "D. Giả mạo địa chỉ email người gửi"
    ],
    "answer": 0
  },
  {
    "id": 34,
    "domain": "Network Security / Red Team",
    "skill": "DNS Attacks",
    "difficulty": "medium",
    "type": "scenario",
    "question": "Tấn công DNS poisoning nhằm mục tiêu gì?",
    "options": [
      "A. Chuyển hướng truy vấn tên miền hợp lệ tới IP độc hại",
      "B. Mã hóa truy vấn DNS",
      "C. Xóa toàn bộ bản ghi DNS",
      "D. Ngăn cản mọi truy vấn DNS ra Internet"
    ],
    "answer": 0
  },
  {
    "id": 35,
    "domain": "Network Security / Red Team",
    "skill": "Exfiltration",
    "difficulty": "hard",
    "type": "knowledge",
    "question": "Kỹ thuật exfiltration dữ liệu nào khó bị firewall phát hiện hơn?",
    "options": [
      "A. Giấu dữ liệu trong lưu lượng HTTPS hoặc DNS hợp lệ",
      "B. Gửi file lớn qua FTP plain-text",
      "C. Gửi dữ liệu qua Telnet",
      "D. Đính kèm file vào email nội bộ không mã hóa"
    ],
    "answer": 0
  },
  {
    "id": 36,
    "domain": "Network Security / Red Team",
    "skill": "Lateral Movement",
    "difficulty": "hard",
    "type": "scenario",
    "question": "Sau khi lấy được hash NTLM, bạn dùng kỹ thuật pass-the-hash để đăng nhập vào máy khác trong domain. Đây là ví dụ của gì?",
    "options": [
      "A. Lateral movement trong mạng Windows",
      "B. Privilege escalation local",
      "C. ARP spoofing",
      "D. DNS tunneling"
    ],
    "answer": 0
  },
  {
    "id": 37,
    "domain": "Network Security / Red Team",
    "skill": "VPN Misconfig",
    "difficulty": "medium",
    "type": "scenario",
    "question": "Một công ty cấu hình VPN split tunneling cho phép client vừa truy cập mạng nội bộ vừa truy cập Internet trực tiếp. Rủi ro nào có thể xảy ra?",
    "options": [
      "A. Máy client bị compromise có thể trở thành cầu nối tấn công vào mạng nội bộ",
      "B. Không thể truy cập tài nguyên nội bộ",
      "C. Không thể truy cập Internet",
      "D. Tự động mã hóa toàn bộ ổ cứng client"
    ],
    "answer": 0
  },
  {
    "id": 38,
    "domain": "Network Security / Red Team",
    "skill": "Proxy Chain",
    "difficulty": "medium",
    "type": "knowledge",
    "question": "Mục đích của việc dùng nhiều proxy (proxy chain) trong red team là gì?",
    "options": [
      "A. Ẩn nguồn gốc thực sự của attacker và vượt qua hạn chế địa chỉ IP",
      "B. Tăng tốc độ internet",
      "C. Giảm độ trễ khi truy cập",
      "D. Đảm bảo tính toàn vẹn dữ liệu"
    ],
    "answer": 0
  },
  {
    "id": 39,
    "domain": "Network Security / Red Team",
    "skill": "Log Evasion",
    "difficulty": "hard",
    "type": "knowledge",
    "question": "Kỹ thuật nào sau đây thuộc dạng né tránh hoặc làm khó phân tích log?",
    "options": [
      "A. Sử dụng nhiều IP, user-agent khác nhau và chia nhỏ lưu lượng tấn công",
      "B. Chỉ tấn công trong giờ hành chính",
      "C. Chỉ dùng một dải IP cố định",
      "D. Tắt hoàn toàn logging trên thiết bị"
    ],
    "answer": 0
  },
  {
    "id": 40,
    "domain": "Network Security / Red Team",
    "skill": "Service Enumeration",
    "difficulty": "medium",
    "type": "scenario",
    "question": "Khi quét port thấy dịch vụ trên 389/TCP, bạn sẽ nghĩ tới giao thức nào và cơ hội gì cho enumeration?",
    "options": [
      "A. LDAP – có thể liệt kê user, group nếu cấu hình lỏng lẻo",
      "B. SMTP – có thể gửi email spam",
      "C. POP3 – có thể đọc mail",
      "D. SNMP – có thể lấy thông tin thiết bị"
    ],
    "answer": 0
  },
  {
    "id": 41,
    "domain": "Network Security / Red Team",
    "skill": "SNMP",
    "difficulty": "medium",
    "type": "knowledge",
    "question": "Rủi ro khi dùng community string mặc định (public/private) cho SNMP là gì?",
    "options": [
      "A. Attacker có thể đọc hoặc thay đổi cấu hình thiết bị mạng",
      "B. Tăng độ trễ mạng",
      "C. Giảm băng thông Internet",
      "D. Mất kết nối Wi-Fi"
    ],
    "answer": 0
  },
  {
    "id": 42,
    "domain": "Network Security / Red Team",
    "skill": "Segmentation Bypass",
    "difficulty": "hard",
    "type": "scenario",
    "question": "Mạng đã chia VLAN nhưng firewall giữa các VLAN cấu hình \"allow any any\". Điều này dẫn tới điều gì?",
    "options": [
      "A. Segmentation gần như vô tác dụng, attacker có thể di chuyển giữa VLAN dễ dàng",
      "B. Tốc độ mạng tăng đáng kể",
      "C. Không thể sniff traffic",
      "D. Không thể sử dụng DHCP"
    ],
    "answer": 0
  },
  {
    "id": 43,
    "domain": "Network Security / Red Team",
    "skill": "Nmap Scripting Engine",
    "difficulty": "medium",
    "type": "knowledge",
    "question": "Nmap Scripting Engine (NSE) dùng để làm gì?",
    "options": [
      "A. Chạy các script tự động để enumeration sâu và phát hiện lỗ hổng dịch vụ",
      "B. Mã hóa kết quả quét",
      "C. Tăng tốc độ quét port",
      "D. Tạo firewall rule mới"
    ],
    "answer": 0
  },
  {
    "id": 44,
    "domain": "Network Security / Red Team",
    "skill": "SSH Tunneling",
    "difficulty": "medium",
    "type": "scenario",
    "question": "Bạn dùng lệnh ssh -L 8080:internal-web:80 user@jump-host. Điều này cho phép làm gì?",
    "options": [
      "A. Truy cập web nội bộ internal-web:80 thông qua cổng local 8080 trên máy bạn",
      "B. Mã hóa toàn bộ lưu lượng Internet",
      "C. Thay đổi mật khẩu user trên jump-host",
      "D. Chặn truy cập web nội bộ"
    ],
    "answer": 0
  },
  {
    "id": 45,
    "domain": "Network Security / Red Team",
    "skill": "Blue Team Awareness",
    "difficulty": "easy",
    "type": "knowledge",
    "question": "Khi lập kế hoạch red team, tại sao cần hiểu khả năng của blue team?",
    "options": [
      "A. Để thiết kế kịch bản tấn công thực tế và đánh giá đúng năng lực phát hiện/phản ứng",
      "B. Để tránh phải viết báo cáo",
      "C. Để tắt bớt hệ thống giám sát",
      "D. Để xác định lương cho SOC analyst"
    ],
    "answer": 0
  },
  {
    "id": 46,
    "domain": "Network Security / Red Team",
    "skill": "Rules of Engagement",
    "difficulty": "easy",
    "type": "knowledge",
    "question": "Trong bài test xâm nhập mạng, \"Rules of Engagement\" dùng để làm gì?",
    "options": [
      "A. Xác định rõ scope, thời gian, phương thức tấn công được phép và giới hạn an toàn",
      "B. Mô tả chi tiết cấu hình firewall",
      "C. Liệt kê toàn bộ tài sản CNTT của công ty",
      "D. Định nghĩa cấu trúc gói tin TCP"
    ],
    "answer": 0
  },
  {
    "id": 47,
    "domain": "Network Security / Red Team",
    "skill": "Physical Network Security",
    "difficulty": "medium",
    "type": "knowledge",
    "question": "Tại sao bảo mật vật lý (phòng server, tủ rack, cổng mạng) cũng quan trọng với network security?",
    "options": [
      "A. Vì attacker có thể cắm thiết bị nghe lén, switch rogue hoặc reset thiết bị nếu tiếp cận được",
      "B. Vì điều hòa có thể làm hỏng switch",
      "C. Vì ánh sáng ảnh hưởng đến tốc độ mạng",
      "D. Vì cần chỗ để dán sơ đồ mạng"
    ],
    "answer": 0
  },
  {
    "id": 48,
    "domain": "Network Security / Red Team",
    "skill": "Threat Modeling",
    "difficulty": "medium",
    "type": "knowledge",
    "question": "Trong network threat modeling, bước đầu tiên thường là gì?",
    "options": [
      "A. Xác định tài sản quan trọng và sơ đồ luồng dữ liệu",
      "B. Viết rule IDS",
      "C. Cập nhật firmware switch",
      "D. Mua thêm băng thông Internet"
    ],
    "answer": 0
  },
  {
    "id": 49,
    "domain": "Network Security / Red Team",
    "skill": "Command & Control",
    "difficulty": "hard",
    "type": "scenario",
    "question": "Red team thiết lập C2 server trên cổng 443/TCP với lưu lượng giống HTTPS. Mục tiêu chính là gì?",
    "options": [
      "A. Ngụy trang traffic C2 như web bình thường để khó bị phát hiện",
      "B. Tăng tốc độ tải trang web công ty",
      "C. Tạo web server public",
      "D. Kiểm tra băng thông Internet"
    ],
    "answer": 0
  },
  {
    "id": 50,
    "domain": "Network Security / Red Team",
    "skill": "General Knowledge",
    "difficulty": "easy",
    "type": "knowledge",
    "question": "Mục tiêu chính của red team trong bối cảnh kiểm thử an ninh mạng là gì?",
    "options": [
      "A. Mô phỏng đối thủ thực tế để đánh giá khả năng phát hiện và phản ứng của tổ chức",
      "B. Quản lý hệ thống log hằng ngày",
      "C. Vận hành backup định kỳ",
      "D. Phát triển ứng dụng web mới"
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
