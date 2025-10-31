// مدیریت صفحه پروفایل
document.addEventListener('DOMContentLoaded', function() {
    loadUserProfile();
    setupEditForm();
});

function loadUserProfile() {
    const user = getUserFromStorage();
    
    if (!user) {
        // اگر کاربر لاگین نکرده باشد، به صفحه ورود هدایت می‌شود
        window.location.href = 'login.html';
        return;
    }
    
    updateProfileDisplay(user);
}

function getUserFromStorage() {
    const userData = localStorage.getItem('currentUser');
    return userData ? JSON.parse(userData) : null;
}

function updateProfileDisplay(user) {
    // به روزرسانی اطلاعات پروفایل
    document.getElementById('profileName').textContent = user.fullname || 'نام کاربر';
    document.getElementById('profileUsername').textContent = `@${user.username}`;
    document.getElementById('avatarText').textContent = getInitials(user.fullname || user.username);
    
    // اطلاعات کامل
    document.getElementById('infoFullname').textContent = user.fullname || 'ثبت نشده';
    document.getElementById('infoUsername').textContent = user.username;
    document.getElementById('infoEmail').textContent = user.email;
    
    // تاریخ عضویت
    const joinDate = user.joinDate ? new Date(user.joinDate).toLocaleDateString('fa-IR') : '1402/01/01';
    document.getElementById('joinDate').textContent = joinDate;
    document.getElementById('infoJoinDate').textContent = joinDate;
    
    // آمار کاربر
    document.getElementById('totalScore').textContent = user.score || 0;
    document.getElementById('gamesPlayed').textContent = user.gamesPlayed || 0;
    document.getElementById('userRank').textContent = calculateRank(user.score || 0);
    
    // آمار بازی‌ها
    document.getElementById('popScore').textContent = user.popScore || 0;
    document.getElementById('popPlayed').textContent = user.popPlayed || 0;
    
    // به روزرسانی هدر
    updateHeaderForLoggedInUser(user);
}

function getInitials(name) {
    return name.split(' ').map(word => word[0]).join('').toUpperCase().substring(0, 2);
}

function calculateRank(score) {
    if (score >= 1000) return 'قهرمان';
    if (score >= 500) return 'حرفه‌ای';
    if (score >= 100) return 'متوسط';
    if (score >= 10) return 'تازه‌کار';
    return 'تازه‌وارد';
}

function openEditModal() {
    const user = getUserFromStorage();
    const modal = document.getElementById('editModal');
    
    document.getElementById('editFullname').value = user.fullname || '';
    document.getElementById('editEmail').value = user.email || '';
    
    modal.style.display = 'block';
}

function closeEditModal() {
    document.getElementById('editModal').style.display = 'none';
    document.getElementById('editForm').reset();
}

function setupEditForm() {
    const editForm = document.getElementById('editForm');
    if (editForm) {
        editForm.addEventListener('submit', function(e) {
            e.preventDefault();
            saveProfileChanges();
        });
    }
}

function saveProfileChanges() {
    const user = getUserFromStorage();
    const currentPassword = document.getElementById('currentPassword').value;
    
    // بررسی رمز عبور فعلی
    if (!currentPassword) {
        alert('لطفاً رمز عبور فعلی را وارد کنید');
        return;
    }
    
    // شبیه‌سازی بررسی رمز عبور
    if (currentPassword !== user.password) {
        alert('رمز عبور فعلی اشتباه است');
        return;
    }
    
    // به روزرسانی اطلاعات کاربر
    user.fullname = document.getElementById('editFullname').value;
    user.email = document.getElementById('editEmail').value;
    
    // ذخیره در localStorage
    localStorage.setItem('currentUser', JSON.stringify(user));
    
    // به روزرسانی لیست کاربران
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex(u => u.id === user.id);
    if (userIndex !== -1) {
        users[userIndex] = user;
        localStorage.setItem('users', JSON.stringify(users));
    }
    
    // به روزرسانی نمایش
    updateProfileDisplay(user);
    closeEditModal();
    alert('اطلاعات با موفقیت به روزرسانی شد');
}

// بستن مودال با کلیک خارج از آن
window.onclick = function(event) {
    const modal = document.getElementById('editModal');
    if (event.target === modal) {
        closeEditModal();
    }
}