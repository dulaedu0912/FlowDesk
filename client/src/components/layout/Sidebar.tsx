import { Link } from "react-router-dom";
import { useUIStore } from "../../stores/ui-store";

export default function Sidebar() {
  const { sidebarOpen } = useUIStore();
  if (!sidebarOpen) return null;
  return (
    <aside className="w-64 border-r border-slate-200 bg-white p-4">
      <div className="mb-6 text-xl font-bold text-indigo-600">FlowDesk</div>
      <nav className="flex flex-col gap-1 text-sm">
        <Link className="rounded-lg px-3 py-2 hover:bg-slate-100" to="/app/dashboard">Dashboard</Link>
        <Link className="rounded-lg px-3 py-2 hover:bg-slate-100" to="/app/projects">Projects</Link>
        <Link className="rounded-lg px-3 py-2 hover:bg-slate-100" to="/app/team">Team</Link>
        <Link className="rounded-lg px-3 py-2 hover:bg-slate-100" to="/app/activity">Activity</Link>
      </nav>
    </aside>
  );
}
