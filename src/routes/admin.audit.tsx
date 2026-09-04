import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { DataTable, Pill, KpiRow } from "@/components/ui-ext/Scaffold";

export const Route = createFileRoute("/admin/audit")({
  head: () => ({ meta: [{ title: "Audit logs — Admin" }] }),
  component: Page,
});

const rows = [
  {
    at: "2024-09-25 14:38",
    actor: "admin@terratrust.ai",
    level: "info",
    action: "Updated retention policy to 7 years",
    target: "config",
  },
  {
    at: "2024-09-25 14:21",
    actor: "K. Bello (officer)",
    level: "info",
    action: "Approved permit",
    target: "PMT-44021",
  },
  {
    at: "2024-09-25 13:08",
    actor: "system",
    level: "warning",
    action: "Duplicate deed detected",
    target: "TT-5512-AB",
  },
  {
    at: "2024-09-25 11:50",
    actor: "ops@accessbank.com",
    level: "info",
    action: "Mortgage check executed",
    target: "TT-8421-LG",
  },
  {
    at: "2024-09-25 09:02",
    actor: "admin@terratrust.ai",
    level: "alert",
    action: "Suspended account after 12 failed logins",
    target: "u_8821",
  },
];

function Page() {
  return (
    <AppShell title="System audit" subtitle="Searchable, immutable log of every privileged action.">
      <KpiRow
        items={[
          { label: "Events today", value: "11,238" },
          { label: "Alerts", value: "3" },
          { label: "Warnings", value: "14" },
          { label: "Retention", value: "7 years" },
        ]}
      />
      <div className="mt-6">
        <DataTable
          rows={rows}
          columns={[
            {
              key: "at",
              label: "Time",
              render: (r) => <span className="font-mono text-xs">{r.at}</span>,
            },
            { key: "actor", label: "Actor", render: (r) => r.actor },
            {
              key: "lvl",
              label: "Level",
              render: (r) => (
                <Pill
                  tone={r.level === "alert" ? "danger" : r.level === "warning" ? "warning" : "info"}
                >
                  {r.level}
                </Pill>
              ),
            },
            { key: "act", label: "Action", render: (r) => r.action },
            {
              key: "tgt",
              label: "Target",
              render: (r) => <span className="font-mono text-xs">{r.target}</span>,
            },
          ]}
        />
      </div>
    </AppShell>
  );
}
