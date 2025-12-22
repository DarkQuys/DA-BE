const mongoose = require("mongoose");
const Lab = require("./models/Labs");
const connectDB = require('./config/db');
const Web_pentest = [
  {
    "id": 1,
    "title": "Acl",
    "platform": "Labtainer",
    "category": "Network Security",
    "skill_tags": [
      "Firewall",
      "ACL",
      "Access Control"
    ],
    "difficulty": 2,
    "subject": "",
    "url": "Labtainer/acl.pdf",
    "description": "Lab Labtainer về network security: Acl.",
    "description_detail": "Lab này giúp bạn làm quen với danh sách kiểm soát truy cập (Access Control List) trên router hoặc firewall. Bạn sẽ cấu hình các rule ACL cho phép hoặc chặn các loại traffic khác nhau dựa trên địa chỉ IP, port và giao thức, sau đó kiểm tra kết quả bằng công cụ dòng lệnh và quan sát tác động tới việc truy cập dịch vụ."
  },
  {
    "id": 2,
    "title": "Arp Spoof",
    "platform": "Labtainer",
    "category": "Network Security",
    "skill_tags": [
      "Networking",
      "Routing",
      "Firewall",
      "Traffic Analysis"
    ],
    "difficulty": 3,
    "subject": "",
    "url": "Labtainer/arp-spoof.pdf",
    "description": "Lab Labtainer về network security: Arp Spoof.",
    "description_detail": "Trong lab Arp Spoof, bạn tìm hiểu cách kẻ tấn công sử dụng kỹ thuật ARP spoofing để đứng giữa đường truyền (MITM) trong mạng LAN. Bạn sẽ quan sát bảng ARP, thực hiện hoặc phân tích một cuộc tấn công ARP giả mạo và xem traffic bị chuyển hướng qua máy tấn công, từ đó hiểu rõ rủi ro và cách phòng chống."
  },
  {
    "id": 3,
    "title": "Backups",
    "platform": "Labtainer",
    "category": "System Security",
    "skill_tags": [
      "File System",
      "Backups",
      "Integrity"
    ],
    "difficulty": 2,
    "subject": "",
    "url": "Labtainer/backups.pdf",
    "description": "Lab Labtainer về system security: Backups.",
    "description_detail": "Lab Backups giới thiệu cho bạn khái niệm sao lưu dữ liệu an toàn trên hệ thống Linux. Bạn sẽ cấu hình các tác vụ backup, thử khôi phục dữ liệu sau sự cố và so sánh các chiến lược backup khác nhau để thấy tầm quan trọng của việc lập kế hoạch backup trong an toàn hệ thống."
  },
  {
    "id": 4,
    "title": "Bird Bgp",
    "platform": "Labtainer",
    "category": "Network Security",
    "skill_tags": [
      "Networking",
      "Routing",
      "Firewall",
      "Traffic Analysis"
    ],
    "difficulty": 3,
    "subject": "",
    "url": "Labtainer/bird-bgp.pdf",
    "description": "Lab Labtainer về network security: Bird Bgp.",
    "description_detail": "Lab này sử dụng BIRD routing daemon để mô phỏng giao thức định tuyến BGP. Bạn sẽ cấu hình phiên BGP giữa các router, quan sát bảng định tuyến và thử nghiệm các kịch bản lọc route, từ đó hiểu rủi ro bảo mật nếu cấu hình BGP không chặt chẽ trong môi trường thực."
  },
  {
    "id": 5,
    "title": "Bird Ospf",
    "platform": "Labtainer",
    "category": "Network Security",
    "skill_tags": [
      "Networking",
      "Routing",
      "Firewall",
      "Traffic Analysis"
    ],
    "difficulty": 3,
    "subject": "",
    "url": "Labtainer/bird-ospf.pdf",
    "description": "Lab Labtainer về network security: Bird Ospf.",
    "description_detail": "Lab Bird Ospf cho bạn cấu hình giao thức định tuyến OSPF bằng BIRD. Bạn sẽ thiết lập các area, quan sát quá trình trao đổi LSA và cập nhật bảng định tuyến, đồng thời nhận diện các vấn đề bảo mật nếu OSPF bị lộ thông tin topology hoặc bị giả mạo router."
  },
  {
    "id": 6,
    "title": "Buf64",
    "platform": "Labtainer",
    "category": "System Security",
    "skill_tags": [
      "Buffer Overflow",
      "Memory Safety",
      "Exploit Development"
    ],
    "difficulty": 4,
    "subject": "",
    "url": "Labtainer/buf64.pdf",
    "description": "Lab Labtainer về system security: Buf64.",
    "description_detail": "Buf64 là lab buffer overflow trên kiến trúc 64-bit. Bạn sẽ phân tích một chương trình dễ bị tràn bộ đệm, sử dụng gdb để quan sát stack và thanh ghi, sau đó xây dựng payload khai thác phù hợp với không gian địa chỉ 64-bit và cơ chế bảo vệ hiện đại."
  },
  {
    "id": 7,
    "title": "Bufoverflow",
    "platform": "Labtainer",
    "category": "System Security",
    "skill_tags": [
      "Buffer Overflow",
      "Memory Safety",
      "Exploit Development"
    ],
    "difficulty": 4,
    "subject": "",
    "url": "Labtainer/bufoverflow.pdf",
    "description": "Lab Labtainer về system security: Bufoverflow.",
    "description_detail": "Lab Bufoverflow là bài nhập môn về lỗ hổng tràn bộ đệm trên chương trình C. Bạn sẽ tìm input gây tràn, quan sát việc ghi đè địa chỉ trả về và từ đó xây dựng exploit đơn giản, hiểu vì sao việc không kiểm tra độ dài dữ liệu lại dẫn đến chiếm quyền điều khiển chương trình."
  },
  {
    "id": 8,
    "title": "Capabilities",
    "platform": "Labtainer",
    "category": "System Security",
    "skill_tags": [
      "Privileges",
      "Linux Security",
      "OS Hardening"
    ],
    "difficulty": 3,
    "subject": "",
    "url": "Labtainer/capabilities.pdf",
    "description": "Lab Labtainer về system security: Capabilities.",
    "description_detail": "Lab Capabilities giới thiệu mô hình Linux capabilities – chia nhỏ quyền root thành các quyền hạt mịn. Bạn sẽ kiểm tra capability của các binary, thay đổi quyền và xem tác động tới việc thực thi, từ đó hiểu cách giảm bề mặt tấn công bằng cách hạn chế đặc quyền thay vì dùng full root."
  },
  {
    "id": 9,
    "title": "Centos Log",
    "platform": "Labtainer",
    "category": "Logging & Monitoring",
    "skill_tags": [
      "Syslog",
      "Logging",
      "Blue Team"
    ],
    "difficulty": 2,
    "subject": "",
    "url": "Labtainer/centos-log.pdf",
    "description": "Lab Labtainer về logging & monitoring: Centos Log.",
    "description_detail": "Trong lab Centos Log, bạn làm quen với hệ thống log trên CentOS. Bạn sẽ xem các file log quan trọng trong /var/log, cấu hình dịch vụ ghi log và thực hành tra cứu sự kiện bảo mật, từ đó thấy vai trò của logging trong điều tra và giám sát hệ thống."
  },
  {
    "id": 10,
    "title": "Cgc",
    "platform": "Labtainer",
    "category": "Advanced Exploitation",
    "skill_tags": [
      "Binary Exploitation",
      "Reverse Engineering"
    ],
    "difficulty": 4,
    "subject": "",
    "url": "Labtainer/cgc.pdf",
    "description": "Lab Labtainer về advanced exploitation: Cgc.",
    "description_detail": "Lab Cgc dựa trên các bài tập từ Cyber Grand Challenge, tập trung vào khai thác nhị phân nâng cao. Bạn sẽ phân tích một chương trình đặc biệt, tìm lỗ hổng logic hoặc bộ nhớ và phát triển khai thác, qua đó luyện cả kỹ năng reverse engineering lẫn exploit development."
  },
  {
    "id": 11,
    "title": "Db Access",
    "platform": "Labtainer",
    "category": "System & Network Security",
    "skill_tags": [
      "System Security",
      "Network Security"
    ],
    "difficulty": 3,
    "subject": "",
    "url": "Labtainer/db-access.pdf",
    "description": "Lab Labtainer về system & network security: Db Access.",
    "description_detail": "Db Access mô phỏng việc truy cập cơ sở dữ liệu qua mạng. Bạn sẽ cấu hình dịch vụ database, quyền user và kiểm tra các rủi ro nếu mở port, cấu hình tài khoản hoặc phân quyền sai, từ đó hiểu cách bảo vệ dịch vụ DB trong môi trường thực."
  },
  {
    "id": 12,
    "title": "Denyhosts",
    "platform": "Labtainer",
    "category": "System & Network Security",
    "skill_tags": [
      "System Security",
      "Network Security"
    ],
    "difficulty": 3,
    "subject": "",
    "url": "Labtainer/denyhosts.pdf",
    "description": "Lab Labtainer về system & network security: Denyhosts.",
    "description_detail": "Lab Denyhosts giới thiệu công cụ DenyHosts dùng để chống brute-force SSH. Bạn sẽ cấu hình DenyHosts, thử đăng nhập sai nhiều lần và quan sát địa chỉ IP bị tự động block, qua đó thấy cách log và automation giúp giảm tải cho quản trị viên trong việc bảo vệ dịch vụ SSH."
  },
  {
    "id": 13,
    "title": "Dmz Lab",
    "platform": "Labtainer",
    "category": "Network Security",
    "skill_tags": [
      "Networking",
      "Routing",
      "Firewall",
      "Traffic Analysis"
    ],
    "difficulty": 3,
    "subject": "",
    "url": "Labtainer/dmz-lab.pdf",
    "description": "Lab Labtainer về network security: Dmz Lab.",
    "description_detail": "Dmz Lab cho bạn xây dựng một mô hình mạng có vùng DMZ chứa server public. Bạn sẽ cấu hình định tuyến và firewall giữa mạng nội bộ, DMZ và internet, sau đó kiểm thử các rule để đảm bảo dịch vụ ngoài DMZ truy cập được nhưng mạng trong vẫn được bảo vệ."
  },
  {
    "id": 14,
    "title": "Dns",
    "platform": "Labtainer",
    "category": "Network Security",
    "skill_tags": [
      "Networking",
      "Routing",
      "Firewall",
      "Traffic Analysis"
    ],
    "difficulty": 3,
    "subject": "",
    "url": "Labtainer/dns.pdf",
    "description": "Lab Labtainer về network security: Dns.",
    "description_detail": "Lab DNS tập trung vào việc cấu hình và phân tích một máy chủ DNS. Bạn sẽ tạo bản ghi, kiểm tra truy vấn, quan sát log DNS và thảo luận các rủi ro bảo mật như DNS spoofing, zone transfer hoặc lạm dụng DNS làm kênh C2."
  },
  {
    "id": 15,
    "title": "File Deletion",
    "platform": "Labtainer",
    "category": "System Security",
    "skill_tags": [
      "File System",
      "Backups",
      "Integrity"
    ],
    "difficulty": 2,
    "subject": "",
    "url": "Labtainer/file-deletion.pdf",
    "description": "Lab Labtainer về system security: File Deletion.",
    "description_detail": "Lab File Deletion cho bạn thấy cơ chế xóa file trên hệ thống Linux. Bạn sẽ xoá file, thử khôi phục hoặc kiểm tra dấu vết còn lại, từ đó hiểu tại sao backup và công cụ xóa an toàn lại quan trọng khi xử lý dữ liệu nhạy cảm."
  },
  {
    "id": 16,
    "title": "File Integrity",
    "platform": "Labtainer",
    "category": "System Security",
    "skill_tags": [
      "File System",
      "Backups",
      "Integrity"
    ],
    "difficulty": 2,
    "subject": "",
    "url": "Labtainer/file-integrity.pdf",
    "description": "Lab Labtainer về system security: File Integrity.",
    "description_detail": "Lab này giúp bạn theo dõi tính toàn vẹn của file bằng cách sử dụng hash hoặc công cụ kiểm tra tích hợp. Bạn sẽ tạo baseline cho file hệ thống, sau đó chỉnh sửa hoặc thay thế file để thấy cách hệ thống phát hiện và cảnh báo các thay đổi trái phép."
  },
  {
    "id": 17,
    "title": "Format64",
    "platform": "Labtainer",
    "category": "System Security",
    "skill_tags": [
      "Buffer Overflow",
      "Memory Safety",
      "Exploit Development"
    ],
    "difficulty": 4,
    "subject": "",
    "url": "Labtainer/format64.pdf",
    "description": "Lab Labtainer về system security: Format64.",
    "description_detail": "Format64 là lab về lỗ hổng format string trên hệ thống 64-bit. Bạn sẽ khai thác một chương trình sử dụng printf không an toàn, lợi dụng các token định dạng để đọc/ghi vùng nhớ tùy ý, từ đó hiểu mức độ nghiêm trọng của lỗi format string trong thực tế."
  },
  {
    "id": 18,
    "title": "Formatstring",
    "platform": "Labtainer",
    "category": "System Security",
    "skill_tags": [
      "Buffer Overflow",
      "Memory Safety",
      "Exploit Development"
    ],
    "difficulty": 4,
    "subject": "",
    "url": "Labtainer/formatstring.pdf",
    "description": "Lab Labtainer về system security: Formatstring.",
    "description_detail": "Lab Formatstring giới thiệu khái niệm lỗi format string ở mức đơn giản hơn. Bạn sẽ quan sát cách truyền input trực tiếp vào printf, thử dùng các ký tự định dạng như %x, %s để đọc dữ liệu bí mật trên stack và từ đó xây dựng các bước tấn công nâng cao hơn."
  },
  {
    "id": 19,
    "title": "Gdb Cpp",
    "platform": "Labtainer",
    "category": "Debugging & Analysis",
    "skill_tags": [
      "GDB",
      "Tracing",
      "Binary Analysis"
    ],
    "difficulty": 3,
    "subject": "",
    "url": "Labtainer/gdb-cpp.pdf",
    "description": "Lab Labtainer về debugging & analysis: Gdb Cpp.",
    "description_detail": "Gdb Cpp là lab hướng dẫn bạn debug chương trình C++ bằng gdb. Bạn sẽ đặt breakpoint, bước qua từng lệnh, xem giá trị biến và stack trace, qua đó hình thành thói quen dùng debugger để phân tích lỗi và phục vụ cho phân tích bảo mật."
  },
  {
    "id": 20,
    "title": "Gdblesson",
    "platform": "Labtainer",
    "category": "Debugging & Analysis",
    "skill_tags": [
      "GDB",
      "Tracing",
      "Binary Analysis"
    ],
    "difficulty": 3,
    "subject": "",
    "url": "Labtainer/gdblesson.pdf",
    "description": "Lab Labtainer về debugging & analysis: Gdblesson.",
    "description_detail": "Lab Gdblesson là một bài học tổng quát về gdb. Bạn sẽ thực hành các lệnh cơ bản như run, break, next, step, print, backtrace và làm quen với việc đọc thông tin từ gdb để chuẩn bị cho các lab khai thác nhị phân sau này."
  },
  {
    "id": 21,
    "title": "Ghidra",
    "platform": "Labtainer",
    "category": "System & Network Security",
    "skill_tags": [
      "System Security",
      "Network Security"
    ],
    "difficulty": 3,
    "subject": "",
    "url": "Labtainer/ghidra.pdf",
    "description": "Lab Labtainer về system & network security: Ghidra.",
    "description_detail": "Lab Ghidra giới thiệu công cụ reverse engineering Ghidra. Bạn sẽ mở một binary, quan sát disassembly và decompile sang pseudo-code, đặt comment, rename symbol để hiểu logic chương trình, qua đó thấy Ghidra hỗ trợ cực tốt cho phân tích mã độc và lỗ hổng."
  },
  {
    "id": 22,
    "title": "Grassmarlin (1)",
    "platform": "Labtainer",
    "category": "System & Network Security",
    "skill_tags": [
      "System Security",
      "Network Security"
    ],
    "difficulty": 3,
    "subject": "",
    "url": "Labtainer/grassmarlin (1).pdf",
    "description": "Lab Labtainer về system & network security: Grassmarlin (1).",
    "description_detail": "Grassmarlin (1) là lab về công cụ Grassmarlin dùng để lập bản đồ và phân tích mạng ICS/SCADA. Bạn sẽ chạy quét, xem topology, giao thức công nghiệp được phát hiện và thảo luận về rủi ro nếu attacker nắm được sơ đồ thiết bị điều khiển công nghiệp."
  },
  {
    "id": 23,
    "title": "Grassmarlin",
    "platform": "Labtainer",
    "category": "System & Network Security",
    "skill_tags": [
      "System Security",
      "Network Security"
    ],
    "difficulty": 3,
    "subject": "",
    "url": "Labtainer/grassmarlin.pdf",
    "description": "Lab Labtainer về system & network security: Grassmarlin.",
    "description_detail": "Lab Grassmarlin tiếp tục khai thác khả năng giám sát mạng ICS bằng Grassmarlin. Bạn sẽ phân tích chi tiết hơn từng node, traffic ICS và học cách sử dụng tool này trong kịch bản giám sát an ninh cho hệ thống công nghiệp."
  },
  {
    "id": 24,
    "title": "Ida",
    "platform": "Labtainer",
    "category": "System & Network Security",
    "skill_tags": [
      "System Security",
      "Network Security"
    ],
    "difficulty": 3,
    "subject": "",
    "url": "Labtainer/ida.pdf",
    "description": "Lab Labtainer về system & network security: Ida.",
    "description_detail": "Lab Ida giới thiệu IDA Pro/IDA Free, một công cụ reverse engineering mạnh. Bạn sẽ mở chương trình, xem graph control flow, rename function và phân tích một số đoạn code đơn giản, làm nền tảng cho việc dịch ngược malware và khai thác nhị phân."
  },
  {
    "id": 25,
    "title": "Iptables Ics",
    "platform": "Labtainer",
    "category": "System & Network Security",
    "skill_tags": [
      "System Security",
      "Network Security"
    ],
    "difficulty": 3,
    "subject": "",
    "url": "Labtainer/iptables-ics.pdf",
    "description": "Lab Labtainer về system & network security: Iptables Ics.",
    "description_detail": "Iptables Ics áp dụng tường lửa iptables vào môi trường ICS. Bạn sẽ viết rule đảm bảo chỉ cho phép traffic công nghiệp cần thiết đi qua, chặn truy cập trái phép từ bên ngoài, từ đó thấy cách bảo vệ lớp mạng cho hệ thống điều khiển công nghiệp."
  },
  {
    "id": 26,
    "title": "Iptables",
    "platform": "Labtainer",
    "category": "System & Network Security",
    "skill_tags": [
      "System Security",
      "Network Security"
    ],
    "difficulty": 3,
    "subject": "",
    "url": "Labtainer/iptables.pdf",
    "description": "Lab Labtainer về system & network security: Iptables.",
    "description_detail": "Lab Iptables dạy bạn cấu hình tường lửa trên Linux bằng iptables. Bạn sẽ tạo chain, rule theo nguồn, đích, port, giao thức và kiểm tra kết quả bằng ping, ssh, web..., hiểu rõ cơ chế lọc gói và vai trò của firewall host-based."
  },
  {
    "id": 27,
    "title": "Ldap",
    "platform": "Labtainer",
    "category": "System & Network Security",
    "skill_tags": [
      "System Security",
      "Network Security"
    ],
    "difficulty": 3,
    "subject": "",
    "url": "Labtainer/ldap.pdf",
    "description": "Lab Labtainer về system & network security: Ldap.",
    "description_detail": "Lab LDAP mô phỏng một dịch vụ thư mục LDAP. Bạn sẽ cấu hình server, thêm user, kiểm tra truy vấn và phân quyền, từ đó thấy LDAP được dùng để quản lý danh tính và cũng là mục tiêu cần bảo vệ trong hệ thống doanh nghiệp."
  },
  {
    "id": 28,
    "title": "Local Dns",
    "platform": "Labtainer",
    "category": "Network Security",
    "skill_tags": [
      "Networking",
      "Routing",
      "Firewall",
      "Traffic Analysis"
    ],
    "difficulty": 3,
    "subject": "",
    "url": "Labtainer/local-dns.pdf",
    "description": "Lab Labtainer về network security: Local Dns.",
    "description_detail": "Local Dns là lab về triển khai DNS cục bộ cho mạng nội bộ. Bạn sẽ cấu hình caching/forwarding DNS, bản ghi nội bộ và quan sát ưu nhược điểm, đồng thời thảo luận rủi ro khi cấu hình sai hoặc bị tấn công DNS."
  },
  {
    "id": 29,
    "title": "Macs Hash",
    "platform": "Labtainer",
    "category": "System & Network Security",
    "skill_tags": [
      "System Security",
      "Network Security"
    ],
    "difficulty": 3,
    "subject": "",
    "url": "Labtainer/macs-hash.pdf",
    "description": "Lab Labtainer về system & network security: Macs Hash.",
    "description_detail": "Lab Macs Hash giúp bạn thực hành với hàm băm một chiều và mã xác thực thông điệp (MAC). Bạn sẽ tính hash cho dữ liệu, so sánh sự khác biệt khi dùng MAC, từ đó hiểu tại sao chỉ hash thôi chưa đủ để đảm bảo tính xác thực và toàn vẹn."
  },
  {
    "id": 30,
    "title": "Metasploit",
    "platform": "Labtainer",
    "category": "System & Network Security",
    "skill_tags": [
      "System Security",
      "Network Security"
    ],
    "difficulty": 3,
    "subject": "",
    "url": "Labtainer/metasploit.pdf",
    "description": "Lab Labtainer về system & network security: Metasploit.",
    "description_detail": "Lab Metasploit giới thiệu framework Metasploit dùng để khai thác lỗ hổng. Bạn sẽ chọn module exploit, thiết lập payload, tấn công một máy mục tiêu trong lab và sau đó thảo luận về cách phòng thủ trước các công cụ tự động này."
  },
  {
    "id": 31,
    "title": "Netflow",
    "platform": "Labtainer",
    "category": "System & Network Security",
    "skill_tags": [
      "System Security",
      "Network Security"
    ],
    "difficulty": 3,
    "subject": "",
    "url": "Labtainer/netflow.pdf",
    "description": "Lab Labtainer về system & network security: Netflow.",
    "description_detail": "Netflow lab giúp bạn làm quen với NetFlow hoặc các bản ghi flow tương tự. Bạn sẽ quan sát các dòng lưu lượng (flow) thay vì từng packet, dùng chúng để phát hiện bất thường như scan, brute-force hoặc data exfiltration với chi phí lưu trữ thấp hơn PCAP."
  },
  {
    "id": 32,
    "title": "Network Basics",
    "platform": "Labtainer",
    "category": "System & Network Security",
    "skill_tags": [
      "System Security",
      "Network Security"
    ],
    "difficulty": 3,
    "subject": "",
    "url": "Labtainer/network-basics.pdf",
    "description": "Lab Labtainer về system & network security: Network Basics.",
    "description_detail": "Network Basics là lab nền tảng về mạng máy tính: IP, subnet, routing cơ bản và giao thức thông dụng. Bạn sẽ cấu hình địa chỉ IP, kiểm tra kết nối và sử dụng các lệnh như ping, traceroute, netstat để hiểu cách mạng hoạt động trước khi đi sâu vào bảo mật."
  },
  {
    "id": 33,
    "title": "Nix Commands",
    "platform": "Labtainer",
    "category": "System & Network Security",
    "skill_tags": [
      "System Security",
      "Network Security"
    ],
    "difficulty": 3,
    "subject": "",
    "url": "Labtainer/nix-commands.pdf",
    "description": "Lab Labtainer về system & network security: Nix Commands.",
    "description_detail": "Lab Nix Commands rèn cho bạn các lệnh cơ bản trong môi trường Unix/Linux như ls, ps, grep, find, chmod, chown, tail, less... Đây là bộ kỹ năng tối thiểu cần có để quản trị và điều tra sự cố trên hệ thống Linux."
  },
  {
    "id": 34,
    "title": "Nmap Ssh",
    "platform": "Labtainer",
    "category": "System Security",
    "skill_tags": [
      "SSH",
      "Encryption",
      "Remote Access"
    ],
    "difficulty": 2,
    "subject": "",
    "url": "Labtainer/nmap-ssh.pdf",
    "description": "Lab Labtainer về system security: Nmap Ssh.",
    "description_detail": "Nmap Ssh là lab kết hợp nmap và dịch vụ SSH. Bạn sẽ dùng nmap để quét port, phát hiện dịch vụ SSH và phân tích banner hoặc phiên bản, từ đó thảo luận về rủi ro khi để lộ thông tin phiên bản hoặc cấu hình yếu."
  },
  {
    "id": 35,
    "title": "Nmapdiscovery",
    "platform": "Labtainer",
    "category": "System & Network Security",
    "skill_tags": [
      "System Security",
      "Network Security"
    ],
    "difficulty": 3,
    "subject": "",
    "url": "Labtainer/nmapdiscovery.pdf",
    "description": "Lab Labtainer về system & network security: Nmapdiscovery.",
    "description_detail": "Lab Nmapdiscovery tập trung vào chức năng khám phá mạng của nmap. Bạn sẽ thử nhiều chế độ scan khác nhau để tìm host, port mở, dịch vụ và hệ điều hành, qua đó hiểu vì sao nmap là công cụ recon mặc định của cả pentester và attacker."
  },
  {
    "id": 36,
    "title": "Onewayhash",
    "platform": "Labtainer",
    "category": "System & Network Security",
    "skill_tags": [
      "System Security",
      "Network Security"
    ],
    "difficulty": 3,
    "subject": "",
    "url": "Labtainer/onewayhash.pdf",
    "description": "Lab Labtainer về system & network security: Onewayhash.",
    "description_detail": "Lab Onewayhash giải thích khái niệm hàm băm một chiều trong bảo mật. Bạn sẽ tính hash cho các dữ liệu khác nhau, quan sát tính chất avalanche và tìm hiểu tại sao hash được dùng để lưu mật khẩu hoặc kiểm tra toàn vẹn file."
  },
  {
    "id": 37,
    "title": "Ossec",
    "platform": "Labtainer",
    "category": "System & Network Security",
    "skill_tags": [
      "System Security",
      "Network Security"
    ],
    "difficulty": 3,
    "subject": "",
    "url": "Labtainer/ossec.pdf",
    "description": "Lab Labtainer về system & network security: Ossec.",
    "description_detail": "Lab Ossec cho bạn làm việc với hệ thống phát hiện xâm nhập host-based OSSEC/Wazuh. Bạn sẽ cài đặt agent, tạo rule đơn giản và xem cảnh báo khi có hành vi đáng ngờ, từ đó hiểu cách HIDS hỗ trợ Blue Team phát hiện sự cố trên endpoint."
  },
  {
    "id": 38,
    "title": "Overrun",
    "platform": "Labtainer",
    "category": "System & Network Security",
    "skill_tags": [
      "System Security",
      "Network Security"
    ],
    "difficulty": 3,
    "subject": "",
    "url": "Labtainer/overrun.pdf",
    "description": "Lab Labtainer về system & network security: Overrun.",
    "description_detail": "Overrun là lab về lỗi tràn dữ liệu (overrun) nói chung. Bạn sẽ quan sát cách một chương trình xử lý input thiếu kiểm soát, dẫn đến ghi đè bộ nhớ ngoài vùng dự kiến, và thảo luận khả năng lợi dụng lỗi này để tấn công."
  },
  {
    "id": 39,
    "title": "Packet Introspection",
    "platform": "Labtainer",
    "category": "System & Network Security",
    "skill_tags": [
      "System Security",
      "Network Security"
    ],
    "difficulty": 3,
    "subject": "",
    "url": "Labtainer/packet-introspection.pdf",
    "description": "Lab Labtainer về system & network security: Packet Introspection.",
    "description_detail": "Lab Packet Introspection cho bạn 'mổ xẻ' từng gói tin mạng. Bạn sẽ dùng công cụ như Wireshark hoặc tcpdump để xem header các lớp, phân tích payload và hiểu rõ cấu trúc một gói TCP/IP thực sự trông như thế nào."
  },
  {
    "id": 40,
    "title": "Parallel",
    "platform": "Labtainer",
    "category": "System & Network Security",
    "skill_tags": [
      "System Security",
      "Network Security"
    ],
    "difficulty": 3,
    "subject": "",
    "url": "Labtainer/parallel.pdf",
    "description": "Lab Labtainer về system & network security: Parallel.",
    "description_detail": "Parallel là lab về xử lý song song hoặc chạy nhiều tiến trình/nhiệm vụ đồng thời. Bạn sẽ quan sát cách tài nguyên hệ thống được chia sẻ, các vấn đề cạnh tranh (race condition) có thể xuất hiện và liên hệ với rủi ro bảo mật nếu lập trình song song không cẩn thận."
  },
  {
    "id": 41,
    "title": "Pass Crack",
    "platform": "Labtainer",
    "category": "System & Network Security",
    "skill_tags": [
      "System Security",
      "Network Security"
    ],
    "difficulty": 3,
    "subject": "",
    "url": "Labtainer/pass-crack.pdf",
    "description": "Lab Labtainer về system & network security: Pass Crack.",
    "description_detail": "Lab Pass Crack cho bạn trải nghiệm công cụ bẻ khóa mật khẩu như John the Ripper hoặc hashcat trên các hash thu được. Bạn sẽ thấy sự khác biệt giữa mật khẩu yếu, không có salt và mật khẩu mạnh, từ đó rút kinh nghiệm về chính sách mật khẩu an toàn."
  },
  {
    "id": 42,
    "title": "Pcap Lib",
    "platform": "Labtainer",
    "category": "System & Network Security",
    "skill_tags": [
      "System Security",
      "Network Security"
    ],
    "difficulty": 3,
    "subject": "",
    "url": "Labtainer/pcap-lib.pdf",
    "description": "Lab Labtainer về system & network security: Pcap Lib.",
    "description_detail": "Pcap Lib là lab lập trình sử dụng thư viện pcap để bắt và xử lý gói tin. Bạn sẽ viết chương trình nhỏ đọc packet, trích xuất thông tin và có thể áp dụng để xây dựng tool phân tích/net-sniffer cơ bản."
  },
  {
    "id": 43,
    "title": "Pcapanalysis",
    "platform": "Labtainer",
    "category": "System & Network Security",
    "skill_tags": [
      "System Security",
      "Network Security"
    ],
    "difficulty": 3,
    "subject": "",
    "url": "Labtainer/pcapanalysis.pdf",
    "description": "Lab Labtainer về system & network security: Pcapanalysis.",
    "description_detail": "Lab Pcapanalysis cung cấp cho bạn một file PCAP chứa nhiều loại traffic. Nhiệm vụ là lọc và phân tích để tìm các hoạt động bất thường như scan, đăng nhập trái phép, truyền file lạ..., qua đó rèn kỹ năng network forensics."
  },
  {
    "id": 44,
    "title": "Plc App",
    "platform": "Labtainer",
    "category": "System & Network Security",
    "skill_tags": [
      "System Security",
      "Network Security"
    ],
    "difficulty": 3,
    "subject": "",
    "url": "Labtainer/plc-app.pdf",
    "description": "Lab Labtainer về system & network security: Plc App.",
    "description_detail": "Plc App mô phỏng một ứng dụng điều khiển/giám sát PLC trong hệ thống công nghiệp. Bạn sẽ tương tác với ứng dụng, xem cách nó gửi lệnh tới PLC và nhận dữ liệu, từ đó hiểu mối liên kết giữa phần mềm SCADA/HMI và thiết bị thực."
  },
  {
    "id": 45,
    "title": "Plc Forensics (1)",
    "platform": "Labtainer",
    "category": "System & Network Security",
    "skill_tags": [
      "System Security",
      "Network Security"
    ],
    "difficulty": 3,
    "subject": "",
    "url": "Labtainer/plc-forensics (1).pdf",
    "description": "Lab Labtainer về system & network security: Plc Forensics (1).",
    "description_detail": "Plc Forensics (1) là lab về điều tra forensics trên môi trường PLC/ICS. Bạn sẽ phân tích log, file cấu hình và trạng thái chương trình PLC để xác định các thay đổi bất thường hoặc thao tác nguy hiểm, phù hợp với bối cảnh bảo vệ hạ tầng trọng yếu."
  },
  {
    "id": 46,
    "title": "Plc Forensics",
    "platform": "Labtainer",
    "category": "System & Network Security",
    "skill_tags": [
      "System Security",
      "Network Security"
    ],
    "difficulty": 3,
    "subject": "",
    "url": "Labtainer/plc-forensics.pdf",
    "description": "Lab Labtainer về system & network security: Plc Forensics.",
    "description_detail": "Lab Plc Forensics tiếp tục đào sâu kỹ thuật forensics trong thế giới PLC. Bạn sẽ xem xét thêm nhiều artefact hơn, có thể là backup chương trình, log sự kiện và traffic điều khiển, để dựng lại kịch bản tấn công hoặc lỗi vận hành."
  },
  {
    "id": 47,
    "title": "Plc Traffic",
    "platform": "Labtainer",
    "category": "System & Network Security",
    "skill_tags": [
      "System Security",
      "Network Security"
    ],
    "difficulty": 3,
    "subject": "",
    "url": "Labtainer/plc-traffic.pdf",
    "description": "Lab Labtainer về system & network security: Plc Traffic.",
    "description_detail": "Plc Traffic là lab về phân tích lưu lượng mạng giữa PLC và các thành phần khác. Bạn sẽ xem PCAP chứa giao thức công nghiệp, nhận diện lệnh đọc/ghi và thảo luận rủi ro khi attacker có thể giả mạo hoặc chỉnh sửa các gói tin này."
  },
  {
    "id": 48,
    "title": "Plc",
    "platform": "Labtainer",
    "category": "System & Network Security",
    "skill_tags": [
      "System Security",
      "Network Security"
    ],
    "difficulty": 3,
    "subject": "",
    "url": "Labtainer/plc.pdf",
    "description": "Lab Labtainer về system & network security: Plc.",
    "description_detail": "Lab Plc là bài nhập môn về bộ điều khiển logic khả trình (PLC). Bạn sẽ tìm hiểu cấu trúc, cách lập trình cơ bản và cách nó kết nối vào mạng, từ đó hình dung bề mặt tấn công của hệ thống công nghiệp."
  },
  {
    "id": 49,
    "title": "Printf",
    "platform": "Labtainer",
    "category": "System & Network Security",
    "skill_tags": [
      "System Security",
      "Network Security"
    ],
    "difficulty": 3,
    "subject": "",
    "url": "Labtainer/printf.pdf",
    "description": "Lab Labtainer về system & network security: Printf.",
    "description_detail": "Printf là lab tập trung vào việc sử dụng hàm printf trong lập trình C và các lỗi thường gặp. Bạn sẽ thấy sự khác biệt giữa dùng format string cố định và ghép nối input người dùng trực tiếp, qua đó hiểu nền tảng của lỗi format string."
  },
  {
    "id": 50,
    "title": "Pubkey",
    "platform": "Labtainer",
    "category": "System & Network Security",
    "skill_tags": [
      "System Security",
      "Network Security"
    ],
    "difficulty": 3,
    "subject": "",
    "url": "Labtainer/pubkey.pdf",
    "description": "Lab Labtainer về system & network security: Pubkey.",
    "description_detail": "Lab Pubkey giới thiệu mật mã khóa công khai trong bối cảnh SSH hoặc SSL. Bạn sẽ tạo cặp khóa, thử xác thực dựa trên public key, quan sát cách mã hóa và thảo luận ưu điểm của mô hình bất đối xứng so với đối xứng."
  },
  {
    "id": 51,
    "title": "Quantum",
    "platform": "Labtainer",
    "category": "System & Network Security",
    "skill_tags": [
      "System Security",
      "Network Security"
    ],
    "difficulty": 3,
    "subject": "",
    "url": "Labtainer/quantum.pdf",
    "description": "Lab Labtainer về system & network security: Quantum.",
    "description_detail": "Quantum là lab giới thiệu khái niệm mật mã lượng tử hoặc các ý tưởng liên quan đến tác động của máy tính lượng tử lên mật mã hiện tại. Bạn sẽ đọc và thực hành một số bài tập nhỏ để hiểu khái niệm cơ bản, không đi sâu vào toán học phức tạp."
  },
  {
    "id": 52,
    "title": "Radius",
    "platform": "Labtainer",
    "category": "System & Network Security",
    "skill_tags": [
      "System Security",
      "Network Security"
    ],
    "difficulty": 3,
    "subject": "",
    "url": "Labtainer/radius.pdf",
    "description": "Lab Labtainer về system & network security: Radius.",
    "description_detail": "Lab Radius mô phỏng dịch vụ xác thực tập trung RADIUS. Bạn sẽ cấu hình server, client và thử nghiệm đăng nhập, hiểu cách RADIUS được dùng trong Wi-Fi doanh nghiệp, VPN và các dịch vụ yêu cầu xác thực tập trung."
  },
  {
    "id": 53,
    "title": "Retlibc",
    "platform": "Labtainer",
    "category": "System & Network Security",
    "skill_tags": [
      "System Security",
      "Network Security"
    ],
    "difficulty": 3,
    "subject": "",
    "url": "Labtainer/retlibc.pdf",
    "description": "Lab Labtainer về system & network security: Retlibc.",
    "description_detail": "Retlibc là lab về kỹ thuật return-to-libc. Bạn sẽ lợi dụng lỗ hổng tràn bộ đệm để thay vì chèn shellcode, chuyển luồng thực thi tới các hàm có sẵn trong libc như system, từ đó thấy cách bypass một số cơ chế chống thực thi mã trên stack."
  },
  {
    "id": 54,
    "title": "Routing Basics",
    "platform": "Labtainer",
    "category": "System & Network Security",
    "skill_tags": [
      "System Security",
      "Network Security"
    ],
    "difficulty": 3,
    "subject": "",
    "url": "Labtainer/routing-basics.pdf",
    "description": "Lab Labtainer về system & network security: Routing Basics.",
    "description_detail": "Routing Basics giúp bạn hiểu cơ chế định tuyến IP cơ bản. Bạn sẽ cấu hình static route hoặc routing đơn giản, kiểm tra đường đi gói tin bằng traceroute và nhận diện các lỗi định tuyến phổ biến trong mạng nhỏ."
  },
  {
    "id": 55,
    "title": "Setuid Env",
    "platform": "Labtainer",
    "category": "System Security",
    "skill_tags": [
      "Privileges",
      "Linux Security",
      "OS Hardening"
    ],
    "difficulty": 3,
    "subject": "",
    "url": "Labtainer/setuid-env.pdf",
    "description": "Lab Labtainer về system security: Setuid Env.",
    "description_detail": "Setuid Env là lab về chương trình setuid trên Linux và ảnh hưởng của biến môi trường. Bạn sẽ quan sát cách một binary setuid root có thể bị lợi dụng thông qua các biến môi trường như PATH, LD_PRELOAD nếu không được viết cẩn thận."
  },
  {
    "id": 56,
    "title": "Snort",
    "platform": "Labtainer",
    "category": "System & Network Security",
    "skill_tags": [
      "System Security",
      "Network Security"
    ],
    "difficulty": 3,
    "subject": "",
    "url": "Labtainer/snort.pdf",
    "description": "Lab Labtainer về system & network security: Snort.",
    "description_detail": "Lab Snort cho bạn cài đặt và cấu hình IDS Snort. Bạn sẽ viết một vài rule đơn giản, tạo traffic tương ứng và quan sát cảnh báo mà Snort sinh ra, qua đó hiểu nguyên lý phát hiện xâm nhập dựa trên chữ ký."
  },
  {
    "id": 57,
    "title": "Softplc2",
    "platform": "Labtainer",
    "category": "System & Network Security",
    "skill_tags": [
      "System Security",
      "Network Security"
    ],
    "difficulty": 3,
    "subject": "",
    "url": "Labtainer/softplc2.pdf",
    "description": "Lab Labtainer về system & network security: Softplc2.",
    "description_detail": "Softplc2 sử dụng PLC mềm (soft PLC) để mô phỏng hệ thống điều khiển công nghiệp. Bạn sẽ tương tác với hệ thống, thay đổi logic điều khiển và quan sát ảnh hưởng, từ đó hiểu rủi ro nếu attacker chiếm quyền điều khiển PLC."
  },
  {
    "id": 58,
    "title": "Sql Inject",
    "platform": "Labtainer",
    "category": "System & Network Security",
    "skill_tags": [
      "System Security",
      "Network Security"
    ],
    "difficulty": 3,
    "subject": "",
    "url": "Labtainer/sql-inject.pdf",
    "description": "Lab Labtainer về system & network security: Sql Inject.",
    "description_detail": "Sql Inject là lab về tấn công SQL injection trên ứng dụng web. Bạn sẽ thử chèn payload vào tham số input, quan sát câu query bị thay đổi và cách trích xuất dữ liệu trái phép, đồng thời học cách viết code và dùng parameterized query để phòng chống."
  },
  {
    "id": 59,
    "title": "Ssh Agent",
    "platform": "Labtainer",
    "category": "System Security",
    "skill_tags": [
      "SSH",
      "Encryption",
      "Remote Access"
    ],
    "difficulty": 2,
    "subject": "",
    "url": "Labtainer/ssh-agent.pdf",
    "description": "Lab Labtainer về system security: Ssh Agent.",
    "description_detail": "Ssh Agent lab giới thiệu ssh-agent – tiện ích lưu trữ khóa riêng SSH trong memory. Bạn sẽ thêm private key vào agent, đăng nhập mà không cần nhập lại passphrase và hiểu rủi ro nếu để agent mở trên môi trường không tin cậy."
  },
  {
    "id": 60,
    "title": "Ssh Tunnel",
    "platform": "Labtainer",
    "category": "System Security",
    "skill_tags": [
      "SSH",
      "Encryption",
      "Remote Access"
    ],
    "difficulty": 2,
    "subject": "",
    "url": "Labtainer/ssh-tunnel.pdf",
    "description": "Lab Labtainer về system security: Ssh Tunnel.",
    "description_detail": "Lab Ssh Tunnel dạy bạn tạo đường hầm (tunnel) qua SSH. Bạn sẽ forward port cục bộ hoặc từ server, truy cập dịch vụ chỉ mở nội bộ thông qua tunnel và thảo luận về ưu/nhược điểm bảo mật khi dùng SSH tunneling."
  },
  {
    "id": 61,
    "title": "Sshlab",
    "platform": "Labtainer",
    "category": "System Security",
    "skill_tags": [
      "SSH",
      "Encryption",
      "Remote Access"
    ],
    "difficulty": 2,
    "subject": "",
    "url": "Labtainer/sshlab.pdf",
    "description": "Lab Labtainer về system security: Sshlab.",
    "description_detail": "Sshlab là lab tổng quan về SSH. Bạn sẽ cấu hình server, tạo key pair, đăng nhập an toàn, tắt password authentication và xem log truy cập, qua đó thiết lập một môi trường SSH tương đối an toàn."
  },
  {
    "id": 62,
    "title": "Ssl",
    "platform": "Labtainer",
    "category": "System Security",
    "skill_tags": [
      "SSH",
      "Encryption",
      "Remote Access"
    ],
    "difficulty": 2,
    "subject": "",
    "url": "Labtainer/ssl.pdf",
    "description": "Lab Labtainer về system security: Ssl.",
    "description_detail": "Lab SSL cho bạn làm việc với giao thức SSL/TLS. Bạn sẽ tạo chứng chỉ tự ký, cấu hình dịch vụ dùng TLS và sử dụng công cụ dòng lệnh hoặc trình duyệt để kiểm tra handshake, từ đó hiểu cách dữ liệu được mã hóa trên đường truyền."
  },
  {
    "id": 63,
    "title": "Strace",
    "platform": "Labtainer",
    "category": "Debugging & Analysis",
    "skill_tags": [
      "GDB",
      "Tracing",
      "Binary Analysis"
    ],
    "difficulty": 3,
    "subject": "",
    "url": "Labtainer/strace.pdf",
    "description": "Lab Labtainer về debugging & analysis: Strace.",
    "description_detail": "Strace lab hướng dẫn bạn sử dụng strace để theo dõi các lời gọi hệ thống của một tiến trình. Bạn sẽ chạy chương trình kèm strace, xem các syscall đọc/ghi file, mạng, quyền..., từ đó hiểu sâu hơn cách chương trình tương tác với kernel."
  },
  {
    "id": 64,
    "title": "Symkey",
    "platform": "Labtainer",
    "category": "Cryptography",
    "skill_tags": [
      "Symmetric Crypto",
      "TLS",
      "Encryption"
    ],
    "difficulty": 3,
    "subject": "",
    "url": "Labtainer/symkey.pdf",
    "description": "Lab Labtainer về cryptography: Symkey.",
    "description_detail": "Symkey là lab về mật mã khóa đối xứng. Bạn sẽ mã hóa và giải mã dữ liệu với cùng một key, thử thay đổi chế độ hoạt động (mode) và quan sát ảnh hưởng, từ đó hiểu cách các thuật toán như AES được sử dụng trong thực tế."
  },
  {
    "id": 65,
    "title": "Sys Log",
    "platform": "Labtainer",
    "category": "Logging & Monitoring",
    "skill_tags": [
      "Syslog",
      "Logging",
      "Blue Team"
    ],
    "difficulty": 2,
    "subject": "",
    "url": "Labtainer/sys-log.pdf",
    "description": "Lab Labtainer về logging & monitoring: Sys Log.",
    "description_detail": "Sys Log là lab giới thiệu hệ thống syslog. Bạn sẽ cấu hình dịch vụ ghi log, gửi log từ client về server trung tâm và thực hành tra cứu, lọc log để phục vụ giám sát và điều tra sự cố."
  },
  {
    "id": 66,
    "title": "Tcpip",
    "platform": "Labtainer",
    "category": "Network Security",
    "skill_tags": [
      "Networking",
      "Routing",
      "Firewall",
      "Traffic Analysis"
    ],
    "difficulty": 3,
    "subject": "",
    "url": "Labtainer/tcpip.pdf",
    "description": "Lab Labtainer về network security: Tcpip.",
    "description_detail": "Lab Tcpip đào sâu vào stack TCP/IP. Bạn sẽ quan sát quá trình bắt tay TCP, truyền dữ liệu, đóng kết nối và phân tích gói tin, từ đó hiểu các khái niệm như port, sequence number, window... gắn liền với bảo mật mạng."
  },
  {
    "id": 67,
    "title": "Telnet",
    "platform": "Labtainer",
    "category": "Network Security",
    "skill_tags": [
      "Networking",
      "Routing",
      "Firewall",
      "Traffic Analysis"
    ],
    "difficulty": 3,
    "subject": "",
    "url": "Labtainer/telnet.pdf",
    "description": "Lab Labtainer về network security: Telnet.",
    "description_detail": "Telnet lab cho bạn thấy sự khác biệt giữa giao thức không mã hóa Telnet và SSH. Bạn sẽ dùng telnet đăng nhập, bắt PCAP và quan sát mật khẩu, dữ liệu đi dạng clear-text, từ đó hiểu vì sao Telnet không nên dùng trong môi trường an toàn."
  },
  {
    "id": 68,
    "title": "Users",
    "platform": "Labtainer",
    "category": "System Security",
    "skill_tags": [
      "Privileges",
      "Linux Security",
      "OS Hardening"
    ],
    "difficulty": 3,
    "subject": "",
    "url": "Labtainer/users.pdf",
    "description": "Lab Labtainer về system security: Users.",
    "description_detail": "Lab Users tập trung vào quản lý user và nhóm trên Linux. Bạn sẽ tạo user, gán group, chỉnh sửa file /etc/passwd và /etc/shadow, thiết lập quyền, qua đó hiểu cách phân quyền đúng giúp giảm thiểu rủi ro bảo mật."
  },
  {
    "id": 69,
    "title": "Vpnlab",
    "platform": "Labtainer",
    "category": "Network Security",
    "skill_tags": [
      "Networking",
      "Routing",
      "Firewall",
      "Traffic Analysis"
    ],
    "difficulty": 3,
    "subject": "",
    "url": "Labtainer/vpnlab.pdf",
    "description": "Lab Labtainer về network security: Vpnlab.",
    "description_detail": "Vpnlab là lab về triển khai VPN cơ bản. Bạn sẽ cấu hình client và server, thiết lập đường hầm bảo mật qua internet và kiểm tra traffic đã được mã hóa, đồng thời thảo luận các kịch bản sử dụng VPN trong doanh nghiệp."
  },
  {
    "id": 70,
    "title": "Vpnlab2",
    "platform": "Labtainer",
    "category": "Network Security",
    "skill_tags": [
      "Networking",
      "Routing",
      "Firewall",
      "Traffic Analysis"
    ],
    "difficulty": 3,
    "subject": "",
    "url": "Labtainer/vpnlab2.pdf",
    "description": "Lab Labtainer về network security: Vpnlab2.",
    "description_detail": "Vpnlab2 mở rộng trên Vpnlab với cấu hình VPN phức tạp hơn, có thể bao gồm site-to-site hoặc nhiều client. Bạn sẽ xử lý định tuyến qua tunnel, kiểm tra truy cập dịch vụ và đánh giá tác động của VPN tới kiến trúc mạng."
  },
  {
    "id": 71,
    "title": "Webtrack",
    "platform": "Labtainer",
    "category": "Network Forensics",
    "skill_tags": [
      "Wireshark",
      "PCAP",
      "Traffic Analysis"
    ],
    "difficulty": 2,
    "subject": "",
    "url": "Labtainer/webtrack.pdf",
    "description": "Lab Labtainer về network forensics: Webtrack.",
    "description_detail": "Webtrack là lab về truy vết hoạt động web qua log hoặc PCAP. Bạn sẽ phân tích yêu cầu HTTP, URL, header và nội dung để xác định người dùng đã truy cập những trang nào, có tải file lạ hay gửi dữ liệu nhạy cảm hay không."
  },
  {
    "id": 72,
    "title": "Wireshark Intro",
    "platform": "Labtainer",
    "category": "Network Forensics",
    "skill_tags": [
      "Wireshark",
      "PCAP",
      "Traffic Analysis"
    ],
    "difficulty": 2,
    "subject": "",
    "url": "Labtainer/wireshark-intro.pdf",
    "description": "Lab Labtainer về network forensics: Wireshark Intro.",
    "description_detail": "Wireshark Intro là lab nhập môn Wireshark. Bạn sẽ học cách bắt traffic, dùng filter, follow stream và giải mã một số giao thức đơn giản, tạo nền tảng cho các bài network forensics và phân tích tấn công sau này."
  },
  {
    "id": 73,
    "title": "Xforge",
    "platform": "Labtainer",
    "category": "Advanced Exploitation",
    "skill_tags": [
      "Binary Exploitation",
      "Reverse Engineering"
    ],
    "difficulty": 4,
    "subject": "",
    "url": "Labtainer/xforge.pdf",
    "description": "Lab Labtainer về advanced exploitation: Xforge.",
    "description_detail": "Xforge là lab khai thác nhị phân nâng cao, có thể kết hợp nhiều kỹ thuật như ROP, format string, heap exploit. Bạn sẽ phân tích chương trình, xác định bề mặt tấn công và xây dựng exploit phức tạp hơn những lab buffer overflow cơ bản."
  },
  {
    "id": 74,
    "title": "Xsite",
    "platform": "Labtainer",
    "category": "Advanced Exploitation",
    "skill_tags": [
      "Binary Exploitation",
      "Reverse Engineering"
    ],
    "difficulty": 4,
    "subject": "",
    "url": "Labtainer/xsite.pdf",
    "description": "Lab Labtainer về advanced exploitation: Xsite.",
    "description_detail": "Xsite là một lab khai thác nâng cao, có thể liên quan tới ứng dụng web hoặc nhị phân phức tạp. Bạn sẽ kết hợp kỹ năng reverse engineering, phân tích logic và tấn công để chiếm quyền điều khiển hệ thống mục tiêu, phù hợp cho giai đoạn cuối của môn khai thác."
  }
]
async function seed() {
  try {
    await connectDB();
    // const targetPlatform = "BlueTeamLabs";

    // console.log(`🧹 Đang xóa các bài lab thuộc platform: ${targetPlatform}...`);

    // const result = await Lab.deleteMany({
    //   platform: { $regex: new RegExp(`^${targetPlatform}$`, 'i') }
    // });
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
