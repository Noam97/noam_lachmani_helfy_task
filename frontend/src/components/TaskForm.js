import { useEffect, useState } from "react";
import "../styles/TaskForm.css";

const empty = { title: "", description: "", completed: false, priority: "low" };

export default function TaskForm({ task, onSave, onCancel }) {
  const [v, setV] = useState(empty);
  useEffect(() => { setV(task ? { ...task } : empty); }, [task]);

  const submit = async (e) => {
    e.preventDefault();
    const body = {
      title: v.title.trim(),
      description: v.description.trim(),
      completed: !!v.completed,
      priority: v.priority || "low",
    };
    if (!body.title) return;
    await onSave(body);
  };

  return (
    <div className="task-form-overlay" onClick={onCancel}>
      <form className="task-form" onClick={(e)=>e.stopPropagation()} onSubmit={submit}>
        <h3>{task ? "Edit Task" : "New Task"}</h3>
        <input
          placeholder="Title"
          value={v.title}
          onChange={e=>setV({...v, title:e.target.value})}
        />
        <textarea
          placeholder="Description"
          rows={3}
          value={v.description}
          onChange={e=>setV({...v, description:e.target.value})}
        />
        <select
          value={v.priority}
          onChange={e=>setV({...v, priority:e.target.value})}
        >
          <option value="low">low</option>
          <option value="medium">medium</option>
          <option value="high">high</option>
        </select>
        {task && (
          <label>
            <input
              type="checkbox"
              checked={!!v.completed}
              onChange={e=>setV({...v, completed:e.target.checked})}
            />
            Completed
          </label>
        )}
        <div>
          <button type="button" className="btn ghost" onClick={onCancel}>Cancel</button>
          <button className="btn">Save</button>
        </div>
      </form>
    </div>
  );
}
