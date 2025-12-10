🏗️ 1. Công nghệ sử dụng

Node.js

Express.js

MongoDB + Mongoose

dotenv / dotenvx

CORS

Nodemon (dev)

🚀 2. Cách chạy dự án
2.1. Cài đặt dependencies
npm install

2.2. Tạo file .env
PORT=5000
MONGO_URI=your_mongodb_url_here

2.3. Chạy server
npm run dev

📦 3. Seed Database (import dữ liệu mẫu)

Chạy:

node seed.js


Seed bao gồm:

Bộ câu hỏi trắc nghiệm định hướng (Career Questions)

Các roadmap học tập (SOC Analyst, Malware, Pentest…)

Data mẫu để test API

🧠 4. Kiến trúc thư mục
backend-project/


📝 5. API Documentation
📌 5.1. Lấy toàn bộ câu hỏi trắc nghiệm

GET /api/questions

📌 5.2. User submit bài test

POST /api/submissions

Body:
{
  "studentId": "692335f771ac631e99c4ba92",
  "studentName": "John Doe",
  "answers": [
    { "questionId": 1, "optionIndex": 3 },
    { "questionId": 2, "optionIndex": 1 }
  ]
}

Response:

Kết quả nghề phù hợp nhất

Điểm chi tiết theo từng nghề

Lưu vào DB

📌 5.3. Lấy roadmap theo career

GET /api/roadmap/:career

Ví dụ:

/api/roadmap/SOC Analyst

📌 5.4. Lưu tiến độ học tập của user

POST /api/progress/update

Body:
{
  "studentId": "692335f771ac631e99c4ba92",
  "career": "SOC Analyst",
  "completedItems": [0, 2, 3]
}

📌 5.5. Lấy tiến độ học của user

GET /api/progress/:studentId/:career

📊 6. Cách hệ thống tính tiến độ (Progress)

Hệ thống lưu từng roadmap như:

{
  career: "SOC Analyst",
  items: [
    {...}, // index 0
    {...}, // index 1
    {...}, // index 2
    ...
  ]
}


Bảng tiến độ:

{
  studentId: "...",
  career: "SOC Analyst",
  completedItems: [0, 2, 3]
}

🔍 Công thức tính:
completed = completedItems.length
total = roadmap.items.length
percentage = (completed / total) * 100


Ví dụ:

completedItems = [0, 2, 3]
total = 6
→ completed = 3
→ percentage = 50%


Hiển thị:

3/6 bài học (50%) 🔘🔘🔘⚪⚪⚪

🎯 7. Mục tiêu của hệ thống

Tạo bài trắc nghiệm định hướng nghề nghiệp chuẩn hóa

Gợi ý lộ trình học tập theo nghề

Theo dõi tiến độ người học

Dễ dàng mở rộng thêm ngành (Pentest, DFIR, Malware…)

👨‍💻 8. Người phát triển

Phùng Đắc Quý





// Định nghĩa routes
router.post('/register', registerUser); const { hoTen, email, matKhau, nhapLaiMatKhau } = req.body;

router.post('/login', loginUser);  const { email, matKhau } = req.body;

router.post('/quen-mat-khau', quenMatKhau); const { email } = req.body;

router.post('/dat-lai-mat-khau/:resetToken', datLaiMatKhau);  const { matKhauMoi } = req.body;
                                                              const { resetToken } = req.params;


//questions
router.get('/questions', getAll);

//submissions
router.post('/submissions/submit', submit); const { studentId, studentName, answers } = req.body;

// /roadmap
router.post('/roadmap', getRoadmap);  const {career} = req.body;

// progress
router.post('/progress/create', createProgress); const { studentId, career, completedItems } = req.body;
router.put('/progress/update', updateProgress); const { studentId, career, itemIndex } = req.body;
router.get('/progress/:studentId/:career',getProgresStudent ); const { studentId, career } = req.params;