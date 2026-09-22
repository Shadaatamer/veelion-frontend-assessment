"use client";

import { useReports } from "@/hooks/useReports";
import { StatCard } from "./StatCard";
import { StatusSummary } from "./StatusSummary";

export function ReportsDashboard() {
  const { summary, loading, error, reload } = useReports();

  if (loading) {
    return (
      <section className="card report-state">
        <p>Loading reports...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="card report-state">
        <p className="error-text">{error}</p>

        <button type="button" className="button" onClick={reload}>
          Retry
        </button>
      </section>
    );
  }

  if (!summary) {
    return (
      <section className="card report-state">
        <p>No report data available.</p>
      </section>
    );
  }

  return (
    <section className="stack">
      <div className="stats-grid">
        <StatCard label="Total Tasks" value={summary.total} />

        <StatCard label="Recent Activity" value={summary.recentActivityCount} />
      </div>

      <StatusSummary
        todo={summary.byStatus.todo}
        inProgress={summary.byStatus["in-progress"]}
        done={summary.byStatus.done}
      />
    </section>
  );
}
