
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

module.exports = { getRoadmap, getAllRoadmap };