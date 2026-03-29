const mongoose = require('mongoose');

const guidanceSchema = new mongoose.Schema(
  {
    // 학생 정보
    studentId: {
      type: String,
      required: [true, '학번은 필수입니다.'],
      trim: true,
    },

    // 복장 단속
    bokjang: {
      gyobok: { type: Boolean, default: false },   // 교복 미착용 및 교복 변형
      silnae: { type: Boolean, default: false },   // 실내화 등교
      etcChecked: { type: Boolean, default: false },
      etcDetail: { type: String, default: '' },
    },

    // 전자기기 위반
    electronic: {
      mudan: { type: Boolean, default: false },    // 무단 전자기기 사용
      etcChecked: { type: Boolean, default: false },
      etcDetail: { type: String, default: '' },
    },
  },
  {
    timestamps: true, // createdAt, updatedAt 자동 생성
  }
);

module.exports = mongoose.model('Guidance', guidanceSchema);
