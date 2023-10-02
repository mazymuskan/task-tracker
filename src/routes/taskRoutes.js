const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// Create a task
router.post('/tasks', async (req, res) => {
  const { title, status } = req.body;
  try {
    const taskId = await taskController.createTask(title, status);
    res.status(201).json({ id: taskId, message: 'Task created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update a task
router.put('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  const { title, status } = req.body;
  try {
    const success = await taskController.updateTask(id, title, status);
    if (success) {
      res.json({ message: 'Task updated successfully' });
    } else {
      res.status(404).json({ error: 'Task not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get all tasks paginated
router.get('/tasks', async (req, res) => {
  const { page = 1, pageSize = 10 } = req.query;
  try {
    const tasks = await taskController.getAllTasks(page, pageSize);
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get task metrics
router.get('/task-metrics', async (req, res) => {
  try {
    const metrics = await taskController.getTaskMetrics();
    res.json(metrics);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
