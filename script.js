// ========================================
// SISTEM REKAM MEDIS ELEKTRONIK - JAVASCRIPT
// ========================================

/**
 * Fungsi untuk berpindah halaman/navigasi
 * @param {string} pageId - ID dari halaman yang akan ditampilkan
 */
function showPage(pageId) {
    // Sembunyikan semua halaman
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Tampilkan halaman yang dipilih
    document.getElementById(pageId).classList.add('active');
}

/**
 * Fungsi untuk logout dari sistem
 */
function logout() {
    if (confirm('Apakah Anda yakin ingin keluar?')) {
        // Reset form login
        document.getElementById('loginForm').reset();
        
        // Kembali ke halaman login
        showPage('loginPage');
    }
}

/**
 * Fungsi untuk mencari data pasien lama
 */
function searchPatient() {
    const searchValue = document.getElementById('searchPatient').value;
    
    if (searchValue) {
        // Simulasi pencarian data pasien dari database
        // Dalam implementasi nyata, ini akan melakukan AJAX request ke server
        
        // Data dummy untuk demo
        document.getElementById('foundRM').textContent = 'RM001';
        document.getElementById('foundName').textContent = 'Budi Santoso';
        document.getElementById('foundDOB').textContent = '15/05/1985';
        document.getElementById('foundGender').textContent = 'Laki-laki';
        document.getElementById('foundAddress').textContent = 'Jl. Merdeka No. 123, Jakarta Pusat';
        document.getElementById('foundPhone').textContent = '081234567890';
        
        // Tampilkan data pasien yang ditemukan
        document.getElementById('patientData').style.display = 'block';
    } else {
        alert('Masukkan No. RM atau Nama Pasien untuk mencari');
    }
}

/**
 * Event Listener untuk form login
 */
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Mencegah form reload halaman
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Validasi sederhana (dalam produksi gunakan autentikasi proper)
    if (username && password) {
        // Set username di semua halaman
        document.getElementById('loggedUser').textContent = username;
        document.getElementById('loggedUser2').textContent = username;
        document.getElementById('loggedUser3').textContent = username;
        
        // Pindah ke dashboard
        showPage('dashboardPage');
    } else {
        alert('Username dan password harus diisi!');
    }
});

/**
 * Event Listener untuk form pendaftaran pasien baru
 */
document.getElementById('newPatientForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Mencegah form reload halaman
    
    // Tampilkan pesan sukses
    const successMsg = document.getElementById('newPatientSuccess');
    successMsg.classList.add('show');
    
    // Dalam implementasi nyata, data akan dikirim ke server untuk disimpan
    // Contoh menggunakan AJAX:
    // fetch('/api/patients', {
    //     method: 'POST',
    //     body: JSON.stringify(formData)
    // })
    
    // Simulasi delay untuk melihat pesan sukses
    setTimeout(() => {
        successMsg.classList.remove('show');
        this.reset(); // Reset form
        showPage('dashboardPage'); // Kembali ke dashboard
    }, 2000);
});

/**
 * Event Listener untuk form pendaftaran pasien lama
 */
document.getElementById('existingPatientForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Mencegah form reload halaman
    
    // Tampilkan pesan sukses
    const successMsg = document.getElementById('existingPatientSuccess');
    successMsg.classList.add('show');
    
    // Dalam implementasi nyata, data akan dikirim ke server
    
    // Simulasi delay
    setTimeout(() => {
        successMsg.classList.remove('show');
        this.reset(); // Reset form
        document.getElementById('patientData').style.display = 'none';
        showPage('dashboardPage'); // Kembali ke dashboard
    }, 2000);
});

/**
 * Set tanggal hari ini untuk semua input tanggal
 */
window.addEventListener('DOMContentLoaded', function() {
    const today = new Date().toISOString().split('T')[0];
    
    document.querySelectorAll('input[type="date"]').forEach(input => {
        if (!input.value) {
            input.value = today;
        }
    });
});

/**
 * Fungsi untuk menambahkan pasien baru ke tabel (contoh fungsi tambahan)
 */
function addPatientToTable(patientData) {
    const tbody = document.getElementById('patientListBody');
    const row = tbody.insertRow();
    
    row.innerHTML = `
        <td>${patientData.rm}</td>
        <td>${patientData.name}</td>
        <td>${patientData.visitDate}</td>
        <td>${patientData.poli}</td>
        <td>${patientData.status}</td>
        <td>
            <div class="action-buttons">
                <button class="btn btn-small btn-view" onclick="viewPatient('${patientData.rm}')">Lihat</button>
                <button class="btn btn-small btn-edit" onclick="editPatient('${patientData.rm}')">Edit</button>
            </div>
        </td>
    `;
}

/**
 * Fungsi untuk melihat detail pasien
 * @param {string} rm - Nomor Rekam Medis
 */
function viewPatient(rm) {
    alert('Melihat detail pasien dengan No. RM: ' + rm);
    // Dalam implementasi nyata, akan menampilkan modal atau halaman detail
}

/**
 * Fungsi untuk edit data pasien
 * @param {string} rm - Nomor Rekam Medis
 */
function editPatient(rm) {
    alert('Edit data pasien dengan No. RM: ' + rm);
    // Dalam implementasi nyata, akan menampilkan form edit
}

/**
 * Fungsi untuk validasi form
 * @param {HTMLFormElement} form - Form element yang akan divalidasi
 * @returns {boolean} - True jika valid, false jika tidak
 */
function validateForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            isValid = false;
            field.style.borderColor = '#f44336';
        } else {
            field.style.borderColor = '#e0e0e0';
        }
    });
    
    return isValid;
}

/**
 * Fungsi untuk format tanggal Indonesia
 * @param {string} dateString - String tanggal format YYYY-MM-DD
 * @returns {string} - Tanggal format DD/MM/YYYY
 */
function formatDateIndonesia(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    
    return `${day}/${month}/${year}`;
}

/**
 * Fungsi untuk generate nomor rekam medis
 * @returns {string} - Nomor rekam medis baru
 */
function generateRM() {
    // Dalam implementasi nyata, akan mengambil dari database
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `RM${timestamp}${random}`;
}

// Console log untuk debugging
console.log('Sistem Rekam Medis Elektronik loaded successfully');
