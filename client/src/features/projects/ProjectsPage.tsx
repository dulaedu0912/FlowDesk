import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { apiClient } from "../../lib/api-client";
import { useUIStore } from "../../stores/ui-store";
import PageHeader from "../../components/layout/PageHeader";
import EmptyState from "../../components/data-display/EmptyState";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";

export default function ProjectsPage() {
  const { activeWorkspaceId } = useUIStore();
  const qc = useQueryClient();
  const [name, setName] = useState("");
  const [key, setKey] = useState("");
  const { data } = useQuery({
    queryKey: ["projects", activeWorkspaceId],
    queryFn: async () => (await apiClient.get(`/workspaces/${activeWorkspaceId}/projects`)).data.data,
    enabled: !!activeWorkspaceId
  });
  const create = useMutation({
    mutationFn: async () => (await apiClient.post(`/workspaces/${activeWorkspaceId}/projects`, { name, key })).data.data,
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["projects"] }); setName(""); setKey(""); }
  });
  return (
    <div>
      <PageHeader title="Projects" description="Manage delivery work" />
      <Card><CardHeader><CardTitle>New project</CardTitle></CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            <Input placeholder="KEY" value={key} onChange={(e) => setKey(e.target.value)} />
            <Button onClick={() => create.mutate()}>Create</Button>
          </div>
        </CardContent>
      </Card>
      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        {(data || []).map((p: any) => (
          <Card key={p._id}><CardHeader><CardTitle>{p.name}</CardTitle></CardHeader>
            <CardContent><div className="text-sm text-slate-500">{p.key}</div></CardContent>
          </Card>
        ))}
      </div>
      {!data?.length && <div className="mt-6"><EmptyState title="No projects" description="Create your first project." /></div>}
    </div>
  );
}
