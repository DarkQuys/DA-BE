const mongoose = require("mongoose");
const Lab = require("./models/Labs");
const connectDB = require('./config/db');
const Web_pentest = [
  {
    "id": 1,
    "title": "BEC KY",
    "platform": "BlueTeamLabs",
    "category": "Investigation",
    "skill_tags": [
      "Email Forensics",
      "BEC Analysis",
      "Header Analysis",
      "Phishing Investigation"
    ],
    "difficulty": 3,
    "subject": "",
    "url": "https://blueteamlabs.online/home/investigation/bec-ky-d75e02a0dd",
    "description": "Phân tích email BEC, kiểm tra header và tìm IoC.",
    "description_detail": "Lab này mô phỏng một tình huống nhân viên công ty nhận được email yêu cầu chuyển tiền từ 'sếp' hoặc đối tác. Bạn cần đọc kỹ nội dung email, sau đó đi sâu vào phần header để kiểm tra đường đi của email, tên miền gửi, địa chỉ IP, kết quả kiểm tra SPF/DKIM/DMARC và các trường quan trọng khác. Từ đó, bạn đánh giá xem đây có phải là kịch bản Business Email Compromise (BEC) hay không, trích xuất các chỉ số tấn công (IoC) như domain giả mạo, địa chỉ IP, đường link độc hại, file đính kèm đáng ngờ và đưa ra khuyến nghị phòng chống cho hệ thống email doanh nghiệp."
  },
  {
    "id": 2,
    "title": "MiddleMayhem",
    "platform": "BlueTeamLabs",
    "category": "Investigation",
    "skill_tags": [
      "MITM Detection",
      "Packet Forensics",
      "Network Intrusion Analysis"
    ],
    "difficulty": 3,
    "subject": "",
    "url": "https://blueteamlabs.online/home/investigation/middlemayhem-aa3c27f5d1",
    "description": "Điều tra MITM, phân tích log và traffic.",
    "description_detail": "Trong lab này, bạn điều tra một sự cố khi người dùng báo cáo truy cập web chậm và có dấu hiệu bất thường. Bạn sẽ phân tích log mạng hoặc file PCAP để tìm các gói tin cho thấy kẻ tấn công đang chen giữa đường truyền (Man-in-the-Middle), ví dụ như ARP spoofing, gateway giả, proxy lạ hoặc chứng chỉ HTTPS không hợp lệ. Mục tiêu của bạn là xác định máy tấn công, máy nạn nhân, kỹ thuật MITM được sử dụng và tổng hợp các IoC để có thể cấu hình chặn trên tường lửa, IDS/IPS và các giải pháp bảo mật mạng khác."
  },
  {
    "id": 3,
    "title": "Cerulean",
    "platform": "BlueTeamLabs",
    "category": "Investigation",
    "skill_tags": [
      "Web Log Analysis",
      "Recon Detection",
      "IP Profiling"
    ],
    "difficulty": 2,
    "subject": "",
    "url": "https://blueteamlabs.online/home/investigation/cerulean-625969e135",
    "description": "Phân tích log web xác định recon.",
    "description_detail": "Lab này tập trung vào việc phân tích access log của web server để phát hiện các hoạt động do thám (reconnaissance) trước khi tấn công. Bạn sẽ quan sát những request bất thường như quét thư mục, thử các đường dẫn nhạy cảm, truy cập nhiều file lỗi 404, sử dụng nhiều user-agent khác nhau hoặc gửi rất nhiều request trong thời gian ngắn từ cùng một địa chỉ IP. Dựa trên các mẫu hành vi đó, bạn xác định được IP hoặc mạng nguồn đáng ngờ, phân loại kiểu recon mà kẻ tấn công đang thực hiện và đánh giá mức độ rủi ro để đề xuất rule chặn hoặc cảnh báo phù hợp."
  },
  {
    "id": 4,
    "title": "Haunted",
    "platform": "BlueTeamLabs",
    "category": "Investigation",
    "skill_tags": [
      "Malware Triage",
      "Windows Event Log Analysis",
      "Persistence Detection"
    ],
    "difficulty": 4,
    "subject": "",
    "url": "https://blueteamlabs.online/home/investigation/haunted-dfa349d2bb",
    "description": "Điều tra máy bị compromise qua Windows logs.",
    "description_detail": "Trong lab Haunted, bạn điều tra một máy Windows có dấu hiệu bị xâm nhập và đang chạy phần mềm đáng ngờ. Nhiệm vụ của bạn là phân tích các Windows Event Logs (Security, System, Application, PowerShell, Task Scheduler...) để tìm các sự kiện đăng nhập bất thường, thực thi file khả nghi, tạo dịch vụ hoặc scheduled task phục vụ việc duy trì hiện diện (persistence). Bạn sẽ dựng lại timeline tấn công, xác định tài khoản bị lợi dụng, cách mã độc bám trụ trong hệ thống và đưa ra khuyến nghị xử lý như cô lập máy, loại bỏ cơ chế persistence, thu thập thêm mẫu để phân tích malware sâu hơn."
  },
  {
    "id": 5,
    "title": "Nonyx",
    "platform": "BlueTeamLabs",
    "category": "Investigation",
    "skill_tags": [
      "DNS Analysis",
      "Network Forensics",
      "C2 Traffic Detection"
    ],
    "difficulty": 3,
    "subject": "",
    "url": "https://blueteamlabs.online/home/investigation/nonyx-63b4769449",
    "description": "Phân tích DNS traffic tìm C2.",
    "description_detail": "Lab Nonyx xoay quanh việc phân tích traffic DNS để phát hiện kênh điều khiển từ xa (Command & Control – C2) của mã độc. Bạn sẽ rà soát các truy vấn DNS có mẫu bất thường như subdomain rất dài, tần suất truy cập cao tới cùng một tên miền lạ hoặc tên miền có dạng giống như được tạo bằng thuật toán (DGA). Từ đó, bạn tìm ra domain và địa chỉ IP liên quan tới hạ tầng C2, xác định host nội bộ bị nhiễm mã độc và tổng hợp danh sách IoC để phục vụ hunting cũng như cấu hình chặn trên DNS firewall, proxy hoặc các thành phần bảo mật mạng khác."
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
