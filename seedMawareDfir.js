const mongoose = require("mongoose");
const Roadmap = require("./models/Roadmap");
const connectDB = require('./config/db');
const Web_pentest ={
  "career": "dfir",
  "name": "Lộ trình DFIR (Digital Forensics & Incident Response)",
  "description": "Lộ trình tập trung vào disk forensics, memory forensics, network forensics và quy trình IR end-to-end.",
  "version": "1.0",
  "levels": [
    {
      "level": 0,
      "slug": "dfir-fundamentals",
      "name": "Giai đoạn 0 - DFIR Fundamentals",
      "goals": [
        "Hiểu khái niệm DFIR, chain of custody, evidence handling.",
        "Nắm các loại bằng chứng: disk image, memory dump, PCAP, log.",
        "Làm quen với công cụ: FTK Imager, Autopsy, CyberChef."
      ],
      "labs": [
        {
          "platform": "CyberDefenders",
          "title": "Insider - Linux Disk Forensics",
          "url": "https://cyberdefenders.org/blueteam-ctf-challenges/insider/"
        },
        {
          "platform": "CyberDefenders",
          "title": "EscapeRoom - PCAP Forensics",
          "url": "https://cyberdefenders.org/blueteam-ctf-challenges/escaperoom/"
        }
      ]
    },
    {
      "level": 1,
      "slug": "windows-disk-forensics",
      "name": "Giai đoạn 1 - Windows Disk Forensics",
      "goals": [
        "Phân tích file system, registry, prefetch, shortcut, browser artifacts.",
        "Dựng timeline hoạt động trên máy nạn nhân.",
        "Xác định vector xâm nhập & persistence cơ bản."
      ],
      "labs": [
        {
          "platform": "CyberDefenders",
          "title": "SpottedInTheWild - Windows DFIR Case",
          "url": "https://cyberdefenders.org/blueteam-ctf-challenges/spottedinthewild/"
        },
        {
          "platform": "CyberDefenders",
          "title": "DeepDive - Windows Forensics & Hidden Process",
          "url": "https://cyberdefenders.org/blueteam-ctf-challenges/deepdive/"
        }
      ]
    },
    {
      "level": 2,
      "slug": "memory-forensics",
      "name": "Giai đoạn 2 - Memory Forensics",
      "goals": [
        "Sử dụng Volatility/Volatility3 phân tích memory dump.",
        "Tìm process ẩn, injected code, network connections trong RAM.",
        "Trích xuất IoC phục vụ hunting & detection."
      ],
      "labs": [
        {
          "platform": "CyberDefenders",
          "title": "DumpMe - Windows Memory Analysis",
          "url": "https://cyberdefenders.org/labs/65"
        },
        {
          "platform": "CyberDefenders",
          "title": "BlackEnergy - Windows Memory Case",
          "url": "https://cyberdefenders.org/blueteam-ctf-challenges/blackenergy/"
        }
      ]
    },
    {
      "level": 3,
      "slug": "network-forensics",
      "name": "Giai đoạn 3 - Network Forensics & Full IR",
      "goals": [
        "Phân tích PCAP tìm chuỗi tấn công (exploit kit, C2, exfiltration).",
        "Kết hợp disk + memory + network để dựng full incident timeline.",
        "Viết báo cáo DFIR với IoC, MITRE mapping và khuyến nghị."
      ],
      "labs": [
        {
          "platform": "CyberDefenders",
          "title": "Malware Traffic Analysis 3",
          "url": "https://cyberdefenders.org/blueteam-ctf-challenges/malware-traffic-analysis-3/"
        },
        {
          "platform": "CyberDefenders",
          "title": "Malware Traffic Analysis 4",
          "url": "https://cyberdefenders.org/blueteam-ctf-challenges/malware-traffic-analysis-4/"
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
