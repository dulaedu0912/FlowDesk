import { cn } from "../../lib/utils";

const styles: Record<string, string> = {
  default: "bg-slate-100 text-slate-700",
  success: "bg-green-100 text-green-700",
  warning: "bg-amber-100 text-amber-700",
  danger: "bg-red-100 text-red-700",
  info: "bg-blue-100 text-blue-700",
  purple: "bg-purple-100 text-purple-700"
};

export function Badge({ variant = "default", className, ...props }: React.HTMLAttributes<HTMLDivElement> & { variant?: keyof typeof styles }) {
  return <div className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium", styles[variant], className)} {...props} />;
}
