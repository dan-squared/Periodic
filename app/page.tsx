import PeriodicTable from "@/components/periodic-table"

export default function Home() {
  return (
    <main className="min-h-screen font-mono">
      <PeriodicTable />
      {/* Theme toggle removed from main page - now only in sidebar */}
    </main>
  )
}

