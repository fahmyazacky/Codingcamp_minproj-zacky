// script.js - greeting + validasi form + tampilan output

// 1) Greeting — minta nama user 
(window.onload = function() {
  const greetingEl = document.getElementById('greeting');
  if (!greetingEl) return;

  // Cek apakah nama sudah disimpan di localStorage
  let savedName = localStorage.getItem('mp_name');
  if (!savedName) {
    // minta input nama
    const nama = prompt('Masukkan nama Anda:');
    if (nama && nama.trim() !== '') {
      savedName = nama.trim();
      localStorage.setItem('mp_name', savedName);
    }
  }

  if (savedName) {
    greetingEl.textContent = `Hi ${savedName}, selamat datang!`;
  } else {
    greetingEl.textContent = 'Hi, selamat datang!';
  }
})();

// 2) Form validation & output
(function formHandler() {
  const form = document.getElementById('messageForm');
  if (!form) return;

  const output = document.getElementById('output');
  const resetBtn = document.getElementById('resetBtn');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const msg = document.getElementById('msg').value.trim();

    // Validasi sederhana
    if (!name) {
      alert('Nama wajib diisi.');
      return;
    }
    if (!email) {
      alert('Email wajib diisi.');
      return;
    }
    // validasi format email sederhana
     const emailPattern = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
      alert('Format email tidak valid.');
      return;
    }
    if (!phone) {
      alert('Nomor telepon wajib diisi.');
      return;
    }
    if (!msg) {
      alert('Pesan tidak boleh kosong.');
      return;
    }

    // Tampilkan output (HTML aman karena berasal dari input sederhana)
    output.innerHTML = `
      <p><strong>Nama:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Telepon:</strong> ${escapeHtml(phone)}</p>
      <p><strong>Pesan:</strong><br/> ${escapeHtml(msg)}</p>
    `;

    // simpan nama ke localStorage agar greeting tetap
    localStorage.setItem('mp_name', name);

    // opsi: reset form setelah submit (jika mau)
    // form.reset();
  });

  resetBtn?.addEventListener('click', function () {
    form.reset();
    output.innerHTML = 'Belum ada data. Isi form lalu tekan <strong>Kirim</strong>.';
  });

  // helper untuk menghindari XSS sederhana
  function escapeHtml(unsafe) {
    return unsafe
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#039;');
  }
})();

// 3) set tahun footer on index (jika ada)
(function setYear() {
  const el = document.getElementById('year');
  if (el) el.textContent = new Date().getFullYear();
})();
