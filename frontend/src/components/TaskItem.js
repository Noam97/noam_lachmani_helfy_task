import "../styles/TaskItem.css";

export default function TaskItem({ task, onEdit, onToggle, onDelete }) {
  const cls = ["task-item"];
  if (task.completed) cls.push("done");
  cls.push(task.priority || "low");

  const dt = new Date(task.createdAt || Date.now());
  return (
    <div className={cls.join(" ")}>
      <div className="row">
        <strong>{task.title}</strong>
        <span className={"pill " + (task.priority || "low")}>{task.priority}</span>
      </div>
      <div className="desc">{task.description}</div>
      <div className="meta">{dt.toLocaleString()}</div>
      <div className="actions">
        <button className="btn" onClick={onToggle}>{task.completed ? "Undo" : "Done"}</button>
        <button className="btn" onClick={onEdit}>Edit</button>
        <button className="btn danger" onClick={onDelete}>Delete</button>
      </div>
    </div>
  );
}
