import { useEffect, useRef } from "react";
import TaskItem from "./TaskItem";
import "../styles/TaskList.css";

export default function TaskList({ tasks, onEdit, onToggle, onDelete }) {
  const box = useRef(null);

  useEffect(() => {
    const el = box.current;
    if (!el) return;

    const onWheel = (e) => {
      const end = el.scrollHeight - el.clientHeight;
      if (end <= 0) return;

      if (el.scrollTop >= end && e.deltaY > 0) {
        e.preventDefault();
        el.scrollTop = Math.min(e.deltaY, end);
        return;
      }
      if (el.scrollTop <= 0 && e.deltaY < 0) {
        e.preventDefault();
        el.scrollTop = Math.max(end + e.deltaY, 0);
        return;
      }
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [tasks.length]);

  return (
    <div className="task-list-vertical" ref={box}>
      {tasks.map((t) => (
        <TaskItem
          key={t.id}
          task={t}
          onEdit={() => onEdit(t)}
          onToggle={() => onToggle(t)}
          onDelete={() => onDelete(t.id)}
        />
      ))}
    </div>
  );
}
