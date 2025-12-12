const mongoose = require("mongoose");
const Roadmap = require("./models/Roadmap");
const connectDB = require('./config/db');
const Web_pentest = {
  "career": "network_security",
  "name": "Lộ trình Network Security",
  "description": "Lộ trình tập trung vào nền tảng mạng, tấn công & phòng thủ ở tầng mạng, firewall/VPN và network forensics.",
  "version": "1.0",
  "levels": [
    {
      "level": 0,
      "slug": "net-fundamentals",
      "name": "Giai đoạn 0 - Network & Protocol Basics",
      "goals": [
        "Nắm mô hình OSI/TCP-IP, các giao thức cơ bản: ARP, IP, TCP, UDP, ICMP.",
        "Hiểu cách hoạt động routing, switching, NAT, basic firewall.",
        "Làm quen với Wireshark, tcpdump và cách đọc gói tin."
      ],
      "labs": [
        {
          "platform": "SEED Labs",
          "title": "TCP/IP Attack Lab",
          "url": "https://seedsecuritylabs.org/Labs_20.04/Files/TCP_Attacks/TCP_Attacks.pdf"
        },
        {
          "platform": "SEED Labs",
          "title": "Local DNS Attack Lab (overview in DNS Labs)",
          "url": "https://seedsecuritylabs.org/Labs_20.04/Networking/DNS/"
        }
      ]
    },
    {
      "level": 1,
      "slug": "network-attacks",
      "name": "Giai đoạn 1 - Network Attacks & Defense Basics",
      "goals": [
        "Thực hành các tấn công mạng cơ bản: ARP spoofing, TCP flooding, session hijacking (trong môi trường lab).",
        "Hiểu các kỹ thuật DNS spoofing/pharming ở LAN.",
        "Nhận diện dấu hiệu các tấn công này trong Wireshark/PCAP."
      ],
      "labs": [
        {
          "platform": "SEED Labs",
          "title": "TCP/IP Attack Lab (SYN Flooding, TCP Session Hijacking, etc.)",
          "url": "https://seedsecuritylabs.org/Labs_20.04/Files/TCP_Attacks/TCP_Attacks.pdf"
        },
        {
          "platform": "SEED Labs",
          "title": "Local DNS Attack Lab",
          "url": "https://seedsecuritylabs.org/Labs_20.04/Networking/DNS/"
        }
      ]
    },
    {
      "level": 2,
      "slug": "firewall-vpn-ids",
      "name": "Giai đoạn 2 - Firewall, VPN & IDS/IPS",
      "goals": [
        "Cấu hình và kiểm thử firewall (iptables, security groups) trong lab.",
        "Hiểu cách VPN hỗ trợ bypass firewall, tunneling và các rủi ro liên quan.",
        "Làm quen với IDS/IPS (Suricata/Snort) ở mức rule & alert cơ bản."
      ],
      "labs": [
        {
          "platform": "SEED Labs",
          "title": "Linux Firewall Exploration Lab",
          "url": "https://seedsecuritylabs.org/Labs_16.04/PDF/Firewall.pdf"
        },
        {
          "platform": "SEED Labs",
          "title": "Firewall Evasion Lab: Bypassing Firewalls using VPN",
          "url": "https://seedsecuritylabs.org/Labs_16.04/PDF/Firewall_VPN.pdf"
        }
      ]
    },
    {
      "level": 3,
      "slug": "network-forensics",
      "name": "Giai đoạn 3 - Network Forensics & Detection",
      "goals": [
        "Phân tích PCAP để dựng lại chuỗi tấn công (scan, exploit, C2, exfiltration).",
        "Sử dụng Wireshark, Brim/Zep, NetworkMiner để phân tích traffic.",
        "Kết nối dấu vết trong mạng với log/alert từ SIEM để phát hiện tấn công."
      ],
      "labs": [
        {
          "platform": "CyberDefenders",
          "title": "Malware Traffic Analysis 2",
          "url": "https://cyberdefenders.org/blueteam-ctf-challenges/malware-traffic-analysis-2/"
        },
        {
          "platform": "CyberDefenders",
          "title": "Web Investigation",
          "url": "https://cyberdefenders.org/blueteam-ctf-challenges/web-investigation/"
        }
      ]
    }
  ]
}
    
async function seed() {
    try {
        await connectDB();

        //await Roadmap.deleteMany({});
        await Roadmap.create(Web_pentest);

        console.log("Seed Success");
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

seed();
