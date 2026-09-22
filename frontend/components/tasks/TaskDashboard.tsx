"use client";

import { useTasks } from "@/hooks/useTasks";
import type { Task } from "@/types/api";
import { StatusFilter } from "@/components/tasks/StatusFilter";
import { TaskList } from "@/components/tasks/TaskList";

export function TaskDashboard() {
  const {
    filteredTasks,
    stats,
    filter,
    loading,
    error,
    updatingTaskId,
    setFilter,
    fetchTasks,
    updateTaskStatus,
  } = useTasks();

  const handleToggle = (task: Task) => {
    updateTaskStatus(task.id, !task.completed);
  };

  return (
    <section className="stack">
      <header className="card" style={{ padding: "1rem" }}>
        <h1 style={{ marginTop: 0, marginBottom: "0.5rem" }}>Task Dashboard</h1>
      </header>

      <div className="stats-grid">
        <section className="card stat-card">
          <span className="stat-label">Total Tasks</span>
          <strong className="stat-value">{stats.total}</strong>
        </section>

        <section className="card stat-card">
          <span className="stat-label">Completed</span>
          <strong className="stat-value">{stats.completed}</strong>
        </section>

        <section className="card stat-card">
          <span className="stat-label">Pending</span>
          <strong className="stat-value">{stats.pending}</strong>
        </section>
      </div>

      <StatusFilter value={filter} onChange={setFilter} />

      {loading ? (
        <section className="card" style={{ padding: "1rem" }}>
          <p style={{ margin: 0 }}>Loading tasks...</p>
        </section>
      ) : null}

      {error ? (
        <section
          className="card"
          style={{
            padding: "1rem",
            borderColor: "#e3b4c0",
            background: "#fff8fa",
          }}
        >
          <p
            style={{
              marginTop: 0,
              marginBottom: "0.75rem",
              color: "var(--danger)",
            }}
          >
            {error}
          </p>

          <button type="button" className="button" onClick={fetchTasks}>
            Retry
          </button>
        </section>
      ) : null}

      {!loading && !error ? (
        <TaskList
          tasks={filteredTasks}
          updatingTaskId={updatingTaskId}
          onToggle={handleToggle}
        />
      ) : null}
    </section>
  );
}
