export function BrowserShellPlaceholder() {
  return (
    <div className="flex min-h-screen flex-col bg-[#F1F4F3] text-[#16212C]">
      <header className="border-b border-[#D3DBD8] bg-[#FBFCFC] px-4 py-3">
        <p className="text-sm text-[#7A8894]">small web</p>
        <h1 className="mt-1 text-xl font-semibold">browser coming soon</h1>
      </header>
      <main className="p-6 text-[#41505E]">
        <p>api + models are up. next step is the actual browser chrome.</p>
      </main>
    </div>
  );
}
