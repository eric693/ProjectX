import React, { useState } from 'react';
import { 
  BookOpen, Brain, FileText, Code, MessageSquare, Heart, Briefcase,
  Home, Settings, User, LogOut, ChevronRight, Check, X, Play, Pause,
  Upload, Download, Send, Mic, Save, RefreshCw, TrendingUp, Award,
  Clock, Calendar, Target, BarChart, PieChart, Activity, Zap, Menu
} from 'lucide-react';

const App = () => {
  const [currentModule, setCurrentModule] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // ==================== 模組 1: 智慧考試準備系統 ====================
  const ExamModule = () => {
    const [examConfig, setExamConfig] = useState({
      subject: '',
      questionCount: 10,
      difficulty: 'medium'
    });
    const [examStarted, setExamStarted] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [score, setScore] = useState(null);
    const [userAnswers, setUserAnswers] = useState([]);

    const mockQuestions = [
      {
        question: "JavaScript 中 'let' 和 'var' 的主要差別是什麼？",
        options: ['作用域不同', '性能不同', '語法不同', '沒有差別'],
        correct: 0
      },
      {
        question: "React Hook 'useState' 的主要用途是什麼？",
        options: ['管理路由', '管理狀態', '管理樣式', '管理API'],
        correct: 1
      }
    ];

    const handleStartExam = () => {
      if (!examConfig.subject) {
        alert('請輸入科目');
        return;
      }
      setExamStarted(true);
      setCurrentQuestion(0);
      setUserAnswers([]);
      setScore(null);
    };

    const handleAnswerSelect = (index) => {
      setSelectedAnswer(index);
    };

    const handleNextQuestion = () => {
      const newAnswers = [...userAnswers];
      newAnswers[currentQuestion] = selectedAnswer;
      setUserAnswers(newAnswers);
      setSelectedAnswer(null);

      if (currentQuestion < mockQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        // 計算分數
        let correct = 0;
        mockQuestions.forEach((q, idx) => {
          if (newAnswers[idx] === q.correct) correct++;
        });
        setScore((correct / mockQuestions.length * 100).toFixed(0));
        setExamStarted(false);
      }
    };

    const handlePrevQuestion = () => {
      if (currentQuestion > 0) {
        setCurrentQuestion(currentQuestion - 1);
        setSelectedAnswer(userAnswers[currentQuestion - 1] || null);
      }
    };

    if (score !== null) {
      return (
        <div className="space-y-6">
          <div className="bg-slate-800 rounded-xl p-8 border border-blue-500/20 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">測驗完成！</h2>
            <div className="text-6xl font-bold text-green-400 mb-4">{score}%</div>
            <p className="text-gray-400 mb-6">你答對了 {userAnswers.filter((a, i) => a === mockQuestions[i].correct).length} / {mockQuestions.length} 題</p>
            <button 
              onClick={() => {
                setScore(null);
                setExamStarted(false);
                setCurrentQuestion(0);
                setUserAnswers([]);
              }}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg font-semibold hover:shadow-lg transition"
            >
              重新測驗
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white">智慧考試準備系統</h2>
          <button 
            onClick={handleStartExam}
            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg hover:shadow-lg transition"
          >
            開始新測驗
          </button>
        </div>

        {!examStarted ? (
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-slate-800 rounded-xl p-6 border border-blue-500/20">
              <h3 className="text-xl font-bold text-white mb-4">建立測驗</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-300 mb-2">科目</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-blue-500 outline-none"
                    placeholder="例如：JavaScript、數學、英文"
                    value={examConfig.subject}
                    onChange={(e) => setExamConfig({...examConfig, subject: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">題數: {examConfig.questionCount}</label>
                  <input
                    type="range"
                    min="5"
                    max="50"
                    value={examConfig.questionCount}
                    onChange={(e) => setExamConfig({...examConfig, questionCount: e.target.value})}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">難度</label>
                  <select 
                    className="w-full px-4 py-2 bg-slate-700 text-white rounded-lg border border-slate-600"
                    value={examConfig.difficulty}
                    onChange={(e) => setExamConfig({...examConfig, difficulty: e.target.value})}
                  >
                    <option value="easy">簡單</option>
                    <option value="medium">中等</option>
                    <option value="hard">困難</option>
                  </select>
                </div>
                <button 
                  onClick={handleStartExam}
                  className="w-full py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg font-semibold hover:shadow-lg transition"
                >
                  生成測驗
                </button>
              </div>
            </div>

            <div className="bg-slate-800 rounded-xl p-6 border border-blue-500/20">
              <h3 className="text-xl font-bold text-white mb-4">測驗歷史</h3>
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-slate-700/50 rounded-lg p-4 flex justify-between items-center">
                    <div>
                      <div className="font-semibold text-white">JavaScript 基礎</div>
                      <div className="text-sm text-gray-400">2024-10-18 • 20 題</div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-400">85%</div>
                      <div className="text-xs text-gray-400">17/20 正確</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="md:col-span-2 bg-slate-800 rounded-xl p-6 border border-blue-500/20">
              <h3 className="text-xl font-bold text-white mb-4">弱點分析與建議</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                  <div className="text-red-400 font-semibold mb-2">需要加強</div>
                  <div className="text-sm text-gray-300">閉包 (Closure)</div>
                  <div className="text-sm text-gray-300">非同步處理</div>
                </div>
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                  <div className="text-yellow-400 font-semibold mb-2">持續練習</div>
                  <div className="text-sm text-gray-300">Promise</div>
                  <div className="text-sm text-gray-300">Array Methods</div>
                </div>
                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                  <div className="text-green-400 font-semibold mb-2">掌握良好</div>
                  <div className="text-sm text-gray-300">變數宣告</div>
                  <div className="text-sm text-gray-300">函式基礎</div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-slate-800 rounded-xl p-8 border border-blue-500/20">
            <div className="mb-6">
              <div className="flex justify-between text-sm text-gray-400 mb-2">
                <span>題目 {currentQuestion + 1} / {mockQuestions.length}</span>
                <span>剩餘時間: 15:30</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full transition-all"
                  style={{ width: `${((currentQuestion + 1) / mockQuestions.length) * 100}%` }}
                />
              </div>
            </div>

            <h3 className="text-2xl font-bold text-white mb-6">
              {mockQuestions[currentQuestion].question}
            </h3>

            <div className="space-y-3 mb-6">
              {mockQuestions[currentQuestion].options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswerSelect(idx)}
                  className={`w-full text-left px-6 py-4 text-white rounded-lg border transition ${
                    selectedAnswer === idx
                      ? 'bg-blue-500 border-blue-400'
                      : 'bg-slate-700 border-slate-600 hover:bg-slate-600 hover:border-blue-500'
                  }`}
                >
                  <span className="font-semibold mr-3">{String.fromCharCode(65 + idx)}.</span>
                  {option}
                </button>
              ))}
            </div>

            <div className="flex gap-4">
              <button 
                onClick={handlePrevQuestion}
                disabled={currentQuestion === 0}
                className="px-6 py-3 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                上一題
              </button>
              <button 
                onClick={handleNextQuestion}
                disabled={selectedAnswer === null}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg font-semibold hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {currentQuestion === mockQuestions.length - 1 ? '完成測驗' : '下一題'}
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  // ==================== 模組 2: 多模態學習助手 ====================
  const MultimodalModule = () => {
    const [notes, setNotes] = useState([
      { id: 1, title: 'React Hooks 筆記', content: '探討 useState 和 useEffect 的使用時機...', date: '2024-10-18' },
      { id: 2, title: 'JavaScript ES6', content: '箭頭函數、解構賦值等新特性...', date: '2024-10-17' },
    ]);
    const [activeTab, setActiveTab] = useState('文字筆記');
    const [noteTitle, setNoteTitle] = useState('');
    const [noteContent, setNoteContent] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);

    const handleSaveNote = () => {
      if (!noteTitle || !noteContent) {
        alert('請填寫標題和內容');
        return;
      }

      const newNote = {
        id: notes.length + 1,
        title: noteTitle,
        content: noteContent,
        date: new Date().toISOString().split('T')[0]
      };

      setNotes([newNote, ...notes]);
      setNoteTitle('');
      setNoteContent('');
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    };

    const handleAISummary = () => {
      if (!noteContent) {
        alert('請先輸入內容');
        return;
      }
      alert('AI 摘要功能：' + noteContent.substring(0, 50) + '...');
    };

    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-white">多模態學習助手</h2>

        {showSuccess && (
          <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-4 text-green-300">
            筆記已成功儲存！
          </div>
        )}

        <div className="flex gap-2 border-b border-slate-700">
          {['文字筆記', '圖片分析', '影片摘要', '手寫辨識'].map((tab) => (
            <button
              key={tab}
              className={`px-6 py-3 font-semibold transition ${
                activeTab === tab 
                  ? 'text-purple-400 border-b-2 border-purple-400' 
                  : 'text-gray-400 hover:text-white'
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-slate-800 rounded-xl p-6 border border-purple-500/20">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-white">新增筆記</h3>
              <div className="flex gap-2">
                <button 
                  onClick={() => alert('上傳功能開發中')}
                  className="p-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition"
                >
                  <Upload className="w-5 h-5 text-white" />
                </button>
                <button 
                  onClick={() => alert('語音輸入功能開發中')}
                  className="p-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition"
                >
                  <Mic className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>

            <input
              type="text"
              placeholder="筆記標題"
              value={noteTitle}
              onChange={(e) => setNoteTitle(e.target.value)}
              className="w-full px-4 py-2 mb-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-purple-500 outline-none"
            />

            <textarea
              placeholder="開始記錄你的學習內容..."
              rows="10"
              value={noteContent}
              onChange={(e) => setNoteContent(e.target.value)}
              className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-purple-500 outline-none resize-none"
            />

            <div className="flex gap-3 mt-4">
              <button 
                onClick={handleSaveNote}
                className="flex-1 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:shadow-lg transition"
              >
                <Save className="inline w-5 h-5 mr-2" />
                儲存筆記
              </button>
              <button 
                onClick={handleAISummary}
                className="px-6 py-3 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition"
              >
                AI 摘要
              </button>
            </div>
          </div>

          <div className="bg-slate-800 rounded-xl p-6 border border-purple-500/20">
            <h3 className="text-xl font-bold text-white mb-4">AI 智慧分析</h3>
            <div className="space-y-4">
              <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                <div className="font-semibold text-purple-300 mb-2">自動摘要</div>
                <div className="text-sm text-gray-300">
                  {noteContent ? noteContent.substring(0, 100) + '...' : '請先輸入筆記內容'}
                </div>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <div className="font-semibold text-blue-300 mb-2">關鍵字提取</div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {['React', 'Hooks', 'useState', 'useEffect', 'Component'].map((tag) => (
                    <span key={tag} className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                <div className="font-semibold text-green-300 mb-2">學習建議</div>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>建議搭配實作練習加深理解</li>
                  <li>可以進一步學習 useContext</li>
                  <li>複習 JavaScript 閉包概念</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-slate-800 rounded-xl p-6 border border-purple-500/20">
          <h3 className="text-xl font-bold text-white mb-4">最近筆記</h3>
          <div className="grid md:grid-cols-3 gap-4">
            {notes.map((note) => (
              <div 
                key={note.id} 
                className="bg-slate-700/50 rounded-lg p-4 hover:bg-slate-700 transition cursor-pointer"
                onClick={() => {
                  setNoteTitle(note.title);
                  setNoteContent(note.content);
                }}
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-white">{note.title}</h4>
                  <Brain className="w-5 h-5 text-purple-400" />
                </div>
                <p className="text-sm text-gray-400 mb-3">{note.content.substring(0, 60)}...</p>
                <div className="flex justify-between items-center text-xs text-gray-500">
                  <span>{note.date}</span>
                  <span>5 分鐘閱讀</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // ==================== 模組 3: AI 寫作助手 ====================
  const WritingModule = () => {
    const [writingText, setWritingText] = useState('');
    const [writingTitle, setWritingTitle] = useState('');
    const [analyzing, setAnalyzing] = useState(false);

    const handleAnalyze = () => {
      if (!writingText) {
        alert('請先輸入文章內容');
        return;
      }
      setAnalyzing(true);
      setTimeout(() => {
        setAnalyzing(false);
        alert('AI 分析完成！文法正確率: 98%');
      }, 2000);
    };

    const handleImport = () => {
      alert('匯入文件功能開發中');
    };

    const handleImprove = (type) => {
      if (!writingText) {
        alert('請先輸入文章內容');
        return;
      }
      alert(`${type}功能已執行`);
    };

    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-white">AI 寫作助手</h2>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 bg-slate-800 rounded-xl p-6 border border-green-500/20">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-white">寫作編輯器</h3>
              <div className="flex gap-2">
                <button 
                  onClick={handleImport}
                  className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition text-sm"
                >
                  匯入文件
                </button>
                <button 
                  onClick={handleAnalyze}
                  disabled={analyzing}
                  className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:shadow-lg transition text-sm disabled:opacity-50"
                >
                  {analyzing ? '分析中...' : 'AI 分析'}
                </button>
              </div>
            </div>

            <input
              type="text"
              placeholder="文章標題"
              value={writingTitle}
              onChange={(e) => setWritingTitle(e.target.value)}
              className="w-full px-4 py-3 mb-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-green-500 outline-none text-lg font-semibold"
            />

            <textarea
              value={writingText}
              onChange={(e) => setWritingText(e.target.value)}
              placeholder="開始撰寫你的文章、報告或論文..."
              rows="18"
              className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-green-500 outline-none resize-none font-mono"
            />

            <div className="flex justify-between items-center mt-4 text-sm text-gray-400">
              <span>{writingText.length} 字 • {writingText.split(' ').length} 詞</span>
              <span>預計閱讀時間: {Math.ceil(writingText.length / 200)} 分鐘</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-slate-800 rounded-xl p-5 border border-green-500/20">
              <h4 className="font-bold text-white mb-3">文法檢查</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 bg-green-500/10 rounded-lg">
                  <span className="text-sm text-white">文法正確</span>
                  <span className="text-2xl font-bold text-green-400">98%</span>
                </div>
                <div className="text-xs text-gray-400">發現 2 處可改進項目</div>
              </div>
            </div>

            <div className="bg-slate-800 rounded-xl p-5 border border-green-500/20">
              <h4 className="font-bold text-white mb-3">風格評分</h4>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-300">清晰度</span>
                    <span className="text-green-400">85%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-300">連貫性</span>
                    <span className="text-blue-400">90%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '90%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-300">學術性</span>
                    <span className="text-purple-400">75%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full" style={{ width: '75%' }} />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-800 rounded-xl p-5 border border-green-500/20">
              <h4 className="font-bold text-white mb-3">抄襲檢測</h4>
              <div className="text-center py-4">
                <div className="text-4xl font-bold text-green-400 mb-2">0%</div>
                <div className="text-sm text-gray-400">未發現相似內容</div>
                <Check className="w-8 h-8 text-green-400 mx-auto mt-2" />
              </div>
            </div>

            <div className="bg-slate-800 rounded-xl p-5 border border-green-500/20">
              <h4 className="font-bold text-white mb-3">快速動作</h4>
              <div className="space-y-2">
                <button 
                  onClick={() => handleImprove('改善文法')}
                  className="w-full py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition text-sm"
                >
                  改善文法
                </button>
                <button 
                  onClick={() => handleImprove('精簡內容')}
                  className="w-full py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition text-sm"
                >
                  精簡內容
                </button>
                <button 
                  onClick={() => handleImprove('增加學術性')}
                  className="w-full py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition text-sm"
                >
                  增加學術性
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ==================== 模組 4: 程式學習平台 ====================
  const CodingModule = () => {
    const [code, setCode] = useState('// 在這裡輸入你的程式碼\nfunction example() {\n  console.log("Hello World");\n}\n\nexample();');
    const [language, setLanguage] = useState('JavaScript');
    const [output, setOutput] = useState('> Hello World\n執行完成 (執行時間: 0.12s)');
    const [isRunning, setIsRunning] = useState(false);

    const handleRunCode = () => {
      setIsRunning(true);
      setOutput('執行中...');
      setTimeout(() => {
        setOutput('> Hello World\n執行完成 (執行時間: 0.12s)');
        setIsRunning(false);
      }, 1000);
    };

    const handleDebug = () => {
      alert('AI 除錯分析：\n- 程式碼結構良好\n- 建議使用 const 取代 var\n- 無明顯錯誤');
    };

    const handleOptimize = () => {
      alert('優化建議：\n- 考慮使用箭頭函數\n- 可以添加錯誤處理\n- 程式碼效能良好');
    };

    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-white">程式學習平台</h2>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-slate-800 rounded-xl p-6 border border-orange-500/20">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-white">程式碼編輯器</h3>
              <select 
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="px-4 py-2 bg-slate-700 text-white rounded-lg border border-slate-600"
              >
                <option>JavaScript</option>
                <option>Python</option>
                <option>Java</option>
                <option>C++</option>
              </select>
            </div>

            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-96 px-4 py-3 bg-slate-900 text-green-400 rounded-lg border border-slate-700 font-mono text-sm outline-none resize-none"
            />

            <div className="flex gap-3 mt-4">
              <button 
                onClick={handleRunCode}
                disabled={isRunning}
                className="flex-1 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg font-semibold hover:shadow-lg transition disabled:opacity-50"
              >
                <Play className="inline w-5 h-5 mr-2" />
                {isRunning ? '執行中...' : '執行程式碼'}
              </button>
              <button 
                onClick={handleDebug}
                className="px-6 py-3 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition"
              >
                AI 除錯
              </button>
              <button 
                onClick={handleOptimize}
                className="px-6 py-3 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition"
              >
                優化建議
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-slate-800 rounded-xl p-6 border border-orange-500/20">
              <h3 className="text-lg font-bold text-white mb-4">執行結果</h3>
              <div className="bg-slate-900 rounded-lg p-4 font-mono text-sm text-green-400 min-h-[100px]">
                {output}
              </div>
            </div>

            <div className="bg-slate-800 rounded-xl p-6 border border-orange-500/20">
              <h3 className="text-lg font-bold text-white mb-4">AI 程式碼分析</h3>
              <div className="space-y-3">
                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-400 mt-0.5" />
                    <div>
                      <div className="font-semibold text-green-300 text-sm">程式碼結構良好</div>
                      <div className="text-xs text-gray-400 mt-1">函式命名清晰，邏輯易讀</div>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3">
                  <div className="flex items-start gap-2">
                    <Activity className="w-5 h-5 text-yellow-400 mt-0.5" />
                    <div>
                      <div className="font-semibold text-yellow-300 text-sm">可優化項目</div>
                      <div className="text-xs text-gray-400 mt-1">建議使用 const 取代 var</div>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
                  <div className="flex items-start gap-2">
                    <Zap className="w-5 h-5 text-blue-400 mt-0.5" />
                    <div>
                      <div className="font-semibold text-blue-300 text-sm">效能評估</div>
                      <div className="text-xs text-gray-400 mt-1">時間複雜度: O(1)，空間複雜度: O(1)</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-800 rounded-xl p-6 border border-orange-500/20">
              <h3 className="text-lg font-bold text-white mb-4">程式碼品質</h3>
              <div className="flex items-center justify-center">
                <div className="relative w-32 h-32">
                  <svg className="transform -rotate-90 w-32 h-32">
                    <circle cx="64" cy="64" r="56" stroke="#1e293b" strokeWidth="8" fill="none" />
                    <circle cx="64" cy="64" r="56" stroke="#f97316" strokeWidth="8" fill="none"
                      strokeDasharray={`${88 * 2 * Math.PI}`}
                      strokeDashoffset={`${88 * 2 * Math.PI * (1 - 0.88)}`}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center flex-col">
                    <div className="text-3xl font-bold text-white">88</div>
                    <div className="text-xs text-gray-400">分</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ==================== 模組 5-7 及其他組件 ====================
  // 由於字數限制，其他模組保持原樣，但添加基本的互動功能

  const LanguageModule = () => {
    const [messages, setMessages] = useState([
      { role: 'ai', text: 'Hello! I\'m your English learning partner. How can I help you today?' },
    ]);
    const [input, setInput] = useState('');

    const sendMessage = () => {
      if (input.trim()) {
        setMessages([...messages, { role: 'user', text: input }]);
        setInput('');
        setTimeout(() => {
          setMessages(prev => [...prev, { 
            role: 'ai', 
            text: 'Great question! Let me help you with that...' 
          }]);
        }, 1000);
      }
    };

    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-white">語言學習系統</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 bg-slate-800 rounded-xl p-6 border border-yellow-500/20">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-white">AI 語言對話</h3>
              <select className="px-4 py-2 bg-slate-700 text-white rounded-lg border border-slate-600">
                <option>英文</option>
                <option>日文</option>
                <option>韓文</option>
                <option>西班牙文</option>
              </select>
            </div>
            <div className="h-96 bg-slate-900 rounded-lg p-4 mb-4 overflow-y-auto space-y-3">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-xs px-4 py-2 rounded-lg ${
                    msg.role === 'user' ? 'bg-yellow-500 text-white' : 'bg-slate-700 text-white'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Type your message..."
                className="flex-1 px-4 py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-yellow-500 outline-none"
              />
              <button 
                onClick={() => alert('語音輸入功能開發中')}
                className="p-3 bg-slate-700 rounded-lg hover:bg-slate-600 transition"
              >
                <Mic className="w-6 h-6 text-white" />
              </button>
              <button 
                onClick={sendMessage}
                className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-amber-500 text-white rounded-lg font-semibold hover:shadow-lg transition"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div className="space-y-4">
            <div className="bg-slate-800 rounded-xl p-5 border border-yellow-500/20">
              <h4 className="font-bold text-white mb-4">發音評分</h4>
              <div className="text-center">
                <div className="text-5xl font-bold text-yellow-400 mb-2">8.5</div>
                <div className="text-sm text-gray-400">本次對話平均分數</div>
              </div>
            </div>
            <div className="bg-slate-800 rounded-xl p-5 border border-yellow-500/20">
              <h4 className="font-bold text-white mb-3">情境練習</h4>
              <div className="space-y-2">
                {['餐廳點餐', '機場對話', '面試英文', '日常閒聊'].map((scenario) => (
                  <button 
                    key={scenario} 
                    onClick={() => alert(`開始 ${scenario} 情境練習`)}
                    className="w-full py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition text-sm text-left px-3"
                  >
                    {scenario}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const MentalModule = () => {
    const [mood, setMood] = useState(5);
    const [stress, setStress] = useState(5);
    const [journal, setJournal] = useState('');
    const moodEmojis = ['😢', '😟', '😐', '🙂', '😊', '😄', '🤩'];

    const handleSaveLog = () => {
      if (!journal) {
        alert('請寫下你的感受');
        return;
      }
      alert(`記錄已儲存！\n心情: ${moodEmojis[mood]}\n壓力等級: ${stress}/10`);
      setJournal('');
    };

    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-white">心智健康助手</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-slate-800 rounded-xl p-6 border border-rose-500/20">
            <h3 className="text-xl font-bold text-white mb-4">今日心情記錄</h3>
            <div className="mb-6">
              <div className="text-center mb-4">
                <div className="text-6xl mb-2">{moodEmojis[mood]}</div>
                <div className="text-gray-400">滑動選擇你的心情</div>
              </div>
              <input
                type="range"
                min="0"
                max="6"
                value={mood}
                onChange={(e) => setMood(parseInt(e.target.value))}
                className="w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-300 mb-2">壓力等級: {stress}/10</label>
              <input
                type="range"
                min="1"
                max="10"
                value={stress}
                onChange={(e) => setStress(parseInt(e.target.value))}
                className="w-full"
              />
            </div>
            <textarea
              placeholder="寫下你今天的感受..."
              rows="6"
              value={journal}
              onChange={(e) => setJournal(e.target.value)}
              className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-rose-500 outline-none resize-none"
            />
            <button 
              onClick={handleSaveLog}
              className="w-full mt-4 py-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-lg font-semibold hover:shadow-lg transition"
            >
              儲存記錄
            </button>
          </div>
          <div className="space-y-4">
            <div className="bg-slate-800 rounded-xl p-6 border border-rose-500/20">
              <h3 className="text-xl font-bold text-white mb-4">AI 關懷建議</h3>
              <div className="bg-rose-500/10 border border-rose-500/30 rounded-lg p-4">
                <div className="text-rose-300 font-semibold mb-2">今日建議</div>
                <div className="text-sm text-gray-300 space-y-2">
                  <p>根據你最近的心情記錄，建議你：</p>
                  <ul className="list-disc list-inside space-y-1 text-gray-400">
                    <li>每天保持 30 分鐘戶外活動</li>
                    <li>練習深呼吸放鬆技巧</li>
                    <li>確保每晚 7-8 小時睡眠</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="bg-slate-800 rounded-xl p-6 border border-rose-500/20">
              <h3 className="text-lg font-bold text-white mb-4">冥想練習</h3>
              <div className="space-y-3">
                {['5 分鐘呼吸冥想', '10 分鐘正念練習', '睡前放鬆引導', '壓力釋放練習'].map((practice) => (
                  <button 
                    key={practice} 
                    onClick={() => alert(`開始 ${practice}`)}
                    className="w-full flex items-center justify-between p-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition"
                  >
                    <span className="text-sm">{practice}</span>
                    <Play className="w-4 h-4" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const CareerModule = () => {
    const [resume, setResume] = useState('');

    const handleOptimize = () => {
      if (!resume) {
        alert('請先輸入履歷內容');
        return;
      }
      alert('AI 履歷優化建議：\n- 突出量化成就\n- 使用動作動詞\n- 調整排版格式');
    };

    const handleATSCheck = () => {
      if (!resume) {
        alert('請先輸入履歷內容');
        return;
      }
      alert('ATS 友善度: 85%\n建議添加更多關鍵字');
    };

    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-white">職涯探索工具</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-slate-800 rounded-xl p-6 border border-indigo-500/20">
            <h3 className="text-xl font-bold text-white mb-4">履歷優化</h3>
            <textarea
              placeholder="貼上你的履歷內容..."
              rows="12"
              value={resume}
              onChange={(e) => setResume(e.target.value)}
              className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-indigo-500 outline-none resize-none mb-4"
            />
            <div className="flex gap-3">
              <button 
                onClick={handleOptimize}
                className="flex-1 py-3 bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-lg font-semibold hover:shadow-lg transition"
              >
                AI 優化建議
              </button>
              <button 
                onClick={handleATSCheck}
                className="px-6 py-3 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition"
              >
                ATS 檢查
              </button>
            </div>
          </div>
          <div className="space-y-4">
            <div className="bg-slate-800 rounded-xl p-6 border border-indigo-500/20">
              <h3 className="text-lg font-bold text-white mb-4">推薦職位</h3>
              <div className="space-y-2">
                {[
                  { title: 'Frontend Developer', match: 92 },
                  { title: 'Full Stack Engineer', match: 85 },
                  { title: 'Software Developer', match: 80 }
                ].map((job) => (
                  <div key={job.title} className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                    <span className="text-white text-sm">{job.title}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-slate-600 rounded-full h-2">
                        <div 
                          className="bg-indigo-500 h-2 rounded-full" 
                          style={{ width: `${job.match}%` }}
                        />
                      </div>
                      <span className="text-indigo-400 text-sm font-semibold">{job.match}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="md:col-span-2 bg-slate-800 rounded-xl p-6 border border-indigo-500/20">
              <h3 className="text-xl font-bold text-white mb-4">AI 模擬面試</h3>
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  { type: '技術面試', icon: Code },
                  { type: '行為面試', icon: MessageSquare },
                  { type: '系統設計', icon: Brain }
                ].map((interview) => {
                  const Icon = interview.icon;
                  return (
                    <button
                      key={interview.type}
                      onClick={() => alert(`開始 ${interview.type}`)}
                      className="bg-slate-700/50 rounded-lg p-6 text-center hover:bg-slate-700 transition cursor-pointer"
                    >
                      <div className="w-16 h-16 bg-indigo-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Icon className="w-8 h-8 text-indigo-400" />
                      </div>
                      <h4 className="font-semibold text-white mb-2">{interview.type}</h4>
                      <div className="px-4 py-2 bg-slate-600 hover:bg-slate-500 text-white rounded-lg text-sm transition">
                        開始練習
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ==================== 主儀表板 ====================
  const DashboardModule = () => {
    const modules = [
      { id: 'exam', icon: BookOpen, name: '智慧考試準備', color: 'from-blue-500 to-cyan-500', stats: '15 次測驗' },
      { id: 'multimodal', icon: Brain, name: '多模態學習', color: 'from-purple-500 to-pink-500', stats: '48 筆筆記' },
      { id: 'writing', icon: FileText, name: 'AI 寫作助手', color: 'from-green-500 to-emerald-500', stats: '12 篇文章' },
      { id: 'coding', icon: Code, name: '程式學習平台', color: 'from-orange-500 to-red-500', stats: '32 次提交' },
      { id: 'language', icon: MessageSquare, name: '語言學習系統', color: 'from-yellow-500 to-amber-500', stats: '8.5 小時' },
      { id: 'mental', icon: Heart, name: '心智健康助手', color: 'from-rose-500 to-pink-500', stats: '連續 15 天' },
      { id: 'career', icon: Briefcase, name: '職涯探索工具', color: 'from-indigo-500 to-blue-500', stats: '3 次優化' }
    ];

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-white">歡迎回來！</h2>
            <p className="text-gray-400">繼續你的學習之旅</p>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-400">今日學習時間</div>
            <div className="text-2xl font-bold text-white">2.5 小時</div>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-4">
          {[
            { label: '學習天數', value: '42', icon: Calendar, color: 'blue' },
            { label: '完成率', value: '87%', icon: Target, color: 'green' },
            { label: '總分數', value: '1,250', icon: Award, color: 'purple' },
            { label: '本週進度', value: '↑ 15%', icon: TrendingUp, color: 'orange' }
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="bg-slate-800 rounded-xl p-5 border border-slate-700">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 text-sm">{stat.label}</span>
                  <Icon className="w-5 h-5 text-blue-400" />
                </div>
                <div className="text-2xl font-bold text-white">{stat.value}</div>
              </div>
            );
          })}
        </div>

        <div>
          <h3 className="text-xl font-bold text-white mb-4">所有功能模組</h3>
          <div className="grid md:grid-cols-3 xl:grid-cols-4 gap-4">
            {modules.map((module) => {
              const Icon = module.icon;
              return (
                <div
                  key={module.id}
                  onClick={() => setCurrentModule(module.id)}
                  className="bg-slate-800 rounded-xl p-5 border border-slate-700 hover:border-purple-500/40 transition cursor-pointer group"
                >
                  <div className={`w-14 h-14 bg-gradient-to-br ${module.color} rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h4 className="font-bold text-white mb-1">{module.name}</h4>
                  <p className="text-sm text-gray-400">{module.stats}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <h3 className="text-lg font-bold text-white mb-4">最近活動</h3>
            <div className="space-y-3">
              {[
                { action: '完成 JavaScript 測驗', time: '2 小時前', icon: BookOpen, color: 'blue' },
                { action: '新增學習筆記', time: '5 小時前', icon: Brain, color: 'purple' },
                { action: '提交程式碼', time: '1 天前', icon: Code, color: 'orange' },
                { action: '語言對話練習', time: '2 天前', icon: MessageSquare, color: 'yellow' }
              ].map((activity, idx) => {
                const Icon = activity.icon;
                return (
                  <div key={idx} className="flex items-center gap-3 p-3 bg-slate-700/30 rounded-lg">
                    <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                      <Icon className="w-5 h-5 text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <div className="text-white text-sm">{activity.action}</div>
                      <div className="text-gray-500 text-xs">{activity.time}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <h3 className="text-lg font-bold text-white mb-4">學習目標</h3>
            <div className="space-y-4">
              {[
                { goal: '完成 50 道練習題', progress: 75, color: 'blue' },
                { goal: '每日語言練習 30 分鐘', progress: 90, color: 'yellow' },
                { goal: '撰寫 3 篇文章', progress: 60, color: 'green' }
              ].map((goal, idx) => (
                <div key={idx}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-300">{goal.goal}</span>
                    <span className="text-blue-400 font-semibold">{goal.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full transition-all"
                      style={{ width: `${goal.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ==================== 側邊欄導航 ====================
  const Sidebar = () => {
    const menuItems = [
      { id: 'dashboard', icon: Home, label: '儀表板' },
      { id: 'exam', icon: BookOpen, label: '智慧考試' },
      { id: 'multimodal', icon: Brain, label: '多模態學習' },
      { id: 'writing', icon: FileText, label: 'AI 寫作' },
      { id: 'coding', icon: Code, label: '程式學習' },
      { id: 'language', icon: MessageSquare, label: '語言學習' },
      { id: 'mental', icon: Heart, label: '心智健康' },
      { id: 'career', icon: Briefcase, label: '職涯探索' }
    ];

    return (
      <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-slate-900 border-r border-slate-800 transition-all duration-300 flex flex-col`}>
        <div className="p-6 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            {sidebarOpen && (
              <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                ProjectX
              </span>
            )}
          </div>
        </div>

        <div className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentModule === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentModule(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                  isActive 
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
                    : 'text-gray-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Icon className="w-5 h-5" />
                {sidebarOpen && <span className="font-medium">{item.label}</span>}
              </button>
            );
          })}
        </div>

        <div className="p-4 border-t border-slate-800 space-y-2">
          <button 
            onClick={() => alert('設定功能開發中')}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:text-white hover:bg-slate-800 transition"
          >
            <Settings className="w-5 h-5" />
            {sidebarOpen && <span>設定</span>}
          </button>
          <button 
            onClick={() => alert('個人資料功能開發中')}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:text-white hover:bg-slate-800 transition"
          >
            <User className="w-5 h-5" />
            {sidebarOpen && <span>個人資料</span>}
          </button>
          <button 
            onClick={() => {
              if (confirm('確定要登出嗎？')) {
                alert('已登出');
              }
            }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:text-white hover:bg-slate-800 transition"
          >
            <LogOut className="w-5 h-5" />
            {sidebarOpen && <span>登出</span>}
          </button>
        </div>
      </div>
    );
  };

  // ==================== 主要渲染 ====================
  const renderModule = () => {
    switch (currentModule) {
      case 'dashboard': return <DashboardModule />;
      case 'exam': return <ExamModule />;
      case 'multimodal': return <MultimodalModule />;
      case 'writing': return <WritingModule />;
      case 'coding': return <CodingModule />;
      case 'language': return <LanguageModule />;
      case 'mental': return <MentalModule />;
      case 'career': return <CareerModule />;
      default: return <DashboardModule />;
    }
  };

  return (
    <div className="h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex overflow-hidden">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="bg-slate-800/50 backdrop-blur-lg border-b border-slate-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 hover:bg-slate-700 rounded-lg transition"
              >
                <Menu className="w-5 h-5 text-white" />
              </button>
              <div className="relative">
                <input
                  type="text"
                  placeholder="搜尋功能..."
                  className="w-64 px-4 py-2 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-purple-500 outline-none text-sm"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-sm text-gray-400">當前模組</div>
                <div className="font-semibold text-white">
                  {currentModule === 'dashboard' ? '儀表板' : 
                   currentModule === 'exam' ? '智慧考試準備' :
                   currentModule === 'multimodal' ? '多模態學習' :
                   currentModule === 'writing' ? 'AI 寫作助手' :
                   currentModule === 'coding' ? '程式學習平台' :
                   currentModule === 'language' ? '語言學習系統' :
                   currentModule === 'mental' ? '心智健康助手' :
                   currentModule === 'career' ? '職涯探索工具' : '儀表板'}
                </div>
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center cursor-pointer">
                <User className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {renderModule()}
        </div>
      </div>
    </div>
  );
};

export default App;