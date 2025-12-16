
const Roadmap = require('../models/Roadmap');

const getRoadmap = async (req, res) => {
  try {

    const trackIdFromParam = req.params.career;
    const track = await Roadmap.findOne({ career: trackIdFromParam });

    if (!track) {
      return res.status(404).json({ message: `Không tìm thấy lộ trình với ID: ${trackIdFromParam}` });
    }

    res.status(200).json(track);

  } catch (error) {
    console.error("Lỗi khi lấy Roadmap theo ID:", error);
    // Lỗi này có thể xảy ra nếu trackIdFromParam không hợp lệ
    res.status(500).json({
      message: 'Lỗi máy chủ nội bộ khi lấy lộ trình chi tiết.',
      error: error.message
    });
  }
}
const getAllRoadmap = async (req, res) => {
  try {
    // Lấy tất cả các document trong collection SOCTrack
    // Chọn lọc các trường cơ bản, loại bỏ mảng levels lớn để tối ưu hiệu suất khi liệt kê
    const tracks = await Roadmap.find();
    // Trả về dữ liệu
    res.status(200).json({
      count: tracks.length,
      data: tracks
    });
  } catch (error) {
    console.error("Lỗi khi lấy tất cả Roadmaps:", error);
    res.status(500).json({
      message: 'Lỗi máy chủ nội bộ khi lấy danh sách lộ trình.',
      error: error.message
    });
  }
}

/**
 * API: GET Roadmap theo Career và Lọc Levels
 * Route: GET /api/roadmaps/:career?level=2
 * * Lấy Roadmap theo career, sau đó chỉ trả về các levels >= mức yêu cầu.
 */
const getRoadmapByLevel = async (req, res) => {
    try {
        const careerSlug = req.params.career;
        const minLevel = req.query.level ? parseInt(req.query.level) : 0; // Lấy level từ query param, mặc định là 0

        if (isNaN(minLevel) || minLevel < 0) {
            return res.status(400).json({ message: 'Tham số level không hợp lệ.' });
        }

        // --- Sử dụng Aggregate Pipeline ---
        const pipeline = [
            // 1. $match: Tìm document Roadmap dựa trên trường 'career' (unique)
            { $match: { career: careerSlug } },

            // 2. $project: Lọc mảng 'levels'
            {
                $project: {
                    _id: 1,
                    career: 1,
                    name: 1,
                    description: 1,
                    version: 1,
                    createdAt: 1,
                    updatedAt: 1,
                    
                    // Lọc mảng levels: chỉ giữ lại các element có level >= minLevel
                    levels: {
                        $filter: {
                            input: '$levels',
                            as: 'levelItem',
                            // Điều kiện: levelItem.level >= minLevel
                            cond: { $gte: ['$$levelItem.level', minLevel] } 
                        }
                    }
                }
            }
        ];

        const result = await Roadmap.aggregate(pipeline);

        if (result.length === 0) {
            return res.status(404).json({ message: `Không tìm thấy lộ trình với career: ${careerSlug}` });
        }

        // Trả về kết quả (chỉ có 1 document duy nhất sau khi match)
        res.status(200).json(result[0]);

    } catch (error) {
        console.error("Lỗi khi lấy Roadmap theo Level:", error);
        res.status(500).json({ 
            message: 'Lỗi máy chủ nội bộ.',
            error: error.message 
        });
    }
};

module.exports = { getRoadmap, getAllRoadmap ,getRoadmapByLevel };