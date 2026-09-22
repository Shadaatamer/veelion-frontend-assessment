import { AppHeader } from "@/components/shared/AppHeader";
import { ReportsDashboard } from "@/components/reports/ReportsDashboard";

export default function ReportsPage() {
  return (
    <main>
      <AppHeader />

      <h1>Reports</h1>

      <ReportsDashboard />
    </main>
  );
}
