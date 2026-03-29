require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const Guidance = require('./models/Guidance');

const app = express();
const PORT = process.env.PORT || 3000;

// ─── 미들웨어 ───────────────────────────────────────
app.use(cors());
app.use(express.json());

// 정적 파일 (index.html, style.css, script.js) 제공
app.use(express.static(path.join(__dirname, 'public')));

// ─── MongoDB 연결 ────────────────────────────────────
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB Atlas 연결 성공'))
  .catch((err) => console.error('❌ MongoDB 연결 실패:', err.message));

// ─── API 라우트 ──────────────────────────────────────

// [POST] /api/guidance - 지도 기록 저장
app.post('/api/guidance', async (req, res) => {
  try {
    const { studentId, bokjang, electronic } = req.body;

    if (!studentId || studentId.trim() === '') {
      return res.status(400).json({ success: false, message: '학번을 입력해주세요.' });
    }

    const record = new Guidance({ studentId, bokjang, electronic });
    await record.save();

    res.status(201).json({ success: true, message: '저장되었습니다.', data: record });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: '서버 오류가 발생했습니다.' });
  }
});

// [GET] /api/guidance - 전체 기록 조회 (최신순)
app.get('/api/guidance', async (req, res) => {
  try {
    const records = await Guidance.find().sort({ createdAt: -1 });
    res.json({ success: true, data: records });
  } catch (err) {
    res.status(500).json({ success: false, message: '서버 오류가 발생했습니다.' });
  }
});

// [GET] /api/guidance/:id - 단일 기록 조회
app.get('/api/guidance/:id', async (req, res) => {
  try {
    const record = await Guidance.findById(req.params.id);
    if (!record) return res.status(404).json({ success: false, message: '기록을 찾을 수 없습니다.' });
    res.json({ success: true, data: record });
  } catch (err) {
    res.status(500).json({ success: false, message: '서버 오류가 발생했습니다.' });
  }
});

// [DELETE] /api/guidance/:id - 기록 삭제
app.delete('/api/guidance/:id', async (req, res) => {
  try {
    const record = await Guidance.findByIdAndDelete(req.params.id);
    if (!record) return res.status(404).json({ success: false, message: '기록을 찾을 수 없습니다.' });
    res.json({ success: true, message: '삭제되었습니다.' });
  } catch (err) {
    res.status(500).json({ success: false, message: '서버 오류가 발생했습니다.' });
  }
});

// ─── 서버 실행 ───────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🚀 서버 실행 중: http://localhost:${PORT}`);
});
