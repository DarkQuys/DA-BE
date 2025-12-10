
const Roadmap = require('../models/Roadmap');

const getRoadmap = async (req, res) => {
  console.log("body", req.body.career)

  const roadmap = await Roadmap.findOne({ career: req.body.career });
  res.json(roadmap);
}


module.exports = { getRoadmap };