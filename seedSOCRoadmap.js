const mongoose = require("mongoose");
const Roadmap = require("./models/Roadmap");
const connectDB = require('./config/db');
const SOC_roadmap = {
  career: "SOC Analyst",
  items: [
  {
    "category": "video",
    "title": "The FASTEST Way to Become a SOC Analyst in 2025",
    "language": "en",
    "level": "beginner",
    "url": "https://www.youtube.com/watch?v=Ca-6ZXP0KFs",
    "notes": "Video roadmap 5 bước để trở thành SOC Analyst, tập trung vào kỹ năng và lộ trình học thực tế."
  },
  {
    "category": "video",
    "title": "SOC Analyst Roadmap – What You ACTUALLY Need to Know",
    "language": "en",
    "level": "beginner",
    "url": "https://www.youtube.com/watch?v=3WMHs-Sb8Ps",
    "notes": "Giải thích SOC là gì, SOC Analyst làm gì và thứ tự kỹ năng nên học trước."
  },
  {
    "category": "video",
    "title": "How To Become a Cybersecurity (SOC) Analyst in 2025",
    "language": "en",
    "level": "beginner",
    "url": "https://www.youtube.com/watch?v=NWWSKH4WMrs",
    "notes": "Hướng dẫn từng bước từ người mới đến khi apply được job SOC Analyst entry-level."
  },
  {
    "category": "playlist",
    "title": "SOC Analyst Foundation Training (Playlist)",
    "language": "en",
    "level": "mixed",
    "url": "https://www.youtube.com/playlist?list=PLDiFOs0RcaCTLGhmChDjl_0nOVnTQ2IHx",
    "notes": "Series đào tạo SOC Analyst nhiều buổi: giới thiệu SOC, quy trình vận hành, xử lý alert, điều tra log."
  },
  {
    "category": "playlist",
    "title": "SOC Analyst Expert Tutorials",
    "language": "en",
    "level": "intermediate",
    "url": "https://www.youtube.com/playlist?list=PLOWdy-NBQHJug0tGwdRFT8R5vGDttkHqP",
    "notes": "Playlist đào sâu vào hoạt động SOC, workflow, use case phân tích và điều tra sự cố."
  },
  {
    "category": "video",
    "title": "Day 1 | Introduction to SOC | SOC Analyst Training for Beginners",
    "language": "en",
    "level": "beginner",
    "url": "https://www.youtube.com/watch?v=hHpZZMvXuEg",
    "notes": "Buổi đầu trong khoá training SOC Analyst cho người mới: khái niệm SOC, vai trò, công việc hằng ngày."
  },
  {
    "category": "video",
    "title": "Cybersecurity SOC Analyst: Hands-On Training (10 Sites)",
    "language": "en",
    "level": "mixed",
    "url": "https://www.youtube.com/watch?v=G5sCK6IU3nU",
    "notes": "Giới thiệu 10 nền tảng & website để luyện kỹ năng SOC Analyst (log analysis, SIEM, IR, DFIR)."
  },
  {
    "category": "learning_path",
    "title": "TryHackMe – SOC Level 1 Path",
    "language": "en",
    "level": "beginner",
    "url": "https://tryhackme.com/path/outline/soclevel1",
    "notes": "Lộ trình SOC Level 1 của TryHackMe: log, alert triage, Splunk/Suricata/Zeek, điều tra sự cố cơ bản."
  },
  {
    "category": "article",
    "title": "TryHackMe – Best Blue Team Labs for Incident Detection and Response",
    "language": "en",
    "level": "mixed",
    "url": "https://tryhackme.com/resources/blog/best-blue-team-labs-for-incident-detection-and-response-2025-update",
    "notes": "Bài viết giới thiệu các lab blue team/SOC thực tế để luyện detection & response, bao gồm nhiều nền tảng khác nhau."
  },
  {
    "category": "article",
    "title": "SOC Level Up: Introduction to Sigma Rules",
    "language": "en",
    "level": "intermediate",
    "url": "https://intezer.com/blog/intro-to-sigma-rules/",
    "notes": "Giới thiệu Sigma rule cho SOC: cách hoạt động và cách viết rule để chuẩn hoá detection trên nhiều SIEM."
  },
  {
    "category": "article",
    "title": "What Are Sigma Rules? – Beginner’s Guide",
    "language": "en",
    "level": "intermediate",
    "url": "https://socprime.com/blog/sigma-rules-the-beginners-guide/",
    "notes": "Giải thích Sigma rule, cấu trúc YAML và hướng dẫn cơ bản để bắt đầu viết rule phục vụ SOC."
  },
  {
    "category": "article",
    "title": "The Ultimate Guide to Sigma Rules (Graylog)",
    "language": "en",
    "level": "advanced",
    "url": "https://graylog.org/post/the-ultimate-guide-to-sigma-rules/",
    "notes": "Bài hướng dẫn nâng cao về Sigma rules, use case cho detection & threat hunting trong SOC."
  },
  {
    "category": "article",
    "title": "Writing Sigma Rules – Practical Walkthrough",
    "language": "en",
    "level": "advanced",
    "url": "https://medium.com/@jlukeraines/writing-sigma-rules-fdb18c79948f",
    "notes": "Walkthrough thực tế về cách viết Sigma rules cho log analysis/SIEM, rất hữu ích cho SOC Analyst Level 2+."
  },
  {
    "category": "article",
    "title": "Top 10 SOC Analysts Training Platforms",
    "language": "en",
    "level": "mixed",
    "url": "https://socradar.medium.com/top-10-soc-analysts-training-platforms-0a96c01d4fd4",
    "notes": "Tổng hợp các nền tảng training cho SOC Analyst, bao gồm TryHackMe, CyberDefenders, Blue Team Labs Online, RangeForce,…"
  },
  {
    "category": "article",
    "title": "Học SOC Có Khó Không? Từ Người Mới Đến Chuyên Viên SOC",
    "language": "vi",
    "level": "beginner",
    "url": "https://thegioihacker.org/hoc-soc-co-kho-khong-tu-nguoi-moi-den-chuyen-vien-soc/",
    "notes": "Bài viết tiếng Việt giải thích nghề SOC Analyst, kỹ năng cần thiết, lộ trình phát triển và mức lương tại Việt Nam."
  },
    {
    "category": "book",
    "title": "Blue Team Field Manual (BTFM)",
    "language": "en",
    "level": "intermediate",
    "url": "https://www.barnesandnoble.com/w/blue-team-field-manual-ben-clark/1132500570",
    "notes": "Sổ tay incident response/blue team, bám theo NIST Cybersecurity Framework (Identify, Protect, Detect, Respond, Recover). Dùng như quick reference khi làm SOC/IR."
  },
  {
    "category": "book",
    "title": "Applied Network Security Monitoring: Collection, Detection, and Analysis",
    "language": "en",
    "level": "intermediate",
    "url": "https://www.oreilly.com/library/view/applied-network-security/9780124172081/",
    "notes": "Sách nền tảng về Network Security Monitoring (NSM), tập trung vào cách thu thập dữ liệu, phát hiện hoạt động độc hại và phân tích phục vụ SOC."
  },
  {
    "category": "book",
    "title": "The Practice of Network Security Monitoring: Understanding Incident Detection and Response",
    "language": "en",
    "level": "intermediate",
    "url": "https://www.nostarch.com/nsm",
    "notes": "Sách kinh điển về NSM của Richard Bejtlich, đi sâu vào triết lý và thực hành phát hiện & phản ứng sự cố qua log/PCAP."
  },
  {
    "category": "book",
    "title": "Cybersecurity Incident Response: How to Contain, Eradicate, and Recover from Incidents",
    "language": "en",
    "level": "intermediate",
    "url": "https://www.oreilly.com/library/view/cybersecurity-incident-response/9781484238707/",
    "notes": "Tập trung vào quy trình IR: chuẩn bị, phát hiện, containment, eradication, recovery; rất hợp cho SOC/IR lead."
  },
  {
    "category": "book",
    "title": "Digital Forensics and Incident Response: A Practical Guide to Deploying Digital Forensics Techniques",
    "language": "en",
    "level": "intermediate",
    "url": "https://www.packtpub.com/product/digital-forensics-and-incident-response/9781787288683",
    "notes": "Kết hợp DFIR + threat intel, hướng dẫn điều tra sự cố và thu thập bằng chứng số, bổ trợ tốt cho SOC/IR."
  }
]
};

async function seed() {
  try {
    await connectDB();

    await Roadmap.deleteMany({});
    await Roadmap.create(SOC_roadmap);

    console.log("Seed Success");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();
