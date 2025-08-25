import { useEffect, useState } from "react";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import TaskFilter from "./components/TaskFilter";
import { getTasks, createTask, updateTask, deleteTask, toggleTask } from "./services/taskService";
import "./styles/App.css";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [showForm, setShowForm] = useState(false);
  const [edit, setEdit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  const load = async () => {
    setErr(""); setLoading(true);
    try {
      const data = await getTasks();
      setTasks(Array.isArray(data) ? data : []);
    } catch {
      setErr("Failed to load tasks");
      setTasks([]);
    } finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const filtered = tasks.filter(t =>
    filter === "all" ? true : filter === "completed" ? t.completed : !t.completed
  );

  const onSave = async (values) => {
    if (!values?.title?.trim()) return;
    if (edit) await updateTask(edit.id, values);
    else await createTask(values);
    setShowForm(false); setEdit(null);
    await load();
  };

  const onToggle = async (t) => { await toggleTask(t.id); await load(); };

  const onDeleteClick = async (id) => {
    if (!window.confirm("Delete task?")) return;
    await deleteTask(id);
    await load();
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Task Manager</h1>
        <div className="toolbar">
          <button className="btn" onClick={() => { setEdit(null); setShowForm(true); }}>Add Task</button>
          <TaskFilter value={filter} onChange={setFilter} />
        </div>
        {err && <div className="err">{err}</div>}
      </header>

      {loading ? (
        <div className="empty">Loading…</div>
      ) : filtered.length === 0 ? (
        <div className="empty">No tasks to display</div>
      ) : (
        <TaskList
          tasks={filtered}
          onEdit={(t) => { setEdit(t); setShowForm(true); }}
          onToggle={onToggle}
          onDelete={onDeleteClick}
        />
      )}

      {showForm && (
        <TaskForm
          task={edit}
          onCancel={() => { setShowForm(false); setEdit(null); }}
          onSave={onSave}
        />
      )}
    </div>
  );
}
