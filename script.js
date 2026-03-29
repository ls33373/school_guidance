function toggleOther(labelEl, targetId) {
    const checkbox = labelEl.querySelector('input[type="checkbox"]');
    const wrap = document.getElementById(targetId);
    // toggle happens after click default, so read new state
    setTimeout(() => {
    if (checkbox.checked) {
        wrap.classList.add('visible');
        wrap.querySelector('textarea').focus();
    } else {
        wrap.classList.remove('visible');
    }
    }, 0);
}

function handleSave() {
    const toast = document.getElementById('toast');
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2500);
}