// ─── 기타 입력란 토글 ────────────────────────────────
function toggleOther(labelEl, targetId) {
  const checkbox = labelEl.querySelector('input[type="checkbox"]');
  const wrap = document.getElementById(targetId);
  setTimeout(() => {
    if (checkbox.checked) {
      wrap.classList.add('visible');
      wrap.querySelector('textarea').focus();
    } else {
      wrap.classList.remove('visible');
      wrap.querySelector('textarea').value = '';
    }
  }, 0);
}

// ─── 저장 ────────────────────────────────────────────
async function handleSave() {
  const studentId = document.getElementById('studentId').value.trim();

  if (!studentId) {
    showToast('❗ 학번을 입력해주세요.', true);
    return;
  }

  // 복장 단속 데이터 수집
  const bokjang = {
    gyobok:     document.getElementById('chk-gyobok').checked,
    silnae:     document.getElementById('chk-silnae').checked,
    etcChecked: document.getElementById('chk-bokjang-etc').checked,
    etcDetail:  document.getElementById('txt-bokjang-etc').value.trim(),
  };

  // 전자기기 위반 데이터 수집
  const electronic = {
    mudan:      document.getElementById('chk-mudan').checked,
    etcChecked: document.getElementById('chk-elec-etc').checked,
    etcDetail:  document.getElementById('txt-elec-etc').value.trim(),
  };

  try {
    const res = await fetch('/api/guidance', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ studentId, bokjang, electronic }),
    });

    const result = await res.json();

    if (result.success) {
      showToast('✅ 지도 내용이 저장되었습니다.');
      resetForm();
    } else {
      showToast('❗ ' + result.message, true);
    }
  } catch (err) {
    showToast('❗ 서버 연결에 실패했습니다.', true);
    console.error(err);
  }
}

// ─── 폼 초기화 ───────────────────────────────────────
function resetForm() {
  document.getElementById('studentId').value = '';

  // 모든 체크박스 해제
  document.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);

  // 기타 입력란 닫기
  document.querySelectorAll('.other-input-wrap').forEach(wrap => {
    wrap.classList.remove('visible');
    wrap.querySelector('textarea').value = '';
  });
}

// ─── 토스트 메시지 ───────────────────────────────────
function showToast(message, isError = false) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.style.background = isError ? '#c0392b' : '#2C2C2C';
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2500);
}
