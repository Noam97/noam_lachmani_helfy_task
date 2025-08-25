const ALLOWED_PRIORITY = new Set(['low', 'medium', 'high']);

function validateTask(isCreate) {
  return (req, res, next) => {
    const { title, completed, priority } = req.body || {};

    if (isCreate) {
      if (!title || !title.trim()) {
        return res.status(400).json({ error: 'title is required' });
      }
    } else {
      if (title != null && !title.trim()) {
        return res.status(400).json({ error: 'invalid title' });
      }
    }

    if (completed != null && typeof completed !== 'boolean') {
      return res.status(400).json({ error: 'invalid completed' });
    }

    if (priority != null && !ALLOWED_PRIORITY.has(priority)) {
      return res.status(400).json({ error: 'invalid priority' });
    }

    next();
  };
}

const validateCreate = validateTask(true);
const validateUpdate = validateTask(false);

module.exports = { validateCreate, validateUpdate };