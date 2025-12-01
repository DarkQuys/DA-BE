require('dotenv').config();
const mongoose = require('mongoose');
const Question = require('./models/Questions');
const connectDB = require('./config/db');

const data = [
  {
    "questionId": 1,
    "domain": "Career Orientation",
    "type": "preference",
    "question": "Nghe công việc nào “hợp vibe” với bạn nhất?",
    "options": [
      "A. Thử “chọc” vào website/app để xem có lỗ hổng, từ chỗ nhập form, đăng nhập…",
      "B. Tưởng tượng mình là “kẻ đột nhập” trong mạng công ty, tìm đường đi sâu vào bên trong.",
      "C. Ngồi trong phòng giám sát, xem cảnh báo / log để phát hiện ai đang làm điều khả nghi.",
      "D. Điều tra lại sau khi công ty bị hack: “Ai vào? Vào lúc nào? Làm gì trên hệ thống?”.",
      "E. Mổ xẻ những file lạ nghi là virus/mã độc để xem nó làm gì phía sau màn hình."
    ],
    "mapping": [
      "Web Pentester",
      "Network Security / Red Team",
      "SOC Analyst / Blue Team",
      "DFIR Analyst (Digital Forensics)",
      "Malware Analyst"
    ]
  },
  {
    "questionId": 2,
    "domain": "Career Orientation",
    "type": "preference",
    "question": "1 ngày làm việc lý tưởng của bạn?",
    "options": [
      "A. Thử nghiệm các chức năng website, tìm cách “bẻ” logic hệ thống.",
      "B. Dùng nhiều công cụ để scan mạng, tìm máy yếu để tấn công giả lập.",
      "C. Nhìn dashboard, xem log, quyết định cảnh báo nào là nguy hiểm thật.",
      "D. Lục lại dữ liệu, log, file, từng dấu vết nhỏ để ráp thành bức tranh toàn cảnh.",
      "E. Chạy file lạ trong môi trường an toàn, xem nó kết nối đi đâu, sửa gì trong máy."
    ],
    "mapping": [
      "Web Pentester",
      "Network Security / Red Team",
      "SOC Analyst / Blue Team",
      "DFIR Analyst (Digital Forensics)",
      "Malware Analyst"
    ]
  },
  {
    "questionId": 3,
    "domain": "Career Orientation",
    "type": "preference",
    "question": "Bạn thích kiểu “giải đố” nào hơn?",
    "options": [
      "A. Tìm ra chỗ chương trình xử lý dữ liệu thiếu cẩn thận để chiếm quyền.",
      "B. Tìm đường đi từ 1 máy yếu lên đến server quan trọng qua nhiều bước.",
      "C. Từ vài dòng log/alert ít ỏi, đoán ra cả kịch bản tấn công.",
      "D. Từ vài file log + thời gian hệ thống, dựng lại “timeline vụ án”.",
      "E. Từ một file bị nghi nhiễm, lần ra C2, loại mã độc, cách hoạt động."
    ],
    "mapping": [
      "Web Pentester",
      "Network Security / Red Team",
      "SOC Analyst / Blue Team",
      "DFIR Analyst (Digital Forensics)",
      "Malware Analyst"
    ]
  },
  {
    "questionId": 4,
    "domain": "Career Orientation",
    "type": "preference",
    "question": "Khi có sự cố (máy chậm, web lỗi…), cách tiếp cận nào giống bạn nhất?",
    "options": [
      "A. Test thử từng chức năng, bấm lung tung để xem chỗ nào “vỡ” trước.",
      "B. Kiểm tra kết nối mạng, đường đi, thiết bị trung gian, phân tích sơ đồ.",
      "C. Mở log / bảng giám sát xem có cảnh báo, error gì bất thường không.",
      "D. Hỏi kỹ: “Lúc trước có cài gì? Lỗi từ mấy giờ? Đã làm gì trước đó?”, rồi xem dữ liệu.",
      "E. Nghi ngay “có virus/mã độc gì không”, muốn quét và xem file lạ chạy thế nào."
    ],
    "mapping": [
      "Web Pentester",
      "Network Security / Red Team",
      "SOC Analyst / Blue Team",
      "DFIR Analyst (Digital Forensics)",
      "Malware Analyst"
    ]
  },
  {
    "questionId": 5,
    "domain": "Career Orientation",
    "type": "preference",
    "question": "Về tính cách làm việc, bạn thấy mình giống kiểu nào nhất?",
    "options": [
      "A. Thích thử nghiệm, “nghịch phá”, thích xem hệ thống phản ứng sao khi mình thử nhiều kiểu input.",
      "B. Thích cảm giác “xâm nhập”, đi đường vòng, vượt rào, leo từ tầng thấp lên tầng cao.",
      "C. Thích trật tự, kỷ luật, thấy vui khi mọi thứ “đúng quy trình”, “đúng rule”.",
      "D. Rất kiên nhẫn, chấp nhận ngồi hàng giờ chỉ để tìm ra một chi tiết nhỏ trong đống dữ liệu.",
      "E. Thích mổ xẻ thứ bí ẩn, tháo tung ra xem cấu trúc bên trong hoạt động thế nào."
    ],
    "mapping": [
      "Web Pentester",
      "Network Security / Red Team",
      "SOC Analyst / Blue Team",
      "DFIR Analyst (Digital Forensics)",
      "Malware Analyst"
    ]
  },
  {
    "questionId": 6,
    "domain": "Career Orientation",
    "type": "preference",
    "question": "Bạn muốn mình làm việc với loại “đối tượng” nào nhiều hơn?",
    "options": [
      "A. Website, app, giao diện mà người dùng cuối tương tác.",
      "B. Thiết bị mạng, server, sơ đồ mạng nội bộ, kết nối giữa các máy.",
      "C. Log, biểu đồ, cảnh báo từ nhiều hệ thống khác nhau.",
      "D. File, ổ cứng, backup, PCAP, dữ liệu lịch sử.",
      "E. File thực thi, script, code, virus/mã độc."
    ],
    "mapping": [
      "Web Pentester",
      "Network Security / Red Team",
      "SOC Analyst / Blue Team",
      "DFIR Analyst (Digital Forensics)",
      "Malware Analyst"
    ]
  },
  {
    "questionId": 7,
    "domain": "Career Orientation",
    "type": "preference",
    "question": "Khi học / làm việc, bạn cảm thấy thoải mái nhất khi…",
    "options": [
      "A. Thấy rõ kết quả ngay trên màn hình web/app: login được, lỗi hiện ra rõ.",
      "B. Thấy mình “vượt qua rào chắn”, truy cập được nơi tưởng như không vào nổi.",
      "C. Thấy số lượng cảnh báo được xử lý gọn, không để sót cái nào quan trọng.",
      "D. Tìm được bằng chứng rõ ràng cho một giả thuyết mà mình theo đuổi.",
      "E. Hiểu được một đoạn code lạ / mã độc khó, rồi giải thích được cho người khác hiểu."
    ],
    "mapping": [
      "Web Pentester",
      "Network Security / Red Team",
      "SOC Analyst / Blue Team",
      "DFIR Analyst (Digital Forensics)",
      "Malware Analyst"
    ]
  },
  {
    "questionId": 8,
    "domain": "Career Orientation",
    "type": "preference",
    "question": "Về tính cách, câu nào gần với bạn nhất?",
    "options": [
      "A. Hơi “láu cá” một chút, thích tìm kẽ hở, nhưng theo hướng tích cực (để sửa, không phải phá).",
      "B. Thích cảm giác “đối đầu với hệ thống”, chinh phục thử thách khó.",
      "C. Thích trật tự, kỷ luật, thấy khó chịu khi dữ liệu/cảnh báo bị bỏ sót.",
      "D. Tỉ mỉ, cẩn thận, ghét kết luận khi chưa có đủ bằng chứng.",
      "E. Thích học về cách máy tính hoạt động ở mức rất sâu, không ngại thứ “khó nhằn”."
    ],
    "mapping": [
      "Web Pentester",
      "Network Security / Red Team",
      "SOC Analyst / Blue Team",
      "DFIR Analyst (Digital Forensics)",
      "Malware Analyst"
    ]
  },
  {
    "questionId": 9,
    "domain": "Career Orientation",
    "type": "preference",
    "question": "Bạn chịu được kiểu môi trường làm việc nào hơn?",
    "options": [
      "A. Dự án theo từng đợt, mỗi lần tập trung phá/test một ứng dụng cụ thể.",
      "B. Các chiến dịch kiểm thử, diễn tập tấn công theo đội (red team).",
      "C. Trực ca (có thể ca tối), theo dõi hệ thống real-time, phản ứng khi có cảnh báo.",
      "D. Các vụ điều tra theo “case”, có khi kéo dài, cần bình tĩnh, không vội.",
      "E. Lab nghiên cứu, công việc lặp lại việc phân tích nhiều mẫu mã độc khác nhau."
    ],
    "mapping": [
      "Web Pentester",
      "Network Security / Red Team",
      "SOC Analyst / Blue Team",
      "DFIR Analyst (Digital Forensics)",
      "Malware Analyst"
    ]
  },
  {
    "questionId": 10,
    "domain": "Career Orientation",
    "type": "preference",
    "question": "Nếu sau này kể với người khác “nghề của mình là…”, bạn muốn nghe câu nào hay nhất?",
    "options": [
      "A. “Mình chuyên kiểm tra độ an toàn của website/app, tìm lỗi trước khi hacker thật tìm ra.”",
      "B. “Mình đóng vai hacker tấn công thử vào hệ thống mạng của công ty để tìm điểm yếu.”",
      "C. “Mình ngồi ở trung tâm giám sát, phát hiện & chặn tấn công cho doanh nghiệp.”",
      "D. “Mình là kiểu ‘cảnh sát điều tra’ nhưng trong thế giới số, điều tra các vụ hack.”",
      "E. “Mình chuyên mổ xẻ virus/mã độc để bảo vệ hệ thống và hiểu cách hacker chơi trò mới.”"
    ],
    "mapping": [
      "Web Pentester",
      "Network Security / Red Team",
      "SOC Analyst / Blue Team",
      "DFIR Analyst (Digital Forensics)",
      "Malware Analyst"
    ]
  }
]

async function seed() {
  try {
    await connectDB();
    await Question.deleteMany({});
    await Question.insertMany(data);
    console.log('Seeded questions');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();
