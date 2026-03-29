const connectDB = require('../lib/connectDB');
const Guidance = require('../models/Guidance');

module.exports = async (req, res) => {
  // CORS 헤더
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  await connectDB();

  const { id } = req.query;

  // [GET] 단일 기록 조회
  if (req.method === 'GET') {
    try {
      const record = await Guidance.findById(id);
      if (!record) return res.status(404).json({ success: false, message: '기록을 찾을 수 없습니다.' });
      return res.json({ success: true, data: record });
    } catch (err) {
      return res.status(500).json({ success: false, message: '서버 오류가 발생했습니다.' });
    }
  }

  // [DELETE] 기록 삭제
  if (req.method === 'DELETE') {
    try {
      const record = await Guidance.findByIdAndDelete(id);
      if (!record) return res.status(404).json({ success: false, message: '기록을 찾을 수 없습니다.' });
      return res.json({ success: true, message: '삭제되었습니다.' });
    } catch (err) {
      return res.status(500).json({ success: false, message: '서버 오류가 발생했습니다.' });
    }
  }

  res.status(405).json({ success: false, message: '허용되지 않는 메서드입니다.' });
};
