const mongoose = require("mongoose");
const Resource = require("./models/Resource");
const connectDB = require('./config/db');
const Web_pentest =
  [
    {
      "category": "video",
      "title": "DFIR Foundations & Techniques: Hands-On Digital Forensics and Incident Response (Playlist)",
      "language": "en",
      "level": "beginner",
      "url": "https://www.youtube.com/playlist?list=PLvj9oZ_CKCLMRBFydz60uWrOmMEWDqT53",
      "notes": "Series miễn phí về DFIR foundations & techniques, dành cho SOC analyst, incident responder và security engineer muốn học DFIR thực hành."
    },
    {
      "category": "video",
      "title": "Digital Forensics & Incident Response – 9.5 Hours DFIR Complete Course (Playlist)",
      "language": "en",
      "level": "beginner",
      "url": "https://www.youtube.com/playlist?list=PLKJGe-yb9iQbeaArYPmMk0U9VIgOVKbZ1",
      "notes": "Playlist tổng hợp nhiều video DFIR, bao gồm intro, công cụ DFIR và một course ~9.5 tiếng về Digital Forensics & Incident Response."
    },
    {
      "category": "video",
      "title": "BlackPerl DFIR – Incident Response Training (Playlist)",
      "language": "en",
      "level": "mixed",
      "url": "https://www.youtube.com/playlist?list=PLjWEV7pmvSa4yvhzNsCjOJovOn1LLyBXB",
      "notes": "Series training về Incident Response miễn phí: từ Day-0 tới các kỹ thuật DFIR nâng cao, rất hợp cho người mới vào DFIR."
    },
    {
      "category": "video",
      "title": "Incident Response Training Course – SANS DFIR FOR508 (Intro Video)",
      "language": "en",
      "level": "intermediate",
      "url": "https://www.youtube.com/watch?v=waod4PffEzI",
      "notes": "Video giới thiệu khoá SANS FOR508 (Advanced Incident Response, Threat Hunting, and Digital Forensics) – giúp hiểu DFIR ở level enterprise."
    },
    {
      "category": "video",
      "title": "SANS Digital Forensics and Incident Response – Courses Introductions (Playlist)",
      "language": "en",
      "level": "intermediate",
      "url": "https://www.youtube.com/playlist?list=PLfouvuAjspTrmreRyeZK9auHhDVS-uFbd",
      "notes": "Playlist giới thiệu các khoá DFIR của SANS (FOR500, FOR508, FOR518...), giúp định hình roadmap kỹ năng DFIR chuyên sâu."
    },
    {
      "category": "video",
      "title": "DFIRScience – Digital Forensics & Incident Response Channel",
      "language": "en",
      "level": "mixed",
      "url": "https://www.youtube.com/dfirscience",
      "notes": "Kênh YouTube tập trung về nghiên cứu và thực hành DFIR, có nhiều video lab, phân tích case và hướng dẫn kỹ thuật forensics/IR."
    },
    {
      "category": "video",
      "title": "SANS Digital Forensics and Incident Response – YouTube Channel",
      "language": "en",
      "level": "mixed",
      "url": "https://www.youtube.com/%40SANSForensics",
      "notes": "Kênh chính thức của SANS DFIR: intro khoá học, webinar, phân tích case thực tế – rất hữu ích cho cả SOC lẫn DFIR engineer."
    },
    {
      "category": "video",
      "title": "IBM – Incident Response and Digital Forensics (Online Course Intro)",
      "language": "en",
      "level": "beginner",
      "url": "https://www.coursera.org/learn/ibm-incident-response-digital-forensics",
      "notes": "Khoá học online trên Coursera giới thiệu quy trình Incident Response và Digital Forensics, phù hợp cho người mới cần kiến thức nền DFIR."
    },
    {
      "category": "book",
      "title": "Practical Forensic Imaging: Securing Digital Evidence with Linux Tools",
      "language": "en",
      "level": "intermediate",
      "url": "https://nostarch.com/forensicimaging",
      "notes": "Sách tập trung vào quy trình forensic imaging: thu thập, bảo toàn và quản lý evidence số bằng Linux CLI – rất quan trọng với mọi DFIR analyst."
    },
    {
      "category": "book",
      "title": "Digital Forensics and Incident Response (3rd Edition)",
      "language": "en",
      "level": "intermediate",
      "url": "https://www.packtpub.com/en-us/product/digital-forensics-and-incident-response-9781838649005",
      "notes": "Sách của Gerard Johansen, bao phủ toàn bộ quy trình DFIR: chuẩn bị, thu thập evidence, phân tích, báo cáo – phù hợp dùng như giáo trình DFIR tổng quát."
    },
    {
      "category": "book",
      "title": "Windows Forensic Analysis Toolkit: Advanced Analysis Techniques",
      "language": "en",
      "level": "intermediate",
      "url": "https://www.oreilly.com/library/view/windows-forensic-analysis/9781597497275/",
      "notes": "Harlan Carvey đi sâu vào phân tích forensic trên Windows: live & post-mortem response, registry, artefacts – cực kỳ hữu ích cho DFIR Windows."
    },
    {
      "category": "book",
      "title": "Incident Response & Computer Forensics (3rd Edition)",
      "language": "en",
      "level": "intermediate",
      "url": "https://www.oreilly.com/library/view/incident-response-computer/9780071798686/",
      "notes": "Sách kinh điển về Incident Response & Computer Forensics, mô tả chi tiết quy trình IR và kỹ thuật phân tích bằng chứng số trong các case thực tế."
    }
  ]

async function seed() {
  try {
    await connectDB();

    //await Resource.deleteMany({});
    // await Resource.create(Web_pentest);
    // Tìm các bản ghi mà trong notes có chữ "pentest"
    const resources = await Resource.find({
      notes: { $regex: /DFIR/i } // "i" là không phân biệt hoa thường
    });

    console.log(`🔍 Tìm thấy ${resources.length} tài nguyên có nhắc đến 'SOC'.`);

    for (let res of resources) {
      // Ví dụ: Bạn thêm "Pentesting" vào một trường tags (mảng) 
      // Hoặc gán vào platform nếu bạn muốn thực hiện đúng như câu hỏi
      await Resource.updateOne(
        { _id: res._id },
        { $set: { platform: "dfir" } } // Hoặc dùng để phân loại topic
      );
    }

    console.log('✅ Đã cập nhật xong!');


    console.log("Seed Success");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();
