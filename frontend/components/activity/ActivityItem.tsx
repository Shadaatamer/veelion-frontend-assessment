import type { ActivityLog } from "@/types/api";

type ActivityItemProps = {
  item: ActivityLog;
};

export function ActivityItem({ item }: ActivityItemProps) {
  return (
    <article className="card activity-item">
      <div>
        <strong className="activity-action">{item.action}</strong>

        {item.info ? <p className="activity-info">{item.info}</p> : null}
      </div>

      <time className="activity-time" dateTime={item.when}>
        {new Date(item.when).toLocaleString()}
      </time>
    </article>
  );
}
