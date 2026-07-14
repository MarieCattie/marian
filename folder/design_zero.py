# =======================
# design_flow_zero.py
# Корпорация "Бренд Я"
# Платформа для новичков-дизайнеров. Без рейтингов и портфолио.
# =======================

from flask import Flask, render_template_string, request, jsonify, session
from datetime import datetime
import uuid
import json

app = Flask(__name__)
app.secret_key = "бренд_я_не_сравнивает_дизайнеров"

# --- Хранилище заявок (в памяти, для демо) ---
# Структура заявки:
# id, title, description, type (лого/пост/баннер), status (waiting/in_progress/done), 
# subtasks (разбивка на кусочки), claimed_by (никто/дизайнер)
tasks_db = {}

# --- Пример заявок при старте ---
def init_demo_tasks():
    global tasks_db
    tasks_db = {
        "task_1": {
            "id": "task_1",
            "title": "Логотип для кофейни «Зерно»",
            "description": "Нужен минималистичный знак: чашка + зерно. Цвета: терракотовый, кремовый.",
            "type": "логотип",
            "status": "waiting",
            "subtasks": ["эскиз", "вектор", "подбор цвета", "финальный рендер"],
            "completed_subtasks": [],
            "claimed_by": None,
            "created_at": datetime.now().isoformat()
        },
        "task_2": {
            "id": "task_2",
            "title": "Инстаграм-пост для бренда одежды",
            "description": "Квадратный пост 1080x1080. Тема: «Осенняя коллекция». Текст поверх: уют и стиль.",
            "type": "пост",
            "status": "waiting",
            "subtasks": ["композиция", "типографика", "цветокоррекция", "экспорт"],
            "completed_subtasks": [],
            "claimed_by": None,
            "created_at": datetime.now().isoformat()
        }
    }

init_demo_tasks()

# --- HTML + CSS интерфейс (всё в одном файле, без портфолио и рейтингов) ---
HTML_TEMPLATE = """
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DesignFlow Zero — дизайн без рейтингов</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
            background: #f7f5f2;
            color: #2c2a28;
            padding: 2rem;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
        }
        header {
            text-align: center;
            margin-bottom: 2rem;
        }
        h1 {
            font-size: 2.5rem;
            letter-spacing: -0.02em;
        }
        .brand {
            background: #ffffffd9;
            display: inline-block;
            padding: 0.2rem 1rem;
            border-radius: 100px;
            font-size: 0.8rem;
            margin-top: 0.5rem;
        }
        .badge {
            background: #e9e5e0;
            padding: 0.2rem 0.6rem;
            border-radius: 20px;
            font-size: 0.7rem;
        }
        .tasks-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
            gap: 1.5rem;
        }
        .task-card {
            background: white;
            border-radius: 1.5rem;
            padding: 1.5rem;
            box-shadow: 0 4px 12px rgba(0,0,0,0.05);
            transition: all 0.2s;
            border: 1px solid #eae5df;
        }
        .task-header {
            display: flex;
            justify-content: space-between;
            align-items: baseline;
            margin-bottom: 0.5rem;
            flex-wrap: wrap;
        }
        .task-type {
            font-size: 0.7rem;
            text-transform: uppercase;
            background: #f0ede8;
            padding: 0.2rem 0.6rem;
            border-radius: 50px;
        }
        .task-title {
            font-size: 1.3rem;
            font-weight: 600;
            margin: 0.5rem 0;
        }
        .task-desc {
            color: #5a5652;
            font-size: 0.9rem;
            margin: 0.75rem 0;
            line-height: 1.4;
        }
        .subtasks-block {
            background: #faf8f5;
            border-radius: 1rem;
            padding: 0.8rem;
            margin: 1rem 0;
        }
        .subtask-item {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.3rem 0;
            font-size: 0.85rem;
        }
        .subtask-check {
            cursor: pointer;
            width: 18px;
            height: 18px;
        }
        .status {
            display: inline-block;
            padding: 0.2rem 0.6rem;
            border-radius: 50px;
            font-size: 0.7rem;
            font-weight: 500;
            margin-top: 0.5rem;
        }
        .status-waiting { background: #ffe8d6; color: #b45f2b; }
        .status-progress { background: #e0f0ea; color: #1f6e4a; }
        .status-done { background: #e2e6df; color: #3a4a2e; }
        button {
            background: #2c2a28;
            color: white;
            border: none;
            padding: 0.5rem 1.2rem;
            border-radius: 3rem;
            font-weight: 500;
            cursor: pointer;
            transition: 0.1s linear;
            font-size: 0.85rem;
        }
        button:active { transform: scale(0.97); }
        .take-btn {
            background: #3b5c4a;
            width: 100%;
            margin-top: 1rem;
        }
        .take-btn:disabled {
            background: #cbc6c0;
            cursor: not-allowed;
        }
        .claim-info {
            font-size: 0.7rem;
            margin-top: 0.6rem;
            text-align: center;
            color: #6b6b6b;
        }
        hr {
            margin: 1rem 0;
            border: none;
            border-top: 1px solid #ede8e2;
        }
        .new-task-form {
            background: white;
            border-radius: 1.5rem;
            padding: 1.5rem;
            margin-bottom: 2rem;
            border: 1px solid #eae5df;
        }
        input, textarea, select {
            width: 100%;
            padding: 0.7rem;
            margin: 0.5rem 0;
            border: 1px solid #ddd6cf;
            border-radius: 1rem;
            font-family: inherit;
        }
        .flex-btns {
            display: flex;
            gap: 0.5rem;
            margin-top: 0.5rem;
        }
        footer {
            text-align: center;
            margin-top: 3rem;
            font-size: 0.75rem;
            color: #aaa39c;
        }
        .instant-alert {
            background: #e0f0ea;
            border-radius: 2rem;
            padding: 0.5rem 1rem;
            text-align: center;
            margin-bottom: 1rem;
            font-size: 0.85rem;
        }
    </style>
</head>
<body>
<div class="container">
    <header>
        <h1>🎨 DesignFlow Zero</h1>
        <div class="brand">корпорация «Бренд Я» — авторская разработка</div>
        <div class="instant-alert">
            ⚡ Система мгновенного выполнения: выбери заявку → делай → отмечай кусочек → готово. <br>
            Нет рейтинга, нет сравнения, нет портфолио. Просто дизайн.
        </div>
    </header>

    <div class="new-task-form">
        <h3>➕ Создать новую заявку (от клиента или координатора)</h3>
        <input type="text" id="newTitle" placeholder="Название задачи, например: Обложка для подкаста">
        <textarea id="newDesc" rows="2" placeholder="Описание: стиль, размеры, настроение"></textarea>
        <select id="newType">
            <option value="логотип">Логотип</option>
            <option value="пост">Пост для соцсетей</option>
            <option value="баннер">Баннер/афиша</option>
            <option value="презентация">Презентация</option>
        </select>
        <button onclick="createTask()">📨 Опубликовать заявку</button>
    </div>

    <div class="tasks-grid" id="tasksContainer">
        <!-- динамические карточки -->
    </div>
    <footer>
        «Бренд Я» — без портфолио, рейтингов и превосходства. <br>
        Каждый дизайнер может взять любую заявку и выполнить её сразу по кусочкам.
    </footer>
</div>

<script>
    async function loadTasks() {
        const res = await fetch('/api/tasks');
        const tasks = await res.json();
        const container = document.getElementById('tasksContainer');
        container.innerHTML = '';
        for (let task of tasks) {
            const card = document.createElement('div');
            card.className = 'task-card';
            let subtaskHtml = '';
            if (task.subtasks && task.subtasks.length) {
                subtaskHtml = `<div class="subtasks-block"><strong>📦 Кусочки задачи:</strong>`;
                task.subtasks.forEach((sub, idx) => {
                    const isCompleted = task.completed_subtasks && task.completed_subtasks.includes(sub);
                    subtaskHtml += `
                        <div class="subtask-item">
                            <input type="checkbox" class="subtask-check" data-task-id="${task.id}" data-subtask="${sub}" ${isCompleted ? 'checked disabled' : ''} ${task.claimed_by !== sessionStorage.getItem('designer_name') ? 'disabled' : ''}>
                            <span style="${isCompleted ? 'text-decoration:line-through; color:#9aa397' : ''}">${sub}</span>
                        </div>
                    `;
                });
                subtaskHtml += `</div>`;
            }
            
            let statusClass = '';
            if (task.status === 'waiting') statusClass = 'status-waiting';
            else if (task.status === 'in_progress') statusClass = 'status-progress';
            else statusClass = 'status-done';
            
            const statusText = { waiting: 'ожидает', in_progress: 'в работе', done: 'готово' }[task.status];
            const claimedBy = task.claimed_by ? `👤 делает: ${task.claimed_by}` : '✋ никто не взял';
            
            card.innerHTML = `
                <div class="task-header">
                    <span class="task-type">${task.type}</span>
                    <span class="status ${statusClass}">${statusText}</span>
                </div>
                <div class="task-title">${escapeHtml(task.title)}</div>
                <div class="task-desc">${escapeHtml(task.description)}</div>
                ${subtaskHtml}
                <div class="claim-info">${claimedBy}</div>
                ${task.status !== 'done' ? `<button class="take-btn" ${task.claimed_by && task.claimed_by !== sessionStorage.getItem('designer_name') ? 'disabled' : ''} onclick="takeTask('${task.id}')">🎯 Взять и выполнить сразу</button>` : ''}
                ${task.status === 'done' ? '<button disabled style="background:#cbc6c0">✅ Заявка выполнена</button>' : ''}
            `;
            container.appendChild(card);
        }
        
        // навешиваем обработчики на чекбоксы
        document.querySelectorAll('.subtask-check').forEach(cb => {
            cb.addEventListener('change', async (e) => {
                const taskId = cb.dataset.taskId;
                const subtask = cb.dataset.subtask;
                const isChecked = cb.checked;
                await fetch('/api/complete_subtask', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({ task_id: taskId, subtask_name: subtask, completed: isChecked, designer: sessionStorage.getItem('designer_name') })
                });
                loadTasks();
            });
        });
    }
    
    function escapeHtml(str) { return str.replace(/[&<>]/g, function(m){if(m==='&') return '&amp;'; if(m==='<') return '&lt;'; if(m==='>') return '&gt;'; return m;});}
    
    async function takeTask(taskId) {
        let designer = sessionStorage.getItem('designer_name');
        if (!designer) {
            designer = prompt('Введи своё имя (без рейтинга, просто чтобы отметить автора):', 'Дизайнер');
            if (!designer) return;
            sessionStorage.setItem('designer_name', designer);
        }
        const res = await fetch('/api/take_task', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ task_id: taskId, designer: designer })
        });
        const data = await res.json();
        if (data.ok) {
            loadTasks();
        } else {
            alert('Ошибка: ' + data.error);
        }
    }
    
    async function createTask() {
        const title = document.getElementById('newTitle').value;
        const desc = document.getElementById('newDesc').value;
        const type = document.getElementById('newType').value;
        if (!title.trim()) return alert('Введи название заявки');
        const res = await fetch('/api/create_task', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ title, description: desc, type })
        });
        const task = await res.json();
        document.getElementById('newTitle').value = '';
        document.getElementById('newDesc').value = '';
        loadTasks();
    }
    
    loadTasks();
</script>
</body>
</html>
"""

# ----- API Эндпоинты -----
@app.route('/')
def index():
    return render_template_string(HTML_TEMPLATE)

@app.route('/api/tasks')
def get_tasks():
    return jsonify(list(tasks_db.values()))

@app.route('/api/create_task', methods=['POST'])
def create_task():
    data = request.json
    task_id = str(uuid.uuid4())[:8]
    subtasks_auto = generate_subtasks_by_type(data.get('type', 'дизайн'))
    tasks_db[task_id] = {
        "id": task_id,
        "title": data['title'],
        "description": data['description'],
        "type": data['type'],
        "status": "waiting",
        "subtasks": subtasks_auto,
        "completed_subtasks": [],
        "claimed_by": None,
        "created_at": datetime.now().isoformat()
    }
    return jsonify(tasks_db[task_id])

def generate_subtasks_by_type(design_type):
    """Автоматически разбивает любую заявку на кусочки (система модулей)"""
    base = ["понять задачу", "сделать набросок", "основная версия", "финальный рендер"]
    if design_type == "логотип":
        return ["анализ брифов", "скетчинг", "векторная сетка", "цвет + типографика", "презентация"]
    elif design_type == "пост":
        return ["сетка/композиция", "подбор визуала", "типографика", "цветокоррекция", "экспорт под соцсети"]
    elif design_type == "баннер":
        return ["формат + размеры", "заголовок+кнопка", "фото/иллюстрация", "баланс", "финальный билд"]
    else:
        return base

@app.route('/api/take_task', methods=['POST'])
def take_task():
    data = request.json
    task_id = data['task_id']
    designer = data['designer']
    if task_id not in tasks_db:
        return jsonify({"ok": False, "error": "Заявка не найдена"}), 404
    task = tasks_db[task_id]
    if task['status'] == 'done':
        return jsonify({"ok": False, "error": "Заявка уже выполнена"}), 400
    if task['claimed_by'] is not None and task['claimed_by'] != designer:
        return jsonify({"ok": False, "error": "Эта заявка уже в работе у другого дизайнера"}), 400
    # Мгновенное взятие в работу
    task['claimed_by'] = designer
    if task['status'] == 'waiting':
        task['status'] = 'in_progress'
    return jsonify({"ok": True})

@app.route('/api/complete_subtask', methods=['POST'])
def complete_subtask():
    data = request.json
    task_id = data['task_id']
    subtask_name = data['subtask_name']
    completed = data['completed']
    designer = data.get('designer')
    task = tasks_db.get(task_id)
    if not task:
        return jsonify({"error": "нет задачи"}), 404
    if task['claimed_by'] != designer:
        return jsonify({"error": "Только тот кто взял задачу может отмечать кусочки"}), 403
    if completed:
        if subtask_name not in task['completed_subtasks']:
            task['completed_subtasks'].append(subtask_name)
    else:
        if subtask_name in task['completed_subtasks']:
            task['completed_subtasks'].remove(subtask_name)
    # Проверяем: все ли подзадачи выполнены? Если да — заявка готова
    if set(task['completed_subtasks']) == set(task['subtasks']) and len(task['subtasks']) > 0:
        task['status'] = 'done'
    return jsonify({"ok": True, "status": task['status']})

if __name__ == '__main__':
    app.run(debug=True, port=5000)