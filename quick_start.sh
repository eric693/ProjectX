#!/bin/bash

# ProjectX 快速啟動腳本
# 適用於 macOS/Linux

echo "🚀 ProjectX 快速啟動腳本"
echo "=========================="
echo ""

# 檢查是否在正確的目錄
if [ ! -d "frontend" ] || [ ! -d "backend" ]; then
    echo "❌ 錯誤: 請在 projectx 根目錄執行此腳本"
    exit 1
fi

# 函數：啟動後端
start_backend() {
    echo "📦 啟動後端..."
    cd backend
    
    # 檢查虛擬環境
    if [ ! -d "venv" ]; then
        echo "⚠️  虛擬環境不存在，正在創建..."
        python3 -m venv venv
        source venv/bin/activate
        pip install -r requirements.txt
    else
        source venv/bin/activate
    fi
    
    # 檢查 .env 檔案
    if [ ! -f ".env" ]; then
        echo "⚠️  .env 檔案不存在，請先設定環境變數！"
        echo "複製 .env.example 為 .env 並填入 OpenAI API Key"
        exit 1
    fi
    
    # 檢查資料庫
    if [ ! -f "projectx.db" ]; then
        echo "📊 初始化資料庫..."
        python3 -c "from app import app, db; app.app_context().push(); db.create_all()"
    fi
    
    echo "✅ 後端啟動在 http://localhost:5050"
    python3 app.py
}

# 函數：啟動前端
start_frontend() {
    echo "🎨 啟動前端..."
    cd frontend
    
    # 檢查 node_modules
    if [ ! -d "node_modules" ]; then
        echo "📦 安裝前端依賴..."
        npm install
    fi
    
    # 檢查 .env 檔案
    if [ ! -f ".env" ]; then
        echo "⚠️  前端 .env 不存在，使用預設值"
        cp .env.example .env
    fi
    
    echo "✅ 前端啟動在 http://localhost:3000"
    npm run dev
}

# 主選單
echo "請選擇啟動模式："
echo "1) 只啟動後端"
echo "2) 只啟動前端"
echo "3) 同時啟動前後端（推薦）"
echo "4) 完整安裝（首次使用）"
echo ""
read -p "請輸入選項 (1-4): " choice

case $choice in
    1)
        start_backend
        ;;
    2)
        start_frontend
        ;;
    3)
        echo "🚀 同時啟動前後端..."
        echo "後端將在背景執行"
        
        # 在背景啟動後端
        (cd backend && source venv/bin/activate && python3 app.py) &
        BACKEND_PID=$!
        
        echo "後端 PID: $BACKEND_PID"
        sleep 3
        
        # 前端在前景執行
        start_frontend
        
        # 清理背景程序
        trap "kill $BACKEND_PID" EXIT
        ;;
    4)
        echo "📦 完整安裝程序..."
        
        # 後端安裝
        echo "1️⃣ 安裝後端..."
        cd backend
        python3 -m venv venv
        source venv/bin/activate
        pip install -r requirements.txt
        
        if [ ! -f ".env" ]; then
            cp .env.example .env
            echo "⚠️  請編輯 backend/.env 並填入 OpenAI API Key"
            read -p "按 Enter 繼續..."
        fi
        
        python3 -c "from app import app, db; app.app_context().push(); db.create_all()"
        echo "✅ 後端安裝完成"
        cd ..
        
        # 前端安裝
        echo "2️⃣ 安裝前端..."
        cd frontend
        npm install
        
        if [ ! -f ".env" ]; then
            cp .env.example .env
        fi
        
        echo "✅ 前端安裝完成"
        cd ..
        
        echo ""
        echo "🎉 安裝完成！"
        echo "現在可以執行選項 3 來啟動應用程式"
        ;;
    *)
        echo "❌ 無效的選項"
        exit 1
        ;;
esac