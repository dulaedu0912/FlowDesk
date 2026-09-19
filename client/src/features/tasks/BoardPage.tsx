import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { apiClient } from "../../lib/api-client";
import PageHeader from "../../components/layout/PageHeader";
import { Badge } from "../../components/ui/badge";
import { Card, CardContent } from "../../components/ui/card";

export default function BoardPage() {
  const { projectId } = useParams();
  const { data } = useQuery({
    queryKey: ["board", projectId],
    queryFn: async () => (await apiClient.get(`/projects/${projectId}/board`)).data.data
  });
  const cols = [{ id: "todo", label: "Todo" }, { id: "in_progress", label: "In Progress" }, { id: "done", label: "Done" }];
  return (
    <div>
      <PageHeader title="Board" description={`Project ${projectId}`} />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {cols.map((c) => (
          <div key={c.id} className="rounded-xl bg-slate-100 p-3">
            <h3 className="mb-3 font-semibold">{c.label}</h3>
            <div className="flex flex-col gap-2">
              {(data?.[c.id] || []).map((t: any) => (
                <Card key={t._id}><CardContent>
                  <div className="font-medium">{t.title}</div>
                  <div className="mt-2"><Badge variant={t.priority === "urgent" ? "danger" : "default"}>{t.priority}</Badge></div>
                </CardContent></Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
