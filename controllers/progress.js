
const Progress = require('../models/Progress');
const Roadmap = require('../models/Roadmap');

const createProgress = async (req, res) => {
  try {
    const { studentId, career, completedItems } = req.body;

    // Validate cơ bản
    if (!studentId || !career) {
      return res.status(400).json({ message: "studentId và career là bắt buộc" });
    }

    const newProgress = await Progress.create({
      studentId,
      career,
      completedItems: completedItems || []
    });

    res.status(201).json({
      message: "Tạo progress thành công",
      data: newProgress
    });
  } catch (err) {
    console.error("Error creating progress:", err);
    res.status(500).json({ message: "Lỗi server", error: err.message });
  }
};


const updateProgress = async (req, res) => {
    const { studentId, career, itemIndex } = req.body;

    let progress = await Progress.findOne({ studentId, career });

    if (!progress) {
        progress = await Progress.create({
            studentId,
            career,
            completedItems: [itemIndex]
        });
    } else {
        if (!progress.completedItems.includes(itemIndex)) {
            progress.completedItems.push(itemIndex);
        }
        progress.updatedAt = Date.now();
        await progress.save();
    }

    res.json({ success: true, progress });
}


// const getProgresStudent = async (req, res) => {
//     const { studentId, career } = req.params;

//     const progress = await Progress.findOne({ studentId, career });
//     const roadmap = await Roadmap.findOne({ career });

//     if (!progress) {
//         return res.json({
//             completed: 0,
//             total: roadmap.items.length,
//             percentage: 0
//         });
//     }

//     const completed = progress.completedItems.length;
//     const total = roadmap.items.length;

//     res.json({
//         completed,
//         total,
//         percentage: Math.round((completed / total) * 100),
//         completedItems: progress.completedItems
//     });
// }

const getProgressStudent = async (req, res) => {
  try {
    const { studentId, career } = req.params;

    // decode career (phòng khi có %20)
    //const decodedCareer = decodeURIComponent(career);

    // tìm roadmap trước
    const roadmap = await Roadmap.findOne({ career: career });

    if (!roadmap) {
      return res.status(404).json({
        message: "Roadmap not found for this career"
      });
    }

    // tìm progress
    const progress = await Progress.findOne({
      studentId,
      career
    });

    // nếu chưa có progress
    if (!progress) {
      return res.json({
        completed: 0,
        //total: roadmap.items.length,
        percentage: 0,
        completedItems: []
      });
    }

    const completed = progress.completedItems.length;
    //const total = roadmap.items.length;

    res.json({
      completed,
      //total,
      //percentage: total === 0 ? 0 : Math.round((completed / total) * 100),
      roadmap: roadmap,
      completedItems: progress.completedItems
    });
  } catch (err) {
    console.error("getProgresStudent error:", err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = { updateProgress, getProgressStudent, createProgress };