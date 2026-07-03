import { Link } from "react-router-dom";
import { ArrowLeft, FileText, FileSpreadsheet } from "lucide-react";
import { useAppData } from "@/hooks/useAppData";
import { Button } from "@/components/ui/button";
import { MetricCard } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";

export function ReportsPage() {
  const { players, bookings } = useAppData();

  const dailyRevenue = players
    .filter((p) => p.paymentDate === new Date().toISOString().slice(0, 10))
    .reduce((sum, p) => sum + p.amountPaid, 0);
  const monthlyRevenue = players.reduce((sum, p) => sum + p.amountPaid, 0);
  const outstanding = players.reduce((sum, p) => sum + p.due, 0);
  const activePlayers = players.length;
  const approvedBookings = bookings.filter((b) => b.status === "approved").length;

  function exportExcel() {
    const header = "Name,Sport,Status,Due,Amount paid,Month\n";
    const rows = players
      .map((p) => `${p.name},${p.sport},${p.status},${p.due},${p.amountPaid},${p.month}`)
      .join("\n");
    const blob = new Blob([header + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "sportspitch-report.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  function exportPdf() {
    window.print();
  }

  return (
    <div>
      <div className="mb-4 flex items-center gap-2">
        <Link to="/more" aria-label="Back to more" className="text-ink-secondary">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-lg font-semibold">Reports</h1>
      </div>

      <div className="mb-5 grid grid-cols-2 gap-2.5">
        <MetricCard label="Daily revenue" value={formatCurrency(dailyRevenue)} />
        <MetricCard label="Monthly revenue" value={formatCurrency(monthlyRevenue)} />
        <MetricCard label="Booking summary" value={`${approvedBookings} approved`} />
        <MetricCard label="Active players" value={String(activePlayers)} />
        <MetricCard label="Outstanding payments" value={formatCurrency(outstanding)} tone="danger" />
      </div>

      <div className="flex gap-2">
        <Button variant="secondary" className="flex-1" onClick={exportPdf}>
          <FileText className="h-4 w-4" />
          Export PDF
        </Button>
        <Button variant="secondary" className="flex-1" onClick={exportExcel}>
          <FileSpreadsheet className="h-4 w-4" />
          Export Excel
        </Button>
      </div>
    </div>
  );
}
