const connectDB = require('../lib/connectDB');
const Guidance = require('../models/Guidance');

module.exports = async (req, res) => {
  // CORS 헤더
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  await connectDB();

  // [POST] 지도 기록 저장
  if (req.method === 'POST') {
    try {
      const { studentId, bokjang, electronic } = req.body;

      if (!studentId || studentId.trim() === '') {
        return res.status(400).json({ success: false, message: '학번을 입력해주세요.' });
      }

      const record = new Guidance({ studentId, bokjang, electronic });
      await record.save();

      return res.status(201).json({ success: true, message: '저장되었습니다.', data: record });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ success: false, message: '서버 오류가 발생했습니다.' });
    }
  }

  // [GET] 전체 기록 조회 (최신순)
  if (req.method === 'GET') {
    try {
      const records = await Guidance.find().sort({ createdAt: -1 });
      return res.json({ success: true, data: records });
    } catch (err) {
      return res.status(500).json({ success: false, message: '서버 오류가 발생했습니다.' });
    }
  }

  res.status(405).json({ success: false, message: '허용되지 않는 메서드입니다.' });
};
