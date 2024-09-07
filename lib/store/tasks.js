import fs from 'fs-extra';
import sql from 'better-sqlite3';
import slugify from 'slugify';
import xss from 'xss';

const db = sql('tasks.db');

export async function getAllTasks() {
	return db.prepare('SELECT * FROM tasks').all();
}
