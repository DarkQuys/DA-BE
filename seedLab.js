const mongoose = require("mongoose");
const Lab = require("./models/Labs");
const connectDB = require('./config/db');
const LabLibrary = require('./models/LabLibrary');
const Web_pentest = [
  {
    "id": 1,
    "title": "Linux Fundamentals",
    "platform": "HackTheBox",
    "category": "Fundamentals",
    "skill_tags": [
      "Linux",
      "CLI",
      "File System",
      "Permissions",
      "Processes"
    ],
    "difficulty": 1,
    "subject": "",
    "url": "https://academy.hackthebox.com/course/preview/linux-fundamentals",
    "description": "Module HTB Academy: Linux Fundamentals (nền tảng Hack The Box).",
    "description_detail": "Module 'Linux Fundamentals' thuộc nhóm Fundamentals trên HTB Academy (Hack The Box), mức Beginner/Fundamental. Nội dung chính: Linux, CLI, File System, Permissions, Processes. Kết quả mong đợi: nắm vững kiến thức nền tảng và thực hành theo hướng guided-learning để chuẩn bị cho các lab/box nâng cao. Link: https://academy.hackthebox.com/course/preview/linux-fundamentals"
  },
  {
    "id": 2,
    "title": "Introduction to Networking",
    "platform": "HackTheBox",
    "category": "Networking",
    "skill_tags": [
      "Networking",
      "TCP/IP",
      "OSI Model",
      "IP/Subnet",
      "Ports"
    ],
    "difficulty": 1,
    "subject": "",
    "url": "https://academy.hackthebox.com/course/preview/introduction-to-networking",
    "description": "Module HTB Academy: Introduction to Networking (nền tảng Hack The Box).",
    "description_detail": "Module 'Introduction to Networking' thuộc nhóm Networking trên HTB Academy (Hack The Box), mức Beginner/Fundamental. Nội dung chính: Networking, TCP/IP, OSI Model, IP/Subnet, Ports. Kết quả mong đợi: nắm vững kiến thức nền tảng và thực hành theo hướng guided-learning để chuẩn bị cho các lab/box nâng cao. Link: https://academy.hackthebox.com/course/preview/introduction-to-networking"
  },
  {
    "id": 3,
    "title": "Web Requests",
    "platform": "HackTheBox",
    "category": "Web Security",
    "skill_tags": [
      "HTTP",
      "Requests",
      "Headers",
      "cURL",
      "Web Basics"
    ],
    "difficulty": 1,
    "subject": "",
    "url": "https://academy.hackthebox.com/course/preview/web-requests",
    "description": "Module HTB Academy: Web Requests (nền tảng Hack The Box).",
    "description_detail": "Module 'Web Requests' thuộc nhóm Web Security trên HTB Academy (Hack The Box), mức Beginner/Fundamental. Nội dung chính: HTTP, Requests, Headers, cURL, Web Basics. Kết quả mong đợi: nắm vững kiến thức nền tảng và thực hành theo hướng guided-learning để chuẩn bị cho các lab/box nâng cao. Link: https://academy.hackthebox.com/course/preview/web-requests"
  },
  {
    "id": 4,
    "title": "Introduction to Web Applications",
    "platform": "HackTheBox",
    "category": "Web Security",
    "skill_tags": [
      "Web",
      "Client-Server",
      "Sessions",
      "Cookies",
      "Web Security Basics"
    ],
    "difficulty": 1,
    "subject": "",
    "url": "https://academy.hackthebox.com/course/preview/introduction-to-web-applications",
    "description": "Module HTB Academy: Introduction to Web Applications (nền tảng Hack The Box).",
    "description_detail": "Module 'Introduction to Web Applications' thuộc nhóm Web Security trên HTB Academy (Hack The Box), mức Beginner/Fundamental. Nội dung chính: Web, Client-Server, Sessions, Cookies, Web Security Basics. Kết quả mong đợi: nắm vững kiến thức nền tảng và thực hành theo hướng guided-learning để chuẩn bị cho các lab/box nâng cao. Link: https://academy.hackthebox.com/course/preview/introduction-to-web-applications"
  },
  {
    "id": 5,
    "title": "Network Enumeration with Nmap",
    "platform": "HackTheBox",
    "category": "Tooling",
    "skill_tags": [
      "Nmap",
      "Port Scanning",
      "Service Enumeration",
      "Host Discovery"
    ],
    "difficulty": 2,
    "subject": "",
    "url": "https://academy.hackthebox.com/course/preview/network-enumeration-with-nmap",
    "description": "Module HTB Academy: Network Enumeration with Nmap (nền tảng Hack The Box).",
    "description_detail": "Module 'Network Enumeration with Nmap' thuộc nhóm Tooling trên HTB Academy (Hack The Box), mức Easy. Nội dung chính: Nmap, Port Scanning, Service Enumeration, Host Discovery. Kết quả mong đợi: nắm vững kiến thức nền tảng và thực hành theo hướng guided-learning để chuẩn bị cho các lab/box nâng cao. Link: https://academy.hackthebox.com/course/preview/network-enumeration-with-nmap"
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
