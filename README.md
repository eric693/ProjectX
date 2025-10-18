# ProjectX 完整安裝指南

## 檔案清單

確保你有以下所有檔案：

### Frontend 前端檔案
frontend/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── .env.example
└── src/
    ├── main.jsx
    ├── App.jsx
    └── index.css

### Backend 後端檔案
backend/
├── app.py
├── requirements.txt
└── .env.example

### 根目錄檔案
projectx/
├── .gitignore
└── README.md

---

## 步驟 1：建立專案結構

Windows:
mkdir projectx
cd projectx
mkdir frontend
mkdir backend
cd frontend
mkdir src
cd ..

macOS/Linux:
mkdir -p projectx/{frontend/src,backend}
cd projectx

---

## 步驟 2：複製所有檔案

### 前端檔案

1. frontend/package.json
2. frontend/vite.config.js
3. frontend/tailwind.config.js
4. frontend/postcss.config.js
5. frontend/index.html
6. frontend/src/index.css
7. frontend/src/main.jsx
8. frontend/src/App.jsx
9. frontend/.env（從 .env.example 複製並修改）

### 後端檔案

1. backend/requirements.txt
2. backend/app.py
3. backend/.env（從 .env.example 複製並填入 API Key）

### 根目錄檔案

1. .gitignore
2. README.md

---

## 步驟 3：安裝依賴

### 安裝前端依賴

cd frontend
npm install

遇到錯誤時：
npm install --legacy-peer-deps

### 安裝後端依賴

cd ../backend

# 建立虛擬環境
python -m venv venv

# 啟動虛擬環境
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# 安裝依賴
pip install -r requirements.txt

---

## 步驟 4：設定環境變數

### 取得 OpenAI API Key

1. 前往 https://platform.openai.com/api-keys
2. 登入或註冊帳號
3. 建立新的 API Key
4. 複製 API Key

### 設定後端 .env

編輯 backend/.env：
OPENAI_API_KEY=your-api-key-here
DATABASE_URL=sqlite:///projectx.db
JWT_SECRET_KEY=change-this-to-random-string
FLASK_ENV=development
FLASK_DEBUG=True
CORS_ORIGINS=http://localhost:3000

### 設定前端 .env

編輯 frontend/.env：
VITE_API_URL=http://localhost:5050/api
VITE_APP_NAME=ProjectX
VITE_APP_VERSION=1.0.0
VITE_ENV=development

---

## 步驟 5：初始化資料庫

cd backend

# 確保虛擬環境已啟動
python

# 在 Python console 執行：
>>> from app import app, db
>>> with app.app_context():
...     db.create_all()
...     print("資料庫建立成功")
>>> exit()

---

## 步驟 6：啟動應用程式

### 啟動後端（終端機 1）

cd backend

# 啟動虛擬環境
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# 啟動 Flask
python app.py

應該顯示：
* Running on http://127.0.0.1:5050

### 啟動前端（終端機 2）

開啟新的終端機：

cd frontend
npm run dev

應該顯示：
  VITE v5.0.8  ready in 500 ms
  Local:   http://localhost:3000/

---

## 步驟 7：測試應用程式

1. 開啟瀏覽器
2. 前往 http://localhost:3000
3. 應該看到 ProjectX 首頁
4. 點擊「開始使用」進入系統

---

## 常見問題排除

### npm install 失敗

# 清除快取
npm cache clean --force

# 刪除 node_modules
rm -rf node_modules package-lock.json

# 重新安裝
npm install

### Python 依賴安裝失敗

# 升級 pip
python -m pip install --upgrade pip

# 個別安裝
pip install Flask==3.0.0
pip install openai==1.3.0

### OpenAI API 錯誤

檢查項目：
- API Key 是否正確
- API Key 是否有效
- OpenAI 帳戶餘額
- .env 檔案設定

### 資料庫錯誤

# 刪除舊資料庫
rm projectx.db

# 重新初始化
python
>>> from app import app, db
>>> with app.app_context():
...     db.create_all()

### CORS 錯誤

確保 backend/.env 中包含前端網址：
CORS_ORIGINS=http://localhost:3000,http://localhost:5173

### Port 已被佔用

# 更改 port（vite.config.js）
server: {
  port: 3001
}

# 終止佔用程序
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :3000
kill -9 <PID>

---

## 驗證安裝

### 測試後端 API

curl http://localhost:5050/api/health

正常回應：
{
  "status": "healthy",
  "timestamp": "2024-10-18T...",
  "version": "1.0.0"
}

### 測試前端

1. 訪問 http://localhost:3000
2. 檢查首頁顯示
3. 測試功能模組
4. 確認無錯誤訊息

---

## 開發工具建議

VS Code 擴充套件：
- Python
- Pylance
- ES7+ React/Redux/React-Native snippets
- Tailwind CSS IntelliSense
- ESLint
- Prettier

其他工具：
- Postman - API 測試
- DB Browser for SQLite - 資料庫管理
- React Developer Tools - React 除錯

---

## 功能說明

ProjectX 包含以下模組：

1. 智慧考試準備系統
   - 自動生成試題
   - 弱點分析
   - 倒數計時
   - 壓力管理

2. 多模態學習助手
   - 圖片內容分析
   - 筆記辨識整理
   - 影片摘要生成
   - 概念圖繪製

3. AI 寫作助手
   - 論文結構建議
   - 文法風格改進
   - 抄襲檢測
   - 引用格式化

4. 程式學習平台
   - 程式碼除錯
   - 演算法視覺化
   - 專案創意生成
   - 品質分析

5. 語言學習系統
   - AI 對話練習
   - 發音評分
   - 情境模擬
   - 文化學習

6. 心智健康助手
   - 壓力檢測
   - 情緒分析
   - 冥想引導
   - 作息優化

7. 職涯探索工具
   - 技能分析
   - 履歷優化
   - 面試練習
   - 路徑推薦

---

## 技術架構

前端：
- React 18
- Tailwind CSS
- Vite
- Lucide Icons

後端：
- Python Flask
- SQLAlchemy
- JWT 認證
- OpenAI API

資料庫：
- SQLite（開發）
- PostgreSQL（生產）

---

安裝完成後即可開始使用 ProjectX。