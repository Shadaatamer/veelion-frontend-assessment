import Link from "next/link";

export default function HomePage() {
  return (
    <main>
      <header className="stack" style={{ marginBottom: "1.5rem" }}>
        <h1 style={{ margin: 0 }}>VeeLion Frontend Assessment</h1>

        <p style={{ margin: 0, color: "var(--muted)" }}>
          Task management, activity tracking, and reporting using the provided
          backend.
        </p>
      </header>

      <section className="home-grid">
        <Link href="/tasks" className="card home-card">
          <span className="home-card-number">01</span>

          <h2>Task Dashboard</h2>

          <p>
            View tasks, filter by status, update completion state, and check
            task totals.
          </p>
        </Link>

        <Link href="/activity" className="card home-card">
          <span className="home-card-number">02</span>

          <h2>Activity Feed</h2>

          <p>
            Review activity records and search by action or activity details.
          </p>
        </Link>

        <Link href="/reports" className="card home-card">
          <span className="home-card-number">03</span>

          <h2>Reports</h2>

          <p>
            View task totals, status breakdown, and recent activity summary.
          </p>
        </Link>
      </section>
    </main>
  );
}
