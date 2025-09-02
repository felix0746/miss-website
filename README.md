# 覓食網站 - Next.js 版本

這是「覓食網站」的 Next.js 重構版本，使用最新的 React 18 和 Next.js 15 技術。

## 🚀 技術特色

- **Next.js 15** - 最新的 React 框架
- **TypeScript** - 型別安全的 JavaScript
- **Tailwind CSS** - 實用優先的 CSS 框架
- **App Router** - Next.js 13+ 的新路由系統
- **Firebase** - 後端服務整合
- **Lucide React** - 現代化的圖示庫

## 📁 專案結構

```
src/
├── app/                    # App Router 頁面
│   ├── layout.tsx         # 根布局
│   ├── page.tsx           # 首頁
│   └── globals.css        # 全域樣式
├── components/             # 可重用的組件
├── lib/                   # 工具函數和配置
└── types/                 # TypeScript 型別定義
```

## 🛠️ 開發指令

```bash
# 安裝依賴
npm install

# 啟動開發伺服器
npm run dev

# 建置生產版本
npm run build

# 啟動生產伺服器
npm start

# 執行 ESLint 檢查
npm run lint
```

## 🌐 網站特色

### 已完成的頁面
- ✅ 首頁 (Hero、品牌故事、服務介紹)
- ✅ 響應式設計
- ✅ SEO 優化 (Meta 標籤、Open Graph)
- ✅ 圖片優化 (Next.js Image 組件)

### 待完成的頁面
- 🔄 關於我們頁面
- 🔄 服務頁面
- 🔄 案例展示頁面
- 🔄 新聞頁面
- 🔄 聯絡我們頁面
- 🔄 管理後台

## 🎨 設計系統

### 色彩配置
- 主色：紅色 (#DC2626)
- 輔助色：橙色 (#EA580C)
- 文字：深灰 (#111827)
- 背景：白色 (#FFFFFF)

### 字體
- 主要字體：Inter (Google Fonts)
- 支援繁體中文

### 組件樣式
- `.container` - 響應式容器
- `.section-title` - 區段標題
- `.btn-primary` - 主要按鈕
- `.btn-secondary` - 次要按鈕

## 📱 響應式設計

- 行動優先設計
- 支援所有螢幕尺寸
- 觸控友善的介面

## 🔍 SEO 優化

- 完整的 Meta 標籤
- Open Graph 支援
- Twitter Cards 支援
- 結構化資料準備
- 圖片 Alt 文字優化

## 🚀 部署

### 開發環境
```bash
npm run dev
# 訪問 http://localhost:3000
```

### 生產環境
```bash
npm run build
npm start
```

### 部署到 Vercel (推薦)
1. 推送到 GitHub
2. 在 Vercel 中導入專案
3. 自動部署

## 📈 效能優化

- 圖片自動優化
- 程式碼分割
- 靜態生成 (SSG)
- 服務端渲染 (SSR)

## 🔧 自訂配置

### Tailwind CSS
編輯 `tailwind.config.js` 來自訂設計系統

### Next.js
編輯 `next.config.ts` 來配置框架選項

## 📚 學習資源

- [Next.js 官方文檔](https://nextjs.org/docs)
- [Tailwind CSS 文檔](https://tailwindcss.com/docs)
- [React 官方文檔](https://react.dev)

## 🤝 貢獻

歡迎提交 Issue 和 Pull Request！

## 📄 授權

本專案為「覓食國際餐飲企業有限公司」所有。

---

**開發者注意事項：**
- 使用 `npm run dev` 啟動開發伺服器
- 修改程式碼會自動重新載入
- 檢查瀏覽器控制台是否有錯誤訊息
- 使用 TypeScript 確保程式碼品質
