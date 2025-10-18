# ProjectX Backend - 完整後端系統
# app.py - 主應用程式

from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from datetime import datetime, timedelta
import openai
import os
from dotenv import load_dotenv

# 載入環境變數
load_dotenv()

# 初始化
app = Flask(__name__)
CORS(app)

# 配置
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'sqlite:///projectx.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY', 'your-secret-key-change-in-production')
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(days=7)

db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

# OpenAI API 設定
openai.api_key = os.getenv('OPENAI_API_KEY')

# ==================== 資料庫模型 ====================

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # 關聯
    exam_records = db.relationship('ExamRecord', backref='user', lazy=True, cascade='all, delete-orphan')
    notes = db.relationship('Note', backref='user', lazy=True, cascade='all, delete-orphan')
    writings = db.relationship('Writing', backref='user', lazy=True, cascade='all, delete-orphan')
    code_submissions = db.relationship('CodeSubmission', backref='user', lazy=True, cascade='all, delete-orphan')
    language_sessions = db.relationship('LanguageSession', backref='user', lazy=True, cascade='all, delete-orphan')
    mental_logs = db.relationship('MentalLog', backref='user', lazy=True, cascade='all, delete-orphan')
    career_profiles = db.relationship('CareerProfile', backref='user', lazy=True, cascade='all, delete-orphan')

# 模組 1: 智慧考試準備系統
class ExamRecord(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    subject = db.Column(db.String(100), nullable=False)
    question_count = db.Column(db.Integer, default=0)
    correct_count = db.Column(db.Integer, default=0)
    score = db.Column(db.Float, default=0.0)
    weak_areas = db.Column(db.Text)  # JSON 格式
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class Question(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    exam_id = db.Column(db.Integer, db.ForeignKey('exam_record.id'))
    question_text = db.Column(db.Text, nullable=False)
    options = db.Column(db.Text)  # JSON 格式
    correct_answer = db.Column(db.String(10))
    user_answer = db.Column(db.String(10))
    is_correct = db.Column(db.Boolean, default=False)

# 模組 2: 多模態學習助手
class Note(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    title = db.Column(db.String(200), nullable=False)
    content = db.Column(db.Text)
    note_type = db.Column(db.String(50))  # text, image, video, handwritten
    ai_summary = db.Column(db.Text)
    tags = db.Column(db.Text)  # JSON 格式
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

# 模組 3: AI 寫作助手
class Writing(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    title = db.Column(db.String(200), nullable=False)
    content = db.Column(db.Text, nullable=False)
    writing_type = db.Column(db.String(50))  # essay, report, article
    ai_feedback = db.Column(db.Text)  # JSON 格式
    plagiarism_score = db.Column(db.Float, default=0.0)
    grammar_score = db.Column(db.Float, default=0.0)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

# 模組 4: 程式學習平台
class CodeSubmission(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    language = db.Column(db.String(50), nullable=False)
    code = db.Column(db.Text, nullable=False)
    problem_description = db.Column(db.Text)
    ai_feedback = db.Column(db.Text)
    bugs_found = db.Column(db.Text)  # JSON 格式
    quality_score = db.Column(db.Float, default=0.0)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

# 模組 5: 語言學習系統
class LanguageSession(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    target_language = db.Column(db.String(50), nullable=False)
    conversation = db.Column(db.Text)  # JSON 格式
    pronunciation_score = db.Column(db.Float)
    fluency_score = db.Column(db.Float)
    duration_minutes = db.Column(db.Integer, default=0)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

# 模組 6: 心智健康助手
class MentalLog(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    mood = db.Column(db.String(50))  # happy, stressed, anxious, etc.
    stress_level = db.Column(db.Integer)  # 1-10
    journal_entry = db.Column(db.Text)
    ai_advice = db.Column(db.Text)
    sleep_hours = db.Column(db.Float)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

# 模組 7: 職涯探索工具
class CareerProfile(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    skills = db.Column(db.Text)  # JSON 格式
    resume_content = db.Column(db.Text)
    ai_recommendations = db.Column(db.Text)
    interview_sessions = db.Column(db.Text)  # JSON 格式
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

# ==================== API 路由 ====================

# 健康檢查
@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({
        'status': 'healthy',
        'timestamp': datetime.utcnow().isoformat(),
        'version': '1.0.0'
    }), 200

# 用戶認證
@app.route('/api/auth/register', methods=['POST'])
def register():
    try:
        data = request.get_json()
        
        if User.query.filter_by(email=data['email']).first():
            return jsonify({'error': '電子郵件已被使用'}), 400
        
        if User.query.filter_by(username=data['username']).first():
            return jsonify({'error': '用戶名已被使用'}), 400
        
        hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
        new_user = User(
            username=data['username'],
            email=data['email'],
            password_hash=hashed_password
        )
        
        db.session.add(new_user)
        db.session.commit()
        
        return jsonify({'message': '註冊成功', 'user_id': new_user.id}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/auth/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        user = User.query.filter_by(email=data['email']).first()
        
        if user and bcrypt.check_password_hash(user.password_hash, data['password']):
            access_token = create_access_token(identity=user.id)
            return jsonify({
                'access_token': access_token,
                'user': {
                    'id': user.id,
                    'username': user.username,
                    'email': user.email
                }
            }), 200
        
        return jsonify({'error': '帳號或密碼錯誤'}), 401
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# 模組 1: 智慧考試準備
@app.route('/api/exam/generate', methods=['POST'])
@jwt_required()
def generate_exam():
    try:
        user_id = get_jwt_identity()
        data = request.get_json()
        
        # 呼叫 OpenAI API 生成試題
        prompt = f"為{data['subject']}科目生成{data['question_count']}道{data['difficulty']}難度的選擇題，請用繁體中文回答。每題包含題目、4個選項和正確答案。"
        
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "你是專業的試題生成助手"},
                {"role": "user", "content": prompt}
            ],
            max_tokens=1000
        )
        
        # 儲存考試記錄
        exam = ExamRecord(
            user_id=user_id,
            subject=data['subject'],
            question_count=data['question_count']
        )
        db.session.add(exam)
        db.session.commit()
        
        return jsonify({
            'exam_id': exam.id,
            'questions': response.choices[0].message.content
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/exam/submit', methods=['POST'])
@jwt_required()
def submit_exam():
    try:
        user_id = get_jwt_identity()
        data = request.get_json()
        
        exam = ExamRecord.query.get(data['exam_id'])
        if not exam or exam.user_id != user_id:
            return jsonify({'error': '無效的考試記錄'}), 404
        
        # 計算分數
        correct = data.get('correct_count', 0)
        total = data.get('total_count', 0)
        score = (correct / total * 100) if total > 0 else 0
        
        exam.correct_count = correct
        exam.score = score
        db.session.commit()
        
        return jsonify({
            'score': score,
            'correct': correct,
            'total': total
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/exam/history', methods=['GET'])
@jwt_required()
def get_exam_history():
    try:
        user_id = get_jwt_identity()
        exams = ExamRecord.query.filter_by(user_id=user_id).order_by(ExamRecord.created_at.desc()).limit(10).all()
        
        return jsonify([{
            'id': e.id,
            'subject': e.subject,
            'score': e.score,
            'question_count': e.question_count,
            'correct_count': e.correct_count,
            'created_at': e.created_at.isoformat()
        } for e in exams]), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# 模組 2: 多模態學習
@app.route('/api/notes', methods=['GET', 'POST'])
@jwt_required()
def notes():
    user_id = get_jwt_identity()
    
    if request.method == 'POST':
        try:
            data = request.get_json()
            
            # AI 自動生成摘要
            if data.get('content'):
                summary_prompt = f"為以下內容生成簡潔的摘要（100字以內）:\n{data['content']}"
                summary_response = openai.ChatCompletion.create(
                    model="gpt-3.5-turbo",
                    messages=[{"role": "user", "content": summary_prompt}],
                    max_tokens=200
                )
                ai_summary = summary_response.choices[0].message.content
            else:
                ai_summary = ""
            
            note = Note(
                user_id=user_id,
                title=data['title'],
                content=data.get('content', ''),
                note_type=data.get('note_type', 'text'),
                ai_summary=ai_summary
            )
            db.session.add(note)
            db.session.commit()
            
            return jsonify({'message': '筆記已儲存', 'note_id': note.id}), 201
        except Exception as e:
            return jsonify({'error': str(e)}), 500
    
    # GET - 取得所有筆記
    try:
        notes = Note.query.filter_by(user_id=user_id).order_by(Note.updated_at.desc()).all()
        return jsonify([{
            'id': n.id,
            'title': n.title,
            'content': n.content,
            'ai_summary': n.ai_summary,
            'note_type': n.note_type,
            'created_at': n.created_at.isoformat(),
            'updated_at': n.updated_at.isoformat()
        } for n in notes]), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# 模組 3: AI 寫作助手
@app.route('/api/writing/analyze', methods=['POST'])
@jwt_required()
def analyze_writing():
    try:
        user_id = get_jwt_identity()
        data = request.get_json()
        
        # AI 文法檢查與建議
        analysis_prompt = f"""
        分析以下文章並提供:
        1. 文法錯誤（如有）
        2. 結構建議
        3. 風格改進
        4. 整體評分 (0-100)
        
        文章標題: {data['title']}
        文章內容: {data['content']}
        
        請用繁體中文回答，並以JSON格式輸出。
        """
        
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "你是專業的寫作指導老師"},
                {"role": "user", "content": analysis_prompt}
            ],
            max_tokens=500
        )
        
        # 儲存寫作記錄
        writing = Writing(
            user_id=user_id,
            title=data['title'],
            content=data['content'],
            writing_type=data.get('type', 'essay'),
            ai_feedback=response.choices[0].message.content,
            grammar_score=85.0  # 實際應從 AI 回應中解析
        )
        db.session.add(writing)
        db.session.commit()
        
        return jsonify({
            'writing_id': writing.id,
            'feedback': response.choices[0].message.content
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/writing/check-plagiarism', methods=['POST'])
@jwt_required()
def check_plagiarism():
    try:
        data = request.get_json()
        
        # 簡化的抄襲檢測 (實際應使用專業 API)
        plagiarism_score = 0.0  # 0-100
        
        return jsonify({
            'plagiarism_score': plagiarism_score,
            'status': 'clean' if plagiarism_score < 10 else 'suspicious'
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# 模組 4: 程式學習平台
@app.route('/api/code/debug', methods=['POST'])
@jwt_required()
def debug_code():
    try:
        user_id = get_jwt_identity()
        data = request.get_json()
        
        debug_prompt = f"""
        分析以下 {data['language']} 程式碼:
        ```{data['language']}
        {data['code']}
        ```
        
        請提供:
        1. 潛在的 bug
        2. 效能優化建議
        3. 程式碼品質評分（0-100）
        4. 最佳實踐建議
        
        請用繁體中文回答。
        """
        
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "你是資深程式設計導師"},
                {"role": "user", "content": debug_prompt}
            ],
            max_tokens=500
        )
        
        submission = CodeSubmission(
            user_id=user_id,
            language=data['language'],
            code=data['code'],
            ai_feedback=response.choices[0].message.content,
            quality_score=80.0
        )
        db.session.add(submission)
        db.session.commit()
        
        return jsonify({
            'submission_id': submission.id,
            'feedback': response.choices[0].message.content
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# 模組 5: 語言學習系統
@app.route('/api/language/chat', methods=['POST'])
@jwt_required()
def language_chat():
    try:
        user_id = get_jwt_identity()
        data = request.get_json()
        
        chat_prompt = f"""
        你是 {data['target_language']} 語言教師。
        學生說: {data['message']}
        
        請用 {data['target_language']} 自然回應，並在最後用中文提供:
        1. 文法要點
        2. 常用表達
        3. 發音提示
        """
        
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": chat_prompt}],
            max_tokens=300
        )
        
        return jsonify({
            'reply': response.choices[0].message.content
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# 模組 6: 心智健康助手
@app.route('/api/mental/log', methods=['POST'])
@jwt_required()
def mental_log():
    try:
        user_id = get_jwt_identity()
        data = request.get_json()
        
        # AI 心理輔導建議
        advice_prompt = f"""
        用戶心情: {data.get('mood', '一般')}
        壓力等級: {data.get('stress_level', 5)}/10
        日記內容: {data.get('journal', '無')}
        
        請提供溫暖的支持性建議和壓力管理技巧（繁體中文，150字以內）
        """
        
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "你是溫暖、專業的心理健康顧問"},
                {"role": "user", "content": advice_prompt}
            ],
            max_tokens=300
        )
        
        log = MentalLog(
            user_id=user_id,
            mood=data.get('mood'),
            stress_level=data.get('stress_level'),
            journal_entry=data.get('journal'),
            ai_advice=response.choices[0].message.content,
            sleep_hours=data.get('sleep_hours')
        )
        db.session.add(log)
        db.session.commit()
        
        return jsonify({
            'log_id': log.id,
            'advice': response.choices[0].message.content
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# 模組 7: 職涯探索工具
@app.route('/api/career/analyze-skills', methods=['POST'])
@jwt_required()
def analyze_skills():
    try:
        user_id = get_jwt_identity()
        data = request.get_json()
        
        analysis_prompt = f"""
        分析以下技能組合並提供:
        1. 技能缺口分析
        2. 推薦學習路徑
        3. 適合的職位
        4. 市場競爭力評估
        
        目標職位: {data.get('target_role', '通用')}
        現有技能: {', '.join(data.get('current_skills', []))}
        
        請用繁體中文回答。
        """
        
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": analysis_prompt}],
            max_tokens=500
        )
        
        return jsonify({
            'analysis': response.choices[0].message.content
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/career/optimize-resume', methods=['POST'])
@jwt_required()
def optimize_resume():
    try:
        user_id = get_jwt_identity()
        data = request.get_json()
        
        resume_prompt = f"""
        優化以下履歷內容:
        {data['resume_content']}
        
        目標職位: {data.get('target_role', '通用')}
        
        請提供:
        1. 改寫建議
        2. 關鍵字優化
        3. 格式建議
        4. ATS 友善度分析
        
        請用繁體中文回答。
        """
        
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": resume_prompt}],
            max_tokens=500
        )
        
        profile = CareerProfile.query.filter_by(user_id=user_id).first()
        if not profile:
            profile = CareerProfile(user_id=user_id)
            db.session.add(profile)
        
        profile.resume_content = data['resume_content']
        profile.ai_recommendations = response.choices[0].message.content
        db.session.commit()
        
        return jsonify({
            'optimized_resume': response.choices[0].message.content
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# 統計與儀表板
@app.route('/api/dashboard/stats', methods=['GET'])
@jwt_required()
def get_dashboard_stats():
    try:
        user_id = get_jwt_identity()
        
        # 計算平均考試分數
        avg_score_result = db.session.query(db.func.avg(ExamRecord.score)).filter_by(user_id=user_id).scalar()
        avg_score = float(avg_score_result) if avg_score_result else 0
        
        stats = {
            'exam_count': ExamRecord.query.filter_by(user_id=user_id).count(),
            'notes_count': Note.query.filter_by(user_id=user_id).count(),
            'writings_count': Writing.query.filter_by(user_id=user_id).count(),
            'code_submissions': CodeSubmission.query.filter_by(user_id=user_id).count(),
            'language_sessions': LanguageSession.query.filter_by(user_id=user_id).count(),
            'mental_logs': MentalLog.query.filter_by(user_id=user_id).count(),
            'avg_exam_score': round(avg_score, 2)
        }
        
        return jsonify(stats), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# ==================== 初始化資料庫 ====================
@app.route('/api/init-db', methods=['POST'])
def init_database():
    try:
        db.create_all()
        return jsonify({'message': '資料庫初始化成功'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# ==================== 錯誤處理 ====================
@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Not found'}), 404

@app.errorhandler(500)
def internal_error(error):
    db.session.rollback()
    return jsonify({'error': 'Internal server error'}), 500

# ==================== 啟動應用程式 ====================
if __name__ == '__main__':
    with app.app_context():
        db.create_all()
        print("✅ 資料庫初始化完成")
    
    port = int(os.getenv('PORT', 5050))
    host = os.getenv('HOST', '0.0.0.0')
    
    print(f"🚀 ProjectX Backend 啟動中...")
    print(f"📍 運行在 http://{host}:{port}")
    print(f"🔑 OpenAI API Key: {'已設定' if openai.api_key else '未設定'}")
    
    app.run(debug=True, host=host, port=port)