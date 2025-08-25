import "../styles/TaskFilter.css";

export default function TaskFilter({ value, onChange }) {
  return (
    <div className="task-filter">
      <label><input type="radio" name="f" checked={value==="all"} onChange={()=>onChange("all")}/> All</label>
      <label><input type="radio" name="f" checked={value==="active"} onChange={()=>onChange("active")}/> Active</label>
      <label><input type="radio" name="f" checked={value==="completed"} onChange={()=>onChange("completed")}/> Completed</label>
    </div>
  );
}
