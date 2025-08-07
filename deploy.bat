@echo off
echo ========================================
echo 覓食 MISS 網站部署工具
echo ========================================
echo.

echo 檢查 Node.js 是否已安裝...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js 未安裝
    echo 請前往 https://nodejs.org/ 下載並安裝 Node.js
    echo 安裝完成後重新執行此腳本
    pause
    exit /b 1
)

echo ✅ Node.js 已安裝
echo.

echo 檢查 Firebase CLI 是否已安裝...
firebase --version >nul 2>&1
if %errorlevel% neq 0 (
    echo 正在安裝 Firebase CLI...
    npm install -g firebase-tools
    if %errorlevel% neq 0 (
        echo ❌ Firebase CLI 安裝失敗
        pause
        exit /b 1
    )
)

echo ✅ Firebase CLI 已安裝
echo.

echo 檢查 Firebase 登入狀態...
firebase projects:list >nul 2>&1
if %errorlevel% neq 0 (
    echo 請在瀏覽器中登入 Firebase...
    firebase login
    if %errorlevel% neq 0 (
        echo ❌ Firebase 登入失敗
        pause
        exit /b 1
    )
)

echo ✅ Firebase 已登入
echo.

echo 開始部署到 Firebase...
echo 專案: miss-blog-backend-92eb6
echo.

firebase deploy --only hosting

if %errorlevel% equ 0 (
    echo.
    echo ✅ 部署成功！
    echo 您的網站已部署到 Firebase Hosting
    echo 網址: https://miss-blog-backend-92eb6.web.app
) else (
    echo.
    echo ❌ 部署失敗
    echo 請檢查錯誤訊息並重試
)

echo.
pause 