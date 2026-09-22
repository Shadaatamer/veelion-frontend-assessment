type StatusSummaryProps = {
  todo: number;
  inProgress: number;
  done: number;
};

export function StatusSummary({ todo, inProgress, done }: StatusSummaryProps) {
  return (
    <section className="card status-summary">
      <h2>Tasks by Status</h2>

      <div className="status-row">
        <span>Todo</span>
        <strong>{todo}</strong>
      </div>

      <div className="status-row">
        <span>In Progress</span>
        <strong>{inProgress}</strong>
      </div>

      <div className="status-row">
        <span>Done</span>
        <strong>{done}</strong>
      </div>
    </section>
  );
}
