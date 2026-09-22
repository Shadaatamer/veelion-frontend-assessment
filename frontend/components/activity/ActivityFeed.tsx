"use client";

import { ActivityItem } from "./ActivityItem";
import { useActivity } from "@/hooks/useActivity";

export function ActivityFeed() {
  const { activity, query, setQuery, loading, error, reload } = useActivity();

  if (loading) {
    return (
      <section className="card activity-state">
        <p>Loading activity...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="card activity-state">
        <p className="error-text">{error}</p>

        <button type="button" className="button" onClick={reload}>
          Retry
        </button>
      </section>
    );
  }

  return (
    <section className="activity-feed">
      <input
        className="input activity-search"
        type="search"
        placeholder="Search activity..."
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />

      {activity.length === 0 ? (
        <section className="card activity-state">
          <p>No activity found.</p>
        </section>
      ) : (
        <div className="activity-list">
          {activity.map((item) => (
            <ActivityItem key={item.id} item={item} />
          ))}
        </div>
      )}
    </section>
  );
}
