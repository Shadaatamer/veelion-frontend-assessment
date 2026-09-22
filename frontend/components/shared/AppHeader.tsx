import Link from "next/link";

export function AppHeader() {
  return (
    <nav className="app-nav">
      <Link href="/">Home</Link>
      <Link href="/tasks">Tasks</Link>
      <Link href="/activity">Activity</Link>
      <Link href="/reports">Reports</Link>
    </nav>
  );
}
