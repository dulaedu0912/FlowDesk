import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../../lib/api-client";
import PageHeader from "../../components/layout/PageHeader";
import StatCard from "../../components/data-display/StatCard";
import EmptyState from "../../components/data-display/EmptyState";
import { Skeleton } from "../../components/ui/skeleton";
import { useUIStore } from "../../stores/ui-store";

export default function DashboardPage() {
  const { activeWorkspaceId } = useUIStore();
  const { data, isLoading } = useQuery({
    queryKey: ["workspace-stats", activeWorkspaceId],
    queryFn: async () => {
      if (!activeWorkspaceId) return null;
      const res = await apiClient.get(`/workspaces/${activeWorkspaceId}/stats`);
      return res.data.data;
    },
    enabled: !!activeWorkspaceId
  });
  if (!activeWorkspaceId) {
    return <EmptyState title="No workspace selected" description="Create a workspace to get started." />;
  }
  if (isLoading) {
    return <div className="grid grid-cols-3 gap-4"><Skeleton className="h-32" /><Skeleton className="h-32" /><Skeleton className="h-32" /></div>;
  }
  return (
    <div>
      <PageHeader title="Dashboard" description="Workspace overview" />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <StatCard title="Projects" value={data?.projects ?? 0} />
        <StatCard title="Tasks" value={data?.tasks ?? 0} />
        <StatCard title="Done" value={data?.done ?? 0} />
      </div>
    </div>
  );
}
