import { AppHeader } from "@/components/shared/AppHeader";
import { TaskDashboard } from "@/components/tasks/TaskDashboard";

export default function TasksPage() {
  return (
    <main className="stack">
      <AppHeader />

      <TaskDashboard />
    </main>
  );
}
