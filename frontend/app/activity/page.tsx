import { AppHeader } from "@/components/shared/AppHeader";
import { ActivityFeed } from "@/components/activity/ActivityFeed";

export default function ActivityPage() {
  return (
    <main>
      <AppHeader />

      <h1>Activity Feed</h1>

      <ActivityFeed />
    </main>
  );
}
