/* ========================= */
/* 覓食 MISS - 登入頁面 JavaScript */
/* ========================= */

// 系統狀態管理
const systemStatus = {
    firebase: 'connecting',
    auth: 'connecting',
    
    updateStatus(type, status) {
        this[type] = status;
        const statusDot = document.getElementById(`${type}-status`);
        if (statusDot) {
            statusDot.className = `status-dot ${status}`;
        }
    }
};

// 清除快取功能
function clearBrowserCache() {
    try {
        // 清除 localStorage
        localStorage.clear();
        
        // 清除 sessionStorage
        sessionStorage.clear();
        
        // 嘗試清除 IndexedDB
        if ('indexedDB' in window) {
            indexedDB.databases().then(databases => {
                databases.forEach(db => {
                    indexedDB.deleteDatabase(db.name);
                });
            });
        }
        
        alert('快取已清除，請重新整理頁面。');
        location.reload();
    } catch (error) {
        console.error('清除快取失敗:', error);
        alert('清除快取失敗，請手動清除瀏覽器快取。');
    }
}

// 使用 script.js 中的全域 firebaseReady Promise
// 來確保在 Firebase 初始化後才執行登入邏輯
firebaseReady.then(result => {
    // 檢查初始化過程中是否有錯誤
    if (result && result.error) {
        logger.reportError(result.error, "Firebase 初始化失敗");
        systemStatus.updateStatus('firebase', 'error');
        systemStatus.updateStatus('auth', 'error');
        
        const errorMessage = document.getElementById('login-error');
        if (errorMessage) {
            errorMessage.textContent = '系統初始化失敗，請檢查網路連線並刷新頁面重試。';
        }
        return;
    }
    
    // 此時 auth 物件保證可用
    logger.log("Firebase 已就緒，登入頁面功能已啟動。");
    systemStatus.updateStatus('firebase', 'connected');
    systemStatus.updateStatus('auth', 'connected');

    // DOM 元素
    const loginForm = document.getElementById('login-form');
    const errorMessage = document.getElementById('login-error');
    const loginBtn = document.getElementById('login-btn');

    // 監聽登入表單提交
    loginForm?.addEventListener('submit', async (e) => {
        e.preventDefault();
        errorMessage.textContent = ''; // 清除舊的錯誤訊息
        
        // 顯示載入狀態
        loginBtn.classList.add('loading');
        loginBtn.disabled = true;

        const email = loginForm.email.value;
        const password = loginForm.password.value;

        try {
            const userCredential = await auth.signInWithEmailAndPassword(email, password);
            logger.log('登入成功', userCredential);
            window.location.href = 'admin.html'; // 成功後導向後台
        } catch (error) {
            logger.reportError(error, '登入失敗');
            
            // 隱藏載入狀態
            loginBtn.classList.remove('loading');
            loginBtn.disabled = false;
            
            switch (error.code) {
                case 'auth/user-not-found':
                case 'auth/wrong-password':
                case 'auth/invalid-credential':
                    errorMessage.textContent = '登入失敗，請檢查您的電子郵件或密碼。';
                    break;
                case 'auth/invalid-email':
                    errorMessage.textContent = '電子郵件格式不正確。';
                    break;
                case 'auth/network-request-failed':
                    errorMessage.textContent = '網路連線失敗，請檢查您的網路連線。';
                    systemStatus.updateStatus('firebase', 'error');
                    break;
                case 'auth/too-many-requests':
                    errorMessage.textContent = '登入嘗試次數過多，請稍後再試。';
                    break;
                case 'auth/user-disabled':
                    errorMessage.textContent = '此帳號已被停用，請聯繫管理員。';
                    break;
                default:
                    errorMessage.textContent = `發生未知錯誤 (${error.code})，請稍後再試。`;
                    break;
            }
        }
    });

    // 監聽認證狀態變化，如果使用者已登入，直接跳轉
    auth.onAuthStateChanged(user => {
        if (user) {
            logger.log('使用者已登入，正在跳轉至後台...');
            window.location.href = 'admin.html';
        }
    });
    
    // 監聽網路狀態變化
    window.addEventListener('online', () => {
        logger.log('網路連線已恢復');
        systemStatus.updateStatus('firebase', 'connected');
        systemStatus.updateStatus('auth', 'connected');
    });
    
    window.addEventListener('offline', () => {
        logger.log('網路連線已中斷');
        systemStatus.updateStatus('firebase', 'error');
        systemStatus.updateStatus('auth', 'error');
    });
});

// 清除快取按鈕事件
document.getElementById('clear-cache-btn')?.addEventListener('click', clearBrowserCache);

// 頁面載入時的初始狀態
document.addEventListener('DOMContentLoaded', () => {
    // 檢查網路狀態
    if (!navigator.onLine) {
        systemStatus.updateStatus('firebase', 'error');
        systemStatus.updateStatus('auth', 'error');
    }
    
    // 自動聚焦到電子郵件欄位
    const emailInput = document.getElementById('email');
    if (emailInput) {
        emailInput.focus();
    }
}); 