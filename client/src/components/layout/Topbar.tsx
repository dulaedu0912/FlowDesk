import { useUIStore } from "../../stores/ui-store";

export default function Topbar() {
  const { toggleSidebar } = useUIStore();
  return (
    <header className="flex h-14 items-center justify-between border-b border-slate-200 bg-white px-6">
      <button onClick={toggleSidebar} className="text-sm text-slate-500">☰</button>
      <div className="text-sm text-slate-500">FlowDesk SaaS</div>
    </header>
  );
}
