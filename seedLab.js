const mongoose = require("mongoose");
const Lab = require("./models/Labs");
const connectDB = require('./config/db');
const LabLibrary = require('./models/LabLibrary');
const Web_pentest = [
  {
    "id": 1,
    "title": "Offensive Security Intro",
    "platform": "TryHackMe",
    "category": "Offensive Security",
    "skill_tags": [
      "Offensive Security",
      "Recon",
      "Web Enumeration",
      "Gobuster"
    ],
    "difficulty": 2,
    "subject": "",
    "url": "https://tryhackme.com/room/offensivesecurityintro",
    "description": "Room TryHackMe: Offensive Security Intro.",
    "description_detail": "Room này thuộc nhóm Offensive Security trên TryHackMe, mức độ Easy. Nội dung chính: Offensive Security, Recon, Web Enumeration, Gobuster. Kết quả mong đợi: nắm được kiến thức/kỹ năng cốt lõi và áp dụng cho các bài thực hành tiếp theo. Link: https://tryhackme.com/room/offensivesecurityintro"
  },
  {
    "id": 2,
    "title": "Defensive Security Intro",
    "platform": "TryHackMe",
    "category": "Defensive Security",
    "skill_tags": [
      "Defensive Security",
      "SOC",
      "Monitoring Basics"
    ],
    "difficulty": 2,
    "subject": "",
    "url": "https://tryhackme.com/room/defensivesecurityintro",
    "description": "Room TryHackMe: Defensive Security Intro.",
    "description_detail": "Room này thuộc nhóm Defensive Security trên TryHackMe, mức độ Easy. Nội dung chính: Defensive Security, SOC, Monitoring Basics. Kết quả mong đợi: nắm được kiến thức/kỹ năng cốt lõi và áp dụng cho các bài thực hành tiếp theo. Link: https://tryhackme.com/room/defensivesecurityintro"
  }
]
async function seed() {
  try {
    await connectDB();
    // const targetPlatform = "Labtainer";

    // console.log(`🧹 Đang xóa các bài lab thuộc platform: ${targetPlatform}...`);

    // const result = await Lab.deleteMany({
    //   platform: { $regex: new RegExp(`^${targetPlatform}$`, 'i') }
    // });
    // await Roadmap.deleteMany({});
    await LabLibrary.create(Web_pentest);

    console.log("Seed Success");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();
