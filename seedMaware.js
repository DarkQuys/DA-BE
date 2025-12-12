const mongoose = require("mongoose");
const Roadmap = require("./models/Roadmap");
const connectDB = require('./config/db');
const Web_pentest = {
  "career": "malware_analyst",
  "name": "Lộ trình Malware Analyst",
  "description": "Lộ trình tập trung vào static analysis, dynamic analysis, unpacking/obfuscation và trích xuất IoC từ mã độc.",
  "version": "1.0",
  "levels": [
    {
      "level": 0,
      "slug": "malware-fundamentals",
      "name": "Giai đoạn 0 - Malware & Lab Setup",
      "goals": [
        "Phân biệt các loại malware: trojan, worm, ransomware, RAT,...",
        "Chuẩn bị môi trường phân tích an toàn (VM, snapshot, network isolation).",
        "Làm quen với các tool: VirusTotal, Hybrid Analysis, Any.Run."
      ],
      "labs": [
        {
          "platform": "CyberDefenders",
          "title": "Oski - CTI & Malware Investigation",
          "url": "https://cyberdefenders.org/blueteam-ctf-challenges/oski/"
        },
        {
          "platform": "CyberDefenders",
          "title": "Yellow RAT - Threat Intelligence Challenge",
          "url": "https://cyberdefenders.org/blueteam-ctf-challenges/yellow-rat/"
        }
      ]
    },
    {
      "level": 1,
      "slug": "static-analysis",
      "name": "Giai đoạn 1 - Static Analysis",
      "goals": [
        "Dùng strings, PE analysis, detect packer/basic obfuscation.",
        "Đọc import table, section, tìm hành vi khả nghi.",
        "Trích domain, IP, mutex, registry key từ file nhị phân."
      ],
      "labs": [
        {
          "platform": "CyberDefenders",
          "title": "RE101 - Beginner Malware Analysis",
          "url": "https://cyberdefenders.org/blueteam-ctf-challenges/re101/"
        },
        {
          "platform": "CyberDefenders",
          "title": "MSI - Malware Static Analysis",
          "url": "https://cyberdefenders.org/blueteam-ctf-challenges/msi/"
        }
      ]
    },
    {
      "level": 2,
      "slug": "dynamic-analysis",
      "name": "Giai đoạn 2 - Dynamic Analysis & Behavior",
      "goals": [
        "Phân tích hành vi malware trong sandbox/VM.",
        "Theo dõi process, file, registry, network khi mẫu chạy.",
        "Ghi lại full execution chain phục vụ hunting/detection."
      ],
      "labs": [
        {
          "platform": "CyberDefenders",
          "title": "Malware Traffic Analysis 2",
          "url": "https://cyberdefenders.org/blueteam-ctf-challenges/malware-traffic-analysis-2/"
        },
        {
          "platform": "CyberDefenders",
          "title": "Malware Traffic Analysis 6",
          "url": "https://cyberdefenders.org/blueteam-ctf-challenges/malware-traffic-analysis-6/"
        }
      ]
    },
    {
      "level": 3,
      "slug": "advanced-reverse-engineering",
      "name": "Giai đoạn 3 - Advanced Malware & Reporting",
      "goals": [
        "Reverse một số mẫu đã pack/obfuscate đơn giản.",
        "Hiểu flow mã nguồn ở mức function, control flow graph.",
        "Viết báo cáo malware analysis, mapping sang MITRE ATT&CK."
      ],
      "labs": [
        {
          "platform": "CyberDefenders",
          "title": "Malware Traffic Analysis 3",
          "url": "https://cyberdefenders.org/blueteam-ctf-challenges/malware-traffic-analysis-3/"
        },
        {
          "platform": "CyberDefenders",
          "title": "SpottedInTheWild - Incident & Malware Case",
          "url": "https://cyberdefenders.org/blueteam-ctf-challenges/spottedinthewild/"
        }
      ]
    }
  ]
}
    
    
async function seed() {
    try {
        await connectDB();

       // await Roadmap.deleteMany({});
        await Roadmap.create(Web_pentest);

        console.log("Seed Success");
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

seed();
