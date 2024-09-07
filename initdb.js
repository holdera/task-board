// create database
const Database = require('better-sqlite3');
const db = new Database('tasks.db');
db.pragma('journal_mode = WAL');

const tasks = [
	{
		task_name: 'Make edit form work',
		task_description: 'Add functionality to form so user can edit tasks',
		task_priority: 'low',
		task_assignee: 'user',
		task_status: 'completed',
		task_date: '2024-08-11 13:00:00',
		task_updated_date: '2024-08-11 13:23:44',
	},
];

db.prepare(
	`CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        task_name TEXT NOT NULL UNIQUE,
        task_description TEXT,
        task_priority TEXT NOT NULL,
        task_assignee TEXT NOT NULL,
        task_status TEXT NOT NULL,
        task_date DATETIME NOT NULL,
        task_updated_date DATETIME
    )`
).run();

async function initData() {
	const insert_data = db.prepare(`
        INSERT INTO tasks VALUES (
            null,
            @task_name,
            @task_description,
            @task_priority,
            @task_assignee,
            @task_status,
            @task_date,
            @task_updated_date
        )
    `);

	for (const task of tasks) {
		insert_data.run(task);
	}
}

initData();
