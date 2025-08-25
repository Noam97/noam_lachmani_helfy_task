const express = require('express');
const { validateCreate, validateUpdate } = require('../middleware/validateTask');

const router = express.Router();

let nextId = 1;
const tasks = [];

// GET /api/tasks
router.get('/', (req, res) => {
  res.json(tasks);
});

// POST /api/tasks
router.post('/', validateCreate, (req, res) => {
  const { title, description = '', completed = false, priority } = req.body;
  const now = new Date();

  const newTask = {
    id: nextId++,
    title: title.trim(),
    description: description.trim(),
    completed: Boolean(completed),
    priority,
    createdAt: now,
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

// PUT /api/tasks/:id
router.put('/:id', validateUpdate, (req, res) => {
  const idx = tasks.findIndex(t => t.id === Number(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Task not found' });

  const { title, description, completed, priority } = req.body;
  const now = new Date();

  if (title != null) tasks[idx].title = title.trim();
  if (description != null) tasks[idx].description = description.trim();
  if (completed != null) tasks[idx].completed = completed;
  if (priority != null) tasks[idx].priority = priority;

  res.json(tasks[idx]);
});


// DELETE /api/tasks/:id
router.delete('/:id', (req, res) => {
  const idx = tasks.findIndex(t => t.id === Number(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Task not found' });

  tasks.splice(idx, 1);
  res.status(204).send();
});

// PATCH /api/tasks/:id/toggle
router.patch('/:id/toggle', (req, res) => {
  const idx = tasks.findIndex(t => t.id === Number(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Task not found' });

  tasks[idx].completed = !tasks[idx].completed;

  res.json({ id: tasks[idx].id, completed: tasks[idx].completed });
});

module.exports = router;
