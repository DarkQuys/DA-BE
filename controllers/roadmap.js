
const Roadmap = require('../models/Roadmap');




const getRoadmap =  async(req,res)=>{
    const roadmap = await Roadmap.findOne({ career: req.params.career });
  res.json(roadmap);
}


module.exports = { getRoadmap };