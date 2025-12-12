const mongoose = require("mongoose");
const Roadmap = require("./models/Roadmap");
const connectDB = require('./config/db');
const SOC_roadmap = {
  "career": "soc_analyst",
  "name": "Lộ trình SOC Analyst",
  "description": "Lộ trình cho SOC Analyst tập trung vào log, SIEM, triage alert, threat hunting và phối hợp incident response.",
  "version": "1.0",
  "levels": [
    {
      "level": 0,
      "slug": "soc-fundamentals",
      "name": "Giai đoạn 0 - SOC & Log Fundamentals",
      "goals": [
        "Hiểu mô hình SOC, vai trò Tier 1/2/3.",
        "Nắm các loại log cơ bản: Windows, Linux, network, web, email.",
        "Đọc được alert cơ bản từ SIEM."
      ],
      "labs": [
        {
          "platform": "BlueTeamLabs",
          "title": "The Report - Security Operations Challenge",
          "url": "https://blueteamlabs.online/home/challenge/the-report-a6dd340dba"
        },
        {
          "platform": "BlueTeamLabs",
          "title": "BEC KY - Email Investigation",
          "url": "https://blueteamlabs.online/home/investigation/bec-ky-d75e02a0dd"
        }
      ]
    },
    {
      "level": 1,
      "slug": "log-analysis-siem",
      "name": "Giai đoạn 1 - Log Analysis & SIEM 101",
      "goals": [
        "Phân tích log HTTP/Proxy, IDS/IPS, firewall.",
        "Lọc, tìm kiếm log trong SIEM (Splunk/Elastic/QRadar).",
        "Triage các alert liên quan đến tấn công web & network."
      ],
      "labs": [
        {
          "platform": "CyberDefenders",
          "title": "Web Investigation",
          "url": "https://cyberdefenders.org/blueteam-ctf-challenges/web-investigation/"
        },
        {
          "platform": "CyberDefenders",
          "title": "Malware Traffic Analysis 2",
          "url": "https://cyberdefenders.org/blueteam-ctf-challenges/malware-traffic-analysis-2/"
        }
      ]
    },
    {
      "level": 2,
      "slug": "endpoint-ad-monitoring",
      "name": "Giai đoạn 2 - Endpoint & Active Directory Monitoring",
      "goals": [
        "Đọc và phân tích Windows Event Logs, Sysmon, PowerShell logs.",
        "Theo dõi hành vi bất thường trên Active Directory.",
        "Sử dụng SIEM để điều tra lateral movement, privilege escalation."
      ],
      "labs": [
        {
          "platform": "CyberDefenders",
          "title": "FalconEye - Splunk Threat Hunting in AD Environment",
          "url": "https://cyberdefenders.org/blueteam-ctf-challenges/falconeye/"
        },
        {
          "platform": "CyberDefenders",
          "title": "BlackEnergy - Windows Memory & Event Analysis",
          "url": "https://cyberdefenders.org/blueteam-ctf-challenges/blackenergy/"
        }
      ]
    },
    {
      "level": 3,
      "slug": "threat-hunting-incident",
      "name": "Giai đoạn 3 - Threat Hunting & Incident Handling",
      "goals": [
        "Xây dựng use case / detection rule dựa trên MITRE ATT&CK.",
        "Thực hiện threat hunting trên log network/endpoint.",
        "Phối hợp cùng DFIR team trong quá trình incident response."
      ],
      "labs": [
        {
          "platform": "CyberDefenders",
          "title": "Malware Traffic Analysis 4",
          "url": "https://cyberdefenders.org/blueteam-ctf-challenges/malware-traffic-analysis-4/"
        },
        {
          "platform": "CyberDefenders",
          "title": "Malware Traffic Analysis 6",
          "url": "https://cyberdefenders.org/blueteam-ctf-challenges/malware-traffic-analysis-6/"
        }
      ]
    }
  ]
}

async function seed() {
  try {
    await connectDB();
    await Roadmap.create(SOC_roadmap);

    console.log("Seed Success");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();
