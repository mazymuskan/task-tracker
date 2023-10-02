const TaskModel = require('../models/taskModel');

// Create a new task
exports.createTask = (title, status) => {
  return new Promise((resolve, reject) => {
    TaskModel.run(
      'INSERT INTO tasks (title, status) VALUES (?, ?)',
      [title, status],
      function (err) {
        if (err) {
          reject(err);
        }
        resolve(this.lastID);
      }
    );
  });
};

// Update a task
exports.updateTask = (taskId, title, status) => {
  return new Promise((resolve, reject) => {
    TaskModel.run(
      'UPDATE tasks SET title = ?, status = ? WHERE id = ?',
      [title, status, taskId],
      function (err) {
        if (err) {
          reject(err);
        }
        resolve(this.changes > 0);
      }
    );
  });
};

// Get all tasks paginated
exports.getAllTasks = (page, pageSize) => {
  const offset = (page - 1) * pageSize;
  return new Promise((resolve, reject) => {
    TaskModel.all(
      'SELECT * FROM tasks ORDER BY createdAt DESC LIMIT ? OFFSET ?',
      [pageSize, offset],
      (err, rows) => {
        if (err) {
          reject(err);
        }
        resolve(rows);
      }
    );
  });
};

// Get task metrics
exports.getTaskMetrics = () => {
  return new Promise((resolve, reject) => {
    TaskModel.all(
      `SELECT strftime('%Y-%m', createdAt) AS month,
              COUNT(CASE WHEN status = 'open' THEN 1 END) AS open_tasks,
              COUNT(CASE WHEN status = 'inprogress' THEN 1 END) AS inprogress_tasks,
              COUNT(CASE WHEN status = 'completed' THEN 1 END) AS completed_tasks
       FROM tasks
       GROUP BY month`,
      (err, rows) => {
        if (err) {
          reject(err);
        }
        resolve(rows);
      }
    );
  });
};
