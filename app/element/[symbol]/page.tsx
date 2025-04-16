import StandaloneElementView from "@/components/standalone-element-view"

export default function ElementPage({ params }: { params: { symbol: string } }) {
  return (
    <main className="min-h-screen py-8 px-4 font-mono">
      <StandaloneElementView elementSymbol={params.symbol} />
    </main>
  )
}

