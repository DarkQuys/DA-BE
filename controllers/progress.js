
const Progress = require('../models/Progress');
const Roadmap = require('../models/Roadmap');

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


const getProgresStudent = async (req, res) => {
    const { studentId, career } = req.params;

    const progress = await Progress.findOne({ studentId, career });
    const roadmap = await Roadmap.findOne({ career });

    if (!progress) {
        return res.json({
            completed: 0,
            total: roadmap.items.length,
            percentage: 0
        });
    }

    const completed = progress.completedItems.length;
    const total = roadmap.items.length;

    res.json({
        completed,
        total,
        percentage: Math.round((completed / total) * 100),
        completedItems: progress.completedItems
    });
}
module.exports = { updateProgress, getProgresStudent };