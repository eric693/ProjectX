# ProjectX 完整安裝指南 🚀

## 📦 檔案清單

確保你有以下所有檔案：

### Frontend 前端檔案
```
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
```

### Backend 後端檔案
```
backend/
├── app.py
├── requirements.txt
└── .env.example
```

### 根目錄檔案
```
projectx/
├── .gitignore
└── README.md
```

---

## 🔧 步驟 1：建立專案結構

### 在 Windows:
```cmd
mkdir projectx
cd projectx
mkdir frontend
mkdir backend
cd frontend
mkdir src
cd ..
```

### 在 macOS/Linux:
```bash
mkdir -p projectx/{frontend/src,backend}
cd projectx
```

---

## 📝 步驟 2：複製所有檔案

### 2.1 前端檔案

#### frontend/package.json
複製我提供的 `file_1_package_json` 內容

#### frontend/vite.config.js
複製我提供的 `file_2_vite_config` 內容

#### frontend/tailwind.config.js
複製我提供的 `file_3_tailwind_config` 內容

#### frontend/postcss.config.js
複製我提供的 `file_4_postcss_config` 內容

#### frontend/index.html
複製我提供的 `file_5_index_html` 內容

#### frontend/src/index.css
複製我提供的 `file_6_index_css` 內容

#### frontend/src/main.jsx
複製我提供的 `file_7_main_jsx` 內容

#### frontend/src/App.jsx
**重要：** 複製我之前創建的 `projectx_modules` artifact 的完整內容

#### frontend/.env
複製 `file_8_env_example` 內容，並重命名為 `.env`

### 2.2 後端檔案

#### backend/requirements.txt
複製我提供的 `file_9_backend_requirements` 內容

#### backend/app.py
**重要：** 複製我之前創建的 `projectx_backend` artifact 的完整內容

#### backend/.env
複製 `file_10_backend_env` 內容，重命名為 `.env`，並填入你的 OpenAI API Key

### 2.3 根目錄檔案

#### .gitignore
複製我提供的 `file_11_gitignore` 內容

#### README.md
複製我提供的 `projectx_readme` artifact 內容

---

## ⚙️ 步驟 3：安裝依賴

### 3.1 安裝前端依賴

```bash
cd frontend
npm install
```

如果遇到錯誤，嘗試：
```bash
npm install --legacy-peer-deps
```

### 3.2 安裝後端依賴

```bash
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
```

---

## 🔑 步驟 4：設定環境變數

### 4.1 取得 OpenAI API Key

1. 前往 https://platform.openai.com/api-keys
2. 登入或註冊帳號
3. 點擊 "Create new secret key"
4. 複製 API Key（只會顯示一次！）

### 4.2 設定後端 .env

編輯 `backend/.env`：
```bash
OPENAI_API_KEY=sk-你的實際API密鑰
DATABASE_URL=sqlite:///projectx.db
JWT_SECRET_KEY=請改成一個隨機的長字串
FLASK_ENV=development
FLASK_DEBUG=True
CORS_ORIGINS=http://localhost:3000
```

### 4.3 設定前端 .env

編輯 `frontend/.env`：
```bash
VITE_API_URL=http://localhost:5050/api
VITE_APP_NAME=ProjectX
VITE_APP_VERSION=1.0.0
VITE_ENV=development
```

---

## 🗄️ 步驟 5：初始化資料庫

```bash
cd backend

# 確保虛擬環境已啟動
# 啟動 Python
python

# 在 Python console 中執行：
>>> from app import app, db
>>> with app.app_context():
...     db.create_all()
...     print("資料庫建立成功！")
>>> exit()
```

---

## 🚀 步驟 6：啟動應用程式

### 6.1 啟動後端（終端機 1）

```bash
cd backend

# 確保虛擬環境已啟動
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# 啟動 Flask
python app.py
```

你應該看到：
```
* Running on http://127.0.0.1:5050
```

### 6.2 啟動前端（終端機 2）

開啟**新的終端機視窗**：

```bash
cd frontend
npm run dev
```

你應該看到：
```
  VITE v5.0.8  ready in 500 ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
```

---

## 🎉 步驟 7：測試應用程式

1. 開啟瀏覽器
2. 前往 `http://localhost:3000`
3. 你應該會看到 ProjectX 的精美首頁！
4. 點擊 "開始使用" 進入應用程式

---

## 🐛 常見問題排除

### 問題 1：npm install 失敗

**解決方案：**
```bash
# 清除快取
npm cache clean --force

# 刪除 node_modules
rm -rf node_modules package-lock.json

# 重新安裝
npm install
```

### 問題 2：Python 依賴安裝失敗

**解決方案：**
```bash
# 升級 pip
python -m pip install --upgrade pip

# 個別安裝有問題的套件
pip install Flask==3.0.0
pip install openai==1.3.0
# ... 等等
```

### 問題 3：OpenAI API 錯誤

**檢查清單：**
- [ ] API Key 是否正確複製？
- [ ] API Key 是否有效？（未過期）
- [ ] OpenAI 帳戶是否有餘額？
- [ ] .env 檔案是否正確設定？

### 問題 4：資料庫錯誤

**解決方案：**
```bash
# 刪除舊資料庫
rm projectx.db

# 重新初始化
python
>>> from app import app, db
>>> with app.app_context():
...     db.create_all()
```

### 問題 5：CORS 錯誤

**解決方案：**
確保 `backend/.env` 中的 CORS_ORIGINS 包含前端網址：
```bash
CORS_ORIGINS=http://localhost:3000,http://localhost:5173
```

### 問題 6：Port 已被佔用

**解決方案：**
```bash
# 更改前端 port（vite.config.js）
server: {
  port: 3001,  # 改成其他 port
}

# 或終止佔用的程序（Windows）
netstat -ano | findstr :3000
taskkill /PID <PID編號> /F

# macOS/Linux
lsof -i :3000
kill -9 <PID>
```

---

## 📊 驗證安裝

### 測試後端 API

開啟瀏覽器或使用 curl：
```bash
curl http://localhost:5050/api/health
```

應該返回：
```json
{
  "status": "healthy",
  "timestamp": "2024-10-18T...",
  "version": "1.0.0"
}
```

### 測試前端

1. 訪問 http://localhost:3000
2. 檢查是否看到精美的首頁
3. 點擊 "開始使用"
4. 檢查是否看到儀表板

---

## 🎓 下一步

安裝成功後，你可以：

1. **註冊帳號** - 在應用程式中創建新帳號
2. **探索功能** - 試用 7 大模組
3. **查看文檔** - 閱讀 README.md 了解更多
4. **開始開發** - 根據需求客製化功能
5. **部署上線** - 參考 DEPLOYMENT.md 部署到生產環境

---

## 💡 開發建議

### 推薦的 IDE 設定

**VS Code 擴充套件：**
- Python
- Pylance
- ES7+ React/Redux/React-Native snippets
- Tailwind CSS IntelliSense
- ESLint
- Prettier

**設定檔案（.vscode/settings.json）：**
```json
{
  "editor.formatOnSave": true,
  "python.linting.enabled": true,
  "python.linting.pylintEnabled": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

### 推薦的開發工具

- **Postman** - 測試 API
- **DB Browser for SQLite** - 查看資料庫
- **React Developer Tools** - 除錯 React

---

## 📞 需要幫助？

如果遇到問題：

1. 檢查這份文檔的「常見問題排除」
2. 查看 GitHub Issues
3. 閱讀詳細的 API 文檔
4. 聯絡開發團隊

---

**恭喜！🎉 你的 ProjectX 已經準備好了！**

現在開始探索這個強大的 AI 學習平台吧！